const Controller = require('../controllers/trendings.controllers')
const ValidationMiddleware = require('../../authorization/middlewares/auth.validation.middleware')

module.exports = function (app) {
    // app.post('/product', [
    //     ProductsController.insert
    // ]);

    app.get('/trendings/details', [
        // ValidationMiddleware.validJWTNeeded,
        Controller.getById
    ]);

    app.get('/trendings', [
        // ValidationMiddleware.validJWTNeeded,
        Controller.list
    ]);

    // app.delete('/product/:productId', [
    //     // ValidationMiddleware.validJWTNeeded,
    //     Controller.removeById
    // ]);

    // app.patch('/product/:productId', [
    //     ValidationMiddleware.validJWTNeeded,
    //     Controller.patchById
    // ]);

    // app.post('/product/search', [
    //     Controller.search
    // ]);
}