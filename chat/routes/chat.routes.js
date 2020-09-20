const ChatController = require('../controllers/chat.controllers')
const ValidationMiddleware = require('../../authorization/middlewares/auth.validation.middleware')

module.exports = function (app) {
    app.post('/chat', [
        ValidationMiddleware.validJWTNeeded,
        ChatController.insert
    ]);

    app.get('/chats',[
        ValidationMiddleware.validJWTNeeded,
        ChatController.list
    ])
}