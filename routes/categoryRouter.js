const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const itemController = require("../controllers/itemController");
const categoryValidation = require("../validators/categoryValidator.js");

const categoryRouter = Router();

categoryRouter.param("id", (req, res, next, id) => {
    
    if (!/^\d+$/.test(id)) {
        return res.status(404).render("404");
    }

    next();
});

categoryRouter.get("/:id/items", itemController.getCategoryItems);

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/new", categoryController.createCategoryGet);
categoryRouter.get("/:id", categoryController.getCategoryById);
categoryRouter.get("/:id/update", categoryController.updateCategoryGet);

categoryRouter.post("/new" , categoryValidation, categoryController.createCategoryPost);
categoryRouter.post("/:id/update", categoryValidation, categoryController.updateCategoryPost);
categoryRouter.post("/:id/delete", categoryController.deleteCategory);

module.exports = categoryRouter;