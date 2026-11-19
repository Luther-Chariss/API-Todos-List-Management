const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        todo_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Todo",
            required: true
        },
        action: {
            type: String,
            enum: ["created", "updated", "deleted"],
            required: true
        },
        details: {
            type: String,
            default: ""
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        updated_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        archived: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

module.exports = mongoose.model(
    "ActivityLog",
    activityLogSchema,
    "activitylogs"
);