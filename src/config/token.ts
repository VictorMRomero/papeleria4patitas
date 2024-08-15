
import { deleteCookie, getCookie } from "cookies-next";



export function getToken() {
  const tokenCookie = getCookie('token');
  return tokenCookie ? JSON.parse(tokenCookie) : null;
}

export function removeSession() {
  deleteCookie('user');
  deleteCookie('token');
}

export function getUser() {

  const userCookie = getCookie('user');
  return userCookie ? JSON.parse(userCookie) : null;
  
}

