const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user.model");
const Category = require("../src/models/category.model");
const ActivityLog = require("../src/models/activityLog.model");

describe("Activity Log API", () => {
    let token;
    let categoryId;

    beforeEach(async () => {
        const user = await User.create({
            name: "Activity Testing",
            email: `activity${Date.now()}@example.com`,
            password: "password123"
        });

        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: user.email,
                password: "password123"
            });

        token = loginResponse.body.data.token;

        const category = await Category.create({
            name: "Activity Category",
            user_id: user._id,
            created_by: user._id
        });

        categoryId = category._id;
    });

    test("Harus mencatat aktivitas ketika Todo dibuat", async () => {
        await request(app)
            .post("/api/todos")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Todo Baru",
                category_id: categoryId
            });

        const logs = await ActivityLog.find({
            action: "created"
        });

        expect(logs.length).toBe(1);
        expect(logs[0].details).toBe("Membuat Todo: Todo Baru");
    });

    test("Harus mencatat aktivitas ketika Todo diperbarui", async () => {
        const todoResponse = await request(app)
            .post("/api/todos")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Todo Lama",
                category_id: categoryId
            });

        const todoId = todoResponse.body.data.todo._id;

        await request(app)
            .patch(`/api/todos/${todoId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Todo Baru"
            });

        const logs = await ActivityLog.find({
            action: "updated"
        });

        expect(logs.length).toBe(1);
        expect(logs[0].details).toBe("Memperbarui Todo: Todo Baru");
    });

    test("Harus mencatat aktivitas ketika Todo dihapus", async () => {
        const todoResponse = await request(app)
            .post("/api/todos")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Todo Hapus",
                category_id: categoryId
            });

        const todoId = todoResponse.body.data.todo._id;

        await request(app)
            .delete(`/api/todos/${todoId}`)
            .set("Authorization", `Bearer ${token}`);

        const logs = await ActivityLog.find({
            action: "deleted"
        });

        expect(logs.length).toBe(1);
        expect(logs[0].details).toBe("Menghapus Todo: Todo Hapus");
    });

    test("Harus menampilkan daftar Activity Log", async () => {
        await request(app)
            .post("/api/todos")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Todo Log",
                category_id: categoryId
            });

        const response = await request(app)
            .get("/api/activity-logs")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.data.activityLogs.length).toBe(1);
    });

    test("Harus menolak akses tanpa token", async () => {
        const response = await request(app)
            .get("/api/activity-logs");

        expect(response.statusCode).toBe(401);
    });
});