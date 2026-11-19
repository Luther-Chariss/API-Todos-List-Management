
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// AUTHENTICATION
const protect = catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError("Token tidak ditemukan", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user || user.archived) {
        throw new AppError("Pengguna tidak ditemukan", 401);
    }

    req.user = user;
    next();
});

// AUTHORIZATION BASED ON ROLE
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    "Anda tidak memiliki izin untuk mengakses fitur ini",
                    403
                )
            );
        }

        next();
    };
};

module.exports = {
    protect,
    restrictTo
};
