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

exports.getReviews = (req, res) => {
    axios({
        url : config.BASE_URL + '/movie/'+ req.body.movieId +'/reviews?api_key=' + config.api_key,
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
    var page = req.body.page ? req.body.page : 1
    axios({
        url : config.BASE_URL + '/movie/now_playing?api_key=' + config.api_key + '&page=' + page,
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

exports.listPopular = (req, res) => {
    axios({
        url : config.BASE_URL + '/movie/popular?api_key=' + config.api_key,
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

exports.listUpcoming = (req, res) => {
    var page = req.body.page ? req.body.page : 1
    axios({
        url : config.BASE_URL + '/movie/upcoming?api_key=' + config.api_key + '&page=' + page,
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

exports.search = (req, res) => {
    axios({
        url : config.BASE_URL + '/search/movie?api_key=' + config.api_key   
        + '&query=' + req.body.keyword
        + '&region=' + req.body.region
        + '&year=' + req.body.year
        + '&page=' + req.body.page,
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

exports.video = (req, res) => {
    axios({
        url : config.BASE_URL + '/movie/'+ req.body.movieId +'/videos?api_key=' + config.api_key,
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