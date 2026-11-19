
const Todo = require("../models/todo.model");
const Category = require("../models/category.model");
const AppError = require("../utils/AppError");

// Field yang boleh diisi atau diubah pengguna
const allowedFields = [
    "title",
    "description",
    "status",
    "priority",
    "due_date",
    "category_id"
];

// Filter input pengguna
const filterTodoInput = (data) => {
    const filteredData = {};

    allowedFields.forEach((field) => {
        if (data[field] !== undefined) {
            filteredData[field] = data[field];
        }
    });

    return filteredData;
};

// CREATE TODO
const createTodo = async (data, userId) => {
    const todoData = filterTodoInput(data);

    // Periksa kategori
    const category = await Category.findOne({
        _id: todoData.category_id,
        user_id: userId,
        archived: false
    });

    if (!category) {
        throw new AppError("Kategori tidak ditemukan", 404);
    }

    const todo = await Todo.create({
        ...todoData,
        user_id: userId,
        created_by: userId
    });

    return todo;
};

// GET ALL TODOS + PAGINATION
const getAllTodos = async (userId, page = 1, limit = 10, filters = {}, sort = "newest", search = "") => {
    const currentPage = Math.max(1, Number(page) || 1);
    const perPage = Math.min(100, Math.max(1, Number(limit) || 10));

    const skip = (currentPage - 1) * perPage;

    const filter = {
        user_id: userId,
        archived: false
    };

    // Search berdasarkan judul dan deskripsi
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
        ];
    }

    // Filter berdasarkan status
    if (filters.status) {
        filter.status = filters.status;
    }

    // Filter berdasarkan kategori
    if (filters.category_id) {
        const category = await Category.findOne({
            _id: filters.category_id,
            user_id: userId,
            archived: false
        });

     if (!category) {
        throw new AppError("Kategori tidak ditemukan", 404);
    }
        filter.category_id = filters.category_id;
    }

    const totalTodos = await Todo.countDocuments(filter);

    const todos = await Todo.find(filter)
        .populate("category_id", "name")
        .sort(
            sort === "oldest" ? { created_at: 1 } :
            sort === "title" ? { title: 1 } :
            sort === "priority" ? { priority: -1 } :
            { created_at: -1 } 
        )
        .skip(skip)
        .limit(perPage);

    return {
        currentPage,
        limit: perPage,
        totalTodos,
        totalPages: Math.ceil(totalTodos / perPage),
        data: todos
    };
};

// GET TODO BY ID
const getTodoById = async (todoId, userId) => {
    const todo = await Todo.findOne({
        _id: todoId,
        user_id: userId,
        archived: false
    }).populate("category_id", "name");

    if (!todo) {
        throw new AppError("Todo tidak ditemukan", 404);
    }

    return todo;
};

// UPDATE TODO
const updateTodo = async (todoId, data, userId) => {
    const filteredData = filterTodoInput(data);

    const todo = await Todo.findOne({
        _id: todoId,
        user_id: userId,
        archived: false
    });

    if (!todo) {
        throw new AppError("Todo tidak ditemukan", 404);
    }

    // Periksa kategori baru jika dikirim
    if (filteredData.category_id) {
        const category = await Category.findOne({
            _id: filteredData.category_id,
            user_id: userId,
            archived: false
        });

        if (!category) {
            throw new AppError("Kategori tidak ditemukan", 404);
        }
    }

    Object.assign(todo, filteredData);

    todo.updated_by = userId;

    await todo.save();

    return todo;
};

// DELETE TODO (SOFT DELETE)
const deleteTodo = async (todoId, userId) => {
    const todo = await Todo.findOne({
        _id: todoId,
        user_id: userId,
        archived: false
    });

    if (!todo) {
        throw new AppError("Todo tidak ditemukan", 404);
    }

    todo.archived = true;
    todo.updated_by = userId;

    await todo.save();

    return todo;
};

module.exports = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo
};
