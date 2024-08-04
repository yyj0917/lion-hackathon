import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, minutes) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + minutes * 60 * 1000);
  localStorage.setItem(`${name}TokenExpiry`, expires.getTime());
  return cookies.set(name, value, {
    path: '/',
    expires,
    secure: true,
    sameSite: 'Lax',
  });
};

export const deleteCookie = (name) => {
  return cookies.remove(name, { path: '/' });
};
