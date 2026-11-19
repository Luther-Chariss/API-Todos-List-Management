const ActivityLog = require("../models/activityLog.model");

// CREATE ACTIVITY LOG
const createActivityLog = async (data) => {
    const activityLog = await ActivityLog.create(data);

    return activityLog;
};

// GET ALL ACTIVITY LOGS
const getAllActivityLogs = async (userId) => {
    const activityLogs = await ActivityLog.find({
        user_id: userId,
        archived: false
    })
        .populate("todo_id", "title")
        .sort({ created_at: -1 });

    return activityLogs;
};

module.exports = {
    createActivityLog,
    getAllActivityLogs
};
