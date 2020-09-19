const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const _ = require('lodash');

const categorySchema = new Schema({
    name: {type : String, required : true},
    description : {type : String, required : false},
    thumbnail : {type : String, required : false},
    createdAt : {type : Date, required : Date.now()},
});

const Model = mongoose.model('categories', categorySchema);
exports.categoryModel = Model

//create category
exports.createCategory = (categorySchema) => {
    const category = new Model(categorySchema);
    return category.save();
};

//find category by email
exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        Model.findOne({email : email})
            .exec(function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
    });
};

//get category by id
exports.findById = (id) => {
    return Model.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    });
};

//get all cateories
exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Model.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, categories) {
                if (err) {
                    reject(err);
                } else {
                    resolve(categories);
                }
            })
    });
};

//remove category
exports.removeById = (categoryId) => {
    return new Promise((resolve, reject) => {
        Model.deleteOne({_id: categoryId}, (err) => {
            if (err) {
                reject(err);
                console.log(err)
            } else {
                resolve(err);
            }
        });
    });
};

//update category
exports.patchCategory = (id, categoryData) => {
    const category = new Model(categoryData);
    return new Promise((resolve, reject) => {
        Model.findById(id, function (err, category) {
            if (err) reject(err);
            for (let i in categoryData) {
                category[i] = categoryData[i];
            }
            category.save(function (err, updatedCategory) {
                if (err) return reject(err);
                resolve(updatedCategory);
            });
        });
    })
};

//search category = (dataFilters)
exports.searchCategory=(dataFilters)=>{
    return new Promise((resolve, reject)=>{
        Model.find(
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

