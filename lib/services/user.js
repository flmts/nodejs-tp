'use strict';

const { Service } = require('@hapipal/schmervice');
const IutEncrypt = require('@flmts/iut-encrypt');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');

module.exports = class UserService extends Service {

    async create(user) {

        const { User } = this.server.models();
        const { mailService } = this.server.services();

        user.password = IutEncrypt.sha1(user.password);

        const createUser = await User.query().insertAndFetch(user);

        if (createUser) {
            await mailService.sendMail(
                createUser.mail, 'Test',
                'Test' + createUser.prenom + ' ' + createUser.nom + 'Bienvenue, vous êtes maintenant enregistré.'
            );
        }

        return createUser;
    }

    list() {

        const { User } = this.server.models();

        return User.query();
    }

    deleteById(id) {

        const { User } = this.server.models();

        return User.query().deleteById(id).throwIfNotFound().then(() => {

            const { favoriteService } = this.server.services();
            return favoriteService.deleteAllForUser(id);
        });
    }

    update(id, user) {

        const { User } = this.server.models();

        if (user.password) {
            user.password = IutEncrypt.sha1(user.password);
        }

        return User.query().patchAndFetchById(id, user).throwIfNotFound();
    }

    async login(user) {

        const { User } = this.server.models();

        const userSearch = await User.query().findOne({ mail: user.mail });

        if (IutEncrypt.compareSha1(user.password, userSearch.password)) {
            return Jwt.token.generate(
                {
                    aud: 'urn:audience:iut',
                    iss: 'urn:issuer:iut',
                    id: userSearch.id,
                    prenom: userSearch.prenom,
                    nom: userSearch.nom,
                    mail: userSearch.mail,
                    scope: userSearch.role
                },
                {
                    key: 'random_string',
                    algorithm: 'HS512'
                },
                {
                    ttlSec: 14400 // 4 hours
                });
        }

        return Boom.unauthorized('Invalid credentials');
    }

    findById(id) {

        const { User } = this.server.models();

        return User.query().findById(id).throwIfNotFound();
    }
};