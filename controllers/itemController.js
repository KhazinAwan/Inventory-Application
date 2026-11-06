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

        res.status(404).send("Item not found.");
    }

    res.render("item" , {item: item});
}

async function getCategoryItems(req, res) {

    const {id} = req.params;
    const category = await db.getCategoryById(id);

    if(!category) {

        res.status(404).send("Category not found.");
    }

    const items = await db.getCategoryItems(id);
    res.render("items" , {items: items, category: category});
}

async function createItemGet(req, res) {

    const categories = await db.getAllCategories();
    res.render("itemForm" , {
        categories: categories,
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
    await db.createItem(Number(category_id), name, description, Number(stock), Number(price), image_url);
    res.redirect("/items");
}

async function updateItemGet(req, res) {

    const {id} = req.params;
    const item = db.getItemById(id);

    if(!item) {

        res.status(404).send("Item not found.");
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
    const item = await db.updateItem(id, Number(category_id), name, description, Number(stock), Number(price), image_url);

    if(!item) {

        res.status(404).send("Item not found.");
    }

    res.redirect("/items");
}

async function deleteItem(req, res) {

    const {id} = req.params;
    const item = await db.deleteItem(id);

    if(!item) {

        res.status(404).send("Item not found.");
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