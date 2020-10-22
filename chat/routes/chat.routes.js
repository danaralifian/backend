const ChatController = require('../controllers/chat.controllers')
const RoomController = require('../controllers/room.controller')
const RoomUserController = require('../controllers/roomUser.controller')
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

    app.post('/room', [
        ValidationMiddleware.validJWTNeeded,
        RoomController.insert
    ])

    app.get('/rooms', [
        ValidationMiddleware.validJWTNeeded,
        RoomController.list
    ])

    app.get('/rooms/owned', [
        ValidationMiddleware.validJWTNeeded,
        RoomController.listRoomUserOwned
    ])

    app.post('/room/join/:roomId', [
        ValidationMiddleware.validJWTNeeded,
        RoomUserController.join
    ])

    app.get('/room/leave/:roomId', [
        ValidationMiddleware.validJWTNeeded,
        RoomUserController.leave
    ])
}