/*
loginController.js 

login 요청 처리를 위한 파일
home, login, login post 렌더 함수를 정의
*/

import User from "../models/User"; // User 모델 가져오기
import { createSession, getSession } from "../session"; // 세션 함수 가져오기

/**home 요청 처리 */
export const getHome = async (req, res) => {
  const session = req.cookies.session_id;
  const user = await getSession(session);

  res.render("home", {
    username: user ? user.user_id : "로그인 먼저 해주세용",
    session_id: user ? user.session_id : "로그인 먼저 해주세용",
  });
};

//login get 요청
export const getLogin = (req, res) => {
  res.render("login");
};

//login post 요청 처리
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ id: username });

  if (!user || user.password !== password) {
    //유저가 없거나 패스워드 틀렸을 때
    res.send("잘못된 유저 또는 패스워드 입니다.");
    return;
  }

  await createSession(user, res); //통과시 세션 생성

  res.redirect("/");
};
