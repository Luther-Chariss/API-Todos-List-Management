
const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const generateToken = require("../utils/generateToken");

// REGISTER
const register = async (name, email, password) => {
    // Periksa data wajib
    if (!name || !email || !password) {
        throw new AppError("Nama, email, dan password wajib diisi", 400);
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Periksa apakah email sudah terdaftar
    const existingUser = await User.findOne({
        email: normalizedEmail
    });

    if (existingUser) {
        throw new AppError("Email sudah terdaftar", 409);
    }

    // Buat pengguna baru
    const user = await User.create({
        name,
        email: normalizedEmail,
        password
    });

    // Hilangkan password dari response
    const userData = user.toObject();
    delete userData.password;

    // Buat JWT
    const token = generateToken(user);

    return {
        user: userData,
        token
    };
};

// LOGIN
const login = async (email, password) => {
    if (!email || !password) {
        throw new AppError("Email dan password wajib diisi", 400);
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Cari pengguna sekaligus ambil password
    const user = await User.findOne({
        email: normalizedEmail
    }).select("+password");

    if (!user || user.archived) {
        throw new AppError("Email atau password salah", 401);
    }

    // Periksa kecocokan password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new AppError("Email atau password salah", 401);
    }

    // Hilangkan password dari response
    const userData = user.toObject();
    delete userData.password;

    // Buat JWT
    const token = generateToken(user);

    return {
        user: userData,
        token
    };
};

module.exports = {
    register,
    login
};
