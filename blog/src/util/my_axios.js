/**
 * axios请求方法
 * jtchen 2018/4/9
 */

import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  headers: {'x-access-token': window.localStorage.getItem('access_token') || ''}
});

export default {
  get : (url, params = {}) => {
    return new Promise((resolve, reject) => {
      instance.get(url, qs.stringify(params))
        .then( res => {
          resolve(res)
        })
        .catch( err => {
          reject(err)
        })
    })
  },

  post : (url, params = {}) => {
    return new Promise((resolve, reject) => {
      instance.post(url, qs.stringify(params))
        .then( res => {
          resolve(res)
        })
        .catch( err => {
          reject(err)
        })
    })
  }
}

