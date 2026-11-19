const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user.model");
const Category = require("../src/models/category.model");
const Todo = require("../src/models/todo.model");

describe("Todo API", () => {
    let token;
    let categoryId;

    beforeEach(async () => {
        const user = await User.create({
            name: "Todo Testing",
            email: `todo${Date.now()}@example.com`,
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
            name: "Kategori Testing",
            user_id: user._id,
            created_by: user._id
        });

        categoryId = category._id;
    });

    test("Harus berhasil membuat Todo", async () => {
        const response = await request(app)
            .post("/api/todos")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Belajar Jest",
                description: "Mempelajari automated testing",
                category_id: categoryId
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.status).toBe("success");
        expect(response.body.data.todo.title).toBe("Belajar Jest");
    });

    test("Harus menampilkan semua Todo", async () => {
        const user = await User.findOne({ name: "Todo Testing" });

        await Todo.create({
            title: "Todo Testing",
            category_id: categoryId,
            user_id: user._id,
            created_by: user._id
        });

        const response = await request(app)
            .get("/api/todos")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.data.todos.length).toBeGreaterThan(0);
        expect(response.body.pagination).toBeDefined();
    });

    test("Harus menampilkan Todo berdasarkan ID", async () => {
        const user = await User.findOne({ name: "Todo Testing" });

        const todo = await Todo.create({
            title: "Todo Detail",
            category_id: categoryId,
            user_id: user._id,
            created_by: user._id
        });

        const response = await request(app)
            .get(`/api/todos/${todo._id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.data.todo.title).toBe("Todo Detail");
    });

    test("Harus berhasil memperbarui Todo", async () => {
        const user = await User.findOne({ name: "Todo Testing" });

        const todo = await Todo.create({
            title: "Judul Lama",
            category_id: categoryId,
            user_id: user._id,
            created_by: user._id
        });

        const response = await request(app)
            .patch(`/api/todos/${todo._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Judul Baru"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.data.todo.title).toBe("Judul Baru");
    });

    test("Harus berhasil menghapus Todo", async () => {
        const user = await User.findOne({ name: "Todo Testing" });

        const todo = await Todo.create({
            title: "Todo Hapus",
            category_id: categoryId,
            user_id: user._id,
            created_by: user._id
        });

        const response = await request(app)
            .delete(`/api/todos/${todo._id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Todo berhasil dihapus");

        const deletedTodo = await Todo.findById(todo._id);
        expect(deletedTodo.archived).toBe(true);
    });

    test("Harus menolak akses tanpa token", async () => {
        const response = await request(app)
            .get("/api/todos");

        expect(response.statusCode).toBe(401);
    });

    test("Harus menolak pembuatan Todo tanpa judul", async () => {
        const response = await request(app)
            .post("/api/todos")
            .set("Authorization", `Bearer ${token}`)
            .send({
                category_id: categoryId
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.status).toBe("fail");
    });
});