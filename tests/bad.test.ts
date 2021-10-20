import { expect } from "chai";
import { makeDb, mongod } from "../makeDb";

before(async () => {
  await makeDb();
});

beforeEach(async () => {});

describe("userDb", () => {
  it("should get the replset uri", async () => {
    const uri = (await mongod).getUri();
    expect(uri.length).to.equal(45);
  });
});

after(async () => {
  (await mongod).stop();
});
