const CategoryModel = require('../models/category.model')
const md5 = require('md5')

//create category
exports.insert = (req, res) => {
    let date = new Date()
    if(!req.body.description){
        req.body.description = ''
    }
    req.body.createdAt = date.toISOString()
    CategoryModel.createCategory(req.body)
        .then((result) => {
            res.status(200).send({id: result._id});
        })
        .catch((err)=>{
            res.status(400).send(err)
        })
};

//get category by Id
exports.getById = (req, res) => {
    console.log(req.params.categoryId)
    CategoryModel.findById(req.params.categoryId)
    .then((result) => {
        res.status(200).send(result);
    })
    .catch((err)=>{
        res.status(400).send(err)
    });
};

//get all category
exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    CategoryModel.list(limit, page).then((result) => {
        res.status(200).send({records : result});
    })
};

//remove category
exports.removeById = (req, res) => {
    CategoryModel.removeById(req.params.categoryId)
        .then((result)=>{
            res.status(200).send({message : 'category was deleted'});
        });
};

//update category data
exports.patchById = (req, res) => {
    if (req.body.password){
        let passwordMd5 = md5(req.body.password)
        req.body.password = passwordMd5
    }
    CategoryModel.patchCategory(req.params.categoryId, req.body).then((result) => {
        CategoryModel.findById(req.params.categoryId).then((result) => {
            let body = {
                data : result,
                message : 'successfull updated'
            }
            res.status(200).send(body);
        });
    });
 };

 exports.search = (req, res)=>{
     CategoryModel.searchCategory(req.body)
     .then((result)=>{
        res.status(200).send(result)
     })
     .catch((err)=>{
         res.status(200).send(err)
     })
 }