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

const CategoryModel = mongoose.model('Categories', categorySchema);

//create category
exports.createCategory = (categorySchema) => {
    const category = new CategoryModel(categorySchema);
    return category.save();
};

//find category by email
exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        CategoryModel.findOne({email : email})
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
    return CategoryModel.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    });
};

//get all cateories
exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        CategoryModel.find()
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
        CategoryModel.deleteOne({_id: categoryId}, (err) => {
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
    const category = new CategoryModel(categoryData);
    return new Promise((resolve, reject) => {
        CategoryModel.findById(id, function (err, category) {
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
        CategoryModel.find(
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

