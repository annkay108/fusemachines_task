import { Router, Request, Response, NextFunction } from "express";
import createError from "http-errors";

import File from "../models/File";

interface MulterRequest extends Request{
    file: any
}

class FileRoute{
    router: Router;
    constructor(){
        this.router = Router();
        this.routes();
    }

    public async addFile(req: Request, res: Response):Promise<void>{
        const file = (req as MulterRequest).file;
        file.mv(`${process.env.URI}/public/${file.name}`,(err:any)=>{
            if(err){
                console.error(err);
                return res.status(500).send(err);
            }
            res.json({ fileName: file.name})
        })
    }

    routes(): void{
        this.router.post("/",this.addFile);
    }
}

const fileRoutes = new FileRoute();
export default fileRoutes.router;