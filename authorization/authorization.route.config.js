const AuthorizationController = require('./middlewares/verify.user.middleware')
const VerifyUserMiddleware = require('./middlewares/verify.user.middleware')

module.exports = function (app) {
    app.post('/auth', [
        // VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);
}