const express = require("express");
const verifyApiKey = require("../middlewares/apiKey.middleware");
const { getSummary } = require("../controllers/stats.controller");

const router = express.Router();

// Semua endpoint wajib menggunakan API Key
router.use(verifyApiKey);


/**
 * @swagger
 * /api/stats/summary:
 *   get:
 *     summary: Mengambil statistik ringkasan Todo dan Category
 *     tags: [Statistics]
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Statistik berhasil diambil
 *       401:
 *         description: API Key tidak valid atau tidak tersedia
 *       500:
 *         description: API Key belum dikonfigurasi di server
 */


// GET STATISTICS SUMMARY
router.get("/summary", getSummary);

module.exports = router;