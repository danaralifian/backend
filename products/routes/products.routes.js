const ProductsController = require('../controllers/product.controller')
const ValidationMiddleware = require('../../authorization/middlewares/auth.validation.middleware')

module.exports = function (app) {
    app.post('/product', [
        ProductsController.insert
    ]);

    app.get('/product/:productId', [
        // ValidationMiddleware.validJWTNeeded,
        ProductsController.getById
    ]);

    app.get('/products', [
        // ValidationMiddleware.validJWTNeeded,
        ProductsController.list
    ]);

    app.delete('/product/:productId', [
        // ValidationMiddleware.validJWTNeeded,
        ProductsController.removeById
    ]);

    app.patch('/product/:productId', [
        ValidationMiddleware.validJWTNeeded,
        ProductsController.patchById
    ]);

    app.post('/product/search', [
        ProductsController.search
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