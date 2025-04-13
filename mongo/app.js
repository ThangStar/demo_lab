const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const app = express();
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Student Management API',
            version: '1.0.0',
            description: 'API for managing student information'
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`
            }
        ]
    },
    apis: ['./app.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

const Student = require('./models/Student');

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - MSSV
 *         - HoTen
 *         - DiemTrungBinh
 *         - BoMon
 *         - Tuoi
 *       properties:
 *         MSSV:
 *           type: string
 *           description: Mã số sinh viên
 *         HoTen:
 *           type: string
 *           description: Họ và tên sinh viên
 *         DiemTrungBinh:
 *           type: number
 *           description: Điểm trung bình
 *         BoMon:
 *           type: string
 *           description: Bộ môn
 *         Tuoi:
 *           type: number
 *           description: Tuổi sinh viên
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Lấy toàn bộ danh sách sinh viên
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Danh sách sinh viên
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *   post:
 *     summary: Thêm mới một sinh viên
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Sinh viên đã được tạo thành công
 */

/**
 * @swagger
 * /students/cntt:
 *   get:
 *     summary: Lấy danh sách sinh viên thuộc khoa CNTT
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Danh sách sinh viên CNTT
 */

/**
 * @swagger
 * /students/score-range:
 *   get:
 *     summary: Lấy danh sách sinh viên có điểm từ 6.5 đến 8.5
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Danh sách sinh viên trong khoảng điểm
 */

/**
 * @swagger
 * /students/{mssv}:
 *   get:
 *     summary: Tìm sinh viên theo MSSV
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: mssv
 *         schema:
 *           type: string
 *         required: true
 *         description: Mã số sinh viên
 *     responses:
 *       200:
 *         description: Thông tin sinh viên
 *       404:
 *         description: Không tìm thấy sinh viên
 *   put:
 *     summary: Cập nhật thông tin sinh viên
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: mssv
 *         schema:
 *           type: string
 *         required: true
 *         description: Mã số sinh viên
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy sinh viên
 *   delete:
 *     summary: Xóa sinh viên
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: mssv
 *         schema:
 *           type: string
 *         required: true
 *         description: Mã số sinh viên
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy sinh viên
 */

/**
 * @swagger
 * /students/cntt/high-achievers:
 *   get:
 *     summary: Lấy danh sách sinh viên CNTT có DTB từ 9.0
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Danh sách sinh viên CNTT điểm cao
 */

/**
 * @swagger
 * /students/cntt/age-score:
 *   get:
 *     summary: Lấy danh sách sinh viên CNTT, tuổi 18-20, DTB từ 6.5
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Danh sách sinh viên theo điều kiện
 */

/**
 * @swagger
 * /students/sorted-by-score:
 *   get:
 *     summary: Sắp xếp sinh viên theo DTB tăng dần
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Danh sách sinh viên đã sắp xếp
 */

/**
 * @swagger
 * /students/cntt/top-score:
 *   get:
 *     summary: Tìm sinh viên CNTT có DTB cao nhất
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Sinh viên có điểm cao nhất
 */

// 1. Lấy toàn bộ danh sách sinh viên
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. Lấy danh sách sinh viên thuộc khoa CNTT
app.get('/students/cntt', async (req, res) => {
    try {
        const students = await Student.find({ BoMon: 'CNTT' });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Lấy danh sách sinh viên có điểm từ 6.5 đến 8.5
app.get('/students/score-range', async (req, res) => {
    try {
        const students = await Student.find({
            DiemTrungBinh: { $gte: 6.5, $lte: 8.5 }
        });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. Tìm sinh viên theo MSSV
app.get('/students/:mssv', async (req, res) => {
    try {
        const student = await Student.findOne({ MSSV: req.params.mssv });
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 5. Thêm sinh viên mới
app.post('/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 6. Cập nhật thông tin sinh viên
app.put('/students/:mssv', async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate(
            { MSSV: req.params.mssv },
            req.body,
            { new: true }
        );
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 7. Xóa sinh viên
app.delete('/students/:mssv', async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({ MSSV: req.params.mssv });
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json({ message: 'Student deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 8. Lấy danh sách sinh viên CNTT có DTB từ 9.0
app.get('/students/cntt/high-achievers', async (req, res) => {
    try {
        const students = await Student.find({
            BoMon: 'CNTT',
            DiemTrungBinh: { $gte: 9.0 }
        });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 9. Lấy danh sách sinh viên CNTT, tuổi 18-20, DTB từ 6.5
app.get('/students/cntt/age-score', async (req, res) => {
    try {
        const students = await Student.find({
            BoMon: 'CNTT',
            Tuoi: { $gte: 18, $lte: 20 },
            DiemTrungBinh: { $gte: 6.5 }
        });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 10. Sắp xếp sinh viên theo DTB tăng dần
app.get('/students/sorted-by-score', async (req, res) => {
    try {
        const students = await Student.find().sort({ DiemTrungBinh: 1 });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 11. Tìm sinh viên CNTT có DTB cao nhất
app.get('/students/cntt/top-score', async (req, res) => {
    try {
        const students = await Student.find({ BoMon: 'CNTT' })
            .sort({ DiemTrungBinh: -1 })
            .limit(1);
        res.json(students[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});