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
                const newFile = await (await File.create({ lastModified, dateAdded, fileUri: i.destination, courseId, fileName: i.filename, size: i.size})).populate("courseId");
                const addCourseFile = await Course.findByIdAndUpdate(courseId,{lastModified, $push:{courseFile: newFile._id}}).populate('newFile');
                const updateLastModified = await File.updateMany({courseId},{lastModified: dateAdded})
            }
            res.status(200).json(filesArr.length+"file added")
        } catch (error) {
            next(createError(error));
        }
    }

    public async getCourseFiles(req: Request, res: Response, next: NextFunction):Promise<void>{
        try {
            const { courseId } = req.params;
            const courseFiles = await File.find({ courseId });
            res.status(200).json(courseFiles);
        } catch (error) {
            next(createError(error));
        }
    }

    public async getFileById (req: Request, res: Response, next: NextFunction):Promise<void>{
        try {
            const getfile:any = await File.findById({_id: req.params.fileId});
            const file = `${process.env.URI}${getfile.fileName}`
            res.status(200).download(file);
        } catch (error) {
            next(createError(error));
        }
    }
    routes(): void{
        this.router.get("/", this.getAllFile);
        this.router.post("/:courseId", upload, this.addFile);
        this.router.get("/:courseId",this.getCourseFiles);
        this.router.get("/:fileId/download",this.getFileById);
    }
}

const fileRoutes = new FileRoute();
export default fileRoutes.router;