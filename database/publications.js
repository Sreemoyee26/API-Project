const mongoose = require("mongoose");

//Publication Schema
const publicationSchema = mongoose.Schema(
    {
        id: Number,
        name: String,
        books: [String]
    }
);

//Publication Model
const publicationModel = mongoose.model("publications", publicationSchema);

module.exports = publicationModel;