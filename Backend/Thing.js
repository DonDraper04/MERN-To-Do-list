const mongoose = require("mongoose");

const thingSchema = new mongoose.Schema({
  task: String,
  done: Boolean,
});

const Thing = mongoose.model("Thing", thingSchema);

module.exports = Thing;