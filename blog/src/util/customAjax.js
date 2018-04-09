/**
 * axios请求方法
 * jtchen 2018/4/9
 */

import axios from 'axios'
import ls from './ls'
import qs from 'qs'

const instance = axios.create({
  headers: {'x-access-token': ls.get('access_token') || ''}
});

export default {
  get : (url, params) => {
    return new Promise((resolve, reject) => {
      instance.get(PATH + url, qs.stringify(params))
        .then( res => {
          resolve(res.data)
        })
        .catch( err => {
          reject(err)
        })
    })
  },

  post : (url, params) => {
    return new Promise((resolve, reject) => {
      instance.post(PATH + url, qs.stringify(params))
        .then( res => {
          resolve(res.data)
        })
        .catch( err => {
          reject(err)
        })
    })
  }
}

