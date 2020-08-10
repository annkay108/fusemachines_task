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
class CourseRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    // GET course/ ===> show all the course
    getCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allCourse = yield Course_1.default.find({});
                res.status(201).json(allCourse);
            }
            catch (error) {
                next(http_errors_1.default(error));
            }
        });
    }
    // POST course/ ===> adds new course
    addCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { coursename, lastModified } = req.body;
            try {
                const newCourse = yield Course_1.default.create({ coursename, lastModified });
                res.status(201).json(newCourse);
            }
            catch (error) {
                next(http_errors_1.default(error));
            }
        });
    }
    // PUT /course/:id ===> updates the course
    updateCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { coursename } = req.body;
            try {
                const updatedCourse = yield Course_1.default.findByIdAndUpdate(id, { coursename });
                res.status(200).json(updatedCourse);
            }
            catch (error) {
                next(http_errors_1.default(error));
            }
        });
    }
    // DELETE /course/:id ===> deletes the selected course and the files in it.
    deleteCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deleteThisCourse = yield Course_1.default.findById(id);
                const deleteCourseFile = deleteThisCourse.courseFile;
                for (const i of deleteCourseFile) {
                    yield File_1.default.findByIdAndRemove(i);
                }
                yield Course_1.default.findByIdAndRemove(id);
                res.status(200).json("deleted");
            }
            catch (error) {
                next(http_errors_1.default(error));
            }
        });
    }
    routes() {
        this.router.get("/", this.getCourse);
        this.router.post("/", this.addCourse);
        this.router.put("/:id", this.updateCourse);
        this.router.delete("/:id", this.deleteCourse);
    }
}
const courseRoutes = new CourseRoutes();
exports.default = courseRoutes.router;
//# sourceMappingURL=courseRoutes.js.map