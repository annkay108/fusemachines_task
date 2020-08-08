// course model
import { Schema, model } from 'mongoose';

const CourseSchema = new Schema({
    coursename: { type: String, required: true },
    courseFile: [{ type: Schema.Types.ObjectId, ref: "File" }],
    lastModified: { type: Date, default: Date.now }
});
export default model('Course', CourseSchema);