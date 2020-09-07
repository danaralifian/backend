const Controller = require('../controllers/shop.controllers')
const ValidationMiddleware = require('../../authorization/middlewares/auth.validation.middleware')

module.exports = function (app) {
    app.get('/shop/product/:productId', [
        // ValidationMiddleware.validJWTNeeded,
        Controller.getById
    ]);

    app.get('/shop/products', [
        // ValidationMiddleware.validJWTNeeded,
        Controller.list
    ]);

    app.get('/shop/recommendations', [
        // ValidationMiddleware.validJWTNeeded,
        Controller.listRecommendations
    ]);

    app.post('/shop/product/search', [
        // ValidationMiddleware.validJWTNeeded,
        Controller.serachByName
    ]);
}