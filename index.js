const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Product = require("./models/product");
mongoose
  .connect("mongodb://localhost:27017/farmStand")
  .then(() => {
    console.log("Connection to MongoDB successful");
  })
  .catch((err) => {
    console.log("ERROR CONNECTING TO MONGODB!");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const categories = ["fruit", "vegetable", "dairy"];

app.get("/products", async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category });
    res.render("products/index", { products, category });
  } else {
    const products = await Product.find({});
    res.render("products/index", { products, category });
  }
});

app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;
  const product = await Product.findByIdAndUpdate(
    id,
    { name, price, category },
    { new: true, runValidators: true }
  );
  res.redirect(`/products/${product._id}`);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.post("/products", async (req, res) => {
  const { name, price, category } = req.body;
  const product = new Product({ name, price, category });
  await product.save();
  console.log(product);
  res.redirect(`/products/${product._id}`);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  console.log(product);
  res.render("products/show", { product });
});

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
