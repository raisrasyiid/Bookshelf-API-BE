const { addBookHandler, getBooksHandler, getBookByIdHandler, getAllBooksHandler } = require('./handler');

const routes = [
    {
        method: "POST",
        path: "/books",
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByIdHandler,
    },
    // {
    //     method: 'GET',
    //     path: '/books/{bookId}',
    //     handler: () => {},
    // },
];

module.exports = routes;
