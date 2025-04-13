const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    searchBooksByTitle,
    getBooksByDateRange,
    getBooksStatistics
} = require('../controllers/bookController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         price:
 *           type: number
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Lấy danh sách tất cả sách
 *     tags: [Sách]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Tên tác giả
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Giá tối thiểu
 *     responses:
 *       200:
 *         description: Danh sách sách thành công
 */
router.get('/', verifyToken, getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Lấy thông tin sách theo ID
 *     tags: [Sách]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của sách
 *     responses:
 *       200:
 *         description: Thông tin chi tiết sách
 */
router.get('/:id', verifyToken, getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Thêm sách mới
 *     tags: [Sách]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Thêm sách thành công
 */
router.post('/', verifyToken, createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Cập nhật thông tin sách
 *     tags: [Sách]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của sách cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Cập nhật sách thành công
 */
router.put('/:id', verifyToken, updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Xóa sách
 *     tags: [Sách]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của sách cần xóa
 *     responses:
 *       204:
 *         description: Xóa sách thành công
 */
router.delete('/:id', verifyToken, deleteBook);

/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: Tìm kiếm sách theo tên
 *     tags: [Sách]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *         description: Từ khóa tìm kiếm
 *     responses:
 *       200:
 *         description: Danh sách sách tìm thấy
 */
router.get('/search', verifyToken, searchBooksByTitle);

/**
 * @swagger
 * /books/date-range:
 *   get:
 *     summary: Lấy sách theo khoảng thời gian
 *     tags: [Sách]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Ngày bắt đầu (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Ngày kết thúc (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Danh sách sách trong khoảng thời gian
 */
router.get('/date-range', verifyToken, getBooksByDateRange);

/**
 * @swagger
 * /books/statistics:
 *   get:
 *     summary: Thống kê sách theo tác giả
 *     tags: [Sách]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thống kê số lượng sách theo tác giả
 */
router.get('/statistics', verifyToken, getBooksStatistics);

module.exports = router;