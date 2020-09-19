const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const _ = require('lodash');
const { Double, Decimal128 } = require('mongodb');

const productSchema = new Schema({
    name: {type : String, required : true},
    description : {type : String, required : true, default : ''},
    thumbnail : {type : String, required : true},
    createdAt : {type : Date, required : Date.now()},
    price : {type : Number , required : true},
    isActive : {type : Boolean, default : false},
    categoryId : {type : String, required : true},
});

const ProductModel = mongoose.model('Products', productSchema);

//create product
exports.createModel = (productSchema) => {
    const product = new ProductModel(productSchema);
    return product.save();
};

//find product by email
exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        ProductModel.findOne({email : email})
            .exec(function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
    });
};

//get product by id
exports.findById = (id) => {
    return ProductModel.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    });
};

//get all cateories
exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        ProductModel.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, products) {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            })
    });
};

//remove product
exports.removeById = (productId) => {
    return new Promise((resolve, reject) => {
        ProductModel.deleteOne({_id: productId}, (err) => {
            if (err) {
                reject(err);
                console.log(err)
            } else {
                resolve(err);
            }
        });
    });
};

//update product
exports.patchProduct = (id, productData) => {
    const product = new ProductModel(productData);
    return new Promise((resolve, reject) => {
        ProductModel.findById(id, function (err, product) {
            if (err) reject(err);
            for (let i in productData) {
                product[i] = productData[i];
            }
            product.save(function (err, productData) {
                if (err) return reject(err);
                resolve(productData);
            });
        });
    })
};

//search product = (dataFilters)
exports.searchProduct=(dataFilters)=>{
    return new Promise((resolve, reject)=>{
        ProductModel.find(
            {
                $or : [
                    {
                        name: { $regex: /^dan/i }
                    }
                ]
            }
        )
            .exec(function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
    })
}

