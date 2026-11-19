require("dotenv").config();

const mongoose = require("mongoose");

beforeAll(async () => {
    if (!process.env.MONGODB_TEST_URI) {
        throw new Error("MONGODB_TEST_URI belum dikonfigurasi");
    }

    await mongoose.connect(process.env.MONGODB_TEST_URI, {
        dbName: "db_luthfi_nabil_mutaqin_test"
    });
    
    console.log("Database testing connected!");
});

afterEach(async () => {
    const collections = mongoose.connection.collections;

    await Promise.all(
        Object.values(collections).map((collection) =>
            collection.deleteMany({})
        )
    );
});

afterAll(async () => {
    await mongoose.disconnect();
    console.log("Database testing disconnected!");
});