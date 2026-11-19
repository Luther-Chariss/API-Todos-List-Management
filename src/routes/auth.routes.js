const express = require("express");
const authController = require("../controllers/auth.controller");

const {
    registerValidator,
    loginValidator
} = require("../validators/auth.validator");

const validate = require("../middlewares/validate.middleware");

const router = express.Router();


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrasi pengguna baru
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Luthfi
 *               email:
 *                 type: string
 *                 example: luthfi@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *       400:
 *         description: Validasi input gagal
 *       409:
 *         description: Email sudah terdaftar
 */

// Register
router.post(
    "/register",
    registerValidator,
    validate,
    authController.register
);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login pengguna
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: luthfi@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login berhasil, mengembalikan data pengguna dan JWT Token
 *       400:
 *         description: Validasi input gagal
 *       401:
 *         description: Email atau password salah
 */


// Login
router.post(
    "/login",
    loginValidator,
    validate,
    authController.login
);

module.exports = router;
