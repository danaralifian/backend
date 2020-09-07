const Controller = require('../controllers/movies.controllers')
const ValidationMiddleware = require('../../authorization/middlewares/auth.validation.middleware')

module.exports = function (app) {

    app.get('/movies/details', [
        // ValidationMiddleware.validJWTNeeded,
        Controller.getById
    ]);

    app.get('/movies/reviews', [
        // ValidationMiddleware.validJWTNeeded,
        Controller.getReviews
    ]);

    app.get('/movies/now_playing', [
        // ValidationMiddleware.validJWTNeeded,
        Controller.list
    ]);
    
    app.get('/movies/popular', [
        // ValidationMiddleware.validJWTNeeded,
        Controller.listPopular
    ]);

    app.get('/movies/upcoming', [
        // ValidationMiddleware.validJWTNeeded,
        Controller.listUpcoming
    ]);

    app.get('/movies/search', [
        // ValidationMiddleware.validJWTNeeded,
        Controller.search
    ]);

    app.get('/movies/videos', [
        // ValidationMiddleware.validJWTNeeded,
        Controller.video
    ]);

}