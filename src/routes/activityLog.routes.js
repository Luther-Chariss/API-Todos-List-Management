const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const {
    getAllActivityLogs
} = require("../controllers/activityLog.controller");

const router = express.Router();

// Semua endpoint wajib login
router.use(protect);


/**
 * @swagger
 * /api/activity-logs:
 *   get:
 *     summary: Mengambil riwayat aktivitas Todo milik pengguna
 *     tags: [Activity Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Riwayat aktivitas berhasil diambil
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 */


// GET ALL ACTIVITY LOGS
router.get("/", getAllActivityLogs);

module.exports = router;