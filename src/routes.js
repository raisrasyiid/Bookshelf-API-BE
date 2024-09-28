const { addBookHandler, getBooksHandler } = require('./handler');

const routes = [
    {
        method: "POST",
        path: "/books",
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: () => {},
    },
];

module.exports = routes;
