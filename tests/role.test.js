const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user.model");
const generateToken = require("../src/utils/generateToken");

describe("Role Authorization API", () => {
    let userToken;
    let adminToken;

    beforeEach(async () => {
        const user = await User.create({
            name: "User Testing",
            email: `user${Date.now()}@example.com`,
            password: "password123",
            role: "user"
        });

        const admin = await User.create({
            name: "Admin Testing",
            email: `admin${Date.now()}@example.com`,
            password: "password123",
            role: "admin"
        });

        userToken = generateToken(user);
        adminToken = generateToken(admin);
    });

    test("User harus berhasil mengakses route khusus user", async () => {
        const response = await request(app)
            .get("/api/roles/user")
            .set("Authorization", `Bearer ${userToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Selamat datang, User!");
    });

    test("Admin harus berhasil mengakses route khusus admin", async () => {
        const response = await request(app)
            .get("/api/roles/admin")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Selamat datang, Admin!");
    });

    test("User tidak boleh mengakses route khusus admin", async () => {
        const response = await request(app)
            .get("/api/roles/admin")
            .set("Authorization", `Bearer ${userToken}`);

        expect(response.statusCode).toBe(403);
        expect(response.body.status).toBe("fail");
    });

    test("Admin tidak boleh mengakses route khusus user", async () => {
        const response = await request(app)
            .get("/api/roles/user")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.statusCode).toBe(403);
        expect(response.body.status).toBe("fail");
    });

    test("Harus menolak akses tanpa token", async () => {
        const response = await request(app)
            .get("/api/roles/user");

        expect(response.statusCode).toBe(401);
    });
});