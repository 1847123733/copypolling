import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {path: "/", redirect: "/login"},
    {
      path: "/login",
      component: resolve => require(['@/views/login'], resolve),
      meta: {title: '巡检系统 - 登陆'}
    },
    {
      path: "/home",
      component: resolve => require(['@/views/home'], resolve),
      meta: {title: '巡检系统 - 首页'}
    },
  ]
})
