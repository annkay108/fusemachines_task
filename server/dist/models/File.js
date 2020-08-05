"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ListSchema = new mongoose_1.Schema({
    courseId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Course" },
    fileUri: { type: String, required: true },
    lastModified: { type: Date },
    dateAdded: { type: Date },
    fileName: { type: String, required: true }
});
exports.default = mongoose_1.model("List", ListSchema);
//# sourceMappingURL=File.js.map