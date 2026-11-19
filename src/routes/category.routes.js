const express = require("express");

const { protect } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

const {
    createCategoryValidator,
    updateCategoryValidator,
    categoryIdValidator
} = require("../validators/category.validator");

const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require("../controllers/category.controller");

const router = express.Router();

// Semua route wajib login
router.use(protect);


/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Membuat kategori baru
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pekerjaan
 *               description:
 *                 type: string
 *                 example: Kategori untuk tugas pekerjaan
 *               color:
 *                 type: string
 *                 example: "#3498db"
 *     responses:
 *       201:
 *         description: Kategori berhasil dibuat
 *       400:
 *         description: Validasi input gagal
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 *       409:
 *         description: Nama kategori sudah digunakan
 */


// CREATE
router.post(
    "/",
    createCategoryValidator,
    validate,
    createCategory
);


/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Mengambil semua kategori milik pengguna
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar kategori berhasil diambil
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 */


// READ
router.get("/", getAllCategories);


/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Mengambil detail kategori berdasarkan ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID kategori
 *     responses:
 *       200:
 *         description: Detail kategori berhasil diambil
 *       400:
 *         description: ID kategori tidak valid
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 *       404:
 *         description: Kategori tidak ditemukan
 */


router.get(
    "/:id",
    categoryIdValidator,
    validate,
    getCategoryById
);


/**
 * @swagger
 * /api/categories/{id}:
 *   patch:
 *     summary: Memperbarui kategori berdasarkan ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID kategori
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pendidikan
 *               description:
 *                 type: string
 *                 example: Kategori untuk kegiatan belajar
 *               color:
 *                 type: string
 *                 example: "#2ecc71"
 *     responses:
 *       200:
 *         description: Kategori berhasil diperbarui
 *       400:
 *         description: Data atau ID kategori tidak valid
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 *       404:
 *         description: Kategori tidak ditemukan
 */


// UPDATE
router.patch(
    "/:id",
    updateCategoryValidator,
    validate,
    updateCategory
);


/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Menghapus kategori berdasarkan ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID kategori
 *     responses:
 *       200:
 *         description: Kategori berhasil dihapus
 *       400:
 *         description: ID kategori tidak valid
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 *       404:
 *         description: Kategori tidak ditemukan
 */


// DELETE
router.delete(
    "/:id",
    categoryIdValidator,
    validate,
    deleteCategory
);

module.exports = router;
