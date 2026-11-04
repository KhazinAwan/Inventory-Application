const { Router } = require("express");
const itemController = require("../controllers/itemController");
const itemRouter = Router();

itemRouter.get("/", itemController.getAllItems);
itemRouter.get("/new", itemController.createItemGet);
itemRouter.get("/:id", itemController.getItemById);
itemRouter.get("/:id/update", itemController.updateItemGet);

itemRouter.post("/new", itemController.createItemPost);
itemRouter.post("/:id/update", itemController.updateItemPost);
itemRouter.post("/:id/delete", itemController.deleteItem);

module.exports = itemRouter;

