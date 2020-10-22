const Model = require('../models/room.models')
const RoomUserModel = require('../models/roomUser.models')

exports.insert = (req, res) => {
    req.body.creatorId = req.jwt.userId
    Model.create(req.body)
    .then(result => {
        let roomUser = {
            roomId : result._id,
            userId : req.jwt.userId
        }

        RoomUserModel.create(roomUser)
        .then(resRoom=>{
            let record = Object.assign(result)
            record.creator = {
                id : resRoom.userId,
                joinedAt : resRoom.joinedAt
            }
            res.status(200).send(record);
        })            
    })
    .catch(err=>{
        res.status(400).send(err)
    })
};

//get all user
exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    let offset
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }

    let receiverId = req.jwt.userId
    Model.list(limit, page, offset, receiverId).then((result) => {
        res.status(200).send({records : result});
    })
};

exports.listRoomUserOwned=(req, res)=>{
    RoomUserModel.listRoomUserOwned(req.jwt.userId)
    .then(result=>{
        res.status(200).send(result)
    })
    .catch(err=>{
        res.status(400).send(err)
    })
    
}