/*
db.js 

db연결 수행 파일
*/
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/cookie", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //DB 연결

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
