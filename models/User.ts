import { createSchema, ExtractDoc, Type, typedModel } from "ts-mongoose";

const UserSchema = createSchema({
  name: Type.string({ required: true, index: true }),
  email: Type.string({ required: true, index: true, unique: true }),
  password: Type.string({ required: false }),
});

const User = typedModel("User", UserSchema);
type UserDoc = ExtractDoc<typeof UserSchema>;

export { User, UserSchema, UserDoc };
