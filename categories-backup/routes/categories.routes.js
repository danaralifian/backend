const CategoriesController = require('../controllers/category.controller')
const ValidationMiddleware = require('../../authorization/middlewares/auth.validation.middleware')

module.exports = function (app) {
    app.post('/category', [
        CategoriesController.insert
    ]);

    app.get('/category/:categoryId', [
        // ValidationMiddleware.validJWTNeeded,
        CategoriesController.getById
    ]);

    app.get('/categories', [
        // ValidationMiddleware.validJWTNeeded,
        CategoriesController.list
    ]);

    app.delete('/category/:categoryId', [
        // ValidationMiddleware.validJWTNeeded,
        CategoriesController.removeById
    ]);

    app.patch('/category/:categoryId', [
        ValidationMiddleware.validJWTNeeded,
        CategoriesController.patchById
    ]);

    app.post('/category/search', [
        CategoriesController.search
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