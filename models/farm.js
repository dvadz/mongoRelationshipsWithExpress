const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const farmSchema = new Schema({
  name: {
    type: String,
    required: "Farm must have a name",
  },
  city: {
    type: String,
  },
  email: {
    type: String,
    required: "Farm must have an email address",
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Farm = mongoose.model("Farm", farmSchema);
module.exports = Farm;
