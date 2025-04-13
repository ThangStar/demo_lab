let books = [
    {
        id: 1,
        title: "Dế Mèn Phiêu Lưu Ký",
        author: "Tô Hoài",
        price: 85000,
        createdAt: "2023-01-15"
    },
    {
        id: 2,
        title: "Số Đỏ",
        author: "Vũ Trọng Phụng",
        price: 95000,
        createdAt: "2023-02-20"
    },
    {
        id: 3,
        title: "Truyện Kiều",
        author: "Nguyễn Du",
        price: 150000,
        createdAt: "2023-03-10"
    },
    {
        id: 4,
        title: "Nhật Ký Trong Tù",
        author: "Hồ Chí Minh",
        price: 75000,
        createdAt: "2023-03-25"
    },
    {
        id: 5,
        title: "Tắt Đèn",
        author: "Ngô Tất Tố",
        price: 65000,
        createdAt: "2023-04-05"
    },
    {
        id: 6,
        title: "Chí Phèo",
        author: "Nam Cao",
        price: 55000,
        createdAt: "2023-04-15"
    },
    {
        id: 7,
        title: "Lão Hạc",
        author: "Nam Cao",
        price: 45000,
        createdAt: "2023-05-01"
    },
    {
        id: 8,
        title: "Vang Bóng Một Thời",
        author: "Nguyễn Tuân",
        price: 120000,
        createdAt: "2023-05-20"
    },
    {
        id: 9,
        title: "Những Ngã Tư Và Những Cột Đèn",
        author: "Trần Đăng Khoa",
        price: 89000,
        createdAt: "2023-06-10"
    },
    {
        id: 10,
        title: "Bên Kia Bờ Hy Vọng",
        author: "Nguyễn Ngọc Thuần",
        price: 92000,
        createdAt: "2023-06-25"
    },
    {
        id: 11,
        title: "Mắt Biếc",
        author: "Nguyễn Nhật Ánh",
        price: 88000,
        createdAt: "2023-07-05"
    },
    {
        id: 12,
        title: "Cho Tôi Xin Một Vé Đi Tuổi Thơ",
        author: "Nguyễn Nhật Ánh",
        price: 78000,
        createdAt: "2023-07-20"
    },
    {
        id: 13,
        title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
        author: "Nguyễn Nhật Ánh",
        price: 82000,
        createdAt: "2023-08-01"
    },
    {
        id: 14,
        title: "Sống Mòn",
        author: "Nam Cao",
        price: 68000,
        createdAt: "2023-08-15"
    },
    {
        id: 15,
        title: "Giông Tố",
        author: "Vũ Trọng Phụng",
        price: 72000,
        createdAt: "2023-08-30"
    },
    {
        id: 16,
        title: "Hồn Trương Ba, Da Hàng Thịt",
        author: "Lưu Quang Vũ",
        price: 95000,
        createdAt: "2023-09-10"
    },
    {
        id: 17,
        title: "Những Đứa Trẻ Chợ Long Biên",
        author: "Nguyễn Việt Hà",
        price: 115000,
        createdAt: "2023-09-25"
    },
    {
        id: 18,
        title: "Đất Rừng Phương Nam",
        author: "Đoàn Giỏi",
        price: 125000,
        createdAt: "2023-10-05"
    },
    {
        id: 19,
        title: "Kính Vạn Hoa",
        author: "Nguyễn Nhật Ánh",
        price: 135000,
        createdAt: "2023-10-20"
    },
    {
        id: 20,
        title: "Chiếc Lược Ngà",
        author: "Nguyễn Quang Sáng",
        price: 58000,
        createdAt: "2023-11-01"
    }
];

const getAllBooks = (req, res) => {
    const { author, minPrice } = req.query;
    let filteredBooks = [...books];

    if (author) {
        filteredBooks = filteredBooks.filter(book => book.author.includes(author));
    }
    if (minPrice) {
        filteredBooks = filteredBooks.filter(book => book.price >= parseFloat(minPrice));
    }

    res.json(filteredBooks);
};

const getBookById = (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
};

const createBook = (req, res) => {
    const newBook = {
        id: books.length + 1,
        ...req.body
    };
    books.push(newBook);
    res.status(201).json(newBook);
};

const updateBook = (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Book not found' });

    books[index] = { ...books[index], ...req.body };
    res.json(books[index]);
};

const deleteBook = (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Book not found' });

    books.splice(index, 1);
    res.status(204).send();
};

const searchBooksByTitle = (req, res) => {
    const { keyword } = req.query;
    if (!keyword) {
        return res.status(400).json({ message: 'Từ khóa tìm kiếm là bắt buộc' });
    }
    
    const results = books.filter(book => 
        book.title.toLowerCase().includes(keyword.toLowerCase())
    );
    res.json(results);
};

const getBooksByDateRange = (req, res) => {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Ngày bắt đầu và kết thúc là bắt buộc' });
    }

    const filteredBooks = books.filter(book => 
        book.createdAt >= startDate && book.createdAt <= endDate
    );
    res.json(filteredBooks);
};

const getBooksStatistics = (req, res) => {
    const authorStats = books.reduce((acc, book) => {
        acc[book.author] = (acc[book.author] || 0) + 1;
        return acc;
    }, {});

    const statistics = {
        totalBooks: books.length,
        totalAuthors: Object.keys(authorStats).length,
        booksByAuthor: authorStats
    };
    res.json(statistics);
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    searchBooksByTitle,
    getBooksByDateRange,
    getBooksStatistics
};