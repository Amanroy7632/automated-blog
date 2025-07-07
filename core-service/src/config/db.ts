
import mongoose from 'mongoose';
import { MONGO_URI } from '.';
MONGO_URI
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI || 'mongodb://localhost:27017/blogs');
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
