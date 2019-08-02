import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// import store from './store'
// router.beforeEach((to, from, next) => {
//   NProgress.start()
//   let params = {
//     system: '活动系统',
//     tags: 'new'
//   }
//   store.dispatch('setRole', params)
//   next()
// })

// router.afterEach(() => {
//   NProgress.done() // 结束Progress
// })
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
