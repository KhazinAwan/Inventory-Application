const { validationResult, matchedData } = require("express-validator");
const db = require("../db/queries.js");

async function getAllItems(req, res) {

    const items = await db.getAllItems();
    res.render("items" , {items: items});
}

async function getItemById(req, res) {

    const {id} = req.params;
    const item = await db.getItemById(id);

    if(!item) {

        res.status(404).render("404");
    }

    res.render("item" , {item: item});
}

async function getCategoryItems(req, res) {

    const {id} = req.params;
    const category = await db.getCategoryById(id);

    if(!category) {

        res.status(404).render("404");
    }

    const items = await db.getCategoryItems(id);
    res.render("items" , {items: items, category: category});
}

async function createItemGet(req, res) {

    const categories = await db.getAllCategories();
    res.render("itemForm" , {
        categories: categories,
        item: null,
        isEditing: false
    })
}

async function createItemPost(req, res) {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {

        const categories = await db.getAllCategories();

        return res.status(400).render("itemForm" , {

            errors: errors.array(),
            item: req.body,
            categories,
            isEditing: false

        })
    }

    const {category_id, name, description, stock, price, image_url} = matchedData(req);

    try {

        await db.createItem(Number(category_id), name, description, Number(stock), Number(price), image_url);
        res.redirect("/items");
    }

    catch(err) {

        if (err.code === "23505") {

        const categories = await db.getAllCategories();

        return res.status(400).render("itemForm", {
            errors: [{ msg: "An item with this name already exists in this category." }],
            item: req.body,
            categories,
            isEditing: false
        });
    }

        next(err);
    }
}

async function updateItemGet(req, res) {

    const {id} = req.params;
    const item = await db.getItemById(id);

    if(!item) {

        return res.status(404).render("404");
    }

    const categories = await db.getAllCategories();
    res.render("itemForm" , {
        item: item,
        categories: categories,
        isEditing: true
    })
}

async function updateItemPost(req, res) {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {

        const categories = await db.getAllCategories();

        return res.status(400).render("itemForm" , {

            errors: errors.array(),
            item: { ...req.body, id},
            categories,
            isEditing: true

        })
    }

    const {id} = req.params;
    const {category_id, name, description, stock, price, image_url} = matchedData(req);

    try {

        const item = await db.updateItem(id, Number(category_id), name, description, Number(stock), Number(price), image_url);

        if(!item) {

            res.status(404).render("404");
        }

        res.redirect("/items");
    }

    catch(err) {

         if (err.code === "23505") {

            const categories = await db.getAllCategories();

            return res.status(400).render("itemForm", {
                errors: [{ msg: "An item with this name already exists in this category." }],
                item: { ...req.body, id },
                categories,
                isEditing: true
            });
        }

        next(err);
    }
 
}

async function deleteItem(req, res) {

    const {id} = req.params;
    const item = await db.deleteItem(id);

    if(!item) {

        res.status(404).render("404");
    }

    res.redirect("/items");
}

module.exports = {
    getAllItems,
    getItemById,
    getCategoryItems,
    createItemGet,
    createItemPost,
    updateItemGet,
    updateItemPost,
    deleteItem
};