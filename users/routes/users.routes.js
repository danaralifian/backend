const UsersController = require('../controllers/users.controller')
const ValidationMiddleware = require('../../authorization/middlewares/auth.validation.middleware')

module.exports = function (app) {
    app.post('/user', [
        UsersController.insert
    ]);

    app.get('/user/:userId', [
        ValidationMiddleware.validJWTNeeded,
        UsersController.getById
    ]);

    app.get('/users', [
        ValidationMiddleware.validJWTNeeded,
        UsersController.list
    ]);

    app.delete('/user/:userId', [
        ValidationMiddleware.validJWTNeeded,
        UsersController.removeById
    ]);

    app.patch('/user/:userId', [
        ValidationMiddleware.validJWTNeeded,
        UsersController.patchById
    ]);

    app.post('/user/search', [
        UsersController.search
    ]);
}

// app.get('/users', [
//     ValidationMiddleware.validJWTNeeded,
//     PermissionMiddleware.minimumPermissionLevelRequired(PAID),
//     UsersController.list
// ]);

// app.get('/users/:userId', [
//     ValidationMiddleware.validJWTNeeded,
//     PermissionMiddleware.minimumPermissionLevelRequired(FREE),
//     PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
//     UsersController.getById
// ]);

// app.patch('/users/:userId', [
//     ValidationMiddleware.validJWTNeeded,
//     PermissionMiddleware.minimumPermissionLevelRequired(FREE),
//     PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
//     UsersController.patchById
// ]);

// app.delete('/users/:userId', [
//     ValidationMiddleware.validJWTNeeded,
//     PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
//     UsersController.removeById
// ]);