const request = require("supertest");
const app = require("../src/app");

describe("Statistics API", () => {
    const apiKey = process.env.API_KEY;

    test("Harus berhasil mengambil statistik dengan API Key benar", async () => {
        const response = await request(app)
            .get("/api/stats/summary")
            .set("x-api-key", apiKey);

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.data.summary).toBeDefined();
        expect(response.body.data.summary.totalTodos).toBeDefined();
        expect(response.body.data.summary.totalCategories).toBeDefined();
    });

    test("Harus menolak API Key yang salah", async () => {
        const response = await request(app)
            .get("/api/stats/summary")
            .set("x-api-key", "api_key_salah");

        expect(response.statusCode).toBe(401);
        expect(response.body.status).toBe("fail");
    });

    test("Harus menolak request tanpa API Key", async () => {
        const response = await request(app)
            .get("/api/stats/summary");

        expect(response.statusCode).toBe(401);
        expect(response.body.status).toBe("fail");
    });
});