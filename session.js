/*
session.js
세션 수행 파일
세션 생성, 세션 값 가져오기 함수를 정의
*/
import crypto from "crypto";
import fs from "fs";
import path from "path";

const SESSION_FILE = path.join(__dirname, "sessions"); // 세션 파일 저장 경로
const SESSION_TIMEOUT = 30000; // 세션 유효 기간 (밀리초) = 10초 세션 파기 확인

// 세션 디렉토리 생성
//fs.existsSync 지정된 경로에 파일이나 디렉토리가 존재하는지 확인
//존재하면 true 없으면 false
//mkdirSync 지정된 경로 디렉토리 생성
if (!fs.existsSync(SESSION_FILE)) {
  fs.mkdirSync(SESSION_FILE);
}

/**세션 생성 함수
 * DB의 user 객체, res 객체
 * 랜덤값 해시하여 세션에 저장후
 */
export const createSession = async (user, res) => {
  const hash = crypto.createHash("sha256");
  hash.update(`${Date.now() + Math.random()}`);
  const sessionResult = hash.digest("hex");

  const sessionFile = path.join(SESSION_FILE, sessionResult);
  //fs.writeFileSync 경로에 데이터 쓰기, 없으면 생성, 존재하면 덮어쓰기
  fs.writeFileSync(
    sessionFile,
    JSON.stringify({
      user_id: user.id,
      created_at: Date.now(),
      session_id: sessionResult,
    })
  );

  //세션 타임아웃
  setTimeout(() => {
    fs.unlink(sessionFile, (err) => {
      if (err) {
        console.error(`세션파일 지우기 실패 : ${sessionFile}`, err);
      } else {
        console.log(`세션 파일을 지웠습니다. : ${sessionFile}`);
      }
    });
  }, SESSION_TIMEOUT);

  //쿠키 생성
  res.cookie("session_id", sessionResult, {
    maxAge: SESSION_TIMEOUT, //Expire 시간 지정
    httpOnly: true,
  });
};

export const getSession = async (session) => {
  if (!session) {
    return null; // 세션 ID가 없으면 null 반환
  }

  const sessionFile = path.join(SESSION_FILE, session);
  if (fs.existsSync(sessionFile)) {
    //fs.readFileSync 파일 내용 문자열 반환
    const sessionData = JSON.parse(fs.readFileSync(sessionFile, "utf8"));
    console.log(sessionData);
    return {
      user_id: sessionData.user_id,
      session_id: sessionData.session_id,
    };
  }
  return null;
};
