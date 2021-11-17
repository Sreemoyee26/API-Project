require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Database
const database = require("./database/database");

//Models
const bookModel = require("./database/books");
const authorModel = require("./database/authors");
const publicationModel = require("./database/publications");

//Initialise express
const Booky = express();
Booky.use(express.json());
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
Booky.get("/", async (req, res) => {
    const getAllBooks = await bookModel.find();
    return res.json(getAllBooks);
});

/*
    Route         /is
    Description   Get specific book based on ISBN
    Access        Public
    Parameter     isbn
    Methods       GET
*/
Booky.get("/is/:isbn", async (req,res) => {
    const getSpecificBook = await bookModel.findOne(
        {
            ISBN: req.params.isbn
        }
    );
    if(!getSpecificBook){
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
Booky.get("/c/:category", async (req,res) => {
    const getSpecificBook = await bookModel.find(
        {
            category: req.params.category
        }
    );
    if(!getSpecificBook){
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
Booky.get("/lang/:language", async (req,res) => {
    const getSpecificBook = await bookModel.find(
        {
            language: req.params.language
        }
    );
    if(!getSpecificBook){
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
Booky.get("/author", async (req,res) => {
    const getAllAuthors = await authorModel.find();
    return res.json(getAllAuthors);
});

/*
    Route         /author
    Description   Get specific author based on ID
    Access        Public
    Parameter     id
    Methods       GET
*/
Booky.get("/author/:id", async (req,res) => {
    const getSpecificAuthor = await authorModel.findOne(
        {
            id: parseInt(req.params.id)
        }
    );
    if(!getSpecificAuthor){
        return res.json({error:`No author found with id of ${req.params.id}`});
    }
    return res.json({author: getSpecificAuthor});
});

/*
    Route         /author/book
    Description   Get specific authors based on books ISBN
    Access        Public
    Parameter     isbn
    Methods       GET
*/
Booky.get("/author/book/:isbn", async (req,res) => {
    const getSpecificAuthor = await authorModel.find(
        {
            books: req.params.isbn
        }
    );
    if(!getSpecificAuthor){
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
Booky.get("/publications", async (req,res) => {
    const getAllPublications = await publicationModel.find();
    return res.json(getAllPublications);
});

/*
    Route         /publications
    Description   Get specific publication based on ID
    Access        Public
    Parameter     id
    Methods       GET
*/
Booky.get("/publications/:id", async (req,res) => {
    const getSpecificPublication = await publicationModel.findOne(
        {
            id: req.params.id
        }
    );
    if(!getSpecificPublication){
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
Booky.get("/publications/book/:isbn", async (req,res) => {
    const getSpecificPublication = await publicationModel.findOne(
        {
            books: req.params.isbn
        }
    );
    if(!getSpecificPublication){
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
Booky.post("/book/new", async (req,res) => {
    const { newBook } = req.body;
    const addNewBook = bookModel.create(newBook);
    return res.json({updatedBooks: addNewBook, message: "Book was added"});
});

/*
    Route         /author/new
    Description   Add new author
    Access        Public
    Parameter     NONE
    Methods       POST
*/
Booky.post("/author/new", async (req,res) => {
    const { newAuthor } = req.body;
    const addNewAuthor = authorModel.create(newAuthor);
    return res.json({updatedAuthors: addNewAuthor, message: "Author was added"});
});

/*
    Route         /publication/new
    Description   Add new publication
    Access        Public
    Parameter     NONE
    Methods       POST
*/
Booky.post("/publication/new", async (req,res) => {
    const { newPublication } = req.body;
    const addNewPublication =  publicationModel.create(newPublication);
    return res.json({updatedPublications: addNewPublication, message: "Publication was added"});
});

/*
    Route         /publication/newc
    Description   Add new publication only if it is not present, if present update it
    Access        Public
    Parameter     NONE
    Methods       POST
*/
Booky.post("/publication/newc", async (req,res) => {
    const newPublication = req.body;
    var updatedPublications = await publicationModel.findOneAndUpdate(
        {
            name: newPublication.name
        },
        {
            books: newPublication.books
        },
        {
            new: true
        }
    );
    if(!updatedPublications){
        updatedPublications = publicationModel.create(newPublication);
    }
    return res.json({updatedPublications: updatedPublications});
});

/******PUT******/
/*
    Route         /author/update/book/
    Description   Update author 
    Access        Public
    Parameter     isbn
    Methods       PUT
*/
Booky.put("/author/update/book/:isbn", async (req,res) => {
    //Update author database
    const updatedAuthor = await authorModel.findOneAndUpdate(
        {
            id: req.body.newAuthor
        },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    );
    //Update books database
    const updatedBook = await bookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $addToSet:{
                author: req.body.newAuthor
            }
        },
        {
            new: true
        }
    );
    return res.json({books: updatedBook, authors: updatedAuthor, message: "Successfully updated authors"});
});

/*
    Route         /publication/update/book/
    Description   Update publication - a book can have only one publication 
    Access        Public
    Parameter     isbn
    Methods       PUT
*/
Booky.put("/publication/update/book/:isbn", async (req,res) => {
    //Update publication database
    const update = await publicationModel.findOneAndUpdate(
        {
            books: req.params.isbn
        },
        {
            $pull: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    );
    
    const updatedPublication = await publicationModel.findOneAndUpdate(
        {
            id: req.body.newPublication
        },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    );
    //Update books database
    const updatedBook = await bookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            publications: req.body.newPublication
        },
        {
            new: true
        }
    );
    return res.json({books: updatedBook, publications: updatedPublication, message: "Succe\\ssfully updated publications"});
});

/******DELETE******/
/*
    Route         /book/delete/
    Description   Delete a book
    Access        Public
    Parameter     isbn
    Methods       DELETE
*/
Booky.delete("/book/delete/:isbn", async (req,res) => {
    const updatedBooks = await bookModel.findOneAndDelete(
        {
            ISBN: req.params.isbn
        }
    );
    return res.json({books: updatedBooks, message: "Successfully deleted book"});
});

/*
    Route         /book/author/delete/
    Description   Delete a author from a book and vice versa
    Access        Public
    Parameter     isbn, authorId
    Methods       DELETE
*/

Booky.delete("/book/delete/author/:isbn/:authorId", async (req,res) => {
    //Update book database
    const updatedBook = await bookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $pull: {
                author: parseInt(req.params.authorId)
            }
        },
        {
            new: true
        }
    );
    //Update author database
    const updatedAuthor = await authorModel.findOneAndUpdate(
        {
            id: parseInt(req.params.authorId)
        },
        {
            $pull: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    );
    return res.json({books: updatedBook, authors: updatedAuthor, message: "Author is successfully deleted!!!"});
});

Booky.listen(3000, () => {
    console.log("Server on port 3000 is up and running");
});



// put publication: delete book from earlier publication