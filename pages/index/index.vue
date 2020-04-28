<!-- 首页 -->
<template>
	<view class="page-container">
		<view class="row border border-bottom border-padding">
			<text class="label">省/市/区</text>
			<view class="value"><Region @change="onChangeRegion"></Region></view>
			<text class="iconfont right-icon">&#xe63e;</text>
		</view>
		<view class="row border border-bottom border-padding">
			<text class="label">省/市/区</text>
			<view class="value"><Region :defaultValue="['山西省','大同市','南郊区']" @change="onChangeRegion"></Region></view>
			<text class="iconfont right-icon">&#xe63e;</text>
		</view>
	</view>
</template>

<script>
let _this;
let _app = getApp();
import Region from '@/components/region/region.vue'; // 省/市/区
export default {
	/**
	 * 组件
	 */
	components: {
		Region
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
