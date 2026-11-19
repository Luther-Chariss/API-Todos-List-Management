const AppError = require("../utils/AppError");
const API_KEY = require("../config/apiKey");

const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];

    if (!API_KEY) {
        return next(new AppError("API Key belum dikonfigurasi di server", 500));
    }

    if (!apiKey || apiKey !== API_KEY) {
        return next(new AppError("API Key tidak valid atau tidak tersedia", 401));
    }

    next();
};

module.exports = verifyApiKey;