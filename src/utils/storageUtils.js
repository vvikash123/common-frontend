import fs from 'fs';
import path from 'path';

export const checkExpired = function checkExpired(timeStamp) {
  return new Date().getTime() > timeStamp;
};

export const getSessionStorage = function getSessionStorage(key) {
  let value;
  if (key && typeof sessionStorage === 'object') {
    try {
      value = sessionStorage.getItem(key);
    } catch (err) {
      console.warn(err);
    }
  }
  return value;
};

export const setSessionStorage = function setSessionStorage(key, value) {
  if (typeof sessionStorage === 'object') {
    try {
      sessionStorage.setItem(key, value);
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return undefined;
};

export const getLocalStorage = function getLocalStorage(key) {
  let value;
  if (key && typeof localStorage === 'object') {
    try {
      value = localStorage.getItem(key);
    } catch (err) {
      console.warn(err);
    }
  }
  return value;
};
export const setLocalStorage = function setLocalStorage(key, value) {
  if (typeof localStorage === 'object') {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return undefined;
};

export const removeYarnFilesOnServer = () => {
  const directory = '/tmp';
  try {
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        if (file.indexOf('yarn--') > -1) {
          fs.rmdirSync(path.join(directory, file), { recursive: true });
        }
      }
    });
  } catch (err) {
    console.warn(err);
  }
};
