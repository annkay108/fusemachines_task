import { Request, Response, Router } from "express";

class IndexRoutes {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  public getIndex(req: Request, res: Response): void {
    res.send("Hello world");
  }
  routes(): void {
    this.router.get("/", this.getIndex);
  }
}

const indexRoutes = new IndexRoutes();
indexRoutes.routes();

export default indexRoutes.router;
