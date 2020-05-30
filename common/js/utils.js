/**
 * @说明：工具集
 * @作者：陈万照
 * @公司：山东标梵互动技术有限公司
 * @官网：http://biaofun.com/
 * @版本：v1.0.0
 * @时间：2020年4月28日11:28:13
 */
export default {
	/**
	 * 常用正则表达式
	 */
	regExps: {
		imgTag: /\<img/gi, // 匹配全部的 <img/> 标签
	},

	/**
	 * 常用变量
	 */
	vars: {
		// 匹配富文本内容中的全部的 <img/> 标签后要替换的内容
		newImgTag: '<img style="width:100%;margin:20px 0 !important;border-radius:6px;display:block;height:auto;"'
	},

	/**
	 * 精确判断数据是否是 Object 类型
	 * @param {Any} val 要判断的数据
	 * @returns {Boolean} true：是；false：不是；
	 */
	isObject(val) {
		return Object.prototype.toString.call(val) === '[object Object]' && val !== null && val !== undefined;
	},

	/**
	 * 判断数据是否是 Array 类型
	 * @param {Any} val 要判断的数据
	 * @returns {Boolean} true：是；false：不是；
	 */
	isArray(val) {
		return Object.prototype.toString.call(val) === '[object Array]';
	},

	/**
	 * 判断数据是否是 String 类型
	 * @param {Any} val 要判断的数据
	 * @returns {Boolean} true：是；false：不是；
	 */
	isString(val) {
		return Object.prototype.toString.call(val) === '[object String]';
	},

	/**
	 * 精确判断数据是否是 Date 类型
	 * @param {Any} val 要判断的数据
	 * @returns {Boolean} true：是；false：不是；
	 */
	isDate(val) {
		return Object.prototype.toString.call(val) === '[object Date]';
	},

	/**
	 * 精确判断数据是否是 Function 类型
	 * @param {Any} val 要判断的数据
	 * @returns {Boolean} true：是；false：不是；
	 */
	isFunction(val) {
		return Object.prototype.toString.call(val) === '[object Function]';
	},

	/**
	 * 精确判断数据是否是 Number 类型
	 * @param {Any} val 要判断的数据
	 * @returns {Boolean} true：是；false：不是；
	 */
	isNumber(val) {
		return Object.prototype.toString.call(val) === '[object Number]';
	},

	/**
	 * 精确判断数据是否是 Boolean 类型
	 * @param {Any} val 要判断的数据
	 * @returns {Boolean} true：是；false：不是；
	 */
	isBoolean(val) {
		return Object.prototype.toString.call(val) === '[object Boolean]';
	},

	/**
	 * 判断 URL 是否是绝对 URL。
	 * @param {String} url 要判断的 URL
	 * @return {Boolean} true：是绝对URL；false：不是绝对URL；
	 */
	isAbsoluteURL(url) {
		// 如果 URL 以 “<scheme>：//” 或 “//”（协议相对URL）开头，则认为它是绝对的
		// RFC 3986 将方案名称定义为以字母开头的字符序列，然后是字母，数字，加号，句点或连字符的任意组合
		return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	},

	/**
	 * 合并 baseURL 和相对 URL 成一个完整的 URL
	 * @param {String} baseURL baseURL
	 * @param {String} relativeURL 相对 URL
	 * @returns {String} 返回组合后的完整 URL
	 */
	combineURLs(baseURL, relativeURL) {
		return relativeURL && this.isString(relativeURL) && this.isString(baseURL) ? baseURL.replace(/\/+$/, '') + '/' +
			relativeURL.replace(/^\/+/, '') : baseURL;
	},

	/**
	 * 深度合并对象，只支持合并两个对象，该方法不会改变原有的对象
	 * @param {Object} FirstOBJ 第一个对象
	 * @param {Object} SecondOBJ 第二个对象
	 * @return {Object} 返回深度合并后的对象
	 */
	deepMargeObject(FirstOBJ, SecondOBJ) {
		let ResultOBJ = {};
		for (let key in FirstOBJ) {
			ResultOBJ[key] = ResultOBJ[key] && ResultOBJ[key].toString() === "[object Object]" ? this.deepMargeObject(ResultOBJ[
				key], FirstOBJ[key]) : ResultOBJ[key] = FirstOBJ[key];
		}
		for (let key in SecondOBJ) {
			ResultOBJ[key] = ResultOBJ[key] && ResultOBJ[key].toString() === "[object Object]" ? this.deepMargeObject(ResultOBJ[
				key], SecondOBJ[key]) : ResultOBJ[key] = SecondOBJ[key];
		}
		return ResultOBJ;
	},

	/**
	 * 格式化日期
	 * @param {Date|String} date 日期或日期字符串
	 */
	formatDate(date) {
		let YYYY = null;
		let M = null;
		let MM = null;
		let D = null;
		let DD = null;
		let h = null;
		let hh = null;
		let m = null;
		let mm = null;
		let s = null;
		let ss = null;
		let ms = null;
		let ms2 = null;
		let ms3 = null;
		let ms4 = null;
		let dt = null;
		
		// 如果 date 是 String 类型
		if (date && this.isString(date)) {
			// 真机运行时，如果直接用 new Date('YYYY-MM-DD hh:mm:ss') 会报 Invalid Date 错误，所以采用下面的方式创建日期
			let dtArr = date.replace(/\//g, '.').replace(/-/g, '.').replace(/:/g, '.').replace(/T/g, ' ').replace(' ', '.').replace(
				'Z', '').split('.');
				
			let year = 2020; 
			let month = 12;
			let day = 18;
			let hour = 0; 
			let minute = 0;
			let second = 0;
			let millisecond = 0;
			// 年
			if (dtArr.length > 0 && !isNaN(dtArr[0])) {
				year = parseInt(dtArr[0]);
			}
			// 月
			if (dtArr.length > 1 && !isNaN(dtArr[1])) {
				month = parseInt(dtArr[1]);
			}
			// 日
			if (dtArr.length > 2 && !isNaN(dtArr[2])) {
				day = parseInt(dtArr[2]);
			}
			// 时
			if (dtArr.length > 3 && !isNaN(dtArr[3])) {
				hour = parseInt(dtArr[3]);
			}
			// 分
			if (dtArr.length > 4 && !isNaN(dtArr[4])) {
				minute = parseInt(dtArr[4]);
			}
			// 秒
			if (dtArr.length > 5 && !isNaN(dtArr[5])) {
				second = parseInt(dtArr[5]);
			}
			// 毫秒
			if (dtArr.length > 6 && !isNaN(dtArr[6])) {
				millisecond = parseInt(dtArr[6]);
			}
					
			date = new Date(year, month - 1, day, hour, minute, second, millisecond);
		}
		
		// 如果 date 是 Date 类型
		if (date && this.isDate(date)) {
			YYYY = date.getFullYear();
			M = date.getMonth() + 1;
			MM = M >= 10 ? M : '0' + M;
			D = date.getDate();
			DD = D >= 10 ? D : '0' + D;
			h = date.getHours();
			hh = h >= 10 ? h : '0' + h;
			m = date.getMinutes();
			mm = m >= 10 ? m : '0' + m;
			s = date.getSeconds();
			ss = s >= 10 ? s : '0' + s;
			ms = date.getMilliseconds();
			ms2 = ms;
			ms3 = ms;
			ms4 = ms;
			if (ms < 10) {
				ms2 = '0' + ms;
				ms3 = '00' + ms;
				ms4 = '000' + ms;
			} else if (ms < 100) {
				ms3 = '0' + ms;
				ms4 = '00' + ms;
			} else {
				ms4 = '0' + ms;
			}
		}

		// 返回的数据对象
		let result = {
			YYYY: YYYY,
			MM: MM,
			M: M,
			DD: DD,
			D: D,
			hh: hh,
			h: h,
			mm: mm,
			m: m,
			ss: ss,
			s: s,
			ms: ms,
			ms2: ms2,
			ms3: ms3,
			ms4: ms4,
			dt: date,
			fmt1: `${YYYY}-${MM}-${DD}`,
			fmt2: `${YYYY}年${M}月${D}日`, 
			fmt3: `${YYYY}-${M}-${D} ${hh}:${mm}`,
			fmt4: `${h}:${m}:${s}`,
			fmt5: `${MM}-${DD}`,
			fmt6: `${YYYY}-${MM}`,
			fmt7: `${YYYY}年${M}月`,
			fmt8: `${h}:${m}`,
			fmt9: `${M}月${D}日`,
			notes: 'YYYY（年），MM（月，补0），M（月，不补0），DD（日，补0），D（日，不补0），hh（时，补0），h（时，不补0），mm（分，补0），m（分，不补0），ss（秒，补0），s（秒，不补0），ms（毫秒，不补0），ms2（毫秒，补0到2位），ms3（毫秒，补0到3位），ms4（毫秒，补0到4位），其余的fmt1，fmt2，... 看格式就知道了！'
		};
		return result;
	},

	/**
	 * 数字转中文
	 * @param {Number} num 数字
	 */
	numberToChinese(num) {
		if (!/^\d*(\.\d*)?$/.test(num)) {
			return "Number is wrong!";
		}
		let AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九");
		let BB = new Array("", "十", "百", "千", "万", "亿", "点", "");
		let a = ("" + num).replace(/(^0*)/g, "").split("."),
			k = 0,
			re = "";
		for (let i = a[0].length - 1; i >= 0; i--) {
			switch (k) {
				case 0:
					re = BB[7] + re;
					break;
				case 4:
					if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
						re = BB[4] + re;
					break;
				case 8:
					re = BB[5] + re;
					BB[7] = BB[5];
					k = 0;
					break;
			}
			if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
			if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
			k++;
		}
		if (a.length > 1) //加上小数部分(如果有小数部分) 
		{
			re += BB[6];
			for (let i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
		}
		return re;
	}
}
