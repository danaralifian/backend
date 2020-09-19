const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const _ = require('lodash');

const userSchema = new Schema({
    firstName: {type : String, required : false},
    lastName: {type : String, required : false},
    email: {type : String, required : true, unique : true},
    password: {type : String, required : true},
    permissionLevel: {type : Number, required : true},
    createdAt : {type : Date, required : Date.now()},
    timeLogin : {type : Date, default : Date.now()}
});

const Model = mongoose.model('users', userSchema);
exports.userModel = Model;

//create user
exports.createUser = (userData) => {
    const user = new Model(userData);
    return user.save();
};

//find user by email
exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        Model.findOne({email : email})
            .exec(function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
    });
};

//get user by id
exports.findById = (id) => {
    return Model.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    });
};

//get all users
exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Model.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

//remove user
exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        Model.remove({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

//update user
exports.patchUser = (id, userData) => {
    const user = new Model(userData);
    return new Promise((resolve, reject) => {
        Model.findById(id, function (err, user) {
            if (err) reject(err);
            for (let i in userData) {
                user[i] = userData[i];
            }
            user.save(function (err, updatedUser) {
                if (err) return reject(err);
                resolve(updatedUser);
            });
        });
    })
};

//search user by email
exports.searchUser=(email)=>{
    return new Promise((resolve, reject)=>{
        Model.find(
            {
                $or : [
                    {
                        email: { $regex: email.toLowerCase() }
                    }
                ]
            }
        )
            .exec(function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
    })
}

