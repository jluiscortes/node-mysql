const request = require("supertest");
const app = require("../src/server/server");

describe("User API", () => {
  test("Should response status code 200 for list user", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
  });

  test("Should response status code 200 for find user by id", async () => {
    const response = await request(app).get("/user/1");
    expect(response.status).toBe(200);
  });

  test("Should response status code 200 for add user", async () => {
    const response = await request(app).post("/user").send({
      name: "Juan",
      email: "nuevo15@gmail.com",
      role: "01",
      password: "secret",
    });
    expect(response.status).toBe(200);
  });

  test("Should response status code 200 for update user", async () => {
    const response = await request(app).put("/user/2").send({
      name: "Juan",
      email: "2correo@gmail.com",
      role: "01",
      password: "secret",
      createdAt: "2023-08-15T11:38:49.000Z",
      updatedAt: "2023-08-15T13:00:49.000Z",
    });
    console.log({
      response,
    });
    expect(response.status).toBe(200);
  });

  test("Should response status code 200 for delete user", async () => {
    const response = await request(app).delete("/user/10");
    expect(response.status).toBe(200);
  });
});
