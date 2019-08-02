import axios from 'axios'
import { Message } from 'element-ui'
import config from '../config'
import { getToken, setCookie } from '@/utils/cookie'
import router from '../router'
import storage from '@/utils/storage'

let catchQueue = {}

const service = axios.create({
  withCredentials: true
})

/**
 * 在service外重新包装一层，缓存用户传参，用于401以后的补发请求
 * @param {*} params 用户传入的参数
 */
const request = params => {
  catchQueue[params.url] = params
  return service(params)
}

// request拦截器
service.interceptors.request.use(config => {
  config.headers.token = getToken()
  config.headers.devicetype = 'web'
  return config
}, error => { Promise.reject(error) })

// respone拦截器
service.interceptors.response.use(response => {
  const { config: { url } } = response
  delete catchQueue[url]
  // 临时添加 后台报错提示
  if (response.data) {
    if (response.data && !response.data.isSuccess && response.data.resultMsg) {
      Message.error({ message: response.data.resultMsg })
    }
  }
  return response.data // 直接返回response.data，如果判断isSuccess字段，部分不支持的接口会卡住，判断可以通过其他插件函数来处理
}, async error => {
  const { status, config: { url } } = error.response
  switch (status) { // 其他情况补充处理
    case 500:
      delete catchQueue[url]
      Message.error({ message: '后台服务器出错，操作失败！' })
      break
    case 401:
      const isUpdateTokenApi = isUpdateTokenReq(url)
      if (isUpdateTokenApi) {
        backToMainSite()
      }
      return refreshToken(url)
    case 403:
      router.push('/403')
      logout()
  }
}
)

const rootDomain = config.rootDomain

// 跳回主站登陆
function backToMainSite () {
  window.location.href = rootDomain + '/#/login/webrefresh?return_to=' + encodeURIComponent(window.location.href)
}

// 换取新token
async function refreshToken (url) {
  const refreshTokenApi = `${rootDomain}/admin/api/v1/subsystems/cross`
  let res = await service({ url: refreshTokenApi, method: 'post' })
  // res 如果成功 回返回字符串,如果不成功，回直接重定向页面
  if (res) {
    setCookie('token', res)
    if (catchQueue[url]) {
      return service(catchQueue[url])
    }
    return {}
  }
}

const isUpdateTokenReq = (url) => {
  return url.indexOf('subsystems/cross') > 0
}

function logout () {
  storage.del('token')
  setCookie('token', '', -1)
}

export default request
