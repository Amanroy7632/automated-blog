import app from "./app";
import {PORT} from "./config"
async function startServer() {
    app.listen(PORT,()=>{
        console.log("Core-service listining on : ",PORT);
    });
}
startServer().then().catch((err)=>{
    console.log("Failed to start server.");
})