const ValidationMiddleware = require('../authorization/middlewares/auth.validation.middleware')
const TestController = require('./controller.test')

module.exports = function(app){
    app.post('/test/firestore', [
        TestController.firestoreInsert
    ]);

    app.post('/test/payment', [
        ValidationMiddleware.validJWTNeeded,
        TestController.payment
    ]);

    app.post('/test/confirm-payment', [
        ValidationMiddleware.validJWTNeeded,
        TestController.confirmPayment
    ]);

    app.post('/test/find_token_user', [
        TestController.findUserByToken
    ]);
}