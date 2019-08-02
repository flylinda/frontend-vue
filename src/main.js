import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont/iconfont.css'
import '@/assets/icon-one/icon-one.css'
import '@/styles/index.scss'
import dialog from './components/dialog'
import '@/permission'
import _ from 'lodash' // global css
// 注册全局过滤器----start
import * as custom from '@/filter'
Object.keys(custom).forEach(item => Vue.filter(item, custom[item]))
// ---------------end
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(ElementUI)
Vue.component('ElDialog', dialog)
Vue.prototype._ = _
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
