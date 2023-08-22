const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: String,
  type: String,
  age: Number,
});

const Pet = mongoose.model("pet", petSchema);

module.exports = Pet;
