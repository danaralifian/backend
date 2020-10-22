const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const roomScheme = new Schema({
    name : {type : String, required : true},
    attachment : {type : String, default: "", required : false},
    createdAt : {type : Date, default : Date.now()},
    personal : {type : Boolean, required : false, default : false},
    creatorId : {type : mongoose.Types.ObjectId, required : true}
})

const Model = mongoose.model('rooms', roomScheme);
exports.roomModel = Model;

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