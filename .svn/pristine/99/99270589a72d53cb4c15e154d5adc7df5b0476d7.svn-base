/**
 * ====================================================================================================
 * @description 封装的微信小程序网络请求函数。
 * @param {string} options.url 开发者服务器接口地址。
 * @param {object} options.data 请求的参数。
 * @param {object} options.header 设置请求的 header，header 中不能设置 Referer。
 * @param {string} options.method HTTP 请求方法。
 * @param {string} options.dataType 返回的数据格式。
 * 
 * 自己添加的配置项
 * @param {boolean} options.isStopPullDownRefresh 是否停止下拉刷新？
 * @param {boolean} options.showLoading 是否显示 loading 提示框？默认显示。
 * @param {string} options.loadingText 设置 loading 提示层中的文本内容（提示内容）。
 * @param {boolean} options.loadingMask 是否显示 loading 透明蒙层，防止触摸穿透。默认不显示。
 * @param {boolean} options.showSuccessTips 是否请求成功后弹出提示？
 * @param {string} options.successTipsText 成功提示的文本
 * @param {string} options.successTipsIcon 成功提示的图标
 * @param {string} options.successTipsImage 成功提示的图片地址 
 * @param {boolean} options.successTipsMask 是否显示成功提示的透明蒙层，放置触摸穿透。默认不显示
 * @param {number} options.successTipsDuration 成功提示显示的时长，毫秒，默认 1.5 秒
 * @param {boolean} options.showErrorTips 是否请求失败后弹出提示？
 * @param {string} options.errorTipsText 失败提示的文本
 * @param {string} options.errorTipsIcon 失败提示的图标
 * @param {string} options.errorTipsImage 失败提示的图片地址 
 * @param {boolean} options.errorTipsMask 是否显示失败提示的透明蒙层，放置触摸穿透。默认不显示
 * @param {number} options.errorTipsDuration 失败提示显示的时长，毫秒，默认 1.5 秒
 * ====================================================================================================
 */
const $http = function(options) {
  // 默认参数对象。
  let config = {
    url: '',
    data: {},
    header: {
      'Content-type': 'application/json',
    },
    method: 'POST',
    dataType: 'json',
    
    // 自己添加的配置项
    isStopPullDownRefresh: false,
    showLoading: true,
    loadingText: '',
    loadingMask: false,
    showSuccessTips: true,
    successTipsText: '',
    successTipsIcon: 'none',
    successTipsImage: '',
    successTipsMask: false,
    successTipsDuration: 1500,
    showErrorTips: true,
    errorTipsText: '',
    errorTipsIcon: 'none',
    errorTipsImage: '',
    errorTipsMask: false,
    errorTipsDuration: 1500
  };

  // 深度合并默认参数对象和传递的参数对象。
  const deepMergeObject = function(FirstOBJ, SecondOBJ) {
    for (var key in SecondOBJ) {
      FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === "[object Object]" ? deepMergeObject(
        FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
    };
    return FirstOBJ;
  };
  config = deepMergeObject(config, options || {});

  // 判断是否传递了 url 参数。
  if (!config.url) {
    console.log('错误：没有传递接口地址');
    return false;
  };

  // 判断是否传递了 data 参数。
  // 如果没有传递 data 参数，设置 data 参数的默认值为 {}。
  let data = config.data ? config.data : {};

  // Promise。
  return new Promise((resolve, reject) => {
    // 判断是否需要显示 loading 提示层。
    if (config.showLoading) {
      uni.showLoading({
        title: config.loadingText,
        mask: config.loadingMask
      });
    };

    // 使用 uni-app request 函数请求接口。
    uni.request({
      url: config.url,
      data: config.data,
      header: config.header,
      method: config.method,
      dataType: config.dataType,
      /**
       * @description 接口调用成功的回调函数。
       * @param {string/Object/Arraybuffer} result.data 开发者服务器返回的数据。
       * @param {number} result.statusCode 开发者服务器返回的 HTTP 状态码。
       * @param {object} result.header 开发者服务器返回的 HTTP Response Header。
       */
      success(result) {
        console.log('success：', result);
        // 判断开发者服务器返回的 HTTP 状态码是否是 200。
        if (result.statusCode == 200) {
          // 判断开发者服务器返回的数据中的 code 字段是否是 200。
          // 只有当开发者服务器返回的 HTTP 状态码和开发者服务器返回的数据中的 code 字段都是 200，此接口才算请求成功。
          if (result.data.code == 200) {
            // 判断是否需要显示成功提示
            if(config.showSuccessTips) {
              uni.showToast({
                title: config.successTipsText || result.data.msg,
                icon: config.successTipsIcon,
                image: config.successTipsImage,
                mask: config.successTipsMask,
                duration: config.successTipsDuration
              });
            };
            resolve(result.data);
          }
          // 接口请求错误。
          // 根据开发者服务器返回的数据中的 code 字段的值来判断错误类型。
          else {
            // 101 错误。
            if (result.data.code == 101) {
              // Todo something
            }
            // 102 错误。
            else if (result.data.code == 102) {
              // Todo something
            }

            // 判断是否需要显示错误信息。
            if (config.isTips) {
              uni.showToast({
                title: config.errorTipsText || result.data.msg,
                icon: config.errorTipsIcon,
                image: config.errorTipsImage,
                mask: config.errorTipsMask,
                duration: config.errorTipsDuration
              });
            };
            reject(result.data);
          }
        }
        // 开发者服务器返回的 HTTP 状态码不是 200。
        else {
          // 定义错误提示。
          let errorObj = {};
          errorObj.code = result.statusCode;

          // 根据开发者服务器返回的 HTTP 状态码的值来判断错误类型。
          // 404 错误
          if (result.statusCode == 404) {
            errorObj.msg = '请求错误：404';
          }
          // 500 错误。
          else if (result.statusCode == 500) {
            errorObj.msg = '请求错误：500';
          }

          // 判断是否需要显示错误信息。
          if (config.showErrorTips) {
            uni.showToast({
              title: config.errorTipsMask || errorObj.msg,
              icon: config.errorTipsIcon,
              image: config.errorTipsImage,
              mask: config.errorTipsMask,
              duration: config.errorTipsDuration
            });
          };
          reject(errorObj);
        }

      },
      /**
       * @description 接口调用失败的回调函数。
       * @param {string/Object/Arraybuffer} result.data 开发者服务器返回的数据。
       * @param {number} result.statusCode 开发者服务器返回的 HTTP 状态码。
       * @param {object} result.header 开发者服务器返回的 HTTP Response Header。
       */
      fail(result) {
        console.log(result)
        // 定义错误数据对象
        let errorObj = {
          code: -100,
          msg: result.errMsg + '：' + -100
        };
        
        // 判断是否需要显示错误信息。
        if (config.showErrorTips) {
          uni.showToast({
            title: config.errorTipsMask || errorObj.msg,
            icon: config.errorTipsIcon,
            image: config.errorTipsImage,
            mask: config.errorTipsMask,
            duration: config.errorTipsDuration
          });
        };
        reject(errorObj);
      },
      /**
       * @description 接口调用结束的回调函数（调用成功、失败都会执行）。
       * @param {string/Object/Arraybuffer} result.data 开发者服务器返回的数据。
       * @param {number} result.statusCode 开发者服务器返回的 HTTP 状态码。
       * @param {object} result.header 开发者服务器返回的 HTTP Response Header。
       */
      complete(res) {
        // 判断是否显示了 loading 提示层。
        // 如果显示了，接口请求完成后需要关闭提示层。
        if (config.showLoading) {
          uni.hideLoading();
        };

        // 判断是否需要停止下拉刷新
        if (config.isStopPullDownRefresh) {
          uni.stopPullDownRefresh();
        };
      }
    });
  });
};

export default $http;
