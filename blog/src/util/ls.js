/**
 * localStorage 常用方法
 * jtchen 2018/4/4
 */

const storage = window.localStorage;

export default {
  get: (key) => {
    //读取
    let data = storage.getItem(key);
    if(!data){
      return false;
    }
    data = JSON.parse(data);

    return data;
  },
  set: (key, value) => {
    //存储
    storage.setItem(key, value);
    return true
  },
  has: (key) => {
    let data = storage.getItem(key);
    if(!data){
      return false
    }
    return true
  },
  remove: (key) => {
    let data = storage.getItem(key);
    if(!data){
      return true
    }
    storage.removeItem(key);

    return true
  }
}

