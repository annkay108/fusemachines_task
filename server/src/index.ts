import express from "express";
import mongoose from "mongoose";
// import logger from "morgan";
// import cors from "cors";

import indexRoutes from "./routes/indexRoutes";

class Server{
  public app: express.Application;
  constructor(){
    this.app = express();
    this.config();
    this.routes();
  }
  public config(): void{
    // Setting the port value
    this.app.set('port', process.env.PORT||3000);
  }

  public routes():void{
    const router: express.Router = express.Router();

    this.app.use('/',indexRoutes);
  }

  public start():void{
    this.app.listen(this.app.get('port'),()=>{
      console.log('Server is listening on port', this.app.get('port'));
    });
  }
}
const server = new Server();
server.start();