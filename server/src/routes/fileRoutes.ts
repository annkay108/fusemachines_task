import { Router, Request, Response, NextFunction } from "express";
import createError from "http-errors";

import File from "../models/File";
import Course from "../models/Course";
import upload from "../config/multerConfig";

class FileRoute{
    router: Router;
    constructor(){
        this.router = Router();
        this.routes();
    }

    public async getAllFile (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const allFile = await File.find({});
            res.status(201).json(allFile);
        } catch (error) {
            next(createError(error));
        }
    }

    public async addFile(req: Request, res: Response, next: NextFunction):Promise<void> {
        try {
            const { courseId } = req.params;
            const filesArr:any = req.files;
            const { lastModified, dateAdded} = req.body;

            for (const i of filesArr){
                const newFile = await File.create({ lastModified, dateAdded, fileUri: i.destination})
                const addCourseFile = await Course.findByIdAndUpdate(courseId,{lastModified, $push:{courseFile: newFile._id}}).populate('newFile');
                res.status(201).json({newFile, addCourseFile});
            }
        } catch (error) {
            next(createError(error));
        }
    }

    routes(): void{
        this.router.get("/", this.getAllFile);
        this.router.post("/:courseId", upload, this.addFile);
    }
}

const fileRoutes = new FileRoute();
export default fileRoutes.router;