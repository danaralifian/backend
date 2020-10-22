const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userModel = require('../../users/models/users.model')
const db = mongoose.connection

const roomUserScheme = new Schema({
    roomId : {type : mongoose.Types.ObjectId, required : true},
    userId : {type : mongoose.Types.ObjectId, required : true, },
    joinedAt : {type : Date, default : Date.now()},
})

const Model = mongoose.model('room_users', roomUserScheme);
exports.roomUserModel = Model;

//create
exports.create = (payload) => {
    const model = new Model(payload);
    return model.save();
};

//get all data
exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Model.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
    });
};

//remove id
exports.removeById = (id) => {
    return new Promise((resolve, reject) => {
        Model.remove({_id: id}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};


exports.listRoomUserOwned=(userId)=>{
    return new Promise((resolve, reject) => {
        Model.aggregate([
            {
                $match: {
                "userId": {
                    $eq: new mongoose.Types.ObjectId(userId)
                    }
                }
            },
            {
                $lookup : {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $lookup : {
                    from: 'rooms',
                    localField: 'roomId',
                    foreignField: '_id',
                    as: 'room'
                }
            },
            {$unwind: '$user'},
            {$unwind: '$room'},
        ]).then(res=>{
            resolve(res)
        })
        .catch(err =>{
            reject(err)
        })
    })
}