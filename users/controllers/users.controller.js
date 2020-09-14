const UserModel = require('../models/users.model')
const md5 = require('md5')

//create user
exports.insert = (req, res) => {
    let date = new Date()
    req.body.permissionLevel = 2
    req.body.createdAt = date.toISOString()
    UserModel.createUser(req.body)
        .then((result) => {
            res.status(200).send({id: result.email});
        })
        .catch((err)=>{
            res.status(400).send(err)
        })
};

//get user by Id
exports.getById = (req, res) => {
    UserModel.findById(req.params.userId).then((result) => {
        res.status(200).send(result);
    });
};

//get all user
exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    UserModel.list(limit, page).then((result) => {
        res.status(200).send({records : result});
    })
};

//remove user
exports.removeById = (req, res) => {
    UserModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(200).send({message : 'data was deleted'});
        });
};

//update user data
exports.patchById = (req, res) => {
    if (req.body.password){
        let passwordMd5 = md5(req.body.password)
        req.body.password = passwordMd5
    }
    UserModel.patchUser(req.params.userId, req.body).then((result) => {
        UserModel.findById(req.params.userId).then((result) => {
            let body = {
                data : result,
                message : 'successfull updated'
            }
            res.status(200).send(body);
        });
    });
 };

 exports.search = (req, res)=>{
     UserModel.searchUser(req.body.name)
     .then((result)=>{
        res.status(200).send(result)
     })
     .catch((err)=>{
         res.status(200).send(err)
     })
 }