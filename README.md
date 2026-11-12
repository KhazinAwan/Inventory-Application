# Volleyball Inventory Application

A web-based inventory management application for a volleyball store, built as part of **The Odin Project** NodeJS curriculum.

## Features

- **Category Management:** Create, view, update, and delete product categories.
- **Item Management:** Create, view, update, and delete inventory items.
- **Product Organization:** Browse products by category or view all available products.
- **Input Validation:** Validate user input and display helpful error messages.
- **Duplicate Prevention:** Prevent duplicate category names and duplicate item names within the same category.
- **Confirmation Prompts:** Confirm before deleting categories or items.
- **Cascade Deletion:** Deleting a category also deletes its associated items.
- **Error Handling:** Custom 404 and general error pages.
- **Responsive Layout:** Layouts adapt to smaller screens.

## Technologies Used

- JavaScript
- Node.js
- Express.js
- PostgreSQL
- EJS
- HTML
- CSS
- express-validator
- node-postgres (`pg`)

## Database Structure

The application uses a PostgreSQL database with two main tables:

**Categories**
- `id` – Primary key
- `name` – Category name
- `description` – Category description

**Items**
- `id` – Primary key
- `category_id` – Foreign key referencing categories
- `name` – Item name
- `description` – Item description
- `stock` – Available stock
- `price` – Item price
- `image_url` – Product image URL

Each item belongs to a category. Deleting a category automatically deletes its associated items.

## What I Learned

- Building server-side applications with Node.js and Express.
- Implementing CRUD (Create, Read, Update, Delete) operations.
- Working with PostgreSQL and relational database concepts.
- Using parameterized SQL queries to interact with a database.
- Implementing server-side form validation with express-validator.
- Organizing applications using the MVC pattern.
- Handling errors and invalid routes.
- Rendering dynamic pages using EJS.
- Managing database relationships and cascading deletes.