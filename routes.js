/*
routes.js 

요청 라우팅을 위함
*/
import express from "express";
import { getHome, getLogin, postLogin } from "./controllers/loginController"; // 컨트롤러 불러오기

const router = express.Router();

router.get("/", getHome);
router.get("/login", getLogin);
router.post("/login", postLogin);

export default router;
