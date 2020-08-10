"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// multer configuration
const storage = multer_1.default.diskStorage({
    destination: `./public/data/uploads`,
    filename(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer_1.default({
    storage,
    limits: { fileSize: 5000000 }
}).array("file");
exports.default = upload;
//# sourceMappingURL=multerConfig.js.map