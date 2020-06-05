<!-- 
 * App.vue是我们的主组件，所有页面都是在App.vue下进行切换的，是页面入口文件
 * 在这个文件里，你可以初始化一些通用的组件，调用一些应用生命周期函数
 * 应用生命周期仅可在App.vue中监听，在其它页面监听无效
 -->
<script>
	export default {
    /**
		 * 当uni-app 初始化完成时触发（全局只触发一次）
     */
		onLaunch: function() {
			console.log('App Launch');
		},
    
    /**
		 * 当 uni-app 启动，或从后台进入前台显示
     */
		onShow: function() {
			console.log('App Show')
		},
    
    /**
		 * 当 uni-app 从前台进入后台
     */
		onHide: function() {
			console.log('App Hide')
		},
    
    /**
		 * 当 uni-app 报错时触发
     */
    onError: function() {
    	console.log('App Error')
    },
    
    /**
		 * 全局数据
     */
    globalData: {
			// 基准路径
			baseURL: 'http://mas.biaofun.com.cn/',
			// baseURL: 'http://127.0.0.1:8080/api/', 
		}
	}
</script>

<style lang="scss">
/* 全局样式 */ 
@import './common/style/common.scss';
</style>
