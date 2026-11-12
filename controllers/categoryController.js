const { validationResult, matchedData } = require("express-validator");
const db = require("../db/queries.js");

async function getAllCategories(req,res) {

    const categories = await db.getAllCategories();
    res.render("categories" , {categories: categories});
}

async function getCategoryById(req, res) {

    const {id} = req.params;
    const category = await db.getCategoryById(id);
    const items = await db.getCategoryItems(id);

    if(!category) {

        return res.status(404).render("404");
    }

    res.render("category" , {
        category: category,
        items: items
    });
    
}

function createCategoryGet(req, res) {

    res.render("categoryForm", {
        category: null,
        isEditing: false
    });
}

async function createCategoryPost(req, res) {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {

        return res.status(400).render("categoryForm", {
            errors: errors.array(),
            category: req.body,
            isEditing: false
        })
    }

    const {name, description} = matchedData(req);

    try {
        await db.createCategory(name, description);
        res.redirect("/categories");
    }
    catch(err) {
        if (err.code === "23505") {
        return res.status(400).render("categoryForm", {
            isEditing: false,
            category: req.body,
            errors: [{ msg: "A category with this name already exists." }]
        });
    }

    next(err);

    }

}

async function updateCategoryGet(req, res) {

    const {id} = req.params;
    const category = await db.getCategoryById(id);

    if(!category) {

        return res.status(404).render("404");
    }

    res.render("categoryForm" , {
        category: category,
        isEditing: true
    });
}

async function updateCategoryPost(req, res) {

    const errors = validationResult(req);

    const {id} = req.params;

    if(!errors.isEmpty()) {

        return res.status(400).render("categoryForm", {
            errors: errors.array(),
            category: { ...req.body, id },
            isEditing: true
        })
    }

    const {name, description} = matchedData(req);

    try {

        const category = await db.updateCategory(id, name, description);

        if(!category) {

            return res.status(404).render("404");
        }
            
        res.redirect("/categories");

    }

    catch(err) {

        if (err.code === "23505") {

            return res.status(400).render("categoryForm", {
                errors: [{ msg: "A category with this name already exists." }],
                category: { ...req.body, id },
                isEditing: true
            });
        }

        next(err);
    }

}

async function deleteCategory(req, res) {

    const {id} = req.params;

    const category = await db.deleteCategory(id);

    if(!category) {
        res.status(404).render("404");
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