const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user.model");
const Category = require("../src/models/category.model");

describe("Category API", () => {
    let token;
    let categoryId;

    beforeEach(async () => {
        const user = await User.create({
            name: "Category Testing",
            email: `category${Date.now()}@example.com`,
            password: "password123"
        });

        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: user.email,
                password: "password123"
            });

        token = loginResponse.body.data.token;
    });

    test("Harus berhasil membuat kategori", async () => {
        const response = await request(app)
            .post("/api/categories")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Programming",
                description: "Kategori belajar programming",
                color: "#3498db"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.status).toBe("success");
        expect(response.body.data.category.name).toBe("Programming");
    });

    test("Harus menampilkan semua kategori", async () => {
        const user = await User.findOne({ name: "Category Testing" });

        await Category.create({
            name: "Programming",
            user_id: user._id,
            created_by: user._id
        });

        const response = await request(app)
            .get("/api/categories")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.data.categories.length).toBeGreaterThan(0);
    });

    test("Harus menampilkan kategori berdasarkan ID", async () => {
        const user = await User.findOne({ name: "Category Testing" });

        const category = await Category.create({
            name: "Database",
            user_id: user._id,
            created_by: user._id
        });

        const response = await request(app)
            .get(`/api/categories/${category._id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.data.category.name).toBe("Database");
    });

    test("Harus berhasil memperbarui kategori", async () => {
        const user = await User.findOne({ name: "Category Testing" });

        const category = await Category.create({
            name: "Programming Lama",
            user_id: user._id,
            created_by: user._id
        });

        const response = await request(app)
            .patch(`/api/categories/${category._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Programming Baru"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.data.category.name).toBe("Programming Baru");
    });

    test("Harus berhasil menghapus kategori", async () => {
        const user = await User.findOne({ name: "Category Testing" });

        const category = await Category.create({
            name: "Kategori Hapus",
            user_id: user._id,
            created_by: user._id
        });

        const response = await request(app)
            .delete(`/api/categories/${category._id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Kategori berhasil dihapus");

        const deletedCategory = await Category.findById(category._id);
        expect(deletedCategory.archived).toBe(true);
    });

    test("Harus menolak akses tanpa token", async () => {
        const response = await request(app)
            .get("/api/categories");

        expect(response.statusCode).toBe(401);
    });

    test("Harus menolak pembuatan kategori tanpa nama", async () => {
        const response = await request(app)
            .post("/api/categories")
            .set("Authorization", `Bearer ${token}`)
            .send({
                description: "Kategori tanpa nama"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.status).toBe("fail");
    });
});