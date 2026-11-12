const { Router } = require("express");
const itemController = require("../controllers/itemController");
const itemValidation = require("../validators/itemValidator");
const itemRouter = Router();

itemRouter.param("id", (req, res, next, id) => {
    if (!/^\d+$/.test(id)) {
        return res.status(404).render("404");
    }

    next();
});

itemRouter.get("/", itemController.getAllItems);
itemRouter.get("/new", itemController.createItemGet);
itemRouter.get("/:id", itemController.getItemById);
itemRouter.get("/:id/update", itemController.updateItemGet);

itemRouter.post("/new", itemValidation, itemController.createItemPost);
itemRouter.post("/:id/update", itemValidation, itemController.updateItemPost);
itemRouter.post("/:id/delete", itemController.deleteItem);

module.exports = itemRouter;

