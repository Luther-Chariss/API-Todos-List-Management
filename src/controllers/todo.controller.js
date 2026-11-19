const todoService = require("../services/todo.service");
const catchAsync = require("../utils/catchAsync");
const activityLogService = require("../services/activityLog.service");

// CREATE TODO
const createTodo = catchAsync(async (req, res) => {
    const todo = await todoService.createTodo(
        req.body,
        req.user._id
    );

    await activityLogService.createActivityLog({
        user_id: req.user._id,
        todo_id: todo._id,
        action: "created",
        details: `Membuat Todo: ${todo.title}`,
        created_by: req.user._id
    });

    res.status(201).json({
        status: "success",
        message: "Todo berhasil dibuat",
        data: {
            todo
        }
    });
});

// GET ALL TODOS + PAGINATION
const getAllTodos = catchAsync(async (req, res) => {
    const { page = 1, limit = 10, status, category_id, sort = "newest", search = "" } = req.query;

    const result = await todoService.getAllTodos(
        req.user._id,
        page,
        limit,
        { status, category_id },
        sort,
        search
    );

    res.status(200).json({
        status: "success",
        results: result.data.length,
        pagination: {
            currentPage: result.currentPage,
            limit: result.limit,
            totalTodos: result.totalTodos,
            totalPages: result.totalPages
        },
        data: {
            todos: result.data
        }
    });
});

// GET TODO BY ID
const getTodoById = catchAsync(async (req, res) => {
    const todo = await todoService.getTodoById(
        req.params.id,
        req.user._id
    );

    res.status(200).json({
        status: "success",
        data: {
            todo
        }
    });
});

// UPDATE TODO
const updateTodo = catchAsync(async (req, res) => {
    const todo = await todoService.updateTodo(
        req.params.id,
        req.body,
        req.user._id
    );

    await activityLogService.createActivityLog({
        user_id: req.user._id,
        todo_id: todo._id,
        action: "updated",
        details: `Memperbarui Todo: ${todo.title}`,
        created_by: req.user._id
    });

    res.status(200).json({
        status: "success",
        message: "Todo berhasil diperbarui",
        data: {
            todo
        }
    });
});

// DELETE TODO
const deleteTodo = catchAsync(async (req, res) => {
    const todo = await todoService.deleteTodo(
        req.params.id,
        req.user._id
    );

    await activityLogService.createActivityLog({
        user_id: req.user._id,
        todo_id: todo._id,
        action: "deleted",
        details: `Menghapus Todo: ${todo.title}`,
        created_by: req.user._id
    });

    res.status(200).json({
        status: "success",
        message: "Todo berhasil dihapus"
    });
});

module.exports = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo
};
