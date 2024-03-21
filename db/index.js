import mongoose from "mongoose";
import { dbName } from "../constants.js";

const connectDB = async () => {
  try {
    const ans = await mongoose.connect(`${process.env.MONGO_DB}` / { dbName });
    console.log("db connected succesfully", ans.connection.host);
  } catch (error) {
    console.log("Mongodb error", error);
  }
};

export default connectDB;
