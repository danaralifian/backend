const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const contentChatScheme = new Schema({
    senderId : {type : String, required : true},
    roomId : {type : String, required : true},
    createdAt : {type : Date, default : Date.now()},
    message : {type : String, required : true},
    attachments : {type : Array, required : false, default : [] },
    read : {type : Boolean, required : false, default : false}
})

const Model = mongoose.model('content_chats', contentChatScheme);
exports.contentChatScheme = Model;

//create user
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

//remove user
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