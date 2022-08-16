const mongoose = require("mongoose");
const { buffer } = require("rxjs");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: buffer, required: true },
});

module.exports = mongoose.model("Post", postSchema);
