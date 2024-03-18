import express, { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "../src/Routes/blockRoutes";


class App {
  private app: express.Application;
  private port: any;
  constructor() {
    this.app = express();
    dotenv.config();
    this.port = process.env.PORT || 9000;
    this.initMiddleware();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  private initMiddleware() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(routes);
  }
}

export default new App();
