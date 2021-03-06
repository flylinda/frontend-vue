import base from './base'
import dev from './dev'
import test from './tes'
import pre from './pre'
import pro from './pro'
let config
if (process.env.MODE === 'dev') {
  config = dev
}

if (process.env.MODE === 'test') {
  config = test
}

if (process.env.MODE === 'pre') {
  config = pre
}

if (process.env.MODE === 'prod') {
  config = pro
}

config = Object.assign(base, config)

// config 不能存在一个名称为 install 的变量，因为它将作为 Vue 绑定的入口
config.install = (Vue) => {
  Vue.prototype.$config = config
}

export default Object.freeze(config)
