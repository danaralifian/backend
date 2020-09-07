const config = require('../../config/app.config')
const axios = require('axios')
const md5 = require('md5')
const _ = require('lodash')
const products = require('../../constants/products')
const recommendations = require('../../constants/recommendation')

//get product by Id
exports.getById = (req, res) => {
    let newArr = []
    recommendations.data.products.map((obj)=>{
        newArr.push(obj.product)
    })
    let records = _.concat(products.data, newArr)
    let id = req.params.productId
    let found = _.find(records,{id : id.split('-')[0]})
    if(!_.isEmpty(found)){
        res.status(200).send({data : found});
    }else{
        res.status(400).send({message : 'not found'});
    }
};

exports.serachByName = (req, res) => {
    let found = products.data.filter(el => el.name.toLowerCase().includes(req.body.keyword))
    if(!_.isEmpty(found)){
        res.status(200).send({data : found});
    }else{
        res.status(400).send({message : 'not found'});
    }
};


//get all product
exports.list = (req, res) => {
    res.status(200).send({data : products.data});
};

exports.listRecommendations = (req, res) => {
    res.status(200).send({data : recommendations.data});
};


