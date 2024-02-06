const request = require("supertest");
const app = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("debería devolver un array de cafés y un código de estado 200 en la ruta GET /cafes", async () => {
    const response = await request(app).get("/cafes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("debería devolver un código de estado 404 al intentar eliminar un café con un id que no existe", async () => {
    const response = await request(app).delete("/cafes/1000");
    expect(response.status).toBe(404);
  });

  it("debería agregar un nuevo café y devolver un código de estado 201 en la ruta POST /cafes", async () => {
    const newCafe = { id: 5, nombre: "Latte" };
    const response = await request(app)
      .post("/cafes")
      .send(newCafe);
    expect(response.status).toBe(201);
  });

  it("debería devolver un código de estado 400 si intenta actualizar un café enviando un id diferente en los parámetros", async () => {
    const cafeToUpdate = { id: 1, nombre: "Cortado actualizado" };
    const response = await request(app)
      .put("/cafes/2") // Intenta actualizar el café con un id diferente
      .send(cafeToUpdate);
    expect(response.status).toBe(400);
  });
});
