<!-- 首页 -->
<template>
	<view class="page-container">
		<!-- 文字跑马灯 -->
		<MarqueeText
			ref="MarqueeText"
			:list="marqueeList"
			current="0"
			speed="10"
			:show="showMarquee"
			@close="showMarquee = false"
			@tapItem="tapMarqueeItem"
			@completed="onMarqueeListRenderCompleted"
		></MarqueeText>

		<button type="default" @tap="onShowMarquee" >显示跑马灯</button>

		<!-- 省/市/区选择器 -->
		<view class="row border border-bottom border-padding">
			<text class="label">省/市/区</text>
			<view class="value"><Region :defaultValue="['山西省', '大同市', '南郊区']" @change="onChangeRegion"></Region></view>
			<text class="iconfont right-icon">&#xe63e;</text>
		</view>

		<!-- 日期时间选择器 -->
		<view class="row border border-bottom border-padding">
			<text class="label">日期时间</text>
			<view class="value">
				<DatetimePicker
					placeholder="请选择日期时间"
					defaultValue="2020-12-16 12:35"
					start="2000-01-01"
					end="2100-01-01"
					fields="minute"
					@change="changeDatetimePicker"
				></DatetimePicker>
			</view>
			<text class="iconfont right-icon">&#xe63e;</text>
		</view>

		<!-- 瀑布流布局 -->
		<view class="waterfall-wrapper"><Waterfall @tapItem="onTapWaterfallItem"></Waterfall></view>
	</view>
</template>

<script>
let _this;
let _app = getApp();
import Region from '@/components/region/region.vue'; // 省/市/区选择器
import DatetimePicker from '@/components/datetime-picker/datetime-picker.vue'; // 日期时间选择器
import Waterfall from '@/components/waterfall/waterfall.vue'; // 瀑布流布局
import MarqueeText from '@/components/marquee-text/marquee-text.vue'; // 文字跑马灯
export default {
	/**
	 * 页面用到的组件
	 */
	components: {
		Region,
		DatetimePicker,
		Waterfall,
		MarqueeText
	},

	/**
	 * 页面数据
	 */
	data() {
		return {
			marqueeList: [], // 跑马灯数据列表
			showMarquee: true // 是否显示跑马灯？
		};
	},

	/**
	 * 页面生命周期 - 监听页面加载
	 * @param {Object} options 传递过来的参数对象
	 */
	onLoad(options) {
		_this = this;
	},

	/**
	 * 页面生命周期 - 监听页面显示
	 */
	onShow() {},

	/**
	 * 页面生命周期 - 监听页面初次渲染完成
	 */
	onReady() {
		console.log('Page onReady');

		// 查询跑马灯数据
		this.queryMarqueeList();
	},

	/**
	 * 页面生命周期 - 监听页面隐藏
	 */
	onHide() {},

	/**
	 * 页面生命周期 - 监听页面卸载
	 */
	onUnload() {},

	/**
	 * 页面生命周期 - 监听窗口尺寸变化
	 * App、微信小程序
	 */
	onResize() {},

	/**
	 * 页面生命周期 - 监听用户下拉动作
	 */
	onPullDownRefresh() {},

	/**
	 * 页面生命周期 - 页面上拉触底事件的处理函数
	 */
	onReachBottom() {},

	/**
	 * 页面生命周期 - 点击 tab 时触发
	 * 微信小程序、百度小程序、H5、App（自定义组件模式）
	 * @param {String} event.index 被点击tabItem的序号，从0开始
	 * @param {String} event.pagePath 被点击tabItem的页面路径
	 * @param {String} event.text 被点击tabItem的按钮文字
	 */
	onTabItemTap(event) {},

	/**
	 * 页面生命周期 - 用户点击右上角分享
	 * 微信小程序、百度小程序、字节跳动小程序、支付宝小程序
	 */
	onShareAppMessage() {},

	/**
	 * 页面生命周期 - 监听页面滚动
	 * @param {Number} event.scrollTop 页面在垂直方向已滚动的距离（单位px）
	 */
	onPageScroll(event) {},

	/**
	 * 页面生命周期 - 监听原生标题栏按钮点击事件
	 * 5+App、H5
	 * @param {Number} event.index 原生标题栏按钮数组的下标
	 */
	onNavigationBarButtonTap(event) {},

	/**
	 * 页面生命周期 - 监听页面返回
	 * App、H5
	 * @param {String} event.from	触发返回行为的来源：'backbutton'——左上角导航栏按钮及安卓返回键；'navigateBack'——uni.navigateBack() 方法
	 * 注意事项：
	 *   只有在该函数中返回值为 true 时，才表示不执行默认的返回，自行处理此时的业务逻辑；
	 *   不返回或返回其它值，均会执行默认的返回行为；
	 *   H5 平台，顶部导航栏返回按钮支持 onBackPress()，浏览器默认返回按键及Android手机实体返回键不支持 onBackPress()；
	 */
	onBackPress(event) {},

	/**
	 * 页面生命周期 - 监听原生标题栏搜索输入框输入内容变化事件
	 * App、H5
	 */
	onNavigationBarSearchInputChanged() {},

	/**
	 * 页面生命周期 - 监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的 "搜索" 按钮时触发
	 * App、H5
	 */
	onNavigationBarSearchInputConfirmed() {},

	/**
	 * 页面生命周期 - 监听原生标题栏搜索输入框点击事件
	 * App、H5
	 */
	onNavigationBarSearchInputClicked() {},

	/**
	 * 页面函数
	 */
	methods: {
		/**
		 * 选择省市区
		 * @param {Array(Object)} region 省市区数据
		 */
		onChangeRegion(region) {
			console.log('选择的省市区数据：', region);
		},

		/**
		 * 选择日期时间
		 * @param {Object} date 日期数据
		 */

		changeDatetimePicker(date) {
			console.log(date);
		},

		/**
		 * 瀑布流布局 item 点击事件
		 * @param {Object} item 数据对象
		 * @param {Number} index 数据下标
		 */

		onTapWaterfallItem(item, index) {
			console.log('点击了瀑布流布局中的Item：', item, index);
		},

		/**
		 * 查询跑马灯数据列表
		 */
		queryMarqueeList() {
			this.marqueeList = [
				{ id: 1, text: '作者：山东标梵互动信息技术有限公司' },
				{ id: 2, text: '公司地址：山东·济南 银座和谐广场2座806' },
				{ id: 3, text: '公司官网：http://biaofun.com/' },
				{ id: 4, text: '床前明月光，疑是地上霜。举头望明月，低头思故乡。' },
				{ id: 5, text: '斐波那契螺旋线，又称黄金螺旋线，这种曲线的最大特点就是它的迷之完美，所有比例都恰到好处。' },
				{ id: 6, text: '动画可以通过设置多个节点来精确控制一个或一组动画，常用来实现复杂的动画效果。' }
			];
		},

		/**
		 * 跑马灯数据列表渲染完成
		 */
		onMarqueeListRenderCompleted() {
			console.log('跑马灯数据列表渲染完成');
			this.$refs.MarqueeText.start();
		},
		
		/**
		 * 显示跑马灯
		 */ 
		onShowMarquee() {
			this.showMarquee = true;
		},
		
		/**
		 * 监听跑马灯点击事件
		 * @param {Object} item 数据对象
		 * @param {Number} index 数据下标
		 */

		tapMarqueeItem(item, index) {
			console.log('点击了跑马灯：', item, index);
		}
	}
};
</script>

<style lang="scss" scoped>
.row {
	display: flex;
	align-items: center;
	width: 100%;
	padding: 30upx;

	.label {
		flex-shrink: 0;
	}

	.value {
		flex: 1;
		overflow: hidden;
		word-break: break-all;
		white-space: normal;
		word-wrap: break-word;
		padding: 0 30upx;
	}

	.right-icon {
		flex-shrink: 0;
	}
}

/* 瀑布流布局 */
.waterfall-wrapper {
	padding: 30upx;
}
</style>
