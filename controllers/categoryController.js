const db = require("../db/queries.js");

async function getAllCategories(req,res) {

    const categories = await db.getAllCategories();
    res.render("categories" , {categories: categories});
}

async function getCategoryById(req, res) {

    const {id} = req.params;
    const category = await db.getCategoryById(id);

    if(!category) {

        return res.status(404).send("Category not found.");
    }

    res.render("category" , {category: category});
    
}

function createCategoryGet(req, res) {

    res.render("categoryForm");
}

async function createCategoryPost(req, res) {

    const {name, description} = req.body;
    await db.createCategory(name, description);
    res.redirect("/categories");
}

async function updateCategoryGet(req, res) {

    const {id} = req.params;
    const category = await db.getCategoryById(id);

    if(!category) {

        return res.status(404).send("Category not found.");
    }

    res.render("categoryForm" , {category: category});
}

async function updateCategoryPost(req, res) {

    const {id} = req.params;
    const {name, description} = req.body;

    const category = await db.updateCategory(id, name, description);

    if(!category) {

        return res.status(404).send("Category not found.")
    }
        
    res.redirect("/categories");
    
}
async function deleteCategory(req, res) {

    const {id} = req.params;

    const category = await db.deleteCategory(id);

    if(!category) {
        res.status(404).send("Category not found.")
    }

    res.redirect("/categories");

}


module.exports = {
    getAllCategories,
    getCategoryById,
    createCategoryGet,
    createCategoryPost,
    updateCategoryGet,
    updateCategoryPost,
    deleteCategory
};