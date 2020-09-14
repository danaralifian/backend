const TestController = require('./controller.test')

module.exports = function(app){
    app.post('/test/firestore', [
        TestController.firestoreInsert
    ]);

    app.post('/test/payment', [
        TestController.payment
    ]);

    app.post('/test/find_token_user', [
        TestController.findUserByToken
    ]);
}