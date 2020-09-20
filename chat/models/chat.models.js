const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const chatScheme = new Schema({
    senderId : {type : String, required : true},
    receiverId : {type : String, required : true},
    createAt : {type : Date, default : Date.now()},
    message : {type : String, required : true},
    attachments : {type : Array, required : false, default : [] },
    type : {type : String, required : false, default : 'personal'},
    received : {type : Boolean, required : true, default : false}
})

const Model = mongoose.model('chats', chatScheme);
exports.chatModel = Model;

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