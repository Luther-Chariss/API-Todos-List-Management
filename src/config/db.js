const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.NODE_ENV === "test"
                ? process.env.MONGODB_TEST_URI
                : process.env.MONGODB_URI,
            {
                dbName: process.env.NODE_ENV === "test"
                    ? "db_luthfi_nabil_mutaqin_test"
                    : "db_luthfi_nabil_mutaqin"
            }
        );

        console.log("MongoDB connected successfully!");
        console.log(
            `Database: ${process.env.NODE_ENV === "test"
                ? "db_luthfi_nabil_mutaqin_test"
                : "db_luthfi_nabil_mutaqin"}`
);

    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;