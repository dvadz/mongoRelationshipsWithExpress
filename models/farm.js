const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./product");

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
farmSchema.post("findOneAndDelete", async (farm) => {
  if (farm.products.length) {
    const deleted = await Product.deleteMany({ _id: { $in: farm.products } });
  }
});

const Farm = mongoose.model("Farm", farmSchema);
module.exports = Farm;
