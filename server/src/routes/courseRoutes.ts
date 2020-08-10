import { Request, Response, Router, NextFunction } from "express";
import createError from "http-errors";

import File from "../models/File";
import Course from "../models/Course";

class CourseRoutes {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  // GET course/ ===> show all the course
  public async getCourse( req: Request, res: Response, next: NextFunction ): Promise<void> {
    try {
      const allCourse = await Course.find({});
      res.status(201).json(allCourse);
    } catch (error) {
      next(createError(error));
    }
  }

  // POST course/ ===> adds new course
  public async addCourse( req: Request, res: Response, next: NextFunction ): Promise<void> {
    const { coursename, lastModified } = req.body;
    try {
      const newCourse = await Course.create({ coursename, lastModified});
      res.status(201).json(newCourse);
    } catch (error) {
      next(createError(error));
    }
  }

  // PUT /course/:id ===> updates the course
  public async updateCourse(req: Request, res: Response, next: NextFunction): Promise<void>{
    const { id } = req.params;
    const { coursename } = req.body;
    try {
        const updatedCourse = await Course.findByIdAndUpdate(id,{ coursename })
        res.status(200).json(updatedCourse);
    } catch (error) {
        next(createError(error));
    }
  }

  // DELETE /course/:id ===> deletes the selected course and the files in it.
  public async deleteCourse(req: Request, res: Response, next: NextFunction): Promise<void>{
    const { id } = req.params;
    try {
        const deleteThisCourse: any = await Course.findById(id);
        const deleteCourseFile = deleteThisCourse.courseFile;
        for(const i of deleteCourseFile){
            await File.findByIdAndRemove(i);
        }
        await Course.findByIdAndRemove(id);
        res.status(200).json("deleted");
    } catch (error) {
        next(createError(error));
    }
  }

  routes(): void {
    this.router.get("/", this.getCourse);
    this.router.post("/",this.addCourse);
    this.router.put("/:id",this.updateCourse);
    this.router.delete("/:id",this.deleteCourse);
  }
}

const courseRoutes = new CourseRoutes();
export default courseRoutes.router;