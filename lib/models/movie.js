'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Movie extends Model {

    static get tableName() {

        return 'movie';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(1).example('Harry potter 1').description('Nom du film'),
            description: Joi.string().min(10).example('Lhistoire dun magicien').description('Description du film'),
            releaseDate: Joi.date().example('0000-00-00').description('Date de sortie'),
            director: Joi.string().min(3).example('Name').description('Réalisateur du film'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }
};
