// File model
import { Schema, model } from "mongoose";

const ListSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "Course" },
  fileUri: { type: String, required: true},
  lastModified: { type: Date, required: true },
  dateAdded: { type: Date, required: true },
  fileName: { type: String, required: true },
  size:{type: Number, required: true}
});

export default model("List", ListSchema);
