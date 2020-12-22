// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/index';
// 饿了么
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App'
import router from './router'

// 饿了么
Vue.use(ElementUI,{ size: 'small'},{ zIndex: 1000 });

// 重置样式
import '../static/reset.css'
// echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

// 网页标题
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

// 高德 地图
import AMap from 'vue-amap';
Vue.use(AMap);
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: '34930e9667ca46b5d2e03d4a072a3b66',
  // 插件集合 （插件按需引入）
  plugin:['Geolocation', 'Geocoder','PlaceSearch'],
});

// 点击图片放大
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
    toolbar: true
  } })
Viewer.setDefaults({
// 工具栏按钮的控制
  toolbar: {
    zoomIn:0, // 放大
    zoomOut: 0, // 缩小
    oneToOne: 0, // 100%大小
    reset: 1, // 还原
    prev: 0, // 上一张
    play: 0, // 全屏显示
    next: 0, // 下一张
    rotateLeft: 1, // 逆时针旋转
    rotateRight: 1, // 顺时针旋转
    flipHorizontal: 0, // 水平翻转
    flipVertical: 0 // 垂直翻转
  }
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
