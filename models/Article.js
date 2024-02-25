const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const articleSchema = new Schema({
  title: String,
  body: String,
  numberOfLikes: Number,
});

// model  is just a function that takes a title and the schema and returns an object with methods for working with data in our
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
