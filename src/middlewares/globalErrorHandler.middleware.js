
const globalErrorHandler = (err, req, res, next) => {
    console.error("SERVER ERROR:", err);
    
    let statusCode = err.statusCode || 500;
    let status = err.status || "error";
    let message = err.message || "Terjadi kesalahan pada server";

    // Mongoose: ID tidak valid
    if (err.name === "CastError") {
        statusCode = 400;
        status = "fail";
        message = "ID atau format data tidak valid";
    }

    // Mongoose: Validasi data gagal
    if (err.name === "ValidationError") {
        statusCode = 400;
        status = "fail";
        message = Object.values(err.errors)
            .map((error) => error.message)
            .join(", ");
    }

    // MongoDB: Data duplikat
    if (err.code === 11000) {
        statusCode = 409;
        status = "fail";
        const field = Object.keys(err.keyValue || {})[0];
        message = field
            ? `${field} sudah digunakan`
            : "Data sudah tersedia";
    }

    // JWT: Token tidak valid
    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        status = "fail";
        message = "Token tidak valid";
    }

    // JWT: Token kedaluwarsa
    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        status = "fail";
        message = "Token sudah kedaluwarsa";
    }

    // Jangan bocorkan detail kesalahan server
    if (statusCode >= 500) {
        status = "error";
        message = "Terjadi kesalahan pada server";
    }

    res.status(statusCode).json({
    status,
    message,
    ...(err.errors && statusCode < 500 ? { errors: err.errors } : {})
    });
};

module.exports = globalErrorHandler;
