'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  // BASE_API: '"http://192.168.8.43:8084/patrol/"'      // 刘尧胜 ip
  BASE_API: '"http://192.168.8.93:8084/patrol/"'      // 刘怀杰 ip
  // BASE_API: '"http://www.tcxunjian.cn/patrol/"'      // 正式 ip
})
