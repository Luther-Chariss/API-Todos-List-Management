const Todo = require("../models/todo.model");
const Category = require("../models/category.model");

// GET TODO STATISTICS
const getSummary = async () => {
    const [
        totalTodos,
        pendingTodos,
        inProgressTodos,
        completedTodos,
        totalCategories
    ] = await Promise.all([
        Todo.countDocuments({ archived: false }),
        Todo.countDocuments({ status: "pending", archived: false }),
        Todo.countDocuments({ status: "in_progress", archived: false }),
        Todo.countDocuments({ status: "completed", archived: false }),
        Category.countDocuments({ archived: false })
    ]);

    return {
        totalTodos,
        pendingTodos,
        inProgressTodos,
        completedTodos,
        totalCategories
    };
};

module.exports = {
    getSummary
};