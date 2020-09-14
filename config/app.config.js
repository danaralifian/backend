const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({credential: admin.credential.cert(serviceAccount)})

module.exports = {
    db_uri: "MONGODB_URI",
    jwtSecret : 'JWT_KEY',
    api_key : 'API_KEY_TMDB',
    BASE_URL : 'https://api.themoviedb.org/3',
	admin : admin,
    stripeKey : 'STRIPE_KEY'
}