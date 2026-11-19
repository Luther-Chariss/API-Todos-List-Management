const activityLogService = require("../services/activityLog.service");
const catchAsync = require("../utils/catchAsync");

// GET ALL ACTIVITY LOGS
const getAllActivityLogs = catchAsync(async (req, res) => {
    const activityLogs = await activityLogService.getAllActivityLogs(
        req.user._id
    );

    res.status(200).json({
        status: "success",
        results: activityLogs.length,
        data: {
            activityLogs
        }
    });
});

module.exports = {
    getAllActivityLogs
};
