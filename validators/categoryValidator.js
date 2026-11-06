const { body } = require("express-validator");

const categoryValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({ max: 255 })
        .withMessage("Category name must be 255 characters or fewer"),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage("Description must be 255 characters or fewer"),
];

module.exports = categoryValidation;