/* eslint-disable */
export const session = {
  get(key: string) {
    const data = window.sessionStorage.getItem(key);
    return data ? JSON.parse(window.sessionStorage.getItem(key)!) : data;
  },

  set(key: string, data: any) {
    return window.sessionStorage.setItem(key, JSON.stringify(data));
  },

  delete(key: string) {
    return window.sessionStorage.removeItem(key);
  },

  clear() {
    return window.sessionStorage.clear();
  },
};

export const local = {
  get(key: string) {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(window.localStorage.getItem(key)!) : data;
  },

  set(key: string, data: any) {
    return window.localStorage.setItem(key, JSON.stringify(data));
  },

  delete(key: string) {
    return window.localStorage.removeItem(key);
  },

  clear() {
    return window.localStorage.clear();
  },
};
