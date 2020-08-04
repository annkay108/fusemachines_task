import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv = require('dotenv');
dotenv.config();
// import logger from "morgan";
// import cors from "cors";

import indexRoutes from "./routes/indexRoutes";

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  public config(): void {
    // Mongoose connection
    mongoose.connect(process.env.MONGODB_URI, {
      keepAlive: true,
      useNewUrlParser: true,
      reconnectTries: Number.MAX_VALUE,
      useUnifiedTopology: true
    })
    .then(()=>console.log("Connected to database"))
    .catch((err)=>console.log(err));
    // Setting the port value
    this.app.set("port", process.env.PORT || 5000);
  }

  public routes(): void {
    const router: express.Router = express.Router();

    this.app.use("/", indexRoutes);
  }

  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server is listening on port", this.app.get("port"));
    });
  }
}
const server = new Server();
server.start();
