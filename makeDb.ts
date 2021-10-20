import { MongoMemoryReplSet } from "mongodb-memory-server";
import mongoose from "mongoose";

type MakeDbResponse = {
  mongoose: typeof mongoose;
  dbURI: string;
  mongoDbOptions: any;
};
const mongod = MongoMemoryReplSet.create({
  // issue seems to be here, as multiple calls to makeDb() would create this each time rather than using the same instance, so .stop()
  // doesn't do the cleanup?
  replSet: { count: 1, storageEngine: "wiredTiger" },
});

const makeDb = async (): Promise<MakeDbResponse> => {
  const URIOptions = "retryWrites=false&w=majority";
  let dbURI = `${(await mongod).getUri()}&${URIOptions}`;
  const mongoDbOptions: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    ignoreUndefined: true,
    useCreateIndex: true,
    readPreference: "nearest",
  };
  if (mongoose.connection.readyState != 1) {
    await mongoose.connect(dbURI, mongoDbOptions);
  }
  return { mongoose, dbURI, mongoDbOptions };
};

export { makeDb, MakeDbResponse, mongod };
