/**
 * main.js 是 uni-app 项目的入口文件，主要作用是初始化 vue 实例并使用需要的插件。
 * 首页引入了 Vue 库和 App.vue，创建了一个 vue 实例，并且挂载 vue 实例。
 */ 
import Vue from 'vue'; // Vue
import App from './App'; // App
import Store from './store'; // Vuex Store
import { mapState } from 'vuex'; // Vuex mapState
import vars from './common/js/vars.js'; // 常用变量集
import regExps from './common/js/regExps.js'; // 常用正则表达式集
import http from './common/js/http.js'; // 封装的请求函数
import utils from './common/js/utils.js'; // 封装的工具集

Vue.prototype.$vars = vars;
Vue.prototype.$regExps = regExps;
Vue.prototype.$utils = utils; 
Vue.prototype.$http = http; 
Vue.prototype.$store = Store;
Vue.prototype.$mapState = mapState;

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();



