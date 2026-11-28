const express = require("express");

const { protect } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

const {
    createTodoValidator,
    updateTodoValidator,
    todoIdValidator,
    paginationValidator
} = require("../validators/todo.validator");

const {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo
} = require("../controllers/todo.controller");

const router = express.Router();

// Semua route wajib login
router.use(protect);


/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Membuat Todo baru
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Belajar Node.js
 *               description:
 *                 type: string
 *                 example: Mempelajari Express dan MongoDB
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed]
 *                 example: pending
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: high
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-11-20"
 *               category_id:
 *                 type: string
 *                 nullable: true
 *                 description: ID kategori (opsional). Kosongkan jika Todo tidak menggunakan kategori.
 *     responses:
 *       201:
 *         description: Todo berhasil dibuat
 *       400:
 *         description: Validasi input gagal
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 */


// CREATE
router.post(
    "/",
    createTodoValidator,
    validate,
    createTodo
);


/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Mengambil daftar Todo dengan pagination dan filter
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Nomor halaman
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           maximum: 100
 *         description: Jumlah Todo per halaman
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, in_progress, completed]
 *         description: Filter berdasarkan status
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *         description: Filter berdasarkan ID kategori
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, oldest, title, priority]
 *           default: newest
 *         description: Urutan Todo
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Pencarian berdasarkan judul atau deskripsi
 *     responses:
 *       200:
 *         description: Daftar Todo berhasil diambil
 *       400:
 *         description: Parameter tidak valid
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 */


// READ ALL TODOS + PAGINATION
router.get(
    "/",
    paginationValidator,
    validate,
    getAllTodos
);


/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Mengambil detail Todo berdasarkan ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID Todo
 *     responses:
 *       200:
 *         description: Detail Todo berhasil diambil
 *       400:
 *         description: ID Todo tidak valid
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 *       404:
 *         description: Todo tidak ditemukan
 */


// Read Todo By ID
router.get(
    "/:id",
    todoIdValidator,
    validate,
    getTodoById
);


/**
 * @swagger
 * /api/todos/{id}:
 *   patch:
 *     summary: Memperbarui Todo berdasarkan ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID Todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Belajar JavaScript
 *               description:
 *                 type: string
 *                 example: Belajar JavaScript lanjutan
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed]
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-11-25"
 *               category_id:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Todo berhasil diperbarui
 *       400:
 *         description: Data atau ID tidak valid
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 *       404:
 *         description: Todo tidak ditemukan
 */


// UPDATE
router.patch(
    "/:id",
    updateTodoValidator,
    validate,
    updateTodo
);


/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Menghapus Todo berdasarkan ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID Todo
 *     responses:
 *       200:
 *         description: Todo berhasil dihapus
 *       400:
 *         description: ID Todo tidak valid
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 *       404:
 *         description: Todo tidak ditemukan
 */


// DELETE
router.delete(
    "/:id",
    todoIdValidator,
    validate,
    deleteTodo
);

module.exports = router;
