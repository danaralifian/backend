const md5 = require('md5')
const jwt = require('jsonwebtoken')
const {v4: uuidv4} = require('uuid')
const UserModel = require('../../users/models/users.model')
const config = require('../../config/app.config')

exports.isPasswordAndUserMatch = (req, res, next) => {
    UserModel.findByEmail(req.body.email)
        .then((user)=>{
            if(!user){
                res.status(403).send({message : 'Invalid email'});
            }else{
                let passwordMd5 = req.body.password
                let passwordFields = user.password
                if (passwordMd5 === passwordFields) {
                    req.body = {
                        userId: user._id,
                        email: user.email,
                        permissionLevel: user.permissionLevel,
                        provider: 'email',
                        name: user.firstName + ' ' + user.lastName,
                    };
                    return next();
                } else {
                    return res.status(400).send({errors: ['Invalid email or password']});
                }
            }
        });
};

exports.login = (req, res) => {
    try {   
        let token = jwt.sign(req.body, config.jwtSecret, {expiresIn : '7d'})
        let refresh_token = uuidv4()
        let body = Object.assign(req.body)
        body.accessToken = token
        body.refreshToken = refresh_token
        res.status(200).send(body);
    } catch (err) {
        res.status(500).send({errors: err});
    }
 };


exports.userInfo=(req)=>{
    return new Promise((resolve, reject)=>{
        if (req.headers && req.headers.authorization) {
            let authorization = req.headers['authorization'].split(' '),
                decoded;
            try {
                decoded = jwt.verify(authorization[1], config.jwtSecret);
            } catch (e) {
                reject(e)
            }
            resolve(decoded)
        }
    })
}