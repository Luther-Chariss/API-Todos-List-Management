require("dotenv").config();

const app = require("../src/app");
const connectDB = require("../src/config/db");

module.exports = async (req, res) => {
    try {
        await connectDB();
        return app(req, res);
    } catch (error) {
        console.error("Database connection failed:", error);
        return res.status(500).json({
            status: "error",
            message: "Terjadi kesalahan pada server"
        });
    }
};