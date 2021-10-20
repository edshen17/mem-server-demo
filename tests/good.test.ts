import { expect } from "chai";
import { MongoMemoryReplSet } from "mongodb-memory-server";

let replset: MongoMemoryReplSet;

before(async () => {
  replset = await MongoMemoryReplSet.create({
    replSet: { count: 1, storageEngine: "wiredTiger" },
  });
});

beforeEach(async () => {});

describe("userDb", () => {
  it("should get the replset uri", async () => {
    const uri = replset.getUri();
    expect(uri.length).to.equal(45);
  });
});

after(async () => {
  await replset.stop();
});
