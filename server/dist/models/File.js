"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// File model
const mongoose_1 = require("mongoose");
const ListSchema = new mongoose_1.Schema({
    courseId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Course" },
    fileUri: { type: String, required: true },
    lastModified: { type: Date, required: true },
    dateAdded: { type: Date, required: true },
    fileName: { type: String, required: true },
    size: { type: Number, required: true }
});
exports.default = mongoose_1.model("List", ListSchema);
//# sourceMappingURL=File.js.map