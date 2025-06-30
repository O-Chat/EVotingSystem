// src/utils/token.js
const KEY = "token";

export const getToken = () => localStorage.getItem(KEY);

export const setToken = (jwt) => {
  localStorage.setItem(KEY, jwt);
};

export const clearToken = () => {
  localStorage.removeItem(KEY);
};
