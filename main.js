/**
 * main.js 是 uni-app 项目的入口文件，主要作用是初始化 vue 实例并使用需要的插件。
 * 首页引入了 Vue 库和 App.vue，创建了一个 vue 实例，并且挂载 vue 实例。
 */ 
import Vue from 'vue';
import App from './App';
import Store from './store';
import $http from './common/js/http.js';
import $utils from './common/js/utils.js';
import { mapState } from 'vuex';

Vue.prototype.$utils = $utils; // 工具集
Vue.prototype.$http = $http; // 封装的HTTP
Vue.prototype.$baseURL = 'https://qp.sportsone.com.cn/'; // 基准路径
Vue.prototype.$store = Store;
Vue.prototype.$mapState = mapState;

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();



