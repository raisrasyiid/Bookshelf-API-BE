const { nanoid } = require('nanoid');
const books = require('./books');

// addBookHandler
const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage ? true : false;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    if (readPage > pageCount) {
        const response = h.response({
            status: "fail",
            message:
                "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    }

    // Validasi jika nama kosong
    if (!name) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
    }

    // Push newBook ke array books
    books.push(newBook);

    const isSuccess = books.some((book) => book.id === id);

    if (isSuccess) {
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: "error",
        message: "Buku gagal ditambahkan",
    });
    response.code(500);
    return response;
};

//getAllBookHandler
const getBooksHandler = (request, h) => {
    return h.response({
        status: 'success',
        data: {
            books,
        },
    }).code(200);
};

//getAllBookByIdHandler

module.exports = { addBookHandler, getBooksHandler };
