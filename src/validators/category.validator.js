const { body, param } = require("express-validator");

// VALIDASI CREATE CATEGORY
const createCategoryValidator = [
    body("name")
        .isString()
        .withMessage("Nama kategori harus berupa teks")
        .trim()
        .notEmpty()
        .withMessage("Nama kategori wajib diisi"),

    body("description")
        .optional()
        .isString()
        .withMessage("Deskripsi harus berupa teks"),

    body("color")
        .optional()
        .isString()
        .withMessage("Warna harus berupa teks")
        .matches(/^#[0-9A-Fa-f]{6}$/)
        .withMessage("Format warna harus HEX, contoh #3498db")
];

// VALIDASI UPDATE CATEGORY
const updateCategoryValidator = [
    param("id")
        .isMongoId()
        .withMessage("ID kategori tidak valid"),

    body()
        .custom((value) => {
            if (!value || Object.keys(value).length === 0) {
                throw new Error("Minimal satu data harus diubah");
            }
            return true;
        }),

    body("name")
        .optional()
        .isString()
        .withMessage("Nama kategori harus berupa teks")
        .trim()
        .notEmpty()
        .withMessage("Nama kategori tidak boleh kosong"),

    body("description")
        .optional()
        .isString()
        .withMessage("Deskripsi harus berupa teks"),

    body("color")
        .optional()
        .isString()
        .withMessage("Warna harus berupa teks")
        .matches(/^#[0-9A-Fa-f]{6}$/)
        .withMessage("Format warna harus HEX, contoh #3498db")
];

// VALIDASI ID CATEGORY
const categoryIdValidator = [
    param("id")
        .isMongoId()
        .withMessage("ID kategori tidak valid")
];

module.exports = {
    createCategoryValidator,
    updateCategoryValidator,
    categoryIdValidator
};
