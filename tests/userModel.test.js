const User = require("../src/models/user.model");

describe("User Model", () => {
    const testUser = {
        name: "User Testing",
        email: `testing${Date.now()}@example.com`,
        password: "password123"
    };

    let user;

    beforeEach(async () => {
        user = await User.create(testUser);
    });

    test("Harus berhasil membuat user baru", async () => {
        
        expect(user).toBeDefined();
        expect(user.name).toBe(testUser.name);
        expect(user.email).toBe(testUser.email);
    });

    test("Password harus di-hash sebelum disimpan", async () => {
        const user = await User.findOne({
            email: testUser.email
        }).select("+password");

        expect(user.password).not.toBe(testUser.password);
    });

    test("Password tidak boleh muncul dalam query biasa", async () => {
        const user = await User.findOne({
            email: testUser.email
        });

        expect(user.password).toBeUndefined();
    });

    test("Password yang benar harus diterima", async () => {
        const user = await User.findOne({
            email: testUser.email
        }).select("+password");

        const result = await user.comparePassword("password123");

        expect(result).toBe(true);
    });

    test("Password yang salah harus ditolak", async () => {
        const user = await User.findOne({
            email: testUser.email
        }).select("+password");

        const result = await user.comparePassword("passwordsalah");

        expect(result).toBe(false);
    });
});