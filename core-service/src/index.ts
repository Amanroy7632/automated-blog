import app from "./app";
import { connectDB, PORT } from "./config";
async function startServer() {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log("Core-service listining on : ", PORT);
    });
  }).catch((err)=>{
    console.log("Failed to connect databse");
  });
}
startServer()
  .then()
  .catch((err) => {
    console.log("Failed to start server.");
  });
