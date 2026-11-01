const pool = require("./pool");

async function createCategory(name, description) {

    const {rows} = await pool.query("INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *" , [name, description]);
    return rows[0];
}

async function getAllCategories() {

    const {rows} = await pool.query("SELECT * FROM categories");
    return rows;
}

async function getCategoryById(id) {

    const {rows} = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
    return rows[0];
}

async function updateCategory(id, name, description) {

    const {rows} = await pool.query("UPDATE categories SET name = $1, description = $2 WHERE ID = $3 RETURNING *", [name, description, id]);
    return rows[0];
}

async function deleteCategory(id) {

    const {rows} = await pool.query("DELETE FROM categories WHERE id = $1 RETURNING *", [id]);
    return rows[0];
}

async function createItem(category_id, name, description, stock, price, image_url) {

    const {rows} = await pool.query("INSERT INTO items(category_id, name, description, stock, price, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [category_id, name, description, stock, price, image_url]);
    return rows[0];
}

async function getAllItems() {

    const {rows} = await pool.query("SELECT * FROM items");
    return rows;
}

async function getItemById(id) {

    const {rows} = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
    return rows[0];
}

async function getCategoryItems(category_id) {

    const {rows} = await pool.query("SELECT * FROM items WHERE category_id = $1", [category_id]);
    return rows;
}

async function updateItem(id, category_id, name, description, stock, price, image_url) {

    const {rows} = await pool.query("UPDATE items SET category_id = $1, name = $2, description = $3, stock = $4, price = $5, image_url = $6 WHERE id = $7 RETURNING *", [category_id, name, description, stock, price, image_url, id]);
    return rows[0];
}

async function deleteItem(id) {

    const {rows} = await pool.query("DELETE FROM items WHERE id = $1 RETURNING *", [id]);
    return rows[0];
}


module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    createItem,
    getAllItems,
    getItemById,
    getCategoryItems,
    updateItem,
    deleteItem
}