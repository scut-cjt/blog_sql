import Vue from 'vue'
import Router from 'vue-router'
import customAjax from "../util/customAjax"
import ls from '../util/ls'
import noLoginPages from "./freeLogin.js"
import { goBack } from "./routerTransition.js"

Vue.use(Router)

Router.prototype.goBack = goBack;

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
      path: '/',
      name: 'default',
      component: resolve => require(['@/components/home'],resolve)
    },
    {
      path: '/newArticle',//写文章
      name: 'newArticle',
      component: resolve => require(['@/components/newArticle'],resolve)
    },
    {
      path: '/article',//查看文章
      name: 'article',
      component: resolve => require(['@/components/article'],resolve)
    }
  ]
})

/**
 * vue-router 权限拦截中间件
 * jtchen 2018/4/3
 */
function checkLogin(){
  return new Promise((resolve, reject) => {
    customAjax.post("/checkLogin")
      .then( res => {
        if(res.state){
          resolve(true)
        }
      }, err => {
        throw err
      })
  })

}


router.beforeEach((to, from, next) => {
  //若不需要登录 -> next()
  if(noLoginPages.indexOf(to.name) != -1){
    return next();
  }

  if(ls.get('access_token')){
    //存在token并合法
    checkLogin()
      .then(res => {
        if(res){
          next()
        }
      })
  }else if(!ls.get('access_token')){
    next({
      path: '/login',
      redirect: to.path
    })
  }
})


export default router
