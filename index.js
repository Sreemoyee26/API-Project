require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Database
const database = require("./database");

//Initialise express
const Booky = express();
Booky.use(bodyParser.urlencoded({extended: true}));
Booky.use(bodyParser.json());

//Connecting mongoose to MongoDB database

mongoose.connect(process.env.MONGO_URL, ()=>{
    console.log("Connection Established!!!");
});
 /* old version
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(() => console.log("Connection Established"));
*/
/******GET******/
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

/******POST******/
/*
    Route         /book/new
    Description   Add new book
    Access        Public
    Parameter     NONE
    Methods       POST
*/
Booky.post("/book/new",(req,res) => {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({upddatedBooks: database.books});
});

/*
    Route         /author/new
    Description   Add new author
    Access        Public
    Parameter     NONE
    Methods       POST
*/
Booky.post("/author/new",(req,res) => {
    const newAuthor = req.body;
    database.author.push(newAuthor);
    return res.json({updatedAuthors: database.author});
});

/*
    Route         /publication/new
    Description   Add new publication
    Access        Public
    Parameter     NONE
    Methods       POST
*/
Booky.post("/publication/new",(req,res) => {
    const newPublication = req.body;
    database.publication.push(newPublication);
    return res.json({updatedPublications: database.publication});
});

/*
    Route         /publication/newc
    Description   Add new publication only if it is not present, if present update it
    Access        Public
    Parameter     NONE
    Methods       POST
*/
Booky.post("/publication/newc",(req,res) => {
    const newPublication = req.body;
    var check = database.publication.map((pub) =>{
        if(pub.name === newPublication.name){
            pub.books = newPublication.books;
            return res.json({updatedPublications: database.publication});
        }
        else{
            return 0;
        }
    });
    if(parseInt(check) === 0){
        database.publication.push(newPublication);
        return res.json({updatedPublications: database.publication});   
    }
});

/******PUT******/
/*
    Route         /author/update/book/
    Description   Update author 
    Access        Public
    Parameter     isbn
    Methods       PUT
*/
Booky.put("/author/update/book/:isbn",(req,res) => {
    //Update author database
    database.author.forEach((author) => {
        if(author.id === req.body.authorId && !author.books.includes(req.params.isbn)){
            return author.books.push(req.params.isbn);
        }
    });
    //Update books database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn && !book.author.includes(req.body.authorId)){
            book.author.push(req.body.authorId);
            return;
        }
    });
    return res.json({books: database.books, authors: database.author, message: "Successfully updated authors"});
});

/*
    Route         /publication/update/book/
    Description   Update publication - a book can have only one publication 
    Access        Public
    Parameter     isbn
    Methods       PUT
*/
Booky.put("/publication/update/book/:isbn",(req,res) => {
    //Update publication database
    database.publication.forEach((pub) => {
        if(pub.books.includes(req.params.isbn)){
            pub.books = pub.books.filter((book) => book !== req.params.isbn);
        }
    });
    database.publication.forEach((pub) => {
        if(pub.id === req.body.pubId && !pub.books.includes(req.params.isbn)){
            return pub.books.push(req.params.isbn);
        }
    });
    //Update books database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publications = [req.body.pubId];
            return;
        }
    });
    return res.json({books: database.books, publications: database.publication, message: "Successfully updated publications"});
});

/******DELETE******/
/*
    Route         /book/delete/
    Description   Delete a book
    Access        Public
    Parameter     isbn
    Methods       DELETE
*/
Booky.delete("/book/delete/:isbn",(req,res) => {
    database.books = database.books.filter((book) => book.ISBN !== req.params.isbn);
    return res.json({books: database.books});
});

/*
    Route         /book/author/delete/
    Description   Delete a author from a book and vice versa
    Access        Public
    Parameter     isbn, authorId
    Methods       DELETE
*/
Booky.delete("/book/delete/author/:isbn/:authorId",(req,res) => {
    //Update book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.author = book.author.filter((author) => author !== parseInt(req.params.authorId));
            return;
        }
    });
    //Update author database
    database.author.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)){
            author.books = author.books.filter((book) => book !== req.params.isbn);
            return;
        }
    });
    return res.json({books: database.books, authors: database.author, message: "Author is successfully deleted!!!"});
});

Booky.listen(3000, () => {
    console.log("Server on port 3000 is up and running");
});