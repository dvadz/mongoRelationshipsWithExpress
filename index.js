const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/shopApp")
  .then(() => {
    console.log("Connection to MongoDB successful");
  })
  .catch((err) => {
    console.log("ERROR CONNECTING TO MONGODB!");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/home", (req, res) => {
  res.send("Hi there, Welcome home!");
});

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
