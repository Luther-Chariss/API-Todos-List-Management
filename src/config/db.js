const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const dbName = process.env.NODE_ENV === "test"
            ? "db_luthfi_nabil_mutaqin_test"
            : "db_luthfi_nabil_mutaqin";

        cached.promise = mongoose.connect(
            process.env.NODE_ENV === "test"
                ? process.env.MONGODB_TEST_URI
                : process.env.MONGODB_URI,
            { dbName }
        );
    }

    try {
        cached.conn = await cached.promise;
        console.log("MongoDB connected successfully!");
        return cached.conn;
    } catch (error) {
        cached.promise = null;
        throw error;
    }
};

module.exports = connectDB;