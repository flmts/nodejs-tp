'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {

    async create(movie) {

        const { Movie } = this.server.models();
        const { mailService } = this.server.services();

        const movieCreated = await Movie.query().insertAndFetch(movie);

        if (movieCreated) {
            await mailService.newFilmMail(movieCreated);
        }

        return movieCreated;
    }

    list() {

        const { Movie } = this.server.models();

        return Movie.query();
    }

    deleteById(id) {

        const { Movie } = this.server.models();

        return Movie.query().deleteById(id).throwIfNotFound().then(() => {

            const { favoriteService } = this.server.services();
            return favoriteService.deleteAllForMovie(id);
        });
    }

    async update(id, film) {

        const { Movie } = this.server.models();
        const { mailService } = this.server.services();

        const filmUpdated = await Movie.query().patchAndFetchById(id, film).throwIfNotFound();
        if (filmUpdated) {
            await mailService.updateFilmMail(filmUpdated);
        }

        return filmUpdated;
    }

    findById(id) {

        const { Movie } = this.server.models();

        return Movie.query().findById(id).throwIfNotFound();
    }
};