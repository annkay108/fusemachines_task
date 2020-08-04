"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_errors_1 = __importDefault(require("http-errors"));
const File_1 = __importDefault(require("../models/File"));
const Course_1 = __importDefault(require("../models/Course"));
const multerConfig_1 = __importDefault(require("../config/multerConfig"));
class FileRoute {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    addFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { courseId } = req.params;
                const filesArr = req.files;
                const { lastModified, dateAdded } = req.body;
                for (const i of filesArr) {
                    const newFile = yield File_1.default.create({ lastModified, dateAdded, destination: i.destination });
                    const addCourseFile = yield Course_1.default.findByIdAndUpdate(courseId, { lastModified, $push: { courseFile: newFile._id } }).populate('newFile');
                    res.status(201).json({ newFile, addCourseFile });
                }
            }
            catch (error) {
                next(http_errors_1.default(error));
            }
        });
    }
    routes() {
        this.router.post("/:courseId", multerConfig_1.default, this.addFile);
    }
}
const fileRoutes = new FileRoute();
exports.default = fileRoutes.router;
//# sourceMappingURL=fileRoutes.js.map