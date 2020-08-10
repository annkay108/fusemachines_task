import multer from "multer";
import { Request } from "express";
import dotenv from 'dotenv';
dotenv.config();

// multer configuration
const storage = multer.diskStorage({
    destination: `./public/data/uploads`,
    filename(req: Request, file, cb){
        cb(null,file.originalname);
    }
});

const upload = multer({
    storage,
    limits:{fileSize: 5000000}
}).array("file");

export default upload;