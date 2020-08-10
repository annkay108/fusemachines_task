"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// course model
const mongoose_1 = require("mongoose");
const CourseSchema = new mongoose_1.Schema({
    coursename: { type: String, required: true },
    courseFile: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "File" }],
    lastModified: { type: Date, default: Date.now }
});
exports.default = mongoose_1.model('Course', CourseSchema);
//# sourceMappingURL=Course.js.map