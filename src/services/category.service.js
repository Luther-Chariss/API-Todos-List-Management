
const Category = require("../models/category.model");
const AppError = require("../utils/AppError");

// Field yang boleh diisi atau diubah pengguna
const allowedFields = [
    "name",
    "description",
    "color"
];

// Filter input pengguna
const filterCategoryInput = (data) => {
    const filteredData = {};

    allowedFields.forEach((field) => {
        if (data[field] !== undefined) {
            filteredData[field] = data[field];
        }
    });

    return filteredData;
};

// CREATE CATEGORY
const createCategory = async (data, userId) => {
    const categoryData = filterCategoryInput(data);

    const category = await Category.create({
        ...categoryData,
        user_id: userId,
        created_by: userId
    });

    return category;
};

// GET ALL CATEGORIES
const getAllCategories = async (userId) => {
    const categories = await Category.find({
        user_id: userId,
        archived: false
    });

    return categories;
};

// GET CATEGORY BY ID
const getCategoryById = async (categoryId, userId) => {
    const category = await Category.findOne({
        _id: categoryId,
        user_id: userId,
        archived: false
    });

    if (!category) {
        throw new AppError("Kategori tidak ditemukan", 404);
    }

    return category;
};

// UPDATE CATEGORY
const updateCategory = async (categoryId, data, userId) => {
    const filteredData = filterCategoryInput(data);

    const category = await Category.findOne({
        _id: categoryId,
        user_id: userId,
        archived: false
    });

    if (!category) {
        throw new AppError("Kategori tidak ditemukan", 404);
    }

    Object.assign(category, filteredData);

    category.updated_by = userId;

    await category.save();

    return category;
};

// DELETE CATEGORY (SOFT DELETE)
const deleteCategory = async (categoryId, userId) => {
    const category = await Category.findOne({
        _id: categoryId,
        user_id: userId,
        archived: false
    });

    if (!category) {
        throw new AppError("Kategori tidak ditemukan", 404);
    }

    category.archived = true;
    category.updated_by = userId;

    await category.save();

    return category;
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
