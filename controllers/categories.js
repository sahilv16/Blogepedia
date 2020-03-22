const { Category } = require('../db/models')

async function addCategory(catName) {
    return await Category.create({name: catName})
}

async function getAllCategories(){
    return await Category.findAll()
}

async function getAllCategoriesAsArray() {
    return (await Category.findAll).map(cat => cat.name)
}


module.exports = {
    addCategory,
    getAllCategories,
    getAllCategoriesAsArray
}