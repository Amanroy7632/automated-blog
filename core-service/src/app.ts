import express, { NextFunction,Response,Request } from "express";
import {VERSION} from "./config"
import { blogRouter } from "./routes";
import morgan from "morgan";
const app = express();
console.log(VERSION);
app.use(morgan("dev"));
app.use(express.json());
app.use(`/api/${VERSION}/blogs`,blogRouter);
app.get("/",(req:Request,res:Response,next:NextFunction)=>{
    res.status(200).json({message:"Working"})
})
export default app;