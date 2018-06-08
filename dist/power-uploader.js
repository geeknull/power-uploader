(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["power-uploader"] = factory();
	else
		root["power-uploader"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 117);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(34)('wks');
var uid = __webpack_require__(24);
var Symbol = __webpack_require__(0).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(10)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(1);
var ctx = __webpack_require__(20);
var hide = __webpack_require__(8);
var has = __webpack_require__(7);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(3);
var IE8_DOM_DEFINE = __webpack_require__(46);
var toPrimitive = __webpack_require__(37);
var dP = Object.defineProperty;

exports.f = __webpack_require__(4) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var createDesc = __webpack_require__(22);
module.exports = __webpack_require__(4) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(47);
var defined = __webpack_require__(28);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ }),
/* 13 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(51);
var enumBugKeys = __webpack_require__(30);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(67);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(19);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(6).f;
var has = __webpack_require__(7);
var TAG = __webpack_require__(2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(12);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(69);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(68);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(113);


/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(19);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(34)('keys');
var uid = __webpack_require__(24);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(1);
var global = __webpack_require__(0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(15) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 35 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(28);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(9);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(1);
var LIBRARY = __webpack_require__(15);
var wksExt = __webpack_require__(39);
var defineProperty = __webpack_require__(6).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(2);


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Finds the index.scss of the listener for the event in its storage array.
 *
 * @param {Function[]} listeners Array of listeners to search through.
 * @param {Function} listener Method to look for.
 * @return {Number} Index of the specified listener, -1 if not found
 * @api private
 */


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(12);

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = __webpack_require__(26);

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = __webpack_require__(17);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(18);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function indexOfListener(listeners, listener) {
    var i = listeners.length;
    while (i--) {
        if (listeners[i].listener === listener) {
            return i;
        }
    }

    return -1;
}

/**
 * Alias a method while keeping the context correct, to allow for overwriting of target method.
 *
 * @param {String} name The name of the target method.
 * @return {Function} The aliased method
 * @api private
 */
function alias(name) {
    return function aliasClosure() {
        return this[name].apply(this, arguments);
    };
}

var EventEmitter = function () {
    function EventEmitter() {
        (0, _classCallCheck3.default)(this, EventEmitter);
    }

    (0, _createClass3.default)(EventEmitter, [{
        key: 'getListeners',

        /**
         * Returns the listener array for the specified event.
         * Will initialise the event object and listener arrays if required.
         * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
         * Each property in the object response is an array of listener functions.
         *
         * @param {String|RegExp} evt Name of the event to return the listeners from.
         * @return {Function[]|Object} All listener functions for the event.
         */
        value: function getListeners(evt) {
            var events = this._getEvents();
            var response;
            var key;

            // Return a concatenated array of all matching events if
            // the selector is a regular expression.
            if (evt instanceof RegExp) {
                response = {};
                for (key in events) {
                    if (events.hasOwnProperty(key) && evt.test(key)) {
                        response[key] = events[key];
                    }
                }
            } else {
                response = events[evt] || (events[evt] = []);
            }

            return response;
        }

        /**
         * Takes a list of listener objects and flattens it into a list of listener functions.
         *
         * @param {Object[]} listeners Raw listener objects.
         * @return {Function[]} Just the listener functions.
         */

    }, {
        key: 'flattenListeners',
        value: function flattenListeners(listeners) {
            var flatListeners = [];
            var i;

            for (i = 0; i < listeners.length; i += 1) {
                flatListeners.push(listeners[i].listener);
            }

            return flatListeners;
        }

        /**
         * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
         *
         * @param {String|RegExp} evt Name of the event to return the listeners from.
         * @return {Object} All listener functions for an event in an object.
         */

    }, {
        key: 'getListenersAsObject',
        value: function getListenersAsObject(evt) {
            var listeners = this.getListeners(evt);
            var response;

            if (listeners instanceof Array) {
                response = {};
                response[evt] = listeners;
            }

            return response || listeners;
        }

        /**
         * Adds a listener function to the specified event.
         * The listener will not be added if it is a duplicate.
         * If the listener returns true then it will be removed after it is called.
         * If you pass a regular expression as the event name then the listener will be added to all events that match it.
         *
         * @param {String|RegExp} evt Name of the event to attach the listener to.
         * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
         * @return {Object} Current instance of EventEmitter for chaining.
         */

    }, {
        key: 'addListener',
        value: function addListener(evt, listener) {
            var listeners = this.getListenersAsObject(evt);
            var listenerIsWrapped = (typeof listener === 'undefined' ? 'undefined' : (0, _typeof3.default)(listener)) === 'object';
            var key;

            for (key in listeners) {
                if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                    listeners[key].push(listenerIsWrapped ? listener : {
                        listener: listener,
                        once: false
                    });
                }
            }

            return this;
        }

        /**
         * Alias of addListener
         */

    }, {
        key: 'on',
        value: function on() {
            return alias('addListener').apply(this, arguments);
        }

        /**
         * Semi-alias of addListener. It will add a listener that will be
         * automatically removed after its first execution.
         *
         * @param {String|RegExp} evt Name of the event to attach the listener to.
         * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
         * @return {Object} Current instance of EventEmitter for chaining.
         */

    }, {
        key: 'addOnceListener',
        value: function addOnceListener(evt, listener) {
            return this.addListener(evt, {
                listener: listener,
                once: true
            });
        }

        /**
         * Alias of addOnceListener.
         */

    }, {
        key: 'once',
        value: function once() {
            return alias('addOnceListener').apply(this, arguments);
        }

        /**
         * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
         * You need to tell it what event names should be matched by a regex.
         *
         * @param {String} evt Name of the event to create.
         * @return {Object} Current instance of EventEmitter for chaining.
         */

    }, {
        key: 'defineEvent',
        value: function defineEvent(evt) {
            this.getListeners(evt);
            return this;
        }

        /**
         * Uses defineEvent to define multiple events.
         *
         * @param {String[]} evts An array of event names to define.
         * @return {Object} Current instance of EventEmitter for chaining.
         */

    }, {
        key: 'defineEvents',
        value: function defineEvents(evts) {
            for (var i = 0; i < evts.length; i += 1) {
                this.defineEvent(evts[i]);
            }
            return this;
        }

        /**
         * Removes a listener function from the specified event.
         * When passed a regular expression as the event name, it will remove the listener from all events that match it.
         *
         * @param {String|RegExp} evt Name of the event to remove the listener from.
         * @param {Function} listener Method to remove from the event.
         * @return {Object} Current instance of EventEmitter for chaining.
         */

    }, {
        key: 'removeListener',
        value: function removeListener(evt, listener) {
            var listeners = this.getListenersAsObject(evt);
            var index;
            var key;

            for (key in listeners) {
                if (listeners.hasOwnProperty(key)) {
                    index = indexOfListener(listeners[key], listener);

                    if (index !== -1) {
                        listeners[key].splice(index, 1);
                    }
                }
            }

            return this;
        }

        /**
         * Alias of removeListener
         */

    }, {
        key: 'off',
        value: function off() {
            return alias('removeListener').apply(this, arguments);
        }
        /**
         * Adds listeners in bulk using the manipulateListeners method.
         * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
         * You can also pass it a regular expression to add the array of listeners to all events that match it.
         * Yeah, this function does quite a bit. That's probably a bad thing.
         *
         * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
         * @param {Function[]} [listeners] An optional array of listener functions to add.
         * @return {Object} Current instance of EventEmitter for chaining.
         */

    }, {
        key: 'addListeners',
        value: function addListeners(evt, listeners) {
            // Pass through to manipulateListeners
            return this.manipulateListeners(false, evt, listeners);
        }

        /**
         * Removes listeners in bulk using the manipulateListeners method.
         * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
         * You can also pass it an event name and an array of listeners to be removed.
         * You can also pass it a regular expression to remove the listeners from all events that match it.
         *
         * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
         * @param {Function[]} [listeners] An optional array of listener functions to remove.
         * @return {Object} Current instance of EventEmitter for chaining.
         */

    }, {
        key: 'removeListeners',
        value: function removeListeners(evt, listeners) {
            // Pass through to manipulateListeners
            return this.manipulateListeners(true, evt, listeners);
        }

        /**
         * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
         * The first argument will determine if the listeners are removed (true) or added (false).
         * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
         * You can also pass it an event name and an array of listeners to be added/removed.
         * You can also pass it a regular expression to manipulate the listeners of all events that match it.
         *
         * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
         * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
         * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
         * @return {Object} Current instance of EventEmitter for chaining.
         */

    }, {
        key: 'manipulateListeners',
        value: function manipulateListeners(remove, evt, listeners) {
            var i;
            var value;
            var single = remove ? this.removeListener : this.addListener;
            var multiple = remove ? this.removeListeners : this.addListeners;

            // If evt is an object then pass each of its properties to this method
            if ((typeof evt === 'undefined' ? 'undefined' : (0, _typeof3.default)(evt)) === 'object' && !(evt instanceof RegExp)) {
                for (i in evt) {
                    if (evt.hasOwnProperty(i) && (value = evt[i])) {
                        // Pass the single listener straight through to the singular method
                        if (typeof value === 'function') {
                            single.call(this, i, value);
                        } else {
                            // Otherwise pass back to the multiple function
                            multiple.call(this, i, value);
                        }
                    }
                }
            } else {
                // So evt must be a string
                // And listeners must be an array of listeners
                // Loop over it and pass each one to the multiple method
                i = listeners.length;
                while (i--) {
                    single.call(this, evt, listeners[i]);
                }
            }

            return this;
        }

        /**
         * Removes all listeners from a specified event.
         * If you do not specify an event then all listeners will be removed.
         * That means every event will be emptied.
         * You can also pass a regex to remove all events that match it.
         *
         * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
         * @return {Object} Current instance of EventEmitter for chaining.
         */

    }, {
        key: 'removeEvent',
        value: function removeEvent(evt) {
            var type = typeof evt === 'undefined' ? 'undefined' : (0, _typeof3.default)(evt);
            var events = this._getEvents();
            var key;

            // Remove different things depending on the state of evt
            if (type === 'string') {
                // Remove all listeners for the specified event
                delete events[evt];
            } else if (evt instanceof RegExp) {
                // Remove all events matching the regex.
                for (key in events) {
                    if (events.hasOwnProperty(key) && evt.test(key)) {
                        delete events[key];
                    }
                }
            } else {
                // Remove all listeners in all events
                delete this._events;
            }

            return this;
        }

        /**
         * Emits an event of your choice.
         * When emitted, every listener attached to that event will be executed.
         * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
         * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
         * So they will not arrive within the array on the other side, they will be separate.
         * You can also pass a regular expression to emit to all events that match it.
         *
         * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
         * @param {Array} [args] Optional array of arguments to be passed to each listener.
         * @return {Object} Current instance of EventEmitter for chaining.
         */

    }, {
        key: 'emitEvent',
        value: function emitEvent(evt, args) {
            var listenersMap = this.getListenersAsObject(evt);
            var listeners;
            var listener;
            var i;
            var key;
            var response;
            var result = [];
            for (key in listenersMap) {
                if (listenersMap.hasOwnProperty(key)) {
                    listeners = listenersMap[key].slice(0);
                    i = listeners.length;
                    while (i--) {
                        // If the listener returns true then it shall be removed from the event
                        // The function is executed either with a basic call or an apply if there is an args array
                        listener = listeners[i];

                        if (listener.once === true) {
                            this.removeListener(evt, listener.listener);
                        }
                        response = listener.listener.apply(this, args || []);

                        if (response === this._getOnceReturnValue()) {
                            this.removeListener(evt, listener.listener);
                        }
                        result.push(response);
                    }
                }
            }
            return _promise2.default.all(result);
        }

        /**
         * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
         * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
         *
         * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
         * @param {...*} Optional additional arguments to be passed to each listener.
         * @return {Object} Current instance of EventEmitter for chaining.
         */

    }, {
        key: 'emit',
        value: function emit(evt) {
            var args = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(evt, args);
        }

        /**
         * Sets the current value to check against when executing listeners. If a
         * listeners return value matches the one set here then it will be removed
         * after execution. This value defaults to true.
         *
         * @param {*} value The new value to check for when executing listeners.
         * @return {Object} Current instance of EventEmitter for chaining.
         */

    }, {
        key: 'setOnceReturnValue',
        value: function setOnceReturnValue(value) {
            this._onceReturnValue = value;
            return this;
        }

        /**
         * Fetches the current value to check against when executing listeners. If
         * the listeners return value matches this one then it should be removed
         * automatically. It will return true by default.
         *
         * @return {*|Boolean} The current value to check for or the default, true.
         * @api private
         */

    }, {
        key: '_getOnceReturnValue',
        value: function _getOnceReturnValue() {
            if (this.hasOwnProperty('_onceReturnValue')) {
                return this._onceReturnValue;
            } else {
                return 1;
            }
        }

        /**
         * Fetches the events object and creates one if required.
         *
         * @return {Object} The events storage object.
         * @api private
         */

    }, {
        key: '_getEvents',
        value: function _getEvents() {
            return this._events || (this._events = {});
        }
    }, {
        key: 'removeEvents',
        value: function removeEvents() {
            this._events = {};
        }
    }]);
    return EventEmitter;
}();

exports.default = EventEmitter;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
* the event delegate library
*
* */


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Delegate;
// module.exports = Delegate;

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

function Delegate(root) {
    var rootElement = null;

    if (typeof root === 'string') {
        rootElement = document.querySelector(root);
    } else {
        rootElement = root;
    }

    if (!rootElement) {
        throw new Error('please give valid root element or root selector');
        return void 0;
    }

    this.root = rootElement;
    this.eventPool = {}; // save event callback function
}

Delegate.prototype.on = function (event, selector, callback) {
    var selectorArr = isArray(selector) ? selector : selector.split(',');
    if (!this.eventPool[event]) {
        this.eventPool[event] = [];
    }
    var eventFunc = function eventFunc(e) {

        for (var i = 0, len = selectorArr.length; i < len; i++) {
            if (e.target.closest(selectorArr[i])) {
                callback(e);
            }
        }
    };
    this.eventPool[event].push(eventFunc);
    this.root.addEventListener(event, eventFunc, false);
};

Delegate.prototype.off = function (event) {
    var curEvPool = this.eventPool[event];
    if (curEvPool) {
        for (var i = 0, len = curEvPool.length; i < len; i++) {
            this.root.removeEventListener(event, curEvPool[i]);
        }
    }
};

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
if (typeof Element.prototype.closest !== 'function') {
    Element.prototype.closest = function closest(selector) {
        var element = this;

        while (element && element.nodeType === 1) {
            if (element.matches(selector)) {
                return element;
            }

            element = element.parentNode;
        }

        return null;
    };
}

// matches hack
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;
    proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(26);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isObject(val) {
    return val != null && (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object' && Array.isArray(val) === false;
}

function isObjectObject(o) {
    return isObject(o) === true && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = {
    // https://github.com/jonschlinkert/is-plain-object/blob/master/index.js
    isPlainObject: function isPlainObject(o) {
        var ctor, prot;

        if (isObjectObject(o) === false) return false;

        // If has modified constructor
        ctor = o.constructor;
        if (typeof ctor !== 'function') return false;

        // If has modified prototype
        prot = ctor.prototype;
        if (isObjectObject(prot) === false) return false;

        // If constructor does not have an Object-specific method
        if (prot.hasOwnProperty('isPrototypeOf') === false) {
            return false;
        }

        // Most likely a plain Object
        return true;
    },

    parseToDOM: function parseToDOM(str) {
        var div = document.createElement('div');
        if (typeof str == 'string') {
            div.innerHTML = str;
        }
        return div.childNodes;
    },

    removeDOM: function removeDOM(selector) {
        var el = null;
        if (typeof selector === 'string') {
            el = document.querySelector(selector);
        } else {
            el = selector;
        }

        if (el) {
            el.parentNode.removeChild(el);
        }
    },
    formatSize: function formatSize(byte) {
        var a = ['B', 'KB', 'MB', 'GB', 'TB'];
        var i = 0;
        var c = function c(s) {
            i++;
            return s / 1024;
        };

        while (byte > 1024) {
            byte = c(byte);
        }

        return Math.round(byte * 100) / 100 + a[i];
    }

    // TODO 判断文件是否图片 UNDO
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(72), __esModule: true };

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(13);
var TAG = __webpack_require__(2)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(0).document;
module.exports = document && document.documentElement;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(4) && !__webpack_require__(10)(function () {
  return Object.defineProperty(__webpack_require__(29)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(13);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(15);
var $export = __webpack_require__(5);
var redefine = __webpack_require__(54);
var hide = __webpack_require__(8);
var Iterators = __webpack_require__(14);
var $iterCreate = __webpack_require__(85);
var setToStringTag = __webpack_require__(23);
var getPrototypeOf = __webpack_require__(94);
var ITERATOR = __webpack_require__(2)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(3);
var dPs = __webpack_require__(91);
var enumBugKeys = __webpack_require__(30);
var IE_PROTO = __webpack_require__(33)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(29)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(45).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(51);
var hiddenKeys = __webpack_require__(30).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(7);
var toIObject = __webpack_require__(11);
var arrayIndexOf = __webpack_require__(78)(false);
var IE_PROTO = __webpack_require__(33)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(3);
var isObject = __webpack_require__(9);
var newPromiseCapability = __webpack_require__(31);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(3);
var aFunction = __webpack_require__(19);
var SPECIES = __webpack_require__(2)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(20);
var invoke = __webpack_require__(81);
var html = __webpack_require__(45);
var cel = __webpack_require__(29);
var global = __webpack_require__(0);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(13)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(35);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 58 */
/***/ (function(module, exports) {



/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(98)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(48)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(102);
var global = __webpack_require__(0);
var hide = __webpack_require__(8);
var Iterators = __webpack_require__(14);
var TO_STRING_TAG = __webpack_require__(2)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileStatus = exports.Uploader = exports.CONSTANTS = undefined;

var _promise = __webpack_require__(12);

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = __webpack_require__(27);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(25);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = __webpack_require__(66);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(17);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(18);

var _createClass3 = _interopRequireDefault(_createClass2);

var _eventBus = __webpack_require__(40);

var _eventBus2 = _interopRequireDefault(_eventBus);

var _eventDelegate = __webpack_require__(41);

var _eventDelegate2 = _interopRequireDefault(_eventDelegate);

var _transport = __webpack_require__(65);

var _file = __webpack_require__(62);

var _fileGetter = __webpack_require__(63);

var _fileGetter2 = _interopRequireDefault(_fileGetter);

var _log = __webpack_require__(64);

var _log2 = _interopRequireDefault(_log);

var _md5Worker = __webpack_require__(115);

var _md5Worker2 = _interopRequireDefault(_md5Worker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONSTANTS = exports.CONSTANTS = {
    MD5_HAS: 'MD5_HAS'
};

var _config = {
    timeout: 0,
    accept: [],
    auto: true,
    sameTimeUploadCount: 3, // 同时上传个数
    chunked: false,
    chunkSize: 20971520,
    chunkRetry: 2,
    formData: {},
    headers: {},
    fileVal: 'file',
    method: 'POST',
    fileNumLimit: void 0,
    fileSizeLimit: void 0,
    fileSingleSizeLimit: void 0,
    dnd: void 0,
    pick: void 0,
    pickDir: void 0,
    paste: void 0,
    server: '',
    listenerContainer: document,
    body: document.body,
    multiple: false,
    withCredentials: false,
    setName: function setName(id) {
        return new Date().getTime() + id;
    },
    log: function log() {
        var _console;

        (_console = console).log.apply(_console, arguments);
    },
    logLevel: 1,
    fileIdPrefix: 'WU_FILE_',
    md5Calc: true,
    md5LimitSize: 1024 * 1024 * 1
};

// 分片状态
var blobStatus = {
    WAIT: 'wait', // 已经进入队列等待上传
    PENDING: 'pending', // 正在上传中
    ERROR: 'error', // 上传出错(eg.网络错误等)
    SUCCESS: 'success', // 上传成功
    CANCELLED: 'cancelled', // 上传取消
    INTERRUPT: 'interrupt' // 上传中断，可续传
};

var Uploader = exports.Uploader = function () {
    function Uploader() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheck3.default)(this, Uploader);

        this.blobsQueue = []; // 各个分片的队列
        this.config = (0, _assign2.default)({}, _config, config);

        this.eventEmitter = new _eventBus2.default();
        this.eventDelegate = new _eventDelegate2.default(this.config.listenerContainer);
        this.LOG = (0, _log2.default)(this.config.log, this.config.logLevel);
        // 这个写法还是蛮坑的
        // this.log = function () {
        //     let args = Array.prototype.slice.call(arguments, 0);
        //     args = ['FILE', ...args];
        //     this.config.log.apply(null, args);
        // }.bind(this);

        this.fileGetter = new _fileGetter2.default(this.config, this.pushQueue.bind(this), this.eventEmitter, this.eventDelegate);
        this.fileProgressCalc(); // 全局文件进度监听
    }

    // 在这里有`beforeFileQueued`事件，用户可以在这个事件阻止文件被加入队列


    (0, _createClass3.default)(Uploader, [{
        key: 'pushQueue',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(file, groupInfo) {
                var wuFile, res;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                wuFile = new _file.WUFile(file, {
                                    eventEmitter: this.eventEmitter,
                                    setName: this.config.setName,
                                    fileIdPrefix: this.config.fileIdPrefix,
                                    groupInfo: groupInfo || {},
                                    uploadGroupInfo: groupInfo // alias
                                });
                                _context.prev = 1;
                                _context.next = 4;
                                return this.eventEmitter.emit('beforeFileQueued', { file: wuFile, setContentType: function setContentType(type) {
                                        // 允许用户自定义
                                        if (type) {
                                            var blobFile = new Blob([wuFile.source], { type: type });
                                            blobFile.file2blob = true;
                                            blobFile.lastModified = wuFile.source.lastModified;
                                            blobFile.name = wuFile.source.name;
                                            // blobFile.size = wuFile.source.size;
                                            // blobFile.type = type;
                                            blobFile.lastModifiedDate = wuFile.source.lastModifiedDate; // chrome专属
                                            blobFile.webkitRelativePath = wuFile.source.webkitRelativePath; // chrome专属
                                            wuFile.source = blobFile;
                                        }
                                    } });

                            case 4:
                                res = _context.sent;

                                if (!(res.indexOf(false) === -1)) {
                                    _context.next = 10;
                                    break;
                                }

                                wuFile.statusText = _file.WUFile.Status.QUEUED;
                                _context.next = 9;
                                return this.eventEmitter.emit('fileQueued', { file: wuFile });

                            case 9:
                                if (this.config.auto) {
                                    this.sliceFile(wuFile);
                                }
                                // TODO 不需要auto的时候还没做

                            case 10:
                                this.LOG.INFO({
                                    lifecycle: 'pushQueue',
                                    fileStatus: wuFile.statusText,
                                    fileName: wuFile.name
                                });
                                _context.next = 16;
                                break;

                            case 13:
                                _context.prev = 13;
                                _context.t0 = _context['catch'](1);

                                this.LOG.ERROR({
                                    lifecycle: 'pushQueue',
                                    fileStatus: wuFile.statusText,
                                    fileName: wuFile.name,
                                    err: _context.t0
                                });

                            case 16:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[1, 13]]);
            }));

            function pushQueue(_x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return pushQueue;
        }()
    }, {
        key: 'calcMd5',
        value: function calcMd5(file) {
            var _this = this;

            return new _promise2.default(function (resolve, reject) {
                var worker = new _md5Worker2.default('./md5.worker.js');
                worker.postMessage(file);
                worker.addEventListener('message', function (message) {
                    resolve(message.data);
                });
                worker.addEventListener('error', function (err) {
                    _this.LOG.ERROR({
                        lifecycle: 'calcMd5_worker',
                        fileName: file.name,
                        fileStatus: file.statusText,
                        msg: 'md5 worker 错误'
                    });
                });
            });
        }

        // 对文件进行分片 哈哈哈

    }, {
        key: 'sliceFile',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(wuFile) {
                var shardCount, i, len, start, end, blob, shardObj, _shardObj;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;

                                if (!(wuFile.isFile === false)) {
                                    _context2.next = 3;
                                    break;
                                }

                                return _context2.abrupt('return', null);

                            case 3:
                                if (!this.config.chunked) {
                                    _context2.next = 20;
                                    break;
                                }

                                shardCount = Math.ceil(wuFile.size / this.config.chunkSize);

                                if (shardCount === 0) {
                                    shardCount = 1;
                                }
                                i = 0, len = shardCount;

                            case 7:
                                if (!(i < len)) {
                                    _context2.next = 18;
                                    break;
                                }

                                start = i * this.config.chunkSize;
                                end = Math.min(wuFile.size, start + this.config.chunkSize);
                                blob = wuFile.source.slice(start, end);

                                if (len === 1) {
                                    // 只有一片的时候 保留分片信息 不进行slice 是为了保留Content-Type
                                    blob = wuFile.source;
                                }

                                shardObj = {
                                    shardCount: shardCount,
                                    currentShard: i + 1 // 分片从1开始，下标都要+1
                                };
                                _context2.next = 15;
                                return this.pushBlobQueue(blob, wuFile, shardObj);

                            case 15:
                                i++;
                                _context2.next = 7;
                                break;

                            case 18:
                                _context2.next = 23;
                                break;

                            case 20:
                                _shardObj = {
                                    shardCount: 1,
                                    currentShard: 1 // 分片从1开始，下标都要+1
                                };
                                _context2.next = 23;
                                return this.pushBlobQueue(wuFile.source, wuFile, _shardObj);

                            case 23:
                                this.LOG.INFO({
                                    lifecycle: 'sliceFile',
                                    fileStatus: wuFile.statusText,
                                    fileName: wuFile.name
                                });
                                _context2.next = 29;
                                break;

                            case 26:
                                _context2.prev = 26;
                                _context2.t0 = _context2['catch'](0);

                                this.LOG.ERROR({
                                    lifecycle: 'sliceFile',
                                    fileStatus: wuFile.statusText,
                                    fileName: wuFile.name,
                                    err: _context2.t0
                                });

                            case 29:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 26]]);
            }));

            function sliceFile(_x4) {
                return _ref2.apply(this, arguments);
            }

            return sliceFile;
        }()

        // 业务方自己传进来的文件

    }, {
        key: 'pushFile',
        value: function pushFile(file) {
            var _this2 = this;

            if (Array.isArray(file)) {
                var id = 'initiative_' + new Date().getTime();
                this.LOG.INFO({
                    lifecycle: 'initiative_pushFile_queue',
                    fileId: id
                });
                var count = file.leading;
                file.forEach(function (f, i) {
                    f.groupId = id;
                    _this2.pushQueue(f, {
                        count: count,
                        current: i + 1,
                        id: id
                    });
                });
            } else {
                var _id = 'initiative_' + new Date().getTime();
                this.LOG.INFO({
                    lifecycle: 'initiative_pushFile',
                    fileId: _id
                });
                file.groupId = _id;
                this.pushQueue(file, {
                    count: 1,
                    current: 1,
                    id: file.groupId
                });
            }
        }

        // 分片队列 推进分片队列的时候还会开始上传

    }, {
        key: 'pushBlobQueue',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(obj, file, shardObj) {
                var blobObj, pendingLen;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;

                                // 分片对象
                                blobObj = {
                                    blob: obj,
                                    file: file, // wuFile
                                    shard: shardObj,
                                    status: blobStatus.WAIT,
                                    loaded: 0,
                                    config: {
                                        server: this.config.server,
                                        headers: this.config.headers,
                                        formData: this.config.formData
                                    }
                                };

                                this.LOG.INFO({
                                    lifecycle: 'pushBlobQueue',
                                    fileStatus: file.statusText,
                                    fileName: file.name
                                });
                                this.blobsQueue.push(blobObj);

                                // 正在上传的文件个数
                                pendingLen = this.blobsQueue.filter(function (item) {
                                    return item.status === blobStatus.PENDING;
                                }).length;

                                if (!(pendingLen < this.config.sameTimeUploadCount)) {
                                    _context3.next = 8;
                                    break;
                                }

                                _context3.next = 8;
                                return this.runBlobQueue();

                            case 8:
                                this.LOG.INFO({
                                    lifecycle: 'pushBlobQueue',
                                    fileStatus: file.statusText,
                                    fileName: file.name
                                });
                                _context3.next = 14;
                                break;

                            case 11:
                                _context3.prev = 11;
                                _context3.t0 = _context3['catch'](0);

                                this.LOG.ERROR({
                                    lifecycle: 'pushBlobQueue',
                                    fileStatus: file.statusText,
                                    fileName: file.name,
                                    err: _context3.t0
                                });

                            case 14:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[0, 11]]);
            }));

            function pushBlobQueue(_x5, _x6, _x7) {
                return _ref3.apply(this, arguments);
            }

            return pushBlobQueue;
        }()

        // 准备上传分片

    }, {
        key: 'runBlobQueue',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                var _blobObj, currentUploadCount, blobObj;

                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _blobObj = null;
                                _context4.prev = 1;
                                currentUploadCount = this.blobsQueue.filter(function (item) {
                                    return item.status === blobStatus.PENDING;
                                }).length;

                                // 数量超过就不再处理

                                if (!(currentUploadCount >= this.config.sameTimeUploadCount)) {
                                    _context4.next = 5;
                                    break;
                                }

                                return _context4.abrupt('return', void 0);

                            case 5:
                                blobObj = this.blobsQueue.find(function (item) {
                                    return item.status === blobStatus.WAIT;
                                });

                                _blobObj = blobObj;

                                if (blobObj) {
                                    _context4.next = 9;
                                    break;
                                }

                                return _context4.abrupt('return', void 0);

                            case 9:
                                // 只有一个分片的时候
                                blobObj.status = blobStatus.PENDING; // 由于是异步的关系 这个必须提前

                                // 检测文件开始上传
                                _context4.next = 12;
                                return this.checkFileUploadStart({
                                    file: blobObj.file, // 私有文件对象
                                    shardCount: blobObj.shard.shardCount, // 总分片数
                                    config: blobObj.config
                                });

                            case 12:
                                _context4.next = 14;
                                return this.eventEmitter.emit('uploadBeforeSend', {
                                    file: blobObj.file, // 私有文件对象
                                    shard: blobObj.blob, // 文件blob
                                    shardCount: blobObj.shard.shardCount, // 总分片数
                                    currentShard: blobObj.shard.currentShard, // 当前片数
                                    config: blobObj.config
                                });

                            case 14:

                                // 真正的上传
                                blobObj.file.statusText = _file.WUFile.Status.PROGRESS;
                                this.runBlobQueueHandler(blobObj);

                                this.LOG.INFO({
                                    lifecycle: 'runBlobQueue',
                                    fileStatus: _blobObj.file.statusText,
                                    fileName: _blobObj.file.name
                                });
                                _context4.next = 22;
                                break;

                            case 19:
                                _context4.prev = 19;
                                _context4.t0 = _context4['catch'](1);

                                this.LOG.ERROR({
                                    lifecycle: 'runBlobQueue',
                                    fileStatus: _blobObj.file.statusText,
                                    fileName: _blobObj.file.name,
                                    info: _context4.t0
                                });

                            case 22:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[1, 19]]);
            }));

            function runBlobQueue() {
                return _ref4.apply(this, arguments);
            }

            return runBlobQueue;
        }()

        // 处理上传文件的成功或者失败 不能放到 runBlobQueue 是因为await会阻止 runBlobQueue

    }, {
        key: 'runBlobQueueHandler',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(blobObj) {
                var res;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.prev = 0;
                                _context5.next = 3;
                                return this._baseupload(blobObj);

                            case 3:
                                res = _context5.sent;

                                if (!(res !== undefined)) {
                                    _context5.next = 7;
                                    break;
                                }

                                _context5.next = 7;
                                return this._uploadSuccess(res, blobObj);

                            case 7:
                                this.runBlobQueue();
                                _context5.next = 15;
                                break;

                            case 10:
                                _context5.prev = 10;
                                _context5.t0 = _context5['catch'](0);
                                _context5.next = 14;
                                return this._catchUpfileError(_context5.t0, blobObj);

                            case 14:
                                this.runBlobQueue();

                            case 15:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[0, 10]]);
            }));

            function runBlobQueueHandler(_x8) {
                return _ref5.apply(this, arguments);
            }

            return runBlobQueueHandler;
        }()

        // 错误处理

    }, {
        key: '_catchUpfileError',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(err, blobObj) {
                var _this3 = this;

                var errText;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                errText = (err.message ? err.message : err) || 'no error message';

                                if (!(errText.indexOf('initiative interrupt') !== -1)) {
                                    _context6.next = 4;
                                    break;
                                }

                                this.LOG.INFO({
                                    lifecycle: '_catchUpfileError',
                                    msg: 'initiative interrupt',
                                    fileStatus: blobObj.file.statusText,
                                    fileName: blobObj.file.name,
                                    fileId: blobObj.file.id
                                });
                                return _context6.abrupt('return', void 0);

                            case 4:

                                this.LOG.INFO({
                                    lifecycle: '_catchUpfileError',
                                    fileStatus: blobObj.file.statusText,
                                    fileName: blobObj.file.name,
                                    fileId: blobObj.file.id
                                });

                                blobObj.file.statusText = _file.WUFile.Status.ERROR;
                                // 已经错误处理过的文件就不需要处理了

                                if (blobObj.status === blobStatus.CANCELLED || blobObj.status === blobStatus.INTERRUPT || blobObj.status === blobStatus.ERROR) {
                                    _context6.next = 12;
                                    break;
                                }

                                // 停止所有分片
                                this.blobsQueue = this.blobsQueue.map(function (item) {
                                    // 是当前文件的分片并且该分片没有传输成功
                                    if (item.file.id === blobObj.file.id && item.status !== blobStatus.SUCCESS) {
                                        item.transport && item.transport.abort();
                                        item.status = blobStatus.ERROR;
                                        item.loaded = 0;
                                        _this3.LOG.INFO({
                                            lifecycle: '_catchUpfileError',
                                            msg: 'stop all shard',
                                            fileStatus: item.file.statusText,
                                            fileName: item.file.name,
                                            fileId: item.file.id
                                        });
                                    }
                                    return item;
                                });

                                _context6.next = 10;
                                return this.eventEmitter.emit('uploadError', {
                                    file: blobObj.file,
                                    error: err
                                });

                            case 10:
                                _context6.next = 12;
                                return this.eventEmitter.emit('uploadEndSend', {
                                    file: blobObj.file,
                                    shard: blobObj.blob,
                                    shardCount: blobObj.shard.shardCount,
                                    currentShard: blobObj.shard.currentShard
                                });

                            case 12:
                                if (!(blobObj.status === blobStatus.SUCCESS)) {
                                    _context6.next = 16;
                                    break;
                                }

                                _context6.next = 15;
                                return this.eventEmitter.emit('uploadError', {
                                    file: blobObj.file,
                                    error: err
                                });

                            case 15:
                                return _context6.abrupt('return', void 0);

                            case 16:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function _catchUpfileError(_x9, _x10) {
                return _ref6.apply(this, arguments);
            }

            return _catchUpfileError;
        }()

        // 检测文件是否第一次开始上传分片

    }, {
        key: 'checkFileUploadStart',
        value: function () {
            var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(obj) {
                var _this4 = this;

                var file, shardCount, config, curFileShard, pendingCount, successCount;
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                file = obj.file, shardCount = obj.shardCount, config = obj.config;
                                curFileShard = this.blobsQueue.filter(function (item) {
                                    return item.file.id === file.id;
                                });
                                pendingCount = 0;
                                successCount = 0;

                                curFileShard.map(function (item) {
                                    if (item.status === blobStatus.PENDING) {
                                        // TODO 看看这个规则是否需要优化
                                        pendingCount++;
                                    }
                                    if (item.status === blobStatus.SUCCESS) {
                                        successCount++;
                                    }
                                });
                                // 正在上传的只有一个文件 并且没有文件上传成功 注意此条件不应该触发多次 重传的策略再想

                                if (!(pendingCount === 1 && successCount === 0)) {
                                    _context8.next = 14;
                                    break;
                                }

                                if (!(file.statusText === _file.WUFile.Status.QUEUED)) {
                                    _context8.next = 13;
                                    break;
                                }

                                file.statusText = _file.WUFile.Status.PROGRESS;
                                _context8.next = 10;
                                return this.eventEmitter.emit('uploadStart', { file: file, shardCount: shardCount, config: config });

                            case 10:
                                // 导出wuFile对象
                                if (this.config.md5Calc && file.size > this.config.md5LimitSize) {

                                    if (file.source instanceof Blob) {
                                        this.calcMd5(file.source).then(function () {
                                            var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(value) {
                                                var md5HandlerRes;
                                                return _regenerator2.default.wrap(function _callee7$(_context7) {
                                                    while (1) {
                                                        switch (_context7.prev = _context7.next) {
                                                            case 0:
                                                                file.md5 = value;
                                                                // emit 的事件 处理完成后会回来，回来后一定是当前文件的
                                                                _context7.next = 3;
                                                                return _this4.eventEmitter.emit('fileMd5Finished', { file: file, md5: value });

                                                            case 3:
                                                                md5HandlerRes = _context7.sent;

                                                                if (md5HandlerRes.indexOf(CONSTANTS.MD5_HAS) !== -1) {
                                                                    _this4.interruptFile(file.id, 'initiative_finished');
                                                                    // file.statusText = FileStatus.COMPLETE;
                                                                    console.log(file.name, value, 'emit fileMd5Finished');
                                                                }

                                                            case 5:
                                                            case 'end':
                                                                return _context7.stop();
                                                        }
                                                    }
                                                }, _callee7, _this4);
                                            }));

                                            return function (_x12) {
                                                return _ref8.apply(this, arguments);
                                            };
                                        }()).catch(function (err) {
                                            _this4.LOG.ERROR({
                                                lifecycle: 'checkFileUploadStart',
                                                fileName: file.name,
                                                fileStatus: file.statusText,
                                                msg: 'md5 事件错误'
                                            });
                                        });
                                    } else {
                                        // TODO 处理FakeBrowserFile的情况
                                        // electron 渲染进程中
                                    }
                                }
                                _context8.next = 14;
                                break;

                            case 13:
                                this.LOG.ERROR({
                                    lifecycle: 'checkFileUploadStart',
                                    fileName: file.name,
                                    fileStatus: file.statusText,
                                    msg: '检测第一次上传文件出错'
                                });
                                // 不应该出现这个debugger的

                            case 14:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function checkFileUploadStart(_x11) {
                return _ref7.apply(this, arguments);
            }

            return checkFileUploadStart;
        }()

        // 检查文件是否传输完毕

    }, {
        key: 'checkFileUploadEnd',
        value: function checkFileUploadEnd(file) {
            // 除了success已经没有其他成功状态了
            var currentFileShard = this.blobsQueue.filter(function (item) {
                return item.file.id === file.id;
            });
            var notSuccessShard = currentFileShard.filter(function (item) {
                return item.status !== blobStatus.SUCCESS;
            });

            return notSuccessShard.length === 0; // 为0则表示传输完毕了
        }

        // 文件上传成功之后

    }, {
        key: '_uploadSuccess',
        value: function () {
            var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(res, blobObj) {
                var isFileUploadEnd, successParams;
                return _regenerator2.default.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                blobObj.status = blobStatus.SUCCESS;
                                isFileUploadEnd = this.checkFileUploadEnd(blobObj.file);

                                if (isFileUploadEnd) {
                                    blobObj.file.statusText = _file.WUFile.Status.COMPLETE;
                                }

                                // 不分片的时候
                                if (blobObj.shard.shardCount === 1) {
                                    blobObj.file.responseText = res;
                                } else {
                                    // 分片的时候
                                    if (!Array.isArray(blobObj.file.responseTextArr)) {
                                        blobObj.file.responseTextArr = Array(blobObj.shard.shardCount - 1).fill(null);
                                    }
                                    blobObj.file.responseTextArr[blobObj.shard.currentShard - 1] = res;
                                }

                                // 每个分片成功后的
                                _context9.next = 6;
                                return this.eventEmitter.emit('uploadAccept', {
                                    file: blobObj.file,
                                    shard: blobObj.blob,
                                    shardCount: blobObj.shard.shardCount,
                                    currentShard: blobObj.shard.currentShard,
                                    isUploadEnd: isFileUploadEnd,
                                    responseText: res
                                });

                            case 6:
                                if (!isFileUploadEnd) {
                                    _context9.next = 14;
                                    break;
                                }

                                successParams = {
                                    file: blobObj.file,
                                    shard: blobObj.blob,
                                    shardCount: blobObj.shard.shardCount,
                                    currentShard: blobObj.shard.currentShard
                                };

                                if (blobObj.shard.shardCount === 1) {
                                    successParams.responseText = blobObj.file.responseText;
                                } else {
                                    successParams.responseTextArr = blobObj.file.responseTextArr;
                                }
                                _context9.next = 11;
                                return this.eventEmitter.emit('uploadSuccess', successParams);

                            case 11:
                                _context9.next = 13;
                                return this.eventEmitter.emit('uploadEndSend', {
                                    file: blobObj.file,
                                    shard: blobObj.blob,
                                    shardCount: blobObj.shard.shardCount,
                                    currentShard: blobObj.shard.currentShard
                                });

                            case 13:
                                // 只能在成功的时候移除分片 如果提前移除分片会导致进度计算不准确
                                this._removeFileFromQueue(blobObj.file.id);

                            case 14:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function _uploadSuccess(_x13, _x14) {
                return _ref9.apply(this, arguments);
            }

            return _uploadSuccess;
        }()
    }, {
        key: '_removeFileFromQueue',
        value: function _removeFileFromQueue(id) {
            this.blobsQueue = this.blobsQueue.filter(function (blobObj) {
                return blobObj.file.id !== id;
            });
        }
    }, {
        key: 'interruptFile',
        value: function interruptFile(id) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'interrupted';

            var fileObj = null;
            this.blobsQueue.forEach(function (item) {
                if (item.file.id === id && item.status !== blobStatus.SUCCESS) {
                    item.file.statusText = _file.WUFile.Status.INTERRUPT;
                    item.status = blobStatus.INTERRUPT;
                    item.transport && item.transport.abort();
                    if (!fileObj) {
                        fileObj = item;
                    }
                }
            });

            if (fileObj) {
                // interrupted(中断) initiative_finished(主动完成 秒传用)
                this.eventEmitter.emit(type, { file: fileObj.file });
            }
        }

        //中断所有

    }, {
        key: 'interruptAllFile',
        value: function interruptAllFile() {
            this.blobsQueue.forEach(function (item) {
                item.status = blobStatus.INTERRUPT;
                item.file.statusText = _file.WUFile.Status.CANCELLED;
                item.transport && item.transport.abort();
            });
        }

        // 重传

    }, {
        key: 'reUpload',
        value: function reUpload(id) {
            var _this5 = this;

            // 重传的时候uploadStart事件不触发
            this.blobsQueue.forEach(function (item) {
                if (item.file.id === id && item.status !== blobStatus.WAIT && item.status !== blobStatus.PENDING && item.status !== blobStatus.SUCCESS) {
                    item.status = blobStatus.WAIT;
                    item.file.statusText = _file.WUFile.Status.QUEUED;
                    _this5.runBlobQueue();
                }
            });
        }
    }, {
        key: '_baseupload',
        value: function () {
            var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(blobObj) {
                var config, res, i;
                return _regenerator2.default.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _context10.prev = 0;
                                config = {
                                    server: blobObj.config.server,
                                    headers: blobObj.config.headers,
                                    method: this.config.method,
                                    fileVal: this.config.fileVal,
                                    timeout: this.config.timeout, // 2分钟
                                    formData: this.config.formData,
                                    fileName: blobObj.file.name,
                                    withCredentials: this.config.withCredentials,
                                    LOG: this.LOG
                                };
                                res = null;
                                i = 0;

                            case 4:
                                if (!(i < this.config.chunkRetry)) {
                                    _context10.next = 23;
                                    break;
                                }

                                if (!(blobObj.status !== blobStatus.PENDING)) {
                                    _context10.next = 7;
                                    break;
                                }

                                throw new Error('initiative interrupt');

                            case 7:
                                _context10.prev = 7;

                                this.transport = new _transport.Transport(blobObj.blob, this.eventEmitter, config, blobObj);
                                blobObj.transport = this.transport; // 为了能够abort
                                _context10.next = 12;
                                return this.transport.send();

                            case 12:
                                res = _context10.sent;
                                return _context10.abrupt('break', 23);

                            case 16:
                                _context10.prev = 16;
                                _context10.t0 = _context10['catch'](7);

                                if (!(i >= this.config.chunkRetry - 1)) {
                                    _context10.next = 20;
                                    break;
                                }

                                throw new Error(_context10.t0);

                            case 20:
                                i++;
                                _context10.next = 4;
                                break;

                            case 23:
                                this.transport = null;
                                return _context10.abrupt('return', res);

                            case 27:
                                _context10.prev = 27;
                                _context10.t1 = _context10['catch'](0);

                                this.LOG.ERROR({
                                    lifecycle: '_baseupload',
                                    fileStatus: blobObj.file.statusText,
                                    fileName: blobObj.file.name,
                                    err: _context10.t1
                                });
                                throw _context10.t1;

                            case 31:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, this, [[0, 27], [7, 16]]);
            }));

            function _baseupload(_x16) {
                return _ref10.apply(this, arguments);
            }

            return _baseupload;
        }()

        // 文件上传进度监听 只会运行一次

    }, {
        key: 'fileProgressCalc',
        value: function fileProgressCalc() {
            var _this6 = this;

            this.eventEmitter.on('uploadBlobProgress', function (shardLoaded, shardTotal, blobObj) {
                // 修复abort后还会抛出progress事件的问题
                if (blobObj.status !== blobStatus.PENDING) {
                    return void 0;
                }
                blobObj.loaded = shardLoaded;

                var currentLoaded = 0;
                var fileTotalSize = blobObj.file.size;

                var currentFileBlobArr = _this6.blobsQueue.filter(function (item) {
                    return blobObj.file.id === item.file.id;
                });
                currentFileBlobArr.forEach(function (item) {
                    return currentLoaded += item.loaded;
                });
                currentLoaded = currentLoaded > fileTotalSize ? fileTotalSize : currentLoaded; // 偶尔会超过整体的大小
                blobObj.file.loaded = currentLoaded;

                _this6.eventEmitter.emit('uploadProgress', {
                    file: blobObj.file,
                    loaded: currentLoaded,
                    total: fileTotalSize,
                    shardLoaded: shardLoaded,
                    shardTotal: shardTotal
                });
            });
        }
    }, {
        key: 'on',
        value: function on(eventSource, fn) {
            this.eventEmitter.on(eventSource, fn);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.fileGetter.destroy();
            this.blobsQueue = this.blobsQueue.filter(function (item) {
                item.transport && item.transport.abort();
                item.status = blobStatus.CANCELLED;
                item.file.statusText = _file.WUFile.CANCELLED;
                return false;
            });
        }
    }]);
    return Uploader;
}();

var FileStatus = exports.FileStatus = _file.WUFile.Status;

Uploader.CONSTANTS = CONSTANTS;
Uploader.FileStatus = FileStatus;
exports.default = Uploader;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileOverview 文件属性封装
 */


/**
 * 文件类
 * @class File
 * @constructor 构造函数
 * @grammar new File( source ) => File
 * @param {Lib.File} source [lib.File](#Lib.File)实例, 此source对象是带有Runtime信息的。
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(43);

var _keys2 = _interopRequireDefault(_keys);

exports.WUFile = WUFile;

var _util = __webpack_require__(42);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var idPrefix = 'WU_FILE_';
var idSuffix = 0;
var rExt = /\.([^.]+)$/;
var statusMap = {};

function gid() {
  return idPrefix + idSuffix++;
}

function WUFile(source, opt) {
  // try {
  //     noop(idPrefix);
  // } catch (err) {
  //     debugger;
  // }
  // debugger
  // let noop = (idPrefix) => {console.log(idPrefix);};
  // noop(idPrefix);
  this.eventEmitter = opt.eventEmitter;
  if (opt.fileIdPrefix) {
    idPrefix = opt.fileIdPrefix;
  }
  var arrKeys = (0, _keys2.default)(source);
  for (var i in arrKeys) {
    this[arrKeys[i]] = source[arrKeys[i]];
  }
  /**
   * 文件ID，每个对象具有唯一ID，与文件名无关
   * @property id
   * @type {string}
   */
  this.id = gid();
  /**
   * 文件名，包括扩展名（后缀）
   * @property name
   * @type {string}
   */
  this.name = source.name || opt.setName(this.id) || 'Untitled';
  this.groupInfo = opt.groupInfo; // 组信息 id、count、current
  this.uploadGroupInfo = opt.uploadGroupInfo; // alias

  var ext = rExt.exec(source.name) ? RegExp.$1.toLowerCase() : '';
  /**
   * 文件扩展名，通过文件名获取，例如test.png的扩展名为png
   * @property ext
   * @type {string}
   */
  this.ext = ext;

  if (!this.ext && source.type) {
    ext = /\/(jpg|jpeg|png|gif|bmp)$/i.exec(source.type) ? RegExp.$1.toLowerCase() : '';
    if (!!ext) {
      this.name += '.' + ext;
    }
  }

  this.path = source.path || 'Untitled';

  this.isFile = true;
  /**
   * 文件体积（字节）
   * @property size
   * @type {uint}
   * @default 0
   */
  this.size = source.size || 0;
  this.formatSize = _util2.default.formatSize(source.size);

  /**
   * 文件MIMETYPE类型，与文件类型的对应关系请参考[http://t.cn/z8ZnFny](http://t.cn/z8ZnFny)
   * @property type
   * @type {string}
   * @default 'application/octet-stream'
   */
  this.type = source.type || 'application/octet-stream';

  /**
   * 文件最后修改日期
   * @property lastModifiedDate
   * @type {int}
   * @default 当前时间戳
   */
  this.lastModifiedDate = source.lastModifiedDate || new Date() * 1;

  /**
   * 状态文字说明。在不同的status语境下有不同的用途。
   * @property statusText
   * @type {string}
   */
  this.statusText = 'inited';

  // 存储文件状态，防止通过属性直接修改
  statusMap[this.id] = WUFile.Status.INITED;

  this.source = source;
  this.loaded = 0;
}

WUFile.prototype = {
  constructor: WUFile,

  /**
   * 设置状态，状态变化时会触发`change`事件。
   * @method setStatus
   * @grammar setStatus( status[, statusText] );
   * @param {File.Status|String} status [文件状态值](#WebUploader:File:File.Status)
   * @param {String} [statusText=''] 状态说明，常在error时使用，用http, abort,server等来标记是由于什么原因导致文件错误。
   */
  setStatus: function setStatus(status, text) {
    var prevStatus = statusMap[this.id];
    typeof text !== 'undefined' && (this.statusText = text);
    if (status !== prevStatus) {
      statusMap[this.id] = status;
      /**
       * 文件状态变化
       * @event statuschange
       */
      this.eventEmitter.trigger('statuschange', status, prevStatus);
    }
  },

  /**
   * 获取文件状态
   * @return {File.Status}
   * @example
   文件状态具体包括以下几种类型：
   {
       // 初始化
      INITED:     0,
      // 已入队列
      QUEUED:     1,
      // 正在上传
      PROGRESS:     2,
      // 上传出错
      ERROR:         3,
      // 上传成功
      COMPLETE:     4,
      // 上传取消
      CANCELLED:     5
  }
   */
  getStatus: function getStatus() {
    return statusMap[this.id];
  },

  /**
   * 获取文件原始信息。
   * @return {*}
   */
  getSource: function getSource() {
    return this.source;
  },

  destroy: function destroy() {
    delete statusMap[this.id];
  }
};

/**
 * 文件状态值，具体包括以下几种类型：
 * * `inited` 初始状态
 * * `queued` 已经进入队列, 等待上传
 * * `progress` 上传中
 * * `complete` 上传完成。
 * * `error` 上传出错，可重试
 * * `interrupt` 上传中断，可续传。
 * * `invalid` 文件不合格，不能重试上传。会自动从队列中移除。
 * * `cancelled` 文件被移除。
 * @property {Object} Status
 * @namespace File
 * @class File
 * @static
 */
WUFile.Status = {
  INITED: 'inited', // 初始状态
  QUEUED: 'queued', // 已经进入队列, 等待上传
  PROGRESS: 'progress', // 上传中
  ERROR: 'error', // 上传出错，可重试
  COMPLETE: 'complete', // 上传完成。
  CANCELLED: 'cancelled', // 上传取消。
  INTERRUPT: 'interrupt', // 上传中断，可续传。
  INVALID: 'invalid' // 文件不合格，不能重试上传。
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(12);

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = __webpack_require__(27);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(25);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(17);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(18);

var _createClass3 = _interopRequireDefault(_createClass2);

var _eventDelegate = __webpack_require__(41);

var _eventDelegate2 = _interopRequireDefault(_eventDelegate);

var _util = __webpack_require__(42);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
    function _class() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var pushQueue = arguments[1];

        var _this = this;

        var eventEmitter = arguments[2];
        var eventDelegate = arguments[3];
        (0, _classCallCheck3.default)(this, _class);

        this.config = config;

        this.inputId = 'fileUploadBtn-' + new Date().getTime();
        this.eventEmitter = eventEmitter;
        this.eventDelegate = eventDelegate;
        this.globalEventDelegate = new _eventDelegate2.default(document); // 全局的事件代理
        this.log = config.log;

        this._uploadGroupId = 0;

        this.pushQueue = function (file, groupInfo) {
            file = _this.fileFilter(file);
            if (file) {
                file.selectFileTransactionId = _this._uploadGroupId;
                pushQueue(file, groupInfo).catch(function (err) {
                    console.error(err);
                    debugger;
                });
            }
        };

        if (_util2.default.isPlainObject(this.config.accept)) {
            this.config.accept = [this.config.accept];
        }
        if (this.config.accept) {
            var arr = [];
            for (var i = 0, len = this.config.accept.length; i < len; i++) {
                var item = this.config.accept[i].extensions;
                item && arr.push(item);
            }
            if (arr.length) {
                this.accept = '\\.' + arr.join(',').replace(/,/g, '$|\\.').replace(/\*/g, '.*') + '$';
            }
            this.accept = new RegExp(this.accept, 'i');
        }
        this._pickOnChangeBindThis = this._pickOnChange.bind(this);
        this._pickOnClickBindThis = this._pickOnClick.bind(this);

        this._pickDirOnClickBindThis = this._pickDirOnClick.bind(this);
        this._pickDirOnChangeBindThis = this._pickDirOnChange.bind(this);

        this._dndHandleDragenterBindThis = this._dndHandleDragenter.bind(this);
        this._dndHandleDragoverBindThis = this._dndHandleDragover.bind(this);
        this._dndHandleDragleaveBindThis = this._dndHandleDragleave.bind(this);
        this._dndHandleDropBindThis = this._dndHandleDrop.bind(this);

        this.init();
    }

    (0, _createClass3.default)(_class, [{
        key: 'acceptFile',
        value: function acceptFile(file) {
            var invalid = !file || this.accept &&
            // 如果名字中有后缀，才做后缀白名单处理。
            /\.\w+$/.exec(file.name) && !this.accept.test(file.name);

            return !invalid;
        }
    }, {
        key: 'fileFilter',
        value: function fileFilter(file) {
            if (this.acceptFile(file)) {
                return file;
            } else {
                this.eventEmitter.emit('uploadError', file, '不支持的文件格式');
                return false;
            }
        }
    }, {
        key: 'init',
        value: function init() {
            var input = '<input type="file" id="' + this.inputId + '" name="fileselect[]" style="position:absolute;top:-100000px;">';
            var inputEle = _util2.default.parseToDOM(input)[0];

            var inputDir = '<input type="file" id="' + this.inputId + 'Dir" webkitdirectory mozdirectory name="fileselect[]" style="position:absolute;top:-100000px;">';
            var inputEleDir = _util2.default.parseToDOM(inputDir)[0];

            if (this.config.accept && this.config.accept.length > 0) {
                var arr = [];

                for (var i = 0, len = this.config.accept.length; i < len; i++) {
                    arr.push(this.config.accept[i].mimeTypes);
                }
                inputEle.setAttribute('accept', arr.join(','));
            }
            if (!!this.config.multiple) {
                inputEle.setAttribute('multiple', 'multiple');
            }

            // normal file input
            _util2.default.removeDOM('#' + this.inputId);
            this.config.body.appendChild(inputEle);

            // dir file input
            if (this.config.pickDir) {
                _util2.default.removeDOM('#' + this.inputId + 'Dir');
                this.config.body.appendChild(inputEleDir);
            }
            this.reset();
            if (this.config.pick) {
                this._pickHandle();
            }
            if (this.config.pickDir) {
                this._pickDirHandler();
            }
            if (this.config.dnd) {
                this._dndHandle();
            }
            if (this.config.paste) {
                this._pasteHandle();
            }
        }
    }, {
        key: '_resetinput',
        value: function _resetinput(ele) {
            ele.value = null;
        }
    }, {
        key: 'reset',
        value: function reset() {
            var inputEle = document.querySelector('#' + this.inputId);
            inputEle && this._resetinput(inputEle);

            var inputEleDir = document.querySelector('#' + this.inputId + 'Dir');
            inputEleDir && this._resetinput(inputEleDir);
        }
    }, {
        key: '_pasteHandle',
        value: function _pasteHandle() {
            var _this2 = this;

            if (this.config.paste) {
                this.eventDelegate.on('paste', this.config.paste, function () {
                    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
                        var res, clipboardData, items, i, item, blob, groupInfo;
                        return _regenerator2.default.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        _context.next = 2;
                                        return _this2.eventEmitter.emit('onPaste', { event: event });

                                    case 2:
                                        res = _context.sent;

                                        if (!(res.indexOf(false) !== -1)) {
                                            _context.next = 5;
                                            break;
                                        }

                                        return _context.abrupt('return', void 0);

                                    case 5:
                                        clipboardData = event.clipboardData;

                                        if (!clipboardData) {
                                            _context.next = 22;
                                            break;
                                        }

                                        items = clipboardData.items;
                                        i = 0;

                                    case 9:
                                        if (!(i < items.length)) {
                                            _context.next = 22;
                                            break;
                                        }

                                        item = items[i];
                                        blob = null;

                                        if (!(item.kind !== 'file' || !(blob = item.getAsFile()))) {
                                            _context.next = 14;
                                            break;
                                        }

                                        return _context.abrupt('continue', 19);

                                    case 14:
                                        event.stopPropagation();
                                        event.preventDefault();
                                        _this2._uploadGroupId++;
                                        groupInfo = {
                                            id: _this2._uploadGroupId,
                                            count: 1,
                                            current: 1
                                        };

                                        _this2.pushQueue(blob, groupInfo);

                                    case 19:
                                        ++i;
                                        _context.next = 9;
                                        break;

                                    case 22:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, _callee, _this2);
                    }));

                    return function (_x2) {
                        return _ref.apply(this, arguments);
                    };
                }());
            }
        }
    }, {
        key: '_pickHandle',
        value: function _pickHandle() {
            this.globalEventDelegate.on('change', '#' + this.inputId, this._pickOnChangeBindThis);
            this.globalEventDelegate.on('click', this.config.pick, this._pickOnClickBindThis);
        }
    }, {
        key: '_pickDirHandler',
        value: function _pickDirHandler() {
            this.globalEventDelegate.on('change', '#' + this.inputId + 'Dir', this._pickDirOnChangeBindThis);
            this.globalEventDelegate.on('click', this.config.pickDir, this._pickDirOnClickBindThis);
        }
    }, {
        key: '_pickOnChange',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(e) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                e.stopPropagation();
                                e.preventDefault();
                                _context2.next = 4;
                                return this.getFiles(e, 'pick');

                            case 4:
                                this.reset(); // 重复文件会不触发

                            case 5:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function _pickOnChange(_x3) {
                return _ref2.apply(this, arguments);
            }

            return _pickOnChange;
        }()
    }, {
        key: '_pickOnClick',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(e) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                e.stopPropagation();
                                e.preventDefault();
                                document.querySelector('#' + this.inputId).click();

                            case 3:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function _pickOnClick(_x4) {
                return _ref3.apply(this, arguments);
            }

            return _pickOnClick;
        }()
    }, {
        key: '_pickDirOnChange',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(e) {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                e.stopPropagation();
                                e.preventDefault();
                                _context4.next = 4;
                                return this.getFiles(e, 'pickDir');

                            case 4:
                                this.reset(); // 重复文件会不触发

                            case 5:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function _pickDirOnChange(_x5) {
                return _ref4.apply(this, arguments);
            }

            return _pickDirOnChange;
        }()
    }, {
        key: '_pickDirOnClick',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(e) {
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                e.stopPropagation();
                                e.preventDefault();
                                document.querySelector('#' + this.inputId + 'Dir').click();

                            case 3:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function _pickDirOnClick(_x6) {
                return _ref5.apply(this, arguments);
            }

            return _pickDirOnClick;
        }()
    }, {
        key: '_dndHandle',
        value: function _dndHandle() {
            if (this.config.dnd) {
                this.eventDelegate.on('dragenter', this.config.dnd, this._dndHandleDragenterBindThis);
                this.eventDelegate.on('dragover', this.config.dnd, this._dndHandleDragoverBindThis);
                this.eventDelegate.on('dragleave', this.config.dnd, this._dndHandleDragleaveBindThis);
                this.eventDelegate.on('drop', this.config.dnd, this._dndHandleDropBindThis);
            }
        }
    }, {
        key: '_dndHandleDragenter',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(e) {
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                e.stopPropagation();
                                e.preventDefault();

                            case 2:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function _dndHandleDragenter(_x7) {
                return _ref6.apply(this, arguments);
            }

            return _dndHandleDragenter;
        }()
    }, {
        key: '_dndHandleDragover',
        value: function () {
            var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(e) {
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                e.dataTransfer.dropEffect = 'copy'; // 兼容圈点APP
                                e.stopPropagation();
                                e.preventDefault();
                                this.eventEmitter.emit('dragover');

                            case 4:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function _dndHandleDragover(_x8) {
                return _ref7.apply(this, arguments);
            }

            return _dndHandleDragover;
        }()
    }, {
        key: '_dndHandleDragleave',
        value: function () {
            var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(e) {
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                e.stopPropagation();
                                e.preventDefault();
                                this.eventEmitter.emit('dragleave');

                            case 3:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function _dndHandleDragleave(_x9) {
                return _ref8.apply(this, arguments);
            }

            return _dndHandleDragleave;
        }()
    }, {
        key: '_dndHandleDrop',
        value: function () {
            var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(e) {
                return _regenerator2.default.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                e.stopPropagation();
                                e.preventDefault();
                                _context9.next = 4;
                                return this.getFiles(e, 'drop');

                            case 4:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function _dndHandleDrop(_x10) {
                return _ref9.apply(this, arguments);
            }

            return _dndHandleDrop;
        }()

        //获取选择文件，file控件或拖放
        // @actionType ['pick' || 'pickDir' || 'drop' ]

    }, {
        key: 'getFiles',
        value: function () {
            var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(e, actionType) {
                var _this3 = this;

                var tmpFileArr, uploadGroupId, files, items, filesArr, itemsArr, entryArr, res, pathReg, someFileName, dirName, entry, _res, i, len, file, item, _entry2;

                return _regenerator2.default.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                tmpFileArr = [];

                                this._uploadGroupId++;
                                uploadGroupId = this._uploadGroupId;
                                files = e.target.files || e.dataTransfer.files; // 后者在拖拽文件的情况会存在

                                items = e.dataTransfer && e.dataTransfer.items || []; // 拖拽的文件会有

                                filesArr = [].slice.call(files);
                                itemsArr = [].slice.call(items);
                                entryArr = itemsArr.map(function (item) {
                                    return item.getAsEntry ? item.getAsEntry() : item.webkitGetAsEntry ? item.webkitGetAsEntry() : null;
                                });
                                _context11.next = 10;
                                return this.eventEmitter.emit('beforeFilesSourceQueued', { filesSource: filesArr, actionType: actionType, uploadGroupId: uploadGroupId });

                            case 10:
                                res = _context11.sent;

                                if (!(res.indexOf(false) !== -1)) {
                                    _context11.next = 13;
                                    break;
                                }

                                return _context11.abrupt('return', void 0);

                            case 13:
                                if (!(actionType === 'pickDir')) {
                                    _context11.next = 30;
                                    break;
                                }

                                if (!(filesArr.length === 0)) {
                                    _context11.next = 16;
                                    break;
                                }

                                return _context11.abrupt('return', void 0);

                            case 16:
                                tmpFileArr = filesArr.map(function (item) {
                                    Object.defineProperty(item, 'path', {
                                        value: '/' + item.webkitRelativePath
                                    });
                                    return item;
                                });

                                pathReg = /\/(.*)\//;
                                someFileName = tmpFileArr[0].path;
                                dirName = someFileName.match(pathReg)[1];
                                entry = {};

                                entry.path = entry.fullPath = '/' + dirName;
                                entry.uploadGroupId = uploadGroupId;

                                _context11.next = 25;
                                return this.eventEmitter.emit('selectDir', { entry: entry, uploadGroupId: uploadGroupId, actionType: actionType });

                            case 25:
                                _res = _context11.sent;

                                if (!(_res.indexOf(false) !== -1)) {
                                    _context11.next = 28;
                                    break;
                                }

                                return _context11.abrupt('return', void 0);

                            case 28:
                                _context11.next = 44;
                                break;

                            case 30:
                                i = 0, len = filesArr.length;

                            case 31:
                                if (!(i < len)) {
                                    _context11.next = 44;
                                    break;
                                }

                                file = filesArr[i];
                                item = itemsArr[i];
                                _entry2 = entryArr[i];

                                if (!(_entry2 && _entry2.isDirectory)) {
                                    _context11.next = 39;
                                    break;
                                }

                                _context11.next = 38;
                                return this.folderRead({ entry: _entry2, tmpFileArr: tmpFileArr, uploadGroupId: uploadGroupId, actionType: actionType });

                            case 38:
                                return _context11.abrupt('continue', 41);

                            case 39:

                                // file.path = '/' + file.name; // PC版这种情况会有问题
                                Object.defineProperty(file, 'path', { value: '/' + file.name });

                                tmpFileArr.push(file);

                            case 41:
                                i++;
                                _context11.next = 31;
                                break;

                            case 44:

                                // TODO this.config.multiple to break the for cycle
                                if (this.config.multiple === false) {
                                    tmpFileArr = tmpFileArr[0] || [];
                                }

                                tmpFileArr.forEach(function () {
                                    var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(item, index, array) {
                                        var count, current, groupInfo;
                                        return _regenerator2.default.wrap(function _callee10$(_context10) {
                                            while (1) {
                                                switch (_context10.prev = _context10.next) {
                                                    case 0:
                                                        count = array.length;
                                                        current = index + 1;
                                                        groupInfo = {
                                                            count: count, current: current,
                                                            id: uploadGroupId
                                                        };
                                                        _context10.next = 5;
                                                        return _this3.pushQueue(item, groupInfo);

                                                    case 5:
                                                    case 'end':
                                                        return _context10.stop();
                                                }
                                            }
                                        }, _callee10, _this3);
                                    }));

                                    return function (_x13, _x14, _x15) {
                                        return _ref11.apply(this, arguments);
                                    };
                                }());
                                _context11.next = 48;
                                return this.eventEmitter.emit('filesSourceQueued', { filesSource: tmpFileArr, uploadGroupId: uploadGroupId, actionType: actionType });

                            case 48:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _callee11, this);
            }));

            function getFiles(_x11, _x12) {
                return _ref10.apply(this, arguments);
            }

            return getFiles;
        }()

        // add custom field: path uploadGroupId

    }, {
        key: 'folderRead',
        value: function () {
            var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(_ref12) {
                var _this4 = this;

                var entry = _ref12.entry,
                    tmpFileArr = _ref12.tmpFileArr,
                    uploadGroupId = _ref12.uploadGroupId,
                    actionType = _ref12.actionType;
                var eventResFlagArr;
                return _regenerator2.default.wrap(function _callee13$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                // custom field
                                entry.path = entry.fullPath;
                                entry.uploadGroupId = uploadGroupId; // old selectFileTransactionId

                                _context14.next = 4;
                                return this.eventEmitter.emit('selectDir', { entry: entry, uploadGroupId: uploadGroupId, actionType: actionType });

                            case 4:
                                eventResFlagArr = _context14.sent;

                                if (!(eventResFlagArr.indexOf(false) !== -1)) {
                                    _context14.next = 7;
                                    break;
                                }

                                return _context14.abrupt('return', void 0);

                            case 7:
                                _context14.next = 9;
                                return new _promise2.default(function (resolve) {
                                    entry.createReader().readEntries(function () {
                                        var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(entries) {
                                            var _loop, i;

                                            return _regenerator2.default.wrap(function _callee12$(_context13) {
                                                while (1) {
                                                    switch (_context13.prev = _context13.next) {
                                                        case 0:
                                                            _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop(i) {
                                                                var _entry, file;

                                                                return _regenerator2.default.wrap(function _loop$(_context12) {
                                                                    while (1) {
                                                                        switch (_context12.prev = _context12.next) {
                                                                            case 0:
                                                                                _entry = entries[i];

                                                                                if (!_entry.isFile) {
                                                                                    _context12.next = 12;
                                                                                    break;
                                                                                }

                                                                                _context12.next = 4;
                                                                                return new _promise2.default(function (r) {
                                                                                    _entry.file(function (file) {
                                                                                        return r(Object.defineProperty(file, 'path', { value: _entry.fullPath }));
                                                                                    });
                                                                                });

                                                                            case 4:
                                                                                file = _context12.sent;
                                                                                _context12.next = 7;
                                                                                return _this4.eventEmitter.emit('beforeChildFileQueued', { fileSource: file, parentEntry: entry, uploadGroupId: uploadGroupId, actionType: actionType });

                                                                            case 7:
                                                                                tmpFileArr.push(file);
                                                                                _context12.next = 10;
                                                                                return _this4.eventEmitter.emit('childFileQueued', { fileSource: file, parentEntry: entry, uploadGroupId: uploadGroupId, actionType: actionType });

                                                                            case 10:
                                                                                _context12.next = 19;
                                                                                break;

                                                                            case 12:
                                                                                if (!_entry.isDirectory) {
                                                                                    _context12.next = 19;
                                                                                    break;
                                                                                }

                                                                                _context12.next = 15;
                                                                                return _this4.eventEmitter.emit('beforeChildDirQueued', { currentEntry: _entry, parentEntry: entry, uploadGroupId: uploadGroupId, actionType: actionType });

                                                                            case 15:
                                                                                _context12.next = 17;
                                                                                return _this4.folderRead({ entry: _entry, tmpFileArr: tmpFileArr, uploadGroupId: uploadGroupId, actionType: actionType });

                                                                            case 17:
                                                                                _context12.next = 19;
                                                                                return _this4.eventEmitter.emit('childDirQueued', { currentEntry: _entry, parentEntry: entry, uploadGroupId: uploadGroupId, actionType: actionType });

                                                                            case 19:
                                                                            case 'end':
                                                                                return _context12.stop();
                                                                        }
                                                                    }
                                                                }, _loop, _this4);
                                                            });
                                                            i = 0;

                                                        case 2:
                                                            if (!(i < entries.length)) {
                                                                _context13.next = 7;
                                                                break;
                                                            }

                                                            return _context13.delegateYield(_loop(i), 't0', 4);

                                                        case 4:
                                                            i++;
                                                            _context13.next = 2;
                                                            break;

                                                        case 7:
                                                            resolve();

                                                        case 8:
                                                        case 'end':
                                                            return _context13.stop();
                                                    }
                                                }
                                            }, _callee12, _this4);
                                        }));

                                        return function (_x17) {
                                            return _ref14.apply(this, arguments);
                                        };
                                    }());
                                });

                            case 9:
                            case 'end':
                                return _context14.stop();
                        }
                    }
                }, _callee13, this);
            }));

            function folderRead(_x16) {
                return _ref13.apply(this, arguments);
            }

            return folderRead;
        }()
    }, {
        key: 'destroy',
        value: function destroy() {
            this.eventEmitter.removeEvents();

            if (this.config.dnd) {
                this.eventDelegate.off('dragover');
                this.eventDelegate.off('dragleave');
                this.eventDelegate.off('drop');
            }
            if (this.config.paste) {
                this.eventDelegate.off('paste');
            }

            this.globalEventDelegate.off('change');
            if (this.config.pick || this.config.pickDir) {
                this.globalEventDelegate.off('click');
            }
        }
    }, {
        key: 'on',
        value: function on(eventSource, fn) {
            this.eventEmitter.on(eventSource, fn);
        }
    }]);
    return _class;
}();

exports.default = _class;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var createLog = function createLog(logFunc, logLevel) {
    var LOG = {};
    LOG.ALL = function () {
        // logFunc('FILE_ALL', ...args);
        logFunc({
            logLevel: 'FILE_ALL',
            logInfo: arguments.length <= 0 ? undefined : arguments[0]
        });
    };
    LOG.DEBUG = function () {
        // logFunc('FILE_DEBUG', ...args);
        logFunc({
            logLevel: 'FILE_DEBUG',
            logInfo: arguments.length <= 0 ? undefined : arguments[0]
        });
    };
    LOG.INFO = function () {
        // logFunc('FILE_INFO', ...args);
        logFunc({
            logLevel: 'FILE_INFO',
            logInfo: arguments.length <= 0 ? undefined : arguments[0]
        });
    };
    LOG.WARN = function () {
        // logFunc('FILE_WARN', ...args);
        logFunc({
            logLevel: 'FILE_WARN',
            logInfo: arguments.length <= 0 ? undefined : arguments[0]
        });
    };
    LOG.ERROR = function () {
        // logFunc('FILE_ERROR', ...args);
        logFunc({
            logLevel: 'FILE_ERROR',
            logInfo: arguments.length <= 0 ? undefined : arguments[0]
        });
    };
    LOG.FATAL = function () {
        // logFunc('FILE_FATAL', ...args);
        logFunc({
            logLevel: 'FILE_FATAL',
            logInfo: arguments.length <= 0 ? undefined : arguments[0]
        });
    };
    LOG.OFF = function () {
        // logFunc('FILE_OFF', ...args);
        logFunc({
            logLevel: 'FILE_OFF',
            logInfo: arguments.length <= 0 ? undefined : arguments[0]
        });
    };

    return LOG;
};

exports.default = createLog;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Transport = undefined;

var _regenerator = __webpack_require__(27);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = __webpack_require__(43);

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = __webpack_require__(25);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__(12);

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = __webpack_require__(26);

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = __webpack_require__(17);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(18);

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = __webpack_require__(112);

var _lodash2 = _interopRequireDefault(_lodash);

var _eventBus = __webpack_require__(40);

var _eventBus2 = _interopRequireDefault(_eventBus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileOverview Transport
 */

var _options = {
    server: '',
    method: 'POST',
    fileVal: 'file',
    timeout: 2 * 60 * 1000, // 2分钟
    formData: {},
    headers: {},
    fileName: void 0
};

var Transport = exports.Transport = function () {
    function Transport(_blob, eventEmitter) {
        var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var blobObj = arguments[3];
        (0, _classCallCheck3.default)(this, Transport);

        if (!_blob) {
            throw new Error('blob should not empty');
        }
        this.eventEmitter = eventEmitter;
        this.config = (0, _lodash2.default)({}, _options, opts);
        this._blob = _blob;
        this.blobObj = blobObj;
        this.LOG = opts.LOG;
    }

    // 添加其他字段


    (0, _createClass3.default)(Transport, [{
        key: 'append',
        value: function append(key, value) {
            if ((typeof key === 'undefined' ? 'undefined' : (0, _typeof3.default)(key)) === 'object') {
                (0, _lodash2.default)(this.config.formData, key);
            } else {
                this.config.formData[key] = value;
            }
        }
    }, {
        key: 'setRequestHeader',
        value: function setRequestHeader(key, value) {
            if ((typeof key === 'undefined' ? 'undefined' : (0, _typeof3.default)(key)) === 'object') {
                (0, _lodash2.default)(this._headers, key);
            } else {
                this.config.headers[key] = value;
            }
        }
    }, {
        key: 'abort',
        value: function abort() {
            this.xhr.abort();
        }
    }, {
        key: 'send',
        value: function send() {
            var _this = this;

            return new _promise2.default(function () {
                var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(res, rej) {
                    var xhr, formData, endFlag;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    xhr = new XMLHttpRequest();

                                    _this.xhr = xhr;
                                    formData = new FormData();

                                    xhr.upload.addEventListener('progress', function (e) {
                                        //TODO 这里total给的超过文件大小了
                                        _this.eventEmitter.emit('uploadBlobProgress', e.loaded, e.total, _this.blobObj);
                                    }, false);
                                    if (_this.config.timeout !== 0) {
                                        xhr.timeout = _this.config.timeout;
                                    }

                                    endFlag = false;


                                    xhr.onabort = function () {
                                        endFlag = true;
                                        _this.LOG.ERROR({
                                            lifecycle: 'transport',
                                            httpCode: xhr.status,
                                            responseText: xhr.responseText,
                                            fileName: _this.blobObj.file.name,
                                            type: 'abort'
                                        });
                                        rej('abort|' + xhr.status + '|' + xhr.responseText);
                                        _this.eventEmitter.emit('abort', _this.blobObj, event);
                                    };
                                    xhr.onerror = function () {
                                        endFlag = true;
                                        _this.LOG.ERROR({
                                            lifecycle: 'transport',
                                            httpCode: xhr.status,
                                            responseText: xhr.responseText,
                                            fileName: _this.blobObj.file.name,
                                            type: 'error'
                                        });
                                        rej('error|' + xhr.status + '|' + xhr.responseText);
                                        _this.eventEmitter.emit('error', _this.blobObj, event);
                                    };
                                    xhr.ontimeout = function (event) {
                                        endFlag = true;
                                        _this.LOG.ERROR({
                                            lifecycle: 'transport',
                                            httpCode: xhr.status,
                                            responseText: xhr.responseText,
                                            fileName: _this.blobObj.file.name,
                                            type: 'timeout'
                                        });
                                        rej('timeout|' + xhr.status + '|' + xhr.responseText);
                                        _this.eventEmitter.emit('timeout', _this.blobObj, event);
                                    };
                                    xhr.onreadystatechange = function () {
                                        // next loop for wait other event handler
                                        setTimeout(function () {
                                            if (endFlag === true) {
                                                return void 0;
                                            }

                                            if (xhr.readyState === 4) {
                                                if (xhr.status >= 200 && xhr.status <= 300) {
                                                    _this.eventEmitter.emit('_uploadSuccess', _this._blob, xhr.responseText);
                                                    _this.LOG.INFO({
                                                        lifecycle: 'transport',
                                                        httpCode: xhr.status,
                                                        responseText: xhr.responseText,
                                                        fileName: _this.blobObj.file.name
                                                    });
                                                    res(xhr.responseText);
                                                } else {
                                                    _this.LOG.ERROR({
                                                        lifecycle: 'transport',
                                                        httpCode: xhr.status,
                                                        responseText: xhr.responseText,
                                                        fileName: _this.blobObj.file.name
                                                    });
                                                    _this.eventEmitter.emit('_uploadError', xhr.statusText);
                                                    rej('other|' + xhr.status + '|' + xhr.responseText);
                                                }
                                            }
                                        }, 0);
                                    };

                                    (0, _keys2.default)(_this.config.formData).forEach(function (key) {
                                        formData.append(key, _this.config.formData[key]);
                                    });

                                    if (_this._blob instanceof Blob) {
                                        _context.next = 15;
                                        break;
                                    }

                                    _context.next = 14;
                                    return _this._blob.toBlob();

                                case 14:
                                    _this._blob = _context.sent;

                                case 15:

                                    formData.append(_this.config.fileVal, _this._blob, _this.config.fileName);
                                    xhr.open(_this.config.method, _this.config.server, true);

                                    if (_this.config.withCredentials === true) {
                                        xhr.withCredentials = true;
                                    }

                                    _this.config.headers && (0, _keys2.default)(_this.config.headers).forEach(function (key) {
                                        xhr.setRequestHeader(key, _this.config.headers[key]);
                                    });
                                    xhr.send(formData);

                                case 20:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this);
                }));

                return function (_x2, _x3) {
                    return _ref.apply(this, arguments);
                };
            }());
        }
    }]);
    return Transport;
}();

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(70), __esModule: true };

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(71), __esModule: true };

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(75), __esModule: true };

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(103);
module.exports = __webpack_require__(1).Object.assign;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(104);
var $Object = __webpack_require__(1).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(105);
module.exports = __webpack_require__(1).Object.keys;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58);
__webpack_require__(59);
__webpack_require__(60);
__webpack_require__(106);
__webpack_require__(108);
__webpack_require__(109);
module.exports = __webpack_require__(1).Promise;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(107);
__webpack_require__(58);
__webpack_require__(110);
__webpack_require__(111);
module.exports = __webpack_require__(1).Symbol;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(59);
__webpack_require__(60);
module.exports = __webpack_require__(39).f('iterator');


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(11);
var toLength = __webpack_require__(57);
var toAbsoluteIndex = __webpack_require__(99);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(16);
var gOPS = __webpack_require__(32);
var pIE = __webpack_require__(21);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(20);
var call = __webpack_require__(84);
var isArrayIter = __webpack_require__(82);
var anObject = __webpack_require__(3);
var toLength = __webpack_require__(57);
var getIterFn = __webpack_require__(101);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 81 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(14);
var ITERATOR = __webpack_require__(2)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(13);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(3);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(49);
var descriptor = __webpack_require__(22);
var setToStringTag = __webpack_require__(23);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(8)(IteratorPrototype, __webpack_require__(2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(2)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(24)('meta');
var isObject = __webpack_require__(9);
var has = __webpack_require__(7);
var setDesc = __webpack_require__(6).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(10)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var macrotask = __webpack_require__(56).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(13)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(16);
var gOPS = __webpack_require__(32);
var pIE = __webpack_require__(21);
var toObject = __webpack_require__(36);
var IObject = __webpack_require__(47);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(10)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var anObject = __webpack_require__(3);
var getKeys = __webpack_require__(16);

module.exports = __webpack_require__(4) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(21);
var createDesc = __webpack_require__(22);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(37);
var has = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(46);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(4) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(11);
var gOPN = __webpack_require__(50).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(7);
var toObject = __webpack_require__(36);
var IE_PROTO = __webpack_require__(33)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(5);
var core = __webpack_require__(1);
var fails = __webpack_require__(10);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(8);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(0);
var core = __webpack_require__(1);
var dP = __webpack_require__(6);
var DESCRIPTORS = __webpack_require__(4);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35);
var defined = __webpack_require__(28);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(44);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(14);
module.exports = __webpack_require__(1).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(76);
var step = __webpack_require__(87);
var Iterators = __webpack_require__(14);
var toIObject = __webpack_require__(11);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(48)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(5);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(90) });


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(5);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(4), 'Object', { defineProperty: __webpack_require__(6).f });


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(36);
var $keys = __webpack_require__(16);

__webpack_require__(95)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(15);
var global = __webpack_require__(0);
var ctx = __webpack_require__(20);
var classof = __webpack_require__(44);
var $export = __webpack_require__(5);
var isObject = __webpack_require__(9);
var aFunction = __webpack_require__(19);
var anInstance = __webpack_require__(77);
var forOf = __webpack_require__(80);
var speciesConstructor = __webpack_require__(55);
var task = __webpack_require__(56).set;
var microtask = __webpack_require__(89)();
var newPromiseCapabilityModule = __webpack_require__(31);
var perform = __webpack_require__(52);
var userAgent = __webpack_require__(100);
var promiseResolve = __webpack_require__(53);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(2)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(96)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(23)($Promise, PROMISE);
__webpack_require__(97)(PROMISE);
Wrapper = __webpack_require__(1)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(86)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(0);
var has = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(4);
var $export = __webpack_require__(5);
var redefine = __webpack_require__(54);
var META = __webpack_require__(88).KEY;
var $fails = __webpack_require__(10);
var shared = __webpack_require__(34);
var setToStringTag = __webpack_require__(23);
var uid = __webpack_require__(24);
var wks = __webpack_require__(2);
var wksExt = __webpack_require__(39);
var wksDefine = __webpack_require__(38);
var enumKeys = __webpack_require__(79);
var isArray = __webpack_require__(83);
var anObject = __webpack_require__(3);
var isObject = __webpack_require__(9);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(37);
var createDesc = __webpack_require__(22);
var _create = __webpack_require__(49);
var gOPNExt = __webpack_require__(93);
var $GOPD = __webpack_require__(92);
var $DP = __webpack_require__(6);
var $keys = __webpack_require__(16);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(50).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(21).f = $propertyIsEnumerable;
  __webpack_require__(32).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(15)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(8)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(5);
var core = __webpack_require__(1);
var global = __webpack_require__(0);
var speciesConstructor = __webpack_require__(55);
var promiseResolve = __webpack_require__(53);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(5);
var newPromiseCapability = __webpack_require__(31);
var perform = __webpack_require__(52);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('asyncIterator');


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('observable');


/***/ }),
/* 112 */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */
var assign = createAssigner(function(object, source) {
  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = assign;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(114);

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
/* 114 */
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
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
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
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function() {
  return __webpack_require__(116)("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// identity function for calling harmony imports with the correct context\n/******/ \t__webpack_require__.i = function(value) { return value; };\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, {\n/******/ \t\t\t\tconfigurable: false,\n/******/ \t\t\t\tenumerable: true,\n/******/ \t\t\t\tget: getter\n/******/ \t\t\t});\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = 37);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ (function(module, exports) {\n\n// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028\nvar global = module.exports = typeof window != 'undefined' && window.Math == Math\n  ? window : typeof self != 'undefined' && self.Math == Math ? self\n  // eslint-disable-next-line no-new-func\n  : Function('return this')();\nif (typeof __g == 'number') __g = global; // eslint-disable-line no-undef\n\n\n/***/ }),\n/* 1 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar store = __webpack_require__(30)('wks');\nvar uid = __webpack_require__(34);\nvar Symbol = __webpack_require__(0).Symbol;\nvar USE_SYMBOL = typeof Symbol == 'function';\n\nvar $exports = module.exports = function (name) {\n  return store[name] || (store[name] =\n    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));\n};\n\n$exports.store = store;\n\n\n/***/ }),\n/* 2 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar isObject = __webpack_require__(6);\nmodule.exports = function (it) {\n  if (!isObject(it)) throw TypeError(it + ' is not an object!');\n  return it;\n};\n\n\n/***/ }),\n/* 3 */\n/***/ (function(module, exports) {\n\nvar core = module.exports = { version: '2.5.7' };\nif (typeof __e == 'number') __e = core; // eslint-disable-line no-undef\n\n\n/***/ }),\n/* 4 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar dP = __webpack_require__(13);\nvar createDesc = __webpack_require__(29);\nmodule.exports = __webpack_require__(5) ? function (object, key, value) {\n  return dP.f(object, key, createDesc(1, value));\n} : function (object, key, value) {\n  object[key] = value;\n  return object;\n};\n\n\n/***/ }),\n/* 5 */\n/***/ (function(module, exports, __webpack_require__) {\n\n// Thank's IE8 for his funny defineProperty\nmodule.exports = !__webpack_require__(24)(function () {\n  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;\n});\n\n\n/***/ }),\n/* 6 */\n/***/ (function(module, exports) {\n\nmodule.exports = function (it) {\n  return typeof it === 'object' ? it !== null : typeof it === 'function';\n};\n\n\n/***/ }),\n/* 7 */\n/***/ (function(module, exports) {\n\nmodule.exports = {};\n\n\n/***/ }),\n/* 8 */\n/***/ (function(module, exports) {\n\nmodule.exports = function (it) {\n  if (typeof it != 'function') throw TypeError(it + ' is not a function!');\n  return it;\n};\n\n\n/***/ }),\n/* 9 */\n/***/ (function(module, exports) {\n\nvar toString = {}.toString;\n\nmodule.exports = function (it) {\n  return toString.call(it).slice(8, -1);\n};\n\n\n/***/ }),\n/* 10 */\n/***/ (function(module, exports, __webpack_require__) {\n\n// optional / simple context binding\nvar aFunction = __webpack_require__(8);\nmodule.exports = function (fn, that, length) {\n  aFunction(fn);\n  if (that === undefined) return fn;\n  switch (length) {\n    case 1: return function (a) {\n      return fn.call(that, a);\n    };\n    case 2: return function (a, b) {\n      return fn.call(that, a, b);\n    };\n    case 3: return function (a, b, c) {\n      return fn.call(that, a, b, c);\n    };\n  }\n  return function (/* ...args */) {\n    return fn.apply(that, arguments);\n  };\n};\n\n\n/***/ }),\n/* 11 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar global = __webpack_require__(0);\nvar core = __webpack_require__(3);\nvar ctx = __webpack_require__(10);\nvar hide = __webpack_require__(4);\nvar has = __webpack_require__(12);\nvar PROTOTYPE = 'prototype';\n\nvar $export = function (type, name, source) {\n  var IS_FORCED = type & $export.F;\n  var IS_GLOBAL = type & $export.G;\n  var IS_STATIC = type & $export.S;\n  var IS_PROTO = type & $export.P;\n  var IS_BIND = type & $export.B;\n  var IS_WRAP = type & $export.W;\n  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});\n  var expProto = exports[PROTOTYPE];\n  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];\n  var key, own, out;\n  if (IS_GLOBAL) source = name;\n  for (key in source) {\n    // contains in native\n    own = !IS_FORCED && target && target[key] !== undefined;\n    if (own && has(exports, key)) continue;\n    // export native or passed\n    out = own ? target[key] : source[key];\n    // prevent global pollution for namespaces\n    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]\n    // bind timers to global for call from export context\n    : IS_BIND && own ? ctx(out, global)\n    // wrap global constructors for prevent change them in library\n    : IS_WRAP && target[key] == out ? (function (C) {\n      var F = function (a, b, c) {\n        if (this instanceof C) {\n          switch (arguments.length) {\n            case 0: return new C();\n            case 1: return new C(a);\n            case 2: return new C(a, b);\n          } return new C(a, b, c);\n        } return C.apply(this, arguments);\n      };\n      F[PROTOTYPE] = C[PROTOTYPE];\n      return F;\n    // make static versions for prototype methods\n    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;\n    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%\n    if (IS_PROTO) {\n      (exports.virtual || (exports.virtual = {}))[key] = out;\n      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%\n      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);\n    }\n  }\n};\n// type bitmap\n$export.F = 1;   // forced\n$export.G = 2;   // global\n$export.S = 4;   // static\n$export.P = 8;   // proto\n$export.B = 16;  // bind\n$export.W = 32;  // wrap\n$export.U = 64;  // safe\n$export.R = 128; // real proto method for `library`\nmodule.exports = $export;\n\n\n/***/ }),\n/* 12 */\n/***/ (function(module, exports) {\n\nvar hasOwnProperty = {}.hasOwnProperty;\nmodule.exports = function (it, key) {\n  return hasOwnProperty.call(it, key);\n};\n\n\n/***/ }),\n/* 13 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar anObject = __webpack_require__(2);\nvar IE8_DOM_DEFINE = __webpack_require__(43);\nvar toPrimitive = __webpack_require__(63);\nvar dP = Object.defineProperty;\n\nexports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes) {\n  anObject(O);\n  P = toPrimitive(P, true);\n  anObject(Attributes);\n  if (IE8_DOM_DEFINE) try {\n    return dP(O, P, Attributes);\n  } catch (e) { /* empty */ }\n  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');\n  if ('value' in Attributes) O[P] = Attributes.value;\n  return O;\n};\n\n\n/***/ }),\n/* 14 */\n/***/ (function(module, exports) {\n\n// 7.2.1 RequireObjectCoercible(argument)\nmodule.exports = function (it) {\n  if (it == undefined) throw TypeError(\"Can't call method on  \" + it);\n  return it;\n};\n\n\n/***/ }),\n/* 15 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar isObject = __webpack_require__(6);\nvar document = __webpack_require__(0).document;\n// typeof document.createElement is 'object' in old IE\nvar is = isObject(document) && isObject(document.createElement);\nmodule.exports = function (it) {\n  return is ? document.createElement(it) : {};\n};\n\n\n/***/ }),\n/* 16 */\n/***/ (function(module, exports) {\n\nmodule.exports = true;\n\n\n/***/ }),\n/* 17 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n// 25.4.1.5 NewPromiseCapability(C)\nvar aFunction = __webpack_require__(8);\n\nfunction PromiseCapability(C) {\n  var resolve, reject;\n  this.promise = new C(function ($$resolve, $$reject) {\n    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');\n    resolve = $$resolve;\n    reject = $$reject;\n  });\n  this.resolve = aFunction(resolve);\n  this.reject = aFunction(reject);\n}\n\nmodule.exports.f = function (C) {\n  return new PromiseCapability(C);\n};\n\n\n/***/ }),\n/* 18 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar def = __webpack_require__(13).f;\nvar has = __webpack_require__(12);\nvar TAG = __webpack_require__(1)('toStringTag');\n\nmodule.exports = function (it, tag, stat) {\n  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });\n};\n\n\n/***/ }),\n/* 19 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar shared = __webpack_require__(30)('keys');\nvar uid = __webpack_require__(34);\nmodule.exports = function (key) {\n  return shared[key] || (shared[key] = uid(key));\n};\n\n\n/***/ }),\n/* 20 */\n/***/ (function(module, exports) {\n\n// 7.1.4 ToInteger\nvar ceil = Math.ceil;\nvar floor = Math.floor;\nmodule.exports = function (it) {\n  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);\n};\n\n\n/***/ }),\n/* 21 */\n/***/ (function(module, exports, __webpack_require__) {\n\n// to indexed object, toObject with fallback for non-array-like ES3 strings\nvar IObject = __webpack_require__(45);\nvar defined = __webpack_require__(14);\nmodule.exports = function (it) {\n  return IObject(defined(it));\n};\n\n\n/***/ }),\n/* 22 */\n/***/ (function(module, exports, __webpack_require__) {\n\n// getting tag from 19.1.3.6 Object.prototype.toString()\nvar cof = __webpack_require__(9);\nvar TAG = __webpack_require__(1)('toStringTag');\n// ES3 wrong here\nvar ARG = cof(function () { return arguments; }()) == 'Arguments';\n\n// fallback for IE11 Script Access Denied error\nvar tryGet = function (it, key) {\n  try {\n    return it[key];\n  } catch (e) { /* empty */ }\n};\n\nmodule.exports = function (it) {\n  var O, T, B;\n  return it === undefined ? 'Undefined' : it === null ? 'Null'\n    // @@toStringTag case\n    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T\n    // builtinTag case\n    : ARG ? cof(O)\n    // ES3 arguments fallback\n    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;\n};\n\n\n/***/ }),\n/* 23 */\n/***/ (function(module, exports) {\n\n// IE 8- don't enum bug keys\nmodule.exports = (\n  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'\n).split(',');\n\n\n/***/ }),\n/* 24 */\n/***/ (function(module, exports) {\n\nmodule.exports = function (exec) {\n  try {\n    return !!exec();\n  } catch (e) {\n    return true;\n  }\n};\n\n\n/***/ }),\n/* 25 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar document = __webpack_require__(0).document;\nmodule.exports = document && document.documentElement;\n\n\n/***/ }),\n/* 26 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nvar LIBRARY = __webpack_require__(16);\nvar $export = __webpack_require__(11);\nvar redefine = __webpack_require__(58);\nvar hide = __webpack_require__(4);\nvar Iterators = __webpack_require__(7);\nvar $iterCreate = __webpack_require__(48);\nvar setToStringTag = __webpack_require__(18);\nvar getPrototypeOf = __webpack_require__(54);\nvar ITERATOR = __webpack_require__(1)('iterator');\nvar BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`\nvar FF_ITERATOR = '@@iterator';\nvar KEYS = 'keys';\nvar VALUES = 'values';\n\nvar returnThis = function () { return this; };\n\nmodule.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {\n  $iterCreate(Constructor, NAME, next);\n  var getMethod = function (kind) {\n    if (!BUGGY && kind in proto) return proto[kind];\n    switch (kind) {\n      case KEYS: return function keys() { return new Constructor(this, kind); };\n      case VALUES: return function values() { return new Constructor(this, kind); };\n    } return function entries() { return new Constructor(this, kind); };\n  };\n  var TAG = NAME + ' Iterator';\n  var DEF_VALUES = DEFAULT == VALUES;\n  var VALUES_BUG = false;\n  var proto = Base.prototype;\n  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];\n  var $default = $native || getMethod(DEFAULT);\n  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;\n  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;\n  var methods, key, IteratorPrototype;\n  // Fix native\n  if ($anyNative) {\n    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));\n    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {\n      // Set @@toStringTag to native iterators\n      setToStringTag(IteratorPrototype, TAG, true);\n      // fix for some old engines\n      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);\n    }\n  }\n  // fix Array#{values, @@iterator}.name in V8 / FF\n  if (DEF_VALUES && $native && $native.name !== VALUES) {\n    VALUES_BUG = true;\n    $default = function values() { return $native.call(this); };\n  }\n  // Define iterator\n  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {\n    hide(proto, ITERATOR, $default);\n  }\n  // Plug for library\n  Iterators[NAME] = $default;\n  Iterators[TAG] = returnThis;\n  if (DEFAULT) {\n    methods = {\n      values: DEF_VALUES ? $default : getMethod(VALUES),\n      keys: IS_SET ? $default : getMethod(KEYS),\n      entries: $entries\n    };\n    if (FORCED) for (key in methods) {\n      if (!(key in proto)) redefine(proto, key, methods[key]);\n    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);\n  }\n  return methods;\n};\n\n\n/***/ }),\n/* 27 */\n/***/ (function(module, exports) {\n\nmodule.exports = function (exec) {\n  try {\n    return { e: false, v: exec() };\n  } catch (e) {\n    return { e: true, v: e };\n  }\n};\n\n\n/***/ }),\n/* 28 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar anObject = __webpack_require__(2);\nvar isObject = __webpack_require__(6);\nvar newPromiseCapability = __webpack_require__(17);\n\nmodule.exports = function (C, x) {\n  anObject(C);\n  if (isObject(x) && x.constructor === C) return x;\n  var promiseCapability = newPromiseCapability.f(C);\n  var resolve = promiseCapability.resolve;\n  resolve(x);\n  return promiseCapability.promise;\n};\n\n\n/***/ }),\n/* 29 */\n/***/ (function(module, exports) {\n\nmodule.exports = function (bitmap, value) {\n  return {\n    enumerable: !(bitmap & 1),\n    configurable: !(bitmap & 2),\n    writable: !(bitmap & 4),\n    value: value\n  };\n};\n\n\n/***/ }),\n/* 30 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar core = __webpack_require__(3);\nvar global = __webpack_require__(0);\nvar SHARED = '__core-js_shared__';\nvar store = global[SHARED] || (global[SHARED] = {});\n\n(module.exports = function (key, value) {\n  return store[key] || (store[key] = value !== undefined ? value : {});\n})('versions', []).push({\n  version: core.version,\n  mode: __webpack_require__(16) ? 'pure' : 'global',\n  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'\n});\n\n\n/***/ }),\n/* 31 */\n/***/ (function(module, exports, __webpack_require__) {\n\n// 7.3.20 SpeciesConstructor(O, defaultConstructor)\nvar anObject = __webpack_require__(2);\nvar aFunction = __webpack_require__(8);\nvar SPECIES = __webpack_require__(1)('species');\nmodule.exports = function (O, D) {\n  var C = anObject(O).constructor;\n  var S;\n  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);\n};\n\n\n/***/ }),\n/* 32 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar ctx = __webpack_require__(10);\nvar invoke = __webpack_require__(44);\nvar html = __webpack_require__(25);\nvar cel = __webpack_require__(15);\nvar global = __webpack_require__(0);\nvar process = global.process;\nvar setTask = global.setImmediate;\nvar clearTask = global.clearImmediate;\nvar MessageChannel = global.MessageChannel;\nvar Dispatch = global.Dispatch;\nvar counter = 0;\nvar queue = {};\nvar ONREADYSTATECHANGE = 'onreadystatechange';\nvar defer, channel, port;\nvar run = function () {\n  var id = +this;\n  // eslint-disable-next-line no-prototype-builtins\n  if (queue.hasOwnProperty(id)) {\n    var fn = queue[id];\n    delete queue[id];\n    fn();\n  }\n};\nvar listener = function (event) {\n  run.call(event.data);\n};\n// Node.js 0.9+ & IE10+ has setImmediate, otherwise:\nif (!setTask || !clearTask) {\n  setTask = function setImmediate(fn) {\n    var args = [];\n    var i = 1;\n    while (arguments.length > i) args.push(arguments[i++]);\n    queue[++counter] = function () {\n      // eslint-disable-next-line no-new-func\n      invoke(typeof fn == 'function' ? fn : Function(fn), args);\n    };\n    defer(counter);\n    return counter;\n  };\n  clearTask = function clearImmediate(id) {\n    delete queue[id];\n  };\n  // Node.js 0.8-\n  if (__webpack_require__(9)(process) == 'process') {\n    defer = function (id) {\n      process.nextTick(ctx(run, id, 1));\n    };\n  // Sphere (JS game engine) Dispatch API\n  } else if (Dispatch && Dispatch.now) {\n    defer = function (id) {\n      Dispatch.now(ctx(run, id, 1));\n    };\n  // Browsers with MessageChannel, includes WebWorkers\n  } else if (MessageChannel) {\n    channel = new MessageChannel();\n    port = channel.port2;\n    channel.port1.onmessage = listener;\n    defer = ctx(port.postMessage, port, 1);\n  // Browsers with postMessage, skip WebWorkers\n  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'\n  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {\n    defer = function (id) {\n      global.postMessage(id + '', '*');\n    };\n    global.addEventListener('message', listener, false);\n  // IE8-\n  } else if (ONREADYSTATECHANGE in cel('script')) {\n    defer = function (id) {\n      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {\n        html.removeChild(this);\n        run.call(id);\n      };\n    };\n  // Rest old browsers\n  } else {\n    defer = function (id) {\n      setTimeout(ctx(run, id, 1), 0);\n    };\n  }\n}\nmodule.exports = {\n  set: setTask,\n  clear: clearTask\n};\n\n\n/***/ }),\n/* 33 */\n/***/ (function(module, exports, __webpack_require__) {\n\n// 7.1.15 ToLength\nvar toInteger = __webpack_require__(20);\nvar min = Math.min;\nmodule.exports = function (it) {\n  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991\n};\n\n\n/***/ }),\n/* 34 */\n/***/ (function(module, exports) {\n\nvar id = 0;\nvar px = Math.random();\nmodule.exports = function (key) {\n  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));\n};\n\n\n/***/ }),\n/* 35 */\n/***/ (function(module, exports, __webpack_require__) {\n\nmodule.exports = { \"default\": __webpack_require__(38), __esModule: true };\n\n/***/ }),\n/* 36 */\n/***/ (function(module, exports, __webpack_require__) {\n\n(function (factory) {\n    if (true) {\n        // Node/CommonJS\n        module.exports = factory();\n    } else if (typeof define === 'function' && define.amd) {\n        // AMD\n        define(factory);\n    } else {\n        // Browser globals (with support for web workers)\n        var glob;\n\n        try {\n            glob = window;\n        } catch (e) {\n            glob = self;\n        }\n\n        glob.SparkMD5 = factory();\n    }\n}(function (undefined) {\n\n    'use strict';\n\n    /*\n     * Fastest md5 implementation around (JKM md5).\n     * Credits: Joseph Myers\n     *\n     * @see http://www.myersdaily.org/joseph/javascript/md5-text.html\n     * @see http://jsperf.com/md5-shootout/7\n     */\n\n    /* this function is much faster,\n      so if possible we use it. Some IEs\n      are the only ones I know of that\n      need the idiotic second function,\n      generated by an if clause.  */\n    var add32 = function (a, b) {\n        return (a + b) & 0xFFFFFFFF;\n    },\n        hex_chr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];\n\n\n    function cmn(q, a, b, x, s, t) {\n        a = add32(add32(a, q), add32(x, t));\n        return add32((a << s) | (a >>> (32 - s)), b);\n    }\n\n    function md5cycle(x, k) {\n        var a = x[0],\n            b = x[1],\n            c = x[2],\n            d = x[3];\n\n        a += (b & c | ~b & d) + k[0] - 680876936 | 0;\n        a  = (a << 7 | a >>> 25) + b | 0;\n        d += (a & b | ~a & c) + k[1] - 389564586 | 0;\n        d  = (d << 12 | d >>> 20) + a | 0;\n        c += (d & a | ~d & b) + k[2] + 606105819 | 0;\n        c  = (c << 17 | c >>> 15) + d | 0;\n        b += (c & d | ~c & a) + k[3] - 1044525330 | 0;\n        b  = (b << 22 | b >>> 10) + c | 0;\n        a += (b & c | ~b & d) + k[4] - 176418897 | 0;\n        a  = (a << 7 | a >>> 25) + b | 0;\n        d += (a & b | ~a & c) + k[5] + 1200080426 | 0;\n        d  = (d << 12 | d >>> 20) + a | 0;\n        c += (d & a | ~d & b) + k[6] - 1473231341 | 0;\n        c  = (c << 17 | c >>> 15) + d | 0;\n        b += (c & d | ~c & a) + k[7] - 45705983 | 0;\n        b  = (b << 22 | b >>> 10) + c | 0;\n        a += (b & c | ~b & d) + k[8] + 1770035416 | 0;\n        a  = (a << 7 | a >>> 25) + b | 0;\n        d += (a & b | ~a & c) + k[9] - 1958414417 | 0;\n        d  = (d << 12 | d >>> 20) + a | 0;\n        c += (d & a | ~d & b) + k[10] - 42063 | 0;\n        c  = (c << 17 | c >>> 15) + d | 0;\n        b += (c & d | ~c & a) + k[11] - 1990404162 | 0;\n        b  = (b << 22 | b >>> 10) + c | 0;\n        a += (b & c | ~b & d) + k[12] + 1804603682 | 0;\n        a  = (a << 7 | a >>> 25) + b | 0;\n        d += (a & b | ~a & c) + k[13] - 40341101 | 0;\n        d  = (d << 12 | d >>> 20) + a | 0;\n        c += (d & a | ~d & b) + k[14] - 1502002290 | 0;\n        c  = (c << 17 | c >>> 15) + d | 0;\n        b += (c & d | ~c & a) + k[15] + 1236535329 | 0;\n        b  = (b << 22 | b >>> 10) + c | 0;\n\n        a += (b & d | c & ~d) + k[1] - 165796510 | 0;\n        a  = (a << 5 | a >>> 27) + b | 0;\n        d += (a & c | b & ~c) + k[6] - 1069501632 | 0;\n        d  = (d << 9 | d >>> 23) + a | 0;\n        c += (d & b | a & ~b) + k[11] + 643717713 | 0;\n        c  = (c << 14 | c >>> 18) + d | 0;\n        b += (c & a | d & ~a) + k[0] - 373897302 | 0;\n        b  = (b << 20 | b >>> 12) + c | 0;\n        a += (b & d | c & ~d) + k[5] - 701558691 | 0;\n        a  = (a << 5 | a >>> 27) + b | 0;\n        d += (a & c | b & ~c) + k[10] + 38016083 | 0;\n        d  = (d << 9 | d >>> 23) + a | 0;\n        c += (d & b | a & ~b) + k[15] - 660478335 | 0;\n        c  = (c << 14 | c >>> 18) + d | 0;\n        b += (c & a | d & ~a) + k[4] - 405537848 | 0;\n        b  = (b << 20 | b >>> 12) + c | 0;\n        a += (b & d | c & ~d) + k[9] + 568446438 | 0;\n        a  = (a << 5 | a >>> 27) + b | 0;\n        d += (a & c | b & ~c) + k[14] - 1019803690 | 0;\n        d  = (d << 9 | d >>> 23) + a | 0;\n        c += (d & b | a & ~b) + k[3] - 187363961 | 0;\n        c  = (c << 14 | c >>> 18) + d | 0;\n        b += (c & a | d & ~a) + k[8] + 1163531501 | 0;\n        b  = (b << 20 | b >>> 12) + c | 0;\n        a += (b & d | c & ~d) + k[13] - 1444681467 | 0;\n        a  = (a << 5 | a >>> 27) + b | 0;\n        d += (a & c | b & ~c) + k[2] - 51403784 | 0;\n        d  = (d << 9 | d >>> 23) + a | 0;\n        c += (d & b | a & ~b) + k[7] + 1735328473 | 0;\n        c  = (c << 14 | c >>> 18) + d | 0;\n        b += (c & a | d & ~a) + k[12] - 1926607734 | 0;\n        b  = (b << 20 | b >>> 12) + c | 0;\n\n        a += (b ^ c ^ d) + k[5] - 378558 | 0;\n        a  = (a << 4 | a >>> 28) + b | 0;\n        d += (a ^ b ^ c) + k[8] - 2022574463 | 0;\n        d  = (d << 11 | d >>> 21) + a | 0;\n        c += (d ^ a ^ b) + k[11] + 1839030562 | 0;\n        c  = (c << 16 | c >>> 16) + d | 0;\n        b += (c ^ d ^ a) + k[14] - 35309556 | 0;\n        b  = (b << 23 | b >>> 9) + c | 0;\n        a += (b ^ c ^ d) + k[1] - 1530992060 | 0;\n        a  = (a << 4 | a >>> 28) + b | 0;\n        d += (a ^ b ^ c) + k[4] + 1272893353 | 0;\n        d  = (d << 11 | d >>> 21) + a | 0;\n        c += (d ^ a ^ b) + k[7] - 155497632 | 0;\n        c  = (c << 16 | c >>> 16) + d | 0;\n        b += (c ^ d ^ a) + k[10] - 1094730640 | 0;\n        b  = (b << 23 | b >>> 9) + c | 0;\n        a += (b ^ c ^ d) + k[13] + 681279174 | 0;\n        a  = (a << 4 | a >>> 28) + b | 0;\n        d += (a ^ b ^ c) + k[0] - 358537222 | 0;\n        d  = (d << 11 | d >>> 21) + a | 0;\n        c += (d ^ a ^ b) + k[3] - 722521979 | 0;\n        c  = (c << 16 | c >>> 16) + d | 0;\n        b += (c ^ d ^ a) + k[6] + 76029189 | 0;\n        b  = (b << 23 | b >>> 9) + c | 0;\n        a += (b ^ c ^ d) + k[9] - 640364487 | 0;\n        a  = (a << 4 | a >>> 28) + b | 0;\n        d += (a ^ b ^ c) + k[12] - 421815835 | 0;\n        d  = (d << 11 | d >>> 21) + a | 0;\n        c += (d ^ a ^ b) + k[15] + 530742520 | 0;\n        c  = (c << 16 | c >>> 16) + d | 0;\n        b += (c ^ d ^ a) + k[2] - 995338651 | 0;\n        b  = (b << 23 | b >>> 9) + c | 0;\n\n        a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;\n        a  = (a << 6 | a >>> 26) + b | 0;\n        d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;\n        d  = (d << 10 | d >>> 22) + a | 0;\n        c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;\n        c  = (c << 15 | c >>> 17) + d | 0;\n        b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;\n        b  = (b << 21 |b >>> 11) + c | 0;\n        a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;\n        a  = (a << 6 | a >>> 26) + b | 0;\n        d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;\n        d  = (d << 10 | d >>> 22) + a | 0;\n        c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;\n        c  = (c << 15 | c >>> 17) + d | 0;\n        b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;\n        b  = (b << 21 |b >>> 11) + c | 0;\n        a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;\n        a  = (a << 6 | a >>> 26) + b | 0;\n        d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;\n        d  = (d << 10 | d >>> 22) + a | 0;\n        c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;\n        c  = (c << 15 | c >>> 17) + d | 0;\n        b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;\n        b  = (b << 21 |b >>> 11) + c | 0;\n        a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;\n        a  = (a << 6 | a >>> 26) + b | 0;\n        d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;\n        d  = (d << 10 | d >>> 22) + a | 0;\n        c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;\n        c  = (c << 15 | c >>> 17) + d | 0;\n        b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;\n        b  = (b << 21 | b >>> 11) + c | 0;\n\n        x[0] = a + x[0] | 0;\n        x[1] = b + x[1] | 0;\n        x[2] = c + x[2] | 0;\n        x[3] = d + x[3] | 0;\n    }\n\n    function md5blk(s) {\n        var md5blks = [],\n            i; /* Andy King said do it this way. */\n\n        for (i = 0; i < 64; i += 4) {\n            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);\n        }\n        return md5blks;\n    }\n\n    function md5blk_array(a) {\n        var md5blks = [],\n            i; /* Andy King said do it this way. */\n\n        for (i = 0; i < 64; i += 4) {\n            md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);\n        }\n        return md5blks;\n    }\n\n    function md51(s) {\n        var n = s.length,\n            state = [1732584193, -271733879, -1732584194, 271733878],\n            i,\n            length,\n            tail,\n            tmp,\n            lo,\n            hi;\n\n        for (i = 64; i <= n; i += 64) {\n            md5cycle(state, md5blk(s.substring(i - 64, i)));\n        }\n        s = s.substring(i - 64);\n        length = s.length;\n        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];\n        for (i = 0; i < length; i += 1) {\n            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);\n        }\n        tail[i >> 2] |= 0x80 << ((i % 4) << 3);\n        if (i > 55) {\n            md5cycle(state, tail);\n            for (i = 0; i < 16; i += 1) {\n                tail[i] = 0;\n            }\n        }\n\n        // Beware that the final length might not fit in 32 bits so we take care of that\n        tmp = n * 8;\n        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);\n        lo = parseInt(tmp[2], 16);\n        hi = parseInt(tmp[1], 16) || 0;\n\n        tail[14] = lo;\n        tail[15] = hi;\n\n        md5cycle(state, tail);\n        return state;\n    }\n\n    function md51_array(a) {\n        var n = a.length,\n            state = [1732584193, -271733879, -1732584194, 271733878],\n            i,\n            length,\n            tail,\n            tmp,\n            lo,\n            hi;\n\n        for (i = 64; i <= n; i += 64) {\n            md5cycle(state, md5blk_array(a.subarray(i - 64, i)));\n        }\n\n        // Not sure if it is a bug, however IE10 will always produce a sub array of length 1\n        // containing the last element of the parent array if the sub array specified starts\n        // beyond the length of the parent array - weird.\n        // https://connect.microsoft.com/IE/feedback/details/771452/typed-array-subarray-issue\n        a = (i - 64) < n ? a.subarray(i - 64) : new Uint8Array(0);\n\n        length = a.length;\n        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];\n        for (i = 0; i < length; i += 1) {\n            tail[i >> 2] |= a[i] << ((i % 4) << 3);\n        }\n\n        tail[i >> 2] |= 0x80 << ((i % 4) << 3);\n        if (i > 55) {\n            md5cycle(state, tail);\n            for (i = 0; i < 16; i += 1) {\n                tail[i] = 0;\n            }\n        }\n\n        // Beware that the final length might not fit in 32 bits so we take care of that\n        tmp = n * 8;\n        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);\n        lo = parseInt(tmp[2], 16);\n        hi = parseInt(tmp[1], 16) || 0;\n\n        tail[14] = lo;\n        tail[15] = hi;\n\n        md5cycle(state, tail);\n\n        return state;\n    }\n\n    function rhex(n) {\n        var s = '',\n            j;\n        for (j = 0; j < 4; j += 1) {\n            s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];\n        }\n        return s;\n    }\n\n    function hex(x) {\n        var i;\n        for (i = 0; i < x.length; i += 1) {\n            x[i] = rhex(x[i]);\n        }\n        return x.join('');\n    }\n\n    // In some cases the fast add32 function cannot be used..\n    if (hex(md51('hello')) !== '5d41402abc4b2a76b9719d911017c592') {\n        add32 = function (x, y) {\n            var lsw = (x & 0xFFFF) + (y & 0xFFFF),\n                msw = (x >> 16) + (y >> 16) + (lsw >> 16);\n            return (msw << 16) | (lsw & 0xFFFF);\n        };\n    }\n\n    // ---------------------------------------------------\n\n    /**\n     * ArrayBuffer slice polyfill.\n     *\n     * @see https://github.com/ttaubert/node-arraybuffer-slice\n     */\n\n    if (typeof ArrayBuffer !== 'undefined' && !ArrayBuffer.prototype.slice) {\n        (function () {\n            function clamp(val, length) {\n                val = (val | 0) || 0;\n\n                if (val < 0) {\n                    return Math.max(val + length, 0);\n                }\n\n                return Math.min(val, length);\n            }\n\n            ArrayBuffer.prototype.slice = function (from, to) {\n                var length = this.byteLength,\n                    begin = clamp(from, length),\n                    end = length,\n                    num,\n                    target,\n                    targetArray,\n                    sourceArray;\n\n                if (to !== undefined) {\n                    end = clamp(to, length);\n                }\n\n                if (begin > end) {\n                    return new ArrayBuffer(0);\n                }\n\n                num = end - begin;\n                target = new ArrayBuffer(num);\n                targetArray = new Uint8Array(target);\n\n                sourceArray = new Uint8Array(this, begin, num);\n                targetArray.set(sourceArray);\n\n                return target;\n            };\n        })();\n    }\n\n    // ---------------------------------------------------\n\n    /**\n     * Helpers.\n     */\n\n    function toUtf8(str) {\n        if (/[\\u0080-\\uFFFF]/.test(str)) {\n            str = unescape(encodeURIComponent(str));\n        }\n\n        return str;\n    }\n\n    function utf8Str2ArrayBuffer(str, returnUInt8Array) {\n        var length = str.length,\n           buff = new ArrayBuffer(length),\n           arr = new Uint8Array(buff),\n           i;\n\n        for (i = 0; i < length; i += 1) {\n            arr[i] = str.charCodeAt(i);\n        }\n\n        return returnUInt8Array ? arr : buff;\n    }\n\n    function arrayBuffer2Utf8Str(buff) {\n        return String.fromCharCode.apply(null, new Uint8Array(buff));\n    }\n\n    function concatenateArrayBuffers(first, second, returnUInt8Array) {\n        var result = new Uint8Array(first.byteLength + second.byteLength);\n\n        result.set(new Uint8Array(first));\n        result.set(new Uint8Array(second), first.byteLength);\n\n        return returnUInt8Array ? result : result.buffer;\n    }\n\n    function hexToBinaryString(hex) {\n        var bytes = [],\n            length = hex.length,\n            x;\n\n        for (x = 0; x < length - 1; x += 2) {\n            bytes.push(parseInt(hex.substr(x, 2), 16));\n        }\n\n        return String.fromCharCode.apply(String, bytes);\n    }\n\n    // ---------------------------------------------------\n\n    /**\n     * SparkMD5 OOP implementation.\n     *\n     * Use this class to perform an incremental md5, otherwise use the\n     * static methods instead.\n     */\n\n    function SparkMD5() {\n        // call reset to init the instance\n        this.reset();\n    }\n\n    /**\n     * Appends a string.\n     * A conversion will be applied if an utf8 string is detected.\n     *\n     * @param {String} str The string to be appended\n     *\n     * @return {SparkMD5} The instance itself\n     */\n    SparkMD5.prototype.append = function (str) {\n        // Converts the string to utf8 bytes if necessary\n        // Then append as binary\n        this.appendBinary(toUtf8(str));\n\n        return this;\n    };\n\n    /**\n     * Appends a binary string.\n     *\n     * @param {String} contents The binary string to be appended\n     *\n     * @return {SparkMD5} The instance itself\n     */\n    SparkMD5.prototype.appendBinary = function (contents) {\n        this._buff += contents;\n        this._length += contents.length;\n\n        var length = this._buff.length,\n            i;\n\n        for (i = 64; i <= length; i += 64) {\n            md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));\n        }\n\n        this._buff = this._buff.substring(i - 64);\n\n        return this;\n    };\n\n    /**\n     * Finishes the incremental computation, reseting the internal state and\n     * returning the result.\n     *\n     * @param {Boolean} raw True to get the raw string, false to get the hex string\n     *\n     * @return {String} The result\n     */\n    SparkMD5.prototype.end = function (raw) {\n        var buff = this._buff,\n            length = buff.length,\n            i,\n            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n            ret;\n\n        for (i = 0; i < length; i += 1) {\n            tail[i >> 2] |= buff.charCodeAt(i) << ((i % 4) << 3);\n        }\n\n        this._finish(tail, length);\n        ret = hex(this._hash);\n\n        if (raw) {\n            ret = hexToBinaryString(ret);\n        }\n\n        this.reset();\n\n        return ret;\n    };\n\n    /**\n     * Resets the internal state of the computation.\n     *\n     * @return {SparkMD5} The instance itself\n     */\n    SparkMD5.prototype.reset = function () {\n        this._buff = '';\n        this._length = 0;\n        this._hash = [1732584193, -271733879, -1732584194, 271733878];\n\n        return this;\n    };\n\n    /**\n     * Gets the internal state of the computation.\n     *\n     * @return {Object} The state\n     */\n    SparkMD5.prototype.getState = function () {\n        return {\n            buff: this._buff,\n            length: this._length,\n            hash: this._hash\n        };\n    };\n\n    /**\n     * Gets the internal state of the computation.\n     *\n     * @param {Object} state The state\n     *\n     * @return {SparkMD5} The instance itself\n     */\n    SparkMD5.prototype.setState = function (state) {\n        this._buff = state.buff;\n        this._length = state.length;\n        this._hash = state.hash;\n\n        return this;\n    };\n\n    /**\n     * Releases memory used by the incremental buffer and other additional\n     * resources. If you plan to use the instance again, use reset instead.\n     */\n    SparkMD5.prototype.destroy = function () {\n        delete this._hash;\n        delete this._buff;\n        delete this._length;\n    };\n\n    /**\n     * Finish the final calculation based on the tail.\n     *\n     * @param {Array}  tail   The tail (will be modified)\n     * @param {Number} length The length of the remaining buffer\n     */\n    SparkMD5.prototype._finish = function (tail, length) {\n        var i = length,\n            tmp,\n            lo,\n            hi;\n\n        tail[i >> 2] |= 0x80 << ((i % 4) << 3);\n        if (i > 55) {\n            md5cycle(this._hash, tail);\n            for (i = 0; i < 16; i += 1) {\n                tail[i] = 0;\n            }\n        }\n\n        // Do the final computation based on the tail and length\n        // Beware that the final length may not fit in 32 bits so we take care of that\n        tmp = this._length * 8;\n        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);\n        lo = parseInt(tmp[2], 16);\n        hi = parseInt(tmp[1], 16) || 0;\n\n        tail[14] = lo;\n        tail[15] = hi;\n        md5cycle(this._hash, tail);\n    };\n\n    /**\n     * Performs the md5 hash on a string.\n     * A conversion will be applied if utf8 string is detected.\n     *\n     * @param {String}  str The string\n     * @param {Boolean} raw True to get the raw string, false to get the hex string\n     *\n     * @return {String} The result\n     */\n    SparkMD5.hash = function (str, raw) {\n        // Converts the string to utf8 bytes if necessary\n        // Then compute it using the binary function\n        return SparkMD5.hashBinary(toUtf8(str), raw);\n    };\n\n    /**\n     * Performs the md5 hash on a binary string.\n     *\n     * @param {String}  content The binary string\n     * @param {Boolean} raw     True to get the raw string, false to get the hex string\n     *\n     * @return {String} The result\n     */\n    SparkMD5.hashBinary = function (content, raw) {\n        var hash = md51(content),\n            ret = hex(hash);\n\n        return raw ? hexToBinaryString(ret) : ret;\n    };\n\n    // ---------------------------------------------------\n\n    /**\n     * SparkMD5 OOP implementation for array buffers.\n     *\n     * Use this class to perform an incremental md5 ONLY for array buffers.\n     */\n    SparkMD5.ArrayBuffer = function () {\n        // call reset to init the instance\n        this.reset();\n    };\n\n    /**\n     * Appends an array buffer.\n     *\n     * @param {ArrayBuffer} arr The array to be appended\n     *\n     * @return {SparkMD5.ArrayBuffer} The instance itself\n     */\n    SparkMD5.ArrayBuffer.prototype.append = function (arr) {\n        var buff = concatenateArrayBuffers(this._buff.buffer, arr, true),\n            length = buff.length,\n            i;\n\n        this._length += arr.byteLength;\n\n        for (i = 64; i <= length; i += 64) {\n            md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));\n        }\n\n        this._buff = (i - 64) < length ? new Uint8Array(buff.buffer.slice(i - 64)) : new Uint8Array(0);\n\n        return this;\n    };\n\n    /**\n     * Finishes the incremental computation, reseting the internal state and\n     * returning the result.\n     *\n     * @param {Boolean} raw True to get the raw string, false to get the hex string\n     *\n     * @return {String} The result\n     */\n    SparkMD5.ArrayBuffer.prototype.end = function (raw) {\n        var buff = this._buff,\n            length = buff.length,\n            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n            i,\n            ret;\n\n        for (i = 0; i < length; i += 1) {\n            tail[i >> 2] |= buff[i] << ((i % 4) << 3);\n        }\n\n        this._finish(tail, length);\n        ret = hex(this._hash);\n\n        if (raw) {\n            ret = hexToBinaryString(ret);\n        }\n\n        this.reset();\n\n        return ret;\n    };\n\n    /**\n     * Resets the internal state of the computation.\n     *\n     * @return {SparkMD5.ArrayBuffer} The instance itself\n     */\n    SparkMD5.ArrayBuffer.prototype.reset = function () {\n        this._buff = new Uint8Array(0);\n        this._length = 0;\n        this._hash = [1732584193, -271733879, -1732584194, 271733878];\n\n        return this;\n    };\n\n    /**\n     * Gets the internal state of the computation.\n     *\n     * @return {Object} The state\n     */\n    SparkMD5.ArrayBuffer.prototype.getState = function () {\n        var state = SparkMD5.prototype.getState.call(this);\n\n        // Convert buffer to a string\n        state.buff = arrayBuffer2Utf8Str(state.buff);\n\n        return state;\n    };\n\n    /**\n     * Gets the internal state of the computation.\n     *\n     * @param {Object} state The state\n     *\n     * @return {SparkMD5.ArrayBuffer} The instance itself\n     */\n    SparkMD5.ArrayBuffer.prototype.setState = function (state) {\n        // Convert string to buffer\n        state.buff = utf8Str2ArrayBuffer(state.buff, true);\n\n        return SparkMD5.prototype.setState.call(this, state);\n    };\n\n    SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;\n\n    SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;\n\n    /**\n     * Performs the md5 hash on an array buffer.\n     *\n     * @param {ArrayBuffer} arr The array buffer\n     * @param {Boolean}     raw True to get the raw string, false to get the hex one\n     *\n     * @return {String} The result\n     */\n    SparkMD5.ArrayBuffer.hash = function (arr, raw) {\n        var hash = md51_array(new Uint8Array(arr)),\n            ret = hex(hash);\n\n        return raw ? hexToBinaryString(ret) : ret;\n    };\n\n    return SparkMD5;\n}));\n\n\n/***/ }),\n/* 37 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n// self.importScripts('./spark-md5');\n\nvar _promise = __webpack_require__(35);\n\nvar _promise2 = _interopRequireDefault(_promise);\n\nvar _sparkMd = __webpack_require__(36);\n\nvar _sparkMd2 = _interopRequireDefault(_sparkMd);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// for webpack\n\n// TODO 占用大量CPU限速\n// TODO 计算完成后worker销毁\nvar calcMd5 = function calcMd5(file) {\n    return new _promise2.default(function (resolve, reject) {\n        var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;\n        var spark = new _sparkMd2.default.ArrayBuffer();\n        var fileReader = new FileReader();\n\n        var currentChunk = 0;\n        var chunkSize = 1 * 1024 * 1024; // 1MB\n        var chunks = Math.ceil(file.size / chunkSize);\n\n        fileReader.onload = function (e) {\n            // console.log('read chunk nr', currentChunk + 1, 'of', chunks);\n            spark.append(e.target.result); // Append array buffer\n\n            // 计算百分比\n            var start = currentChunk * chunkSize;\n            var end = start + chunkSize >= file.size ? file.size : start + chunkSize;\n            var percent = parseInt(end / file.size * 100) + '%';\n            // self.postMessage({percent});\n\n            currentChunk++;\n            if (currentChunk < chunks) {\n                loadNext();\n            } else {\n                var md5Res = spark.end();\n                // console.log('finished loading');\n                // console.info('computed hash', md5Res);  // Compute hash\n                resolve(md5Res);\n            }\n        };\n\n        fileReader.onerror = function () {\n            console.warn('oops, something went wrong.');\n        };\n\n        function loadNext() {\n            var start = currentChunk * chunkSize;\n            var end = start + chunkSize >= file.size ? file.size : start + chunkSize;\n            fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));\n        }\n        loadNext();\n    });\n};\n\nself.addEventListener('message', function (message) {\n    var file = message.data;\n    calcMd5(file).then(function (md5Res) {\n        self.postMessage(md5Res);\n    });\n});\n\n/***/ }),\n/* 38 */\n/***/ (function(module, exports, __webpack_require__) {\n\n__webpack_require__(67);\n__webpack_require__(69);\n__webpack_require__(72);\n__webpack_require__(68);\n__webpack_require__(70);\n__webpack_require__(71);\nmodule.exports = __webpack_require__(3).Promise;\n\n\n/***/ }),\n/* 39 */\n/***/ (function(module, exports) {\n\nmodule.exports = function () { /* empty */ };\n\n\n/***/ }),\n/* 40 */\n/***/ (function(module, exports) {\n\nmodule.exports = function (it, Constructor, name, forbiddenField) {\n  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {\n    throw TypeError(name + ': incorrect invocation!');\n  } return it;\n};\n\n\n/***/ }),\n/* 41 */\n/***/ (function(module, exports, __webpack_require__) {\n\n// false -> Array#indexOf\n// true  -> Array#includes\nvar toIObject = __webpack_require__(21);\nvar toLength = __webpack_require__(33);\nvar toAbsoluteIndex = __webpack_require__(61);\nmodule.exports = function (IS_INCLUDES) {\n  return function ($this, el, fromIndex) {\n    var O = toIObject($this);\n    var length = toLength(O.length);\n    var index = toAbsoluteIndex(fromIndex, length);\n    var value;\n    // Array#includes uses SameValueZero equality algorithm\n    // eslint-disable-next-line no-self-compare\n    if (IS_INCLUDES && el != el) while (length > index) {\n      value = O[index++];\n      // eslint-disable-next-line no-self-compare\n      if (value != value) return true;\n    // Array#indexOf ignores holes, Array#includes - not\n    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {\n      if (O[index] === el) return IS_INCLUDES || index || 0;\n    } return !IS_INCLUDES && -1;\n  };\n};\n\n\n/***/ }),\n/* 42 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar ctx = __webpack_require__(10);\nvar call = __webpack_require__(47);\nvar isArrayIter = __webpack_require__(46);\nvar anObject = __webpack_require__(2);\nvar toLength = __webpack_require__(33);\nvar getIterFn = __webpack_require__(65);\nvar BREAK = {};\nvar RETURN = {};\nvar exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {\n  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);\n  var f = ctx(fn, that, entries ? 2 : 1);\n  var index = 0;\n  var length, step, iterator, result;\n  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');\n  // fast case for arrays with default iterator\n  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {\n    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);\n    if (result === BREAK || result === RETURN) return result;\n  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {\n    result = call(iterator, f, step.value, entries);\n    if (result === BREAK || result === RETURN) return result;\n  }\n};\nexports.BREAK = BREAK;\nexports.RETURN = RETURN;\n\n\n/***/ }),\n/* 43 */\n/***/ (function(module, exports, __webpack_require__) {\n\nmodule.exports = !__webpack_require__(5) && !__webpack_require__(24)(function () {\n  return Object.defineProperty(__webpack_require__(15)('div'), 'a', { get: function () { return 7; } }).a != 7;\n});\n\n\n/***/ }),\n/* 44 */\n/***/ (function(module, exports) {\n\n// fast apply, http://jsperf.lnkit.com/fast-apply/5\nmodule.exports = function (fn, args, that) {\n  var un = that === undefined;\n  switch (args.length) {\n    case 0: return un ? fn()\n                      : fn.call(that);\n    case 1: return un ? fn(args[0])\n                      : fn.call(that, args[0]);\n    case 2: return un ? fn(args[0], args[1])\n                      : fn.call(that, args[0], args[1]);\n    case 3: return un ? fn(args[0], args[1], args[2])\n                      : fn.call(that, args[0], args[1], args[2]);\n    case 4: return un ? fn(args[0], args[1], args[2], args[3])\n                      : fn.call(that, args[0], args[1], args[2], args[3]);\n  } return fn.apply(that, args);\n};\n\n\n/***/ }),\n/* 45 */\n/***/ (function(module, exports, __webpack_require__) {\n\n// fallback for non-array-like ES3 and non-enumerable old V8 strings\nvar cof = __webpack_require__(9);\n// eslint-disable-next-line no-prototype-builtins\nmodule.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {\n  return cof(it) == 'String' ? it.split('') : Object(it);\n};\n\n\n/***/ }),\n/* 46 */\n/***/ (function(module, exports, __webpack_require__) {\n\n// check on default Array iterator\nvar Iterators = __webpack_require__(7);\nvar ITERATOR = __webpack_require__(1)('iterator');\nvar ArrayProto = Array.prototype;\n\nmodule.exports = function (it) {\n  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);\n};\n\n\n/***/ }),\n/* 47 */\n/***/ (function(module, exports, __webpack_require__) {\n\n// call something on iterator step with safe closing on error\nvar anObject = __webpack_require__(2);\nmodule.exports = function (iterator, fn, value, entries) {\n  try {\n    return entries ? fn(anObject(value)[0], value[1]) : fn(value);\n  // 7.4.6 IteratorClose(iterator, completion)\n  } catch (e) {\n    var ret = iterator['return'];\n    if (ret !== undefined) anObject(ret.call(iterator));\n    throw e;\n  }\n};\n\n\n/***/ }),\n/* 48 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nvar create = __webpack_require__(52);\nvar descriptor = __webpack_require__(29);\nvar setToStringTag = __webpack_require__(18);\nvar IteratorPrototype = {};\n\n// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()\n__webpack_require__(4)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });\n\nmodule.exports = function (Constructor, NAME, next) {\n  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });\n  setToStringTag(Constructor, NAME + ' Iterator');\n};\n\n\n/***/ }),\n/* 49 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar ITERATOR = __webpack_require__(1)('iterator');\nvar SAFE_CLOSING = false;\n\ntry {\n  var riter = [7][ITERATOR]();\n  riter['return'] = function () { SAFE_CLOSING = true; };\n  // eslint-disable-next-line no-throw-literal\n  Array.from(riter, function () { throw 2; });\n} catch (e) { /* empty */ }\n\nmodule.exports = function (exec, skipClosing) {\n  if (!skipClosing && !SAFE_CLOSING) return false;\n  var safe = false;\n  try {\n    var arr = [7];\n    var iter = arr[ITERATOR]();\n    iter.next = function () { return { done: safe = true }; };\n    arr[ITERATOR] = function () { return iter; };\n    exec(arr);\n  } catch (e) { /* empty */ }\n  return safe;\n};\n\n\n/***/ }),\n/* 50 */\n/***/ (function(module, exports) {\n\nmodule.exports = function (done, value) {\n  return { value: value, done: !!done };\n};\n\n\n/***/ }),\n/* 51 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar global = __webpack_require__(0);\nvar macrotask = __webpack_require__(32).set;\nvar Observer = global.MutationObserver || global.WebKitMutationObserver;\nvar process = global.process;\nvar Promise = global.Promise;\nvar isNode = __webpack_require__(9)(process) == 'process';\n\nmodule.exports = function () {\n  var head, last, notify;\n\n  var flush = function () {\n    var parent, fn;\n    if (isNode && (parent = process.domain)) parent.exit();\n    while (head) {\n      fn = head.fn;\n      head = head.next;\n      try {\n        fn();\n      } catch (e) {\n        if (head) notify();\n        else last = undefined;\n        throw e;\n      }\n    } last = undefined;\n    if (parent) parent.enter();\n  };\n\n  // Node.js\n  if (isNode) {\n    notify = function () {\n      process.nextTick(flush);\n    };\n  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339\n  } else if (Observer && !(global.navigator && global.navigator.standalone)) {\n    var toggle = true;\n    var node = document.createTextNode('');\n    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new\n    notify = function () {\n      node.data = toggle = !toggle;\n    };\n  // environments with maybe non-completely correct, but existent Promise\n  } else if (Promise && Promise.resolve) {\n    // Promise.resolve without an argument throws an error in LG WebOS 2\n    var promise = Promise.resolve(undefined);\n    notify = function () {\n      promise.then(flush);\n    };\n  // for other environments - macrotask based on:\n  // - setImmediate\n  // - MessageChannel\n  // - window.postMessag\n  // - onreadystatechange\n  // - setTimeout\n  } else {\n    notify = function () {\n      // strange IE + webpack dev server bug - use .call(global)\n      macrotask.call(global, flush);\n    };\n  }\n\n  return function (fn) {\n    var task = { fn: fn, next: undefined };\n    if (last) last.next = task;\n    if (!head) {\n      head = task;\n      notify();\n    } last = task;\n  };\n};\n\n\n/***/ }),\n/* 52 */\n/***/ (function(module, exports, __webpack_require__) {\n\n// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])\nvar anObject = __webpack_require__(2);\nvar dPs = __webpack_require__(53);\nvar enumBugKeys = __webpack_require__(23);\nvar IE_PROTO = __webpack_require__(19)('IE_PROTO');\nvar Empty = function () { /* empty */ };\nvar PROTOTYPE = 'prototype';\n\n// Create object with fake `null` prototype: use iframe Object with cleared prototype\nvar createDict = function () {\n  // Thrash, waste and sodomy: IE GC bug\n  var iframe = __webpack_require__(15)('iframe');\n  var i = enumBugKeys.length;\n  var lt = '<';\n  var gt = '>';\n  var iframeDocument;\n  iframe.style.display = 'none';\n  __webpack_require__(25).appendChild(iframe);\n  iframe.src = 'javascript:'; // eslint-disable-line no-script-url\n  // createDict = iframe.contentWindow.Object;\n  // html.removeChild(iframe);\n  iframeDocument = iframe.contentWindow.document;\n  iframeDocument.open();\n  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);\n  iframeDocument.close();\n  createDict = iframeDocument.F;\n  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];\n  return createDict();\n};\n\nmodule.exports = Object.create || function create(O, Properties) {\n  var result;\n  if (O !== null) {\n    Empty[PROTOTYPE] = anObject(O);\n    result = new Empty();\n    Empty[PROTOTYPE] = null;\n    // add \"__proto__\" for Object.getPrototypeOf polyfill\n    result[IE_PROTO] = O;\n  } else result = createDict();\n  return Properties === undefined ? result : dPs(result, Properties);\n};\n\n\n/***/ }),\n/* 53 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar dP = __webpack_require__(13);\nvar anObject = __webpack_require__(2);\nvar getKeys = __webpack_require__(56);\n\nmodule.exports = __webpack_require__(5) ? Object.defineProperties : function defineProperties(O, Properties) {\n  anObject(O);\n  var keys = getKeys(Properties);\n  var length = keys.length;\n  var i = 0;\n  var P;\n  while (length > i) dP.f(O, P = keys[i++], Properties[P]);\n  return O;\n};\n\n\n/***/ }),\n/* 54 */\n/***/ (function(module, exports, __webpack_require__) {\n\n// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)\nvar has = __webpack_require__(12);\nvar toObject = __webpack_require__(62);\nvar IE_PROTO = __webpack_require__(19)('IE_PROTO');\nvar ObjectProto = Object.prototype;\n\nmodule.exports = Object.getPrototypeOf || function (O) {\n  O = toObject(O);\n  if (has(O, IE_PROTO)) return O[IE_PROTO];\n  if (typeof O.constructor == 'function' && O instanceof O.constructor) {\n    return O.constructor.prototype;\n  } return O instanceof Object ? ObjectProto : null;\n};\n\n\n/***/ }),\n/* 55 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar has = __webpack_require__(12);\nvar toIObject = __webpack_require__(21);\nvar arrayIndexOf = __webpack_require__(41)(false);\nvar IE_PROTO = __webpack_require__(19)('IE_PROTO');\n\nmodule.exports = function (object, names) {\n  var O = toIObject(object);\n  var i = 0;\n  var result = [];\n  var key;\n  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);\n  // Don't enum bug & hidden keys\n  while (names.length > i) if (has(O, key = names[i++])) {\n    ~arrayIndexOf(result, key) || result.push(key);\n  }\n  return result;\n};\n\n\n/***/ }),\n/* 56 */\n/***/ (function(module, exports, __webpack_require__) {\n\n// 19.1.2.14 / 15.2.3.14 Object.keys(O)\nvar $keys = __webpack_require__(55);\nvar enumBugKeys = __webpack_require__(23);\n\nmodule.exports = Object.keys || function keys(O) {\n  return $keys(O, enumBugKeys);\n};\n\n\n/***/ }),\n/* 57 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar hide = __webpack_require__(4);\nmodule.exports = function (target, src, safe) {\n  for (var key in src) {\n    if (safe && target[key]) target[key] = src[key];\n    else hide(target, key, src[key]);\n  } return target;\n};\n\n\n/***/ }),\n/* 58 */\n/***/ (function(module, exports, __webpack_require__) {\n\nmodule.exports = __webpack_require__(4);\n\n\n/***/ }),\n/* 59 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nvar global = __webpack_require__(0);\nvar core = __webpack_require__(3);\nvar dP = __webpack_require__(13);\nvar DESCRIPTORS = __webpack_require__(5);\nvar SPECIES = __webpack_require__(1)('species');\n\nmodule.exports = function (KEY) {\n  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];\n  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {\n    configurable: true,\n    get: function () { return this; }\n  });\n};\n\n\n/***/ }),\n/* 60 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar toInteger = __webpack_require__(20);\nvar defined = __webpack_require__(14);\n// true  -> String#at\n// false -> String#codePointAt\nmodule.exports = function (TO_STRING) {\n  return function (that, pos) {\n    var s = String(defined(that));\n    var i = toInteger(pos);\n    var l = s.length;\n    var a, b;\n    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;\n    a = s.charCodeAt(i);\n    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff\n      ? TO_STRING ? s.charAt(i) : a\n      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;\n  };\n};\n\n\n/***/ }),\n/* 61 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar toInteger = __webpack_require__(20);\nvar max = Math.max;\nvar min = Math.min;\nmodule.exports = function (index, length) {\n  index = toInteger(index);\n  return index < 0 ? max(index + length, 0) : min(index, length);\n};\n\n\n/***/ }),\n/* 62 */\n/***/ (function(module, exports, __webpack_require__) {\n\n// 7.1.13 ToObject(argument)\nvar defined = __webpack_require__(14);\nmodule.exports = function (it) {\n  return Object(defined(it));\n};\n\n\n/***/ }),\n/* 63 */\n/***/ (function(module, exports, __webpack_require__) {\n\n// 7.1.1 ToPrimitive(input [, PreferredType])\nvar isObject = __webpack_require__(6);\n// instead of the ES6 spec version, we didn't implement @@toPrimitive case\n// and the second argument - flag - preferred type is a string\nmodule.exports = function (it, S) {\n  if (!isObject(it)) return it;\n  var fn, val;\n  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;\n  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;\n  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;\n  throw TypeError(\"Can't convert object to primitive value\");\n};\n\n\n/***/ }),\n/* 64 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar global = __webpack_require__(0);\nvar navigator = global.navigator;\n\nmodule.exports = navigator && navigator.userAgent || '';\n\n\n/***/ }),\n/* 65 */\n/***/ (function(module, exports, __webpack_require__) {\n\nvar classof = __webpack_require__(22);\nvar ITERATOR = __webpack_require__(1)('iterator');\nvar Iterators = __webpack_require__(7);\nmodule.exports = __webpack_require__(3).getIteratorMethod = function (it) {\n  if (it != undefined) return it[ITERATOR]\n    || it['@@iterator']\n    || Iterators[classof(it)];\n};\n\n\n/***/ }),\n/* 66 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nvar addToUnscopables = __webpack_require__(39);\nvar step = __webpack_require__(50);\nvar Iterators = __webpack_require__(7);\nvar toIObject = __webpack_require__(21);\n\n// 22.1.3.4 Array.prototype.entries()\n// 22.1.3.13 Array.prototype.keys()\n// 22.1.3.29 Array.prototype.values()\n// 22.1.3.30 Array.prototype[@@iterator]()\nmodule.exports = __webpack_require__(26)(Array, 'Array', function (iterated, kind) {\n  this._t = toIObject(iterated); // target\n  this._i = 0;                   // next index\n  this._k = kind;                // kind\n// 22.1.5.2.1 %ArrayIteratorPrototype%.next()\n}, function () {\n  var O = this._t;\n  var kind = this._k;\n  var index = this._i++;\n  if (!O || index >= O.length) {\n    this._t = undefined;\n    return step(1);\n  }\n  if (kind == 'keys') return step(0, index);\n  if (kind == 'values') return step(0, O[index]);\n  return step(0, [index, O[index]]);\n}, 'values');\n\n// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)\nIterators.Arguments = Iterators.Array;\n\naddToUnscopables('keys');\naddToUnscopables('values');\naddToUnscopables('entries');\n\n\n/***/ }),\n/* 67 */\n/***/ (function(module, exports) {\n\n\n\n/***/ }),\n/* 68 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nvar LIBRARY = __webpack_require__(16);\nvar global = __webpack_require__(0);\nvar ctx = __webpack_require__(10);\nvar classof = __webpack_require__(22);\nvar $export = __webpack_require__(11);\nvar isObject = __webpack_require__(6);\nvar aFunction = __webpack_require__(8);\nvar anInstance = __webpack_require__(40);\nvar forOf = __webpack_require__(42);\nvar speciesConstructor = __webpack_require__(31);\nvar task = __webpack_require__(32).set;\nvar microtask = __webpack_require__(51)();\nvar newPromiseCapabilityModule = __webpack_require__(17);\nvar perform = __webpack_require__(27);\nvar userAgent = __webpack_require__(64);\nvar promiseResolve = __webpack_require__(28);\nvar PROMISE = 'Promise';\nvar TypeError = global.TypeError;\nvar process = global.process;\nvar versions = process && process.versions;\nvar v8 = versions && versions.v8 || '';\nvar $Promise = global[PROMISE];\nvar isNode = classof(process) == 'process';\nvar empty = function () { /* empty */ };\nvar Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;\nvar newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;\n\nvar USE_NATIVE = !!function () {\n  try {\n    // correct subclassing with @@species support\n    var promise = $Promise.resolve(1);\n    var FakePromise = (promise.constructor = {})[__webpack_require__(1)('species')] = function (exec) {\n      exec(empty, empty);\n    };\n    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test\n    return (isNode || typeof PromiseRejectionEvent == 'function')\n      && promise.then(empty) instanceof FakePromise\n      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables\n      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565\n      // we can't detect it synchronously, so just check versions\n      && v8.indexOf('6.6') !== 0\n      && userAgent.indexOf('Chrome/66') === -1;\n  } catch (e) { /* empty */ }\n}();\n\n// helpers\nvar isThenable = function (it) {\n  var then;\n  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;\n};\nvar notify = function (promise, isReject) {\n  if (promise._n) return;\n  promise._n = true;\n  var chain = promise._c;\n  microtask(function () {\n    var value = promise._v;\n    var ok = promise._s == 1;\n    var i = 0;\n    var run = function (reaction) {\n      var handler = ok ? reaction.ok : reaction.fail;\n      var resolve = reaction.resolve;\n      var reject = reaction.reject;\n      var domain = reaction.domain;\n      var result, then, exited;\n      try {\n        if (handler) {\n          if (!ok) {\n            if (promise._h == 2) onHandleUnhandled(promise);\n            promise._h = 1;\n          }\n          if (handler === true) result = value;\n          else {\n            if (domain) domain.enter();\n            result = handler(value); // may throw\n            if (domain) {\n              domain.exit();\n              exited = true;\n            }\n          }\n          if (result === reaction.promise) {\n            reject(TypeError('Promise-chain cycle'));\n          } else if (then = isThenable(result)) {\n            then.call(result, resolve, reject);\n          } else resolve(result);\n        } else reject(value);\n      } catch (e) {\n        if (domain && !exited) domain.exit();\n        reject(e);\n      }\n    };\n    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach\n    promise._c = [];\n    promise._n = false;\n    if (isReject && !promise._h) onUnhandled(promise);\n  });\n};\nvar onUnhandled = function (promise) {\n  task.call(global, function () {\n    var value = promise._v;\n    var unhandled = isUnhandled(promise);\n    var result, handler, console;\n    if (unhandled) {\n      result = perform(function () {\n        if (isNode) {\n          process.emit('unhandledRejection', value, promise);\n        } else if (handler = global.onunhandledrejection) {\n          handler({ promise: promise, reason: value });\n        } else if ((console = global.console) && console.error) {\n          console.error('Unhandled promise rejection', value);\n        }\n      });\n      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should\n      promise._h = isNode || isUnhandled(promise) ? 2 : 1;\n    } promise._a = undefined;\n    if (unhandled && result.e) throw result.v;\n  });\n};\nvar isUnhandled = function (promise) {\n  return promise._h !== 1 && (promise._a || promise._c).length === 0;\n};\nvar onHandleUnhandled = function (promise) {\n  task.call(global, function () {\n    var handler;\n    if (isNode) {\n      process.emit('rejectionHandled', promise);\n    } else if (handler = global.onrejectionhandled) {\n      handler({ promise: promise, reason: promise._v });\n    }\n  });\n};\nvar $reject = function (value) {\n  var promise = this;\n  if (promise._d) return;\n  promise._d = true;\n  promise = promise._w || promise; // unwrap\n  promise._v = value;\n  promise._s = 2;\n  if (!promise._a) promise._a = promise._c.slice();\n  notify(promise, true);\n};\nvar $resolve = function (value) {\n  var promise = this;\n  var then;\n  if (promise._d) return;\n  promise._d = true;\n  promise = promise._w || promise; // unwrap\n  try {\n    if (promise === value) throw TypeError(\"Promise can't be resolved itself\");\n    if (then = isThenable(value)) {\n      microtask(function () {\n        var wrapper = { _w: promise, _d: false }; // wrap\n        try {\n          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));\n        } catch (e) {\n          $reject.call(wrapper, e);\n        }\n      });\n    } else {\n      promise._v = value;\n      promise._s = 1;\n      notify(promise, false);\n    }\n  } catch (e) {\n    $reject.call({ _w: promise, _d: false }, e); // wrap\n  }\n};\n\n// constructor polyfill\nif (!USE_NATIVE) {\n  // 25.4.3.1 Promise(executor)\n  $Promise = function Promise(executor) {\n    anInstance(this, $Promise, PROMISE, '_h');\n    aFunction(executor);\n    Internal.call(this);\n    try {\n      executor(ctx($resolve, this, 1), ctx($reject, this, 1));\n    } catch (err) {\n      $reject.call(this, err);\n    }\n  };\n  // eslint-disable-next-line no-unused-vars\n  Internal = function Promise(executor) {\n    this._c = [];             // <- awaiting reactions\n    this._a = undefined;      // <- checked in isUnhandled reactions\n    this._s = 0;              // <- state\n    this._d = false;          // <- done\n    this._v = undefined;      // <- value\n    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled\n    this._n = false;          // <- notify\n  };\n  Internal.prototype = __webpack_require__(57)($Promise.prototype, {\n    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)\n    then: function then(onFulfilled, onRejected) {\n      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));\n      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;\n      reaction.fail = typeof onRejected == 'function' && onRejected;\n      reaction.domain = isNode ? process.domain : undefined;\n      this._c.push(reaction);\n      if (this._a) this._a.push(reaction);\n      if (this._s) notify(this, false);\n      return reaction.promise;\n    },\n    // 25.4.5.1 Promise.prototype.catch(onRejected)\n    'catch': function (onRejected) {\n      return this.then(undefined, onRejected);\n    }\n  });\n  OwnPromiseCapability = function () {\n    var promise = new Internal();\n    this.promise = promise;\n    this.resolve = ctx($resolve, promise, 1);\n    this.reject = ctx($reject, promise, 1);\n  };\n  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {\n    return C === $Promise || C === Wrapper\n      ? new OwnPromiseCapability(C)\n      : newGenericPromiseCapability(C);\n  };\n}\n\n$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });\n__webpack_require__(18)($Promise, PROMISE);\n__webpack_require__(59)(PROMISE);\nWrapper = __webpack_require__(3)[PROMISE];\n\n// statics\n$export($export.S + $export.F * !USE_NATIVE, PROMISE, {\n  // 25.4.4.5 Promise.reject(r)\n  reject: function reject(r) {\n    var capability = newPromiseCapability(this);\n    var $$reject = capability.reject;\n    $$reject(r);\n    return capability.promise;\n  }\n});\n$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {\n  // 25.4.4.6 Promise.resolve(x)\n  resolve: function resolve(x) {\n    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);\n  }\n});\n$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(49)(function (iter) {\n  $Promise.all(iter)['catch'](empty);\n})), PROMISE, {\n  // 25.4.4.1 Promise.all(iterable)\n  all: function all(iterable) {\n    var C = this;\n    var capability = newPromiseCapability(C);\n    var resolve = capability.resolve;\n    var reject = capability.reject;\n    var result = perform(function () {\n      var values = [];\n      var index = 0;\n      var remaining = 1;\n      forOf(iterable, false, function (promise) {\n        var $index = index++;\n        var alreadyCalled = false;\n        values.push(undefined);\n        remaining++;\n        C.resolve(promise).then(function (value) {\n          if (alreadyCalled) return;\n          alreadyCalled = true;\n          values[$index] = value;\n          --remaining || resolve(values);\n        }, reject);\n      });\n      --remaining || resolve(values);\n    });\n    if (result.e) reject(result.v);\n    return capability.promise;\n  },\n  // 25.4.4.4 Promise.race(iterable)\n  race: function race(iterable) {\n    var C = this;\n    var capability = newPromiseCapability(C);\n    var reject = capability.reject;\n    var result = perform(function () {\n      forOf(iterable, false, function (promise) {\n        C.resolve(promise).then(capability.resolve, reject);\n      });\n    });\n    if (result.e) reject(result.v);\n    return capability.promise;\n  }\n});\n\n\n/***/ }),\n/* 69 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\nvar $at = __webpack_require__(60)(true);\n\n// 21.1.3.27 String.prototype[@@iterator]()\n__webpack_require__(26)(String, 'String', function (iterated) {\n  this._t = String(iterated); // target\n  this._i = 0;                // next index\n// 21.1.5.2.1 %StringIteratorPrototype%.next()\n}, function () {\n  var O = this._t;\n  var index = this._i;\n  var point;\n  if (index >= O.length) return { value: undefined, done: true };\n  point = $at(O, index);\n  this._i += point.length;\n  return { value: point, done: false };\n});\n\n\n/***/ }),\n/* 70 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n// https://github.com/tc39/proposal-promise-finally\n\nvar $export = __webpack_require__(11);\nvar core = __webpack_require__(3);\nvar global = __webpack_require__(0);\nvar speciesConstructor = __webpack_require__(31);\nvar promiseResolve = __webpack_require__(28);\n\n$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {\n  var C = speciesConstructor(this, core.Promise || global.Promise);\n  var isFunction = typeof onFinally == 'function';\n  return this.then(\n    isFunction ? function (x) {\n      return promiseResolve(C, onFinally()).then(function () { return x; });\n    } : onFinally,\n    isFunction ? function (e) {\n      return promiseResolve(C, onFinally()).then(function () { throw e; });\n    } : onFinally\n  );\n} });\n\n\n/***/ }),\n/* 71 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n// https://github.com/tc39/proposal-promise-try\nvar $export = __webpack_require__(11);\nvar newPromiseCapability = __webpack_require__(17);\nvar perform = __webpack_require__(27);\n\n$export($export.S, 'Promise', { 'try': function (callbackfn) {\n  var promiseCapability = newPromiseCapability.f(this);\n  var result = perform(callbackfn);\n  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);\n  return promiseCapability.promise;\n} });\n\n\n/***/ }),\n/* 72 */\n/***/ (function(module, exports, __webpack_require__) {\n\n__webpack_require__(66);\nvar global = __webpack_require__(0);\nvar hide = __webpack_require__(4);\nvar Iterators = __webpack_require__(7);\nvar TO_STRING_TAG = __webpack_require__(1)('toStringTag');\n\nvar DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +\n  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +\n  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +\n  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +\n  'TextTrackList,TouchList').split(',');\n\nfor (var i = 0; i < DOMIterables.length; i++) {\n  var NAME = DOMIterables[i];\n  var Collection = global[NAME];\n  var proto = Collection && Collection.prototype;\n  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);\n  Iterators[NAME] = Iterators.Array;\n}\n\n\n/***/ })\n/******/ ]);\n//# sourceMappingURL=6a7d1a9e98b114001043.worker.js.map", null);
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string

var URL = window.URL || window.webkitURL;

module.exports = function (content, url) {
  try {
    try {
      var blob;

      try {
        // BlobBuilder = Deprecated, but widely implemented
        var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;

        blob = new BlobBuilder();

        blob.append(content);

        blob = blob.getBlob();
      } catch (e) {
        // The proposed API
        blob = new Blob([content]);
      }

      return new Worker(URL.createObjectURL(blob));
    } catch (e) {
      return new Worker('data:application/javascript,' + encodeURIComponent(content));
    }
  } catch (e) {
    if (!url) {
      throw Error('Inline worker is not supported');
    }

    return new Worker(url);
  }
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(61);


/***/ })
/******/ ]);
});
//# sourceMappingURL=power-uploader.js.map