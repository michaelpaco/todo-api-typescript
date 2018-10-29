process.env.NODE_ENV = "test";
import { expect } from "chai";
import request from "supertest";
import app from "../app";
import mongoose, { Types } from "mongoose";
import { MONGODB_URI } from "../util/secrets";

let ID: Types.ObjectId;

beforeAll((done) => {
  mongoose.connect(MONGODB_URI, { useMongoClient: true })
    .then(() => {
      mongoose.connection.db.dropDatabase();
      done();
    });
});

describe("GET /api/todo", () => {
  it("should return ZERO todo", async () => {
    const response = await request(app).get("/api/todo");
    expect(response.status).equal(200);
    expect(response.body).to.be.have.property("status");
    expect(response.body).to.be.have.property("data");
    expect(response.body.status).equal("success");
    expect(response.body.data).to.be.an("array");
    expect(response.body.data).to.be.empty;
  });
});

describe("POST /api/todo", () => {
  it("should create a task with description 'Study'", async () => {
    const response = await request(app).post("/api/todo").send({ description: "Study" });
    expect(response.status).equal(200);
    expect(response.body).to.be.have.property("status");
    expect(response.body).to.be.have.property("data");
    expect(response.body.status).equal("success");
    expect(response.body.data).to.be.an("object");
    expect(response.body.data).to.be.have.property("_id");
    ID = response.body.data._id;
  });
});

describe("GET /api/todo", () => {
  it("should return one todo on array", async () => {
    const response = await request(app).get("/api/todo");
    expect(response.status).equal(200);
    expect(response.body).to.be.have.property("status");
    expect(response.body).to.be.have.property("data");
    expect(response.body.status).equal("success");
    expect(response.body.data).to.be.an("array");
    expect(response.body.data).to.have.lengthOf(1);
    expect(response.body.data[0]._id).equal(ID);
  });
});

describe("GET /api/todo/:id", () => {
  it(`should return one todo with ID: ${ID}`, async () => {
    const response = await request(app).get(`/api/todo/${ID}`);
    expect(response.status).equal(200);
    expect(response.body).to.be.have.property("status");
    expect(response.body).to.be.have.property("data");
    expect(response.body.status).equal("success");
    expect(response.body.data).to.be.an("object");
    expect(response.body.data).to.have.property("_id");
    expect(response.body.data._id).equal(ID);
  });

  it("should return null", async () => {
    const response = await request(app).get("/api/todo/5bd477359729775c5e082021");
    expect(response.status).equal(200);
    expect(response.body).to.be.have.property("status");
    expect(response.body).to.be.have.property("data");
    expect(response.body.status).equal("success");
    expect(response.body.data).to.be.null;
  });

  it("should return error", async () => {
    const response = await request(app).get("/api/todo/random-id");
    expect(response.status).equal(200);
    expect(response.body).to.be.have.property("status");
    expect(response.body).to.be.have.property("data");
    expect(response.body.status).equal("fail");
    expect(response.body.data).to.be.an("object");
    expect(response.body.data).to.have.property("message");
  });
});
