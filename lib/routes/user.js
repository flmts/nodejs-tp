'use strict';

const Joi = require('joi');
const UtilisateurModel = require('../models/user');

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            tags: ['api'],
            auth: false,
            validate: {
                payload: Joi.object({
                    prenom: UtilisateurModel.field('prenom').required(),
                    nom: UtilisateurModel.field('nom').required(),
                    password: UtilisateurModel.field('password').required(),
                    mail: UtilisateurModel.field('mail').required(),
                    pseudonyme: UtilisateurModel.field('pseudonyme').required()
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.create(request.payload);
        }
    }, {
        method: 'get',
        path: '/users',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api']
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.list();
        }
    }, {
        method: 'delete',
        path: '/user/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: UtilisateurModel.field('id').required()
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.deleteById(request.params.id);
        }
    }, {
        method: 'patch',
        path: '/user/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: UtilisateurModel.field('id').required()
                }),
                payload: Joi.object({
                    prenom: UtilisateurModel.field('prenom'),
                    nom: UtilisateurModel.field('nom'),
                    password: UtilisateurModel.field('password'),
                    mail: UtilisateurModel.field('mail'),
                    pseudonyme: UtilisateurModel.field('pseudonyme'),
                    role: UtilisateurModel.field('role')
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.update(request.params.id, request.payload);
        }
    }, {
        method: 'post',
        path: '/user/login',
        options: {
            tags: ['api'],
            auth: false,
            validate: {
                payload: Joi.object({
                    mail: UtilisateurModel.field('mail').required(),
                    password: UtilisateurModel.field('password').required()
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.login(request.payload);
        }
    },
    {
        method: 'get',
        path: '/user/{id}',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: UtilisateurModel.field('id').required()
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.findById(request.params.id);
        }
    }
];