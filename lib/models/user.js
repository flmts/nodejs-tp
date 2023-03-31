'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            prenom: Joi.string().min(3).example('Prenom').description('Prenom du utilisateur'),
            nom: Joi.string().min(3).example('Nom').description('Nom du utilisateur'),
            password: Joi.string().min(8).example('password').description('MDP du utilisateur'),
            mail: Joi.string().min(8).email().example('exemple@exemple.com').description('Mail du utilisateur'),
            pseudonyme: Joi.string().min(3).example('Pseudo').description('Pseudonyme du utilisateur'),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
            role: Joi.string().valid('admin', 'user').description('Role du utilisateur')
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
        this.role = 'user';
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

    static get jsonAttributes() {

        return ['scope'];
    }

};