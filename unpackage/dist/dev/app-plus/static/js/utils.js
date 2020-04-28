/**
 * ************************************************************************************************************************
 * @author 山东标梵信息技术有限公司
 * @company 山东标梵信息技术有限公司
 * @website https://www.biaofun.com/
 * @version 1.0.0
 * @datetime 2019/10/21 
 * @description 公共工具集。
 * ************************************************************************************************************************
 */
export default {
  /**
   * ====================================================================================================
   * @description 通用正则表达式。
   * ====================================================================================================
   */
  regEx: {
    regMail_QQ_163: /^[\w._]+@([qQ][qQ]|163)\.[cC][oO][mM](\r\n|\r|\n)?$/, // 验证邮箱格式的正则表达式（QQ邮箱或163邮箱）
    regTel: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/, // 验证固定电话的正则表达式
    regPhone: /^1(3|4|5|7|8)\d{9}$/, // 验证手机号码的正则表达式
    regTaxpayersNo: /^[A-Za-z0-9]+$/, // 验证纳税人识别号的正则表达式
    regBankNo: /^\d{12,21}$/, // 验证银行卡号的正则表达式
    positiveIntegerHas0: /^\\d+$/, // 验证是否为正整数的正则表达式（包含0）
    positiveInteger: /^[0-9]*[1-9][0-9]*$/, // 验证是否为正整数的正则表达式（不包含0）
  },


  /**
   * ====================================================================================================
   * @description 判断数据是否是数组类型。
   * @param {any} val 要判断的数据。
   * @returns {boolean} true：是；false：不是。
   * ====================================================================================================
   */
  $isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
  },


  /**
   * ====================================================================================================
   * @description 判断数据是否是字符串。
   * @param {any} val 要判断的数据。
   * @returns {boolean} true：是；false：不是。
   * ====================================================================================================
   */
  isString(val) {
    return Object.prototype.toString.call(val) === '[object String]';
  },


  /**
   * ====================================================================================================
   * @description 判断数据是否是Object。精确判断。
   * @param {any} val 要判断的数据。
   * @returns {boolean} true：是；false：不是。
   * ====================================================================================================
   */
  isObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]' && val !== null && val !== undefined;
  },


  /**
   * ====================================================================================================
   * @description 判断数据是否是Date。精确判断。
   * @param {any} val 要判断的数据。
   * @returns {boolean} true：是；false：不是。
   * ====================================================================================================
   */
  isDate(val) {
    return Object.prototype.toString.call(val) === '[object Date]';
  },


  /**
   * ====================================================================================================
   * @description 判断数据是否是Function。精确判断。
   * @param {any} val 要判断的数据。
   * @returns {boolean} true：是；false：不是。
   * ====================================================================================================
   */
  isFunction(val) {
    return Object.prototype.toString.call(val) === '[object Function]';
  },


  /**
   * ====================================================================================================
   * @description 判断数据是否是Number 。精确判断。
   * @param {any} val 要判断的数据。
   * @returns {boolean} true：是；false：不是。
   * ====================================================================================================
   */
  isNumber(val) {
    return Object.prototype.toString.call(val) === '[object Number]';
  },


  /**
   * ====================================================================================================
   * @description 判断数据是否是Boolean 。精确判断。
   * @param {any} val 要判断的数据。
   * @returns {boolean} true：是；false：不是。
   * ====================================================================================================
   */
  isBoolean(val) {
    return Object.prototype.toString.call(val) === '[object Boolean]';
  },


  /**
   * ====================================================================================================
   * @description 合并baseURL和相对URL成一个完整的URL。
   * @param {string} baseURL baseURL。
   * @param {string} relativeURL 相对URL。
   * @returns {string} 返回组合后的完整URL。
   * ====================================================================================================
   */
  combineURLs(baseURL, relativeURL) {
    return relativeURL && this.isString(relativeURL) && this.isString(baseURL) ? baseURL.replace(/\/+$/, '') + '/' +
      relativeURL.replace(/^\/+/, '') : baseURL;
  },


  /**
   * ====================================================================================================
   * @description 判断URL是否是绝对URL。
   * @param {string} url 要判断的URL。
   * @return {boolean} true：是绝对URL；false：不是绝对URL。
   * ====================================================================================================
   */
  isAbsoluteURL(url) {
    // 如果URL以“<scheme>：//”或“//”（协议相对URL）开头，则认为它是绝对的。
    // RFC 3986将方案名称定义为以字母开头的字符序列，然后是字母，数字，加号，句点或连字符的任意组合。
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  },


  /**
   * ====================================================================================================
   * @description 深度合并对象。只支持合并两个对象。
   * @param {object} FirstOBJ 要合并的第一个对象。
   * @param {object} SecondOBJ 要合并的第二个对象。
   * @return {Object} 返回合并后的结果。
   * ====================================================================================================
   */
  deepMergeObject(FirstOBJ, SecondOBJ) {
    for (var key in SecondOBJ) {
      FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === "[object Object]" ? this.deepMergeObject(
        FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
    };
    return FirstOBJ;
  },

  /**
   * ====================================================================================================
   * @description 格式化日期对象为 "YYYY-MM-DD" 字符串格式。
   * @param {Date} dt 日期对象。
   * ====================================================================================================
   */
  formatDateToYYYYMMDD(dt) {
    let year = dt.getFullYear();
    let month = dt.getMonth() + 1;
    let day = dt.getDate();
    if (month < 10) {
      month = '0' + month
    };
    return year + '-' + month + '-' + day;
  },

  /**
   * ====================================================================================================
   * @description 格式化日期对象为 "HH:MM" 字符串格式。
   * @param {Date} dt 日期对象。
   * ====================================================================================================
   */
  formatDateToHHMM(dt) {
    let hours = dt.getHours();
    let minutes = dt.getMinutes();
    if (hours < 10) {
      hours = '0' + hours
    };
    if (minutes < 10) {
      minutes = '0' + minutes
    };
    return hours + ':' + minutes;
  },

  /**
   * ====================================================================================================
   * @description 计算从现在到结束日期的相差日期的字符串。
   * @param {Date} endDate 结束日期。
   * @return {Boolean | String} 当当前日期超过结束日期时返回 false，否则返回计算出的字符串
   * ====================================================================================================
   */
  calcCountdownTime(endDate) {
    let endDateMilliseconds = endDate.getTime(); // 1970年1月1日至结束时间的毫秒数
    let startDate = (new Date()).getTime(); // 1970年1月1日至当前时间的毫秒数
    let oneDayMilliseconds = 86400000; // 1天对应的毫秒数
    let oneHourMilliseconds = 3600000; // 1小时对应的毫秒数
    let oneMinuteMillissecond = 60000; // 1分钟对应的毫秒数

    // 判断是否已超过了结束时间
    if (startDate >= endDate) {
      return false;
    } else {
      let diffMilliseconds = endDate - startDate; // 获取到从当前时间到结束时间的毫秒数
      let days = 0; // 剩余天数
      let hours = 0; // 剩余小时数
      let minutes = 0; // 剩余分钟数
      let seconds = 0; // 剩余秒数

      // 判断剩余时间是否 > 1天
      if (diffMilliseconds >= oneDayMilliseconds) {
        days = parseInt(diffMilliseconds / oneDayMilliseconds);
        diffMilliseconds = diffMilliseconds % oneDayMilliseconds;
      };

      // 判断计算出天数后的剩余时间是否 > 1小时
      if (diffMilliseconds >= oneHourMilliseconds) {
        hours = parseInt(diffMilliseconds / oneHourMilliseconds);
        diffMilliseconds = diffMilliseconds % oneHourMilliseconds;
      };

      // 判断计算出天数、小时数后的剩余时间是否 > 1分钟
      if (diffMilliseconds >= oneMinuteMillissecond) {
        minutes = parseInt(diffMilliseconds / oneMinuteMillissecond);
        diffMilliseconds = diffMilliseconds % oneMinuteMillissecond;
      };

      // 判断技术处天数、小时数、分钟数后的剩余时间是否 > 1秒
      if (diffMilliseconds >= 1000) {
        seconds = parseInt(diffMilliseconds / 1000);
        diffMilliseconds = diffMilliseconds % 1000;
      };

      return `${days}天${hours}时${minutes}分${seconds}秒`;
    }
  },

  /**
   * ====================================================================================================
   * @description 判断某一天是当周的第几天
   * @param {Date} dt 日期对象  
   * @return {String} 返回中文周一、周二、周三、周四、周五、周六、周日中的一个
   * ====================================================================================================
   */
  getDayCN(dt) {
    let no = dt.getDay();
    let today = (new Date()).getDay();
    let cn = '';
    if (no == today) {
      cn = '今天';
    } else if (no == 0) {
      cn = '周日';
    } else if (no == 1) {
      cn = '周一';
    } else if (no == 2) {
      cn = '周二';
    } else if (no == 3) {
      cn = '周三';
    } else if (no == 4) {
      cn = '周四';
    } else if (no == 5) {
      cn = '周五';
    } else if (no == 6) {
      cn = '周六';
    };
    return cn;
  },

  /**
   * ====================================================================================================
   * @description 获取本周的日期
   * @return {Array} 返回本周的日期字符串数组
   * ====================================================================================================
   */
  getThisWeekDates() {
    let new_Date = new Date();
    let timesStamp = new_Date.getTime();
    let currenDay = new_Date.getDay();
    let dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)));
    };
    console.log(dates);
    return dates;
  },

  /**
   * ====================================================================================================
   * @description 格式化本周日期为指定格式的对象数组。
   * @return {Array} 返回指定格式的对象数组
   * ====================================================================================================
   */
  formatThisWeekToObjectArray() {
    let thisWeekDates = this.getThisWeekDates();
    let result = [];
    for (let i = 0, len = thisWeekDates.length; i < len; i++) {
      let dt = thisWeekDates[i];
      let id = dt.getDay(); // 这天是本周的第几天，0表示周日
      let cn = this.getDayCN(dt); // 这天是本周的第几天，中文周几形式的
      let short = (dt.getMonth() + 1) + '.' + dt.getDate(); // 短日期格式 mm.dd
      let long = dt.getFullYear() + '.' + (dt.getMonth() + 1) + '.' + dt.getDate(); // 长日期格式
      let item = {
        id,
        cn,
        short,
        long,
        dt,
        dtStr: thisWeekDates[i]
      };
      result.push(item);
    };
    return result;
  },

};
