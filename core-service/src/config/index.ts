import dotenv from "dotenv";
dotenv.config({
    path:"./.env",
});
export const VERSION =process.env.VERSION;
export const PORT =process.env.PORT;
export const NODE_ENV=process.env.NODE_ENV;
export const MONGO_URI = process.env.MONGO_URI;
export const DB_NAME=process.env.DB_NAME;
export * from "./db";
