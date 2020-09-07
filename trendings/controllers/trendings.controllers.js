const config = require('../../config/app.config')
const axios = require('axios')
const md5 = require('md5')

//get product by Id
exports.getById = (req, res) => {
    axios({
        url : config.BASE_URL + '/movie/'+ req.body.movieId +'?api_key=' + config.api_key,
        methode : 'GET'
    })
    .then(result=>{
        res.status(200).send({...result.data});
    })
    .catch(err=>{
        var error = {
            status : err.response.status,
            statusText : err.response.statusText,
            data : err.response.data
        }
        res.status(400).send(error);
    })
};

//get all product
exports.list = (req, res) => {
    axios({
        url : config.BASE_URL + '/trending/all/day?api_key=' + config.api_key,
        methode : 'GET'
    })
    .then(result=>{
        res.status(200).send({...result.data});
    })
    .catch(err=>{
        var error = {
            status : err.response.status,
            statusText : err.response.statusText,
            data : err.response.data
        }
        res.status(400).send(error);
    })
};
