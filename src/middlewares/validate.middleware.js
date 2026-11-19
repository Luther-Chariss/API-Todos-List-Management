
const { validationResult } = require("express-validator");
const AppError = require("../utils/AppError");

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => ({
            field: error.path,
            message: error.msg
        }));

        const appError = new AppError(
            "Validasi input gagal",
            400
        );

        appError.errors = errorMessages;

        return next(appError);
    }

    next();
};

module.exports = validate;
