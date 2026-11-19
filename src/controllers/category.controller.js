
const categoryService = require("../services/category.service");
const catchAsync = require("../utils/catchAsync");

// CREATE CATEGORY
const createCategory = catchAsync(async (req, res) => {
    const category = await categoryService.createCategory(
        req.body,
        req.user._id
    );

    res.status(201).json({
        status: "success",
        message: "Kategori berhasil dibuat",
        data: {
            category
        }
    });
});

// GET ALL CATEGORIES
const getAllCategories = catchAsync(async (req, res) => {
    const categories = await categoryService.getAllCategories(
        req.user._id
    );

    res.status(200).json({
        status: "success",
        results: categories.length,
        data: {
            categories
        }
    });
});

// GET CATEGORY BY ID
const getCategoryById = catchAsync(async (req, res) => {
    const category = await categoryService.getCategoryById(
        req.params.id,
        req.user._id
    );

    res.status(200).json({
        status: "success",
        data: {
            category
        }
    });
});

// UPDATE CATEGORY
const updateCategory = catchAsync(async (req, res) => {
    const category = await categoryService.updateCategory(
        req.params.id,
        req.body,
        req.user._id
    );

    res.status(200).json({
        status: "success",
        message: "Kategori berhasil diperbarui",
        data: {
            category
        }
    });
});

// DELETE CATEGORY
const deleteCategory = catchAsync(async (req, res) => {
    await categoryService.deleteCategory(
        req.params.id,
        req.user._id
    );

    res.status(200).json({
        status: "success",
        message: "Kategori berhasil dihapus"
    });
});

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
