
const express = require("express");

const {
    protect,
    restrictTo
} = require("../middlewares/auth.middleware");

const router = express.Router();


/**
 * @swagger
 * /api/roles/admin:
 *   get:
 *     summary: Mengakses route khusus Admin
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Selamat datang, Admin!
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 *       403:
 *         description: Akses ditolak, hanya Admin yang diizinkan
 */


// Route khusus admin
router.get(
    "/admin",
    protect,
    restrictTo("admin"),
    (req, res) => {
        res.status(200).json({
            status: "success",
            message: "Selamat datang, Admin!"
        });
    }
);


/**
 * @swagger
 * /api/roles/user:
 *   get:
 *     summary: Mengakses route khusus User
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Selamat datang, User!
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 *       403:
 *         description: Akses ditolak, hanya User yang diizinkan
 */


// Route khusus user
router.get(
    "/user",
    protect,
    restrictTo("user"),
    (req, res) => {
        res.status(200).json({
            status: "success",
            message: "Selamat datang, User!"
        });
    }
);

module.exports = router;
