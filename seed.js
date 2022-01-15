const mongoose = require("mongoose");

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

const seedProducts = [
  {
    name: "Durian",
    price: 5.99,
    category: "fruit",
  },
  {
    name: "Malunggay",
    price: 1.99,
    category: "vegetable",
  },
  {
    name: "Sikwate",
    price: 7.99,
    category: "dairy",
  },
];

Product.insertMany(seedProducts)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => console.log("Error seeding the farmStand collection", e));
