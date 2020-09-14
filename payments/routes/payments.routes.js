const Controller = require('../controllers/payments.controllers')
const ValidationMiddleware = require('../../authorization/middlewares/auth.validation.middleware')

module.exports = function (app) {
    app.post('/shop/payments', [
        // ValidationMiddleware.validJWTNeeded,
        Controller.createInvoice
    ]);
}