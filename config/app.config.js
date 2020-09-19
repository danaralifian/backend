const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({credential: admin.credential.cert(serviceAccount)})

module.exports = {
    db_uri: "mongodb+srv://danar0417:danar0417@simple-api-lhtma.gcp.mongodb.net/simple-api?retryWrites=true&w=majority",
    jwtSecret : 'news_api',
    api_key : 'a2d699e8b5443ba96949b35fe52be4af',
    BASE_URL : 'https://api.themoviedb.org/3',
    admin : admin,
    stripeKey : 'sk_test_51HQKwpAff9TCpJaUY62NFil1uv1rlIRBlLYSTSFFzjJqYyOT6QPi6qMto48Mtuf1eJKjUmvBdjS9xlbbfGYcDtcg00oIOUR5O1'
}