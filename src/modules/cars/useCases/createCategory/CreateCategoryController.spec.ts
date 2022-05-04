import request from "supertest";
import { app } from "@shared/infra/http/app";

describe("Create Category Controller", () => {
  it("Should be able to create a new category", async () => {
    const response = await request(app).post("/categories").send({
      name: "Category SuperTest Name",
      description: "Category SuperTest Description",
    });

    expect(response.status).toBe(201);
  });
});

// parou na parte de criação do banco
