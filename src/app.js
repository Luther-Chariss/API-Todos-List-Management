const express = require("express");

// Import middleware
const logger = require("./middlewares/logger.middleware");
const notFound = require("./middlewares/notFound.middleware");
const globalErrorHandler = require("./middlewares/globalErrorHandler.middleware");

const roleRoutes = require("./routes/role.routes");

const categoryRoutes = require("./routes/category.routes");

const todoRoutes = require("./routes/todo.routes");

const authRoutes = require("./routes/auth.routes");

const activityLogRoutes = require("./routes/activityLog.routes");

const statsRoutes = require("./routes/stats.routes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

// Initialize Express
const app = express();

// Global middleware
app.use(express.json());
app.use(logger);

// Auth routes
app.use("/api/auth", authRoutes);

// Todo Routes
app.use("/api/todos", todoRoutes);

// Category Routes
app.use("/api/categories", categoryRoutes);

// Activity Log Routes
app.use("/api/activity-logs", activityLogRoutes);

// Role Routes
app.use("/api/roles", roleRoutes);

// Statistics Routes
app.use("/api/stats", statsRoutes);

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware untuk endpoint yang tidak ditemukan
app.use(notFound);

// Global error handler (harus paling akhir)
app.use(globalErrorHandler);

module.exports = app;