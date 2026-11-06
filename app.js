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

app.use((req, res) => {
    res.status(404).render("404");
});

app.use((err, req, res, next) => {
    res.status(500).render("error", {
        message: "Something went wrong on our server. Please try again later."
    });
});

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server running on port: ${PORT}!`);
});
