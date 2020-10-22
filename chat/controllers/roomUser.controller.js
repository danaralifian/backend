const Model = require('../models/roomUser.models')

exports.join = (req, res) => {
    req.body.roomId = req.params.roomId
    req.body.userId = req.jwt.userId
    Model.create(req.body)
    .then(result=>{
        res.status(200).send(result);
    })
    .catch(err=>{
        res.status(400).send(err)
    })
    
};

exports.leave = (req, res) => {

}