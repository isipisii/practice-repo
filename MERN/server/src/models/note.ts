import { InferSchemaType, Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
  },
  { timestamps: true }
);

type NoteType = InferSchemaType<typeof noteSchema>

export default model<NoteType>("Note", noteSchema);