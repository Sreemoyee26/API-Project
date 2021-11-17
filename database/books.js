const mongoose = require("mongoose");

//Book Schema
const bookSchema = mongoose.Schema(
    {
        ISBN: String,
        title: String,
        pubDate: String,
        lang: String,
        numPage: Number,
        author: [Number],
        publications: [Number],
        category: [String]
    }
);

//Book Model
const bookModel = mongoose.model("books", bookSchema);

module.exports = bookModel;