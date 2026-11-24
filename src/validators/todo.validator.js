const { body, param, query } = require("express-validator");

// VALIDASI CREATE TODO
const createTodoValidator = [
    body("title")
        .isString()
        .withMessage("Judul Todo harus berupa teks")
        .trim()
        .notEmpty()
        .withMessage("Judul Todo wajib diisi"),

    body("description")
        .optional()
        .isString()
        .withMessage("Deskripsi harus berupa teks"),

    body("status")
        .optional()
        .isIn(["pending", "in_progress", "completed"])
        .withMessage("Status Todo tidak valid"),

    body("priority")
        .optional()
        .isIn(["low", "medium", "high"])
        .withMessage("Prioritas Todo tidak valid"),

    body("due_date")
        .optional({ values: "null" })
        .isISO8601()
        .withMessage("Format tanggal tidak valid"),

    body("category_id")
        .optional()
        .isMongoId()
        .withMessage("ID kategori tidak valid")
];

// VALIDASI UPDATE TODO
const updateTodoValidator = [
    param("id")
        .isMongoId()
        .withMessage("ID Todo tidak valid"),

    body()
        .custom((value) => {
            if (!value || Object.keys(value).length === 0) {
                throw new Error("Minimal satu data harus diubah");
            }
            return true;
        }),

    body("title")
        .optional()
        .isString()
        .withMessage("Judul Todo harus berupa teks")
        .trim()
        .notEmpty()
        .withMessage("Judul Todo tidak boleh kosong"),

    body("description")
        .optional()
        .isString()
        .withMessage("Deskripsi harus berupa teks"),

    body("status")
        .optional()
        .isIn(["pending", "in_progress", "completed"])
        .withMessage("Status Todo tidak valid"),

    body("priority")
        .optional()
        .isIn(["low", "medium", "high"])
        .withMessage("Prioritas Todo tidak valid"),

    body("due_date")
        .optional({ values: "null" })
        .isISO8601()
        .withMessage("Format tanggal tidak valid"),

    body("category_id")
        .optional()
        .isMongoId()
        .withMessage("ID kategori tidak valid")
];

// VALIDASI ID TODO
const todoIdValidator = [
    param("id")
        .isMongoId()
        .withMessage("ID Todo tidak valid")
];

// Pagination
const paginationValidator = [
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Halaman harus berupa angka minimal 1"),

    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Limit harus berupa angka antara 1 sampai 100"),

    // Validasi filter status
    query("status")
        .optional()
        .isIn(["pending", "in_progress", "completed"])
        .withMessage("Status Todo tidak valid"),

    // Validasi filter kategori
    query("category_id")
        .optional()
        .isMongoId()
        .withMessage("ID kategori tidak valid"),

    // Validasi sorting
    query("sort")
        .optional()
        .isIn(["newest", "oldest", "title", "priority"])
        .withMessage("Pilihan sorting tidak valid"),

    // Validasi search
    query("search")
        .optional()
        .isString()
        .withMessage("Pencarian harus berupa teks")
];


module.exports = {
    createTodoValidator,
    updateTodoValidator,
    todoIdValidator,
    paginationValidator
};
