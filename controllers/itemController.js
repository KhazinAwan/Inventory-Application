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
    res.render("itemForm" , {categories: categories})
}

async function createItemPost(req, res) {

    const {category_id, name, description, stock, price, image_url} = req.body;
    await db.createItem(category_id, name, description, stock, price, image_url);
    res.redirect("/items");
}

async function updateItemGet(req, res) {

    const {id} = req.params;
    const item = db.getItemById(id);

    if(!item) {

        res.status(404).send("Item not found.");
    }

    const categories = await db.getAllCategories();
    res.render("itemForm" , {item: item, categories: categories})
}

async function updateItemPost(req, res) {

    const {id} = req.params;
    const {category_id, name, description, stock, price, image_url} = req.body;
    const item = await db.updateItem(id, category_id, name, description, stock, price, image_url);

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