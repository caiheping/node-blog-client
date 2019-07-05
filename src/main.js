import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import VueParticles from 'vue-particles'
import ElementUI from 'element-ui'

import '@/static/icons'

import 'element-ui/lib/theme-chalk/index.css'
import './static/css/reset.less'
import './static/css/element-ui.less'

Vue.use(VueParticles)
Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let len = store.state.TagsViews.filter(item => item.title === to.meta.title)
  store.state.activeMenu = to.name
  if (len.length === 0 && to.path.substr(0, 7) !== '/layout') {
    store.state.TagsViews.push({
      title: to.meta.title,
      path: to.path
    })
  }
  document.title = to.meta.title
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
