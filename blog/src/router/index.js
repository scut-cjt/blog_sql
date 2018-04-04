import Vue from 'vue'
import Router from 'vue-router'
import axios from "axios"
import qs from 'qs'
import noLoginPages from "./freeLogin.js"

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login'],resolve)
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/components/home'],resolve)
    },
    {
      path: '/page2',
      name: 'page2',
      component: resolve => require(['@/components/page2'],resolve)
    }
  ]
})

/**
 * vue-router 权限拦截中间件
 * jtchen 2018/4/3
 */
function checkLogin(token){
  axios.post(PATH+"/checkLogin",qs.stringify({
    'access_token': token
  }))
    .then( res => {
      if(res.data.state){
        return true
      }
    }, err => {
      throw err
    })
}


router.beforeEach((to, from, next) => {
  if(noLoginPages.findIndex(name => name == to.name) != -1){
    return next();
  }
  console.log('is:'+checkLogin)
  if(window.localStorage.getItem('access_token') ){
    //存在token并合法
    checkLogin(window.localStorage.getItem('access_token')).then(res => {
      next()
    })
  }else if(!window.localStorage.getItem('access_token')){
    next({
      path: '/login',
      redirect: to.path
    })
  }
})


export default router
