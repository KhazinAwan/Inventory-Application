const { body } = require("express-validator");
const db = require("../db/queries");

const itemValidation = [

    body("category_id")
        .notEmpty()
        .withMessage("Please select a category")
        .isInt({ min: 1 })
        .withMessage("Invalid category")
        .custom(async (value) => {
            const category = await db.getCategoryById(value);

            if (!category) {
                throw new Error("Selected category does not exist");
            }

            return true;
        }),

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Item name is required")
        .isLength({ max: 255 })
        .withMessage("Item name must be 255 characters or fewer"),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage("Description must be 255 characters or fewer"),

    body("stock")
        .notEmpty()
        .withMessage("Stock is required")
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer"),

    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .isFloat({ min: 0, decimal_digits: "0,2" })
        .withMessage("Price must be a non-negative number with up to 2 decimal places"),

    body("image_url")
        .optional({ checkFalsy: true })
        .trim()
        .isURL()
        .withMessage("Please enter a valid image URL"),

];

module.exports = itemValidation;

