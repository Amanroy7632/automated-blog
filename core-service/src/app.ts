import express, { NextFunction,Response,Request } from "express";
import {VERSION} from "./config"
import { blogRouter } from "./routes";
import morgan from "morgan";
import { errorHandler } from "./utils";
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(`/api/${VERSION}/blogs`,blogRouter);
app.get("/",(req:Request,res:Response,next:NextFunction)=>{
    res.status(200).json({message:"Working"})
})
app.use(errorHandler);
export default app;