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
const getAllBooksHandler = (request, h) => {
    const filteredBooks = books.map(book => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
    }));

    return h.response({
        status: 'success',
        message: "Berhasil mendapatkan data semua buku",
        data: {
            books: filteredBooks
        },
    }).code(200);
};


//getBookByIdHandler
const getBookByIdHandler = (request, h) => {
    const {bookId} = request.params
    
    const book = books.filter((book) => book.id === bookId)[0];

    if(book !== undefined) {
        const response = h.response({
            status: 'success',
            data:{
                book
            }
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    });
    response.code(404);
    return response;
};

//editBookByIdHandler
const editBookByIdHandler = (request, h) => {
    const {bookId} = request.params

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

    const updatedAt = new Date().toISOString();


    //nama tidak diisi
    if(!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nam buku'
        });
        response.code(400);
        return response;
    }

    //readpage > pageCount
    if(readPage > pageCount) {
        const response = h.response({
            statusbar: 'fail',
            message: 'Gagal memperbarui buku. Tidak boleh lebih besar dari PageCount'
        });
        response.code(400);
        return response;
    }

    const index = books.findIndex((book) => book.id === bookId)

    if(index !== -1){
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        }
        const response  = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
    });
    response.code(404);
    return response;
}

    //deleteBooksByIdHandler
const deleteBooksByIdHandler = (request, h) =>{
    const {bookId} = request.params;

    const index = books.findIndex((book)=> book.id === bookId);
    if(index !== -1){
        books.splice(index, 1);

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus'
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
    });
    response.code(404);
    return response;
}

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBooksByIdHandler };
