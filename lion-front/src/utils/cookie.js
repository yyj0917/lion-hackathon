import { Cookies } from "react-cookie";


const cookies = new Cookies();

export const setCookie = (name, value, minutes) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + minutes * 60 * 1000);
    return cookies.set(name, value, {
        path: '/',
        expires,
        // secure: true,
        sameSite: 'strict',
      });
  };

export const deleteCookie = (name, option) => {
    return cookies.remove(name, {...option});
  };
  