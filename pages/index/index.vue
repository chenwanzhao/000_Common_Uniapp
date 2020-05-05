<!-- 首页 -->
<template>
	<view class="page-container">
		<!-- 省/市/区 - 无默认值 -->
		<view class="row border border-bottom border-padding">
			<text class="label">省/市/区</text>
			<view class="value"><Region @change="onChangeRegion"></Region></view>
			<text class="iconfont right-icon">&#xe63e;</text>
		</view>
		<!-- 省/市/区 - 有默认值 -->
		<view class="row border border-bottom border-padding">
			<text class="label">省/市/区</text>
			<view class="value"><Region :defaultValue="['山西省', '大同市', '南郊区']" @change="onChangeRegion"></Region></view>
			<text class="iconfont right-icon">&#xe63e;</text>
		</view>
		
		<!-- 日期时间 - 无默认值 -->
		<view class="row border border-bottom border-padding">
			<text class="label">日期时间</text>
			<view class="value"><DatetimePicker placeholder="请选择日期时间" fields="minute" @change="changeDatetimePicker"></DatetimePicker></view>
			<text class="iconfont right-icon">&#xe63e;</text>
		</view>
		<!-- 日期时间 - 有默认值 -->
		<view class="row border border-bottom border-padding">
			<text class="label">日期时间</text>
			<view class="value"><DatetimePicker placeholder="请选择日期时间" defaultValue="2020-08-16 12:35" start="2020-05-11 12:30" end="2030-08-16 16:50" fields="minute" @change="changeDatetimePicker"></DatetimePicker></view>
			<text class="iconfont right-icon">&#xe63e;</text>
		</view>
	</view>
</template>

<script>
let _this;
let _app = getApp();
import Region from '@/components/region/region.vue'; // 省/市/区
import DatetimePicker from '@/components/datetime-picker/datetime-picker.vue'; // 日期时间
export default {
	/**
	 * 组件
	 */
	components: {
		Region,
		DatetimePicker
	},

	/**
	 * 数据
	 */
	data() {
		return {
			title: 'Hello'
		};
	},

	/**
	 * 页面加载
	 */
	onLoad(options) {
		_this = this;
	},

	/**
	 * 页面初次渲染完成
	 */
	onReady() {
		console.log('Page onReady');
	},

	/**
	 * 方法
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
</style>
