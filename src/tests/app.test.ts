import request from "supertest";
import { expect } from "chai";
import app from "../app";

describe("GET /api/status", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/api/status");
    expect(response.status).equal(200);
    expect(response.body).to.have.property("status");
    expect(response.body).to.have.property("data");
    expect(response.body.status).equal("success");
    expect(response.body.data).equal("OK");
  });
});

describe("GET /random-url", () => {
  it("should return 404", async () => {
    const response = await request(app).get("/api/random-url");
    expect(response.status).equal(404);
    expect(response.body).to.have.property("status");
    expect(response.body).to.have.property("data");
    expect(response.body.status).equal("fail");
    expect(response.body.data).equal("Not Found");
  });
});
