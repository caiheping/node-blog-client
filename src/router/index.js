import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/admin/login/index.vue'),
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/layout',
      component: () => import('../views/front/layout/index.vue'),
      children: [
        {
          path: 'home/:u_id',
          name: 'home',
          component: () => import('../views/front/home/index.vue'),
          meta: {
            title: '首页',
            keepAlive: true
          }
        },
        {
          path: 'lifeNotes/:u_id',
          name: 'lifeNotes',
          component: () => import('../views/front/lifeNotes/index.vue'),
          meta: {
            title: '生活笔记',
            keepAlive: true
          }
        },
        {
          path: 'technique/:u_id/:type',
          name: 'technique',
          component: () => import('../views/front/technique/index.vue'),
          meta: {
            title: '技术杂谈',
            keepAlive: false
          }
        },
        {
          path: 'my/:u_id',
          name: 'my',
          component: () => import('../views/front/my/index.vue'),
          meta: {
            title: '关于自己',
            keepAlive: true
          }
        },
        {
          path: 'detail/:u_id',
          name: 'detail',
          component: () => import('../views/front/detail/index.vue'),
          meta: {
            title: '详情',
            keepAlive: true
          }
        }
      ]
    },
    {
      path: '/adminLayout',
      component: () => import('../views/admin/layout/index.vue'),
      children: [
        {
          path: '',
          redirect: 'adminHome'
        },
        {
          path: 'adminHome',
          name: 'adminHome',
          component: () => import('../views/admin/home/index.vue'),
          meta: {
            title: '后台管理',
            keepAlive: true
          }
        },
        {
          path: 'typeManagement',
          name: 'typeManagement',
          component: () => import('../views/admin/article/typeManagement.vue'),
          meta: {
            title: '类型管理',
            keepAlive: true
          }
        },
        {
          path: 'articleManagement',
          name: 'articleManagement',
          component: () => import('../views/admin/article/articleManagement.vue'),
          meta: {
            title: '技术杂谈',
            keepAlive: true
          }
        },
        {
          path: 'introduction',
          name: 'introduction',
          component: () => import('../views/admin/user/introduction.vue'),
          meta: {
            title: '个人简介',
            keepAlive: true
          }
        },
        {
          path: 'note',
          name: 'note',
          component: () => import('../views/admin/user/note.vue'),
          meta: {
            title: '个人日志',
            keepAlive: true
          }
        },
        {
          path: 'friendshipLinks',
          name: 'friendshipLinks',
          component: () => import('../views/admin/other/friendshipLinks.vue'),
          meta: {
            title: '友情链接',
            keepAlive: true
          }
        },
        {
          path: 'banner',
          name: 'banner',
          component: () => import('../views/admin/other/banner.vue'),
          meta: {
            title: '轮播管理',
            keepAlive: true
          }
        },
        {
          path: 'userManagement',
          name: 'userManagement',
          component: () => import('../views/admin/userManagement/index.vue'),
          meta: {
            title: '用户管理',
            keepAlive: true
          }
        }
      ]
    }
  ]
})
