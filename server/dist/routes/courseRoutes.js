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
class CourseRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(201).json({ add: "hello" });
            }
            catch (error) {
                next(http_errors_1.default(error));
            }
        });
    }
    addCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { coursename, lastModified } = req.body;
            try {
                res.status(201).json({ add: "hello" });
            }
            catch (error) {
                next(http_errors_1.default(error));
            }
        });
    }
    routes() {
        this.router.get("/", this.getCourse);
    }
}
const courseRoutes = new CourseRoutes();
courseRoutes.routes();
exports.default = courseRoutes.router;
//# sourceMappingURL=courseRoutes.js.map