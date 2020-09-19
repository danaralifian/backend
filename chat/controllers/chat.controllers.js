const Model = require('../models/chat.models')
const verifyUser = require('../../authorization/middlewares/verify.user.middleware')

exports.insert = (req, res) => {
    verifyUser.userInfo(req)
    .then(find=>{
        req.body.senderId = find.userId
        Model.create(req.body)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err)=>{
            res.status(400).send(err)
        })
    })
    .catch(err=>{
        res.status(402).send({msg : 'You are unauthorize'})
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

    verifyUser.userInfo(req)
    .then(find=>{
        let receiverId = find.userId
        Model.list(limit, page, offset, receiverId).then((result) => {
            res.status(200).send({records : result});
        })
    })
};