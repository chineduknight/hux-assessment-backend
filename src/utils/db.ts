import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "");

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    const err = error as Error;
    console.error(`DB Connection Error: ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};
