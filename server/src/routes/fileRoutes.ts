import { Router, Request, Response, NextFunction } from "express";
import createError from "http-errors";

import File from "../models/File";
import upload from "../config/multerConfig";

class FileRoute{
    router: Router;
    constructor(){
        this.router = Router();
        this.routes();
    }

    public async addFile(req: Request, res: Response):Promise<void>{
        const imageUrl = req.files;
        res.status(201).json(imageUrl);
    }

    routes(): void{
        this.router.post("/:courseId", upload, this.addFile);
    }
}

const fileRoutes = new FileRoute();
export default fileRoutes.router;