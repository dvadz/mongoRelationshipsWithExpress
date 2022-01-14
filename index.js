const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/home", (req, res) => {
  res.send("Hi there, Welcome home!");
});

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
