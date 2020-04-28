/**
 * @说明：进一步封装 uniapp 的 request 请求方法
 * @作者：陈万照
 * @公司：山东标梵互动技术有限公司
 * @官网：http://biaofun.com/
 * @版本：v1.0.0
 * @时间：2020年4月28日11:28:13
 */
import Utils from '@/assets/utils/utils.js'; // 工具集

/**
 * 请求方法
 */
function http(config) {
	// 自己扩展的一些配置字段
	let defaults = {
		// [String] 接口基准路径
		baseURL: 'https://wx.jnchf.com',

		// [String] 请求路径
		url: '',

		// [String] 请求类型，必须大写
		method: 'POST',

		// [Object|String|ArrayBuffer] 请求参数
		data: {},

		// [Object] 设置请求的 header，header 中不能设置 Referer
		header: {
			'Author': 'ChenWanZhao'
		},

		// [Number] 超时时间，单位 ms
		timeout: 3000,

		// [String] 如果设为 json，会尝试对返回的数据做一次 JSON.parse
		dataType: 'json',

		// [String] 设置响应的数据类型。合法值：text、arraybuffer
		responseType: 'text',

		// [Boolean] 验证 ssl 证书？
		sslVerify: true,

		// [Boolean] 是否显示 loading？
		showLoading: true,

		// [String] loading 文本？
		loadingText: '加载中...',

		// [Boolean] 是否显示透明蒙层，防止触摸穿透
		loadingMask: true,

		// [Boolean] 是否弹窗显示成功提示？
		showSuccessTips: true,
		
		// [String] 指定成功提示文本
		successTipsText: '请求成功',
		
		// [Boolean] 是否将成功提示文本设置为接口返回的 message
		successTipsMessage: true,

		// [String] 成功消息提示框的图标
		successTipsIcon: 'none',

		// [String] 成功消息提示框的自定义图标本地路径
		successTipsImage: '',

		// [Boolean] 成功消息提示框是否显示透明蒙层，防止触摸穿透
		successTipsMask: true,

		// [Number] 成功消息提示框提示的持续时间，单位毫秒
		successTipsDuration: 1500,

		// [String] 成功消息提示框纯文本轻提示显示位置，填写有效值后只有 title 属性生效
		successTipsPosition: '',

		// [Boolean] 是否弹窗显示错误提示？
		showErrorTips: true,

		// [String] 指定错误提示文本
		errorTipsText: '服务器太累了~ 请稍后再试！',
		
		// [Boolean] 是否将失败提示文本设置为接口返回的 message
		errorTipsMessage: false,

		// [String] 失败消息提示框的图标
		errorTipsIcon: 'none',

		// [String] 失败消息提示框的自定义图标本地路径
		errorTipsImage: '',

		// [Boolean] 失败消息提示框是否显示透明蒙层，防止触摸穿透
		errorTipsMask: true,

		// [Number] 失败消息提示框提示的持续时间，单位毫秒
		errorTipsDuration: 1500,

		// [String] 失败消息提示框纯文本轻提示显示位置，填写有效值后只有 title 属性生效
		errorTipsPosition: '',
	}

	// 合并配置项
	let options = Utils.deepMargeObject(defaults, config);

	// 是否需要显示 loading？
	if (options.showLoading) {
		uni.showLoading({
			title: options.loadingText,
			mask: options.loadingMask
		});
	}

	// 进行请求并返回Promise
	return new Promise((resolve, reject) => {
		uni.request({
			method: options.method,
			url: Utils.isAbsoluteURL(options.url) ? options.url : Utils.combineURLs(options.baseURL, options.url),
			data: options.data,
			header: options.header,
			timeout: options.timeout,
			dataType: options.dataType,
			responseType: options.responseType,
			sslVerify: options.sslVerify,
			success(res) {
				console.log('接口请求成功：', res);
				if (res.statusCode == 200) {
					if(res.data.code == 200) {
						// 判断是否需要显示成功提示
						if (options.showSuccessTips) {
							uni.showToast({
								title: options.successTipsMessage ? res.data.msg : options.successTipsText,
								icon: options.successTipsIcon,
								image: options.successTipsImage,
								mask: options.successTipsMask,
								duration: options.successTipsDuration,
								position: options.successTipsPosition
							});
						}
						resolve(res.data);
					} else {
						// 判断是否需要显示失败提示
						if (options.showErrorTips) {
							uni.showToast({
								title: options.errorTipsMessage ? res.data.msg : options.errorTipsText,
								icon: options.errorTipsIcon,
								image: options.errorTipsImage,
								mask: options.errorTipsMask,
								duration: options.errorTipsDuration,
								position: options.errorTipsPosition
							});
						}
						// 定义失败对象
						let error = {
							code: res.data.code,
							msg: res.data.msg
						}
						reject(error);
					}
				} else {
					// 判断是否需要显示失败提示
					if (options.showErrorTips) {
						uni.showToast({
							title: options.errorTipsMessage ? res.errMsg : options.errorTipsText,
							icon: options.errorTipsIcon,
							image: options.errorTipsImage,
							mask: options.errorTipsMask,
							duration: options.errorTipsDuration,
							position: options.errorTipsPosition
						});
					}
					// 定义失败对象
					let error = {
						code: res.statusCode,
						msg: res.errMsg
					}
					// 根据不同的 statusCode 执行不同的操作
					if (res.statusCode == 404) {
						reject(error);
					} else if(res.statusCode == 500) {
						reject(error);
					}
				}
			},
			fail(res) {
				console.log('接口请求失败：', res);
				// 判断是否需要显示失败提示
				if (options.showErrorTips) {
					uni.showToast({
						title: options.errorTipsText,
						icon: options.errorTipsIcon,
						image: options.errorTipsImage,
						mask: options.errorTipsMask,
						duration: options.errorTipsDuration,
						position: options.errorTipsPosition
					});
				}
				// 定义失败对象
				let error = {
					code: 1991,
					msg: '未知错误'
				}
				reject(error);
			},
			complete() {
				console.log('接口请求完成！');
				// 判断是否需要关闭 loading
				if (options.showLoading) {
					uni.hideLoading();
				}
			}
		});
	});
}
export default http;
