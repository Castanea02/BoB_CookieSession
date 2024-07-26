/*
server.js

웹서버 설정 관련 내용 파일
*/
import express from "express";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import router from "./routes";

const app = express(); // Express 애플리케이션
const logger = morgan("short"); // HTTP 요청 로깅 morgan

//뷰엔진 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);
app.use(cookieParser());

app.use("/", router);

export default app;
