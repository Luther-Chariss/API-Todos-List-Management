
const authService = require("../services/auth.service");
const catchAsync = require("../utils/catchAsync");

// REGISTER
const register = catchAsync(async (req, res) => {
    const { name, email, password } = req.body;

    const result = await authService.register(
        name,
        email,
        password
    );

    res.status(201).json({
        status: "success",
        message: "Registrasi berhasil",
        data: result
    });
});

// LOGIN
const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const result = await authService.login(
        email,
        password
    );

    res.status(200).json({
        status: "success",
        message: "Login berhasil",
        data: result
    });
});

module.exports = {
    register,
    login
};
