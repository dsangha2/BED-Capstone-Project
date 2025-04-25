import request from "supertest";
import app     from "../src/app";

import { auth } from "../config/firebaseConfig";
jest.spyOn(auth, "verifyIdToken").mockResolvedValue({
  uid: "test-uid",
  role: "manager",
} as any);

jest.setTimeout(10000);

describe("POST /api/v1/tasks/:projectId/attachments", () => {
  it("should upload a file and return 201 + url", async () => {
    const fakeToken = "fake-jwt-token";

    const res = await request(app)
      .post("/api/v1/tasks/ABC123/attachments")
      .set("Authorization", `Bearer ${fakeToken}`)
      .attach("attachment", Buffer.from("hello"), "test.txt");

    expect(res.status).toBe(201);
    expect(res.body.data.url).toMatch(/^https?:\/\//);
  });
});