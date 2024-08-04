// import { UserInfoTokenVerify } from "../api/auth";

// export const isAuthenticated = async () => {
//   try {
//     const auth = await UserInfoTokenVerify();
//     return !!auth; // accessToken이 존재하면 true, 없으면 false 반환
//   } catch (error) {
//     console.error('Check Auth Failed  :', error);
//     return false;
//   }
// };
// export const isAuthenticated = () => {
//     // 쿠키에서 access 토큰을 확인
//     const cookies = document.cookie.split(';').reduce((cookies, cookie) => {
//       const [name, value] = cookie.split('=').map(c => c.trim());
//       cookies[name] = value;
//       return cookies;
//     }, {});
//     console.log(cookies);
//     return !!cookies.access; // access 쿠키가 존재하면 true, 아니면 false 반환
//   };
