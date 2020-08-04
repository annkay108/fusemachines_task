import { Request, Response, Router, NextFunction } from "express";
import createError from "http-errors";

class CourseRoutes {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  public async getCourse(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.status(201).json({ add: "hello" });
    } catch (error) {
      next(createError(error));
    }
  }

  public async addCourse(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { coursename, lastModified } = req.body;
    try {
      res.status(201).json({ add: "hello" });
    } catch (error) {
      next(createError(error));
    }
  }

  routes(): void {
    this.router.get("/", this.getCourse);
  }
}

const courseRoutes = new CourseRoutes();
courseRoutes.routes();

export default courseRoutes.router;
