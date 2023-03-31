'use strict';

require('dotenv').config();
const Nodemailer = require('nodemailer');
const { Service } = require('@hapipal/schmervice');

module.exports = class MailService extends Service {
    async sendMail(to, subject, html) {

        const transporter = Nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.MAIL_USER,
            to,
            subject,
            html
        };

        try {
            await transporter.sendMail(mailOptions);
        }
        catch (error) {
            console.error("Echec de l'envois du mail à ${to}: ${error.message}");
        }
    }

    async newFilmMail(film) {

        const { userService } = this.server.services();
        const users = await userService.list();
        const toList = users.map((user) => user.mail);

        await this.sendMail(
            toList,
            'Nouveau film', 'Le film ${film.titre} a été ajouté'
    );
    }

    async updateFilmMail(film) {

        const { Favorite } = this.server.models();
        const { userService } = this.server.services();

        const favorites = await Favorite.query().where('movieId', film.id);
        const toList = [];

        for (const favorite of favorites) {

            const user = await userService.findById(favorite.userId);
            if (user) {

                toList.push(user.mail);
            }
        }

        if (toList.length > 0) {

            await this.sendMail(toList, 'Film préféré modifier', 'Vos film préféré ${film.titre} a été modifier');
        }
    }
};