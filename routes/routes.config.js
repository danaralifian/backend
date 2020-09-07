const userRoutes = require('../users/routes/users.routes')
const categoryRoutes = require('../categories/routes/categories.routes')
const productRoutes = require('../products/routes/products.routes')
const trendingsRoute = require('../trendings/routes/trendings.routes')
const moviesRoute = require('../movies/routes/movies.routes')
const shopRoute = require('../shop/routes/shop.routes')

module.exports = function (app) {

    // mendefinisikan router
    app.get('/', (req, res) => {
        res.json({"message": "Selamat datang Di Web server nodejs dan mongoDB"});
    });

    userRoutes(app);
    categoryRoutes(app);
    productRoutes(app);
    trendingsRoute(app);
    moviesRoute(app);
    shopRoute(app);
}