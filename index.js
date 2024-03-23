// require('dotenv').config({path:"./env"})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("App is runing on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Mongodb connection failed", err);
  });
