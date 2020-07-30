<!-- 
 * App.vue是我们的主组件，所有页面都是在App.vue下进行切换的，是页面入口文件
 * 在这个文件里，你可以初始化一些通用的组件，调用一些应用生命周期函数
 * 应用生命周期仅可在App.vue中监听，在其它页面监听无效
 -->
<script>
// 计步器
// 注册计步器
let step = uni.requireNativePlugin('DC-StepCounter');
// 注册globalEvent
let globalEvent = uni.requireNativePlugin('globalEvent');
export default {
  /**
   * 当uni-app 初始化完成时触发（全局只触发一次）
   */
  onLaunch: function() {
    console.log('App Launch');
    
    // Android计步器
    // 监听globalEvent事件 StepCounter_Ready 在ready后调用计步器相关API
    globalEvent.addEventListener('StepCounter_Ready', function(e) {});
    // 调用初始化 先注册StepCounter_Ready事件 再调用initialize初始化 防止StepCounter_Ready事件丢失
    step.initialize(); 
  },

  /**
   * 当 uni-app 启动，或从后台进入前台显示
   */
  onShow: function() {
    console.log('App Show');
    
    // Android计步器
    step.getCurrentTimeSportStep(function(n) {
      console.log('走了' + n + '步');
    });
  },

  /**
   * 当 uni-app 从前台进入后台
   */
  onHide: function() {
    console.log('App Hide');
  },

  /**
   * 当 uni-app 报错时触发
   */
  onError: function() {
    console.log('App Error');
  },

  /**
   * 全局数据
   */
  globalData: {
    // 基准路径，项目接口请求的也是使用的这个路径
    baseURL: 'http://mas.biaofun.com.cn/'
    // baseURL: 'http://127.0.0.1:8080/api/',
  }
};
</script>

<style lang="scss">
/* 全局样式 */
@import './common/style/common.scss';
</style>
