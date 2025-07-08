
import mongoose from 'mongoose';
import { MONGO_URI,DB_NAME } from '.';
export const connectDB = async () => {
  try {
   const conn= await mongoose.connect(`${MONGO_URI}/${DB_NAME}`);
    console.log('Database connected: ',conn.connection.host);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
