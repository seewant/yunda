/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2023-01-05 16:38:37
 * @LastEditors: WangYuan
 * @LastEditTime: 2023-01-06 17:33:54
 */
const TokenKey = "token";
const UserInfoKey = "user-info";

export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}

export function tokenIsExist() {
  return localStorage.getItem(TokenKey) != null;
}

export function setUserInfo(userInfo) {
  return localStorage.setItem(UserInfoKey, JSON.stringify(userInfo));
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem(UserInfoKey)) || null;
}

export function removeUserInfo() {
  return localStorage.removeItem(UserInfoKey);
}
