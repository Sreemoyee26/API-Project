const books = [
    {
        ISBN: "12345Book",
        title: "Tesla!!!",
        pubDate: "2021-11-05",
        lang: "en",
        numPage: 250,
        author: [1,2],
        publications: [1],
        category: ["tech","space","education"]
    }
]

const author = [
    {
        id: 1,
        name: "Sreemoyee",
        books: ["12345Book", "secretBook"]
    },
    {
        id: 2,
        name: "Pradipta",
        books: ["12345Book"]
    }
]

const publication = [
    {
        id: 1,
        name: "writex",
        books: ["12345Book"]
    }
]

module.exports = {books, author, publication};