import { Schema, model } from "mongoose";

const ListSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "Course" },
  fileUri: { type: String, required: true},
  lastModified: { type: Date, default: Date.now },
  dateAdded: { type: Date, default: Date.now },
  fileName: { type: String, required: true }
});

export default model("List", ListSchema);
