const ProductModel = require('../models/product.model')
const md5 = require('md5')

//create product
exports.insert = (req, res) => {
    let date = new Date()
    req.body.createdAt = date.toISOString()
    ProductModel.createModel(req.body)
        .then((result) => {
            res.status(200).send({id: result._id});
        })
        .catch((err)=>{
            res.status(400).send(err)
        })
};

//get product by Id
exports.getById = (req, res) => {
    ProductModel.findById(req.params.productId)
    .then((result) => {
        res.status(200).send(result);
    })
    .catch((err)=>{
        res.status(400).send(err)
    });
};

//get all product
exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    ProductModel.list(limit, page).then((result) => {
        res.status(200).send({records : result});
    })
};

//remove product
exports.removeById = (req, res) => {
    ProductModel.removeById(req.params.productId)
        .then((result)=>{
            res.status(200).send({message : 'product was deleted'});
        });
};

//update product data
exports.patchById = (req, res) => {
    if (req.body.password){
        let passwordMd5 = md5(req.body.password)
        req.body.password = passwordMd5
    }
    ProductModel.patchProduct(req.params.productId, req.body).then((result) => {
        ProductModel.findById(req.params.productId).then((result) => {
            let body = {
                data : result,
                message : 'successfull updated'
            }
            res.status(200).send(body);
        });
    });
 };

 exports.search = (req, res)=>{
     ProductModel.searchProduct(req.body)
     .then((result)=>{
        res.status(200).send(result)
     })
     .catch((err)=>{
         res.status(200).send(err)
     })
 }