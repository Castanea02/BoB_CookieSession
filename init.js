/*
init.js

express server listen 올리는 파일
 */
import app from "./server"; // 서버 설정 불러오기
import "./db"; // 데이터베이스 연결

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running 🚀 http://localhost:${PORT}`);
});
