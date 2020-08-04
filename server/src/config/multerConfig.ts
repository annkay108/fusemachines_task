import multer from "multer";
import { Request } from "express";
import path from "path";
import dotenv from 'dotenv';
dotenv.config();

const storage = multer.diskStorage({
    destination: `${process.env.URI}`,
    filename(req: Request, file, cb){
        cb(null,file.originalname);
    }
});

const upload = multer({
    storage,
    limits:{fileSize: 5000000}
}).array("file");

export default upload;