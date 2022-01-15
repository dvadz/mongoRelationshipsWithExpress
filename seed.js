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

const p = new Product({ name: "Santol", price: 4.99, category: "fruit" });

p.save()
  .then((p) => {
    console.log(p);
  })
  .catch((e) => console.log("Error seeding the farmStand collection", e));
