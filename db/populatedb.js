const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ) NOT NULL UNIQUE,
    description VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS items (

    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR ( 255 ) NOT NULL,
    description VARCHAR ( 255 ),
    stock INTEGER NOT NULL CHECK (stock >= 0 ),
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    image_url VARCHAR( 255 )

);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
