const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user.model");

describe("Auth API", () => {
    const testUser = {
        name: "Auth Testing",
        email: `auth${Date.now()}@example.com`,
        password: "password123"
    };

    test("Register harus berhasil", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send(testUser);

        expect(response.statusCode).toBe(201);
        expect(response.body.status).toBe("success");
        expect(response.body.data.token).toBeDefined();
        expect(response.body.data.user.email).toBe(testUser.email);
        expect(response.body.data.user.password).toBeUndefined();
    });

    test("Register harus ditolak jika email sudah terdaftar", async () => {
        await User.create(testUser);

        const response = await request(app)
            .post("/api/auth/register")
            .send(testUser);

        expect(response.statusCode).toBe(409);
        expect(response.body.message).toBe("Email sudah terdaftar");
    });

    test("Register harus ditolak jika input tidak valid", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                name: "",
                email: "email-tidak-valid",
                password: "123"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.status).toBe("fail");
    });

    test("Login harus berhasil dengan password benar", async () => {
        await User.create(testUser);

        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: testUser.email,
                password: testUser.password
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.data.token).toBeDefined();
        expect(response.body.data.user.email).toBe(testUser.email);
        expect(response.body.data.user.password).toBeUndefined();
    });

    test("Login harus ditolak jika password salah", async () => {
        await User.create(testUser);

        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: testUser.email,
                password: "passwordsalah"
            });

        expect(response.statusCode).toBe(401);
    });

    test("Login harus ditolak jika email tidak terdaftar", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "tidakada@example.com",
                password: "password123"
            });

        expect(response.statusCode).toBe(401);
    });
});