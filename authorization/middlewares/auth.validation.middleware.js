const jwt = require('jsonwebtoken')
const config = require('../../config/app.config')

exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], config.jwtSecret);
                return next();
            }
        } catch (err) {
            return res.status(401).send({message : `you're unathorized`});
        }
    } else {
        return res.status(401).send();
    }
};

exports.minimumPermissionLevelRequired = (required_permission_level) => {
    return (req, res, next) => {
        let user_permission_level = parseInt(req.jwt.permission_level);
        let user_id = req.jwt.user_id;
        if (user_permission_level & required_permission_level) {
            return next();
        } else {
            return res.status(403).send();
        }
    };
 };