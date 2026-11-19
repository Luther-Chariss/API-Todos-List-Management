
const { body } = require("express-validator");

// VALIDASI REGISTER
const registerValidator = [
    body("name")
        .isString()
        .withMessage("Nama harus berupa teks")
        .trim()
        .notEmpty()
        .withMessage("Nama wajib diisi"),

    body("email")
        .isString()
        .withMessage("Email harus berupa teks")
        .trim()
        .isEmail()
        .withMessage("Format email tidak valid")
        .normalizeEmail(),

    body("password")
        .isString()
        .withMessage("Password harus berupa teks")
        .isLength({ min: 8 })
        .withMessage("Password minimal 8 karakter")
];

// VALIDASI LOGIN
const loginValidator = [
    body("email")
        .isString()
        .withMessage("Email harus berupa teks")
        .trim()
        .isEmail()
        .withMessage("Format email tidak valid")
        .normalizeEmail(),

    body("password")
        .isString()
        .withMessage("Password harus berupa teks")
        .notEmpty()
        .withMessage("Password wajib diisi")
];

module.exports = {
    registerValidator,
    loginValidator
};
