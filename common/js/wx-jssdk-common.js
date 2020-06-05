/**
 * @说明：微信 JS-SDK 公用函数
 * @作者：陈万照
 * @公司：山东标梵互动技术有限公司
 * @官网：http://biaofun.com/
 * @版本：v1.0.0
 * @时间：2020年4月28日11:28:13
 */
import http from 'http.js';
import wx  from 'jweixin-module';
export default {
	/**
	 * 获取 JS-SDK 注册信息
	 */
	queryConfig(href) {
		return new Promise((resolve, reject) => {
			http({
				url: 'app/jssdk',
				data: {
					url: href
				}
			})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	
	/**
	 * 配置 JS-SDK
	 * @param {Object} data 配置数据
	 */ 
	configSDK(data) {
		wx.config({
			debug: false,
			appId: data.appId,
			timestamp: data.timestamp,
			nonceStr: data.nonceStr,
			signature: data.signature,
			jsApiList: data.jsApiList
		});
	},
	
	/**
	 * 定位
	 */ 
	getLocation() {
		return new Promise((resolve, reject) => {
			wx.getLocation({
				type: 'wgs84',
				success(res) {
					console.log('定位成功：', res);
					resolve(res);
				},
				fail() {
					console.log('定位失败');
					reject({ msg: '获取位置失败！' })
				}
			});
		});
	}
}
