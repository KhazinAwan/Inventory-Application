const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const itemController = require("../controllers/itemController");
const categoryRouter = Router();

categoryRouter.get("/:id/items", itemController.getCategoryItems);

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/new", categoryController.createCategoryGet);
categoryRouter.get("/:id", categoryController.getCategoryById);
categoryRouter.get("/:id/update", categoryController.updateCategoryGet);

categoryRouter.post("/new" , categoryController.createCategoryPost);
categoryRouter.post("/:id/update", categoryController.updateCategoryPost);
categoryRouter.post("/:id/delete", categoryController.deleteCategory);

module.exports = categoryRouter;