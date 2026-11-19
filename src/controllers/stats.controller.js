const statsService = require("../services/stats.service");
const catchAsync = require("../utils/catchAsync");

// GET STATISTICS SUMMARY
const getSummary = catchAsync(async (req, res) => {
    const summary = await statsService.getSummary();

    res.status(200).json({
        status: "success",
        message: "Statistik berhasil diambil",
        data: {
            summary
        }
    });
});

module.exports = {
    getSummary
};