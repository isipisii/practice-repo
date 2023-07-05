import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    // select means it cannot be return whenever we retrieve the user
    email: { type: String, required: true, unique: true, select: false },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

type UserType = InferSchemaType<typeof userSchema>;

export default model<UserType>("User", userSchema);
