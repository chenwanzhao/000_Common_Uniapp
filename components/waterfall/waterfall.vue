<!-- 瀑布流布局 -->
<template>
	<view class="waterfall" id="waterfall" :style="{ 'column-count': count, 'column-gap': gap }">
		<view class="item" v-for="(item, index) in list" :key="index" :style="{ 'margin-bottom': gap }" @tap="onTapItem(item, index)">
			<image class="image" :src="item.img" mode="widthFix" :lazy-load="true"></image>
			<text class="title">标梵互动</text>
		</view>
	</view>
</template>

<script>
export default {
	/**
	 * 数据
	 */
	props: {
		// 列表数据
		list: {
			type: Array,
			default() {
				let data = [];
				for (let index = 1; index <= 13; index++) {
					data.push({
						id: index,
						img: `../../static/images/${index}.jpg`
					});
				}
				return data;
			}
		},

		// 列数
		count: {
			type: [Number, String],
			default: 2
		},

		// 列间距
		gap: {
			type: String,
			default: '10px'
		}
	},

	/**
	 * 方法
	 */
	methods: {
		/**
		 * item 点击事件
		 * @param {Object} item 数据对象
		 * @param {Number} index 数据下标
		 */
		onTapItem(item, index) {
			this.$emit('tapItem', item, index);
		}
	}
};
</script>

<style lang="scss" scoped>
.waterfall {
	width: 100%;
	margin: 0 auto;
	column-width: auto;
}

.item {
	break-inside: avoid;
	overflow: hidden;
	border-radius: 4upx;
}

.image {
	width: 100%;
	display: block;
}

.title {
	display: block;
	height: 80upx;
	line-height: 80upx;
	text-align: center;
	font-weight: 500;
	color: #050505;
	font-size: 28upx;
	background: #f2f3f4;
}
</style>
