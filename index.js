const express = require("express");

//Database
const database = require("./database");

//Initialise express
const Booky = express();

/*
    Route         /
    Description   Get all the books
    Access        Public
    Parameter     NONE
    Methods       GET
*/
Booky.get("/", (req, res) => {
    return res.json({books: database.books});
});

/*
    Route         /is
    Description   Get specific books based on ISBN
    Access        Public
    Parameter     isbn
    Methods       GET
*/
Booky.get("/is/:isbn",(req,res) => {
    const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);
    if(getSpecificBook.length === 0){
        return res.json({error: `No book found for the ISBN of ${req.params.isbn}`})
    }
    return res.json({book:getSpecificBook});
});

/*
    Route         /c
    Description   Get specific books based on category
    Access        Public
    Parameter     category
    Methods       GET
*/
Booky.get("/c/:category",(req,res) => {
    const getSpecificBook = database.books.filter((book)=>book.category.includes(req.params.category));
    if(getSpecificBook.length === 0){
        return res.json({error:`No book found for the category of ${req.params.category}`})
    }
    return res.json({book:getSpecificBook});
});

/*
    Route         /lang
    Description   Get specific books based on languages
    Access        Public
    Parameter     language
    Methods       GET
*/
Booky.get("/lang/:language",(req,res) => {
    const getSpecificBook = database.books.filter((book)=>book.lang === req.params.language);
    if(getSpecificBook.length === 0){
        return res.json({error:`No book found with language of ${req.params.language}`})
    }
    return res.json({book:getSpecificBook});
});

/*
    Route         /author
    Description   Get all the authors
    Access        Public
    Parameter     NONE
    Methods       GET
*/
Booky.get("/author",(req,res) => {
    return res.json({author: database.author});
});

/*
    Route         /author
    Description   Get specific author based on ID
    Access        Public
    Parameter     id
    Methods       GET
*/
Booky.get("/author/:id",(req,res) => {
    const getSpecificAuthor = database.author.filter((author)=>author.id === parseInt(req.params.id));
    if(getSpecificAuthor.length === 0){
        return res.json({error:`No author found with id of ${req.params.id}`});
    }
    return res.json({author: getSpecificAuthor});
});

/*
    Route         /author/book
    Description   Get specific author based on books ISBN
    Access        Public
    Parameter     isbn
    Methods       GET
*/
Booky.get("/author/book/:isbn",(req,res) => {
    const getSpecificAuthor = database.author.filter((author)=>author.books.includes(req.params.isbn));
    if(getSpecificAuthor.length === 0){
        return res.json({error: `No author found with book of ${req.params.isbn}`});
    }
    return res.json({author: getSpecificAuthor});
});

/*
    Route         /publications
    Description   Get all the publications
    Access        Public
    Parameter     NONE
    Methods       GET
*/
Booky.get("/publications",(req,res) => {
    return res.json({publications: database.publication});
});

/*
    Route         /publications
    Description   Get specific publication based on ID
    Access        Public
    Parameter     id
    Methods       GET
*/
Booky.get("/publications/:id",(req,res) => {
    const getSpecificPublication = database.publication.filter((pub)=>pub.id === parseInt(req.params.id));
    if(getSpecificPublication.length === 0){
        return res.json({error:`No publications found with id of ${req.params.id}`});
    }
    return res.json({author: getSpecificPublication});
});

/*
    Route         /publications/book
    Description   Get specific publication based on books ISBN
    Access        Public
    Parameter     isbn
    Methods       GET
*/
Booky.get("/publications/book/:isbn",(req,res) => {
    const getSpecificPublication = database.publication.filter((pub)=>pub.books.includes(req.params.isbn));
    if(getSpecificPublication.length === 0){
        return res.json({error: `No publications found with book of ${req.params.isbn}`});
    }
    return res.json({author: getSpecificPublication});
});

Booky.listen(3000, () => {
    console.log("Server on port 3000 is up and running");
});