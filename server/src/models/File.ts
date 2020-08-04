import { Schema, model } from "mongoose";

const ListSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "Course" },
  fileUri: { type: String },
  lastModified: { type: Date, default: Date.now },
  dateAdded: { type: Date, default: Date.now }
});

export default model("List", ListSchema);
