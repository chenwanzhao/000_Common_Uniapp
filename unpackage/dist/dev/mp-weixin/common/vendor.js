(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!************************************************!*\
  !*** D:/Projects/000_Common_Uniapp/pages.json ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */
/*!*********************************************************!*\
  !*** D:/Projects/000_Common_Uniapp/assets/http/http.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;







var _utils = _interopRequireDefault(__webpack_require__(/*! @/assets/utils/utils.js */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                       * @说明：进一步封装 uniapp 的 request 请求方法
                                                                                                                                                                       * @作者：陈万照
                                                                                                                                                                       * @公司：山东标梵互动技术有限公司
                                                                                                                                                                       * @官网：http://biaofun.com/
                                                                                                                                                                       * @版本：v1.0.0
                                                                                                                                                                       * @时间：2020年4月28日11:28:13
                                                                                                                                                                       */ // 工具集
/**
 * 请求方法
 */function http(config) {// 自己扩展的一些配置字段
  var defaults = { // [String] 接口基准路径
    baseURL: 'https://wx.jnchf.com', // [String] 请求路径
    url: '',
    // [String] 请求类型，必须大写
    method: 'POST',

    // [Object|String|ArrayBuffer] 请求参数
    data: {},

    // [Object] 设置请求的 header，header 中不能设置 Referer
    header: {
      'Author': 'ChenWanZhao' },


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
    errorTipsPosition: '' };


  // 合并配置项
  var options = _utils.default.deepMargeObject(defaults, config);

  // 是否需要显示 loading？
  if (options.showLoading) {
    uni.showLoading({
      title: options.loadingText,
      mask: options.loadingMask });

  }

  // 进行请求并返回Promise
  return new Promise(function (resolve, reject) {
    uni.request({
      method: options.method,
      url: _utils.default.isAbsoluteURL(options.url) ? options.url : _utils.default.combineURLs(options.baseURL, options.url),
      data: options.data,
      header: options.header,
      timeout: options.timeout,
      dataType: options.dataType,
      responseType: options.responseType,
      sslVerify: options.sslVerify,
      success: function success(res) {
        console.log('接口请求成功：', res);
        if (res.statusCode == 200) {
          if (res.data.code == 200) {
            // 判断是否需要显示成功提示
            if (options.showSuccessTips) {
              uni.showToast({
                title: options.successTipsMessage ? res.data.msg : options.successTipsText,
                icon: options.successTipsIcon,
                image: options.successTipsImage,
                mask: options.successTipsMask,
                duration: options.successTipsDuration,
                position: options.successTipsPosition });

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
                position: options.errorTipsPosition });

            }
            // 定义失败对象
            var error = {
              code: res.data.code,
              msg: res.data.msg };

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
              position: options.errorTipsPosition });

          }
          // 定义失败对象
          var _error = {
            code: res.statusCode,
            msg: res.errMsg };

          // 根据不同的 statusCode 执行不同的操作
          if (res.statusCode == 404) {
            reject(_error);
          } else if (res.statusCode == 500) {
            reject(_error);
          }
        }
      },
      fail: function fail(res) {
        console.log('接口请求失败：', res);
        // 判断是否需要显示失败提示
        if (options.showErrorTips) {
          uni.showToast({
            title: options.errorTipsText,
            icon: options.errorTipsIcon,
            image: options.errorTipsImage,
            mask: options.errorTipsMask,
            duration: options.errorTipsDuration,
            position: options.errorTipsPosition });

        }
        // 定义失败对象
        var error = {
          code: 1991,
          msg: '未知错误' };

        reject(error);
      },
      complete: function complete() {
        console.log('接口请求完成！');
        // 判断是否需要关闭 loading
        if (options.showLoading) {
          uni.hideLoading();
        }
      } });

  });
}var _default =
http;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 12 */
/*!***********************************************************!*\
  !*** D:/Projects/000_Common_Uniapp/assets/utils/utils.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * @说明：工具集
                                                                                                      * @作者：陈万照
                                                                                                      * @公司：山东标梵互动技术有限公司
                                                                                                      * @官网：http://biaofun.com/
                                                                                                      * @版本：v1.0.0
                                                                                                      * @时间：2020年4月28日11:28:13
                                                                                                      */var _default =
{
  /**
   * 常用正则表达式
   */
  regExps: {
    imgTag: /\<img/gi // 匹配全部的 <img/> 标签
  },

  /**
      * 常用变量
      */
  vars: {
    // 匹配富文本内容中的全部的 <img/> 标签后要替换的内容
    newImgTag: '<img style="width:100%;margin:20px 0 !important;border-radius:6px;display:block;height:auto;"' },


  /**
                                                                                                                   * 精确判断数据是否是 Object 类型
                                                                                                                   * @param {Any} val 要判断的数据
                                                                                                                   * @returns {Boolean} true：是；false：不是；
                                                                                                                   */
  isObject: function isObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]' && val !== null && val !== undefined;
  },

  /**
      * 判断数据是否是 Array 类型
      * @param {Any} val 要判断的数据
      * @returns {Boolean} true：是；false：不是；
      */
  isArray: function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
  },

  /**
      * 判断数据是否是 String 类型
      * @param {Any} val 要判断的数据
      * @returns {Boolean} true：是；false：不是；
      */
  isString: function isString(val) {
    return Object.prototype.toString.call(val) === '[object String]';
  },

  /**
      * 精确判断数据是否是 Date 类型
      * @param {Any} val 要判断的数据
      * @returns {Boolean} true：是；false：不是；
      */
  isDate: function isDate(val) {
    return Object.prototype.toString.call(val) === '[object Date]';
  },

  /**
      * 精确判断数据是否是 Function 类型
      * @param {Any} val 要判断的数据
      * @returns {Boolean} true：是；false：不是；
      */
  isFunction: function isFunction(val) {
    return Object.prototype.toString.call(val) === '[object Function]';
  },

  /**
      * 精确判断数据是否是 Number 类型
      * @param {Any} val 要判断的数据
      * @returns {Boolean} true：是；false：不是；
      */
  isNumber: function isNumber(val) {
    return Object.prototype.toString.call(val) === '[object Number]';
  },

  /**
      * 精确判断数据是否是 Boolean 类型
      * @param {Any} val 要判断的数据
      * @returns {Boolean} true：是；false：不是；
      */
  isBoolean: function isBoolean(val) {
    return Object.prototype.toString.call(val) === '[object Boolean]';
  },

  /**
      * 判断 URL 是否是绝对 URL。
      * @param {String} url 要判断的 URL
      * @return {Boolean} true：是绝对URL；false：不是绝对URL；
      */
  isAbsoluteURL: function isAbsoluteURL(url) {
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
  combineURLs: function combineURLs(baseURL, relativeURL) {
    return relativeURL && this.isString(relativeURL) && this.isString(baseURL) ? baseURL.replace(/\/+$/, '') + '/' +
    relativeURL.replace(/^\/+/, '') : baseURL;
  },

  /**
      * 深度合并对象，只支持合并两个对象，该方法不会改变原有的对象
      * @param {Object} FirstOBJ 第一个对象
      * @param {Object} SecondOBJ 第二个对象
      * @return {Object} 返回深度合并后的对象
      */
  deepMargeObject: function deepMargeObject(FirstOBJ, SecondOBJ) {
    var ResultOBJ = {};
    for (var key in FirstOBJ) {
      ResultOBJ[key] = ResultOBJ[key] && ResultOBJ[key].toString() === "[object Object]" ? this.deepMargeObject(ResultOBJ[
      key], FirstOBJ[key]) : ResultOBJ[key] = FirstOBJ[key];
    }
    for (var _key in SecondOBJ) {
      ResultOBJ[_key] = ResultOBJ[_key] && ResultOBJ[_key].toString() === "[object Object]" ? this.deepMargeObject(ResultOBJ[
      _key], SecondOBJ[_key]) : ResultOBJ[_key] = SecondOBJ[_key];
    }
    return ResultOBJ;
  },

  /**
      * 格式化日期
      * @param {Date|String} date 日期或日期字符串
      */
  formatDate: function formatDate(date) {
    var YYYY = null;
    var M = null;
    var MM = null;
    var D = null;
    var DD = null;
    var h = null;
    var hh = null;
    var m = null;
    var mm = null;
    var s = null;
    var ss = null;
    var ms = null;
    var ms2 = null;
    var ms3 = null;
    var ms4 = null;
    var dt = null;

    // 如果 date 是 String 类型
    if (date && this.isString(date)) {
      // 当前日期
      var _dt = new Date();

      // 真机运行时，如果直接用 new Date('YYYY-MM-DD hh:mm:ss') 会报 Invalid Date 错误，所以采用下面的方式创建日期
      var dtArr = date.replace(/\//g, '.').replace(/-/g, '.').replace(/:/g, '.').replace(/T/g, ' ').replace(' ', '.').replace(
      'Z', '').split('.');
      // 年
      if (dtArr.length > 0 && !isNaN(dtArr[0])) {
        _dt.setFullYear(parseInt(dtArr[0]));
      }
      // 月
      if (dtArr.length > 1 && !isNaN(dtArr[1])) {
        _dt.setMonth(parseInt(dtArr[1]) - 1);
      }
      // 日
      if (dtArr.length > 2 && !isNaN(dtArr[2])) {
        _dt.setDate(parseInt(dtArr[2]));
      }
      // 时
      if (dtArr.length > 3 && !isNaN(dtArr[3])) {
        _dt.setHours(parseInt(dtArr[3]));
      } else {
        _dt.setHours(0);
      }
      // 分
      if (dtArr.length > 4 && !isNaN(dtArr[4])) {
        _dt.setMinutes(parseInt(dtArr[4]));
      } else {
        _dt.setMinutes(0);
      }
      // 秒
      if (dtArr.length > 5 && !isNaN(dtArr[5])) {
        _dt.setSeconds(parseInt(dtArr[5]));
      } else {
        _dt.setSeconds(0);
      }
      // 毫秒
      if (dtArr.length > 6 && !isNaN(dtArr[6])) {
        _dt.setMilliseconds(parseInt(dtArr[6]));
      } else {
        _dt.setMilliseconds(0);
      }

      date = _dt;
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
    var result = {
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
      fmt1: "".concat(YYYY, "-").concat(MM, "-").concat(DD),
      fmt2: "".concat(YYYY, "\u5E74").concat(M, "\u6708").concat(D, "\u65E5"),
      fmt3: "".concat(YYYY, "-").concat(M, "-").concat(D, " ").concat(hh, ":").concat(mm),
      fmt4: "".concat(h, ":").concat(m, ":").concat(s),
      fmt5: "".concat(MM, "-").concat(DD),
      fmt6: "".concat(YYYY, "-").concat(MM),
      fmt7: "".concat(YYYY, "\u5E74").concat(M, "\u6708"),
      fmt8: "".concat(h, ":").concat(m),
      fmt9: "".concat(M, "\u6708").concat(D, "\u65E5"),
      notes: 'YYYY（年），MM（月，补0），M（月，不补0），DD（日，补0），D（日，不补0），hh（时，补0），h（时，不补0），mm（分，补0），m（分，不补0），ss（秒，补0），s（秒，不补0），ms（毫秒，不补0），ms2（毫秒，补0到2位），ms3（毫秒，补0到3位），ms4（毫秒，补0到4位），其余的fmt1，fmt2，... 看格式就知道了！' };

    return result;
  },

  /**
      * 数字转中文
      * @param {Number} num 数字
      */
  numberToChinese: function numberToChinese(num) {
    if (!/^\d*(\.\d*)?$/.test(num)) {
      return "Number is wrong!";
    }
    var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九");
    var BB = new Array("", "十", "百", "千", "万", "亿", "点", "");
    var a = ("" + num).replace(/(^0*)/g, "").split("."),
    k = 0,
    re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
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
          break;}

      if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
      if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
      k++;
    }
    if (a.length > 1) //加上小数部分(如果有小数部分) 
      {
        re += BB[6];
        for (var _i = 0; _i < a[1].length; _i++) {re += AA[a[1].charAt(_i)];}
      }
    return re;
  } };exports.default = _default;

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 28);

/***/ }),
/* 28 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 29);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 29 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
/*!*************************************************************!*\
  !*** D:/Projects/000_Common_Uniapp/static/json/region.json ***!
  \*************************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, default */
/***/ (function(module) {

module.exports = [{"id":110000,"name":"北京市","pid":100000,"level":1,"children":[{"id":110100,"name":"北京市","pid":110000,"level":2,"children":[{"id":110101,"name":"东城区","pid":110100,"level":3},{"id":110102,"name":"西城区","pid":110100,"level":3},{"id":110105,"name":"朝阳区","pid":110100,"level":3},{"id":110106,"name":"丰台区","pid":110100,"level":3},{"id":110107,"name":"石景山区","pid":110100,"level":3},{"id":110108,"name":"海淀区","pid":110100,"level":3},{"id":110109,"name":"门头沟区","pid":110100,"level":3},{"id":110111,"name":"房山区","pid":110100,"level":3},{"id":110112,"name":"通州区","pid":110100,"level":3},{"id":110113,"name":"顺义区","pid":110100,"level":3},{"id":110114,"name":"昌平区","pid":110100,"level":3},{"id":110115,"name":"大兴区","pid":110100,"level":3},{"id":110116,"name":"怀柔区","pid":110100,"level":3},{"id":110117,"name":"平谷区","pid":110100,"level":3},{"id":110228,"name":"密云县","pid":110100,"level":3},{"id":110229,"name":"延庆县","pid":110100,"level":3}]}]},{"id":120000,"name":"天津市","pid":100000,"level":1,"children":[{"id":120100,"name":"天津市","pid":120000,"level":2,"children":[{"id":120101,"name":"和平区","pid":120100,"level":3},{"id":120102,"name":"河东区","pid":120100,"level":3},{"id":120103,"name":"河西区","pid":120100,"level":3},{"id":120104,"name":"南开区","pid":120100,"level":3},{"id":120105,"name":"河北区","pid":120100,"level":3},{"id":120106,"name":"红桥区","pid":120100,"level":3},{"id":120110,"name":"东丽区","pid":120100,"level":3},{"id":120111,"name":"西青区","pid":120100,"level":3},{"id":120112,"name":"津南区","pid":120100,"level":3},{"id":120113,"name":"北辰区","pid":120100,"level":3},{"id":120114,"name":"武清区","pid":120100,"level":3},{"id":120115,"name":"宝坻区","pid":120100,"level":3},{"id":120116,"name":"滨海新区","pid":120100,"level":3},{"id":120221,"name":"宁河县","pid":120100,"level":3},{"id":120223,"name":"静海县","pid":120100,"level":3},{"id":120225,"name":"蓟县","pid":120100,"level":3}]}]},{"id":130000,"name":"河北省","pid":100000,"level":1,"children":[{"id":130100,"name":"石家庄市","pid":130000,"level":2,"children":[{"id":130102,"name":"长安区","pid":130100,"level":3},{"id":130104,"name":"桥西区","pid":130100,"level":3},{"id":130105,"name":"新华区","pid":130100,"level":3},{"id":130107,"name":"井陉矿区","pid":130100,"level":3},{"id":130108,"name":"裕华区","pid":130100,"level":3},{"id":130109,"name":"藁城区","pid":130100,"level":3},{"id":130110,"name":"鹿泉区","pid":130100,"level":3},{"id":130111,"name":"栾城区","pid":130100,"level":3},{"id":130121,"name":"井陉县","pid":130100,"level":3},{"id":130123,"name":"正定县","pid":130100,"level":3},{"id":130125,"name":"行唐县","pid":130100,"level":3},{"id":130126,"name":"灵寿县","pid":130100,"level":3},{"id":130127,"name":"高邑县","pid":130100,"level":3},{"id":130128,"name":"深泽县","pid":130100,"level":3},{"id":130129,"name":"赞皇县","pid":130100,"level":3},{"id":130130,"name":"无极县","pid":130100,"level":3},{"id":130131,"name":"平山县","pid":130100,"level":3},{"id":130132,"name":"元氏县","pid":130100,"level":3},{"id":130133,"name":"赵县","pid":130100,"level":3},{"id":130181,"name":"辛集市","pid":130100,"level":3},{"id":130183,"name":"晋州市","pid":130100,"level":3},{"id":130184,"name":"新乐市","pid":130100,"level":3}]},{"id":130200,"name":"唐山市","pid":130000,"level":2,"children":[{"id":130202,"name":"路南区","pid":130200,"level":3},{"id":130203,"name":"路北区","pid":130200,"level":3},{"id":130204,"name":"古冶区","pid":130200,"level":3},{"id":130205,"name":"开平区","pid":130200,"level":3},{"id":130207,"name":"丰南区","pid":130200,"level":3},{"id":130208,"name":"丰润区","pid":130200,"level":3},{"id":130209,"name":"曹妃甸区","pid":130200,"level":3},{"id":130223,"name":"滦县","pid":130200,"level":3},{"id":130224,"name":"滦南县","pid":130200,"level":3},{"id":130225,"name":"乐亭县","pid":130200,"level":3},{"id":130227,"name":"迁西县","pid":130200,"level":3},{"id":130229,"name":"玉田县","pid":130200,"level":3},{"id":130281,"name":"遵化市","pid":130200,"level":3},{"id":130283,"name":"迁安市","pid":130200,"level":3}]},{"id":130300,"name":"秦皇岛市","pid":130000,"level":2,"children":[{"id":130302,"name":"海港区","pid":130300,"level":3},{"id":130303,"name":"山海关区","pid":130300,"level":3},{"id":130304,"name":"北戴河区","pid":130300,"level":3},{"id":130321,"name":"青龙满族自治县","pid":130300,"level":3},{"id":130322,"name":"昌黎县","pid":130300,"level":3},{"id":130323,"name":"抚宁县","pid":130300,"level":3},{"id":130324,"name":"卢龙县","pid":130300,"level":3}]},{"id":130400,"name":"邯郸市","pid":130000,"level":2,"children":[{"id":130402,"name":"邯山区","pid":130400,"level":3},{"id":130403,"name":"丛台区","pid":130400,"level":3},{"id":130404,"name":"复兴区","pid":130400,"level":3},{"id":130406,"name":"峰峰矿区","pid":130400,"level":3},{"id":130421,"name":"邯郸县","pid":130400,"level":3},{"id":130423,"name":"临漳县","pid":130400,"level":3},{"id":130424,"name":"成安县","pid":130400,"level":3},{"id":130425,"name":"大名县","pid":130400,"level":3},{"id":130426,"name":"涉县","pid":130400,"level":3},{"id":130427,"name":"磁县","pid":130400,"level":3},{"id":130428,"name":"肥乡县","pid":130400,"level":3},{"id":130429,"name":"永年县","pid":130400,"level":3},{"id":130430,"name":"邱县","pid":130400,"level":3},{"id":130431,"name":"鸡泽县","pid":130400,"level":3},{"id":130432,"name":"广平县","pid":130400,"level":3},{"id":130433,"name":"馆陶县","pid":130400,"level":3},{"id":130434,"name":"魏县","pid":130400,"level":3},{"id":130435,"name":"曲周县","pid":130400,"level":3},{"id":130481,"name":"武安市","pid":130400,"level":3}]},{"id":130500,"name":"邢台市","pid":130000,"level":2,"children":[{"id":130502,"name":"桥东区","pid":130500,"level":3},{"id":130503,"name":"桥西区","pid":130500,"level":3},{"id":130521,"name":"邢台县","pid":130500,"level":3},{"id":130522,"name":"临城县","pid":130500,"level":3},{"id":130523,"name":"内丘县","pid":130500,"level":3},{"id":130524,"name":"柏乡县","pid":130500,"level":3},{"id":130525,"name":"隆尧县","pid":130500,"level":3},{"id":130526,"name":"任县","pid":130500,"level":3},{"id":130527,"name":"南和县","pid":130500,"level":3},{"id":130528,"name":"宁晋县","pid":130500,"level":3},{"id":130529,"name":"巨鹿县","pid":130500,"level":3},{"id":130530,"name":"新河县","pid":130500,"level":3},{"id":130531,"name":"广宗县","pid":130500,"level":3},{"id":130532,"name":"平乡县","pid":130500,"level":3},{"id":130533,"name":"威县","pid":130500,"level":3},{"id":130534,"name":"清河县","pid":130500,"level":3},{"id":130535,"name":"临西县","pid":130500,"level":3},{"id":130581,"name":"南宫市","pid":130500,"level":3},{"id":130582,"name":"沙河市","pid":130500,"level":3}]},{"id":130600,"name":"保定市","pid":130000,"level":2,"children":[{"id":130602,"name":"新市区","pid":130600,"level":3},{"id":130603,"name":"北市区","pid":130600,"level":3},{"id":130604,"name":"南市区","pid":130600,"level":3},{"id":130621,"name":"满城县","pid":130600,"level":3},{"id":130622,"name":"清苑县","pid":130600,"level":3},{"id":130623,"name":"涞水县","pid":130600,"level":3},{"id":130624,"name":"阜平县","pid":130600,"level":3},{"id":130625,"name":"徐水县","pid":130600,"level":3},{"id":130626,"name":"定兴县","pid":130600,"level":3},{"id":130627,"name":"唐县","pid":130600,"level":3},{"id":130628,"name":"高阳县","pid":130600,"level":3},{"id":130629,"name":"容城县","pid":130600,"level":3},{"id":130630,"name":"涞源县","pid":130600,"level":3},{"id":130631,"name":"望都县","pid":130600,"level":3},{"id":130632,"name":"安新县","pid":130600,"level":3},{"id":130633,"name":"易县","pid":130600,"level":3},{"id":130634,"name":"曲阳县","pid":130600,"level":3},{"id":130635,"name":"蠡县","pid":130600,"level":3},{"id":130636,"name":"顺平县","pid":130600,"level":3},{"id":130637,"name":"博野县","pid":130600,"level":3},{"id":130638,"name":"雄县","pid":130600,"level":3},{"id":130681,"name":"涿州市","pid":130600,"level":3},{"id":130682,"name":"定州市","pid":130600,"level":3},{"id":130683,"name":"安国市","pid":130600,"level":3},{"id":130684,"name":"高碑店市","pid":130600,"level":3}]},{"id":130700,"name":"张家口市","pid":130000,"level":2,"children":[{"id":130702,"name":"桥东区","pid":130700,"level":3},{"id":130703,"name":"桥西区","pid":130700,"level":3},{"id":130705,"name":"宣化区","pid":130700,"level":3},{"id":130706,"name":"下花园区","pid":130700,"level":3},{"id":130721,"name":"宣化县","pid":130700,"level":3},{"id":130722,"name":"张北县","pid":130700,"level":3},{"id":130723,"name":"康保县","pid":130700,"level":3},{"id":130724,"name":"沽源县","pid":130700,"level":3},{"id":130725,"name":"尚义县","pid":130700,"level":3},{"id":130726,"name":"蔚县","pid":130700,"level":3},{"id":130727,"name":"阳原县","pid":130700,"level":3},{"id":130728,"name":"怀安县","pid":130700,"level":3},{"id":130729,"name":"万全县","pid":130700,"level":3},{"id":130730,"name":"怀来县","pid":130700,"level":3},{"id":130731,"name":"涿鹿县","pid":130700,"level":3},{"id":130732,"name":"赤城县","pid":130700,"level":3},{"id":130733,"name":"崇礼县","pid":130700,"level":3}]},{"id":130800,"name":"承德市","pid":130000,"level":2,"children":[{"id":130802,"name":"双桥区","pid":130800,"level":3},{"id":130803,"name":"双滦区","pid":130800,"level":3},{"id":130804,"name":"鹰手营子矿区","pid":130800,"level":3},{"id":130821,"name":"承德县","pid":130800,"level":3},{"id":130822,"name":"兴隆县","pid":130800,"level":3},{"id":130823,"name":"平泉县","pid":130800,"level":3},{"id":130824,"name":"滦平县","pid":130800,"level":3},{"id":130825,"name":"隆化县","pid":130800,"level":3},{"id":130826,"name":"丰宁满族自治县","pid":130800,"level":3},{"id":130827,"name":"宽城满族自治县","pid":130800,"level":3},{"id":130828,"name":"围场满族蒙古族自治县","pid":130800,"level":3}]},{"id":130900,"name":"沧州市","pid":130000,"level":2,"children":[{"id":130902,"name":"新华区","pid":130900,"level":3},{"id":130903,"name":"运河区","pid":130900,"level":3},{"id":130921,"name":"沧县","pid":130900,"level":3},{"id":130922,"name":"青县","pid":130900,"level":3},{"id":130923,"name":"东光县","pid":130900,"level":3},{"id":130924,"name":"海兴县","pid":130900,"level":3},{"id":130925,"name":"盐山县","pid":130900,"level":3},{"id":130926,"name":"肃宁县","pid":130900,"level":3},{"id":130927,"name":"南皮县","pid":130900,"level":3},{"id":130928,"name":"吴桥县","pid":130900,"level":3},{"id":130929,"name":"献县","pid":130900,"level":3},{"id":130930,"name":"孟村回族自治县","pid":130900,"level":3},{"id":130981,"name":"泊头市","pid":130900,"level":3},{"id":130982,"name":"任丘市","pid":130900,"level":3},{"id":130983,"name":"黄骅市","pid":130900,"level":3},{"id":130984,"name":"河间市","pid":130900,"level":3}]},{"id":131000,"name":"廊坊市","pid":130000,"level":2,"children":[{"id":131002,"name":"安次区","pid":131000,"level":3},{"id":131003,"name":"广阳区","pid":131000,"level":3},{"id":131022,"name":"固安县","pid":131000,"level":3},{"id":131023,"name":"永清县","pid":131000,"level":3},{"id":131024,"name":"香河县","pid":131000,"level":3},{"id":131025,"name":"大城县","pid":131000,"level":3},{"id":131026,"name":"文安县","pid":131000,"level":3},{"id":131028,"name":"大厂回族自治县","pid":131000,"level":3},{"id":131081,"name":"霸州市","pid":131000,"level":3},{"id":131082,"name":"三河市","pid":131000,"level":3}]},{"id":131100,"name":"衡水市","pid":130000,"level":2,"children":[{"id":131102,"name":"桃城区","pid":131100,"level":3},{"id":131121,"name":"枣强县","pid":131100,"level":3},{"id":131122,"name":"武邑县","pid":131100,"level":3},{"id":131123,"name":"武强县","pid":131100,"level":3},{"id":131124,"name":"饶阳县","pid":131100,"level":3},{"id":131125,"name":"安平县","pid":131100,"level":3},{"id":131126,"name":"故城县","pid":131100,"level":3},{"id":131127,"name":"景县","pid":131100,"level":3},{"id":131128,"name":"阜城县","pid":131100,"level":3},{"id":131181,"name":"冀州市","pid":131100,"level":3},{"id":131182,"name":"深州市","pid":131100,"level":3}]}]},{"id":140000,"name":"山西省","pid":100000,"level":1,"children":[{"id":140100,"name":"太原市","pid":140000,"level":2,"children":[{"id":140105,"name":"小店区","pid":140100,"level":3},{"id":140106,"name":"迎泽区","pid":140100,"level":3},{"id":140107,"name":"杏花岭区","pid":140100,"level":3},{"id":140108,"name":"尖草坪区","pid":140100,"level":3},{"id":140109,"name":"万柏林区","pid":140100,"level":3},{"id":140110,"name":"晋源区","pid":140100,"level":3},{"id":140121,"name":"清徐县","pid":140100,"level":3},{"id":140122,"name":"阳曲县","pid":140100,"level":3},{"id":140123,"name":"娄烦县","pid":140100,"level":3},{"id":140181,"name":"古交市","pid":140100,"level":3}]},{"id":140200,"name":"大同市","pid":140000,"level":2,"children":[{"id":140202,"name":"城区","pid":140200,"level":3},{"id":140203,"name":"矿区","pid":140200,"level":3},{"id":140211,"name":"南郊区","pid":140200,"level":3},{"id":140212,"name":"新荣区","pid":140200,"level":3},{"id":140221,"name":"阳高县","pid":140200,"level":3},{"id":140222,"name":"天镇县","pid":140200,"level":3},{"id":140223,"name":"广灵县","pid":140200,"level":3},{"id":140224,"name":"灵丘县","pid":140200,"level":3},{"id":140225,"name":"浑源县","pid":140200,"level":3},{"id":140226,"name":"左云县","pid":140200,"level":3},{"id":140227,"name":"大同县","pid":140200,"level":3}]},{"id":140300,"name":"阳泉市","pid":140000,"level":2,"children":[{"id":140302,"name":"城区","pid":140300,"level":3},{"id":140303,"name":"矿区","pid":140300,"level":3},{"id":140311,"name":"郊区","pid":140300,"level":3},{"id":140321,"name":"平定县","pid":140300,"level":3},{"id":140322,"name":"盂县","pid":140300,"level":3}]},{"id":140400,"name":"长治市","pid":140000,"level":2,"children":[{"id":140402,"name":"城区","pid":140400,"level":3},{"id":140411,"name":"郊区","pid":140400,"level":3},{"id":140421,"name":"长治县","pid":140400,"level":3},{"id":140423,"name":"襄垣县","pid":140400,"level":3},{"id":140424,"name":"屯留县","pid":140400,"level":3},{"id":140425,"name":"平顺县","pid":140400,"level":3},{"id":140426,"name":"黎城县","pid":140400,"level":3},{"id":140427,"name":"壶关县","pid":140400,"level":3},{"id":140428,"name":"长子县","pid":140400,"level":3},{"id":140429,"name":"武乡县","pid":140400,"level":3},{"id":140430,"name":"沁县","pid":140400,"level":3},{"id":140431,"name":"沁源县","pid":140400,"level":3},{"id":140481,"name":"潞城市","pid":140400,"level":3}]},{"id":140500,"name":"晋城市","pid":140000,"level":2,"children":[{"id":140502,"name":"城区","pid":140500,"level":3},{"id":140521,"name":"沁水县","pid":140500,"level":3},{"id":140522,"name":"阳城县","pid":140500,"level":3},{"id":140524,"name":"陵川县","pid":140500,"level":3},{"id":140525,"name":"泽州县","pid":140500,"level":3},{"id":140581,"name":"高平市","pid":140500,"level":3}]},{"id":140600,"name":"朔州市","pid":140000,"level":2,"children":[{"id":140602,"name":"朔城区","pid":140600,"level":3},{"id":140603,"name":"平鲁区","pid":140600,"level":3},{"id":140621,"name":"山阴县","pid":140600,"level":3},{"id":140622,"name":"应县","pid":140600,"level":3},{"id":140623,"name":"右玉县","pid":140600,"level":3},{"id":140624,"name":"怀仁县","pid":140600,"level":3}]},{"id":140700,"name":"晋中市","pid":140000,"level":2,"children":[{"id":140702,"name":"榆次区","pid":140700,"level":3},{"id":140721,"name":"榆社县","pid":140700,"level":3},{"id":140722,"name":"左权县","pid":140700,"level":3},{"id":140723,"name":"和顺县","pid":140700,"level":3},{"id":140724,"name":"昔阳县","pid":140700,"level":3},{"id":140725,"name":"寿阳县","pid":140700,"level":3},{"id":140726,"name":"太谷县","pid":140700,"level":3},{"id":140727,"name":"祁县","pid":140700,"level":3},{"id":140728,"name":"平遥县","pid":140700,"level":3},{"id":140729,"name":"灵石县","pid":140700,"level":3},{"id":140781,"name":"介休市","pid":140700,"level":3}]},{"id":140800,"name":"运城市","pid":140000,"level":2,"children":[{"id":140802,"name":"盐湖区","pid":140800,"level":3},{"id":140821,"name":"临猗县","pid":140800,"level":3},{"id":140822,"name":"万荣县","pid":140800,"level":3},{"id":140823,"name":"闻喜县","pid":140800,"level":3},{"id":140824,"name":"稷山县","pid":140800,"level":3},{"id":140825,"name":"新绛县","pid":140800,"level":3},{"id":140826,"name":"绛县","pid":140800,"level":3},{"id":140827,"name":"垣曲县","pid":140800,"level":3},{"id":140828,"name":"夏县","pid":140800,"level":3},{"id":140829,"name":"平陆县","pid":140800,"level":3},{"id":140830,"name":"芮城县","pid":140800,"level":3},{"id":140881,"name":"永济市","pid":140800,"level":3},{"id":140882,"name":"河津市","pid":140800,"level":3}]},{"id":140900,"name":"忻州市","pid":140000,"level":2,"children":[{"id":140902,"name":"忻府区","pid":140900,"level":3},{"id":140921,"name":"定襄县","pid":140900,"level":3},{"id":140922,"name":"五台县","pid":140900,"level":3},{"id":140923,"name":"代县","pid":140900,"level":3},{"id":140924,"name":"繁峙县","pid":140900,"level":3},{"id":140925,"name":"宁武县","pid":140900,"level":3},{"id":140926,"name":"静乐县","pid":140900,"level":3},{"id":140927,"name":"神池县","pid":140900,"level":3},{"id":140928,"name":"五寨县","pid":140900,"level":3},{"id":140929,"name":"岢岚县","pid":140900,"level":3},{"id":140930,"name":"河曲县","pid":140900,"level":3},{"id":140931,"name":"保德县","pid":140900,"level":3},{"id":140932,"name":"偏关县","pid":140900,"level":3},{"id":140981,"name":"原平市","pid":140900,"level":3}]},{"id":141000,"name":"临汾市","pid":140000,"level":2,"children":[{"id":141002,"name":"尧都区","pid":141000,"level":3},{"id":141021,"name":"曲沃县","pid":141000,"level":3},{"id":141022,"name":"翼城县","pid":141000,"level":3},{"id":141023,"name":"襄汾县","pid":141000,"level":3},{"id":141024,"name":"洪洞县","pid":141000,"level":3},{"id":141025,"name":"古县","pid":141000,"level":3},{"id":141026,"name":"安泽县","pid":141000,"level":3},{"id":141027,"name":"浮山县","pid":141000,"level":3},{"id":141028,"name":"吉县","pid":141000,"level":3},{"id":141029,"name":"乡宁县","pid":141000,"level":3},{"id":141030,"name":"大宁县","pid":141000,"level":3},{"id":141031,"name":"隰县","pid":141000,"level":3},{"id":141032,"name":"永和县","pid":141000,"level":3},{"id":141033,"name":"蒲县","pid":141000,"level":3},{"id":141034,"name":"汾西县","pid":141000,"level":3},{"id":141081,"name":"侯马市","pid":141000,"level":3},{"id":141082,"name":"霍州市","pid":141000,"level":3}]},{"id":141100,"name":"吕梁市","pid":140000,"level":2,"children":[{"id":141102,"name":"离石区","pid":141100,"level":3},{"id":141121,"name":"文水县","pid":141100,"level":3},{"id":141122,"name":"交城县","pid":141100,"level":3},{"id":141123,"name":"兴县","pid":141100,"level":3},{"id":141124,"name":"临县","pid":141100,"level":3},{"id":141125,"name":"柳林县","pid":141100,"level":3},{"id":141126,"name":"石楼县","pid":141100,"level":3},{"id":141127,"name":"岚县","pid":141100,"level":3},{"id":141128,"name":"方山县","pid":141100,"level":3},{"id":141129,"name":"中阳县","pid":141100,"level":3},{"id":141130,"name":"交口县","pid":141100,"level":3},{"id":141181,"name":"孝义市","pid":141100,"level":3},{"id":141182,"name":"汾阳市","pid":141100,"level":3}]}]},{"id":150000,"name":"内蒙古自治区","pid":100000,"level":1,"children":[{"id":150100,"name":"呼和浩特市","pid":150000,"level":2,"children":[{"id":150102,"name":"新城区","pid":150100,"level":3},{"id":150103,"name":"回民区","pid":150100,"level":3},{"id":150104,"name":"玉泉区","pid":150100,"level":3},{"id":150105,"name":"赛罕区","pid":150100,"level":3},{"id":150121,"name":"土默特左旗","pid":150100,"level":3},{"id":150122,"name":"托克托县","pid":150100,"level":3},{"id":150123,"name":"和林格尔县","pid":150100,"level":3},{"id":150124,"name":"清水河县","pid":150100,"level":3},{"id":150125,"name":"武川县","pid":150100,"level":3}]},{"id":150200,"name":"包头市","pid":150000,"level":2,"children":[{"id":150202,"name":"东河区","pid":150200,"level":3},{"id":150203,"name":"昆都仑区","pid":150200,"level":3},{"id":150204,"name":"青山区","pid":150200,"level":3},{"id":150205,"name":"石拐区","pid":150200,"level":3},{"id":150206,"name":"白云鄂博矿区","pid":150200,"level":3},{"id":150207,"name":"九原区","pid":150200,"level":3},{"id":150221,"name":"土默特右旗","pid":150200,"level":3},{"id":150222,"name":"固阳县","pid":150200,"level":3},{"id":150223,"name":"达尔罕茂明安联合旗","pid":150200,"level":3}]},{"id":150300,"name":"乌海市","pid":150000,"level":2,"children":[{"id":150302,"name":"海勃湾区","pid":150300,"level":3},{"id":150303,"name":"海南区","pid":150300,"level":3},{"id":150304,"name":"乌达区","pid":150300,"level":3}]},{"id":150400,"name":"赤峰市","pid":150000,"level":2,"children":[{"id":150402,"name":"红山区","pid":150400,"level":3},{"id":150403,"name":"元宝山区","pid":150400,"level":3},{"id":150404,"name":"松山区","pid":150400,"level":3},{"id":150421,"name":"阿鲁科尔沁旗","pid":150400,"level":3},{"id":150422,"name":"巴林左旗","pid":150400,"level":3},{"id":150423,"name":"巴林右旗","pid":150400,"level":3},{"id":150424,"name":"林西县","pid":150400,"level":3},{"id":150425,"name":"克什克腾旗","pid":150400,"level":3},{"id":150426,"name":"翁牛特旗","pid":150400,"level":3},{"id":150428,"name":"喀喇沁旗","pid":150400,"level":3},{"id":150429,"name":"宁城县","pid":150400,"level":3},{"id":150430,"name":"敖汉旗","pid":150400,"level":3}]},{"id":150500,"name":"通辽市","pid":150000,"level":2,"children":[{"id":150502,"name":"科尔沁区","pid":150500,"level":3},{"id":150521,"name":"科尔沁左翼中旗","pid":150500,"level":3},{"id":150522,"name":"科尔沁左翼后旗","pid":150500,"level":3},{"id":150523,"name":"开鲁县","pid":150500,"level":3},{"id":150524,"name":"库伦旗","pid":150500,"level":3},{"id":150525,"name":"奈曼旗","pid":150500,"level":3},{"id":150526,"name":"扎鲁特旗","pid":150500,"level":3},{"id":150581,"name":"霍林郭勒市","pid":150500,"level":3}]},{"id":150600,"name":"鄂尔多斯市","pid":150000,"level":2,"children":[{"id":150602,"name":"东胜区","pid":150600,"level":3},{"id":150621,"name":"达拉特旗","pid":150600,"level":3},{"id":150622,"name":"准格尔旗","pid":150600,"level":3},{"id":150623,"name":"鄂托克前旗","pid":150600,"level":3},{"id":150624,"name":"鄂托克旗","pid":150600,"level":3},{"id":150625,"name":"杭锦旗","pid":150600,"level":3},{"id":150626,"name":"乌审旗","pid":150600,"level":3},{"id":150627,"name":"伊金霍洛旗","pid":150600,"level":3}]},{"id":150700,"name":"呼伦贝尔市","pid":150000,"level":2,"children":[{"id":150702,"name":"海拉尔区","pid":150700,"level":3},{"id":150703,"name":"扎赉诺尔区","pid":150700,"level":3},{"id":150721,"name":"阿荣旗","pid":150700,"level":3},{"id":150722,"name":"莫力达瓦达斡尔族自治旗","pid":150700,"level":3},{"id":150723,"name":"鄂伦春自治旗","pid":150700,"level":3},{"id":150724,"name":"鄂温克族自治旗","pid":150700,"level":3},{"id":150725,"name":"陈巴尔虎旗","pid":150700,"level":3},{"id":150726,"name":"新巴尔虎左旗","pid":150700,"level":3},{"id":150727,"name":"新巴尔虎右旗","pid":150700,"level":3},{"id":150781,"name":"满洲里市","pid":150700,"level":3},{"id":150782,"name":"牙克石市","pid":150700,"level":3},{"id":150783,"name":"扎兰屯市","pid":150700,"level":3},{"id":150784,"name":"额尔古纳市","pid":150700,"level":3},{"id":150785,"name":"根河市","pid":150700,"level":3}]},{"id":150800,"name":"巴彦淖尔市","pid":150000,"level":2,"children":[{"id":150802,"name":"临河区","pid":150800,"level":3},{"id":150821,"name":"五原县","pid":150800,"level":3},{"id":150822,"name":"磴口县","pid":150800,"level":3},{"id":150823,"name":"乌拉特前旗","pid":150800,"level":3},{"id":150824,"name":"乌拉特中旗","pid":150800,"level":3},{"id":150825,"name":"乌拉特后旗","pid":150800,"level":3},{"id":150826,"name":"杭锦后旗","pid":150800,"level":3}]},{"id":150900,"name":"乌兰察布市","pid":150000,"level":2,"children":[{"id":150902,"name":"集宁区","pid":150900,"level":3},{"id":150921,"name":"卓资县","pid":150900,"level":3},{"id":150922,"name":"化德县","pid":150900,"level":3},{"id":150923,"name":"商都县","pid":150900,"level":3},{"id":150924,"name":"兴和县","pid":150900,"level":3},{"id":150925,"name":"凉城县","pid":150900,"level":3},{"id":150926,"name":"察哈尔右翼前旗","pid":150900,"level":3},{"id":150927,"name":"察哈尔右翼中旗","pid":150900,"level":3},{"id":150928,"name":"察哈尔右翼后旗","pid":150900,"level":3},{"id":150929,"name":"四子王旗","pid":150900,"level":3},{"id":150981,"name":"丰镇市","pid":150900,"level":3}]},{"id":152200,"name":"兴安盟","pid":150000,"level":2,"children":[{"id":152201,"name":"乌兰浩特市","pid":152200,"level":3},{"id":152202,"name":"阿尔山市","pid":152200,"level":3},{"id":152221,"name":"科尔沁右翼前旗","pid":152200,"level":3},{"id":152222,"name":"科尔沁右翼中旗","pid":152200,"level":3},{"id":152223,"name":"扎赉特旗","pid":152200,"level":3},{"id":152224,"name":"突泉县","pid":152200,"level":3}]},{"id":152500,"name":"锡林郭勒盟","pid":150000,"level":2,"children":[{"id":152501,"name":"二连浩特市","pid":152500,"level":3},{"id":152502,"name":"锡林浩特市","pid":152500,"level":3},{"id":152522,"name":"阿巴嘎旗","pid":152500,"level":3},{"id":152523,"name":"苏尼特左旗","pid":152500,"level":3},{"id":152524,"name":"苏尼特右旗","pid":152500,"level":3},{"id":152525,"name":"东乌珠穆沁旗","pid":152500,"level":3},{"id":152526,"name":"西乌珠穆沁旗","pid":152500,"level":3},{"id":152527,"name":"太仆寺旗","pid":152500,"level":3},{"id":152528,"name":"镶黄旗","pid":152500,"level":3},{"id":152529,"name":"正镶白旗","pid":152500,"level":3},{"id":152530,"name":"正蓝旗","pid":152500,"level":3},{"id":152531,"name":"多伦县","pid":152500,"level":3}]},{"id":152900,"name":"阿拉善盟","pid":150000,"level":2,"children":[{"id":152921,"name":"阿拉善左旗","pid":152900,"level":3},{"id":152922,"name":"阿拉善右旗","pid":152900,"level":3},{"id":152923,"name":"额济纳旗","pid":152900,"level":3}]}]},{"id":210000,"name":"辽宁省","pid":100000,"level":1,"children":[{"id":210100,"name":"沈阳市","pid":210000,"level":2,"children":[{"id":210102,"name":"和平区","pid":210100,"level":3},{"id":210103,"name":"沈河区","pid":210100,"level":3},{"id":210104,"name":"大东区","pid":210100,"level":3},{"id":210105,"name":"皇姑区","pid":210100,"level":3},{"id":210106,"name":"铁西区","pid":210100,"level":3},{"id":210111,"name":"苏家屯区","pid":210100,"level":3},{"id":210112,"name":"浑南区","pid":210100,"level":3},{"id":210113,"name":"沈北新区","pid":210100,"level":3},{"id":210114,"name":"于洪区","pid":210100,"level":3},{"id":210122,"name":"辽中县","pid":210100,"level":3},{"id":210123,"name":"康平县","pid":210100,"level":3},{"id":210124,"name":"法库县","pid":210100,"level":3},{"id":210181,"name":"新民市","pid":210100,"level":3}]},{"id":210200,"name":"大连市","pid":210000,"level":2,"children":[{"id":210202,"name":"中山区","pid":210200,"level":3},{"id":210203,"name":"西岗区","pid":210200,"level":3},{"id":210204,"name":"沙河口区","pid":210200,"level":3},{"id":210211,"name":"甘井子区","pid":210200,"level":3},{"id":210212,"name":"旅顺口区","pid":210200,"level":3},{"id":210213,"name":"金州区","pid":210200,"level":3},{"id":210224,"name":"长海县","pid":210200,"level":3},{"id":210281,"name":"瓦房店市","pid":210200,"level":3},{"id":210282,"name":"普兰店市","pid":210200,"level":3},{"id":210283,"name":"庄河市","pid":210200,"level":3}]},{"id":210300,"name":"鞍山市","pid":210000,"level":2,"children":[{"id":210302,"name":"铁东区","pid":210300,"level":3},{"id":210303,"name":"铁西区","pid":210300,"level":3},{"id":210304,"name":"立山区","pid":210300,"level":3},{"id":210311,"name":"千山区","pid":210300,"level":3},{"id":210321,"name":"台安县","pid":210300,"level":3},{"id":210323,"name":"岫岩满族自治县","pid":210300,"level":3},{"id":210381,"name":"海城市","pid":210300,"level":3}]},{"id":210400,"name":"抚顺市","pid":210000,"level":2,"children":[{"id":210402,"name":"新抚区","pid":210400,"level":3},{"id":210403,"name":"东洲区","pid":210400,"level":3},{"id":210404,"name":"望花区","pid":210400,"level":3},{"id":210411,"name":"顺城区","pid":210400,"level":3},{"id":210421,"name":"抚顺县","pid":210400,"level":3},{"id":210422,"name":"新宾满族自治县","pid":210400,"level":3},{"id":210423,"name":"清原满族自治县","pid":210400,"level":3}]},{"id":210500,"name":"本溪市","pid":210000,"level":2,"children":[{"id":210502,"name":"平山区","pid":210500,"level":3},{"id":210503,"name":"溪湖区","pid":210500,"level":3},{"id":210504,"name":"明山区","pid":210500,"level":3},{"id":210505,"name":"南芬区","pid":210500,"level":3},{"id":210521,"name":"本溪满族自治县","pid":210500,"level":3},{"id":210522,"name":"桓仁满族自治县","pid":210500,"level":3}]},{"id":210600,"name":"丹东市","pid":210000,"level":2,"children":[{"id":210602,"name":"元宝区","pid":210600,"level":3},{"id":210603,"name":"振兴区","pid":210600,"level":3},{"id":210604,"name":"振安区","pid":210600,"level":3},{"id":210624,"name":"宽甸满族自治县","pid":210600,"level":3},{"id":210681,"name":"东港市","pid":210600,"level":3},{"id":210682,"name":"凤城市","pid":210600,"level":3}]},{"id":210700,"name":"锦州市","pid":210000,"level":2,"children":[{"id":210702,"name":"古塔区","pid":210700,"level":3},{"id":210703,"name":"凌河区","pid":210700,"level":3},{"id":210711,"name":"太和区","pid":210700,"level":3},{"id":210726,"name":"黑山县","pid":210700,"level":3},{"id":210727,"name":"义县","pid":210700,"level":3},{"id":210781,"name":"凌海市","pid":210700,"level":3},{"id":210782,"name":"北镇市","pid":210700,"level":3}]},{"id":210800,"name":"营口市","pid":210000,"level":2,"children":[{"id":210802,"name":"站前区","pid":210800,"level":3},{"id":210803,"name":"西市区","pid":210800,"level":3},{"id":210804,"name":"鲅鱼圈区","pid":210800,"level":3},{"id":210811,"name":"老边区","pid":210800,"level":3},{"id":210881,"name":"盖州市","pid":210800,"level":3},{"id":210882,"name":"大石桥市","pid":210800,"level":3}]},{"id":210900,"name":"阜新市","pid":210000,"level":2,"children":[{"id":210902,"name":"海州区","pid":210900,"level":3},{"id":210903,"name":"新邱区","pid":210900,"level":3},{"id":210904,"name":"太平区","pid":210900,"level":3},{"id":210905,"name":"清河门区","pid":210900,"level":3},{"id":210911,"name":"细河区","pid":210900,"level":3},{"id":210921,"name":"阜新蒙古族自治县","pid":210900,"level":3},{"id":210922,"name":"彰武县","pid":210900,"level":3}]},{"id":211000,"name":"辽阳市","pid":210000,"level":2,"children":[{"id":211002,"name":"白塔区","pid":211000,"level":3},{"id":211003,"name":"文圣区","pid":211000,"level":3},{"id":211004,"name":"宏伟区","pid":211000,"level":3},{"id":211005,"name":"弓长岭区","pid":211000,"level":3},{"id":211011,"name":"太子河区","pid":211000,"level":3},{"id":211021,"name":"辽阳县","pid":211000,"level":3},{"id":211081,"name":"灯塔市","pid":211000,"level":3}]},{"id":211100,"name":"盘锦市","pid":210000,"level":2,"children":[{"id":211102,"name":"双台子区","pid":211100,"level":3},{"id":211103,"name":"兴隆台区","pid":211100,"level":3},{"id":211121,"name":"大洼县","pid":211100,"level":3},{"id":211122,"name":"盘山县","pid":211100,"level":3}]},{"id":211200,"name":"铁岭市","pid":210000,"level":2,"children":[{"id":211202,"name":"银州区","pid":211200,"level":3},{"id":211204,"name":"清河区","pid":211200,"level":3},{"id":211221,"name":"铁岭县","pid":211200,"level":3},{"id":211223,"name":"西丰县","pid":211200,"level":3},{"id":211224,"name":"昌图县","pid":211200,"level":3},{"id":211281,"name":"调兵山市","pid":211200,"level":3},{"id":211282,"name":"开原市","pid":211200,"level":3}]},{"id":211300,"name":"朝阳市","pid":210000,"level":2,"children":[{"id":211302,"name":"双塔区","pid":211300,"level":3},{"id":211303,"name":"龙城区","pid":211300,"level":3},{"id":211321,"name":"朝阳县","pid":211300,"level":3},{"id":211322,"name":"建平县","pid":211300,"level":3},{"id":211324,"name":"喀喇沁左翼蒙古族自治县","pid":211300,"level":3},{"id":211381,"name":"北票市","pid":211300,"level":3},{"id":211382,"name":"凌源市","pid":211300,"level":3}]},{"id":211400,"name":"葫芦岛市","pid":210000,"level":2,"children":[{"id":211402,"name":"连山区","pid":211400,"level":3},{"id":211403,"name":"龙港区","pid":211400,"level":3},{"id":211404,"name":"南票区","pid":211400,"level":3},{"id":211421,"name":"绥中县","pid":211400,"level":3},{"id":211422,"name":"建昌县","pid":211400,"level":3},{"id":211481,"name":"兴城市","pid":211400,"level":3}]},{"id":211500,"name":"金普新区","pid":210000,"level":2,"children":[{"id":211501,"name":"金州新区","pid":211500,"level":3},{"id":211502,"name":"普湾新区","pid":211500,"level":3},{"id":211503,"name":"保税区","pid":211500,"level":3}]}]},{"id":220000,"name":"吉林省","pid":100000,"level":1,"children":[{"id":220100,"name":"长春市","pid":220000,"level":2,"children":[{"id":220102,"name":"南关区","pid":220100,"level":3},{"id":220103,"name":"宽城区","pid":220100,"level":3},{"id":220104,"name":"朝阳区","pid":220100,"level":3},{"id":220105,"name":"二道区","pid":220100,"level":3},{"id":220106,"name":"绿园区","pid":220100,"level":3},{"id":220112,"name":"双阳区","pid":220100,"level":3},{"id":220113,"name":"九台区","pid":220100,"level":3},{"id":220122,"name":"农安县","pid":220100,"level":3},{"id":220182,"name":"榆树市","pid":220100,"level":3},{"id":220183,"name":"德惠市","pid":220100,"level":3}]},{"id":220200,"name":"吉林市","pid":220000,"level":2,"children":[{"id":220202,"name":"昌邑区","pid":220200,"level":3},{"id":220203,"name":"龙潭区","pid":220200,"level":3},{"id":220204,"name":"船营区","pid":220200,"level":3},{"id":220211,"name":"丰满区","pid":220200,"level":3},{"id":220221,"name":"永吉县","pid":220200,"level":3},{"id":220281,"name":"蛟河市","pid":220200,"level":3},{"id":220282,"name":"桦甸市","pid":220200,"level":3},{"id":220283,"name":"舒兰市","pid":220200,"level":3},{"id":220284,"name":"磐石市","pid":220200,"level":3}]},{"id":220300,"name":"四平市","pid":220000,"level":2,"children":[{"id":220302,"name":"铁西区","pid":220300,"level":3},{"id":220303,"name":"铁东区","pid":220300,"level":3},{"id":220322,"name":"梨树县","pid":220300,"level":3},{"id":220323,"name":"伊通满族自治县","pid":220300,"level":3},{"id":220381,"name":"公主岭市","pid":220300,"level":3},{"id":220382,"name":"双辽市","pid":220300,"level":3}]},{"id":220400,"name":"辽源市","pid":220000,"level":2,"children":[{"id":220402,"name":"龙山区","pid":220400,"level":3},{"id":220403,"name":"西安区","pid":220400,"level":3},{"id":220421,"name":"东丰县","pid":220400,"level":3},{"id":220422,"name":"东辽县","pid":220400,"level":3}]},{"id":220500,"name":"通化市","pid":220000,"level":2,"children":[{"id":220502,"name":"东昌区","pid":220500,"level":3},{"id":220503,"name":"二道江区","pid":220500,"level":3},{"id":220521,"name":"通化县","pid":220500,"level":3},{"id":220523,"name":"辉南县","pid":220500,"level":3},{"id":220524,"name":"柳河县","pid":220500,"level":3},{"id":220581,"name":"梅河口市","pid":220500,"level":3},{"id":220582,"name":"集安市","pid":220500,"level":3}]},{"id":220600,"name":"白山市","pid":220000,"level":2,"children":[{"id":220602,"name":"浑江区","pid":220600,"level":3},{"id":220605,"name":"江源区","pid":220600,"level":3},{"id":220621,"name":"抚松县","pid":220600,"level":3},{"id":220622,"name":"靖宇县","pid":220600,"level":3},{"id":220623,"name":"长白朝鲜族自治县","pid":220600,"level":3},{"id":220681,"name":"临江市","pid":220600,"level":3}]},{"id":220700,"name":"松原市","pid":220000,"level":2,"children":[{"id":220702,"name":"宁江区","pid":220700,"level":3},{"id":220721,"name":"前郭尔罗斯蒙古族自治县","pid":220700,"level":3},{"id":220722,"name":"长岭县","pid":220700,"level":3},{"id":220723,"name":"乾安县","pid":220700,"level":3},{"id":220781,"name":"扶余市","pid":220700,"level":3}]},{"id":220800,"name":"白城市","pid":220000,"level":2,"children":[{"id":220802,"name":"洮北区","pid":220800,"level":3},{"id":220821,"name":"镇赉县","pid":220800,"level":3},{"id":220822,"name":"通榆县","pid":220800,"level":3},{"id":220881,"name":"洮南市","pid":220800,"level":3},{"id":220882,"name":"大安市","pid":220800,"level":3}]},{"id":222400,"name":"延边朝鲜族自治州","pid":220000,"level":2,"children":[{"id":222401,"name":"延吉市","pid":222400,"level":3},{"id":222402,"name":"图们市","pid":222400,"level":3},{"id":222403,"name":"敦化市","pid":222400,"level":3},{"id":222404,"name":"珲春市","pid":222400,"level":3},{"id":222405,"name":"龙井市","pid":222400,"level":3},{"id":222406,"name":"和龙市","pid":222400,"level":3},{"id":222424,"name":"汪清县","pid":222400,"level":3},{"id":222426,"name":"安图县","pid":222400,"level":3}]}]},{"id":230000,"name":"黑龙江省","pid":100000,"level":1,"children":[{"id":230100,"name":"哈尔滨市","pid":230000,"level":2,"children":[{"id":230102,"name":"道里区","pid":230100,"level":3},{"id":230103,"name":"南岗区","pid":230100,"level":3},{"id":230104,"name":"道外区","pid":230100,"level":3},{"id":230108,"name":"平房区","pid":230100,"level":3},{"id":230109,"name":"松北区","pid":230100,"level":3},{"id":230110,"name":"香坊区","pid":230100,"level":3},{"id":230111,"name":"呼兰区","pid":230100,"level":3},{"id":230112,"name":"阿城区","pid":230100,"level":3},{"id":230113,"name":"双城区","pid":230100,"level":3},{"id":230123,"name":"依兰县","pid":230100,"level":3},{"id":230124,"name":"方正县","pid":230100,"level":3},{"id":230125,"name":"宾县","pid":230100,"level":3},{"id":230126,"name":"巴彦县","pid":230100,"level":3},{"id":230127,"name":"木兰县","pid":230100,"level":3},{"id":230128,"name":"通河县","pid":230100,"level":3},{"id":230129,"name":"延寿县","pid":230100,"level":3},{"id":230183,"name":"尚志市","pid":230100,"level":3},{"id":230184,"name":"五常市","pid":230100,"level":3}]},{"id":230200,"name":"齐齐哈尔市","pid":230000,"level":2,"children":[{"id":230202,"name":"龙沙区","pid":230200,"level":3},{"id":230203,"name":"建华区","pid":230200,"level":3},{"id":230204,"name":"铁锋区","pid":230200,"level":3},{"id":230205,"name":"昂昂溪区","pid":230200,"level":3},{"id":230206,"name":"富拉尔基区","pid":230200,"level":3},{"id":230207,"name":"碾子山区","pid":230200,"level":3},{"id":230208,"name":"梅里斯达斡尔族区","pid":230200,"level":3},{"id":230221,"name":"龙江县","pid":230200,"level":3},{"id":230223,"name":"依安县","pid":230200,"level":3},{"id":230224,"name":"泰来县","pid":230200,"level":3},{"id":230225,"name":"甘南县","pid":230200,"level":3},{"id":230227,"name":"富裕县","pid":230200,"level":3},{"id":230229,"name":"克山县","pid":230200,"level":3},{"id":230230,"name":"克东县","pid":230200,"level":3},{"id":230231,"name":"拜泉县","pid":230200,"level":3},{"id":230281,"name":"讷河市","pid":230200,"level":3}]},{"id":230300,"name":"鸡西市","pid":230000,"level":2,"children":[{"id":230302,"name":"鸡冠区","pid":230300,"level":3},{"id":230303,"name":"恒山区","pid":230300,"level":3},{"id":230304,"name":"滴道区","pid":230300,"level":3},{"id":230305,"name":"梨树区","pid":230300,"level":3},{"id":230306,"name":"城子河区","pid":230300,"level":3},{"id":230307,"name":"麻山区","pid":230300,"level":3},{"id":230321,"name":"鸡东县","pid":230300,"level":3},{"id":230381,"name":"虎林市","pid":230300,"level":3},{"id":230382,"name":"密山市","pid":230300,"level":3}]},{"id":230400,"name":"鹤岗市","pid":230000,"level":2,"children":[{"id":230402,"name":"向阳区","pid":230400,"level":3},{"id":230403,"name":"工农区","pid":230400,"level":3},{"id":230404,"name":"南山区","pid":230400,"level":3},{"id":230405,"name":"兴安区","pid":230400,"level":3},{"id":230406,"name":"东山区","pid":230400,"level":3},{"id":230407,"name":"兴山区","pid":230400,"level":3},{"id":230421,"name":"萝北县","pid":230400,"level":3},{"id":230422,"name":"绥滨县","pid":230400,"level":3}]},{"id":230500,"name":"双鸭山市","pid":230000,"level":2,"children":[{"id":230502,"name":"尖山区","pid":230500,"level":3},{"id":230503,"name":"岭东区","pid":230500,"level":3},{"id":230505,"name":"四方台区","pid":230500,"level":3},{"id":230506,"name":"宝山区","pid":230500,"level":3},{"id":230521,"name":"集贤县","pid":230500,"level":3},{"id":230522,"name":"友谊县","pid":230500,"level":3},{"id":230523,"name":"宝清县","pid":230500,"level":3},{"id":230524,"name":"饶河县","pid":230500,"level":3}]},{"id":230600,"name":"大庆市","pid":230000,"level":2,"children":[{"id":230602,"name":"萨尔图区","pid":230600,"level":3},{"id":230603,"name":"龙凤区","pid":230600,"level":3},{"id":230604,"name":"让胡路区","pid":230600,"level":3},{"id":230605,"name":"红岗区","pid":230600,"level":3},{"id":230606,"name":"大同区","pid":230600,"level":3},{"id":230621,"name":"肇州县","pid":230600,"level":3},{"id":230622,"name":"肇源县","pid":230600,"level":3},{"id":230623,"name":"林甸县","pid":230600,"level":3},{"id":230624,"name":"杜尔伯特蒙古族自治县","pid":230600,"level":3}]},{"id":230700,"name":"伊春市","pid":230000,"level":2,"children":[{"id":230702,"name":"伊春区","pid":230700,"level":3},{"id":230703,"name":"南岔区","pid":230700,"level":3},{"id":230704,"name":"友好区","pid":230700,"level":3},{"id":230705,"name":"西林区","pid":230700,"level":3},{"id":230706,"name":"翠峦区","pid":230700,"level":3},{"id":230707,"name":"新青区","pid":230700,"level":3},{"id":230708,"name":"美溪区","pid":230700,"level":3},{"id":230709,"name":"金山屯区","pid":230700,"level":3},{"id":230710,"name":"五营区","pid":230700,"level":3},{"id":230711,"name":"乌马河区","pid":230700,"level":3},{"id":230712,"name":"汤旺河区","pid":230700,"level":3},{"id":230713,"name":"带岭区","pid":230700,"level":3},{"id":230714,"name":"乌伊岭区","pid":230700,"level":3},{"id":230715,"name":"红星区","pid":230700,"level":3},{"id":230716,"name":"上甘岭区","pid":230700,"level":3},{"id":230722,"name":"嘉荫县","pid":230700,"level":3},{"id":230781,"name":"铁力市","pid":230700,"level":3}]},{"id":230800,"name":"佳木斯市","pid":230000,"level":2,"children":[{"id":230803,"name":"向阳区","pid":230800,"level":3},{"id":230804,"name":"前进区","pid":230800,"level":3},{"id":230805,"name":"东风区","pid":230800,"level":3},{"id":230811,"name":"郊区","pid":230800,"level":3},{"id":230822,"name":"桦南县","pid":230800,"level":3},{"id":230826,"name":"桦川县","pid":230800,"level":3},{"id":230828,"name":"汤原县","pid":230800,"level":3},{"id":230833,"name":"抚远县","pid":230800,"level":3},{"id":230881,"name":"同江市","pid":230800,"level":3},{"id":230882,"name":"富锦市","pid":230800,"level":3}]},{"id":230900,"name":"七台河市","pid":230000,"level":2,"children":[{"id":230902,"name":"新兴区","pid":230900,"level":3},{"id":230903,"name":"桃山区","pid":230900,"level":3},{"id":230904,"name":"茄子河区","pid":230900,"level":3},{"id":230921,"name":"勃利县","pid":230900,"level":3}]},{"id":231000,"name":"牡丹江市","pid":230000,"level":2,"children":[{"id":231002,"name":"东安区","pid":231000,"level":3},{"id":231003,"name":"阳明区","pid":231000,"level":3},{"id":231004,"name":"爱民区","pid":231000,"level":3},{"id":231005,"name":"西安区","pid":231000,"level":3},{"id":231024,"name":"东宁县","pid":231000,"level":3},{"id":231025,"name":"林口县","pid":231000,"level":3},{"id":231081,"name":"绥芬河市","pid":231000,"level":3},{"id":231083,"name":"海林市","pid":231000,"level":3},{"id":231084,"name":"宁安市","pid":231000,"level":3},{"id":231085,"name":"穆棱市","pid":231000,"level":3}]},{"id":231100,"name":"黑河市","pid":230000,"level":2,"children":[{"id":231102,"name":"爱辉区","pid":231100,"level":3},{"id":231121,"name":"嫩江县","pid":231100,"level":3},{"id":231123,"name":"逊克县","pid":231100,"level":3},{"id":231124,"name":"孙吴县","pid":231100,"level":3},{"id":231181,"name":"北安市","pid":231100,"level":3},{"id":231182,"name":"五大连池市","pid":231100,"level":3}]},{"id":231200,"name":"绥化市","pid":230000,"level":2,"children":[{"id":231202,"name":"北林区","pid":231200,"level":3},{"id":231221,"name":"望奎县","pid":231200,"level":3},{"id":231222,"name":"兰西县","pid":231200,"level":3},{"id":231223,"name":"青冈县","pid":231200,"level":3},{"id":231224,"name":"庆安县","pid":231200,"level":3},{"id":231225,"name":"明水县","pid":231200,"level":3},{"id":231226,"name":"绥棱县","pid":231200,"level":3},{"id":231281,"name":"安达市","pid":231200,"level":3},{"id":231282,"name":"肇东市","pid":231200,"level":3},{"id":231283,"name":"海伦市","pid":231200,"level":3}]},{"id":232700,"name":"大兴安岭地区","pid":230000,"level":2,"children":[{"id":232701,"name":"加格达奇区","pid":232700,"level":3},{"id":232702,"name":"新林区","pid":232700,"level":3},{"id":232703,"name":"松岭区","pid":232700,"level":3},{"id":232704,"name":"呼中区","pid":232700,"level":3},{"id":232721,"name":"呼玛县","pid":232700,"level":3},{"id":232722,"name":"塔河县","pid":232700,"level":3},{"id":232723,"name":"漠河县","pid":232700,"level":3}]}]},{"id":310000,"name":"上海市","pid":100000,"level":1,"children":[{"id":310100,"name":"上海市","pid":310000,"level":2,"children":[{"id":310101,"name":"黄浦区","pid":310100,"level":3},{"id":310104,"name":"徐汇区","pid":310100,"level":3},{"id":310105,"name":"长宁区","pid":310100,"level":3},{"id":310106,"name":"静安区","pid":310100,"level":3},{"id":310107,"name":"普陀区","pid":310100,"level":3},{"id":310108,"name":"闸北区","pid":310100,"level":3},{"id":310109,"name":"虹口区","pid":310100,"level":3},{"id":310110,"name":"杨浦区","pid":310100,"level":3},{"id":310112,"name":"闵行区","pid":310100,"level":3},{"id":310113,"name":"宝山区","pid":310100,"level":3},{"id":310114,"name":"嘉定区","pid":310100,"level":3},{"id":310115,"name":"浦东新区","pid":310100,"level":3},{"id":310116,"name":"金山区","pid":310100,"level":3},{"id":310117,"name":"松江区","pid":310100,"level":3},{"id":310118,"name":"青浦区","pid":310100,"level":3},{"id":310120,"name":"奉贤区","pid":310100,"level":3},{"id":310230,"name":"崇明县","pid":310100,"level":3}]}]},{"id":320000,"name":"江苏省","pid":100000,"level":1,"children":[{"id":320100,"name":"南京市","pid":320000,"level":2,"children":[{"id":320102,"name":"玄武区","pid":320100,"level":3},{"id":320104,"name":"秦淮区","pid":320100,"level":3},{"id":320105,"name":"建邺区","pid":320100,"level":3},{"id":320106,"name":"鼓楼区","pid":320100,"level":3},{"id":320111,"name":"浦口区","pid":320100,"level":3},{"id":320113,"name":"栖霞区","pid":320100,"level":3},{"id":320114,"name":"雨花台区","pid":320100,"level":3},{"id":320115,"name":"江宁区","pid":320100,"level":3},{"id":320116,"name":"六合区","pid":320100,"level":3},{"id":320117,"name":"溧水区","pid":320100,"level":3},{"id":320118,"name":"高淳区","pid":320100,"level":3}]},{"id":320200,"name":"无锡市","pid":320000,"level":2,"children":[{"id":320202,"name":"崇安区","pid":320200,"level":3},{"id":320203,"name":"南长区","pid":320200,"level":3},{"id":320204,"name":"北塘区","pid":320200,"level":3},{"id":320205,"name":"锡山区","pid":320200,"level":3},{"id":320206,"name":"惠山区","pid":320200,"level":3},{"id":320211,"name":"滨湖区","pid":320200,"level":3},{"id":320281,"name":"江阴市","pid":320200,"level":3},{"id":320282,"name":"宜兴市","pid":320200,"level":3}]},{"id":320300,"name":"徐州市","pid":320000,"level":2,"children":[{"id":320302,"name":"鼓楼区","pid":320300,"level":3},{"id":320303,"name":"云龙区","pid":320300,"level":3},{"id":320305,"name":"贾汪区","pid":320300,"level":3},{"id":320311,"name":"泉山区","pid":320300,"level":3},{"id":320312,"name":"铜山区","pid":320300,"level":3},{"id":320321,"name":"丰县","pid":320300,"level":3},{"id":320322,"name":"沛县","pid":320300,"level":3},{"id":320324,"name":"睢宁县","pid":320300,"level":3},{"id":320381,"name":"新沂市","pid":320300,"level":3},{"id":320382,"name":"邳州市","pid":320300,"level":3}]},{"id":320400,"name":"常州市","pid":320000,"level":2,"children":[{"id":320402,"name":"天宁区","pid":320400,"level":3},{"id":320404,"name":"钟楼区","pid":320400,"level":3},{"id":320405,"name":"戚墅堰区","pid":320400,"level":3},{"id":320411,"name":"新北区","pid":320400,"level":3},{"id":320412,"name":"武进区","pid":320400,"level":3},{"id":320481,"name":"溧阳市","pid":320400,"level":3},{"id":320482,"name":"金坛市","pid":320400,"level":3}]},{"id":320500,"name":"苏州市","pid":320000,"level":2,"children":[{"id":320505,"name":"虎丘区","pid":320500,"level":3},{"id":320506,"name":"吴中区","pid":320500,"level":3},{"id":320507,"name":"相城区","pid":320500,"level":3},{"id":320508,"name":"姑苏区","pid":320500,"level":3},{"id":320509,"name":"吴江区","pid":320500,"level":3},{"id":320581,"name":"常熟市","pid":320500,"level":3},{"id":320582,"name":"张家港市","pid":320500,"level":3},{"id":320583,"name":"昆山市","pid":320500,"level":3},{"id":320585,"name":"太仓市","pid":320500,"level":3}]},{"id":320600,"name":"南通市","pid":320000,"level":2,"children":[{"id":320602,"name":"崇川区","pid":320600,"level":3},{"id":320611,"name":"港闸区","pid":320600,"level":3},{"id":320612,"name":"通州区","pid":320600,"level":3},{"id":320621,"name":"海安县","pid":320600,"level":3},{"id":320623,"name":"如东县","pid":320600,"level":3},{"id":320681,"name":"启东市","pid":320600,"level":3},{"id":320682,"name":"如皋市","pid":320600,"level":3},{"id":320684,"name":"海门市","pid":320600,"level":3}]},{"id":320700,"name":"连云港市","pid":320000,"level":2,"children":[{"id":320703,"name":"连云区","pid":320700,"level":3},{"id":320706,"name":"海州区","pid":320700,"level":3},{"id":320707,"name":"赣榆区","pid":320700,"level":3},{"id":320722,"name":"东海县","pid":320700,"level":3},{"id":320723,"name":"灌云县","pid":320700,"level":3},{"id":320724,"name":"灌南县","pid":320700,"level":3}]},{"id":320800,"name":"淮安市","pid":320000,"level":2,"children":[{"id":320802,"name":"清河区","pid":320800,"level":3},{"id":320803,"name":"淮安区","pid":320800,"level":3},{"id":320804,"name":"淮阴区","pid":320800,"level":3},{"id":320811,"name":"清浦区","pid":320800,"level":3},{"id":320826,"name":"涟水县","pid":320800,"level":3},{"id":320829,"name":"洪泽县","pid":320800,"level":3},{"id":320830,"name":"盱眙县","pid":320800,"level":3},{"id":320831,"name":"金湖县","pid":320800,"level":3}]},{"id":320900,"name":"盐城市","pid":320000,"level":2,"children":[{"id":320902,"name":"亭湖区","pid":320900,"level":3},{"id":320903,"name":"盐都区","pid":320900,"level":3},{"id":320921,"name":"响水县","pid":320900,"level":3},{"id":320922,"name":"滨海县","pid":320900,"level":3},{"id":320923,"name":"阜宁县","pid":320900,"level":3},{"id":320924,"name":"射阳县","pid":320900,"level":3},{"id":320925,"name":"建湖县","pid":320900,"level":3},{"id":320981,"name":"东台市","pid":320900,"level":3},{"id":320982,"name":"大丰市","pid":320900,"level":3}]},{"id":321000,"name":"扬州市","pid":320000,"level":2,"children":[{"id":321002,"name":"广陵区","pid":321000,"level":3},{"id":321003,"name":"邗江区","pid":321000,"level":3},{"id":321012,"name":"江都区","pid":321000,"level":3},{"id":321023,"name":"宝应县","pid":321000,"level":3},{"id":321081,"name":"仪征市","pid":321000,"level":3},{"id":321084,"name":"高邮市","pid":321000,"level":3}]},{"id":321100,"name":"镇江市","pid":320000,"level":2,"children":[{"id":321102,"name":"京口区","pid":321100,"level":3},{"id":321111,"name":"润州区","pid":321100,"level":3},{"id":321112,"name":"丹徒区","pid":321100,"level":3},{"id":321181,"name":"丹阳市","pid":321100,"level":3},{"id":321182,"name":"扬中市","pid":321100,"level":3},{"id":321183,"name":"句容市","pid":321100,"level":3}]},{"id":321200,"name":"泰州市","pid":320000,"level":2,"children":[{"id":321202,"name":"海陵区","pid":321200,"level":3},{"id":321203,"name":"高港区","pid":321200,"level":3},{"id":321204,"name":"姜堰区","pid":321200,"level":3},{"id":321281,"name":"兴化市","pid":321200,"level":3},{"id":321282,"name":"靖江市","pid":321200,"level":3},{"id":321283,"name":"泰兴市","pid":321200,"level":3}]},{"id":321300,"name":"宿迁市","pid":320000,"level":2,"children":[{"id":321302,"name":"宿城区","pid":321300,"level":3},{"id":321311,"name":"宿豫区","pid":321300,"level":3},{"id":321322,"name":"沭阳县","pid":321300,"level":3},{"id":321323,"name":"泗阳县","pid":321300,"level":3},{"id":321324,"name":"泗洪县","pid":321300,"level":3}]}]},{"id":330000,"name":"浙江省","pid":100000,"level":1,"children":[{"id":330100,"name":"杭州市","pid":330000,"level":2,"children":[{"id":330102,"name":"上城区","pid":330100,"level":3},{"id":330103,"name":"下城区","pid":330100,"level":3},{"id":330104,"name":"江干区","pid":330100,"level":3},{"id":330105,"name":"拱墅区","pid":330100,"level":3},{"id":330106,"name":"西湖区","pid":330100,"level":3},{"id":330108,"name":"滨江区","pid":330100,"level":3},{"id":330109,"name":"萧山区","pid":330100,"level":3},{"id":330110,"name":"余杭区","pid":330100,"level":3},{"id":330122,"name":"桐庐县","pid":330100,"level":3},{"id":330127,"name":"淳安县","pid":330100,"level":3},{"id":330182,"name":"建德市","pid":330100,"level":3},{"id":330183,"name":"富阳区","pid":330100,"level":3},{"id":330185,"name":"临安市","pid":330100,"level":3}]},{"id":330200,"name":"宁波市","pid":330000,"level":2,"children":[{"id":330203,"name":"海曙区","pid":330200,"level":3},{"id":330204,"name":"江东区","pid":330200,"level":3},{"id":330205,"name":"江北区","pid":330200,"level":3},{"id":330206,"name":"北仑区","pid":330200,"level":3},{"id":330211,"name":"镇海区","pid":330200,"level":3},{"id":330212,"name":"鄞州区","pid":330200,"level":3},{"id":330225,"name":"象山县","pid":330200,"level":3},{"id":330226,"name":"宁海县","pid":330200,"level":3},{"id":330281,"name":"余姚市","pid":330200,"level":3},{"id":330282,"name":"慈溪市","pid":330200,"level":3},{"id":330283,"name":"奉化市","pid":330200,"level":3}]},{"id":330300,"name":"温州市","pid":330000,"level":2,"children":[{"id":330302,"name":"鹿城区","pid":330300,"level":3},{"id":330303,"name":"龙湾区","pid":330300,"level":3},{"id":330304,"name":"瓯海区","pid":330300,"level":3},{"id":330322,"name":"洞头县","pid":330300,"level":3},{"id":330324,"name":"永嘉县","pid":330300,"level":3},{"id":330326,"name":"平阳县","pid":330300,"level":3},{"id":330327,"name":"苍南县","pid":330300,"level":3},{"id":330328,"name":"文成县","pid":330300,"level":3},{"id":330329,"name":"泰顺县","pid":330300,"level":3},{"id":330381,"name":"瑞安市","pid":330300,"level":3},{"id":330382,"name":"乐清市","pid":330300,"level":3}]},{"id":330400,"name":"嘉兴市","pid":330000,"level":2,"children":[{"id":330402,"name":"南湖区","pid":330400,"level":3},{"id":330411,"name":"秀洲区","pid":330400,"level":3},{"id":330421,"name":"嘉善县","pid":330400,"level":3},{"id":330424,"name":"海盐县","pid":330400,"level":3},{"id":330481,"name":"海宁市","pid":330400,"level":3},{"id":330482,"name":"平湖市","pid":330400,"level":3},{"id":330483,"name":"桐乡市","pid":330400,"level":3}]},{"id":330500,"name":"湖州市","pid":330000,"level":2,"children":[{"id":330502,"name":"吴兴区","pid":330500,"level":3},{"id":330503,"name":"南浔区","pid":330500,"level":3},{"id":330521,"name":"德清县","pid":330500,"level":3},{"id":330522,"name":"长兴县","pid":330500,"level":3},{"id":330523,"name":"安吉县","pid":330500,"level":3}]},{"id":330600,"name":"绍兴市","pid":330000,"level":2,"children":[{"id":330602,"name":"越城区","pid":330600,"level":3},{"id":330603,"name":"柯桥区","pid":330600,"level":3},{"id":330604,"name":"上虞区","pid":330600,"level":3},{"id":330624,"name":"新昌县","pid":330600,"level":3},{"id":330681,"name":"诸暨市","pid":330600,"level":3},{"id":330683,"name":"嵊州市","pid":330600,"level":3}]},{"id":330700,"name":"金华市","pid":330000,"level":2,"children":[{"id":330702,"name":"婺城区","pid":330700,"level":3},{"id":330703,"name":"金东区","pid":330700,"level":3},{"id":330723,"name":"武义县","pid":330700,"level":3},{"id":330726,"name":"浦江县","pid":330700,"level":3},{"id":330727,"name":"磐安县","pid":330700,"level":3},{"id":330781,"name":"兰溪市","pid":330700,"level":3},{"id":330782,"name":"义乌市","pid":330700,"level":3},{"id":330783,"name":"东阳市","pid":330700,"level":3},{"id":330784,"name":"永康市","pid":330700,"level":3}]},{"id":330800,"name":"衢州市","pid":330000,"level":2,"children":[{"id":330802,"name":"柯城区","pid":330800,"level":3},{"id":330803,"name":"衢江区","pid":330800,"level":3},{"id":330822,"name":"常山县","pid":330800,"level":3},{"id":330824,"name":"开化县","pid":330800,"level":3},{"id":330825,"name":"龙游县","pid":330800,"level":3},{"id":330881,"name":"江山市","pid":330800,"level":3}]},{"id":330900,"name":"舟山市","pid":330000,"level":2,"children":[{"id":330902,"name":"定海区","pid":330900,"level":3},{"id":330903,"name":"普陀区","pid":330900,"level":3},{"id":330921,"name":"岱山县","pid":330900,"level":3},{"id":330922,"name":"嵊泗县","pid":330900,"level":3}]},{"id":331000,"name":"台州市","pid":330000,"level":2,"children":[{"id":331002,"name":"椒江区","pid":331000,"level":3},{"id":331003,"name":"黄岩区","pid":331000,"level":3},{"id":331004,"name":"路桥区","pid":331000,"level":3},{"id":331021,"name":"玉环县","pid":331000,"level":3},{"id":331022,"name":"三门县","pid":331000,"level":3},{"id":331023,"name":"天台县","pid":331000,"level":3},{"id":331024,"name":"仙居县","pid":331000,"level":3},{"id":331081,"name":"温岭市","pid":331000,"level":3},{"id":331082,"name":"临海市","pid":331000,"level":3}]},{"id":331100,"name":"丽水市","pid":330000,"level":2,"children":[{"id":331102,"name":"莲都区","pid":331100,"level":3},{"id":331121,"name":"青田县","pid":331100,"level":3},{"id":331122,"name":"缙云县","pid":331100,"level":3},{"id":331123,"name":"遂昌县","pid":331100,"level":3},{"id":331124,"name":"松阳县","pid":331100,"level":3},{"id":331125,"name":"云和县","pid":331100,"level":3},{"id":331126,"name":"庆元县","pid":331100,"level":3},{"id":331127,"name":"景宁畲族自治县","pid":331100,"level":3},{"id":331181,"name":"龙泉市","pid":331100,"level":3}]},{"id":331200,"name":"舟山群岛新区","pid":330000,"level":2,"children":[{"id":331201,"name":"金塘岛","pid":331200,"level":3},{"id":331202,"name":"六横岛","pid":331200,"level":3},{"id":331203,"name":"衢山岛","pid":331200,"level":3},{"id":331204,"name":"舟山本岛西北部","pid":331200,"level":3},{"id":331205,"name":"岱山岛西南部","pid":331200,"level":3},{"id":331206,"name":"泗礁岛","pid":331200,"level":3},{"id":331207,"name":"朱家尖岛","pid":331200,"level":3},{"id":331208,"name":"洋山岛","pid":331200,"level":3},{"id":331209,"name":"长涂岛","pid":331200,"level":3},{"id":331210,"name":"虾峙岛","pid":331200,"level":3}]}]},{"id":340000,"name":"安徽省","pid":100000,"level":1,"children":[{"id":340100,"name":"合肥市","pid":340000,"level":2,"children":[{"id":340102,"name":"瑶海区","pid":340100,"level":3},{"id":340103,"name":"庐阳区","pid":340100,"level":3},{"id":340104,"name":"蜀山区","pid":340100,"level":3},{"id":340111,"name":"包河区","pid":340100,"level":3},{"id":340121,"name":"长丰县","pid":340100,"level":3},{"id":340122,"name":"肥东县","pid":340100,"level":3},{"id":340123,"name":"肥西县","pid":340100,"level":3},{"id":340124,"name":"庐江县","pid":340100,"level":3},{"id":340181,"name":"巢湖市","pid":340100,"level":3}]},{"id":340200,"name":"芜湖市","pid":340000,"level":2,"children":[{"id":340202,"name":"镜湖区","pid":340200,"level":3},{"id":340203,"name":"弋江区","pid":340200,"level":3},{"id":340207,"name":"鸠江区","pid":340200,"level":3},{"id":340208,"name":"三山区","pid":340200,"level":3},{"id":340221,"name":"芜湖县","pid":340200,"level":3},{"id":340222,"name":"繁昌县","pid":340200,"level":3},{"id":340223,"name":"南陵县","pid":340200,"level":3},{"id":340225,"name":"无为县","pid":340200,"level":3}]},{"id":340300,"name":"蚌埠市","pid":340000,"level":2,"children":[{"id":340302,"name":"龙子湖区","pid":340300,"level":3},{"id":340303,"name":"蚌山区","pid":340300,"level":3},{"id":340304,"name":"禹会区","pid":340300,"level":3},{"id":340311,"name":"淮上区","pid":340300,"level":3},{"id":340321,"name":"怀远县","pid":340300,"level":3},{"id":340322,"name":"五河县","pid":340300,"level":3},{"id":340323,"name":"固镇县","pid":340300,"level":3}]},{"id":340400,"name":"淮南市","pid":340000,"level":2,"children":[{"id":340402,"name":"大通区","pid":340400,"level":3},{"id":340403,"name":"田家庵区","pid":340400,"level":3},{"id":340404,"name":"谢家集区","pid":340400,"level":3},{"id":340405,"name":"八公山区","pid":340400,"level":3},{"id":340406,"name":"潘集区","pid":340400,"level":3},{"id":340421,"name":"凤台县","pid":340400,"level":3}]},{"id":340500,"name":"马鞍山市","pid":340000,"level":2,"children":[{"id":340503,"name":"花山区","pid":340500,"level":3},{"id":340504,"name":"雨山区","pid":340500,"level":3},{"id":340506,"name":"博望区","pid":340500,"level":3},{"id":340521,"name":"当涂县","pid":340500,"level":3},{"id":340522,"name":"含山县","pid":340500,"level":3},{"id":340523,"name":"和县","pid":340500,"level":3}]},{"id":340600,"name":"淮北市","pid":340000,"level":2,"children":[{"id":340602,"name":"杜集区","pid":340600,"level":3},{"id":340603,"name":"相山区","pid":340600,"level":3},{"id":340604,"name":"烈山区","pid":340600,"level":3},{"id":340621,"name":"濉溪县","pid":340600,"level":3}]},{"id":340700,"name":"铜陵市","pid":340000,"level":2,"children":[{"id":340702,"name":"铜官山区","pid":340700,"level":3},{"id":340703,"name":"狮子山区","pid":340700,"level":3},{"id":340711,"name":"郊区","pid":340700,"level":3},{"id":340721,"name":"铜陵县","pid":340700,"level":3}]},{"id":340800,"name":"安庆市","pid":340000,"level":2,"children":[{"id":340802,"name":"迎江区","pid":340800,"level":3},{"id":340803,"name":"大观区","pid":340800,"level":3},{"id":340811,"name":"宜秀区","pid":340800,"level":3},{"id":340822,"name":"怀宁县","pid":340800,"level":3},{"id":340823,"name":"枞阳县","pid":340800,"level":3},{"id":340824,"name":"潜山县","pid":340800,"level":3},{"id":340825,"name":"太湖县","pid":340800,"level":3},{"id":340826,"name":"宿松县","pid":340800,"level":3},{"id":340827,"name":"望江县","pid":340800,"level":3},{"id":340828,"name":"岳西县","pid":340800,"level":3},{"id":340881,"name":"桐城市","pid":340800,"level":3}]},{"id":341000,"name":"黄山市","pid":340000,"level":2,"children":[{"id":341002,"name":"屯溪区","pid":341000,"level":3},{"id":341003,"name":"黄山区","pid":341000,"level":3},{"id":341004,"name":"徽州区","pid":341000,"level":3},{"id":341021,"name":"歙县","pid":341000,"level":3},{"id":341022,"name":"休宁县","pid":341000,"level":3},{"id":341023,"name":"黟县","pid":341000,"level":3},{"id":341024,"name":"祁门县","pid":341000,"level":3}]},{"id":341100,"name":"滁州市","pid":340000,"level":2,"children":[{"id":341102,"name":"琅琊区","pid":341100,"level":3},{"id":341103,"name":"南谯区","pid":341100,"level":3},{"id":341122,"name":"来安县","pid":341100,"level":3},{"id":341124,"name":"全椒县","pid":341100,"level":3},{"id":341125,"name":"定远县","pid":341100,"level":3},{"id":341126,"name":"凤阳县","pid":341100,"level":3},{"id":341181,"name":"天长市","pid":341100,"level":3},{"id":341182,"name":"明光市","pid":341100,"level":3}]},{"id":341200,"name":"阜阳市","pid":340000,"level":2,"children":[{"id":341202,"name":"颍州区","pid":341200,"level":3},{"id":341203,"name":"颍东区","pid":341200,"level":3},{"id":341204,"name":"颍泉区","pid":341200,"level":3},{"id":341221,"name":"临泉县","pid":341200,"level":3},{"id":341222,"name":"太和县","pid":341200,"level":3},{"id":341225,"name":"阜南县","pid":341200,"level":3},{"id":341226,"name":"颍上县","pid":341200,"level":3},{"id":341282,"name":"界首市","pid":341200,"level":3}]},{"id":341300,"name":"宿州市","pid":340000,"level":2,"children":[{"id":341302,"name":"埇桥区","pid":341300,"level":3},{"id":341321,"name":"砀山县","pid":341300,"level":3},{"id":341322,"name":"萧县","pid":341300,"level":3},{"id":341323,"name":"灵璧县","pid":341300,"level":3},{"id":341324,"name":"泗县","pid":341300,"level":3}]},{"id":341500,"name":"六安市","pid":340000,"level":2,"children":[{"id":341502,"name":"金安区","pid":341500,"level":3},{"id":341503,"name":"裕安区","pid":341500,"level":3},{"id":341521,"name":"寿县","pid":341500,"level":3},{"id":341522,"name":"霍邱县","pid":341500,"level":3},{"id":341523,"name":"舒城县","pid":341500,"level":3},{"id":341524,"name":"金寨县","pid":341500,"level":3},{"id":341525,"name":"霍山县","pid":341500,"level":3}]},{"id":341600,"name":"亳州市","pid":340000,"level":2,"children":[{"id":341602,"name":"谯城区","pid":341600,"level":3},{"id":341621,"name":"涡阳县","pid":341600,"level":3},{"id":341622,"name":"蒙城县","pid":341600,"level":3},{"id":341623,"name":"利辛县","pid":341600,"level":3}]},{"id":341700,"name":"池州市","pid":340000,"level":2,"children":[{"id":341702,"name":"贵池区","pid":341700,"level":3},{"id":341721,"name":"东至县","pid":341700,"level":3},{"id":341722,"name":"石台县","pid":341700,"level":3},{"id":341723,"name":"青阳县","pid":341700,"level":3}]},{"id":341800,"name":"宣城市","pid":340000,"level":2,"children":[{"id":341802,"name":"宣州区","pid":341800,"level":3},{"id":341821,"name":"郎溪县","pid":341800,"level":3},{"id":341822,"name":"广德县","pid":341800,"level":3},{"id":341823,"name":"泾县","pid":341800,"level":3},{"id":341824,"name":"绩溪县","pid":341800,"level":3},{"id":341825,"name":"旌德县","pid":341800,"level":3},{"id":341881,"name":"宁国市","pid":341800,"level":3}]}]},{"id":350000,"name":"福建省","pid":100000,"level":1,"children":[{"id":350100,"name":"福州市","pid":350000,"level":2,"children":[{"id":350102,"name":"鼓楼区","pid":350100,"level":3},{"id":350103,"name":"台江区","pid":350100,"level":3},{"id":350104,"name":"仓山区","pid":350100,"level":3},{"id":350105,"name":"马尾区","pid":350100,"level":3},{"id":350111,"name":"晋安区","pid":350100,"level":3},{"id":350121,"name":"闽侯县","pid":350100,"level":3},{"id":350122,"name":"连江县","pid":350100,"level":3},{"id":350123,"name":"罗源县","pid":350100,"level":3},{"id":350124,"name":"闽清县","pid":350100,"level":3},{"id":350125,"name":"永泰县","pid":350100,"level":3},{"id":350128,"name":"平潭县","pid":350100,"level":3},{"id":350181,"name":"福清市","pid":350100,"level":3},{"id":350182,"name":"长乐市","pid":350100,"level":3}]},{"id":350200,"name":"厦门市","pid":350000,"level":2,"children":[{"id":350203,"name":"思明区","pid":350200,"level":3},{"id":350205,"name":"海沧区","pid":350200,"level":3},{"id":350206,"name":"湖里区","pid":350200,"level":3},{"id":350211,"name":"集美区","pid":350200,"level":3},{"id":350212,"name":"同安区","pid":350200,"level":3},{"id":350213,"name":"翔安区","pid":350200,"level":3}]},{"id":350300,"name":"莆田市","pid":350000,"level":2,"children":[{"id":350302,"name":"城厢区","pid":350300,"level":3},{"id":350303,"name":"涵江区","pid":350300,"level":3},{"id":350304,"name":"荔城区","pid":350300,"level":3},{"id":350305,"name":"秀屿区","pid":350300,"level":3},{"id":350322,"name":"仙游县","pid":350300,"level":3}]},{"id":350400,"name":"三明市","pid":350000,"level":2,"children":[{"id":350402,"name":"梅列区","pid":350400,"level":3},{"id":350403,"name":"三元区","pid":350400,"level":3},{"id":350421,"name":"明溪县","pid":350400,"level":3},{"id":350423,"name":"清流县","pid":350400,"level":3},{"id":350424,"name":"宁化县","pid":350400,"level":3},{"id":350425,"name":"大田县","pid":350400,"level":3},{"id":350426,"name":"尤溪县","pid":350400,"level":3},{"id":350427,"name":"沙县","pid":350400,"level":3},{"id":350428,"name":"将乐县","pid":350400,"level":3},{"id":350429,"name":"泰宁县","pid":350400,"level":3},{"id":350430,"name":"建宁县","pid":350400,"level":3},{"id":350481,"name":"永安市","pid":350400,"level":3}]},{"id":350500,"name":"泉州市","pid":350000,"level":2,"children":[{"id":350502,"name":"鲤城区","pid":350500,"level":3},{"id":350503,"name":"丰泽区","pid":350500,"level":3},{"id":350504,"name":"洛江区","pid":350500,"level":3},{"id":350505,"name":"泉港区","pid":350500,"level":3},{"id":350521,"name":"惠安县","pid":350500,"level":3},{"id":350524,"name":"安溪县","pid":350500,"level":3},{"id":350525,"name":"永春县","pid":350500,"level":3},{"id":350526,"name":"德化县","pid":350500,"level":3},{"id":350527,"name":"金门县","pid":350500,"level":3},{"id":350581,"name":"石狮市","pid":350500,"level":3},{"id":350582,"name":"晋江市","pid":350500,"level":3},{"id":350583,"name":"南安市","pid":350500,"level":3}]},{"id":350600,"name":"漳州市","pid":350000,"level":2,"children":[{"id":350602,"name":"芗城区","pid":350600,"level":3},{"id":350603,"name":"龙文区","pid":350600,"level":3},{"id":350622,"name":"云霄县","pid":350600,"level":3},{"id":350623,"name":"漳浦县","pid":350600,"level":3},{"id":350624,"name":"诏安县","pid":350600,"level":3},{"id":350625,"name":"长泰县","pid":350600,"level":3},{"id":350626,"name":"东山县","pid":350600,"level":3},{"id":350627,"name":"南靖县","pid":350600,"level":3},{"id":350628,"name":"平和县","pid":350600,"level":3},{"id":350629,"name":"华安县","pid":350600,"level":3},{"id":350681,"name":"龙海市","pid":350600,"level":3}]},{"id":350700,"name":"南平市","pid":350000,"level":2,"children":[{"id":350702,"name":"延平区","pid":350700,"level":3},{"id":350703,"name":"建阳区","pid":350700,"level":3},{"id":350721,"name":"顺昌县","pid":350700,"level":3},{"id":350722,"name":"浦城县","pid":350700,"level":3},{"id":350723,"name":"光泽县","pid":350700,"level":3},{"id":350724,"name":"松溪县","pid":350700,"level":3},{"id":350725,"name":"政和县","pid":350700,"level":3},{"id":350781,"name":"邵武市","pid":350700,"level":3},{"id":350782,"name":"武夷山市","pid":350700,"level":3},{"id":350783,"name":"建瓯市","pid":350700,"level":3}]},{"id":350800,"name":"龙岩市","pid":350000,"level":2,"children":[{"id":350802,"name":"新罗区","pid":350800,"level":3},{"id":350821,"name":"长汀县","pid":350800,"level":3},{"id":350822,"name":"永定区","pid":350800,"level":3},{"id":350823,"name":"上杭县","pid":350800,"level":3},{"id":350824,"name":"武平县","pid":350800,"level":3},{"id":350825,"name":"连城县","pid":350800,"level":3},{"id":350881,"name":"漳平市","pid":350800,"level":3}]},{"id":350900,"name":"宁德市","pid":350000,"level":2,"children":[{"id":350902,"name":"蕉城区","pid":350900,"level":3},{"id":350921,"name":"霞浦县","pid":350900,"level":3},{"id":350922,"name":"古田县","pid":350900,"level":3},{"id":350923,"name":"屏南县","pid":350900,"level":3},{"id":350924,"name":"寿宁县","pid":350900,"level":3},{"id":350925,"name":"周宁县","pid":350900,"level":3},{"id":350926,"name":"柘荣县","pid":350900,"level":3},{"id":350981,"name":"福安市","pid":350900,"level":3},{"id":350982,"name":"福鼎市","pid":350900,"level":3}]}]},{"id":360000,"name":"江西省","pid":100000,"level":1,"children":[{"id":360100,"name":"南昌市","pid":360000,"level":2,"children":[{"id":360102,"name":"东湖区","pid":360100,"level":3},{"id":360103,"name":"西湖区","pid":360100,"level":3},{"id":360104,"name":"青云谱区","pid":360100,"level":3},{"id":360105,"name":"湾里区","pid":360100,"level":3},{"id":360111,"name":"青山湖区","pid":360100,"level":3},{"id":360121,"name":"南昌县","pid":360100,"level":3},{"id":360122,"name":"新建县","pid":360100,"level":3},{"id":360123,"name":"安义县","pid":360100,"level":3},{"id":360124,"name":"进贤县","pid":360100,"level":3}]},{"id":360200,"name":"景德镇市","pid":360000,"level":2,"children":[{"id":360202,"name":"昌江区","pid":360200,"level":3},{"id":360203,"name":"珠山区","pid":360200,"level":3},{"id":360222,"name":"浮梁县","pid":360200,"level":3},{"id":360281,"name":"乐平市","pid":360200,"level":3}]},{"id":360300,"name":"萍乡市","pid":360000,"level":2,"children":[{"id":360302,"name":"安源区","pid":360300,"level":3},{"id":360313,"name":"湘东区","pid":360300,"level":3},{"id":360321,"name":"莲花县","pid":360300,"level":3},{"id":360322,"name":"上栗县","pid":360300,"level":3},{"id":360323,"name":"芦溪县","pid":360300,"level":3}]},{"id":360400,"name":"九江市","pid":360000,"level":2,"children":[{"id":360402,"name":"庐山区","pid":360400,"level":3},{"id":360403,"name":"浔阳区","pid":360400,"level":3},{"id":360421,"name":"九江县","pid":360400,"level":3},{"id":360423,"name":"武宁县","pid":360400,"level":3},{"id":360424,"name":"修水县","pid":360400,"level":3},{"id":360425,"name":"永修县","pid":360400,"level":3},{"id":360426,"name":"德安县","pid":360400,"level":3},{"id":360427,"name":"星子县","pid":360400,"level":3},{"id":360428,"name":"都昌县","pid":360400,"level":3},{"id":360429,"name":"湖口县","pid":360400,"level":3},{"id":360430,"name":"彭泽县","pid":360400,"level":3},{"id":360481,"name":"瑞昌市","pid":360400,"level":3},{"id":360482,"name":"共青城市","pid":360400,"level":3}]},{"id":360500,"name":"新余市","pid":360000,"level":2,"children":[{"id":360502,"name":"渝水区","pid":360500,"level":3},{"id":360521,"name":"分宜县","pid":360500,"level":3}]},{"id":360600,"name":"鹰潭市","pid":360000,"level":2,"children":[{"id":360602,"name":"月湖区","pid":360600,"level":3},{"id":360622,"name":"余江县","pid":360600,"level":3},{"id":360681,"name":"贵溪市","pid":360600,"level":3}]},{"id":360700,"name":"赣州市","pid":360000,"level":2,"children":[{"id":360702,"name":"章贡区","pid":360700,"level":3},{"id":360703,"name":"南康区","pid":360700,"level":3},{"id":360721,"name":"赣县","pid":360700,"level":3},{"id":360722,"name":"信丰县","pid":360700,"level":3},{"id":360723,"name":"大余县","pid":360700,"level":3},{"id":360724,"name":"上犹县","pid":360700,"level":3},{"id":360725,"name":"崇义县","pid":360700,"level":3},{"id":360726,"name":"安远县","pid":360700,"level":3},{"id":360727,"name":"龙南县","pid":360700,"level":3},{"id":360728,"name":"定南县","pid":360700,"level":3},{"id":360729,"name":"全南县","pid":360700,"level":3},{"id":360730,"name":"宁都县","pid":360700,"level":3},{"id":360731,"name":"于都县","pid":360700,"level":3},{"id":360732,"name":"兴国县","pid":360700,"level":3},{"id":360733,"name":"会昌县","pid":360700,"level":3},{"id":360734,"name":"寻乌县","pid":360700,"level":3},{"id":360735,"name":"石城县","pid":360700,"level":3},{"id":360781,"name":"瑞金市","pid":360700,"level":3}]},{"id":360800,"name":"吉安市","pid":360000,"level":2,"children":[{"id":360802,"name":"吉州区","pid":360800,"level":3},{"id":360803,"name":"青原区","pid":360800,"level":3},{"id":360821,"name":"吉安县","pid":360800,"level":3},{"id":360822,"name":"吉水县","pid":360800,"level":3},{"id":360823,"name":"峡江县","pid":360800,"level":3},{"id":360824,"name":"新干县","pid":360800,"level":3},{"id":360825,"name":"永丰县","pid":360800,"level":3},{"id":360826,"name":"泰和县","pid":360800,"level":3},{"id":360827,"name":"遂川县","pid":360800,"level":3},{"id":360828,"name":"万安县","pid":360800,"level":3},{"id":360829,"name":"安福县","pid":360800,"level":3},{"id":360830,"name":"永新县","pid":360800,"level":3},{"id":360881,"name":"井冈山市","pid":360800,"level":3}]},{"id":360900,"name":"宜春市","pid":360000,"level":2,"children":[{"id":360902,"name":"袁州区","pid":360900,"level":3},{"id":360921,"name":"奉新县","pid":360900,"level":3},{"id":360922,"name":"万载县","pid":360900,"level":3},{"id":360923,"name":"上高县","pid":360900,"level":3},{"id":360924,"name":"宜丰县","pid":360900,"level":3},{"id":360925,"name":"靖安县","pid":360900,"level":3},{"id":360926,"name":"铜鼓县","pid":360900,"level":3},{"id":360981,"name":"丰城市","pid":360900,"level":3},{"id":360982,"name":"樟树市","pid":360900,"level":3},{"id":360983,"name":"高安市","pid":360900,"level":3}]},{"id":361000,"name":"抚州市","pid":360000,"level":2,"children":[{"id":361002,"name":"临川区","pid":361000,"level":3},{"id":361021,"name":"南城县","pid":361000,"level":3},{"id":361022,"name":"黎川县","pid":361000,"level":3},{"id":361023,"name":"南丰县","pid":361000,"level":3},{"id":361024,"name":"崇仁县","pid":361000,"level":3},{"id":361025,"name":"乐安县","pid":361000,"level":3},{"id":361026,"name":"宜黄县","pid":361000,"level":3},{"id":361027,"name":"金溪县","pid":361000,"level":3},{"id":361028,"name":"资溪县","pid":361000,"level":3},{"id":361029,"name":"东乡县","pid":361000,"level":3},{"id":361030,"name":"广昌县","pid":361000,"level":3}]},{"id":361100,"name":"上饶市","pid":360000,"level":2,"children":[{"id":361102,"name":"信州区","pid":361100,"level":3},{"id":361121,"name":"上饶县","pid":361100,"level":3},{"id":361122,"name":"广丰县","pid":361100,"level":3},{"id":361123,"name":"玉山县","pid":361100,"level":3},{"id":361124,"name":"铅山县","pid":361100,"level":3},{"id":361125,"name":"横峰县","pid":361100,"level":3},{"id":361126,"name":"弋阳县","pid":361100,"level":3},{"id":361127,"name":"余干县","pid":361100,"level":3},{"id":361128,"name":"鄱阳县","pid":361100,"level":3},{"id":361129,"name":"万年县","pid":361100,"level":3},{"id":361130,"name":"婺源县","pid":361100,"level":3},{"id":361181,"name":"德兴市","pid":361100,"level":3}]}]},{"id":370000,"name":"山东省","pid":100000,"level":1,"children":[{"id":370100,"name":"济南市","pid":370000,"level":2,"children":[{"id":370102,"name":"历下区","pid":370100,"level":3},{"id":370103,"name":"市中区","pid":370100,"level":3},{"id":370104,"name":"槐荫区","pid":370100,"level":3},{"id":370105,"name":"天桥区","pid":370100,"level":3},{"id":370112,"name":"历城区","pid":370100,"level":3},{"id":370113,"name":"长清区","pid":370100,"level":3},{"id":370124,"name":"平阴县","pid":370100,"level":3},{"id":370125,"name":"济阳县","pid":370100,"level":3},{"id":370126,"name":"商河县","pid":370100,"level":3},{"id":370181,"name":"章丘市","pid":370100,"level":3},{"id":371202,"name":"莱芜区","pid":370100,"level":3},{"id":371203,"name":"钢城区","pid":370100,"level":3}]},{"id":370200,"name":"青岛市","pid":370000,"level":2,"children":[{"id":370202,"name":"市南区","pid":370200,"level":3},{"id":370203,"name":"市北区","pid":370200,"level":3},{"id":370211,"name":"黄岛区","pid":370200,"level":3},{"id":370212,"name":"崂山区","pid":370200,"level":3},{"id":370213,"name":"李沧区","pid":370200,"level":3},{"id":370214,"name":"城阳区","pid":370200,"level":3},{"id":370281,"name":"胶州市","pid":370200,"level":3},{"id":370282,"name":"即墨市","pid":370200,"level":3},{"id":370283,"name":"平度市","pid":370200,"level":3},{"id":370285,"name":"莱西市","pid":370200,"level":3},{"id":370286,"name":"西海岸新区","pid":370200,"level":3}]},{"id":370300,"name":"淄博市","pid":370000,"level":2,"children":[{"id":370302,"name":"淄川区","pid":370300,"level":3},{"id":370303,"name":"张店区","pid":370300,"level":3},{"id":370304,"name":"博山区","pid":370300,"level":3},{"id":370305,"name":"临淄区","pid":370300,"level":3},{"id":370306,"name":"周村区","pid":370300,"level":3},{"id":370321,"name":"桓台县","pid":370300,"level":3},{"id":370322,"name":"高青县","pid":370300,"level":3},{"id":370323,"name":"沂源县","pid":370300,"level":3}]},{"id":370400,"name":"枣庄市","pid":370000,"level":2,"children":[{"id":370402,"name":"市中区","pid":370400,"level":3},{"id":370403,"name":"薛城区","pid":370400,"level":3},{"id":370404,"name":"峄城区","pid":370400,"level":3},{"id":370405,"name":"台儿庄区","pid":370400,"level":3},{"id":370406,"name":"山亭区","pid":370400,"level":3},{"id":370481,"name":"滕州市","pid":370400,"level":3}]},{"id":370500,"name":"东营市","pid":370000,"level":2,"children":[{"id":370502,"name":"东营区","pid":370500,"level":3},{"id":370503,"name":"河口区","pid":370500,"level":3},{"id":370521,"name":"垦利县","pid":370500,"level":3},{"id":370522,"name":"利津县","pid":370500,"level":3},{"id":370523,"name":"广饶县","pid":370500,"level":3}]},{"id":370600,"name":"烟台市","pid":370000,"level":2,"children":[{"id":370602,"name":"芝罘区","pid":370600,"level":3},{"id":370611,"name":"福山区","pid":370600,"level":3},{"id":370612,"name":"牟平区","pid":370600,"level":3},{"id":370613,"name":"莱山区","pid":370600,"level":3},{"id":370634,"name":"长岛县","pid":370600,"level":3},{"id":370681,"name":"龙口市","pid":370600,"level":3},{"id":370682,"name":"莱阳市","pid":370600,"level":3},{"id":370683,"name":"莱州市","pid":370600,"level":3},{"id":370684,"name":"蓬莱市","pid":370600,"level":3},{"id":370685,"name":"招远市","pid":370600,"level":3},{"id":370686,"name":"栖霞市","pid":370600,"level":3},{"id":370687,"name":"海阳市","pid":370600,"level":3}]},{"id":370700,"name":"潍坊市","pid":370000,"level":2,"children":[{"id":370702,"name":"潍城区","pid":370700,"level":3},{"id":370703,"name":"寒亭区","pid":370700,"level":3},{"id":370704,"name":"坊子区","pid":370700,"level":3},{"id":370705,"name":"奎文区","pid":370700,"level":3},{"id":370724,"name":"临朐县","pid":370700,"level":3},{"id":370725,"name":"昌乐县","pid":370700,"level":3},{"id":370781,"name":"青州市","pid":370700,"level":3},{"id":370782,"name":"诸城市","pid":370700,"level":3},{"id":370783,"name":"寿光市","pid":370700,"level":3},{"id":370784,"name":"安丘市","pid":370700,"level":3},{"id":370785,"name":"高密市","pid":370700,"level":3},{"id":370786,"name":"昌邑市","pid":370700,"level":3}]},{"id":370800,"name":"济宁市","pid":370000,"level":2,"children":[{"id":370811,"name":"任城区","pid":370800,"level":3},{"id":370812,"name":"兖州区","pid":370800,"level":3},{"id":370826,"name":"微山县","pid":370800,"level":3},{"id":370827,"name":"鱼台县","pid":370800,"level":3},{"id":370828,"name":"金乡县","pid":370800,"level":3},{"id":370829,"name":"嘉祥县","pid":370800,"level":3},{"id":370830,"name":"汶上县","pid":370800,"level":3},{"id":370831,"name":"泗水县","pid":370800,"level":3},{"id":370832,"name":"梁山县","pid":370800,"level":3},{"id":370881,"name":"曲阜市","pid":370800,"level":3},{"id":370883,"name":"邹城市","pid":370800,"level":3}]},{"id":370900,"name":"泰安市","pid":370000,"level":2,"children":[{"id":370902,"name":"泰山区","pid":370900,"level":3},{"id":370911,"name":"岱岳区","pid":370900,"level":3},{"id":370921,"name":"宁阳县","pid":370900,"level":3},{"id":370923,"name":"东平县","pid":370900,"level":3},{"id":370982,"name":"新泰市","pid":370900,"level":3},{"id":370983,"name":"肥城市","pid":370900,"level":3}]},{"id":371000,"name":"威海市","pid":370000,"level":2,"children":[{"id":371002,"name":"环翠区","pid":371000,"level":3},{"id":371003,"name":"文登区","pid":371000,"level":3},{"id":371082,"name":"荣成市","pid":371000,"level":3},{"id":371083,"name":"乳山市","pid":371000,"level":3}]},{"id":371100,"name":"日照市","pid":370000,"level":2,"children":[{"id":371102,"name":"东港区","pid":371100,"level":3},{"id":371103,"name":"岚山区","pid":371100,"level":3},{"id":371121,"name":"五莲县","pid":371100,"level":3},{"id":371122,"name":"莒县","pid":371100,"level":3}]},{"id":371300,"name":"临沂市","pid":370000,"level":2,"children":[{"id":371302,"name":"兰山区","pid":371300,"level":3},{"id":371311,"name":"罗庄区","pid":371300,"level":3},{"id":371312,"name":"河东区","pid":371300,"level":3},{"id":371321,"name":"沂南县","pid":371300,"level":3},{"id":371322,"name":"郯城县","pid":371300,"level":3},{"id":371323,"name":"沂水县","pid":371300,"level":3},{"id":371324,"name":"兰陵县","pid":371300,"level":3},{"id":371325,"name":"费县","pid":371300,"level":3},{"id":371326,"name":"平邑县","pid":371300,"level":3},{"id":371327,"name":"莒南县","pid":371300,"level":3},{"id":371328,"name":"蒙阴县","pid":371300,"level":3},{"id":371329,"name":"临沭县","pid":371300,"level":3}]},{"id":371400,"name":"德州市","pid":370000,"level":2,"children":[{"id":371402,"name":"德城区","pid":371400,"level":3},{"id":371403,"name":"陵城区","pid":371400,"level":3},{"id":371422,"name":"宁津县","pid":371400,"level":3},{"id":371423,"name":"庆云县","pid":371400,"level":3},{"id":371424,"name":"临邑县","pid":371400,"level":3},{"id":371425,"name":"齐河县","pid":371400,"level":3},{"id":371426,"name":"平原县","pid":371400,"level":3},{"id":371427,"name":"夏津县","pid":371400,"level":3},{"id":371428,"name":"武城县","pid":371400,"level":3},{"id":371481,"name":"乐陵市","pid":371400,"level":3},{"id":371482,"name":"禹城市","pid":371400,"level":3}]},{"id":371500,"name":"聊城市","pid":370000,"level":2,"children":[{"id":371502,"name":"东昌府区","pid":371500,"level":3},{"id":371521,"name":"阳谷县","pid":371500,"level":3},{"id":371522,"name":"莘县","pid":371500,"level":3},{"id":371523,"name":"茌平县","pid":371500,"level":3},{"id":371524,"name":"东阿县","pid":371500,"level":3},{"id":371525,"name":"冠县","pid":371500,"level":3},{"id":371526,"name":"高唐县","pid":371500,"level":3},{"id":371581,"name":"临清市","pid":371500,"level":3}]},{"id":371600,"name":"滨州市","pid":370000,"level":2,"children":[{"id":371602,"name":"滨城区","pid":371600,"level":3},{"id":371603,"name":"沾化区","pid":371600,"level":3},{"id":371621,"name":"惠民县","pid":371600,"level":3},{"id":371622,"name":"阳信县","pid":371600,"level":3},{"id":371623,"name":"无棣县","pid":371600,"level":3},{"id":371625,"name":"博兴县","pid":371600,"level":3},{"id":371626,"name":"邹平县","pid":371600,"level":3},{"id":371627,"name":"北海新区","pid":371600,"level":3}]},{"id":371700,"name":"菏泽市","pid":370000,"level":2,"children":[{"id":371702,"name":"牡丹区","pid":371700,"level":3},{"id":371721,"name":"曹县","pid":371700,"level":3},{"id":371722,"name":"单县","pid":371700,"level":3},{"id":371723,"name":"成武县","pid":371700,"level":3},{"id":371724,"name":"巨野县","pid":371700,"level":3},{"id":371725,"name":"郓城县","pid":371700,"level":3},{"id":371726,"name":"鄄城县","pid":371700,"level":3},{"id":371727,"name":"定陶县","pid":371700,"level":3},{"id":371728,"name":"东明县","pid":371700,"level":3}]}]},{"id":410000,"name":"河南省","pid":100000,"level":1,"children":[{"id":410100,"name":"郑州市","pid":410000,"level":2,"children":[{"id":410102,"name":"中原区","pid":410100,"level":3},{"id":410103,"name":"二七区","pid":410100,"level":3},{"id":410104,"name":"管城回族区","pid":410100,"level":3},{"id":410105,"name":"金水区","pid":410100,"level":3},{"id":410106,"name":"上街区","pid":410100,"level":3},{"id":410108,"name":"惠济区","pid":410100,"level":3},{"id":410122,"name":"中牟县","pid":410100,"level":3},{"id":410181,"name":"巩义市","pid":410100,"level":3},{"id":410182,"name":"荥阳市","pid":410100,"level":3},{"id":410183,"name":"新密市","pid":410100,"level":3},{"id":410184,"name":"新郑市","pid":410100,"level":3},{"id":410185,"name":"登封市","pid":410100,"level":3}]},{"id":410200,"name":"开封市","pid":410000,"level":2,"children":[{"id":410202,"name":"龙亭区","pid":410200,"level":3},{"id":410203,"name":"顺河回族区","pid":410200,"level":3},{"id":410204,"name":"鼓楼区","pid":410200,"level":3},{"id":410205,"name":"禹王台区","pid":410200,"level":3},{"id":410212,"name":"祥符区","pid":410200,"level":3},{"id":410221,"name":"杞县","pid":410200,"level":3},{"id":410222,"name":"通许县","pid":410200,"level":3},{"id":410223,"name":"尉氏县","pid":410200,"level":3},{"id":410225,"name":"兰考县","pid":410200,"level":3}]},{"id":410300,"name":"洛阳市","pid":410000,"level":2,"children":[{"id":410302,"name":"老城区","pid":410300,"level":3},{"id":410303,"name":"西工区","pid":410300,"level":3},{"id":410304,"name":"瀍河回族区","pid":410300,"level":3},{"id":410305,"name":"涧西区","pid":410300,"level":3},{"id":410306,"name":"吉利区","pid":410300,"level":3},{"id":410311,"name":"洛龙区","pid":410300,"level":3},{"id":410322,"name":"孟津县","pid":410300,"level":3},{"id":410323,"name":"新安县","pid":410300,"level":3},{"id":410324,"name":"栾川县","pid":410300,"level":3},{"id":410325,"name":"嵩县","pid":410300,"level":3},{"id":410326,"name":"汝阳县","pid":410300,"level":3},{"id":410327,"name":"宜阳县","pid":410300,"level":3},{"id":410328,"name":"洛宁县","pid":410300,"level":3},{"id":410329,"name":"伊川县","pid":410300,"level":3},{"id":410381,"name":"偃师市","pid":410300,"level":3}]},{"id":410400,"name":"平顶山市","pid":410000,"level":2,"children":[{"id":410402,"name":"新华区","pid":410400,"level":3},{"id":410403,"name":"卫东区","pid":410400,"level":3},{"id":410404,"name":"石龙区","pid":410400,"level":3},{"id":410411,"name":"湛河区","pid":410400,"level":3},{"id":410421,"name":"宝丰县","pid":410400,"level":3},{"id":410422,"name":"叶县","pid":410400,"level":3},{"id":410423,"name":"鲁山县","pid":410400,"level":3},{"id":410425,"name":"郏县","pid":410400,"level":3},{"id":410481,"name":"舞钢市","pid":410400,"level":3},{"id":410482,"name":"汝州市","pid":410400,"level":3}]},{"id":410500,"name":"安阳市","pid":410000,"level":2,"children":[{"id":410502,"name":"文峰区","pid":410500,"level":3},{"id":410503,"name":"北关区","pid":410500,"level":3},{"id":410505,"name":"殷都区","pid":410500,"level":3},{"id":410506,"name":"龙安区","pid":410500,"level":3},{"id":410522,"name":"安阳县","pid":410500,"level":3},{"id":410523,"name":"汤阴县","pid":410500,"level":3},{"id":410526,"name":"滑县","pid":410500,"level":3},{"id":410527,"name":"内黄县","pid":410500,"level":3},{"id":410581,"name":"林州市","pid":410500,"level":3}]},{"id":410600,"name":"鹤壁市","pid":410000,"level":2,"children":[{"id":410602,"name":"鹤山区","pid":410600,"level":3},{"id":410603,"name":"山城区","pid":410600,"level":3},{"id":410611,"name":"淇滨区","pid":410600,"level":3},{"id":410621,"name":"浚县","pid":410600,"level":3},{"id":410622,"name":"淇县","pid":410600,"level":3}]},{"id":410700,"name":"新乡市","pid":410000,"level":2,"children":[{"id":410702,"name":"红旗区","pid":410700,"level":3},{"id":410703,"name":"卫滨区","pid":410700,"level":3},{"id":410704,"name":"凤泉区","pid":410700,"level":3},{"id":410711,"name":"牧野区","pid":410700,"level":3},{"id":410721,"name":"新乡县","pid":410700,"level":3},{"id":410724,"name":"获嘉县","pid":410700,"level":3},{"id":410725,"name":"原阳县","pid":410700,"level":3},{"id":410726,"name":"延津县","pid":410700,"level":3},{"id":410727,"name":"封丘县","pid":410700,"level":3},{"id":410728,"name":"长垣县","pid":410700,"level":3},{"id":410781,"name":"卫辉市","pid":410700,"level":3},{"id":410782,"name":"辉县市","pid":410700,"level":3}]},{"id":410800,"name":"焦作市","pid":410000,"level":2,"children":[{"id":410802,"name":"解放区","pid":410800,"level":3},{"id":410803,"name":"中站区","pid":410800,"level":3},{"id":410804,"name":"马村区","pid":410800,"level":3},{"id":410811,"name":"山阳区","pid":410800,"level":3},{"id":410821,"name":"修武县","pid":410800,"level":3},{"id":410822,"name":"博爱县","pid":410800,"level":3},{"id":410823,"name":"武陟县","pid":410800,"level":3},{"id":410825,"name":"温县","pid":410800,"level":3},{"id":410882,"name":"沁阳市","pid":410800,"level":3},{"id":410883,"name":"孟州市","pid":410800,"level":3}]},{"id":410900,"name":"濮阳市","pid":410000,"level":2,"children":[{"id":410902,"name":"华龙区","pid":410900,"level":3},{"id":410922,"name":"清丰县","pid":410900,"level":3},{"id":410923,"name":"南乐县","pid":410900,"level":3},{"id":410926,"name":"范县","pid":410900,"level":3},{"id":410927,"name":"台前县","pid":410900,"level":3},{"id":410928,"name":"濮阳县","pid":410900,"level":3}]},{"id":411000,"name":"许昌市","pid":410000,"level":2,"children":[{"id":411002,"name":"魏都区","pid":411000,"level":3},{"id":411023,"name":"许昌县","pid":411000,"level":3},{"id":411024,"name":"鄢陵县","pid":411000,"level":3},{"id":411025,"name":"襄城县","pid":411000,"level":3},{"id":411081,"name":"禹州市","pid":411000,"level":3},{"id":411082,"name":"长葛市","pid":411000,"level":3}]},{"id":411100,"name":"漯河市","pid":410000,"level":2,"children":[{"id":411102,"name":"源汇区","pid":411100,"level":3},{"id":411103,"name":"郾城区","pid":411100,"level":3},{"id":411104,"name":"召陵区","pid":411100,"level":3},{"id":411121,"name":"舞阳县","pid":411100,"level":3},{"id":411122,"name":"临颍县","pid":411100,"level":3}]},{"id":411200,"name":"三门峡市","pid":410000,"level":2,"children":[{"id":411202,"name":"湖滨区","pid":411200,"level":3},{"id":411221,"name":"渑池县","pid":411200,"level":3},{"id":411222,"name":"陕县","pid":411200,"level":3},{"id":411224,"name":"卢氏县","pid":411200,"level":3},{"id":411281,"name":"义马市","pid":411200,"level":3},{"id":411282,"name":"灵宝市","pid":411200,"level":3}]},{"id":411300,"name":"南阳市","pid":410000,"level":2,"children":[{"id":411302,"name":"宛城区","pid":411300,"level":3},{"id":411303,"name":"卧龙区","pid":411300,"level":3},{"id":411321,"name":"南召县","pid":411300,"level":3},{"id":411322,"name":"方城县","pid":411300,"level":3},{"id":411323,"name":"西峡县","pid":411300,"level":3},{"id":411324,"name":"镇平县","pid":411300,"level":3},{"id":411325,"name":"内乡县","pid":411300,"level":3},{"id":411326,"name":"淅川县","pid":411300,"level":3},{"id":411327,"name":"社旗县","pid":411300,"level":3},{"id":411328,"name":"唐河县","pid":411300,"level":3},{"id":411329,"name":"新野县","pid":411300,"level":3},{"id":411330,"name":"桐柏县","pid":411300,"level":3},{"id":411381,"name":"邓州市","pid":411300,"level":3}]},{"id":411400,"name":"商丘市","pid":410000,"level":2,"children":[{"id":411402,"name":"梁园区","pid":411400,"level":3},{"id":411403,"name":"睢阳区","pid":411400,"level":3},{"id":411421,"name":"民权县","pid":411400,"level":3},{"id":411422,"name":"睢县","pid":411400,"level":3},{"id":411423,"name":"宁陵县","pid":411400,"level":3},{"id":411424,"name":"柘城县","pid":411400,"level":3},{"id":411425,"name":"虞城县","pid":411400,"level":3},{"id":411426,"name":"夏邑县","pid":411400,"level":3},{"id":411481,"name":"永城市","pid":411400,"level":3}]},{"id":411500,"name":"信阳市","pid":410000,"level":2,"children":[{"id":411502,"name":"浉河区","pid":411500,"level":3},{"id":411503,"name":"平桥区","pid":411500,"level":3},{"id":411521,"name":"罗山县","pid":411500,"level":3},{"id":411522,"name":"光山县","pid":411500,"level":3},{"id":411523,"name":"新县","pid":411500,"level":3},{"id":411524,"name":"商城县","pid":411500,"level":3},{"id":411525,"name":"固始县","pid":411500,"level":3},{"id":411526,"name":"潢川县","pid":411500,"level":3},{"id":411527,"name":"淮滨县","pid":411500,"level":3},{"id":411528,"name":"息县","pid":411500,"level":3}]},{"id":411600,"name":"周口市","pid":410000,"level":2,"children":[{"id":411602,"name":"川汇区","pid":411600,"level":3},{"id":411621,"name":"扶沟县","pid":411600,"level":3},{"id":411622,"name":"西华县","pid":411600,"level":3},{"id":411623,"name":"商水县","pid":411600,"level":3},{"id":411624,"name":"沈丘县","pid":411600,"level":3},{"id":411625,"name":"郸城县","pid":411600,"level":3},{"id":411626,"name":"淮阳县","pid":411600,"level":3},{"id":411627,"name":"太康县","pid":411600,"level":3},{"id":411628,"name":"鹿邑县","pid":411600,"level":3},{"id":411681,"name":"项城市","pid":411600,"level":3}]},{"id":411700,"name":"驻马店市","pid":410000,"level":2,"children":[{"id":411702,"name":"驿城区","pid":411700,"level":3},{"id":411721,"name":"西平县","pid":411700,"level":3},{"id":411722,"name":"上蔡县","pid":411700,"level":3},{"id":411723,"name":"平舆县","pid":411700,"level":3},{"id":411724,"name":"正阳县","pid":411700,"level":3},{"id":411725,"name":"确山县","pid":411700,"level":3},{"id":411726,"name":"泌阳县","pid":411700,"level":3},{"id":411727,"name":"汝南县","pid":411700,"level":3},{"id":411728,"name":"遂平县","pid":411700,"level":3},{"id":411729,"name":"新蔡县","pid":411700,"level":3}]},{"id":419000,"name":"直辖县级","pid":410000,"level":2,"children":[{"id":419001,"name":"济源市","pid":419000,"level":3}]}]},{"id":420000,"name":"湖北省","pid":100000,"level":1,"children":[{"id":420100,"name":"武汉市","pid":420000,"level":2,"children":[{"id":420102,"name":"江岸区","pid":420100,"level":3},{"id":420103,"name":"江汉区","pid":420100,"level":3},{"id":420104,"name":"硚口区","pid":420100,"level":3},{"id":420105,"name":"汉阳区","pid":420100,"level":3},{"id":420106,"name":"武昌区","pid":420100,"level":3},{"id":420107,"name":"青山区","pid":420100,"level":3},{"id":420111,"name":"洪山区","pid":420100,"level":3},{"id":420112,"name":"东西湖区","pid":420100,"level":3},{"id":420113,"name":"汉南区","pid":420100,"level":3},{"id":420114,"name":"蔡甸区","pid":420100,"level":3},{"id":420115,"name":"江夏区","pid":420100,"level":3},{"id":420116,"name":"黄陂区","pid":420100,"level":3},{"id":420117,"name":"新洲区","pid":420100,"level":3}]},{"id":420200,"name":"黄石市","pid":420000,"level":2,"children":[{"id":420202,"name":"黄石港区","pid":420200,"level":3},{"id":420203,"name":"西塞山区","pid":420200,"level":3},{"id":420204,"name":"下陆区","pid":420200,"level":3},{"id":420205,"name":"铁山区","pid":420200,"level":3},{"id":420222,"name":"阳新县","pid":420200,"level":3},{"id":420281,"name":"大冶市","pid":420200,"level":3}]},{"id":420300,"name":"十堰市","pid":420000,"level":2,"children":[{"id":420302,"name":"茅箭区","pid":420300,"level":3},{"id":420303,"name":"张湾区","pid":420300,"level":3},{"id":420304,"name":"郧阳区","pid":420300,"level":3},{"id":420322,"name":"郧西县","pid":420300,"level":3},{"id":420323,"name":"竹山县","pid":420300,"level":3},{"id":420324,"name":"竹溪县","pid":420300,"level":3},{"id":420325,"name":"房县","pid":420300,"level":3},{"id":420381,"name":"丹江口市","pid":420300,"level":3}]},{"id":420500,"name":"宜昌市","pid":420000,"level":2,"children":[{"id":420502,"name":"西陵区","pid":420500,"level":3},{"id":420503,"name":"伍家岗区","pid":420500,"level":3},{"id":420504,"name":"点军区","pid":420500,"level":3},{"id":420505,"name":"猇亭区","pid":420500,"level":3},{"id":420506,"name":"夷陵区","pid":420500,"level":3},{"id":420525,"name":"远安县","pid":420500,"level":3},{"id":420526,"name":"兴山县","pid":420500,"level":3},{"id":420527,"name":"秭归县","pid":420500,"level":3},{"id":420528,"name":"长阳土家族自治县","pid":420500,"level":3},{"id":420529,"name":"五峰土家族自治县","pid":420500,"level":3},{"id":420581,"name":"宜都市","pid":420500,"level":3},{"id":420582,"name":"当阳市","pid":420500,"level":3},{"id":420583,"name":"枝江市","pid":420500,"level":3}]},{"id":420600,"name":"襄阳市","pid":420000,"level":2,"children":[{"id":420602,"name":"襄城区","pid":420600,"level":3},{"id":420606,"name":"樊城区","pid":420600,"level":3},{"id":420607,"name":"襄州区","pid":420600,"level":3},{"id":420624,"name":"南漳县","pid":420600,"level":3},{"id":420625,"name":"谷城县","pid":420600,"level":3},{"id":420626,"name":"保康县","pid":420600,"level":3},{"id":420682,"name":"老河口市","pid":420600,"level":3},{"id":420683,"name":"枣阳市","pid":420600,"level":3},{"id":420684,"name":"宜城市","pid":420600,"level":3}]},{"id":420700,"name":"鄂州市","pid":420000,"level":2,"children":[{"id":420702,"name":"梁子湖区","pid":420700,"level":3},{"id":420703,"name":"华容区","pid":420700,"level":3},{"id":420704,"name":"鄂城区","pid":420700,"level":3}]},{"id":420800,"name":"荆门市","pid":420000,"level":2,"children":[{"id":420802,"name":"东宝区","pid":420800,"level":3},{"id":420804,"name":"掇刀区","pid":420800,"level":3},{"id":420821,"name":"京山县","pid":420800,"level":3},{"id":420822,"name":"沙洋县","pid":420800,"level":3},{"id":420881,"name":"钟祥市","pid":420800,"level":3}]},{"id":420900,"name":"孝感市","pid":420000,"level":2,"children":[{"id":420902,"name":"孝南区","pid":420900,"level":3},{"id":420921,"name":"孝昌县","pid":420900,"level":3},{"id":420922,"name":"大悟县","pid":420900,"level":3},{"id":420923,"name":"云梦县","pid":420900,"level":3},{"id":420981,"name":"应城市","pid":420900,"level":3},{"id":420982,"name":"安陆市","pid":420900,"level":3},{"id":420984,"name":"汉川市","pid":420900,"level":3}]},{"id":421000,"name":"荆州市","pid":420000,"level":2,"children":[{"id":421002,"name":"沙市区","pid":421000,"level":3},{"id":421003,"name":"荆州区","pid":421000,"level":3},{"id":421022,"name":"公安县","pid":421000,"level":3},{"id":421023,"name":"监利县","pid":421000,"level":3},{"id":421024,"name":"江陵县","pid":421000,"level":3},{"id":421081,"name":"石首市","pid":421000,"level":3},{"id":421083,"name":"洪湖市","pid":421000,"level":3},{"id":421087,"name":"松滋市","pid":421000,"level":3}]},{"id":421100,"name":"黄冈市","pid":420000,"level":2,"children":[{"id":421102,"name":"黄州区","pid":421100,"level":3},{"id":421121,"name":"团风县","pid":421100,"level":3},{"id":421122,"name":"红安县","pid":421100,"level":3},{"id":421123,"name":"罗田县","pid":421100,"level":3},{"id":421124,"name":"英山县","pid":421100,"level":3},{"id":421125,"name":"浠水县","pid":421100,"level":3},{"id":421126,"name":"蕲春县","pid":421100,"level":3},{"id":421127,"name":"黄梅县","pid":421100,"level":3},{"id":421181,"name":"麻城市","pid":421100,"level":3},{"id":421182,"name":"武穴市","pid":421100,"level":3}]},{"id":421200,"name":"咸宁市","pid":420000,"level":2,"children":[{"id":421202,"name":"咸安区","pid":421200,"level":3},{"id":421221,"name":"嘉鱼县","pid":421200,"level":3},{"id":421222,"name":"通城县","pid":421200,"level":3},{"id":421223,"name":"崇阳县","pid":421200,"level":3},{"id":421224,"name":"通山县","pid":421200,"level":3},{"id":421281,"name":"赤壁市","pid":421200,"level":3}]},{"id":421300,"name":"随州市","pid":420000,"level":2,"children":[{"id":421303,"name":"曾都区","pid":421300,"level":3},{"id":421321,"name":"随县","pid":421300,"level":3},{"id":421381,"name":"广水市","pid":421300,"level":3}]},{"id":422800,"name":"恩施土家族苗族自治州","pid":420000,"level":2,"children":[{"id":422801,"name":"恩施市","pid":422800,"level":3},{"id":422802,"name":"利川市","pid":422800,"level":3},{"id":422822,"name":"建始县","pid":422800,"level":3},{"id":422823,"name":"巴东县","pid":422800,"level":3},{"id":422825,"name":"宣恩县","pid":422800,"level":3},{"id":422826,"name":"咸丰县","pid":422800,"level":3},{"id":422827,"name":"来凤县","pid":422800,"level":3},{"id":422828,"name":"鹤峰县","pid":422800,"level":3}]},{"id":429000,"name":"直辖县级","pid":420000,"level":2,"children":[{"id":429004,"name":"仙桃市","pid":429000,"level":3},{"id":429005,"name":"潜江市","pid":429000,"level":3},{"id":429006,"name":"天门市","pid":429000,"level":3},{"id":429021,"name":"神农架林区","pid":429000,"level":3}]}]},{"id":430000,"name":"湖南省","pid":100000,"level":1,"children":[{"id":430100,"name":"长沙市","pid":430000,"level":2,"children":[{"id":430102,"name":"芙蓉区","pid":430100,"level":3},{"id":430103,"name":"天心区","pid":430100,"level":3},{"id":430104,"name":"岳麓区","pid":430100,"level":3},{"id":430105,"name":"开福区","pid":430100,"level":3},{"id":430111,"name":"雨花区","pid":430100,"level":3},{"id":430112,"name":"望城区","pid":430100,"level":3},{"id":430121,"name":"长沙县","pid":430100,"level":3},{"id":430124,"name":"宁乡县","pid":430100,"level":3},{"id":430181,"name":"浏阳市","pid":430100,"level":3}]},{"id":430200,"name":"株洲市","pid":430000,"level":2,"children":[{"id":430202,"name":"荷塘区","pid":430200,"level":3},{"id":430203,"name":"芦淞区","pid":430200,"level":3},{"id":430204,"name":"石峰区","pid":430200,"level":3},{"id":430211,"name":"天元区","pid":430200,"level":3},{"id":430221,"name":"株洲县","pid":430200,"level":3},{"id":430223,"name":"攸县","pid":430200,"level":3},{"id":430224,"name":"茶陵县","pid":430200,"level":3},{"id":430225,"name":"炎陵县","pid":430200,"level":3},{"id":430281,"name":"醴陵市","pid":430200,"level":3}]},{"id":430300,"name":"湘潭市","pid":430000,"level":2,"children":[{"id":430302,"name":"雨湖区","pid":430300,"level":3},{"id":430304,"name":"岳塘区","pid":430300,"level":3},{"id":430321,"name":"湘潭县","pid":430300,"level":3},{"id":430381,"name":"湘乡市","pid":430300,"level":3},{"id":430382,"name":"韶山市","pid":430300,"level":3}]},{"id":430400,"name":"衡阳市","pid":430000,"level":2,"children":[{"id":430405,"name":"珠晖区","pid":430400,"level":3},{"id":430406,"name":"雁峰区","pid":430400,"level":3},{"id":430407,"name":"石鼓区","pid":430400,"level":3},{"id":430408,"name":"蒸湘区","pid":430400,"level":3},{"id":430412,"name":"南岳区","pid":430400,"level":3},{"id":430421,"name":"衡阳县","pid":430400,"level":3},{"id":430422,"name":"衡南县","pid":430400,"level":3},{"id":430423,"name":"衡山县","pid":430400,"level":3},{"id":430424,"name":"衡东县","pid":430400,"level":3},{"id":430426,"name":"祁东县","pid":430400,"level":3},{"id":430481,"name":"耒阳市","pid":430400,"level":3},{"id":430482,"name":"常宁市","pid":430400,"level":3}]},{"id":430500,"name":"邵阳市","pid":430000,"level":2,"children":[{"id":430502,"name":"双清区","pid":430500,"level":3},{"id":430503,"name":"大祥区","pid":430500,"level":3},{"id":430511,"name":"北塔区","pid":430500,"level":3},{"id":430521,"name":"邵东县","pid":430500,"level":3},{"id":430522,"name":"新邵县","pid":430500,"level":3},{"id":430523,"name":"邵阳县","pid":430500,"level":3},{"id":430524,"name":"隆回县","pid":430500,"level":3},{"id":430525,"name":"洞口县","pid":430500,"level":3},{"id":430527,"name":"绥宁县","pid":430500,"level":3},{"id":430528,"name":"新宁县","pid":430500,"level":3},{"id":430529,"name":"城步苗族自治县","pid":430500,"level":3},{"id":430581,"name":"武冈市","pid":430500,"level":3}]},{"id":430600,"name":"岳阳市","pid":430000,"level":2,"children":[{"id":430602,"name":"岳阳楼区","pid":430600,"level":3},{"id":430603,"name":"云溪区","pid":430600,"level":3},{"id":430611,"name":"君山区","pid":430600,"level":3},{"id":430621,"name":"岳阳县","pid":430600,"level":3},{"id":430623,"name":"华容县","pid":430600,"level":3},{"id":430624,"name":"湘阴县","pid":430600,"level":3},{"id":430626,"name":"平江县","pid":430600,"level":3},{"id":430681,"name":"汨罗市","pid":430600,"level":3},{"id":430682,"name":"临湘市","pid":430600,"level":3}]},{"id":430700,"name":"常德市","pid":430000,"level":2,"children":[{"id":430702,"name":"武陵区","pid":430700,"level":3},{"id":430703,"name":"鼎城区","pid":430700,"level":3},{"id":430721,"name":"安乡县","pid":430700,"level":3},{"id":430722,"name":"汉寿县","pid":430700,"level":3},{"id":430723,"name":"澧县","pid":430700,"level":3},{"id":430724,"name":"临澧县","pid":430700,"level":3},{"id":430725,"name":"桃源县","pid":430700,"level":3},{"id":430726,"name":"石门县","pid":430700,"level":3},{"id":430781,"name":"津市市","pid":430700,"level":3}]},{"id":430800,"name":"张家界市","pid":430000,"level":2,"children":[{"id":430802,"name":"永定区","pid":430800,"level":3},{"id":430811,"name":"武陵源区","pid":430800,"level":3},{"id":430821,"name":"慈利县","pid":430800,"level":3},{"id":430822,"name":"桑植县","pid":430800,"level":3}]},{"id":430900,"name":"益阳市","pid":430000,"level":2,"children":[{"id":430902,"name":"资阳区","pid":430900,"level":3},{"id":430903,"name":"赫山区","pid":430900,"level":3},{"id":430921,"name":"南县","pid":430900,"level":3},{"id":430922,"name":"桃江县","pid":430900,"level":3},{"id":430923,"name":"安化县","pid":430900,"level":3},{"id":430981,"name":"沅江市","pid":430900,"level":3}]},{"id":431000,"name":"郴州市","pid":430000,"level":2,"children":[{"id":431002,"name":"北湖区","pid":431000,"level":3},{"id":431003,"name":"苏仙区","pid":431000,"level":3},{"id":431021,"name":"桂阳县","pid":431000,"level":3},{"id":431022,"name":"宜章县","pid":431000,"level":3},{"id":431023,"name":"永兴县","pid":431000,"level":3},{"id":431024,"name":"嘉禾县","pid":431000,"level":3},{"id":431025,"name":"临武县","pid":431000,"level":3},{"id":431026,"name":"汝城县","pid":431000,"level":3},{"id":431027,"name":"桂东县","pid":431000,"level":3},{"id":431028,"name":"安仁县","pid":431000,"level":3},{"id":431081,"name":"资兴市","pid":431000,"level":3}]},{"id":431100,"name":"永州市","pid":430000,"level":2,"children":[{"id":431102,"name":"零陵区","pid":431100,"level":3},{"id":431103,"name":"冷水滩区","pid":431100,"level":3},{"id":431121,"name":"祁阳县","pid":431100,"level":3},{"id":431122,"name":"东安县","pid":431100,"level":3},{"id":431123,"name":"双牌县","pid":431100,"level":3},{"id":431124,"name":"道县","pid":431100,"level":3},{"id":431125,"name":"江永县","pid":431100,"level":3},{"id":431126,"name":"宁远县","pid":431100,"level":3},{"id":431127,"name":"蓝山县","pid":431100,"level":3},{"id":431128,"name":"新田县","pid":431100,"level":3},{"id":431129,"name":"江华瑶族自治县","pid":431100,"level":3}]},{"id":431200,"name":"怀化市","pid":430000,"level":2,"children":[{"id":431202,"name":"鹤城区","pid":431200,"level":3},{"id":431221,"name":"中方县","pid":431200,"level":3},{"id":431222,"name":"沅陵县","pid":431200,"level":3},{"id":431223,"name":"辰溪县","pid":431200,"level":3},{"id":431224,"name":"溆浦县","pid":431200,"level":3},{"id":431225,"name":"会同县","pid":431200,"level":3},{"id":431226,"name":"麻阳苗族自治县","pid":431200,"level":3},{"id":431227,"name":"新晃侗族自治县","pid":431200,"level":3},{"id":431228,"name":"芷江侗族自治县","pid":431200,"level":3},{"id":431229,"name":"靖州苗族侗族自治县","pid":431200,"level":3},{"id":431230,"name":"通道侗族自治县","pid":431200,"level":3},{"id":431281,"name":"洪江市","pid":431200,"level":3}]},{"id":431300,"name":"娄底市","pid":430000,"level":2,"children":[{"id":431302,"name":"娄星区","pid":431300,"level":3},{"id":431321,"name":"双峰县","pid":431300,"level":3},{"id":431322,"name":"新化县","pid":431300,"level":3},{"id":431381,"name":"冷水江市","pid":431300,"level":3},{"id":431382,"name":"涟源市","pid":431300,"level":3}]},{"id":433100,"name":"湘西土家族苗族自治州","pid":430000,"level":2,"children":[{"id":433101,"name":"吉首市","pid":433100,"level":3},{"id":433122,"name":"泸溪县","pid":433100,"level":3},{"id":433123,"name":"凤凰县","pid":433100,"level":3},{"id":433124,"name":"花垣县","pid":433100,"level":3},{"id":433125,"name":"保靖县","pid":433100,"level":3},{"id":433126,"name":"古丈县","pid":433100,"level":3},{"id":433127,"name":"永顺县","pid":433100,"level":3},{"id":433130,"name":"龙山县","pid":433100,"level":3}]}]},{"id":440000,"name":"广东省","pid":100000,"level":1,"children":[{"id":440100,"name":"广州市","pid":440000,"level":2,"children":[{"id":440103,"name":"荔湾区","pid":440100,"level":3},{"id":440104,"name":"越秀区","pid":440100,"level":3},{"id":440105,"name":"海珠区","pid":440100,"level":3},{"id":440106,"name":"天河区","pid":440100,"level":3},{"id":440111,"name":"白云区","pid":440100,"level":3},{"id":440112,"name":"黄埔区","pid":440100,"level":3},{"id":440113,"name":"番禺区","pid":440100,"level":3},{"id":440114,"name":"花都区","pid":440100,"level":3},{"id":440115,"name":"南沙区","pid":440100,"level":3},{"id":440117,"name":"从化区","pid":440100,"level":3},{"id":440118,"name":"增城区","pid":440100,"level":3}]},{"id":440200,"name":"韶关市","pid":440000,"level":2,"children":[{"id":440203,"name":"武江区","pid":440200,"level":3},{"id":440204,"name":"浈江区","pid":440200,"level":3},{"id":440205,"name":"曲江区","pid":440200,"level":3},{"id":440222,"name":"始兴县","pid":440200,"level":3},{"id":440224,"name":"仁化县","pid":440200,"level":3},{"id":440229,"name":"翁源县","pid":440200,"level":3},{"id":440232,"name":"乳源瑶族自治县","pid":440200,"level":3},{"id":440233,"name":"新丰县","pid":440200,"level":3},{"id":440281,"name":"乐昌市","pid":440200,"level":3},{"id":440282,"name":"南雄市","pid":440200,"level":3}]},{"id":440300,"name":"深圳市","pid":440000,"level":2,"children":[{"id":440303,"name":"罗湖区","pid":440300,"level":3},{"id":440304,"name":"福田区","pid":440300,"level":3},{"id":440305,"name":"南山区","pid":440300,"level":3},{"id":440306,"name":"宝安区","pid":440300,"level":3},{"id":440307,"name":"龙岗区","pid":440300,"level":3},{"id":440308,"name":"盐田区","pid":440300,"level":3},{"id":440309,"name":"光明新区","pid":440300,"level":3},{"id":440310,"name":"坪山新区","pid":440300,"level":3},{"id":440311,"name":"大鹏新区","pid":440300,"level":3},{"id":440312,"name":"龙华新区","pid":440300,"level":3}]},{"id":440400,"name":"珠海市","pid":440000,"level":2,"children":[{"id":440402,"name":"香洲区","pid":440400,"level":3},{"id":440403,"name":"斗门区","pid":440400,"level":3},{"id":440404,"name":"金湾区","pid":440400,"level":3}]},{"id":440500,"name":"汕头市","pid":440000,"level":2,"children":[{"id":440507,"name":"龙湖区","pid":440500,"level":3},{"id":440511,"name":"金平区","pid":440500,"level":3},{"id":440512,"name":"濠江区","pid":440500,"level":3},{"id":440513,"name":"潮阳区","pid":440500,"level":3},{"id":440514,"name":"潮南区","pid":440500,"level":3},{"id":440515,"name":"澄海区","pid":440500,"level":3},{"id":440523,"name":"南澳县","pid":440500,"level":3}]},{"id":440600,"name":"佛山市","pid":440000,"level":2,"children":[{"id":440604,"name":"禅城区","pid":440600,"level":3},{"id":440605,"name":"南海区","pid":440600,"level":3},{"id":440606,"name":"顺德区","pid":440600,"level":3},{"id":440607,"name":"三水区","pid":440600,"level":3},{"id":440608,"name":"高明区","pid":440600,"level":3}]},{"id":440700,"name":"江门市","pid":440000,"level":2,"children":[{"id":440703,"name":"蓬江区","pid":440700,"level":3},{"id":440704,"name":"江海区","pid":440700,"level":3},{"id":440705,"name":"新会区","pid":440700,"level":3},{"id":440781,"name":"台山市","pid":440700,"level":3},{"id":440783,"name":"开平市","pid":440700,"level":3},{"id":440784,"name":"鹤山市","pid":440700,"level":3},{"id":440785,"name":"恩平市","pid":440700,"level":3}]},{"id":440800,"name":"湛江市","pid":440000,"level":2,"children":[{"id":440802,"name":"赤坎区","pid":440800,"level":3},{"id":440803,"name":"霞山区","pid":440800,"level":3},{"id":440804,"name":"坡头区","pid":440800,"level":3},{"id":440811,"name":"麻章区","pid":440800,"level":3},{"id":440823,"name":"遂溪县","pid":440800,"level":3},{"id":440825,"name":"徐闻县","pid":440800,"level":3},{"id":440881,"name":"廉江市","pid":440800,"level":3},{"id":440882,"name":"雷州市","pid":440800,"level":3},{"id":440883,"name":"吴川市","pid":440800,"level":3}]},{"id":440900,"name":"茂名市","pid":440000,"level":2,"children":[{"id":440902,"name":"茂南区","pid":440900,"level":3},{"id":440904,"name":"电白区","pid":440900,"level":3},{"id":440981,"name":"高州市","pid":440900,"level":3},{"id":440982,"name":"化州市","pid":440900,"level":3},{"id":440983,"name":"信宜市","pid":440900,"level":3}]},{"id":441200,"name":"肇庆市","pid":440000,"level":2,"children":[{"id":441202,"name":"端州区","pid":441200,"level":3},{"id":441203,"name":"鼎湖区","pid":441200,"level":3},{"id":441223,"name":"广宁县","pid":441200,"level":3},{"id":441224,"name":"怀集县","pid":441200,"level":3},{"id":441225,"name":"封开县","pid":441200,"level":3},{"id":441226,"name":"德庆县","pid":441200,"level":3},{"id":441283,"name":"高要市","pid":441200,"level":3},{"id":441284,"name":"四会市","pid":441200,"level":3}]},{"id":441300,"name":"惠州市","pid":440000,"level":2,"children":[{"id":441302,"name":"惠城区","pid":441300,"level":3},{"id":441303,"name":"惠阳区","pid":441300,"level":3},{"id":441322,"name":"博罗县","pid":441300,"level":3},{"id":441323,"name":"惠东县","pid":441300,"level":3},{"id":441324,"name":"龙门县","pid":441300,"level":3}]},{"id":441400,"name":"梅州市","pid":440000,"level":2,"children":[{"id":441402,"name":"梅江区","pid":441400,"level":3},{"id":441403,"name":"梅县区","pid":441400,"level":3},{"id":441422,"name":"大埔县","pid":441400,"level":3},{"id":441423,"name":"丰顺县","pid":441400,"level":3},{"id":441424,"name":"五华县","pid":441400,"level":3},{"id":441426,"name":"平远县","pid":441400,"level":3},{"id":441427,"name":"蕉岭县","pid":441400,"level":3},{"id":441481,"name":"兴宁市","pid":441400,"level":3}]},{"id":441500,"name":"汕尾市","pid":440000,"level":2,"children":[{"id":441502,"name":"城区","pid":441500,"level":3},{"id":441521,"name":"海丰县","pid":441500,"level":3},{"id":441523,"name":"陆河县","pid":441500,"level":3},{"id":441581,"name":"陆丰市","pid":441500,"level":3}]},{"id":441600,"name":"河源市","pid":440000,"level":2,"children":[{"id":441602,"name":"源城区","pid":441600,"level":3},{"id":441621,"name":"紫金县","pid":441600,"level":3},{"id":441622,"name":"龙川县","pid":441600,"level":3},{"id":441623,"name":"连平县","pid":441600,"level":3},{"id":441624,"name":"和平县","pid":441600,"level":3},{"id":441625,"name":"东源县","pid":441600,"level":3}]},{"id":441700,"name":"阳江市","pid":440000,"level":2,"children":[{"id":441702,"name":"江城区","pid":441700,"level":3},{"id":441704,"name":"阳东区","pid":441700,"level":3},{"id":441721,"name":"阳西县","pid":441700,"level":3},{"id":441781,"name":"阳春市","pid":441700,"level":3}]},{"id":441800,"name":"清远市","pid":440000,"level":2,"children":[{"id":441802,"name":"清城区","pid":441800,"level":3},{"id":441803,"name":"清新区","pid":441800,"level":3},{"id":441821,"name":"佛冈县","pid":441800,"level":3},{"id":441823,"name":"阳山县","pid":441800,"level":3},{"id":441825,"name":"连山壮族瑶族自治县","pid":441800,"level":3},{"id":441826,"name":"连南瑶族自治县","pid":441800,"level":3},{"id":441881,"name":"英德市","pid":441800,"level":3},{"id":441882,"name":"连州市","pid":441800,"level":3}]},{"id":441900,"name":"东莞市","pid":440000,"level":2,"children":[{"id":441901,"name":"莞城区","pid":441900,"level":3},{"id":441902,"name":"南城区","pid":441900,"level":3},{"id":441904,"name":"万江区","pid":441900,"level":3},{"id":441905,"name":"石碣镇","pid":441900,"level":3},{"id":441906,"name":"石龙镇","pid":441900,"level":3},{"id":441907,"name":"茶山镇","pid":441900,"level":3},{"id":441908,"name":"石排镇","pid":441900,"level":3},{"id":441909,"name":"企石镇","pid":441900,"level":3},{"id":441910,"name":"横沥镇","pid":441900,"level":3},{"id":441911,"name":"桥头镇","pid":441900,"level":3},{"id":441912,"name":"谢岗镇","pid":441900,"level":3},{"id":441913,"name":"东坑镇","pid":441900,"level":3},{"id":441914,"name":"常平镇","pid":441900,"level":3},{"id":441915,"name":"寮步镇","pid":441900,"level":3},{"id":441916,"name":"大朗镇","pid":441900,"level":3},{"id":441917,"name":"麻涌镇","pid":441900,"level":3},{"id":441918,"name":"中堂镇","pid":441900,"level":3},{"id":441919,"name":"高埗镇","pid":441900,"level":3},{"id":441920,"name":"樟木头镇","pid":441900,"level":3},{"id":441921,"name":"大岭山镇","pid":441900,"level":3},{"id":441922,"name":"望牛墩镇","pid":441900,"level":3},{"id":441923,"name":"黄江镇","pid":441900,"level":3},{"id":441924,"name":"洪梅镇","pid":441900,"level":3},{"id":441925,"name":"清溪镇","pid":441900,"level":3},{"id":441926,"name":"沙田镇","pid":441900,"level":3},{"id":441927,"name":"道滘镇","pid":441900,"level":3},{"id":441928,"name":"塘厦镇","pid":441900,"level":3},{"id":441929,"name":"虎门镇","pid":441900,"level":3},{"id":441930,"name":"厚街镇","pid":441900,"level":3},{"id":441931,"name":"凤岗镇","pid":441900,"level":3},{"id":441932,"name":"长安镇","pid":441900,"level":3}]},{"id":442000,"name":"中山市","pid":440000,"level":2,"children":[{"id":442001,"name":"石岐区","pid":442000,"level":3},{"id":442004,"name":"南区","pid":442000,"level":3},{"id":442005,"name":"五桂山区","pid":442000,"level":3},{"id":442006,"name":"火炬开发区","pid":442000,"level":3},{"id":442007,"name":"黄圃镇","pid":442000,"level":3},{"id":442008,"name":"南头镇","pid":442000,"level":3},{"id":442009,"name":"东凤镇","pid":442000,"level":3},{"id":442010,"name":"阜沙镇","pid":442000,"level":3},{"id":442011,"name":"小榄镇","pid":442000,"level":3},{"id":442012,"name":"东升镇","pid":442000,"level":3},{"id":442013,"name":"古镇镇","pid":442000,"level":3},{"id":442014,"name":"横栏镇","pid":442000,"level":3},{"id":442015,"name":"三角镇","pid":442000,"level":3},{"id":442016,"name":"民众镇","pid":442000,"level":3},{"id":442017,"name":"南朗镇","pid":442000,"level":3},{"id":442018,"name":"港口镇","pid":442000,"level":3},{"id":442019,"name":"大涌镇","pid":442000,"level":3},{"id":442020,"name":"沙溪镇","pid":442000,"level":3},{"id":442021,"name":"三乡镇","pid":442000,"level":3},{"id":442022,"name":"板芙镇","pid":442000,"level":3},{"id":442023,"name":"神湾镇","pid":442000,"level":3},{"id":442024,"name":"坦洲镇","pid":442000,"level":3}]},{"id":445100,"name":"潮州市","pid":440000,"level":2,"children":[{"id":445102,"name":"湘桥区","pid":445100,"level":3},{"id":445103,"name":"潮安区","pid":445100,"level":3},{"id":445122,"name":"饶平县","pid":445100,"level":3}]},{"id":445200,"name":"揭阳市","pid":440000,"level":2,"children":[{"id":445202,"name":"榕城区","pid":445200,"level":3},{"id":445203,"name":"揭东区","pid":445200,"level":3},{"id":445222,"name":"揭西县","pid":445200,"level":3},{"id":445224,"name":"惠来县","pid":445200,"level":3},{"id":445281,"name":"普宁市","pid":445200,"level":3}]},{"id":445300,"name":"云浮市","pid":440000,"level":2,"children":[{"id":445302,"name":"云城区","pid":445300,"level":3},{"id":445303,"name":"云安区","pid":445300,"level":3},{"id":445321,"name":"新兴县","pid":445300,"level":3},{"id":445322,"name":"郁南县","pid":445300,"level":3},{"id":445381,"name":"罗定市","pid":445300,"level":3}]}]},{"id":450000,"name":"广西壮族自治区","pid":100000,"level":1,"children":[{"id":450100,"name":"南宁市","pid":450000,"level":2,"children":[{"id":450102,"name":"兴宁区","pid":450100,"level":3},{"id":450103,"name":"青秀区","pid":450100,"level":3},{"id":450105,"name":"江南区","pid":450100,"level":3},{"id":450107,"name":"西乡塘区","pid":450100,"level":3},{"id":450108,"name":"良庆区","pid":450100,"level":3},{"id":450109,"name":"邕宁区","pid":450100,"level":3},{"id":450122,"name":"武鸣县","pid":450100,"level":3},{"id":450123,"name":"隆安县","pid":450100,"level":3},{"id":450124,"name":"马山县","pid":450100,"level":3},{"id":450125,"name":"上林县","pid":450100,"level":3},{"id":450126,"name":"宾阳县","pid":450100,"level":3},{"id":450127,"name":"横县","pid":450100,"level":3},{"id":450128,"name":"埌东新区","pid":450100,"level":3}]},{"id":450200,"name":"柳州市","pid":450000,"level":2,"children":[{"id":450202,"name":"城中区","pid":450200,"level":3},{"id":450203,"name":"鱼峰区","pid":450200,"level":3},{"id":450204,"name":"柳南区","pid":450200,"level":3},{"id":450205,"name":"柳北区","pid":450200,"level":3},{"id":450221,"name":"柳江县","pid":450200,"level":3},{"id":450222,"name":"柳城县","pid":450200,"level":3},{"id":450223,"name":"鹿寨县","pid":450200,"level":3},{"id":450224,"name":"融安县","pid":450200,"level":3},{"id":450225,"name":"融水苗族自治县","pid":450200,"level":3},{"id":450226,"name":"三江侗族自治县","pid":450200,"level":3},{"id":450227,"name":"柳东新区","pid":450200,"level":3}]},{"id":450300,"name":"桂林市","pid":450000,"level":2,"children":[{"id":450302,"name":"秀峰区","pid":450300,"level":3},{"id":450303,"name":"叠彩区","pid":450300,"level":3},{"id":450304,"name":"象山区","pid":450300,"level":3},{"id":450305,"name":"七星区","pid":450300,"level":3},{"id":450311,"name":"雁山区","pid":450300,"level":3},{"id":450312,"name":"临桂区","pid":450300,"level":3},{"id":450321,"name":"阳朔县","pid":450300,"level":3},{"id":450323,"name":"灵川县","pid":450300,"level":3},{"id":450324,"name":"全州县","pid":450300,"level":3},{"id":450325,"name":"兴安县","pid":450300,"level":3},{"id":450326,"name":"永福县","pid":450300,"level":3},{"id":450327,"name":"灌阳县","pid":450300,"level":3},{"id":450328,"name":"龙胜各族自治县","pid":450300,"level":3},{"id":450329,"name":"资源县","pid":450300,"level":3},{"id":450330,"name":"平乐县","pid":450300,"level":3},{"id":450331,"name":"荔浦县","pid":450300,"level":3},{"id":450332,"name":"恭城瑶族自治县","pid":450300,"level":3}]},{"id":450400,"name":"梧州市","pid":450000,"level":2,"children":[{"id":450403,"name":"万秀区","pid":450400,"level":3},{"id":450405,"name":"长洲区","pid":450400,"level":3},{"id":450406,"name":"龙圩区","pid":450400,"level":3},{"id":450421,"name":"苍梧县","pid":450400,"level":3},{"id":450422,"name":"藤县","pid":450400,"level":3},{"id":450423,"name":"蒙山县","pid":450400,"level":3},{"id":450481,"name":"岑溪市","pid":450400,"level":3}]},{"id":450500,"name":"北海市","pid":450000,"level":2,"children":[{"id":450502,"name":"海城区","pid":450500,"level":3},{"id":450503,"name":"银海区","pid":450500,"level":3},{"id":450512,"name":"铁山港区","pid":450500,"level":3},{"id":450521,"name":"合浦县","pid":450500,"level":3}]},{"id":450600,"name":"防城港市","pid":450000,"level":2,"children":[{"id":450602,"name":"港口区","pid":450600,"level":3},{"id":450603,"name":"防城区","pid":450600,"level":3},{"id":450621,"name":"上思县","pid":450600,"level":3},{"id":450681,"name":"东兴市","pid":450600,"level":3}]},{"id":450700,"name":"钦州市","pid":450000,"level":2,"children":[{"id":450702,"name":"钦南区","pid":450700,"level":3},{"id":450703,"name":"钦北区","pid":450700,"level":3},{"id":450721,"name":"灵山县","pid":450700,"level":3},{"id":450722,"name":"浦北县","pid":450700,"level":3}]},{"id":450800,"name":"贵港市","pid":450000,"level":2,"children":[{"id":450802,"name":"港北区","pid":450800,"level":3},{"id":450803,"name":"港南区","pid":450800,"level":3},{"id":450804,"name":"覃塘区","pid":450800,"level":3},{"id":450821,"name":"平南县","pid":450800,"level":3},{"id":450881,"name":"桂平市","pid":450800,"level":3}]},{"id":450900,"name":"玉林市","pid":450000,"level":2,"children":[{"id":450902,"name":"玉州区","pid":450900,"level":3},{"id":450903,"name":"福绵区","pid":450900,"level":3},{"id":450904,"name":"玉东新区","pid":450900,"level":3},{"id":450921,"name":"容县","pid":450900,"level":3},{"id":450922,"name":"陆川县","pid":450900,"level":3},{"id":450923,"name":"博白县","pid":450900,"level":3},{"id":450924,"name":"兴业县","pid":450900,"level":3},{"id":450981,"name":"北流市","pid":450900,"level":3}]},{"id":451000,"name":"百色市","pid":450000,"level":2,"children":[{"id":451002,"name":"右江区","pid":451000,"level":3},{"id":451021,"name":"田阳县","pid":451000,"level":3},{"id":451022,"name":"田东县","pid":451000,"level":3},{"id":451023,"name":"平果县","pid":451000,"level":3},{"id":451024,"name":"德保县","pid":451000,"level":3},{"id":451025,"name":"靖西县","pid":451000,"level":3},{"id":451026,"name":"那坡县","pid":451000,"level":3},{"id":451027,"name":"凌云县","pid":451000,"level":3},{"id":451028,"name":"乐业县","pid":451000,"level":3},{"id":451029,"name":"田林县","pid":451000,"level":3},{"id":451030,"name":"西林县","pid":451000,"level":3},{"id":451031,"name":"隆林各族自治县","pid":451000,"level":3}]},{"id":451100,"name":"贺州市","pid":450000,"level":2,"children":[{"id":451102,"name":"八步区","pid":451100,"level":3},{"id":451121,"name":"昭平县","pid":451100,"level":3},{"id":451122,"name":"钟山县","pid":451100,"level":3},{"id":451123,"name":"富川瑶族自治县","pid":451100,"level":3},{"id":451124,"name":"平桂管理区","pid":451100,"level":3}]},{"id":451200,"name":"河池市","pid":450000,"level":2,"children":[{"id":451202,"name":"金城江区","pid":451200,"level":3},{"id":451221,"name":"南丹县","pid":451200,"level":3},{"id":451222,"name":"天峨县","pid":451200,"level":3},{"id":451223,"name":"凤山县","pid":451200,"level":3},{"id":451224,"name":"东兰县","pid":451200,"level":3},{"id":451225,"name":"罗城仫佬族自治县","pid":451200,"level":3},{"id":451226,"name":"环江毛南族自治县","pid":451200,"level":3},{"id":451227,"name":"巴马瑶族自治县","pid":451200,"level":3},{"id":451228,"name":"都安瑶族自治县","pid":451200,"level":3},{"id":451229,"name":"大化瑶族自治县","pid":451200,"level":3},{"id":451281,"name":"宜州市","pid":451200,"level":3}]},{"id":451300,"name":"来宾市","pid":450000,"level":2,"children":[{"id":451302,"name":"兴宾区","pid":451300,"level":3},{"id":451321,"name":"忻城县","pid":451300,"level":3},{"id":451322,"name":"象州县","pid":451300,"level":3},{"id":451323,"name":"武宣县","pid":451300,"level":3},{"id":451324,"name":"金秀瑶族自治县","pid":451300,"level":3},{"id":451381,"name":"合山市","pid":451300,"level":3}]},{"id":451400,"name":"崇左市","pid":450000,"level":2,"children":[{"id":451402,"name":"江州区","pid":451400,"level":3},{"id":451421,"name":"扶绥县","pid":451400,"level":3},{"id":451422,"name":"宁明县","pid":451400,"level":3},{"id":451423,"name":"龙州县","pid":451400,"level":3},{"id":451424,"name":"大新县","pid":451400,"level":3},{"id":451425,"name":"天等县","pid":451400,"level":3},{"id":451481,"name":"凭祥市","pid":451400,"level":3}]}]},{"id":460000,"name":"海南省","pid":100000,"level":1,"children":[{"id":460100,"name":"海口市","pid":460000,"level":2,"children":[{"id":460105,"name":"秀英区","pid":460100,"level":3},{"id":460106,"name":"龙华区","pid":460100,"level":3},{"id":460107,"name":"琼山区","pid":460100,"level":3},{"id":460108,"name":"美兰区","pid":460100,"level":3}]},{"id":460200,"name":"三亚市","pid":460000,"level":2,"children":[{"id":460202,"name":"海棠区","pid":460200,"level":3},{"id":460203,"name":"吉阳区","pid":460200,"level":3},{"id":460204,"name":"天涯区","pid":460200,"level":3},{"id":460205,"name":"崖州区","pid":460200,"level":3}]},{"id":460300,"name":"三沙市","pid":460000,"level":2,"children":[{"id":460321,"name":"西沙群岛","pid":460300,"level":3},{"id":460322,"name":"南沙群岛","pid":460300,"level":3},{"id":460323,"name":"中沙群岛","pid":460300,"level":3}]},{"id":469000,"name":"直辖县级","pid":460000,"level":2,"children":[{"id":469001,"name":"五指山市","pid":469000,"level":3},{"id":469002,"name":"琼海市","pid":469000,"level":3},{"id":469003,"name":"儋州市","pid":469000,"level":3},{"id":469005,"name":"文昌市","pid":469000,"level":3},{"id":469006,"name":"万宁市","pid":469000,"level":3},{"id":469007,"name":"东方市","pid":469000,"level":3},{"id":469021,"name":"定安县","pid":469000,"level":3},{"id":469022,"name":"屯昌县","pid":469000,"level":3},{"id":469023,"name":"澄迈县","pid":469000,"level":3},{"id":469024,"name":"临高县","pid":469000,"level":3},{"id":469025,"name":"白沙黎族自治县","pid":469000,"level":3},{"id":469026,"name":"昌江黎族自治县","pid":469000,"level":3},{"id":469027,"name":"乐东黎族自治县","pid":469000,"level":3},{"id":469028,"name":"陵水黎族自治县","pid":469000,"level":3},{"id":469029,"name":"保亭黎族苗族自治县","pid":469000,"level":3},{"id":469030,"name":"琼中黎族苗族自治县","pid":469000,"level":3}]}]},{"id":500000,"name":"重庆市","pid":100000,"level":1,"children":[{"id":500100,"name":"重庆市","pid":500000,"level":2,"children":[{"id":500101,"name":"万州区","pid":500100,"level":3},{"id":500102,"name":"涪陵区","pid":500100,"level":3},{"id":500103,"name":"渝中区","pid":500100,"level":3},{"id":500104,"name":"大渡口区","pid":500100,"level":3},{"id":500105,"name":"江北区","pid":500100,"level":3},{"id":500106,"name":"沙坪坝区","pid":500100,"level":3},{"id":500107,"name":"九龙坡区","pid":500100,"level":3},{"id":500108,"name":"南岸区","pid":500100,"level":3},{"id":500109,"name":"北碚区","pid":500100,"level":3},{"id":500110,"name":"綦江区","pid":500100,"level":3},{"id":500111,"name":"大足区","pid":500100,"level":3},{"id":500112,"name":"渝北区","pid":500100,"level":3},{"id":500113,"name":"巴南区","pid":500100,"level":3},{"id":500114,"name":"黔江区","pid":500100,"level":3},{"id":500115,"name":"长寿区","pid":500100,"level":3},{"id":500116,"name":"江津区","pid":500100,"level":3},{"id":500117,"name":"合川区","pid":500100,"level":3},{"id":500118,"name":"永川区","pid":500100,"level":3},{"id":500119,"name":"南川区","pid":500100,"level":3},{"id":500120,"name":"璧山区","pid":500100,"level":3},{"id":500151,"name":"铜梁区","pid":500100,"level":3},{"id":500223,"name":"潼南县","pid":500100,"level":3},{"id":500226,"name":"荣昌县","pid":500100,"level":3},{"id":500228,"name":"梁平县","pid":500100,"level":3},{"id":500229,"name":"城口县","pid":500100,"level":3},{"id":500230,"name":"丰都县","pid":500100,"level":3},{"id":500231,"name":"垫江县","pid":500100,"level":3},{"id":500232,"name":"武隆县","pid":500100,"level":3},{"id":500233,"name":"忠县","pid":500100,"level":3},{"id":500234,"name":"开县","pid":500100,"level":3},{"id":500235,"name":"云阳县","pid":500100,"level":3},{"id":500236,"name":"奉节县","pid":500100,"level":3},{"id":500237,"name":"巫山县","pid":500100,"level":3},{"id":500238,"name":"巫溪县","pid":500100,"level":3},{"id":500240,"name":"石柱土家族自治县","pid":500100,"level":3},{"id":500241,"name":"秀山土家族苗族自治县","pid":500100,"level":3},{"id":500242,"name":"酉阳土家族苗族自治县","pid":500100,"level":3},{"id":500243,"name":"彭水苗族土家族自治县","pid":500100,"level":3}]},{"id":500300,"name":"两江新区","pid":500000,"level":2,"children":[{"id":500301,"name":"北部新区","pid":500300,"level":3},{"id":500302,"name":"保税港区","pid":500300,"level":3},{"id":500303,"name":"工业园区","pid":500300,"level":3}]}]},{"id":510000,"name":"四川省","pid":100000,"level":1,"children":[{"id":510100,"name":"成都市","pid":510000,"level":2,"children":[{"id":510104,"name":"锦江区","pid":510100,"level":3},{"id":510105,"name":"青羊区","pid":510100,"level":3},{"id":510106,"name":"金牛区","pid":510100,"level":3},{"id":510107,"name":"武侯区","pid":510100,"level":3},{"id":510108,"name":"成华区","pid":510100,"level":3},{"id":510112,"name":"龙泉驿区","pid":510100,"level":3},{"id":510113,"name":"青白江区","pid":510100,"level":3},{"id":510114,"name":"新都区","pid":510100,"level":3},{"id":510115,"name":"温江区","pid":510100,"level":3},{"id":510121,"name":"金堂县","pid":510100,"level":3},{"id":510122,"name":"双流县","pid":510100,"level":3},{"id":510124,"name":"郫县","pid":510100,"level":3},{"id":510129,"name":"大邑县","pid":510100,"level":3},{"id":510131,"name":"蒲江县","pid":510100,"level":3},{"id":510132,"name":"新津县","pid":510100,"level":3},{"id":510181,"name":"都江堰市","pid":510100,"level":3},{"id":510182,"name":"彭州市","pid":510100,"level":3},{"id":510183,"name":"邛崃市","pid":510100,"level":3},{"id":510184,"name":"崇州市","pid":510100,"level":3}]},{"id":510300,"name":"自贡市","pid":510000,"level":2,"children":[{"id":510302,"name":"自流井区","pid":510300,"level":3},{"id":510303,"name":"贡井区","pid":510300,"level":3},{"id":510304,"name":"大安区","pid":510300,"level":3},{"id":510311,"name":"沿滩区","pid":510300,"level":3},{"id":510321,"name":"荣县","pid":510300,"level":3},{"id":510322,"name":"富顺县","pid":510300,"level":3}]},{"id":510400,"name":"攀枝花市","pid":510000,"level":2,"children":[{"id":510402,"name":"东区","pid":510400,"level":3},{"id":510403,"name":"西区","pid":510400,"level":3},{"id":510411,"name":"仁和区","pid":510400,"level":3},{"id":510421,"name":"米易县","pid":510400,"level":3},{"id":510422,"name":"盐边县","pid":510400,"level":3}]},{"id":510500,"name":"泸州市","pid":510000,"level":2,"children":[{"id":510502,"name":"江阳区","pid":510500,"level":3},{"id":510503,"name":"纳溪区","pid":510500,"level":3},{"id":510504,"name":"龙马潭区","pid":510500,"level":3},{"id":510521,"name":"泸县","pid":510500,"level":3},{"id":510522,"name":"合江县","pid":510500,"level":3},{"id":510524,"name":"叙永县","pid":510500,"level":3},{"id":510525,"name":"古蔺县","pid":510500,"level":3}]},{"id":510600,"name":"德阳市","pid":510000,"level":2,"children":[{"id":510603,"name":"旌阳区","pid":510600,"level":3},{"id":510623,"name":"中江县","pid":510600,"level":3},{"id":510626,"name":"罗江县","pid":510600,"level":3},{"id":510681,"name":"广汉市","pid":510600,"level":3},{"id":510682,"name":"什邡市","pid":510600,"level":3},{"id":510683,"name":"绵竹市","pid":510600,"level":3}]},{"id":510700,"name":"绵阳市","pid":510000,"level":2,"children":[{"id":510703,"name":"涪城区","pid":510700,"level":3},{"id":510704,"name":"游仙区","pid":510700,"level":3},{"id":510722,"name":"三台县","pid":510700,"level":3},{"id":510723,"name":"盐亭县","pid":510700,"level":3},{"id":510724,"name":"安县","pid":510700,"level":3},{"id":510725,"name":"梓潼县","pid":510700,"level":3},{"id":510726,"name":"北川羌族自治县","pid":510700,"level":3},{"id":510727,"name":"平武县","pid":510700,"level":3},{"id":510781,"name":"江油市","pid":510700,"level":3}]},{"id":510800,"name":"广元市","pid":510000,"level":2,"children":[{"id":510802,"name":"利州区","pid":510800,"level":3},{"id":510811,"name":"昭化区","pid":510800,"level":3},{"id":510812,"name":"朝天区","pid":510800,"level":3},{"id":510821,"name":"旺苍县","pid":510800,"level":3},{"id":510822,"name":"青川县","pid":510800,"level":3},{"id":510823,"name":"剑阁县","pid":510800,"level":3},{"id":510824,"name":"苍溪县","pid":510800,"level":3}]},{"id":510900,"name":"遂宁市","pid":510000,"level":2,"children":[{"id":510903,"name":"船山区","pid":510900,"level":3},{"id":510904,"name":"安居区","pid":510900,"level":3},{"id":510921,"name":"蓬溪县","pid":510900,"level":3},{"id":510922,"name":"射洪县","pid":510900,"level":3},{"id":510923,"name":"大英县","pid":510900,"level":3}]},{"id":511000,"name":"内江市","pid":510000,"level":2,"children":[{"id":511002,"name":"市中区","pid":511000,"level":3},{"id":511011,"name":"东兴区","pid":511000,"level":3},{"id":511024,"name":"威远县","pid":511000,"level":3},{"id":511025,"name":"资中县","pid":511000,"level":3},{"id":511028,"name":"隆昌县","pid":511000,"level":3}]},{"id":511100,"name":"乐山市","pid":510000,"level":2,"children":[{"id":511102,"name":"市中区","pid":511100,"level":3},{"id":511111,"name":"沙湾区","pid":511100,"level":3},{"id":511112,"name":"五通桥区","pid":511100,"level":3},{"id":511113,"name":"金口河区","pid":511100,"level":3},{"id":511123,"name":"犍为县","pid":511100,"level":3},{"id":511124,"name":"井研县","pid":511100,"level":3},{"id":511126,"name":"夹江县","pid":511100,"level":3},{"id":511129,"name":"沐川县","pid":511100,"level":3},{"id":511132,"name":"峨边彝族自治县","pid":511100,"level":3},{"id":511133,"name":"马边彝族自治县","pid":511100,"level":3},{"id":511181,"name":"峨眉山市","pid":511100,"level":3}]},{"id":511300,"name":"南充市","pid":510000,"level":2,"children":[{"id":511302,"name":"顺庆区","pid":511300,"level":3},{"id":511303,"name":"高坪区","pid":511300,"level":3},{"id":511304,"name":"嘉陵区","pid":511300,"level":3},{"id":511321,"name":"南部县","pid":511300,"level":3},{"id":511322,"name":"营山县","pid":511300,"level":3},{"id":511323,"name":"蓬安县","pid":511300,"level":3},{"id":511324,"name":"仪陇县","pid":511300,"level":3},{"id":511325,"name":"西充县","pid":511300,"level":3},{"id":511381,"name":"阆中市","pid":511300,"level":3}]},{"id":511400,"name":"眉山市","pid":510000,"level":2,"children":[{"id":511402,"name":"东坡区","pid":511400,"level":3},{"id":511403,"name":"彭山区","pid":511400,"level":3},{"id":511421,"name":"仁寿县","pid":511400,"level":3},{"id":511423,"name":"洪雅县","pid":511400,"level":3},{"id":511424,"name":"丹棱县","pid":511400,"level":3},{"id":511425,"name":"青神县","pid":511400,"level":3}]},{"id":511500,"name":"宜宾市","pid":510000,"level":2,"children":[{"id":511502,"name":"翠屏区","pid":511500,"level":3},{"id":511503,"name":"南溪区","pid":511500,"level":3},{"id":511521,"name":"宜宾县","pid":511500,"level":3},{"id":511523,"name":"江安县","pid":511500,"level":3},{"id":511524,"name":"长宁县","pid":511500,"level":3},{"id":511525,"name":"高县","pid":511500,"level":3},{"id":511526,"name":"珙县","pid":511500,"level":3},{"id":511527,"name":"筠连县","pid":511500,"level":3},{"id":511528,"name":"兴文县","pid":511500,"level":3},{"id":511529,"name":"屏山县","pid":511500,"level":3}]},{"id":511600,"name":"广安市","pid":510000,"level":2,"children":[{"id":511602,"name":"广安区","pid":511600,"level":3},{"id":511603,"name":"前锋区","pid":511600,"level":3},{"id":511621,"name":"岳池县","pid":511600,"level":3},{"id":511622,"name":"武胜县","pid":511600,"level":3},{"id":511623,"name":"邻水县","pid":511600,"level":3},{"id":511681,"name":"华蓥市","pid":511600,"level":3}]},{"id":511700,"name":"达州市","pid":510000,"level":2,"children":[{"id":511702,"name":"通川区","pid":511700,"level":3},{"id":511703,"name":"达川区","pid":511700,"level":3},{"id":511722,"name":"宣汉县","pid":511700,"level":3},{"id":511723,"name":"开江县","pid":511700,"level":3},{"id":511724,"name":"大竹县","pid":511700,"level":3},{"id":511725,"name":"渠县","pid":511700,"level":3},{"id":511781,"name":"万源市","pid":511700,"level":3}]},{"id":511800,"name":"雅安市","pid":510000,"level":2,"children":[{"id":511802,"name":"雨城区","pid":511800,"level":3},{"id":511803,"name":"名山区","pid":511800,"level":3},{"id":511822,"name":"荥经县","pid":511800,"level":3},{"id":511823,"name":"汉源县","pid":511800,"level":3},{"id":511824,"name":"石棉县","pid":511800,"level":3},{"id":511825,"name":"天全县","pid":511800,"level":3},{"id":511826,"name":"芦山县","pid":511800,"level":3},{"id":511827,"name":"宝兴县","pid":511800,"level":3}]},{"id":511900,"name":"巴中市","pid":510000,"level":2,"children":[{"id":511902,"name":"巴州区","pid":511900,"level":3},{"id":511903,"name":"恩阳区","pid":511900,"level":3},{"id":511921,"name":"通江县","pid":511900,"level":3},{"id":511922,"name":"南江县","pid":511900,"level":3},{"id":511923,"name":"平昌县","pid":511900,"level":3}]},{"id":512000,"name":"资阳市","pid":510000,"level":2,"children":[{"id":512002,"name":"雁江区","pid":512000,"level":3},{"id":512021,"name":"安岳县","pid":512000,"level":3},{"id":512022,"name":"乐至县","pid":512000,"level":3},{"id":512081,"name":"简阳市","pid":512000,"level":3}]},{"id":513200,"name":"阿坝藏族羌族自治州","pid":510000,"level":2,"children":[{"id":513221,"name":"汶川县","pid":513200,"level":3},{"id":513222,"name":"理县","pid":513200,"level":3},{"id":513223,"name":"茂县","pid":513200,"level":3},{"id":513224,"name":"松潘县","pid":513200,"level":3},{"id":513225,"name":"九寨沟县","pid":513200,"level":3},{"id":513226,"name":"金川县","pid":513200,"level":3},{"id":513227,"name":"小金县","pid":513200,"level":3},{"id":513228,"name":"黑水县","pid":513200,"level":3},{"id":513229,"name":"马尔康县","pid":513200,"level":3},{"id":513230,"name":"壤塘县","pid":513200,"level":3},{"id":513231,"name":"阿坝县","pid":513200,"level":3},{"id":513232,"name":"若尔盖县","pid":513200,"level":3},{"id":513233,"name":"红原县","pid":513200,"level":3}]},{"id":513300,"name":"甘孜藏族自治州","pid":510000,"level":2,"children":[{"id":513321,"name":"康定县","pid":513300,"level":3},{"id":513322,"name":"泸定县","pid":513300,"level":3},{"id":513323,"name":"丹巴县","pid":513300,"level":3},{"id":513324,"name":"九龙县","pid":513300,"level":3},{"id":513325,"name":"雅江县","pid":513300,"level":3},{"id":513326,"name":"道孚县","pid":513300,"level":3},{"id":513327,"name":"炉霍县","pid":513300,"level":3},{"id":513328,"name":"甘孜县","pid":513300,"level":3},{"id":513329,"name":"新龙县","pid":513300,"level":3},{"id":513330,"name":"德格县","pid":513300,"level":3},{"id":513331,"name":"白玉县","pid":513300,"level":3},{"id":513332,"name":"石渠县","pid":513300,"level":3},{"id":513333,"name":"色达县","pid":513300,"level":3},{"id":513334,"name":"理塘县","pid":513300,"level":3},{"id":513335,"name":"巴塘县","pid":513300,"level":3},{"id":513336,"name":"乡城县","pid":513300,"level":3},{"id":513337,"name":"稻城县","pid":513300,"level":3},{"id":513338,"name":"得荣县","pid":513300,"level":3}]},{"id":513400,"name":"凉山彝族自治州","pid":510000,"level":2,"children":[{"id":513401,"name":"西昌市","pid":513400,"level":3},{"id":513422,"name":"木里藏族自治县","pid":513400,"level":3},{"id":513423,"name":"盐源县","pid":513400,"level":3},{"id":513424,"name":"德昌县","pid":513400,"level":3},{"id":513425,"name":"会理县","pid":513400,"level":3},{"id":513426,"name":"会东县","pid":513400,"level":3},{"id":513427,"name":"宁南县","pid":513400,"level":3},{"id":513428,"name":"普格县","pid":513400,"level":3},{"id":513429,"name":"布拖县","pid":513400,"level":3},{"id":513430,"name":"金阳县","pid":513400,"level":3},{"id":513431,"name":"昭觉县","pid":513400,"level":3},{"id":513432,"name":"喜德县","pid":513400,"level":3},{"id":513433,"name":"冕宁县","pid":513400,"level":3},{"id":513434,"name":"越西县","pid":513400,"level":3},{"id":513435,"name":"甘洛县","pid":513400,"level":3},{"id":513436,"name":"美姑县","pid":513400,"level":3},{"id":513437,"name":"雷波县","pid":513400,"level":3}]}]},{"id":520000,"name":"贵州省","pid":100000,"level":1,"children":[{"id":520100,"name":"贵阳市","pid":520000,"level":2,"children":[{"id":520102,"name":"南明区","pid":520100,"level":3},{"id":520103,"name":"云岩区","pid":520100,"level":3},{"id":520111,"name":"花溪区","pid":520100,"level":3},{"id":520112,"name":"乌当区","pid":520100,"level":3},{"id":520113,"name":"白云区","pid":520100,"level":3},{"id":520115,"name":"观山湖区","pid":520100,"level":3},{"id":520121,"name":"开阳县","pid":520100,"level":3},{"id":520122,"name":"息烽县","pid":520100,"level":3},{"id":520123,"name":"修文县","pid":520100,"level":3},{"id":520181,"name":"清镇市","pid":520100,"level":3}]},{"id":520200,"name":"六盘水市","pid":520000,"level":2,"children":[{"id":520201,"name":"钟山区","pid":520200,"level":3},{"id":520203,"name":"六枝特区","pid":520200,"level":3},{"id":520221,"name":"水城县","pid":520200,"level":3},{"id":520222,"name":"盘县","pid":520200,"level":3}]},{"id":520300,"name":"遵义市","pid":520000,"level":2,"children":[{"id":520302,"name":"红花岗区","pid":520300,"level":3},{"id":520303,"name":"汇川区","pid":520300,"level":3},{"id":520321,"name":"遵义县","pid":520300,"level":3},{"id":520322,"name":"桐梓县","pid":520300,"level":3},{"id":520323,"name":"绥阳县","pid":520300,"level":3},{"id":520324,"name":"正安县","pid":520300,"level":3},{"id":520325,"name":"道真仡佬族苗族自治县","pid":520300,"level":3},{"id":520326,"name":"务川仡佬族苗族自治县","pid":520300,"level":3},{"id":520327,"name":"凤冈县","pid":520300,"level":3},{"id":520328,"name":"湄潭县","pid":520300,"level":3},{"id":520329,"name":"余庆县","pid":520300,"level":3},{"id":520330,"name":"习水县","pid":520300,"level":3},{"id":520381,"name":"赤水市","pid":520300,"level":3},{"id":520382,"name":"仁怀市","pid":520300,"level":3}]},{"id":520400,"name":"安顺市","pid":520000,"level":2,"children":[{"id":520402,"name":"西秀区","pid":520400,"level":3},{"id":520421,"name":"平坝区","pid":520400,"level":3},{"id":520422,"name":"普定县","pid":520400,"level":3},{"id":520423,"name":"镇宁布依族苗族自治县","pid":520400,"level":3},{"id":520424,"name":"关岭布依族苗族自治县","pid":520400,"level":3},{"id":520425,"name":"紫云苗族布依族自治县","pid":520400,"level":3}]},{"id":520500,"name":"毕节市","pid":520000,"level":2,"children":[{"id":520502,"name":"七星关区","pid":520500,"level":3},{"id":520521,"name":"大方县","pid":520500,"level":3},{"id":520522,"name":"黔西县","pid":520500,"level":3},{"id":520523,"name":"金沙县","pid":520500,"level":3},{"id":520524,"name":"织金县","pid":520500,"level":3},{"id":520525,"name":"纳雍县","pid":520500,"level":3},{"id":520526,"name":"威宁彝族回族苗族自治县","pid":520500,"level":3},{"id":520527,"name":"赫章县","pid":520500,"level":3}]},{"id":520600,"name":"铜仁市","pid":520000,"level":2,"children":[{"id":520602,"name":"碧江区","pid":520600,"level":3},{"id":520603,"name":"万山区","pid":520600,"level":3},{"id":520621,"name":"江口县","pid":520600,"level":3},{"id":520622,"name":"玉屏侗族自治县","pid":520600,"level":3},{"id":520623,"name":"石阡县","pid":520600,"level":3},{"id":520624,"name":"思南县","pid":520600,"level":3},{"id":520625,"name":"印江土家族苗族自治县","pid":520600,"level":3},{"id":520626,"name":"德江县","pid":520600,"level":3},{"id":520627,"name":"沿河土家族自治县","pid":520600,"level":3},{"id":520628,"name":"松桃苗族自治县","pid":520600,"level":3}]},{"id":522300,"name":"黔西南布依族苗族自治州","pid":520000,"level":2,"children":[{"id":522301,"name":"兴义市 ","pid":522300,"level":3},{"id":522322,"name":"兴仁县","pid":522300,"level":3},{"id":522323,"name":"普安县","pid":522300,"level":3},{"id":522324,"name":"晴隆县","pid":522300,"level":3},{"id":522325,"name":"贞丰县","pid":522300,"level":3},{"id":522326,"name":"望谟县","pid":522300,"level":3},{"id":522327,"name":"册亨县","pid":522300,"level":3},{"id":522328,"name":"安龙县","pid":522300,"level":3}]},{"id":522600,"name":"黔东南苗族侗族自治州","pid":520000,"level":2,"children":[{"id":522601,"name":"凯里市","pid":522600,"level":3},{"id":522622,"name":"黄平县","pid":522600,"level":3},{"id":522623,"name":"施秉县","pid":522600,"level":3},{"id":522624,"name":"三穗县","pid":522600,"level":3},{"id":522625,"name":"镇远县","pid":522600,"level":3},{"id":522626,"name":"岑巩县","pid":522600,"level":3},{"id":522627,"name":"天柱县","pid":522600,"level":3},{"id":522628,"name":"锦屏县","pid":522600,"level":3},{"id":522629,"name":"剑河县","pid":522600,"level":3},{"id":522630,"name":"台江县","pid":522600,"level":3},{"id":522631,"name":"黎平县","pid":522600,"level":3},{"id":522632,"name":"榕江县","pid":522600,"level":3},{"id":522633,"name":"从江县","pid":522600,"level":3},{"id":522634,"name":"雷山县","pid":522600,"level":3},{"id":522635,"name":"麻江县","pid":522600,"level":3},{"id":522636,"name":"丹寨县","pid":522600,"level":3}]},{"id":522700,"name":"黔南布依族苗族自治州","pid":520000,"level":2,"children":[{"id":522701,"name":"都匀市","pid":522700,"level":3},{"id":522702,"name":"福泉市","pid":522700,"level":3},{"id":522722,"name":"荔波县","pid":522700,"level":3},{"id":522723,"name":"贵定县","pid":522700,"level":3},{"id":522725,"name":"瓮安县","pid":522700,"level":3},{"id":522726,"name":"独山县","pid":522700,"level":3},{"id":522727,"name":"平塘县","pid":522700,"level":3},{"id":522728,"name":"罗甸县","pid":522700,"level":3},{"id":522729,"name":"长顺县","pid":522700,"level":3},{"id":522730,"name":"龙里县","pid":522700,"level":3},{"id":522731,"name":"惠水县","pid":522700,"level":3},{"id":522732,"name":"三都水族自治县","pid":522700,"level":3}]}]},{"id":530000,"name":"云南省","pid":100000,"level":1,"children":[{"id":530100,"name":"昆明市","pid":530000,"level":2,"children":[{"id":530102,"name":"五华区","pid":530100,"level":3},{"id":530103,"name":"盘龙区","pid":530100,"level":3},{"id":530111,"name":"官渡区","pid":530100,"level":3},{"id":530112,"name":"西山区","pid":530100,"level":3},{"id":530113,"name":"东川区","pid":530100,"level":3},{"id":530114,"name":"呈贡区","pid":530100,"level":3},{"id":530122,"name":"晋宁县","pid":530100,"level":3},{"id":530124,"name":"富民县","pid":530100,"level":3},{"id":530125,"name":"宜良县","pid":530100,"level":3},{"id":530126,"name":"石林彝族自治县","pid":530100,"level":3},{"id":530127,"name":"嵩明县","pid":530100,"level":3},{"id":530128,"name":"禄劝彝族苗族自治县","pid":530100,"level":3},{"id":530129,"name":"寻甸回族彝族自治县 ","pid":530100,"level":3},{"id":530181,"name":"安宁市","pid":530100,"level":3}]},{"id":530300,"name":"曲靖市","pid":530000,"level":2,"children":[{"id":530302,"name":"麒麟区","pid":530300,"level":3},{"id":530321,"name":"马龙县","pid":530300,"level":3},{"id":530322,"name":"陆良县","pid":530300,"level":3},{"id":530323,"name":"师宗县","pid":530300,"level":3},{"id":530324,"name":"罗平县","pid":530300,"level":3},{"id":530325,"name":"富源县","pid":530300,"level":3},{"id":530326,"name":"会泽县","pid":530300,"level":3},{"id":530328,"name":"沾益县","pid":530300,"level":3},{"id":530381,"name":"宣威市","pid":530300,"level":3}]},{"id":530400,"name":"玉溪市","pid":530000,"level":2,"children":[{"id":530402,"name":"红塔区","pid":530400,"level":3},{"id":530421,"name":"江川县","pid":530400,"level":3},{"id":530422,"name":"澄江县","pid":530400,"level":3},{"id":530423,"name":"通海县","pid":530400,"level":3},{"id":530424,"name":"华宁县","pid":530400,"level":3},{"id":530425,"name":"易门县","pid":530400,"level":3},{"id":530426,"name":"峨山彝族自治县","pid":530400,"level":3},{"id":530427,"name":"新平彝族傣族自治县","pid":530400,"level":3},{"id":530428,"name":"元江哈尼族彝族傣族自治县","pid":530400,"level":3}]},{"id":530500,"name":"保山市","pid":530000,"level":2,"children":[{"id":530502,"name":"隆阳区","pid":530500,"level":3},{"id":530521,"name":"施甸县","pid":530500,"level":3},{"id":530522,"name":"腾冲县","pid":530500,"level":3},{"id":530523,"name":"龙陵县","pid":530500,"level":3},{"id":530524,"name":"昌宁县","pid":530500,"level":3}]},{"id":530600,"name":"昭通市","pid":530000,"level":2,"children":[{"id":530602,"name":"昭阳区","pid":530600,"level":3},{"id":530621,"name":"鲁甸县","pid":530600,"level":3},{"id":530622,"name":"巧家县","pid":530600,"level":3},{"id":530623,"name":"盐津县","pid":530600,"level":3},{"id":530624,"name":"大关县","pid":530600,"level":3},{"id":530625,"name":"永善县","pid":530600,"level":3},{"id":530626,"name":"绥江县","pid":530600,"level":3},{"id":530627,"name":"镇雄县","pid":530600,"level":3},{"id":530628,"name":"彝良县","pid":530600,"level":3},{"id":530629,"name":"威信县","pid":530600,"level":3},{"id":530630,"name":"水富县","pid":530600,"level":3}]},{"id":530700,"name":"丽江市","pid":530000,"level":2,"children":[{"id":530702,"name":"古城区","pid":530700,"level":3},{"id":530721,"name":"玉龙纳西族自治县","pid":530700,"level":3},{"id":530722,"name":"永胜县","pid":530700,"level":3},{"id":530723,"name":"华坪县","pid":530700,"level":3},{"id":530724,"name":"宁蒗彝族自治县","pid":530700,"level":3}]},{"id":530800,"name":"普洱市","pid":530000,"level":2,"children":[{"id":530802,"name":"思茅区","pid":530800,"level":3},{"id":530821,"name":"宁洱哈尼族彝族自治县","pid":530800,"level":3},{"id":530822,"name":"墨江哈尼族自治县","pid":530800,"level":3},{"id":530823,"name":"景东彝族自治县","pid":530800,"level":3},{"id":530824,"name":"景谷傣族彝族自治县","pid":530800,"level":3},{"id":530825,"name":"镇沅彝族哈尼族拉祜族自治县","pid":530800,"level":3},{"id":530826,"name":"江城哈尼族彝族自治县","pid":530800,"level":3},{"id":530827,"name":"孟连傣族拉祜族佤族自治县","pid":530800,"level":3},{"id":530828,"name":"澜沧拉祜族自治县","pid":530800,"level":3},{"id":530829,"name":"西盟佤族自治县","pid":530800,"level":3}]},{"id":530900,"name":"临沧市","pid":530000,"level":2,"children":[{"id":530902,"name":"临翔区","pid":530900,"level":3},{"id":530921,"name":"凤庆县","pid":530900,"level":3},{"id":530922,"name":"云县","pid":530900,"level":3},{"id":530923,"name":"永德县","pid":530900,"level":3},{"id":530924,"name":"镇康县","pid":530900,"level":3},{"id":530925,"name":"双江拉祜族佤族布朗族傣族自治县","pid":530900,"level":3},{"id":530926,"name":"耿马傣族佤族自治县","pid":530900,"level":3},{"id":530927,"name":"沧源佤族自治县","pid":530900,"level":3}]},{"id":532300,"name":"楚雄彝族自治州","pid":530000,"level":2,"children":[{"id":532301,"name":"楚雄市","pid":532300,"level":3},{"id":532322,"name":"双柏县","pid":532300,"level":3},{"id":532323,"name":"牟定县","pid":532300,"level":3},{"id":532324,"name":"南华县","pid":532300,"level":3},{"id":532325,"name":"姚安县","pid":532300,"level":3},{"id":532326,"name":"大姚县","pid":532300,"level":3},{"id":532327,"name":"永仁县","pid":532300,"level":3},{"id":532328,"name":"元谋县","pid":532300,"level":3},{"id":532329,"name":"武定县","pid":532300,"level":3},{"id":532331,"name":"禄丰县","pid":532300,"level":3}]},{"id":532500,"name":"红河哈尼族彝族自治州","pid":530000,"level":2,"children":[{"id":532501,"name":"个旧市","pid":532500,"level":3},{"id":532502,"name":"开远市","pid":532500,"level":3},{"id":532503,"name":"蒙自市","pid":532500,"level":3},{"id":532504,"name":"弥勒市","pid":532500,"level":3},{"id":532523,"name":"屏边苗族自治县","pid":532500,"level":3},{"id":532524,"name":"建水县","pid":532500,"level":3},{"id":532525,"name":"石屏县","pid":532500,"level":3},{"id":532527,"name":"泸西县","pid":532500,"level":3},{"id":532528,"name":"元阳县","pid":532500,"level":3},{"id":532529,"name":"红河县","pid":532500,"level":3},{"id":532530,"name":"金平苗族瑶族傣族自治县","pid":532500,"level":3},{"id":532531,"name":"绿春县","pid":532500,"level":3},{"id":532532,"name":"河口瑶族自治县","pid":532500,"level":3}]},{"id":532600,"name":"文山壮族苗族自治州","pid":530000,"level":2,"children":[{"id":532601,"name":"文山市","pid":532600,"level":3},{"id":532622,"name":"砚山县","pid":532600,"level":3},{"id":532623,"name":"西畴县","pid":532600,"level":3},{"id":532624,"name":"麻栗坡县","pid":532600,"level":3},{"id":532625,"name":"马关县","pid":532600,"level":3},{"id":532626,"name":"丘北县","pid":532600,"level":3},{"id":532627,"name":"广南县","pid":532600,"level":3},{"id":532628,"name":"富宁县","pid":532600,"level":3}]},{"id":532800,"name":"西双版纳傣族自治州","pid":530000,"level":2,"children":[{"id":532801,"name":"景洪市","pid":532800,"level":3},{"id":532822,"name":"勐海县","pid":532800,"level":3},{"id":532823,"name":"勐腊县","pid":532800,"level":3}]},{"id":532900,"name":"大理白族自治州","pid":530000,"level":2,"children":[{"id":532901,"name":"大理市","pid":532900,"level":3},{"id":532922,"name":"漾濞彝族自治县","pid":532900,"level":3},{"id":532923,"name":"祥云县","pid":532900,"level":3},{"id":532924,"name":"宾川县","pid":532900,"level":3},{"id":532925,"name":"弥渡县","pid":532900,"level":3},{"id":532926,"name":"南涧彝族自治县","pid":532900,"level":3},{"id":532927,"name":"巍山彝族回族自治县","pid":532900,"level":3},{"id":532928,"name":"永平县","pid":532900,"level":3},{"id":532929,"name":"云龙县","pid":532900,"level":3},{"id":532930,"name":"洱源县","pid":532900,"level":3},{"id":532931,"name":"剑川县","pid":532900,"level":3},{"id":532932,"name":"鹤庆县","pid":532900,"level":3}]},{"id":533100,"name":"德宏傣族景颇族自治州","pid":530000,"level":2,"children":[{"id":533102,"name":"瑞丽市","pid":533100,"level":3},{"id":533103,"name":"芒市","pid":533100,"level":3},{"id":533122,"name":"梁河县","pid":533100,"level":3},{"id":533123,"name":"盈江县","pid":533100,"level":3},{"id":533124,"name":"陇川县","pid":533100,"level":3}]},{"id":533300,"name":"怒江傈僳族自治州","pid":530000,"level":2,"children":[{"id":533321,"name":"泸水县","pid":533300,"level":3},{"id":533323,"name":"福贡县","pid":533300,"level":3},{"id":533324,"name":"贡山独龙族怒族自治县","pid":533300,"level":3},{"id":533325,"name":"兰坪白族普米族自治县","pid":533300,"level":3}]},{"id":533400,"name":"迪庆藏族自治州","pid":530000,"level":2,"children":[{"id":533421,"name":"香格里拉市","pid":533400,"level":3},{"id":533422,"name":"德钦县","pid":533400,"level":3},{"id":533423,"name":"维西傈僳族自治县","pid":533400,"level":3}]}]},{"id":540000,"name":"西藏自治区","pid":100000,"level":1,"children":[{"id":540100,"name":"拉萨市","pid":540000,"level":2,"children":[{"id":540102,"name":"城关区","pid":540100,"level":3},{"id":540121,"name":"林周县","pid":540100,"level":3},{"id":540122,"name":"当雄县","pid":540100,"level":3},{"id":540123,"name":"尼木县","pid":540100,"level":3},{"id":540124,"name":"曲水县","pid":540100,"level":3},{"id":540125,"name":"堆龙德庆县","pid":540100,"level":3},{"id":540126,"name":"达孜县","pid":540100,"level":3},{"id":540127,"name":"墨竹工卡县","pid":540100,"level":3}]},{"id":540200,"name":"日喀则市","pid":540000,"level":2,"children":[{"id":540202,"name":"桑珠孜区","pid":540200,"level":3},{"id":540221,"name":"南木林县","pid":540200,"level":3},{"id":540222,"name":"江孜县","pid":540200,"level":3},{"id":540223,"name":"定日县","pid":540200,"level":3},{"id":540224,"name":"萨迦县","pid":540200,"level":3},{"id":540225,"name":"拉孜县","pid":540200,"level":3},{"id":540226,"name":"昂仁县","pid":540200,"level":3},{"id":540227,"name":"谢通门县","pid":540200,"level":3},{"id":540228,"name":"白朗县","pid":540200,"level":3},{"id":540229,"name":"仁布县","pid":540200,"level":3},{"id":540230,"name":"康马县","pid":540200,"level":3},{"id":540231,"name":"定结县","pid":540200,"level":3},{"id":540232,"name":"仲巴县","pid":540200,"level":3},{"id":540233,"name":"亚东县","pid":540200,"level":3},{"id":540234,"name":"吉隆县","pid":540200,"level":3},{"id":540235,"name":"聂拉木县","pid":540200,"level":3},{"id":540236,"name":"萨嘎县","pid":540200,"level":3},{"id":540237,"name":"岗巴县","pid":540200,"level":3}]},{"id":540300,"name":"昌都市","pid":540000,"level":2,"children":[{"id":540302,"name":"卡若区","pid":540300,"level":3},{"id":540321,"name":"江达县","pid":540300,"level":3},{"id":540322,"name":"贡觉县","pid":540300,"level":3},{"id":540323,"name":"类乌齐县","pid":540300,"level":3},{"id":540324,"name":"丁青县","pid":540300,"level":3},{"id":540325,"name":"察雅县","pid":540300,"level":3},{"id":540326,"name":"八宿县","pid":540300,"level":3},{"id":540327,"name":"左贡县","pid":540300,"level":3},{"id":540328,"name":"芒康县","pid":540300,"level":3},{"id":540329,"name":"洛隆县","pid":540300,"level":3},{"id":540330,"name":"边坝县","pid":540300,"level":3}]},{"id":542200,"name":"山南地区","pid":540000,"level":2,"children":[{"id":542221,"name":"乃东县","pid":542200,"level":3},{"id":542222,"name":"扎囊县","pid":542200,"level":3},{"id":542223,"name":"贡嘎县","pid":542200,"level":3},{"id":542224,"name":"桑日县","pid":542200,"level":3},{"id":542225,"name":"琼结县","pid":542200,"level":3},{"id":542226,"name":"曲松县","pid":542200,"level":3},{"id":542227,"name":"措美县","pid":542200,"level":3},{"id":542228,"name":"洛扎县","pid":542200,"level":3},{"id":542229,"name":"加查县","pid":542200,"level":3},{"id":542231,"name":"隆子县","pid":542200,"level":3},{"id":542232,"name":"错那县","pid":542200,"level":3},{"id":542233,"name":"浪卡子县","pid":542200,"level":3}]},{"id":542400,"name":"那曲地区","pid":540000,"level":2,"children":[{"id":542421,"name":"那曲县","pid":542400,"level":3},{"id":542422,"name":"嘉黎县","pid":542400,"level":3},{"id":542423,"name":"比如县","pid":542400,"level":3},{"id":542424,"name":"聂荣县","pid":542400,"level":3},{"id":542425,"name":"安多县","pid":542400,"level":3},{"id":542426,"name":"申扎县","pid":542400,"level":3},{"id":542427,"name":"索县","pid":542400,"level":3},{"id":542428,"name":"班戈县","pid":542400,"level":3},{"id":542429,"name":"巴青县","pid":542400,"level":3},{"id":542430,"name":"尼玛县","pid":542400,"level":3},{"id":542431,"name":"双湖县","pid":542400,"level":3}]},{"id":542500,"name":"阿里地区","pid":540000,"level":2,"children":[{"id":542521,"name":"普兰县","pid":542500,"level":3},{"id":542522,"name":"札达县","pid":542500,"level":3},{"id":542523,"name":"噶尔县","pid":542500,"level":3},{"id":542524,"name":"日土县","pid":542500,"level":3},{"id":542525,"name":"革吉县","pid":542500,"level":3},{"id":542526,"name":"改则县","pid":542500,"level":3},{"id":542527,"name":"措勤县","pid":542500,"level":3}]},{"id":542600,"name":"林芝地区","pid":540000,"level":2,"children":[{"id":542621,"name":"林芝县","pid":542600,"level":3},{"id":542622,"name":"工布江达县","pid":542600,"level":3},{"id":542623,"name":"米林县","pid":542600,"level":3},{"id":542624,"name":"墨脱县","pid":542600,"level":3},{"id":542625,"name":"波密县","pid":542600,"level":3},{"id":542626,"name":"察隅县","pid":542600,"level":3},{"id":542627,"name":"朗县","pid":542600,"level":3}]}]},{"id":610000,"name":"陕西省","pid":100000,"level":1,"children":[{"id":610100,"name":"西安市","pid":610000,"level":2,"children":[{"id":610102,"name":"新城区","pid":610100,"level":3},{"id":610103,"name":"碑林区","pid":610100,"level":3},{"id":610104,"name":"莲湖区","pid":610100,"level":3},{"id":610111,"name":"灞桥区","pid":610100,"level":3},{"id":610112,"name":"未央区","pid":610100,"level":3},{"id":610113,"name":"雁塔区","pid":610100,"level":3},{"id":610114,"name":"阎良区","pid":610100,"level":3},{"id":610115,"name":"临潼区","pid":610100,"level":3},{"id":610116,"name":"长安区","pid":610100,"level":3},{"id":610122,"name":"蓝田县","pid":610100,"level":3},{"id":610124,"name":"周至县","pid":610100,"level":3},{"id":610125,"name":"户县","pid":610100,"level":3},{"id":610126,"name":"高陵区","pid":610100,"level":3}]},{"id":610200,"name":"铜川市","pid":610000,"level":2,"children":[{"id":610202,"name":"王益区","pid":610200,"level":3},{"id":610203,"name":"印台区","pid":610200,"level":3},{"id":610204,"name":"耀州区","pid":610200,"level":3},{"id":610222,"name":"宜君县","pid":610200,"level":3}]},{"id":610300,"name":"宝鸡市","pid":610000,"level":2,"children":[{"id":610302,"name":"渭滨区","pid":610300,"level":3},{"id":610303,"name":"金台区","pid":610300,"level":3},{"id":610304,"name":"陈仓区","pid":610300,"level":3},{"id":610322,"name":"凤翔县","pid":610300,"level":3},{"id":610323,"name":"岐山县","pid":610300,"level":3},{"id":610324,"name":"扶风县","pid":610300,"level":3},{"id":610326,"name":"眉县","pid":610300,"level":3},{"id":610327,"name":"陇县","pid":610300,"level":3},{"id":610328,"name":"千阳县","pid":610300,"level":3},{"id":610329,"name":"麟游县","pid":610300,"level":3},{"id":610330,"name":"凤县","pid":610300,"level":3},{"id":610331,"name":"太白县","pid":610300,"level":3}]},{"id":610400,"name":"咸阳市","pid":610000,"level":2,"children":[{"id":610402,"name":"秦都区","pid":610400,"level":3},{"id":610403,"name":"杨陵区","pid":610400,"level":3},{"id":610404,"name":"渭城区","pid":610400,"level":3},{"id":610422,"name":"三原县","pid":610400,"level":3},{"id":610423,"name":"泾阳县","pid":610400,"level":3},{"id":610424,"name":"乾县","pid":610400,"level":3},{"id":610425,"name":"礼泉县","pid":610400,"level":3},{"id":610426,"name":"永寿县","pid":610400,"level":3},{"id":610427,"name":"彬县","pid":610400,"level":3},{"id":610428,"name":"长武县","pid":610400,"level":3},{"id":610429,"name":"旬邑县","pid":610400,"level":3},{"id":610430,"name":"淳化县","pid":610400,"level":3},{"id":610431,"name":"武功县","pid":610400,"level":3},{"id":610481,"name":"兴平市","pid":610400,"level":3}]},{"id":610500,"name":"渭南市","pid":610000,"level":2,"children":[{"id":610502,"name":"临渭区","pid":610500,"level":3},{"id":610521,"name":"华县","pid":610500,"level":3},{"id":610522,"name":"潼关县","pid":610500,"level":3},{"id":610523,"name":"大荔县","pid":610500,"level":3},{"id":610524,"name":"合阳县","pid":610500,"level":3},{"id":610525,"name":"澄城县","pid":610500,"level":3},{"id":610526,"name":"蒲城县","pid":610500,"level":3},{"id":610527,"name":"白水县","pid":610500,"level":3},{"id":610528,"name":"富平县","pid":610500,"level":3},{"id":610581,"name":"韩城市","pid":610500,"level":3},{"id":610582,"name":"华阴市","pid":610500,"level":3}]},{"id":610600,"name":"延安市","pid":610000,"level":2,"children":[{"id":610602,"name":"宝塔区","pid":610600,"level":3},{"id":610621,"name":"延长县","pid":610600,"level":3},{"id":610622,"name":"延川县","pid":610600,"level":3},{"id":610623,"name":"子长县","pid":610600,"level":3},{"id":610624,"name":"安塞县","pid":610600,"level":3},{"id":610625,"name":"志丹县","pid":610600,"level":3},{"id":610626,"name":"吴起县","pid":610600,"level":3},{"id":610627,"name":"甘泉县","pid":610600,"level":3},{"id":610628,"name":"富县","pid":610600,"level":3},{"id":610629,"name":"洛川县","pid":610600,"level":3},{"id":610630,"name":"宜川县","pid":610600,"level":3},{"id":610631,"name":"黄龙县","pid":610600,"level":3},{"id":610632,"name":"黄陵县","pid":610600,"level":3}]},{"id":610700,"name":"汉中市","pid":610000,"level":2,"children":[{"id":610702,"name":"汉台区","pid":610700,"level":3},{"id":610721,"name":"南郑县","pid":610700,"level":3},{"id":610722,"name":"城固县","pid":610700,"level":3},{"id":610723,"name":"洋县","pid":610700,"level":3},{"id":610724,"name":"西乡县","pid":610700,"level":3},{"id":610725,"name":"勉县","pid":610700,"level":3},{"id":610726,"name":"宁强县","pid":610700,"level":3},{"id":610727,"name":"略阳县","pid":610700,"level":3},{"id":610728,"name":"镇巴县","pid":610700,"level":3},{"id":610729,"name":"留坝县","pid":610700,"level":3},{"id":610730,"name":"佛坪县","pid":610700,"level":3}]},{"id":610800,"name":"榆林市","pid":610000,"level":2,"children":[{"id":610802,"name":"榆阳区","pid":610800,"level":3},{"id":610821,"name":"神木县","pid":610800,"level":3},{"id":610822,"name":"府谷县","pid":610800,"level":3},{"id":610823,"name":"横山县","pid":610800,"level":3},{"id":610824,"name":"靖边县","pid":610800,"level":3},{"id":610825,"name":"定边县","pid":610800,"level":3},{"id":610826,"name":"绥德县","pid":610800,"level":3},{"id":610827,"name":"米脂县","pid":610800,"level":3},{"id":610828,"name":"佳县","pid":610800,"level":3},{"id":610829,"name":"吴堡县","pid":610800,"level":3},{"id":610830,"name":"清涧县","pid":610800,"level":3},{"id":610831,"name":"子洲县","pid":610800,"level":3}]},{"id":610900,"name":"安康市","pid":610000,"level":2,"children":[{"id":610902,"name":"汉滨区","pid":610900,"level":3},{"id":610921,"name":"汉阴县","pid":610900,"level":3},{"id":610922,"name":"石泉县","pid":610900,"level":3},{"id":610923,"name":"宁陕县","pid":610900,"level":3},{"id":610924,"name":"紫阳县","pid":610900,"level":3},{"id":610925,"name":"岚皋县","pid":610900,"level":3},{"id":610926,"name":"平利县","pid":610900,"level":3},{"id":610927,"name":"镇坪县","pid":610900,"level":3},{"id":610928,"name":"旬阳县","pid":610900,"level":3},{"id":610929,"name":"白河县","pid":610900,"level":3}]},{"id":611000,"name":"商洛市","pid":610000,"level":2,"children":[{"id":611002,"name":"商州区","pid":611000,"level":3},{"id":611021,"name":"洛南县","pid":611000,"level":3},{"id":611022,"name":"丹凤县","pid":611000,"level":3},{"id":611023,"name":"商南县","pid":611000,"level":3},{"id":611024,"name":"山阳县","pid":611000,"level":3},{"id":611025,"name":"镇安县","pid":611000,"level":3},{"id":611026,"name":"柞水县","pid":611000,"level":3}]},{"id":611100,"name":"西咸新区","pid":610000,"level":2,"children":[{"id":611101,"name":"空港新城","pid":611100,"level":3},{"id":611102,"name":"沣东新城","pid":611100,"level":3},{"id":611103,"name":"秦汉新城","pid":611100,"level":3},{"id":611104,"name":"沣西新城","pid":611100,"level":3},{"id":611105,"name":"泾河新城","pid":611100,"level":3}]}]},{"id":620000,"name":"甘肃省","pid":100000,"level":1,"children":[{"id":620100,"name":"兰州市","pid":620000,"level":2,"children":[{"id":620102,"name":"城关区","pid":620100,"level":3},{"id":620103,"name":"七里河区","pid":620100,"level":3},{"id":620104,"name":"西固区","pid":620100,"level":3},{"id":620105,"name":"安宁区","pid":620100,"level":3},{"id":620111,"name":"红古区","pid":620100,"level":3},{"id":620121,"name":"永登县","pid":620100,"level":3},{"id":620122,"name":"皋兰县","pid":620100,"level":3},{"id":620123,"name":"榆中县","pid":620100,"level":3}]},{"id":620200,"name":"嘉峪关市","pid":620000,"level":2,"children":[{"id":620201,"name":"雄关区","pid":620200,"level":3},{"id":620202,"name":"长城区","pid":620200,"level":3},{"id":620203,"name":"镜铁区","pid":620200,"level":3}]},{"id":620300,"name":"金昌市","pid":620000,"level":2,"children":[{"id":620302,"name":"金川区","pid":620300,"level":3},{"id":620321,"name":"永昌县","pid":620300,"level":3}]},{"id":620400,"name":"白银市","pid":620000,"level":2,"children":[{"id":620402,"name":"白银区","pid":620400,"level":3},{"id":620403,"name":"平川区","pid":620400,"level":3},{"id":620421,"name":"靖远县","pid":620400,"level":3},{"id":620422,"name":"会宁县","pid":620400,"level":3},{"id":620423,"name":"景泰县","pid":620400,"level":3}]},{"id":620500,"name":"天水市","pid":620000,"level":2,"children":[{"id":620502,"name":"秦州区","pid":620500,"level":3},{"id":620503,"name":"麦积区","pid":620500,"level":3},{"id":620521,"name":"清水县","pid":620500,"level":3},{"id":620522,"name":"秦安县","pid":620500,"level":3},{"id":620523,"name":"甘谷县","pid":620500,"level":3},{"id":620524,"name":"武山县","pid":620500,"level":3},{"id":620525,"name":"张家川回族自治县","pid":620500,"level":3}]},{"id":620600,"name":"武威市","pid":620000,"level":2,"children":[{"id":620602,"name":"凉州区","pid":620600,"level":3},{"id":620621,"name":"民勤县","pid":620600,"level":3},{"id":620622,"name":"古浪县","pid":620600,"level":3},{"id":620623,"name":"天祝藏族自治县","pid":620600,"level":3}]},{"id":620700,"name":"张掖市","pid":620000,"level":2,"children":[{"id":620702,"name":"甘州区","pid":620700,"level":3},{"id":620721,"name":"肃南裕固族自治县","pid":620700,"level":3},{"id":620722,"name":"民乐县","pid":620700,"level":3},{"id":620723,"name":"临泽县","pid":620700,"level":3},{"id":620724,"name":"高台县","pid":620700,"level":3},{"id":620725,"name":"山丹县","pid":620700,"level":3}]},{"id":620800,"name":"平凉市","pid":620000,"level":2,"children":[{"id":620802,"name":"崆峒区","pid":620800,"level":3},{"id":620821,"name":"泾川县","pid":620800,"level":3},{"id":620822,"name":"灵台县","pid":620800,"level":3},{"id":620823,"name":"崇信县","pid":620800,"level":3},{"id":620824,"name":"华亭县","pid":620800,"level":3},{"id":620825,"name":"庄浪县","pid":620800,"level":3},{"id":620826,"name":"静宁县","pid":620800,"level":3}]},{"id":620900,"name":"酒泉市","pid":620000,"level":2,"children":[{"id":620902,"name":"肃州区","pid":620900,"level":3},{"id":620921,"name":"金塔县","pid":620900,"level":3},{"id":620922,"name":"瓜州县","pid":620900,"level":3},{"id":620923,"name":"肃北蒙古族自治县","pid":620900,"level":3},{"id":620924,"name":"阿克塞哈萨克族自治县","pid":620900,"level":3},{"id":620981,"name":"玉门市","pid":620900,"level":3},{"id":620982,"name":"敦煌市","pid":620900,"level":3}]},{"id":621000,"name":"庆阳市","pid":620000,"level":2,"children":[{"id":621002,"name":"西峰区","pid":621000,"level":3},{"id":621021,"name":"庆城县","pid":621000,"level":3},{"id":621022,"name":"环县","pid":621000,"level":3},{"id":621023,"name":"华池县","pid":621000,"level":3},{"id":621024,"name":"合水县","pid":621000,"level":3},{"id":621025,"name":"正宁县","pid":621000,"level":3},{"id":621026,"name":"宁县","pid":621000,"level":3},{"id":621027,"name":"镇原县","pid":621000,"level":3}]},{"id":621100,"name":"定西市","pid":620000,"level":2,"children":[{"id":621102,"name":"安定区","pid":621100,"level":3},{"id":621121,"name":"通渭县","pid":621100,"level":3},{"id":621122,"name":"陇西县","pid":621100,"level":3},{"id":621123,"name":"渭源县","pid":621100,"level":3},{"id":621124,"name":"临洮县","pid":621100,"level":3},{"id":621125,"name":"漳县","pid":621100,"level":3},{"id":621126,"name":"岷县","pid":621100,"level":3}]},{"id":621200,"name":"陇南市","pid":620000,"level":2,"children":[{"id":621202,"name":"武都区","pid":621200,"level":3},{"id":621221,"name":"成县","pid":621200,"level":3},{"id":621222,"name":"文县","pid":621200,"level":3},{"id":621223,"name":"宕昌县","pid":621200,"level":3},{"id":621224,"name":"康县","pid":621200,"level":3},{"id":621225,"name":"西和县","pid":621200,"level":3},{"id":621226,"name":"礼县","pid":621200,"level":3},{"id":621227,"name":"徽县","pid":621200,"level":3},{"id":621228,"name":"两当县","pid":621200,"level":3}]},{"id":622900,"name":"临夏回族自治州","pid":620000,"level":2,"children":[{"id":622901,"name":"临夏市","pid":622900,"level":3},{"id":622921,"name":"临夏县","pid":622900,"level":3},{"id":622922,"name":"康乐县","pid":622900,"level":3},{"id":622923,"name":"永靖县","pid":622900,"level":3},{"id":622924,"name":"广河县","pid":622900,"level":3},{"id":622925,"name":"和政县","pid":622900,"level":3},{"id":622926,"name":"东乡族自治县","pid":622900,"level":3},{"id":622927,"name":"积石山保安族东乡族撒拉族自治县","pid":622900,"level":3}]},{"id":623000,"name":"甘南藏族自治州","pid":620000,"level":2,"children":[{"id":623001,"name":"合作市","pid":623000,"level":3},{"id":623021,"name":"临潭县","pid":623000,"level":3},{"id":623022,"name":"卓尼县","pid":623000,"level":3},{"id":623023,"name":"舟曲县","pid":623000,"level":3},{"id":623024,"name":"迭部县","pid":623000,"level":3},{"id":623025,"name":"玛曲县","pid":623000,"level":3},{"id":623026,"name":"碌曲县","pid":623000,"level":3},{"id":623027,"name":"夏河县","pid":623000,"level":3}]}]},{"id":630000,"name":"青海省","pid":100000,"level":1,"children":[{"id":630100,"name":"西宁市","pid":630000,"level":2,"children":[{"id":630102,"name":"城东区","pid":630100,"level":3},{"id":630103,"name":"城中区","pid":630100,"level":3},{"id":630104,"name":"城西区","pid":630100,"level":3},{"id":630105,"name":"城北区","pid":630100,"level":3},{"id":630121,"name":"大通回族土族自治县","pid":630100,"level":3},{"id":630122,"name":"湟中县","pid":630100,"level":3},{"id":630123,"name":"湟源县","pid":630100,"level":3}]},{"id":630200,"name":"海东市","pid":630000,"level":2,"children":[{"id":630202,"name":"乐都区","pid":630200,"level":3},{"id":630221,"name":"平安县","pid":630200,"level":3},{"id":630222,"name":"民和回族土族自治县","pid":630200,"level":3},{"id":630223,"name":"互助土族自治县","pid":630200,"level":3},{"id":630224,"name":"化隆回族自治县","pid":630200,"level":3},{"id":630225,"name":"循化撒拉族自治县","pid":630200,"level":3}]},{"id":632200,"name":"海北藏族自治州","pid":630000,"level":2,"children":[{"id":632221,"name":"门源回族自治县","pid":632200,"level":3},{"id":632222,"name":"祁连县","pid":632200,"level":3},{"id":632223,"name":"海晏县","pid":632200,"level":3},{"id":632224,"name":"刚察县","pid":632200,"level":3}]},{"id":632300,"name":"黄南藏族自治州","pid":630000,"level":2,"children":[{"id":632321,"name":"同仁县","pid":632300,"level":3},{"id":632322,"name":"尖扎县","pid":632300,"level":3},{"id":632323,"name":"泽库县","pid":632300,"level":3},{"id":632324,"name":"河南蒙古族自治县","pid":632300,"level":3}]},{"id":632500,"name":"海南藏族自治州","pid":630000,"level":2,"children":[{"id":632521,"name":"共和县","pid":632500,"level":3},{"id":632522,"name":"同德县","pid":632500,"level":3},{"id":632523,"name":"贵德县","pid":632500,"level":3},{"id":632524,"name":"兴海县","pid":632500,"level":3},{"id":632525,"name":"贵南县","pid":632500,"level":3}]},{"id":632600,"name":"果洛藏族自治州","pid":630000,"level":2,"children":[{"id":632621,"name":"玛沁县","pid":632600,"level":3},{"id":632622,"name":"班玛县","pid":632600,"level":3},{"id":632623,"name":"甘德县","pid":632600,"level":3},{"id":632624,"name":"达日县","pid":632600,"level":3},{"id":632625,"name":"久治县","pid":632600,"level":3},{"id":632626,"name":"玛多县","pid":632600,"level":3}]},{"id":632700,"name":"玉树藏族自治州","pid":630000,"level":2,"children":[{"id":632701,"name":"玉树市","pid":632700,"level":3},{"id":632722,"name":"杂多县","pid":632700,"level":3},{"id":632723,"name":"称多县","pid":632700,"level":3},{"id":632724,"name":"治多县","pid":632700,"level":3},{"id":632725,"name":"囊谦县","pid":632700,"level":3},{"id":632726,"name":"曲麻莱县","pid":632700,"level":3}]},{"id":632800,"name":"海西蒙古族藏族自治州","pid":630000,"level":2,"children":[{"id":632801,"name":"格尔木市","pid":632800,"level":3},{"id":632802,"name":"德令哈市","pid":632800,"level":3},{"id":632821,"name":"乌兰县","pid":632800,"level":3},{"id":632822,"name":"都兰县","pid":632800,"level":3},{"id":632823,"name":"天峻县","pid":632800,"level":3}]}]},{"id":640000,"name":"宁夏回族自治区","pid":100000,"level":1,"children":[{"id":640100,"name":"银川市","pid":640000,"level":2,"children":[{"id":640104,"name":"兴庆区","pid":640100,"level":3},{"id":640105,"name":"西夏区","pid":640100,"level":3},{"id":640106,"name":"金凤区","pid":640100,"level":3},{"id":640121,"name":"永宁县","pid":640100,"level":3},{"id":640122,"name":"贺兰县","pid":640100,"level":3},{"id":640181,"name":"灵武市","pid":640100,"level":3}]},{"id":640200,"name":"石嘴山市","pid":640000,"level":2,"children":[{"id":640202,"name":"大武口区","pid":640200,"level":3},{"id":640205,"name":"惠农区","pid":640200,"level":3},{"id":640221,"name":"平罗县","pid":640200,"level":3}]},{"id":640300,"name":"吴忠市","pid":640000,"level":2,"children":[{"id":640302,"name":"利通区","pid":640300,"level":3},{"id":640303,"name":"红寺堡区","pid":640300,"level":3},{"id":640323,"name":"盐池县","pid":640300,"level":3},{"id":640324,"name":"同心县","pid":640300,"level":3},{"id":640381,"name":"青铜峡市","pid":640300,"level":3}]},{"id":640400,"name":"固原市","pid":640000,"level":2,"children":[{"id":640402,"name":"原州区","pid":640400,"level":3},{"id":640422,"name":"西吉县","pid":640400,"level":3},{"id":640423,"name":"隆德县","pid":640400,"level":3},{"id":640424,"name":"泾源县","pid":640400,"level":3},{"id":640425,"name":"彭阳县","pid":640400,"level":3}]},{"id":640500,"name":"中卫市","pid":640000,"level":2,"children":[{"id":640502,"name":"沙坡头区","pid":640500,"level":3},{"id":640521,"name":"中宁县","pid":640500,"level":3},{"id":640522,"name":"海原县","pid":640500,"level":3}]}]},{"id":650000,"name":"新疆维吾尔自治区","pid":100000,"level":1,"children":[{"id":650100,"name":"乌鲁木齐市","pid":650000,"level":2,"children":[{"id":650102,"name":"天山区","pid":650100,"level":3},{"id":650103,"name":"沙依巴克区","pid":650100,"level":3},{"id":650104,"name":"新市区","pid":650100,"level":3},{"id":650105,"name":"水磨沟区","pid":650100,"level":3},{"id":650106,"name":"头屯河区","pid":650100,"level":3},{"id":650107,"name":"达坂城区","pid":650100,"level":3},{"id":650109,"name":"米东区","pid":650100,"level":3},{"id":650121,"name":"乌鲁木齐县","pid":650100,"level":3}]},{"id":650200,"name":"克拉玛依市","pid":650000,"level":2,"children":[{"id":650202,"name":"独山子区","pid":650200,"level":3},{"id":650203,"name":"克拉玛依区","pid":650200,"level":3},{"id":650204,"name":"白碱滩区","pid":650200,"level":3},{"id":650205,"name":"乌尔禾区","pid":650200,"level":3}]},{"id":652100,"name":"吐鲁番地区","pid":650000,"level":2,"children":[{"id":652101,"name":"吐鲁番市","pid":652100,"level":3},{"id":652122,"name":"鄯善县","pid":652100,"level":3},{"id":652123,"name":"托克逊县","pid":652100,"level":3}]},{"id":652200,"name":"哈密地区","pid":650000,"level":2,"children":[{"id":652201,"name":"哈密市","pid":652200,"level":3},{"id":652222,"name":"巴里坤哈萨克自治县","pid":652200,"level":3},{"id":652223,"name":"伊吾县","pid":652200,"level":3}]},{"id":652300,"name":"昌吉回族自治州","pid":650000,"level":2,"children":[{"id":652301,"name":"昌吉市","pid":652300,"level":3},{"id":652302,"name":"阜康市","pid":652300,"level":3},{"id":652323,"name":"呼图壁县","pid":652300,"level":3},{"id":652324,"name":"玛纳斯县","pid":652300,"level":3},{"id":652325,"name":"奇台县","pid":652300,"level":3},{"id":652327,"name":"吉木萨尔县","pid":652300,"level":3},{"id":652328,"name":"木垒哈萨克自治县","pid":652300,"level":3}]},{"id":652700,"name":"博尔塔拉蒙古自治州","pid":650000,"level":2,"children":[{"id":652701,"name":"博乐市","pid":652700,"level":3},{"id":652702,"name":"阿拉山口市","pid":652700,"level":3},{"id":652722,"name":"精河县","pid":652700,"level":3},{"id":652723,"name":"温泉县","pid":652700,"level":3}]},{"id":652800,"name":"巴音郭楞蒙古自治州","pid":650000,"level":2,"children":[{"id":652801,"name":"库尔勒市","pid":652800,"level":3},{"id":652822,"name":"轮台县","pid":652800,"level":3},{"id":652823,"name":"尉犁县","pid":652800,"level":3},{"id":652824,"name":"若羌县","pid":652800,"level":3},{"id":652825,"name":"且末县","pid":652800,"level":3},{"id":652826,"name":"焉耆回族自治县","pid":652800,"level":3},{"id":652827,"name":"和静县","pid":652800,"level":3},{"id":652828,"name":"和硕县","pid":652800,"level":3},{"id":652829,"name":"博湖县","pid":652800,"level":3}]},{"id":652900,"name":"阿克苏地区","pid":650000,"level":2,"children":[{"id":652901,"name":"阿克苏市","pid":652900,"level":3},{"id":652922,"name":"温宿县","pid":652900,"level":3},{"id":652923,"name":"库车县","pid":652900,"level":3},{"id":652924,"name":"沙雅县","pid":652900,"level":3},{"id":652925,"name":"新和县","pid":652900,"level":3},{"id":652926,"name":"拜城县","pid":652900,"level":3},{"id":652927,"name":"乌什县","pid":652900,"level":3},{"id":652928,"name":"阿瓦提县","pid":652900,"level":3},{"id":652929,"name":"柯坪县","pid":652900,"level":3}]},{"id":653000,"name":"克孜勒苏柯尔克孜自治州","pid":650000,"level":2,"children":[{"id":653001,"name":"阿图什市","pid":653000,"level":3},{"id":653022,"name":"阿克陶县","pid":653000,"level":3},{"id":653023,"name":"阿合奇县","pid":653000,"level":3},{"id":653024,"name":"乌恰县","pid":653000,"level":3}]},{"id":653100,"name":"喀什地区","pid":650000,"level":2,"children":[{"id":653101,"name":"喀什市","pid":653100,"level":3},{"id":653121,"name":"疏附县","pid":653100,"level":3},{"id":653122,"name":"疏勒县","pid":653100,"level":3},{"id":653123,"name":"英吉沙县","pid":653100,"level":3},{"id":653124,"name":"泽普县","pid":653100,"level":3},{"id":653125,"name":"莎车县","pid":653100,"level":3},{"id":653126,"name":"叶城县","pid":653100,"level":3},{"id":653127,"name":"麦盖提县","pid":653100,"level":3},{"id":653128,"name":"岳普湖县","pid":653100,"level":3},{"id":653129,"name":"伽师县","pid":653100,"level":3},{"id":653130,"name":"巴楚县","pid":653100,"level":3},{"id":653131,"name":"塔什库尔干塔吉克自治县","pid":653100,"level":3}]},{"id":653200,"name":"和田地区","pid":650000,"level":2,"children":[{"id":653201,"name":"和田市","pid":653200,"level":3},{"id":653221,"name":"和田县","pid":653200,"level":3},{"id":653222,"name":"墨玉县","pid":653200,"level":3},{"id":653223,"name":"皮山县","pid":653200,"level":3},{"id":653224,"name":"洛浦县","pid":653200,"level":3},{"id":653225,"name":"策勒县","pid":653200,"level":3},{"id":653226,"name":"于田县","pid":653200,"level":3},{"id":653227,"name":"民丰县","pid":653200,"level":3}]},{"id":654000,"name":"伊犁哈萨克自治州","pid":650000,"level":2,"children":[{"id":654002,"name":"伊宁市","pid":654000,"level":3},{"id":654003,"name":"奎屯市","pid":654000,"level":3},{"id":654004,"name":"霍尔果斯市","pid":654000,"level":3},{"id":654021,"name":"伊宁县","pid":654000,"level":3},{"id":654022,"name":"察布查尔锡伯自治县","pid":654000,"level":3},{"id":654023,"name":"霍城县","pid":654000,"level":3},{"id":654024,"name":"巩留县","pid":654000,"level":3},{"id":654025,"name":"新源县","pid":654000,"level":3},{"id":654026,"name":"昭苏县","pid":654000,"level":3},{"id":654027,"name":"特克斯县","pid":654000,"level":3},{"id":654028,"name":"尼勒克县","pid":654000,"level":3}]},{"id":654200,"name":"塔城地区","pid":650000,"level":2,"children":[{"id":654201,"name":"塔城市","pid":654200,"level":3},{"id":654202,"name":"乌苏市","pid":654200,"level":3},{"id":654221,"name":"额敏县","pid":654200,"level":3},{"id":654223,"name":"沙湾县","pid":654200,"level":3},{"id":654224,"name":"托里县","pid":654200,"level":3},{"id":654225,"name":"裕民县","pid":654200,"level":3},{"id":654226,"name":"和布克赛尔蒙古自治县","pid":654200,"level":3}]},{"id":654300,"name":"阿勒泰地区","pid":650000,"level":2,"children":[{"id":654301,"name":"阿勒泰市","pid":654300,"level":3},{"id":654321,"name":"布尔津县","pid":654300,"level":3},{"id":654322,"name":"富蕴县","pid":654300,"level":3},{"id":654323,"name":"福海县","pid":654300,"level":3},{"id":654324,"name":"哈巴河县","pid":654300,"level":3},{"id":654325,"name":"青河县","pid":654300,"level":3},{"id":654326,"name":"吉木乃县","pid":654300,"level":3}]},{"id":659000,"name":"直辖县级","pid":650000,"level":2,"children":[{"id":659001,"name":"石河子市","pid":659000,"level":3},{"id":659002,"name":"阿拉尔市","pid":659000,"level":3},{"id":659003,"name":"图木舒克市","pid":659000,"level":3},{"id":659004,"name":"五家渠市","pid":659000,"level":3},{"id":659005,"name":"北屯市","pid":659000,"level":3},{"id":659006,"name":"铁门关市","pid":659000,"level":3},{"id":659007,"name":"双河市","pid":659000,"level":3}]}]},{"id":710000,"name":"台湾","pid":100000,"level":1,"children":[{"id":710100,"name":"台北市","pid":710000,"level":2,"children":[{"id":710101,"name":"松山区","pid":710100,"level":3},{"id":710102,"name":"信义区","pid":710100,"level":3},{"id":710103,"name":"大安区","pid":710100,"level":3},{"id":710104,"name":"中山区","pid":710100,"level":3},{"id":710105,"name":"中正区","pid":710100,"level":3},{"id":710106,"name":"大同区","pid":710100,"level":3},{"id":710107,"name":"万华区","pid":710100,"level":3},{"id":710108,"name":"文山区","pid":710100,"level":3},{"id":710109,"name":"南港区","pid":710100,"level":3},{"id":710110,"name":"内湖区","pid":710100,"level":3},{"id":710111,"name":"士林区","pid":710100,"level":3},{"id":710112,"name":"北投区","pid":710100,"level":3}]},{"id":710200,"name":"高雄市","pid":710000,"level":2,"children":[{"id":710201,"name":"盐埕区","pid":710200,"level":3},{"id":710202,"name":"鼓山区","pid":710200,"level":3},{"id":710203,"name":"左营区","pid":710200,"level":3},{"id":710204,"name":"楠梓区","pid":710200,"level":3},{"id":710205,"name":"三民区","pid":710200,"level":3},{"id":710206,"name":"新兴区","pid":710200,"level":3},{"id":710207,"name":"前金区","pid":710200,"level":3},{"id":710208,"name":"苓雅区","pid":710200,"level":3},{"id":710209,"name":"前镇区","pid":710200,"level":3},{"id":710210,"name":"旗津区","pid":710200,"level":3},{"id":710211,"name":"小港区","pid":710200,"level":3},{"id":710212,"name":"凤山区","pid":710200,"level":3},{"id":710213,"name":"林园区","pid":710200,"level":3},{"id":710214,"name":"大寮区","pid":710200,"level":3},{"id":710215,"name":"大树区","pid":710200,"level":3},{"id":710216,"name":"大社区","pid":710200,"level":3},{"id":710217,"name":"仁武区","pid":710200,"level":3},{"id":710218,"name":"鸟松区","pid":710200,"level":3},{"id":710219,"name":"冈山区","pid":710200,"level":3},{"id":710220,"name":"桥头区","pid":710200,"level":3},{"id":710221,"name":"燕巢区","pid":710200,"level":3},{"id":710222,"name":"田寮区","pid":710200,"level":3},{"id":710223,"name":"阿莲区","pid":710200,"level":3},{"id":710224,"name":"路竹区","pid":710200,"level":3},{"id":710225,"name":"湖内区","pid":710200,"level":3},{"id":710226,"name":"茄萣区","pid":710200,"level":3},{"id":710227,"name":"永安区","pid":710200,"level":3},{"id":710228,"name":"弥陀区","pid":710200,"level":3},{"id":710229,"name":"梓官区","pid":710200,"level":3},{"id":710230,"name":"旗山区","pid":710200,"level":3},{"id":710231,"name":"美浓区","pid":710200,"level":3},{"id":710232,"name":"六龟区","pid":710200,"level":3},{"id":710233,"name":"甲仙区","pid":710200,"level":3},{"id":710234,"name":"杉林区","pid":710200,"level":3},{"id":710235,"name":"内门区","pid":710200,"level":3},{"id":710236,"name":"茂林区","pid":710200,"level":3},{"id":710237,"name":"桃源区","pid":710200,"level":3},{"id":710238,"name":"那玛夏区","pid":710200,"level":3}]},{"id":710300,"name":"基隆市","pid":710000,"level":2,"children":[{"id":710301,"name":"中正区","pid":710300,"level":3},{"id":710302,"name":"七堵区","pid":710300,"level":3},{"id":710303,"name":"暖暖区","pid":710300,"level":3},{"id":710304,"name":"仁爱区","pid":710300,"level":3},{"id":710305,"name":"中山区","pid":710300,"level":3},{"id":710306,"name":"安乐区","pid":710300,"level":3},{"id":710307,"name":"信义区","pid":710300,"level":3}]},{"id":710400,"name":"台中市","pid":710000,"level":2,"children":[{"id":710401,"name":"中区","pid":710400,"level":3},{"id":710402,"name":"东区","pid":710400,"level":3},{"id":710403,"name":"南区","pid":710400,"level":3},{"id":710404,"name":"西区","pid":710400,"level":3},{"id":710405,"name":"北区","pid":710400,"level":3},{"id":710406,"name":"西屯区","pid":710400,"level":3},{"id":710407,"name":"南屯区","pid":710400,"level":3},{"id":710408,"name":"北屯区","pid":710400,"level":3},{"id":710409,"name":"丰原区","pid":710400,"level":3},{"id":710410,"name":"东势区","pid":710400,"level":3},{"id":710411,"name":"大甲区","pid":710400,"level":3},{"id":710412,"name":"清水区","pid":710400,"level":3},{"id":710413,"name":"沙鹿区","pid":710400,"level":3},{"id":710414,"name":"梧栖区","pid":710400,"level":3},{"id":710415,"name":"后里区","pid":710400,"level":3},{"id":710416,"name":"神冈区","pid":710400,"level":3},{"id":710417,"name":"潭子区","pid":710400,"level":3},{"id":710418,"name":"大雅区","pid":710400,"level":3},{"id":710419,"name":"新社区","pid":710400,"level":3},{"id":710420,"name":"石冈区","pid":710400,"level":3},{"id":710421,"name":"外埔区","pid":710400,"level":3},{"id":710422,"name":"大安区","pid":710400,"level":3},{"id":710423,"name":"乌日区","pid":710400,"level":3},{"id":710424,"name":"大肚区","pid":710400,"level":3},{"id":710425,"name":"龙井区","pid":710400,"level":3},{"id":710426,"name":"雾峰区","pid":710400,"level":3},{"id":710427,"name":"太平区","pid":710400,"level":3},{"id":710428,"name":"大里区","pid":710400,"level":3},{"id":710429,"name":"和平区","pid":710400,"level":3}]},{"id":710500,"name":"台南市","pid":710000,"level":2,"children":[{"id":710501,"name":"东区","pid":710500,"level":3},{"id":710502,"name":"南区","pid":710500,"level":3},{"id":710504,"name":"北区","pid":710500,"level":3},{"id":710506,"name":"安南区","pid":710500,"level":3},{"id":710507,"name":"安平区","pid":710500,"level":3},{"id":710508,"name":"中西区","pid":710500,"level":3},{"id":710509,"name":"新营区","pid":710500,"level":3},{"id":710510,"name":"盐水区","pid":710500,"level":3},{"id":710511,"name":"白河区","pid":710500,"level":3},{"id":710512,"name":"柳营区","pid":710500,"level":3},{"id":710513,"name":"后壁区","pid":710500,"level":3},{"id":710514,"name":"东山区","pid":710500,"level":3},{"id":710515,"name":"麻豆区","pid":710500,"level":3},{"id":710516,"name":"下营区","pid":710500,"level":3},{"id":710517,"name":"六甲区","pid":710500,"level":3},{"id":710518,"name":"官田区","pid":710500,"level":3},{"id":710519,"name":"大内区","pid":710500,"level":3},{"id":710520,"name":"佳里区","pid":710500,"level":3},{"id":710521,"name":"学甲区","pid":710500,"level":3},{"id":710522,"name":"西港区","pid":710500,"level":3},{"id":710523,"name":"七股区","pid":710500,"level":3},{"id":710524,"name":"将军区","pid":710500,"level":3},{"id":710525,"name":"北门区","pid":710500,"level":3},{"id":710526,"name":"新化区","pid":710500,"level":3},{"id":710527,"name":"善化区","pid":710500,"level":3},{"id":710528,"name":"新市区","pid":710500,"level":3},{"id":710529,"name":"安定区","pid":710500,"level":3},{"id":710530,"name":"山上区","pid":710500,"level":3},{"id":710531,"name":"玉井区","pid":710500,"level":3},{"id":710532,"name":"楠西区","pid":710500,"level":3},{"id":710533,"name":"南化区","pid":710500,"level":3},{"id":710534,"name":"左镇区","pid":710500,"level":3},{"id":710535,"name":"仁德区","pid":710500,"level":3},{"id":710536,"name":"归仁区","pid":710500,"level":3},{"id":710537,"name":"关庙区","pid":710500,"level":3},{"id":710538,"name":"龙崎区","pid":710500,"level":3},{"id":710539,"name":"永康区","pid":710500,"level":3}]},{"id":710600,"name":"新竹市","pid":710000,"level":2,"children":[{"id":710601,"name":"东区","pid":710600,"level":3},{"id":710602,"name":"北区","pid":710600,"level":3},{"id":710603,"name":"香山区","pid":710600,"level":3}]},{"id":710700,"name":"嘉义市","pid":710000,"level":2,"children":[{"id":710701,"name":"东区","pid":710700,"level":3},{"id":710702,"name":"西区","pid":710700,"level":3}]},{"id":710800,"name":"新北市","pid":710000,"level":2,"children":[{"id":710801,"name":"板桥区","pid":710800,"level":3},{"id":710802,"name":"三重区","pid":710800,"level":3},{"id":710803,"name":"中和区","pid":710800,"level":3},{"id":710804,"name":"永和区","pid":710800,"level":3},{"id":710805,"name":"新庄区","pid":710800,"level":3},{"id":710806,"name":"新店区","pid":710800,"level":3},{"id":710807,"name":"树林区","pid":710800,"level":3},{"id":710808,"name":"莺歌区","pid":710800,"level":3},{"id":710809,"name":"三峡区","pid":710800,"level":3},{"id":710810,"name":"淡水区","pid":710800,"level":3},{"id":710811,"name":"汐止区","pid":710800,"level":3},{"id":710812,"name":"瑞芳区","pid":710800,"level":3},{"id":710813,"name":"土城区","pid":710800,"level":3},{"id":710814,"name":"芦洲区","pid":710800,"level":3},{"id":710815,"name":"五股区","pid":710800,"level":3},{"id":710816,"name":"泰山区","pid":710800,"level":3},{"id":710817,"name":"林口区","pid":710800,"level":3},{"id":710818,"name":"深坑区","pid":710800,"level":3},{"id":710819,"name":"石碇区","pid":710800,"level":3},{"id":710820,"name":"坪林区","pid":710800,"level":3},{"id":710821,"name":"三芝区","pid":710800,"level":3},{"id":710822,"name":"石门区","pid":710800,"level":3},{"id":710823,"name":"八里区","pid":710800,"level":3},{"id":710824,"name":"平溪区","pid":710800,"level":3},{"id":710825,"name":"双溪区","pid":710800,"level":3},{"id":710826,"name":"贡寮区","pid":710800,"level":3},{"id":710827,"name":"金山区","pid":710800,"level":3},{"id":710828,"name":"万里区","pid":710800,"level":3},{"id":710829,"name":"乌来区","pid":710800,"level":3}]},{"id":712200,"name":"宜兰县","pid":710000,"level":2,"children":[{"id":712201,"name":"宜兰市","pid":712200,"level":3},{"id":712221,"name":"罗东镇","pid":712200,"level":3},{"id":712222,"name":"苏澳镇","pid":712200,"level":3},{"id":712223,"name":"头城镇","pid":712200,"level":3},{"id":712224,"name":"礁溪乡","pid":712200,"level":3},{"id":712225,"name":"壮围乡","pid":712200,"level":3},{"id":712226,"name":"员山乡","pid":712200,"level":3},{"id":712227,"name":"冬山乡","pid":712200,"level":3},{"id":712228,"name":"五结乡","pid":712200,"level":3},{"id":712229,"name":"三星乡","pid":712200,"level":3},{"id":712230,"name":"大同乡","pid":712200,"level":3},{"id":712231,"name":"南澳乡","pid":712200,"level":3}]},{"id":712300,"name":"桃园县","pid":710000,"level":2,"children":[{"id":712301,"name":"桃园市","pid":712300,"level":3},{"id":712302,"name":"中坜市","pid":712300,"level":3},{"id":712303,"name":"平镇市","pid":712300,"level":3},{"id":712304,"name":"八德市","pid":712300,"level":3},{"id":712305,"name":"杨梅市","pid":712300,"level":3},{"id":712306,"name":"芦竹市","pid":712300,"level":3},{"id":712321,"name":"大溪镇","pid":712300,"level":3},{"id":712324,"name":"大园乡","pid":712300,"level":3},{"id":712325,"name":"龟山乡","pid":712300,"level":3},{"id":712327,"name":"龙潭乡","pid":712300,"level":3},{"id":712329,"name":"新屋乡","pid":712300,"level":3},{"id":712330,"name":"观音乡","pid":712300,"level":3},{"id":712331,"name":"复兴乡","pid":712300,"level":3}]},{"id":712400,"name":"新竹县","pid":710000,"level":2,"children":[{"id":712401,"name":"竹北市","pid":712400,"level":3},{"id":712421,"name":"竹东镇","pid":712400,"level":3},{"id":712422,"name":"新埔镇","pid":712400,"level":3},{"id":712423,"name":"关西镇","pid":712400,"level":3},{"id":712424,"name":"湖口乡","pid":712400,"level":3},{"id":712425,"name":"新丰乡","pid":712400,"level":3},{"id":712426,"name":"芎林乡","pid":712400,"level":3},{"id":712427,"name":"横山乡","pid":712400,"level":3},{"id":712428,"name":"北埔乡","pid":712400,"level":3},{"id":712429,"name":"宝山乡","pid":712400,"level":3},{"id":712430,"name":"峨眉乡","pid":712400,"level":3},{"id":712431,"name":"尖石乡","pid":712400,"level":3},{"id":712432,"name":"五峰乡","pid":712400,"level":3}]},{"id":712500,"name":"苗栗县","pid":710000,"level":2,"children":[{"id":712501,"name":"苗栗市","pid":712500,"level":3},{"id":712521,"name":"苑里镇","pid":712500,"level":3},{"id":712522,"name":"通霄镇","pid":712500,"level":3},{"id":712523,"name":"竹南镇","pid":712500,"level":3},{"id":712524,"name":"头份镇","pid":712500,"level":3},{"id":712525,"name":"后龙镇","pid":712500,"level":3},{"id":712526,"name":"卓兰镇","pid":712500,"level":3},{"id":712527,"name":"大湖乡","pid":712500,"level":3},{"id":712528,"name":"公馆乡","pid":712500,"level":3},{"id":712529,"name":"铜锣乡","pid":712500,"level":3},{"id":712530,"name":"南庄乡","pid":712500,"level":3},{"id":712531,"name":"头屋乡","pid":712500,"level":3},{"id":712532,"name":"三义乡","pid":712500,"level":3},{"id":712533,"name":"西湖乡","pid":712500,"level":3},{"id":712534,"name":"造桥乡","pid":712500,"level":3},{"id":712535,"name":"三湾乡","pid":712500,"level":3},{"id":712536,"name":"狮潭乡","pid":712500,"level":3},{"id":712537,"name":"泰安乡","pid":712500,"level":3}]},{"id":712700,"name":"彰化县","pid":710000,"level":2,"children":[{"id":712701,"name":"彰化市","pid":712700,"level":3},{"id":712721,"name":"鹿港镇","pid":712700,"level":3},{"id":712722,"name":"和美镇","pid":712700,"level":3},{"id":712723,"name":"线西乡","pid":712700,"level":3},{"id":712724,"name":"伸港乡","pid":712700,"level":3},{"id":712725,"name":"福兴乡","pid":712700,"level":3},{"id":712726,"name":"秀水乡","pid":712700,"level":3},{"id":712727,"name":"花坛乡","pid":712700,"level":3},{"id":712728,"name":"芬园乡","pid":712700,"level":3},{"id":712729,"name":"员林镇","pid":712700,"level":3},{"id":712730,"name":"溪湖镇","pid":712700,"level":3},{"id":712731,"name":"田中镇","pid":712700,"level":3},{"id":712732,"name":"大村乡","pid":712700,"level":3},{"id":712733,"name":"埔盐乡","pid":712700,"level":3},{"id":712734,"name":"埔心乡","pid":712700,"level":3},{"id":712735,"name":"永靖乡","pid":712700,"level":3},{"id":712736,"name":"社头乡","pid":712700,"level":3},{"id":712737,"name":"二水乡","pid":712700,"level":3},{"id":712738,"name":"北斗镇","pid":712700,"level":3},{"id":712739,"name":"二林镇","pid":712700,"level":3},{"id":712740,"name":"田尾乡","pid":712700,"level":3},{"id":712741,"name":"埤头乡","pid":712700,"level":3},{"id":712742,"name":"芳苑乡","pid":712700,"level":3},{"id":712743,"name":"大城乡","pid":712700,"level":3},{"id":712744,"name":"竹塘乡","pid":712700,"level":3},{"id":712745,"name":"溪州乡","pid":712700,"level":3}]},{"id":712800,"name":"南投县","pid":710000,"level":2,"children":[{"id":712801,"name":"南投市","pid":712800,"level":3},{"id":712821,"name":"埔里镇","pid":712800,"level":3},{"id":712822,"name":"草屯镇","pid":712800,"level":3},{"id":712823,"name":"竹山镇","pid":712800,"level":3},{"id":712824,"name":"集集镇","pid":712800,"level":3},{"id":712825,"name":"名间乡","pid":712800,"level":3},{"id":712826,"name":"鹿谷乡","pid":712800,"level":3},{"id":712827,"name":"中寮乡","pid":712800,"level":3},{"id":712828,"name":"鱼池乡","pid":712800,"level":3},{"id":712829,"name":"国姓乡","pid":712800,"level":3},{"id":712830,"name":"水里乡","pid":712800,"level":3},{"id":712831,"name":"信义乡","pid":712800,"level":3},{"id":712832,"name":"仁爱乡","pid":712800,"level":3}]},{"id":712900,"name":"云林县","pid":710000,"level":2,"children":[{"id":712901,"name":"斗六市","pid":712900,"level":3},{"id":712921,"name":"斗南镇","pid":712900,"level":3},{"id":712922,"name":"虎尾镇","pid":712900,"level":3},{"id":712923,"name":"西螺镇","pid":712900,"level":3},{"id":712924,"name":"土库镇","pid":712900,"level":3},{"id":712925,"name":"北港镇","pid":712900,"level":3},{"id":712926,"name":"古坑乡","pid":712900,"level":3},{"id":712927,"name":"大埤乡","pid":712900,"level":3},{"id":712928,"name":"莿桐乡","pid":712900,"level":3},{"id":712929,"name":"林内乡","pid":712900,"level":3},{"id":712930,"name":"二仑乡","pid":712900,"level":3},{"id":712931,"name":"仑背乡","pid":712900,"level":3},{"id":712932,"name":"麦寮乡","pid":712900,"level":3},{"id":712933,"name":"东势乡","pid":712900,"level":3},{"id":712934,"name":"褒忠乡","pid":712900,"level":3},{"id":712935,"name":"台西乡","pid":712900,"level":3},{"id":712936,"name":"元长乡","pid":712900,"level":3},{"id":712937,"name":"四湖乡","pid":712900,"level":3},{"id":712938,"name":"口湖乡","pid":712900,"level":3},{"id":712939,"name":"水林乡","pid":712900,"level":3}]},{"id":713000,"name":"嘉义县","pid":710000,"level":2,"children":[{"id":713001,"name":"太保市","pid":713000,"level":3},{"id":713002,"name":"朴子市","pid":713000,"level":3},{"id":713023,"name":"布袋镇","pid":713000,"level":3},{"id":713024,"name":"大林镇","pid":713000,"level":3},{"id":713025,"name":"民雄乡","pid":713000,"level":3},{"id":713026,"name":"溪口乡","pid":713000,"level":3},{"id":713027,"name":"新港乡","pid":713000,"level":3},{"id":713028,"name":"六脚乡","pid":713000,"level":3},{"id":713029,"name":"东石乡","pid":713000,"level":3},{"id":713030,"name":"义竹乡","pid":713000,"level":3},{"id":713031,"name":"鹿草乡","pid":713000,"level":3},{"id":713032,"name":"水上乡","pid":713000,"level":3},{"id":713033,"name":"中埔乡","pid":713000,"level":3},{"id":713034,"name":"竹崎乡","pid":713000,"level":3},{"id":713035,"name":"梅山乡","pid":713000,"level":3},{"id":713036,"name":"番路乡","pid":713000,"level":3},{"id":713037,"name":"大埔乡","pid":713000,"level":3},{"id":713038,"name":"阿里山乡","pid":713000,"level":3}]},{"id":713300,"name":"屏东县","pid":710000,"level":2,"children":[{"id":713301,"name":"屏东市","pid":713300,"level":3},{"id":713321,"name":"潮州镇","pid":713300,"level":3},{"id":713322,"name":"东港镇","pid":713300,"level":3},{"id":713323,"name":"恒春镇","pid":713300,"level":3},{"id":713324,"name":"万丹乡","pid":713300,"level":3},{"id":713325,"name":"长治乡","pid":713300,"level":3},{"id":713326,"name":"麟洛乡","pid":713300,"level":3},{"id":713327,"name":"九如乡","pid":713300,"level":3},{"id":713328,"name":"里港乡","pid":713300,"level":3},{"id":713329,"name":"盐埔乡","pid":713300,"level":3},{"id":713330,"name":"高树乡","pid":713300,"level":3},{"id":713331,"name":"万峦乡","pid":713300,"level":3},{"id":713332,"name":"内埔乡","pid":713300,"level":3},{"id":713333,"name":"竹田乡","pid":713300,"level":3},{"id":713334,"name":"新埤乡","pid":713300,"level":3},{"id":713335,"name":"枋寮乡","pid":713300,"level":3},{"id":713336,"name":"新园乡","pid":713300,"level":3},{"id":713337,"name":"崁顶乡","pid":713300,"level":3},{"id":713338,"name":"林边乡","pid":713300,"level":3},{"id":713339,"name":"南州乡","pid":713300,"level":3},{"id":713340,"name":"佳冬乡","pid":713300,"level":3},{"id":713341,"name":"琉球乡","pid":713300,"level":3},{"id":713342,"name":"车城乡","pid":713300,"level":3},{"id":713343,"name":"满州乡","pid":713300,"level":3},{"id":713344,"name":"枋山乡","pid":713300,"level":3},{"id":713345,"name":"三地门乡","pid":713300,"level":3},{"id":713346,"name":"雾台乡","pid":713300,"level":3},{"id":713347,"name":"玛家乡","pid":713300,"level":3},{"id":713348,"name":"泰武乡","pid":713300,"level":3},{"id":713349,"name":"来义乡","pid":713300,"level":3},{"id":713350,"name":"春日乡","pid":713300,"level":3},{"id":713351,"name":"狮子乡","pid":713300,"level":3},{"id":713352,"name":"牡丹乡","pid":713300,"level":3}]},{"id":713400,"name":"台东县","pid":710000,"level":2,"children":[{"id":713401,"name":"台东市","pid":713400,"level":3},{"id":713421,"name":"成功镇","pid":713400,"level":3},{"id":713422,"name":"关山镇","pid":713400,"level":3},{"id":713423,"name":"卑南乡","pid":713400,"level":3},{"id":713424,"name":"鹿野乡","pid":713400,"level":3},{"id":713425,"name":"池上乡","pid":713400,"level":3},{"id":713426,"name":"东河乡","pid":713400,"level":3},{"id":713427,"name":"长滨乡","pid":713400,"level":3},{"id":713428,"name":"太麻里乡","pid":713400,"level":3},{"id":713429,"name":"大武乡","pid":713400,"level":3},{"id":713430,"name":"绿岛乡","pid":713400,"level":3},{"id":713431,"name":"海端乡","pid":713400,"level":3},{"id":713432,"name":"延平乡","pid":713400,"level":3},{"id":713433,"name":"金峰乡","pid":713400,"level":3},{"id":713434,"name":"达仁乡","pid":713400,"level":3},{"id":713435,"name":"兰屿乡","pid":713400,"level":3}]},{"id":713500,"name":"花莲县","pid":710000,"level":2,"children":[{"id":713501,"name":"花莲市","pid":713500,"level":3},{"id":713521,"name":"凤林镇","pid":713500,"level":3},{"id":713522,"name":"玉里镇","pid":713500,"level":3},{"id":713523,"name":"新城乡","pid":713500,"level":3},{"id":713524,"name":"吉安乡","pid":713500,"level":3},{"id":713525,"name":"寿丰乡","pid":713500,"level":3},{"id":713526,"name":"光复乡","pid":713500,"level":3},{"id":713527,"name":"丰滨乡","pid":713500,"level":3},{"id":713528,"name":"瑞穗乡","pid":713500,"level":3},{"id":713529,"name":"富里乡","pid":713500,"level":3},{"id":713530,"name":"秀林乡","pid":713500,"level":3},{"id":713531,"name":"万荣乡","pid":713500,"level":3},{"id":713532,"name":"卓溪乡","pid":713500,"level":3}]},{"id":713600,"name":"澎湖县","pid":710000,"level":2,"children":[{"id":713601,"name":"马公市","pid":713600,"level":3},{"id":713621,"name":"湖西乡","pid":713600,"level":3},{"id":713622,"name":"白沙乡","pid":713600,"level":3},{"id":713623,"name":"西屿乡","pid":713600,"level":3},{"id":713624,"name":"望安乡","pid":713600,"level":3},{"id":713625,"name":"七美乡","pid":713600,"level":3}]},{"id":713700,"name":"金门县","pid":710000,"level":2,"children":[{"id":713701,"name":"金城镇","pid":713700,"level":3},{"id":713702,"name":"金湖镇","pid":713700,"level":3},{"id":713703,"name":"金沙镇","pid":713700,"level":3},{"id":713704,"name":"金宁乡","pid":713700,"level":3},{"id":713705,"name":"烈屿乡","pid":713700,"level":3},{"id":713706,"name":"乌丘乡","pid":713700,"level":3}]},{"id":713800,"name":"连江县","pid":710000,"level":2,"children":[{"id":713801,"name":"南竿乡","pid":713800,"level":3},{"id":713802,"name":"北竿乡","pid":713800,"level":3},{"id":713803,"name":"莒光乡","pid":713800,"level":3},{"id":713804,"name":"东引乡","pid":713800,"level":3}]}]},{"id":810000,"name":"香港特别行政区","pid":100000,"level":1,"children":[{"id":810100,"name":"香港岛","pid":810000,"level":2,"children":[{"id":810101,"name":"中西区","pid":810100,"level":3},{"id":810102,"name":"湾仔区","pid":810100,"level":3},{"id":810103,"name":"东区","pid":810100,"level":3},{"id":810104,"name":"南区","pid":810100,"level":3}]},{"id":810200,"name":"九龙","pid":810000,"level":2,"children":[{"id":810201,"name":"油尖旺区","pid":810200,"level":3},{"id":810202,"name":"深水埗区","pid":810200,"level":3},{"id":810203,"name":"九龙城区","pid":810200,"level":3},{"id":810204,"name":"黄大仙区","pid":810200,"level":3},{"id":810205,"name":"观塘区","pid":810200,"level":3}]},{"id":810300,"name":"新界","pid":810000,"level":2,"children":[{"id":810301,"name":"荃湾区","pid":810300,"level":3},{"id":810302,"name":"屯门区","pid":810300,"level":3},{"id":810303,"name":"元朗区","pid":810300,"level":3},{"id":810304,"name":"北区","pid":810300,"level":3},{"id":810305,"name":"大埔区","pid":810300,"level":3},{"id":810306,"name":"西贡区","pid":810300,"level":3},{"id":810307,"name":"沙田区","pid":810300,"level":3},{"id":810308,"name":"葵青区","pid":810300,"level":3},{"id":810309,"name":"离岛区","pid":810300,"level":3}]}]},{"id":820000,"name":"澳门特别行政区","pid":100000,"level":1,"children":[{"id":820100,"name":"澳门半岛","pid":820000,"level":2,"children":[{"id":820101,"name":"花地玛堂区","pid":820100,"level":3},{"id":820102,"name":"圣安多尼堂区","pid":820100,"level":3},{"id":820103,"name":"大堂区","pid":820100,"level":3},{"id":820104,"name":"望德堂区","pid":820100,"level":3},{"id":820105,"name":"风顺堂区","pid":820100,"level":3}]},{"id":820200,"name":"氹仔岛","pid":820000,"level":2,"children":[{"id":820201,"name":"嘉模堂区","pid":820200,"level":3}]},{"id":820300,"name":"路环岛","pid":820000,"level":2,"children":[{"id":820301,"name":"圣方济各堂区","pid":820300,"level":3}]}]},{"id":900000,"name":"钓鱼岛","pid":100000,"level":1,"children":[{"id":900001,"name":"钓鱼岛","pid":900000,"level":2,"children":[{"id":900002,"name":"钓鱼岛","pid":900001,"level":3}]}]}];

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map