const express = require("express");
const app = express();

const path = require("node:path");

const categoryRouter = require("./routes/categoryRouter");
const itemRouter = require("./routes/itemRouter");
const indexRouter = require("./routes/indexRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/categories", categoryRouter);
app.use("/items", itemRouter);
app.use("/", indexRouter);  

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server running on port: ${PORT}!`);
});
