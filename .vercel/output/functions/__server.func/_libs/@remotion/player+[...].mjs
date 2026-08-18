import { i as __toESM, t as __commonJSMin } from "../../_runtime.mjs";
//#region node_modules/react/cjs/react.production.js
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ReactNoopUpdateQueue = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, assign = Object.assign, emptyObject = {};
	function Component(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	Component.prototype.isReactComponent = {};
	Component.prototype.setState = function(partialState, callback) {
		if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, partialState, callback, "setState");
	};
	Component.prototype.forceUpdate = function(callback) {
		this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
	};
	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;
	function PureComponent(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent;
	assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = !0;
	var isArrayImpl = Array.isArray;
	function noop() {}
	var ReactSharedInternals = {
		H: null,
		A: null,
		T: null,
		S: null
	}, hasOwnProperty = Object.prototype.hasOwnProperty;
	function ReactElement(type, key, props) {
		var refProp = props.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== refProp ? refProp : null,
			props
		};
	}
	function cloneAndReplaceKey(oldElement, newKey) {
		return ReactElement(oldElement.type, newKey, oldElement.props);
	}
	function isValidElement(object) {
		return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function escape(key) {
		var escaperLookup = {
			"=": "=0",
			":": "=2"
		};
		return "$" + key.replace(/[=:]/g, function(match) {
			return escaperLookup[match];
		});
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
		return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
	}
	function resolveThenable(thenable) {
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default: switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
				"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
			}, function(error) {
				"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			})), thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
			}
		}
		throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		var type = typeof children;
		if ("undefined" === type || "boolean" === type) children = null;
		var invokeCallback = !1;
		if (null === children) invokeCallback = !0;
		else switch (type) {
			case "bigint":
			case "string":
			case "number":
				invokeCallback = !0;
				break;
			case "object": switch (children.$$typeof) {
				case REACT_ELEMENT_TYPE:
				case REACT_PORTAL_TYPE:
					invokeCallback = !0;
					break;
				case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
			}
		}
		if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
			return c;
		})) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
		invokeCallback = 0;
		var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
		if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if ("object" === type) {
			if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
			array = String(children);
			throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
		}
		return invokeCallback;
	}
	function mapChildren(children, func, context) {
		if (null == children) return children;
		var result = [], count = 0;
		mapIntoArray(children, result, "", "", function(child) {
			return func.call(context, child, count++);
		});
		return result;
	}
	function lazyInitializer(payload) {
		if (-1 === payload._status) {
			var ctor = payload._result;
			ctor = ctor();
			ctor.then(function(moduleObject) {
				if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
			}, function(error) {
				if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
			});
			-1 === payload._status && (payload._status = 0, payload._result = ctor);
		}
		if (1 === payload._status) return payload._result.default;
		throw payload._result;
	}
	var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
		if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
			var event = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
				error
			});
			if (!window.dispatchEvent(event)) return;
		} else if ("object" === typeof process && "function" === typeof process.emit) {
			process.emit("uncaughtException", error);
			return;
		}
		console.error(error);
	}, Children = {
		map: mapChildren,
		forEach: function(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		},
		count: function(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		},
		toArray: function(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		},
		only: function(children) {
			if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
			return children;
		}
	};
	exports.Activity = REACT_ACTIVITY_TYPE;
	exports.Children = Children;
	exports.Component = Component;
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.Profiler = REACT_PROFILER_TYPE;
	exports.PureComponent = PureComponent;
	exports.StrictMode = REACT_STRICT_MODE_TYPE;
	exports.Suspense = REACT_SUSPENSE_TYPE;
	exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
	exports.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(size) {
			return ReactSharedInternals.H.useMemoCache(size);
		}
	};
	exports.cache = function(fn) {
		return function() {
			return fn.apply(null, arguments);
		};
	};
	exports.cacheSignal = function() {
		return null;
	};
	exports.cloneElement = function(element, config, children) {
		if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
		var props = assign({}, element.props), key = element.key;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
		var propName = arguments.length - 2;
		if (1 === propName) props.children = children;
		else if (1 < propName) {
			for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		return ReactElement(element.type, key, props);
	};
	exports.createContext = function(defaultValue) {
		defaultValue = {
			$$typeof: REACT_CONTEXT_TYPE,
			_currentValue: defaultValue,
			_currentValue2: defaultValue,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		};
		defaultValue.Provider = defaultValue;
		defaultValue.Consumer = {
			$$typeof: REACT_CONSUMER_TYPE,
			_context: defaultValue
		};
		return defaultValue;
	};
	exports.createElement = function(type, config, children) {
		var propName, props = {}, key = null;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
		var childrenLength = arguments.length - 2;
		if (1 === childrenLength) props.children = children;
		else if (1 < childrenLength) {
			for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
		return ReactElement(type, key, props);
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(render) {
		return {
			$$typeof: REACT_FORWARD_REF_TYPE,
			render
		};
	};
	exports.isValidElement = isValidElement;
	exports.lazy = function(ctor) {
		return {
			$$typeof: REACT_LAZY_TYPE,
			_payload: {
				_status: -1,
				_result: ctor
			},
			_init: lazyInitializer
		};
	};
	exports.memo = function(type, compare) {
		return {
			$$typeof: REACT_MEMO_TYPE,
			type,
			compare: void 0 === compare ? null : compare
		};
	};
	exports.startTransition = function(scope) {
		var prevTransition = ReactSharedInternals.T, currentTransition = {};
		ReactSharedInternals.T = currentTransition;
		try {
			var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
			null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
			"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
		} catch (error) {
			reportGlobalError(error);
		} finally {
			null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
		}
	};
	exports.unstable_useCacheRefresh = function() {
		return ReactSharedInternals.H.useCacheRefresh();
	};
	exports.use = function(usable) {
		return ReactSharedInternals.H.use(usable);
	};
	exports.useActionState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useActionState(action, initialState, permalink);
	};
	exports.useCallback = function(callback, deps) {
		return ReactSharedInternals.H.useCallback(callback, deps);
	};
	exports.useContext = function(Context) {
		return ReactSharedInternals.H.useContext(Context);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(value, initialValue) {
		return ReactSharedInternals.H.useDeferredValue(value, initialValue);
	};
	exports.useEffect = function(create, deps) {
		return ReactSharedInternals.H.useEffect(create, deps);
	};
	exports.useEffectEvent = function(callback) {
		return ReactSharedInternals.H.useEffectEvent(callback);
	};
	exports.useId = function() {
		return ReactSharedInternals.H.useId();
	};
	exports.useImperativeHandle = function(ref, create, deps) {
		return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
	};
	exports.useInsertionEffect = function(create, deps) {
		return ReactSharedInternals.H.useInsertionEffect(create, deps);
	};
	exports.useLayoutEffect = function(create, deps) {
		return ReactSharedInternals.H.useLayoutEffect(create, deps);
	};
	exports.useMemo = function(create, deps) {
		return ReactSharedInternals.H.useMemo(create, deps);
	};
	exports.useOptimistic = function(passthrough, reducer) {
		return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
	};
	exports.useReducer = function(reducer, initialArg, init) {
		return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
	};
	exports.useRef = function(initialValue) {
		return ReactSharedInternals.H.useRef(initialValue);
	};
	exports.useState = function(initialState) {
		return ReactSharedInternals.H.useState(initialState);
	};
	exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
		return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	};
	exports.useTransition = function() {
		return ReactSharedInternals.H.useTransition();
	};
	exports.version = "19.2.7";
}));
//#endregion
//#region node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_production();
}));
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
		var key = null;
		void 0 !== maybeKey && (key = "" + maybeKey);
		void 0 !== config.key && (key = "" + config.key);
		if ("key" in config) {
			maybeKey = {};
			for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
		} else maybeKey = config;
		config = maybeKey.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== config ? config : null,
			props: maybeKey
		};
	}
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.jsx = jsxProd;
	exports.jsxs = jsxProd;
}));
//#endregion
//#region node_modules/react/jsx-runtime.js
var require_jsx_runtime = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_production();
}));
//#endregion
//#region node_modules/react-dom/cjs/react-dom.production.js
/**
* @license React
* react-dom.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_dom_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function formatProdErrorMessage(code) {
		var url = "https://react.dev/errors/" + code;
		if (1 < arguments.length) {
			url += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var i = 2; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
		}
		return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function noop() {}
	var Internals = {
		d: {
			f: noop,
			r: function() {
				throw Error(formatProdErrorMessage(522));
			},
			D: noop,
			C: noop,
			L: noop,
			m: noop,
			X: noop,
			S: noop,
			M: noop
		},
		p: 0,
		findDOMNode: null
	}, REACT_PORTAL_TYPE = Symbol.for("react.portal");
	function createPortal$1(children, containerInfo, implementation) {
		var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
		return {
			$$typeof: REACT_PORTAL_TYPE,
			key: null == key ? null : "" + key,
			children,
			containerInfo,
			implementation
		};
	}
	var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function getCrossOriginStringAs(as, input) {
		if ("font" === as) return "";
		if ("string" === typeof input) return "use-credentials" === input ? input : "";
	}
	exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
	exports.createPortal = function(children, container) {
		var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
		if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType) throw Error(formatProdErrorMessage(299));
		return createPortal$1(children, container, null, key);
	};
	exports.flushSync = function(fn) {
		var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
		try {
			if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
		} finally {
			ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
		}
	};
	exports.preconnect = function(href, options) {
		"string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
	};
	exports.prefetchDNS = function(href) {
		"string" === typeof href && Internals.d.D(href);
	};
	exports.preinit = function(href, options) {
		if ("string" === typeof href && options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
			"style" === as ? Internals.d.S(href, "string" === typeof options.precedence ? options.precedence : void 0, {
				crossOrigin,
				integrity,
				fetchPriority
			}) : "script" === as && Internals.d.X(href, {
				crossOrigin,
				integrity,
				fetchPriority,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0
			});
		}
	};
	exports.preinitModule = function(href, options) {
		if ("string" === typeof href) if ("object" === typeof options && null !== options) {
			if (null == options.as || "script" === options.as) {
				var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
				Internals.d.M(href, {
					crossOrigin,
					integrity: "string" === typeof options.integrity ? options.integrity : void 0,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0
				});
			}
		} else options ?? Internals.d.M(href);
	};
	exports.preload = function(href, options) {
		if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
			Internals.d.L(href, as, {
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0,
				type: "string" === typeof options.type ? options.type : void 0,
				fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
				referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
				imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
				imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
				media: "string" === typeof options.media ? options.media : void 0
			});
		}
	};
	exports.preloadModule = function(href, options) {
		if ("string" === typeof href) if (options) {
			var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
			Internals.d.m(href, {
				as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0
			});
		} else Internals.d.m(href);
	};
	exports.requestFormReset = function(form) {
		Internals.d.r(form);
	};
	exports.unstable_batchedUpdates = function(fn, a) {
		return fn(a);
	};
	exports.useFormState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useFormState(action, initialState, permalink);
	};
	exports.useFormStatus = function() {
		return ReactSharedInternals.H.useHostTransitionStatus();
	};
	exports.version = "19.2.7";
}));
//#endregion
//#region node_modules/react-dom/index.js
var require_react_dom = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function checkDCE() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") return;
		try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
		} catch (err) {
			console.error(err);
		}
	}
	checkDCE();
	module.exports = require_react_dom_production();
}));
//#endregion
//#region node_modules/remotion/dist/esm/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __export = (target, all) => {
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true,
		configurable: true,
		set: (newValue) => all[name] = () => newValue
	});
};
if (typeof import_react.createContext !== "function") throw new Error([
	"Remotion requires React.createContext, but it is \"undefined\".",
	"If you are in a React Server Component, turn it into a client component by adding \"use client\" at the top of the file.",
	"",
	"Before:",
	"  import {useCurrentFrame} from \"remotion\";",
	"",
	"After:",
	"  \"use client\";",
	"  import {useCurrentFrame} from \"remotion\";"
].join(`
`));
var CanUseRemotionHooks = (0, import_react.createContext)(false);
var CanUseRemotionHooksProvider = ({ children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanUseRemotionHooks.Provider, {
		value: true,
		children
	});
};
var CompositionRenderErrorContext = (0, import_react.createContext)({
	setError: () => {},
	clearError: () => {}
});
var getHot = () => {
	try {
		if (typeof __webpack_module__ === "undefined") return null;
		return __webpack_module__.hot ?? null;
	} catch {
		return null;
	}
};
var CompositionErrorBoundary = class extends import_react.Component {
	state = { hasError: false };
	hmrStatusHandler = null;
	static getDerivedStateFromError() {
		return { hasError: true };
	}
	componentDidCatch(error) {
		this.props.onError(error);
		this.subscribeToHmrReset();
	}
	componentDidMount() {
		if (!this.state.hasError) this.props.onClear();
	}
	componentDidUpdate(_prevProps, prevState) {
		if (prevState.hasError && !this.state.hasError) this.props.onClear();
	}
	componentWillUnmount() {
		this.unsubscribeFromHmrReset();
	}
	subscribeToHmrReset() {
		if (this.hmrStatusHandler) return;
		const hot = getHot();
		if (!hot) return;
		const handler = (status) => {
			if (status !== "idle") return;
			this.unsubscribeFromHmrReset();
			this.setState({ hasError: false });
		};
		this.hmrStatusHandler = handler;
		hot.addStatusHandler(handler);
	}
	unsubscribeFromHmrReset() {
		const handler = this.hmrStatusHandler;
		if (!handler) return;
		this.hmrStatusHandler = null;
		const hot = getHot();
		if (!hot) return;
		hot.removeStatusHandler(handler);
	}
	render() {
		if (this.state.hasError) return null;
		return this.props.children;
	}
};
var CompositionManager = (0, import_react.createContext)({
	compositions: [],
	folders: [],
	currentCompositionMetadata: null,
	canvasContent: null
});
var CompositionSetters = (0, import_react.createContext)({
	registerComposition: () => {},
	unregisterComposition: () => {},
	registerFolder: () => {},
	unregisterFolder: () => {},
	setCanvasContent: () => {},
	onlyRenderComposition: null
});
var NonceContext = (0, import_react.createContext)({ getNonce: () => 0 });
var fastRefreshNonce = 0;
try {
	if (typeof __webpack_module__ !== "undefined") {
		if (__webpack_module__.hot) __webpack_module__.hot.addStatusHandler((status) => {
			if (status === "idle") fastRefreshNonce++;
		});
	}
} catch {}
var useNonce = () => {
	const nonce = (0, import_react.useContext)(NonceContext).getNonce();
	const nonceRef = (0, import_react.useRef)(nonce);
	nonceRef.current = nonce;
	const history = (0, import_react.useRef)([[fastRefreshNonce, nonce]]);
	const get = (0, import_react.useCallback)(() => {
		if (fastRefreshNonce !== history.current[history.current.length - 1][0]) history.current = [...history.current, [fastRefreshNonce, nonceRef.current]];
		return history.current;
	}, [history]);
	return (0, import_react.useMemo)(() => {
		return { get };
	}, [get]);
};
function truthy$1(value) {
	return Boolean(value);
}
var getRegex = () => /^([a-zA-Z0-9-\u4E00-\u9FFF])+$/g;
var isFolderNameValid = (name) => name.match(getRegex());
var validateFolderName = (name) => {
	if (name === void 0 || name === null) throw new TypeError("You must pass a name to a <Folder />.");
	if (typeof name !== "string") throw new TypeError(`The "name" you pass into <Folder /> must be a string. Got: ${typeof name}`);
	if (!isFolderNameValid(name)) throw new Error(`Folder name can only contain a-z, A-Z, 0-9 and -. You passed ${name}`);
};
var invalidFolderNameErrorMessage = `Folder name must match ${String(getRegex())}`;
var FolderContext = (0, import_react.createContext)({
	folderName: null,
	parentName: null
});
var Folder = (props) => {
	const { name, children } = props;
	const parent = (0, import_react.useContext)(FolderContext);
	const { registerFolder, unregisterFolder } = (0, import_react.useContext)(CompositionSetters);
	const nonce = useNonce();
	const stack = props.stack ?? null;
	validateFolderName(name);
	const parentNameArr = [parent.parentName, parent.folderName].filter(truthy$1);
	const parentName = parentNameArr.length === 0 ? null : parentNameArr.join("/");
	const value = (0, import_react.useMemo)(() => {
		return {
			folderName: name,
			parentName
		};
	}, [name, parentName]);
	(0, import_react.useEffect)(() => {
		registerFolder(name, parentName, nonce.get(), stack);
		return () => {
			unregisterFolder(name, parentName);
		};
	}, [
		name,
		parent.folderName,
		parentName,
		registerFolder,
		unregisterFolder,
		nonce,
		stack
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderContext.Provider, {
		value,
		children
	});
};
function getNodeEnvString() {
	return [
		"NOD",
		"E_EN",
		"V"
	].join("");
}
var getEnvString = () => {
	return ["e", "nv"].join("");
};
var getRemotionEnvironment = () => {
	const isPlayer = typeof window !== "undefined" && window.remotion_isPlayer;
	const isRendering = typeof window !== "undefined" && typeof window.process !== "undefined" && typeof window.process.env !== "undefined" && (window.process[getEnvString()][getNodeEnvString()] === "test" || window.process[getEnvString()][getNodeEnvString()] === "production" && typeof window !== "undefined" && typeof window.remotion_puppeteerTimeout !== "undefined");
	return {
		isStudio: typeof window !== "undefined" && window.remotion_isStudio,
		isRendering,
		isPlayer,
		isReadOnlyStudio: typeof window !== "undefined" && window.remotion_isReadOnlyStudio,
		isClientSideRendering: false
	};
};
var DATE_TOKEN$1 = "remotion-date:";
var FILE_TOKEN$1 = "remotion-file:";
var serializeJSONWithSpecialTypes$1 = ({ data, indent, staticBase }) => {
	let customDateUsed = false;
	let customFileUsed = false;
	let mapUsed = false;
	let setUsed = false;
	try {
		return {
			serializedString: JSON.stringify(data, function(key, value) {
				const item = this[key];
				if (item instanceof Date) {
					customDateUsed = true;
					return `${DATE_TOKEN$1}${item.toISOString()}`;
				}
				if (item instanceof Map) {
					mapUsed = true;
					return value;
				}
				if (item instanceof Set) {
					setUsed = true;
					return value;
				}
				if (typeof item === "string" && staticBase !== null && item.startsWith(staticBase)) {
					customFileUsed = true;
					return `${FILE_TOKEN$1}${item.replace(staticBase + "/", "")}`;
				}
				return value;
			}, indent),
			customDateUsed,
			customFileUsed,
			mapUsed,
			setUsed
		};
	} catch (err) {
		throw new Error("Could not serialize the passed input props to JSON: " + err.message);
	}
};
var deserializeJSONWithSpecialTypes$1 = (data) => {
	return JSON.parse(data, (_, value) => {
		if (typeof value === "string" && value.startsWith(DATE_TOKEN$1)) return new Date(value.replace(DATE_TOKEN$1, ""));
		if (typeof value === "string" && value.startsWith(FILE_TOKEN$1)) return `${window.remotion_staticBase}/${value.replace(FILE_TOKEN$1, "")}`;
		return value;
	});
};
var serializeThenDeserialize = (props) => {
	return deserializeJSONWithSpecialTypes$1(serializeJSONWithSpecialTypes$1({
		data: props,
		indent: 2,
		staticBase: window.remotion_staticBase
	}).serializedString);
};
var serializeThenDeserializeInStudio = (props) => {
	if (getRemotionEnvironment().isStudio) return serializeThenDeserialize(props);
	return props;
};
var IsPlayerContext = (0, import_react.createContext)(false);
var IsPlayerContextProvider = ({ children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IsPlayerContext.Provider, {
		value: true,
		children
	});
};
var useIsPlayer = () => {
	return (0, import_react.useContext)(IsPlayerContext);
};
var hasTailwindClassName = ({ className, classPrefix, type }) => {
	if (!className) return false;
	if (type === "exact") {
		const split = className.split(" ");
		return classPrefix.some((token) => {
			return split.some((part) => {
				return part.trim() === token || part.trim().endsWith(`:${token}`) || part.trim().endsWith(`!${token}`);
			});
		});
	}
	return classPrefix.some((prefix) => {
		return className.startsWith(prefix) || className.includes(` ${prefix}`) || className.includes(`!${prefix}`) || className.includes(`:${prefix}`);
	});
};
var AbsoluteFillRefForwarding = (props, ref) => {
	const { style, ...other } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		style: (0, import_react.useMemo)(() => {
			return {
				position: "absolute",
				top: hasTailwindClassName({
					className: other.className,
					classPrefix: ["top-", "inset-"],
					type: "prefix"
				}) ? void 0 : 0,
				left: hasTailwindClassName({
					className: other.className,
					classPrefix: ["left-", "inset-"],
					type: "prefix"
				}) ? void 0 : 0,
				right: hasTailwindClassName({
					className: other.className,
					classPrefix: ["right-", "inset-"],
					type: "prefix"
				}) ? void 0 : 0,
				bottom: hasTailwindClassName({
					className: other.className,
					classPrefix: ["bottom-", "inset-"],
					type: "prefix"
				}) ? void 0 : 0,
				width: hasTailwindClassName({
					className: other.className,
					classPrefix: ["w-"],
					type: "prefix"
				}) ? void 0 : "100%",
				height: hasTailwindClassName({
					className: other.className,
					classPrefix: ["h-"],
					type: "prefix"
				}) ? void 0 : "100%",
				display: hasTailwindClassName({
					className: other.className,
					classPrefix: [
						"block",
						"inline-block",
						"inline",
						"flex",
						"inline-flex",
						"flow-root",
						"grid",
						"inline-grid",
						"contents",
						"list-item",
						"hidden"
					],
					type: "exact"
				}) ? void 0 : "flex",
				flexDirection: hasTailwindClassName({
					className: other.className,
					classPrefix: [
						"flex-row",
						"flex-col",
						"flex-row-reverse",
						"flex-col-reverse"
					],
					type: "exact"
				}) ? void 0 : "column",
				...style
			};
		}, [other.className, style]),
		...other
	});
};
var AbsoluteFill = (0, import_react.forwardRef)(AbsoluteFillRefForwarding);
var rotate = { transform: `rotate(90deg)` };
var ICON_SIZE$1 = 40;
var label$1 = {
	color: "white",
	fontSize: 14,
	fontFamily: "sans-serif"
};
var container = {
	justifyContent: "center",
	alignItems: "center"
};
var Loading = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AbsoluteFill, {
		style: container,
		id: "remotion-comp-loading",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
				type: "text/css",
				children: `
				@keyframes anim {
					from {
						opacity: 0
					}
					to {
						opacity: 1
					}
				}
				#remotion-comp-loading {
					animation: anim 2s;
					animation-fill-mode: forwards;
				}
			`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				width: ICON_SIZE$1,
				height: ICON_SIZE$1,
				viewBox: "-100 -100 400 400",
				style: rotate,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "#555",
					stroke: "#555",
					strokeWidth: "100",
					strokeLinejoin: "round",
					d: "M 2 172 a 196 100 0 0 0 195 5 A 196 240 0 0 0 100 2.259 A 196 240 0 0 0 2 172 z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				style: label$1,
				children: [
					"Resolving ",
					"<Suspense>",
					"..."
				]
			})
		]
	});
};
var _portalNode = null;
var portalNode = () => {
	if (!_portalNode) {
		if (typeof document === "undefined") throw new Error("Tried to call an API that only works in the browser from outside the browser");
		_portalNode = document.createElement("div");
		_portalNode.style.position = "absolute";
		_portalNode.style.top = "0px";
		_portalNode.style.left = "0px";
		_portalNode.style.right = "0px";
		_portalNode.style.bottom = "0px";
		_portalNode.style.width = "100%";
		_portalNode.style.height = "100%";
		_portalNode.style.display = "flex";
		_portalNode.style.flexDirection = "column";
		const containerNode = document.createElement("div");
		containerNode.style.position = "fixed";
		containerNode.style.top = "-999999px";
		containerNode.appendChild(_portalNode);
		document.body.appendChild(containerNode);
	}
	return _portalNode;
};
var getKey = () => {
	return `remotion_inputPropsOverride` + window.location.origin;
};
var getInputPropsOverride = () => {
	if (typeof localStorage === "undefined") return null;
	const override = localStorage.getItem(getKey());
	if (!override) return null;
	return JSON.parse(override);
};
var setInputPropsOverride = (override) => {
	if (typeof localStorage === "undefined") return;
	if (override === null) {
		localStorage.removeItem(getKey());
		return;
	}
	localStorage.setItem(getKey(), JSON.stringify(override));
};
var didWarnSSRImport = false;
var warnOnceSSRImport = () => {
	if (didWarnSSRImport) return;
	didWarnSSRImport = true;
	console.warn("Called `getInputProps()` on the server. This function is not available server-side and has returned an empty object.");
	console.warn("To hide this warning, don't call this function on the server:");
	console.warn("  typeof window === 'undefined' ? {} : getInputProps()");
};
var getInputProps = () => {
	if (typeof window === "undefined") {
		warnOnceSSRImport();
		return {};
	}
	if (getRemotionEnvironment().isPlayer) throw new Error("You cannot call `getInputProps()` from a <Player>. Instead, the props are available as React props from component that you passed as `component` prop.");
	const override = getInputPropsOverride();
	if (override) return override;
	if (typeof window === "undefined" || typeof window.remotion_inputProps === "undefined") throw new Error("Cannot call `getInputProps()` - window.remotion_inputProps is not set. This API is only available if you are in the Studio, or while you are rendering server-side.");
	const param = window.remotion_inputProps;
	if (!param) return {};
	return deserializeJSONWithSpecialTypes$1(param);
};
var EditorPropsContext = (0, import_react.createContext)({
	props: {},
	updateProps: () => {
		throw new Error("Not implemented");
	}
});
var timeValueRef = import_react.createRef();
var EditorPropsProvider = ({ children }) => {
	const [props, setProps] = import_react.useState({});
	const updateProps = (0, import_react.useCallback)(({ defaultProps, id, newProps }) => {
		setProps((prev) => {
			return {
				...prev,
				[id]: typeof newProps === "function" ? newProps(prev[id] ?? defaultProps) : newProps
			};
		});
	}, []);
	const ctx = (0, import_react.useMemo)(() => {
		return {
			props,
			updateProps
		};
	}, [props, updateProps]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorPropsContext.Provider, {
		value: ctx,
		children
	});
};
var RemotionEnvironmentContext = import_react.createContext(null);
var useRemotionEnvironment = () => {
	const context = (0, import_react.useContext)(RemotionEnvironmentContext);
	const [env] = (0, import_react.useState)(() => getRemotionEnvironment());
	return context ?? env;
};
function validateDimension$2(amount, nameOfProp, location) {
	if (typeof amount !== "number") throw new Error(`The "${nameOfProp}" prop ${location} must be a number, but you passed a value of type ${typeof amount}`);
	if (isNaN(amount)) throw new TypeError(`The "${nameOfProp}" prop ${location} must not be NaN, but is NaN.`);
	if (!Number.isFinite(amount)) throw new TypeError(`The "${nameOfProp}" prop ${location} must be finite, but is ${amount}.`);
	if (amount % 1 !== 0) throw new TypeError(`The "${nameOfProp}" prop ${location} must be an integer, but is ${amount}.`);
	if (amount <= 0) throw new TypeError(`The "${nameOfProp}" prop ${location} must be positive, but got ${amount}.`);
}
function validateDurationInFrames$2(durationInFrames, options) {
	const { allowFloats, component } = options;
	if (typeof durationInFrames === "undefined") throw new Error(`The "durationInFrames" prop ${component} is missing.`);
	if (typeof durationInFrames !== "number") throw new Error(`The "durationInFrames" prop ${component} must be a number, but you passed a value of type ${typeof durationInFrames}`);
	if (durationInFrames <= 0) throw new TypeError(`The "durationInFrames" prop ${component} must be positive, but got ${durationInFrames}.`);
	if (!allowFloats && durationInFrames % 1 !== 0) throw new TypeError(`The "durationInFrames" prop ${component} must be an integer, but got ${durationInFrames}.`);
	if (!Number.isFinite(durationInFrames)) throw new TypeError(`The "durationInFrames" prop ${component} must be finite, but got ${durationInFrames}.`);
}
function validateFps$2(fps, location, isGif) {
	if (typeof fps !== "number") throw new Error(`"fps" must be a number, but you passed a value of type ${typeof fps} ${location}`);
	if (!Number.isFinite(fps)) throw new Error(`"fps" must be a finite, but you passed ${fps} ${location}`);
	if (isNaN(fps)) throw new Error(`"fps" must not be NaN, but got ${fps} ${location}`);
	if (fps <= 0) throw new TypeError(`"fps" must be positive, but got ${fps} ${location}`);
	if (isGif && fps > 50) throw new TypeError(`The FPS for a GIF cannot be higher than 50. Use the --every-nth-frame option to lower the FPS: https://remotion.dev/docs/render-as-gif`);
}
var ResolveCompositionContext = (0, import_react.createContext)(null);
var resolveCompositionsRef = (0, import_react.createRef)();
var needsResolution = (composition) => {
	return Boolean(composition.calculateMetadata);
};
var useResolvedVideoConfig = (preferredCompositionId) => {
	const context = (0, import_react.useContext)(ResolveCompositionContext);
	const { props: allEditorProps } = (0, import_react.useContext)(EditorPropsContext);
	const { compositions, canvasContent, currentCompositionMetadata } = (0, import_react.useContext)(CompositionManager);
	const currentComposition = canvasContent?.type === "composition" ? canvasContent.compositionId : null;
	const compositionId = preferredCompositionId ?? currentComposition;
	const composition = compositions.find((c) => c.id === compositionId);
	const selectedEditorProps = (0, import_react.useMemo)(() => {
		return composition ? allEditorProps[composition.id] ?? {} : {};
	}, [allEditorProps, composition]);
	const env = useRemotionEnvironment();
	return (0, import_react.useMemo)(() => {
		if (!composition) return null;
		if (currentCompositionMetadata) return {
			type: "success",
			result: {
				...currentCompositionMetadata,
				id: composition.id,
				defaultProps: composition.defaultProps ?? {}
			}
		};
		if (!needsResolution(composition)) {
			validateDurationInFrames$2(composition.durationInFrames, {
				allowFloats: false,
				component: `in <Composition id="${composition.id}">`
			});
			validateFps$2(composition.fps, `in <Composition id="${composition.id}">`, false);
			validateDimension$2(composition.width, "width", `in <Composition id="${composition.id}">`);
			validateDimension$2(composition.height, "height", `in <Composition id="${composition.id}">`);
			return {
				type: "success",
				result: {
					width: composition.width,
					height: composition.height,
					fps: composition.fps,
					id: composition.id,
					durationInFrames: composition.durationInFrames,
					defaultProps: composition.defaultProps ?? {},
					props: {
						...composition.defaultProps ?? {},
						...selectedEditorProps ?? {},
						...typeof window === "undefined" || env.isPlayer || !window.remotion_inputProps ? {} : getInputProps() ?? {}
					},
					defaultCodec: null,
					defaultOutName: null,
					defaultVideoImageFormat: null,
					defaultPixelFormat: null,
					defaultProResProfile: null,
					defaultSampleRate: null
				}
			};
		}
		if (!context) return null;
		if (!context[composition.id]) return null;
		return context[composition.id];
	}, [
		composition,
		context,
		currentCompositionMetadata,
		selectedEditorProps,
		env.isPlayer
	]);
};
var getErrorStackWithMessage = (error) => {
	const stack = error.stack ?? "";
	return stack.startsWith("Error:") ? stack : `${error.message}
${stack}`;
};
var isErrorLike = (err) => {
	if (err instanceof Error) return true;
	if (err === null) return false;
	if (typeof err !== "object") return false;
	if (!("stack" in err)) return false;
	if (typeof err.stack !== "string") return false;
	if (!("message" in err)) return false;
	if (typeof err.message !== "string") return false;
	return true;
};
function cancelRenderInternal(scope, err) {
	let error;
	if (isErrorLike(err)) {
		error = err;
		if (!error.stack) error.stack = new Error(error.message).stack;
	} else if (typeof err === "string") error = Error(err);
	else error = Error("Rendering was cancelled");
	if (scope) scope.remotion_cancelledError = getErrorStackWithMessage(error);
	throw error;
}
function cancelRender(err) {
	return cancelRenderInternal(typeof window !== "undefined" ? window : void 0, err);
}
var logLevels = [
	"trace",
	"verbose",
	"info",
	"warn",
	"error"
];
var getNumberForLogLevel = (level) => {
	return logLevels.indexOf(level);
};
var isEqualOrBelowLogLevel = (currentLevel, level) => {
	return getNumberForLogLevel(currentLevel) <= getNumberForLogLevel(level);
};
var transformArgs = ({ args, logLevel, tag }) => {
	const arr = [...args];
	if (getRemotionEnvironment().isRendering && !getRemotionEnvironment().isClientSideRendering) arr.unshift(Symbol.for(`__remotion_level_${logLevel}`));
	if (tag && getRemotionEnvironment().isRendering && !getRemotionEnvironment().isClientSideRendering) arr.unshift(Symbol.for(`__remotion_tag_${tag}`));
	return arr;
};
var verbose = (options, ...args) => {
	if (isEqualOrBelowLogLevel(options.logLevel, "verbose")) return console.debug(...transformArgs({
		args,
		logLevel: "verbose",
		tag: options.tag
	}));
};
var trace = (options, ...args) => {
	if (isEqualOrBelowLogLevel(options.logLevel, "trace")) return console.debug(...transformArgs({
		args,
		logLevel: "trace",
		tag: options.tag
	}));
};
var info = (options, ...args) => {
	if (isEqualOrBelowLogLevel(options.logLevel, "info")) return console.log(...transformArgs({
		args,
		logLevel: "info",
		tag: options.tag
	}));
};
var warn = (options, ...args) => {
	if (isEqualOrBelowLogLevel(options.logLevel, "warn")) return console.warn(...transformArgs({
		args,
		logLevel: "warn",
		tag: options.tag
	}));
};
var error = (options, ...args) => {
	return console.error(...transformArgs({
		args,
		logLevel: "error",
		tag: options.tag
	}));
};
var Log = {
	trace,
	verbose,
	info,
	warn,
	error
};
if (typeof window !== "undefined") {
	window.remotion_renderReady = false;
	if (!window.remotion_delayRenderTimeouts) window.remotion_delayRenderTimeouts = {};
	window.remotion_delayRenderHandles = [];
}
var DELAY_RENDER_CALLSTACK_TOKEN$1 = "The delayRender was called:";
var DELAY_RENDER_RETRIES_LEFT$1 = "Retries left: ";
var DELAY_RENDER_RETRY_TOKEN$1 = "- Rendering the frame will be retried.";
var DELAY_RENDER_CLEAR_TOKEN$1 = "handle was cleared after";
var defaultTimeout = 3e4;
var delayRenderInternal = ({ scope, environment, label: label2, options }) => {
	if (typeof label2 !== "string" && label2 !== null) throw new Error("The label parameter of delayRender() must be a string or undefined, got: " + JSON.stringify(label2));
	const handle = Math.random();
	scope.remotion_delayRenderHandles.push(handle);
	const called = Error().stack?.replace(/^Error/g, "") ?? "";
	if (environment.isRendering) {
		const timeoutToUse = (options?.timeoutInMilliseconds ?? scope.remotion_puppeteerTimeout ?? defaultTimeout) - 2e3;
		const retriesLeft = (options?.retries ?? 0) - (scope.remotion_attempt - 1);
		scope.remotion_delayRenderTimeouts[handle] = {
			label: label2 ?? null,
			startTime: Date.now(),
			timeout: setTimeout(() => {
				const message = [
					`A delayRender()`,
					label2 ? `"${label2}"` : null,
					`was called but not cleared after ${timeoutToUse}ms. See https://remotion.dev/docs/timeout for help.`,
					retriesLeft > 0 ? DELAY_RENDER_RETRIES_LEFT$1 + retriesLeft : null,
					retriesLeft > 0 ? DELAY_RENDER_RETRY_TOKEN$1 : null,
					DELAY_RENDER_CALLSTACK_TOKEN$1,
					called
				].filter(truthy$1).join(" ");
				if (environment.isClientSideRendering) scope.remotion_cancelledError = getErrorStackWithMessage(Error(message));
				else cancelRenderInternal(scope, Error(message));
			}, timeoutToUse)
		};
	}
	scope.remotion_renderReady = false;
	return handle;
};
var delayRender = (label2, options) => {
	if (typeof window === "undefined") return Math.random();
	return delayRenderInternal({
		scope: window,
		environment: getRemotionEnvironment(),
		label: label2 ?? null,
		options: options ?? {}
	});
};
var continueRenderInternal = ({ scope, handle, environment, logLevel }) => {
	if (typeof handle === "undefined") throw new TypeError("The continueRender() method must be called with a parameter that is the return value of delayRender(). No value was passed.");
	if (typeof handle !== "number") throw new TypeError("The parameter passed into continueRender() must be the return value of delayRender() which is a number. Got: " + JSON.stringify(handle));
	scope.remotion_delayRenderHandles = scope.remotion_delayRenderHandles.filter((h) => {
		if (h === handle) {
			if (environment.isRendering && scope !== void 0) {
				if (!scope.remotion_delayRenderTimeouts[handle]) return false;
				const { label: label2, startTime, timeout } = scope.remotion_delayRenderTimeouts[handle];
				clearTimeout(timeout);
				const message = [
					label2 ? `"${label2}"` : "A handle",
					DELAY_RENDER_CLEAR_TOKEN$1,
					`${Date.now() - startTime}ms`
				].filter(truthy$1).join(" ");
				Log.verbose({
					logLevel,
					tag: "delayRender()"
				}, message);
				delete scope.remotion_delayRenderTimeouts[handle];
			}
			return false;
		}
		return true;
	});
	if (scope.remotion_delayRenderHandles.length === 0) scope.remotion_renderReady = true;
};
var LogLevelContext = (0, import_react.createContext)({
	logLevel: "info",
	mountTime: 0
});
var useLogLevel = () => {
	const { logLevel } = import_react.useContext(LogLevelContext);
	if (logLevel === null) throw new Error("useLogLevel must be used within a LogLevelProvider");
	return logLevel;
};
var useMountTime = () => {
	const { mountTime } = import_react.useContext(LogLevelContext);
	if (mountTime === null) throw new Error("useMountTime must be used within a LogLevelProvider");
	return mountTime;
};
var DelayRenderContextType = (0, import_react.createContext)(null);
var useDelayRender = () => {
	const environment = useRemotionEnvironment();
	const scope = (0, import_react.useContext)(DelayRenderContextType) ?? (typeof window !== "undefined" ? window : void 0);
	const logLevel = useLogLevel();
	return {
		delayRender: (0, import_react.useCallback)((label2, options) => {
			if (!scope) return Math.random();
			return delayRenderInternal({
				scope,
				environment,
				label: label2 ?? null,
				options: options ?? {}
			});
		}, [environment, scope]),
		continueRender: (0, import_react.useCallback)((handle) => {
			if (!scope) return;
			continueRenderInternal({
				scope,
				handle,
				environment,
				logLevel
			});
		}, [
			environment,
			logLevel,
			scope
		]),
		cancelRender: (0, import_react.useCallback)((err) => {
			return cancelRenderInternal(scope ?? (typeof window !== "undefined" ? window : void 0), err);
		}, [scope])
	};
};
var useLazyComponent = ({ compProps, componentName, noSuspense }) => {
	const componentRef = (0, import_react.useRef)(null);
	if ("component" in compProps) componentRef.current = compProps.component;
	return (0, import_react.useMemo)(() => {
		if ("component" in compProps) {
			if (typeof document === "undefined" || noSuspense) return compProps.component;
			if (typeof compProps.component === "undefined") throw new Error(`A value of \`undefined\` was passed to the \`component\` prop. Check the value you are passing to the <${componentName}/> component.`);
			const Wrapper = (props) => {
				const Comp = componentRef.current;
				return import_react.createElement(Comp, props);
			};
			return Wrapper;
		}
		if ("lazyComponent" in compProps && typeof compProps.lazyComponent !== "undefined") {
			if (typeof compProps.lazyComponent === "undefined") throw new Error(`A value of \`undefined\` was passed to the \`lazyComponent\` prop. Check the value you are passing to the <${componentName}/> component.`);
			return import_react.lazy(compProps.lazyComponent);
		}
		throw new Error("You must pass either 'component' or 'lazyComponent'");
	}, [compProps.lazyComponent]);
};
var useVideo = () => {
	const { canvasContent, compositions, currentCompositionMetadata } = (0, import_react.useContext)(CompositionManager);
	const selected = compositions.find((c) => {
		return canvasContent?.type === "composition" && c.id === canvasContent.compositionId;
	});
	const resolved = useResolvedVideoConfig(selected?.id ?? null);
	return (0, import_react.useMemo)(() => {
		if (!resolved) return null;
		if (resolved.type === "error") return null;
		if (resolved.type === "loading") return null;
		if (!selected) return null;
		return {
			...resolved.result,
			defaultProps: selected.defaultProps ?? {},
			id: selected.id,
			...currentCompositionMetadata ?? {},
			component: selected.component
		};
	}, [
		currentCompositionMetadata,
		resolved,
		selected
	]);
};
var getRegex2 = () => /^([a-zA-Z0-9-\u4E00-\u9FFF])+$/g;
var isCompositionIdValid = (id) => id.match(getRegex2());
var validateCompositionId = (id) => {
	if (!isCompositionIdValid(id)) throw new Error(`Composition id can only contain a-z, A-Z, 0-9, CJK characters and -. You passed ${id}`);
};
var invalidCompositionErrorMessage = `Composition ID must match ${String(getRegex2())}`;
var validateDefaultAndInputProps$2 = (defaultProps, name, compositionId) => {
	if (!defaultProps) return;
	if (typeof defaultProps !== "object") throw new Error(`"${name}" must be an object, but you passed a value of type ${typeof defaultProps}`);
	if (Array.isArray(defaultProps)) throw new Error(`"${name}" must be an object, an array was passed ${compositionId ? `for composition "${compositionId}"` : ""}`);
};
var Fallback = () => {
	const { continueRender: continueRender2, delayRender: delayRender2 } = useDelayRender();
	(0, import_react.useEffect)(() => {
		const fallback = delayRender2("Waiting for Root component to unsuspend");
		return () => continueRender2(fallback);
	}, [continueRender2, delayRender2]);
	return null;
};
var InnerComposition = ({ width, height, fps, durationInFrames, id, defaultProps, schema, ...compProps }) => {
	const { registerComposition, unregisterComposition } = (0, import_react.useContext)(CompositionSetters);
	const video = useVideo();
	const lazy = useLazyComponent({
		compProps,
		componentName: "Composition",
		noSuspense: false
	});
	const nonce = useNonce();
	const isPlayer = useIsPlayer();
	const environment = useRemotionEnvironment();
	const canUseComposition = (0, import_react.useContext)(CanUseRemotionHooks);
	if (typeof window !== "undefined") window.remotion_seenCompositionIds = Array.from(/* @__PURE__ */ new Set([...window.remotion_seenCompositionIds ?? [], id]));
	if (canUseComposition) {
		if (isPlayer) throw new Error("<Composition> was mounted inside the `component` that was passed to the <Player>. See https://remotion.dev/docs/wrong-composition-mount for help.");
		throw new Error("<Composition> mounted inside another composition. See https://remotion.dev/docs/wrong-composition-mount for help.");
	}
	const { folderName, parentName } = (0, import_react.useContext)(FolderContext);
	const stack = compProps.stack ?? null;
	(0, import_react.useEffect)(() => {
		if (!id) throw new Error("No id for composition passed.");
		validateCompositionId(id);
		validateDefaultAndInputProps$2(defaultProps, "defaultProps", id);
		registerComposition({
			durationInFrames: durationInFrames ?? void 0,
			fps: fps ?? void 0,
			height: height ?? void 0,
			width: width ?? void 0,
			id,
			folderName,
			component: lazy,
			defaultProps: serializeThenDeserializeInStudio(defaultProps ?? {}),
			nonce: nonce.get(),
			parentFolderName: parentName,
			schema: schema ?? null,
			calculateMetadata: compProps.calculateMetadata ?? null,
			stack
		});
		return () => {
			unregisterComposition(id);
		};
	}, [
		durationInFrames,
		fps,
		height,
		lazy,
		id,
		folderName,
		defaultProps,
		width,
		nonce,
		parentName,
		schema,
		compProps.calculateMetadata,
		stack,
		registerComposition,
		unregisterComposition
	]);
	const resolved = useResolvedVideoConfig(id);
	const { setError, clearError } = (0, import_react.useContext)(CompositionRenderErrorContext);
	const onError = (0, import_react.useCallback)((error2) => {
		setError(error2);
	}, [setError]);
	const onClear = (0, import_react.useCallback)(() => {
		clearError();
	}, [clearError]);
	if (environment.isStudio && video && video.component === lazy && video.id === id) {
		const Comp = lazy;
		if (resolved === null || resolved.type !== "success" && resolved.type !== "success-and-refreshing") return null;
		return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanUseRemotionHooksProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompositionErrorBoundary, {
			onError,
			onClear,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, {}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, { ...resolved.result.props ?? {} })
			})
		}) }), portalNode());
	}
	if (environment.isRendering && video && video.component === lazy && video.id === id) {
		const Comp = lazy;
		if (resolved === null || resolved.type !== "success" && resolved.type !== "success-and-refreshing") return null;
		return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanUseRemotionHooksProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fallback, {}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, { ...resolved.result.props ?? {} })
		}) }), portalNode());
	}
	return null;
};
var Composition = (props) => {
	const { onlyRenderComposition } = (0, import_react.useContext)(CompositionSetters);
	if (onlyRenderComposition && onlyRenderComposition !== props.id) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InnerComposition, { ...props });
};
var componentsToAddStacksTo = [];
var getComponentsToAddStacksTo = () => componentsToAddStacksTo;
var addSequenceStackTraces = (component) => {
	componentsToAddStacksTo.push(component);
};
var VERSION = "4.0.484";
var checkMultipleRemotionVersions = () => {
	if (typeof globalThis === "undefined") return;
	const set = () => {
		globalThis.remotion_imported = VERSION;
		if (typeof window !== "undefined") window.remotion_imported = VERSION;
	};
	const alreadyImported = globalThis.remotion_imported || typeof window !== "undefined" && window.remotion_imported;
	if (alreadyImported) {
		if (alreadyImported === "4.0.484") return;
		if (typeof alreadyImported === "string" && alreadyImported.includes("webcodecs")) {
			set();
			return;
		}
		throw new TypeError(`\uD83D\uDEA8 Multiple versions of Remotion detected: ${[VERSION, typeof alreadyImported === "string" ? alreadyImported : "an older version"].filter(truthy$1).join(" and ")}. This will cause things to break in an unexpected way.
Check that all your Remotion packages are on the same version. If your dependencies depend on Remotion, make them peer dependencies. You can also run \`npx remotion versions\` from your terminal to see which versions are mismatching.`);
	}
	set();
};
var SequenceContext = (0, import_react.createContext)(null);
var exports_timeline_position_state = {};
__export(exports_timeline_position_state, {
	useTimelineSetFrame: () => useTimelineSetFrame,
	useTimelinePosition: () => useTimelinePosition,
	useTimelineContext: () => useTimelineContext,
	usePlayingState: () => usePlayingState,
	usePlaybackRate: () => usePlaybackRate,
	useAbsoluteTimelinePosition: () => useAbsoluteTimelinePosition,
	persistCurrentFrame: () => persistCurrentFrame,
	getInitialFrameState: () => getInitialFrameState,
	getFrameForComposition: () => getFrameForComposition,
	clampFrameToCompositionRange: () => clampFrameToCompositionRange
});
function mulberry32(a) {
	let t = a + 1831565813;
	t = Math.imul(t ^ t >>> 15, t | 1);
	t ^= t + Math.imul(t ^ t >>> 7, t | 61);
	return ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function hashCode(str) {
	let i = 0;
	let chr = 0;
	let hash = 0;
	for (i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0;
	}
	return hash;
}
var random = (seed, dummy) => {
	if (dummy !== void 0) throw new TypeError("random() takes only one argument");
	if (seed === null) return Math.random();
	if (typeof seed === "string") return mulberry32(hashCode(seed));
	if (typeof seed === "number") return mulberry32(seed * 1e10);
	throw new Error("random() argument must be a number or a string");
};
var SetTimelineContext = (0, import_react.createContext)({
	setFrame: () => {
		throw new Error("default");
	},
	setPlaying: () => {
		throw new Error("default");
	}
});
var TimelineContext = (0, import_react.createContext)(null);
var PlaybackRateContext = (0, import_react.createContext)(null);
var AbsoluteTimeContext = (0, import_react.createContext)(null);
var TimelineContextProvider = ({ children, frameState }) => {
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const imperativePlaying = (0, import_react.useRef)(false);
	const [playbackRate, setPlaybackRate] = (0, import_react.useState)(1);
	const audioAndVideoTags = (0, import_react.useRef)([]);
	const [remotionRootId] = (0, import_react.useState)(() => String(random(null)));
	const [_frame, setFrame] = (0, import_react.useState)(() => getInitialFrameState());
	const frame = frameState ?? _frame;
	const { delayRender: delayRender2, continueRender: continueRender2 } = useDelayRender();
	if (typeof window !== "undefined") (0, import_react.useLayoutEffect)(() => {
		window.remotion_setFrame = (f, composition, attempt) => {
			window.remotion_attempt = attempt;
			const id = delayRender2(`Setting the current frame to ${f}`);
			let asyncUpdate = true;
			setFrame((s) => {
				if ((s[composition] ?? window.remotion_initialFrame) === f) {
					asyncUpdate = false;
					return s;
				}
				return {
					...s,
					[composition]: f
				};
			});
			if (asyncUpdate) requestAnimationFrame(() => continueRender2(id));
			else continueRender2(id);
		};
		window.remotion_isPlayer = false;
	}, [continueRender2, delayRender2]);
	const timelineContextValue = (0, import_react.useMemo)(() => {
		return {
			frame,
			playing,
			imperativePlaying,
			rootId: remotionRootId,
			audioAndVideoTags
		};
	}, [
		frame,
		playing,
		remotionRootId
	]);
	const playbackRateContextValue = (0, import_react.useMemo)(() => {
		return {
			playbackRate,
			setPlaybackRate
		};
	}, [playbackRate]);
	const setTimelineContextValue = (0, import_react.useMemo)(() => {
		return {
			setFrame,
			setPlaying
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AbsoluteTimeContext.Provider, {
		value: timelineContextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaybackRateContext.Provider, {
			value: playbackRateContextValue,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineContext.Provider, {
				value: timelineContextValue,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetTimelineContext.Provider, {
					value: setTimelineContextValue,
					children
				})
			})
		})
	});
};
var makeKey = () => {
	return `remotion.time-all`;
};
var persistCurrentFrame = (time) => {
	localStorage.setItem(makeKey(), JSON.stringify(time));
};
var getInitialFrameState = () => {
	const item = localStorage.getItem(makeKey()) ?? "{}";
	return JSON.parse(item);
};
var getFrameForComposition = (composition) => {
	const item = localStorage.getItem(makeKey()) ?? "{}";
	const obj = JSON.parse(item);
	if (obj[composition] !== void 0) return Number(obj[composition]);
	if (typeof window === "undefined") return 0;
	return window.remotion_initialFrame ?? 0;
};
var clampFrameToCompositionRange = (frame, durationInFrames) => {
	return Math.max(0, Math.min(Math.max(0, durationInFrames - 1), frame));
};
var useTimelinePositionFromContext = (state) => {
	const videoConfig = useVideo();
	const env = useRemotionEnvironment();
	if (!videoConfig) return typeof window === "undefined" ? 0 : window.remotion_initialFrame ?? 0;
	return clampFrameToCompositionRange(state.frame[videoConfig.id] ?? (env.isPlayer ? 0 : getFrameForComposition(videoConfig.id)), videoConfig.durationInFrames);
};
var useTimelineContext = () => {
	const state = (0, import_react.useContext)(TimelineContext);
	if (state === null) throw new Error("TimelineContext is not available. This hook must be used inside a <Player> or the Remotion Studio.");
	return state;
};
var usePlaybackRate = () => {
	const state = (0, import_react.useContext)(PlaybackRateContext);
	if (state === null) throw new Error("PlaybackRateContext is not available. This hook must be used inside a <Player> or the Remotion Studio.");
	return state;
};
var useTimelinePosition = () => {
	return useTimelinePositionFromContext(useTimelineContext());
};
var useAbsoluteTimelinePosition = () => {
	const state = (0, import_react.useContext)(AbsoluteTimeContext);
	if (state === null) throw new Error("AbsoluteTimeContext is not available. This hook must be used inside a <Player> or the Remotion Studio.");
	return useTimelinePositionFromContext(state);
};
var useTimelineSetFrame = () => {
	const { setFrame } = (0, import_react.useContext)(SetTimelineContext);
	return setFrame;
};
var usePlayingState = () => {
	const { playing, imperativePlaying } = useTimelineContext();
	const { setPlaying } = (0, import_react.useContext)(SetTimelineContext);
	return (0, import_react.useMemo)(() => [
		playing,
		setPlaying,
		imperativePlaying
	], [
		imperativePlaying,
		playing,
		setPlaying
	]);
};
var useCurrentFrame = () => {
	const canUseRemotionHooks = (0, import_react.useContext)(CanUseRemotionHooks);
	const env = useRemotionEnvironment();
	if (!canUseRemotionHooks) {
		if (env.isPlayer) throw new Error(`useCurrentFrame can only be called inside a component that was passed to <Player>. See: https://www.remotion.dev/docs/player/examples`);
		throw new Error(`useCurrentFrame() can only be called inside a component that was registered as a composition. See https://www.remotion.dev/docs/the-fundamentals#defining-compositions`);
	}
	const frame = useTimelinePosition();
	const context = (0, import_react.useContext)(SequenceContext);
	return frame - (context ? context.cumulatedFrom + context.relativeFrom : 0);
};
var useUnsafeVideoConfig = () => {
	const context = (0, import_react.useContext)(SequenceContext);
	const ctxWidth = context?.width ?? null;
	const ctxHeight = context?.height ?? null;
	const ctxDuration = context?.durationInFrames ?? null;
	const video = useVideo();
	return (0, import_react.useMemo)(() => {
		if (!video) return null;
		const { id, durationInFrames, fps, height, width, defaultProps, props, defaultCodec, defaultOutName, defaultVideoImageFormat, defaultPixelFormat, defaultProResProfile, defaultSampleRate } = video;
		return {
			id,
			width: ctxWidth ?? width,
			height: ctxHeight ?? height,
			fps,
			durationInFrames: ctxDuration ?? durationInFrames,
			defaultProps,
			props,
			defaultCodec,
			defaultOutName,
			defaultVideoImageFormat,
			defaultPixelFormat,
			defaultProResProfile,
			defaultSampleRate
		};
	}, [
		ctxDuration,
		ctxHeight,
		ctxWidth,
		video
	]);
};
var useVideoConfig = () => {
	const videoConfig = useUnsafeVideoConfig();
	const context = (0, import_react.useContext)(CanUseRemotionHooks);
	const isPlayer = useIsPlayer();
	if (!videoConfig) {
		if (typeof window !== "undefined" && window.remotion_isPlayer || isPlayer) throw new Error([
			"No video config found. Likely reasons:",
			"- You are probably calling useVideoConfig() from outside the component passed to <Player />. See https://www.remotion.dev/docs/player/examples for how to set up the Player correctly.",
			"- You have multiple versions of Remotion installed which causes the React context to get lost."
		].join("-"));
		throw new Error("No video config found. You are probably calling useVideoConfig() from a component which has not been registered as a <Composition />. See https://www.remotion.dev/docs/the-fundamentals#defining-compositions for more information.");
	}
	if (!context) throw new Error("Called useVideoConfig() outside a Remotion composition.");
	return videoConfig;
};
var Freeze = ({ frame: frameToFreeze, children, active = true }) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();
	if (typeof frameToFreeze === "undefined") throw new Error(`The <Freeze /> component requires a 'frame' prop, but none was passed.`);
	if (typeof frameToFreeze !== "number") throw new Error(`The 'frame' prop of <Freeze /> must be a number, but is of type ${typeof frameToFreeze}`);
	if (Number.isNaN(frameToFreeze)) throw new Error(`The 'frame' prop of <Freeze /> must be a real number, but it is NaN.`);
	if (!Number.isFinite(frameToFreeze)) throw new Error(`The 'frame' prop of <Freeze /> must be a finite number, but it is ${frameToFreeze}.`);
	const isActive = (0, import_react.useMemo)(() => {
		if (typeof active === "boolean") return active;
		if (typeof active === "function") return active(frame);
	}, [active, frame]);
	const timelineContext = useTimelineContext();
	const sequenceContext = (0, import_react.useContext)(SequenceContext);
	const relativeFrom = sequenceContext?.relativeFrom ?? 0;
	const timelineValue = (0, import_react.useMemo)(() => {
		if (!isActive) return timelineContext;
		return {
			...timelineContext,
			playing: false,
			imperativePlaying: { current: false },
			frame: { [videoConfig.id]: frameToFreeze + relativeFrom }
		};
	}, [
		isActive,
		timelineContext,
		videoConfig.id,
		frameToFreeze,
		relativeFrom
	]);
	const newSequenceContext = (0, import_react.useMemo)(() => {
		if (!sequenceContext) return null;
		if (!isActive) return sequenceContext;
		return {
			...sequenceContext,
			cumulatedFrom: 0
		};
	}, [sequenceContext, isActive]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineContext.Provider, {
		value: timelineValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SequenceContext.Provider, {
			value: newSequenceContext,
			children
		})
	});
};
var transformSchema$1 = {
	"style.transformOrigin": {
		type: "transform-origin",
		step: 1,
		default: "50% 50%",
		description: "Transform origin"
	},
	"style.translate": {
		type: "translate",
		step: 1,
		default: "0px 0px",
		description: "Offset"
	},
	"style.scale": {
		type: "scale",
		max: 100,
		step: .01,
		default: 1,
		description: "Scale"
	},
	"style.rotate": {
		type: "rotation-css",
		step: 1,
		default: "0deg",
		description: "Rotation"
	},
	"style.opacity": {
		type: "number",
		min: 0,
		max: 1,
		step: .01,
		default: 1,
		description: "Opacity",
		hiddenFromList: false
	}
};
var sequenceVisualStyleSchema = transformSchema$1;
var textSchema = {
	"style.color": {
		type: "color",
		default: void 0,
		description: "Color"
	},
	"style.fontSize": {
		type: "number",
		default: void 0,
		min: 0,
		step: 1,
		description: "Font size",
		hiddenFromList: false
	},
	"style.lineHeight": {
		type: "number",
		default: void 0,
		min: 0,
		step: .05,
		description: "Line height",
		hiddenFromList: false
	},
	"style.fontWeight": {
		type: "enum",
		default: "400",
		description: "Font weight",
		variants: {
			"100": {},
			"200": {},
			"300": {},
			"400": {},
			"500": {},
			"600": {},
			"700": {},
			"800": {},
			"900": {},
			normal: {},
			bold: {}
		}
	},
	"style.fontStyle": {
		type: "enum",
		default: "normal",
		description: "Font style",
		variants: {
			normal: {},
			italic: {},
			oblique: {}
		}
	},
	"style.textAlign": {
		type: "enum",
		default: "left",
		description: "Text align",
		variants: {
			left: {},
			center: {},
			right: {},
			justify: {},
			start: {},
			end: {}
		}
	},
	"style.letterSpacing": {
		type: "number",
		default: void 0,
		step: .1,
		description: "Letter spacing",
		hiddenFromList: false
	}
};
var premountSchema$1 = {
	premountFor: {
		type: "number",
		default: 0,
		description: "Premount For",
		min: 0,
		step: 1,
		hiddenFromList: false
	},
	postmountFor: {
		type: "number",
		default: 0,
		min: 0,
		step: 1,
		hiddenFromList: true
	},
	styleWhilePremounted: { type: "hidden" },
	styleWhilePostmounted: { type: "hidden" }
};
var sequencePremountSchema = premountSchema$1;
var sequenceStyleSchema = {
	...transformSchema$1,
	...premountSchema$1
};
var hiddenField = {
	type: "boolean",
	default: false,
	description: "Hidden"
};
var showInTimelineField = { type: "hidden" };
var sequenceNameField = { type: "hidden" };
var extendSchemaWithSequenceName = (schema) => {
	return {
		name: sequenceNameField,
		...schema
	};
};
var durationInFramesField = {
	type: "number",
	default: void 0,
	min: 1,
	step: 1,
	hiddenFromList: true
};
var fromField = {
	type: "number",
	default: 0,
	step: 1,
	hiddenFromList: true
};
var trimBeforeField = {
	type: "number",
	default: 0,
	min: 0,
	step: 1,
	hiddenFromList: true
};
var freezeField = {
	type: "number",
	default: null,
	step: 1,
	hiddenFromList: true
};
var baseSchema = {
	durationInFrames: durationInFramesField,
	from: fromField,
	trimBefore: trimBeforeField,
	freeze: freezeField,
	hidden: hiddenField,
	name: sequenceNameField,
	showInTimeline: showInTimelineField
};
var sequenceSchema$1 = {
	...baseSchema,
	layout: {
		type: "enum",
		default: "absolute-fill",
		description: "Layout",
		variants: {
			"absolute-fill": sequenceStyleSchema,
			none: {}
		}
	}
};
var sequenceSchemaWithoutFrom = {
	durationInFrames: durationInFramesField,
	trimBefore: trimBeforeField,
	freeze: freezeField,
	hidden: hiddenField,
	name: sequenceNameField,
	showInTimeline: showInTimelineField,
	layout: sequenceSchema$1.layout
};
var sequenceSchemaDefaultLayoutNone = {
	...sequenceSchema$1,
	layout: {
		...sequenceSchema$1.layout,
		default: "none"
	}
};
var PremountContext = (0, import_react.createContext)({ premountFramesRemaining: 0 });
var SequenceManager = import_react.createContext({
	registerSequence: () => {
		throw new Error("SequenceManagerContext not initialized");
	},
	unregisterSequence: () => {
		throw new Error("SequenceManagerContext not initialized");
	},
	sequences: []
});
var SequenceManagerRefContext = import_react.createContext({ current: [] });
var makeSequencePropsSubscriptionKey = (key) => {
	return `${key.nodePath.join(".")}.${key.sequenceKeys.join(".")}.${key.effectKeys.map((keys) => keys.join(".")).join(".")}`;
};
var VisualModePropStatusesContext = import_react.createContext({ propStatuses: {} });
var VisualModePropStatusesRefContext = import_react.createContext({ current: {} });
var VisualModeDragOverridesContext = import_react.createContext({
	getDragOverrides: () => {
		throw new Error("VisualModeDragOverridesContext not initialized");
	},
	getEffectDragOverrides: () => {
		throw new Error("VisualModeDragOverridesContext not initialized");
	}
});
var VisualModeSettersContext = import_react.createContext({
	setDragOverrides: () => {
		throw new Error("VisualModeSettersContext not initialized");
	},
	clearDragOverrides: () => {
		throw new Error("VisualModeSettersContext not initialized");
	},
	setEffectDragOverrides: () => {
		throw new Error("VisualModeSettersContext not initialized");
	},
	clearEffectDragOverrides: () => {
		throw new Error("VisualModeSettersContext not initialized");
	},
	setPropStatuses: () => {
		throw new Error("VisualModeSettersContext not initialized");
	}
});
var effectDragOverridesKey = (nodePath, effectIndex) => `${makeSequencePropsSubscriptionKey(nodePath)}.effects.${effectIndex}`;
var SequenceManagerProvider = ({ children }) => {
	const [sequences, setSequences] = (0, import_react.useState)([]);
	const sequencesRef = (0, import_react.useRef)(sequences);
	sequencesRef.current = sequences;
	const [dragOverrides, setControlOverrides] = (0, import_react.useState)({});
	const controlOverridesRef = (0, import_react.useRef)(dragOverrides);
	controlOverridesRef.current = dragOverrides;
	const [effectDragOverridesState, setEffectDragOverridesState] = (0, import_react.useState)({});
	const [propStatuses, setPropStatusesMapState] = (0, import_react.useState)({});
	const propStatusesRef = (0, import_react.useRef)(propStatuses);
	propStatusesRef.current = propStatuses;
	const setDragOverrides = (0, import_react.useCallback)((nodePath, key, value) => {
		setControlOverrides((prev) => ({
			...prev,
			[makeSequencePropsSubscriptionKey(nodePath)]: {
				...prev[makeSequencePropsSubscriptionKey(nodePath)],
				[key]: value
			}
		}));
	}, []);
	const clearDragOverrides = (0, import_react.useCallback)((nodePath) => {
		setControlOverrides((prev) => {
			const key = makeSequencePropsSubscriptionKey(nodePath);
			if (!prev[key]) return prev;
			const next = { ...prev };
			delete next[key];
			return next;
		});
	}, []);
	const setEffectDragOverrides = (0, import_react.useCallback)((nodePath, effectIndex, key, value) => {
		setEffectDragOverridesState((prev) => {
			const mapKey = effectDragOverridesKey(nodePath, effectIndex);
			return {
				...prev,
				[mapKey]: {
					...prev[mapKey],
					[key]: value
				}
			};
		});
	}, []);
	const clearEffectDragOverrides = (0, import_react.useCallback)((nodePath, effectIndex) => {
		setEffectDragOverridesState((prev) => {
			const mapKey = effectDragOverridesKey(nodePath, effectIndex);
			if (!prev[mapKey]) return prev;
			const next = { ...prev };
			delete next[mapKey];
			return next;
		});
	}, []);
	const setPropStatuses = (0, import_react.useCallback)((nodePath, values) => {
		setPropStatusesMapState((prev) => {
			const key = makeSequencePropsSubscriptionKey(nodePath);
			const prevKey = prev[key];
			const newKey = values(prevKey);
			if (prevKey === newKey) return prev;
			return {
				...prev,
				[key]: newKey
			};
		});
	}, []);
	const registerSequence = (0, import_react.useCallback)((seq) => {
		setSequences((seqs) => {
			return [...seqs, seq];
		});
	}, []);
	const unregisterSequence = (0, import_react.useCallback)((seq) => {
		setSequences((seqs) => seqs.filter((s) => s.id !== seq));
	}, []);
	const sequenceContext = (0, import_react.useMemo)(() => {
		return {
			registerSequence,
			sequences,
			unregisterSequence
		};
	}, [
		registerSequence,
		sequences,
		unregisterSequence
	]);
	const getDragOverrides = (0, import_react.useCallback)((nodePath) => {
		return dragOverrides[makeSequencePropsSubscriptionKey(nodePath)] ?? {};
	}, [dragOverrides]);
	const getEffectDragOverrides = (0, import_react.useCallback)((nodePath, effectIndex) => {
		return effectDragOverridesState[effectDragOverridesKey(nodePath, effectIndex)] ?? {};
	}, [effectDragOverridesState]);
	const propStatusesContext = (0, import_react.useMemo)(() => {
		return { propStatuses };
	}, [propStatuses]);
	const dragOverridesContext = (0, import_react.useMemo)(() => {
		return {
			getDragOverrides,
			getEffectDragOverrides
		};
	}, [getDragOverrides, getEffectDragOverrides]);
	const settersContext = (0, import_react.useMemo)(() => {
		return {
			setDragOverrides,
			clearDragOverrides,
			setEffectDragOverrides,
			clearEffectDragOverrides,
			setPropStatuses
		};
	}, [
		setDragOverrides,
		clearDragOverrides,
		setEffectDragOverrides,
		clearEffectDragOverrides,
		setPropStatuses
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SequenceManagerRefContext.Provider, {
		value: sequencesRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SequenceManager.Provider, {
			value: sequenceContext,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualModePropStatusesRefContext.Provider, {
				value: propStatusesRef,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualModePropStatusesContext.Provider, {
					value: propStatusesContext,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualModeDragOverridesContext.Provider, {
						value: dragOverridesContext,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualModeSettersContext.Provider, {
							value: settersContext,
							children
						})
					})
				})
			})
		})
	});
};
var IsInsideSeriesContext = (0, import_react.createContext)(false);
var IsInsideSeriesContainer = ({ children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IsInsideSeriesContext.Provider, {
		value: true,
		children
	});
};
var IsNotInsideSeriesProvider = ({ children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IsInsideSeriesContext.Provider, {
		value: false,
		children
	});
};
var useRequireToBeInsideSeries = () => {
	if (!import_react.useContext(IsInsideSeriesContext)) throw new Error("This component must be inside a <Series /> component.");
};
var ENABLE_V5_BREAKING_CHANGES$1 = false;
var deleteNestedKey = (obj, keysToRemove) => {
	for (const key of keysToRemove) {
		const parts = key.split(".");
		const parents = [obj];
		let current = obj;
		for (let i = 0; i < parts.length - 1; i++) {
			const part = parts[i];
			const next = current[part];
			if (next === void 0 || next === null) {
				current = null;
				break;
			}
			current = next;
			parents.push(current);
		}
		if (current === null) continue;
		delete current[parts[parts.length - 1]];
		for (let i = parents.length - 1; i > 0; i--) {
			const parent = parents[i];
			if (Object.keys(parent).length === 0) {
				const parentKey = parts[i - 1];
				delete parents[i - 1][parentKey];
			} else break;
		}
	}
	return obj;
};
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = .001;
var SUBDIVISION_PRECISION = 1e-7;
var SUBDIVISION_MAX_ITERATIONS = 10;
var kSplineTableSize = 11;
var kSampleStepSize = 1 / (kSplineTableSize - 1);
var float32ArraySupported = typeof Float32Array === "function";
function a(aA1, aA2) {
	return 1 - 3 * aA2 + 3 * aA1;
}
function b(aA1, aA2) {
	return 3 * aA2 - 6 * aA1;
}
function c(aA1) {
	return 3 * aA1;
}
function calcBezier(aT, aA1, aA2) {
	return ((a(aA1, aA2) * aT + b(aA1, aA2)) * aT + c(aA1)) * aT;
}
function getSlope(aT, aA1, aA2) {
	return 3 * a(aA1, aA2) * aT * aT + 2 * b(aA1, aA2) * aT + c(aA1);
}
function binarySubdivide({ aX, _aA, _aB, mX1, mX2 }) {
	let currentX;
	let currentT;
	let i = 0;
	let aA = _aA;
	let aB = _aB;
	do {
		currentT = aA + (aB - aA) / 2;
		currentX = calcBezier(currentT, mX1, mX2) - aX;
		if (currentX > 0) aB = currentT;
		else aA = currentT;
	} while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
	return currentT;
}
function newtonRaphsonIterate(aX, _aGuessT, mX1, mX2) {
	let aGuessT = _aGuessT;
	for (let i = 0; i < NEWTON_ITERATIONS; ++i) {
		const currentSlope = getSlope(aGuessT, mX1, mX2);
		if (currentSlope === 0) return aGuessT;
		const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
		aGuessT -= currentX / currentSlope;
	}
	return aGuessT;
}
function bezier(mX1, mY1, mX2, mY2) {
	if (!(mX1 >= 0 && mX1 <= 1 && mX2 >= 0 && mX2 <= 1)) throw new Error("bezier x values must be in [0, 1] range");
	const sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
	if (mX1 !== mY1 || mX2 !== mY2) for (let i = 0; i < kSplineTableSize; ++i) sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
	function getTForX(aX) {
		let intervalStart = 0;
		let currentSample = 1;
		const lastSample = kSplineTableSize - 1;
		for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) intervalStart += kSampleStepSize;
		--currentSample;
		const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
		const guessForT = intervalStart + dist * kSampleStepSize;
		const initialSlope = getSlope(guessForT, mX1, mX2);
		if (initialSlope >= NEWTON_MIN_SLOPE) return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
		if (initialSlope === 0) return guessForT;
		return binarySubdivide({
			aX,
			_aA: intervalStart,
			_aB: intervalStart + kSampleStepSize,
			mX1,
			mX2
		});
	}
	return function(x) {
		const clampedX = Math.min(1, Math.max(0, x));
		if (mX1 === mY1 && mX2 === mY2) return clampedX;
		if (clampedX === 0) return 0;
		if (clampedX === 1) return 1;
		return calcBezier(getTForX(clampedX), mY1, mY2);
	};
}
var normalizeNumber$1 = (value) => {
	return Math.round(value * 1e6) / 1e6;
};
var angleUnits$1 = /* @__PURE__ */ new Set([
	"deg",
	"rad",
	"grad",
	"turn"
]);
var lengthUnits$1 = /* @__PURE__ */ new Set([
	"%",
	"cap",
	"ch",
	"cm",
	"cqb",
	"cqh",
	"cqi",
	"cqmax",
	"cqmin",
	"cqw",
	"dvh",
	"dvw",
	"em",
	"ex",
	"ic",
	"in",
	"lh",
	"lvh",
	"lvw",
	"mm",
	"pc",
	"pt",
	"px",
	"q",
	"rem",
	"rlh",
	"svh",
	"svw",
	"vb",
	"vh",
	"vi",
	"vmax",
	"vmin",
	"vw"
]);
var cssNumberRegex$1 = /^([+-]?(?:\d+\.?\d*|\.\d+))([a-zA-Z%]+)?$/;
var transformOriginKeywords$1 = /* @__PURE__ */ new Set([
	"left",
	"center",
	"right",
	"top",
	"bottom"
]);
var transformOriginKeywordOptions$1 = (keyword) => {
	if (keyword === "left") return [{
		axis: "x",
		value: {
			value: 0,
			unit: "%"
		}
	}];
	if (keyword === "right") return [{
		axis: "x",
		value: {
			value: 100,
			unit: "%"
		}
	}];
	if (keyword === "top") return [{
		axis: "y",
		value: {
			value: 0,
			unit: "%"
		}
	}];
	if (keyword === "bottom") return [{
		axis: "y",
		value: {
			value: 100,
			unit: "%"
		}
	}];
	return [{
		axis: "x",
		value: {
			value: 50,
			unit: "%"
		}
	}, {
		axis: "y",
		value: {
			value: 50,
			unit: "%"
		}
	}];
};
var transformOriginCenter$1 = {
	value: 50,
	unit: "%"
};
var stringifyNumber$1 = (value) => {
	return String(normalizeNumber$1(value));
};
var parseStringInterpolationComponent$1 = (component, value) => {
	const match = cssNumberRegex$1.exec(component);
	if (match === null) throw new TypeError(`Cannot interpolate "${value}" because "${component}" is not a supported scale, translate, or rotate value`);
	const unit = match[2] ?? null;
	const numberValue = Number(match[1]);
	if (!Number.isFinite(numberValue)) throw new TypeError(`Cannot interpolate "${value}" because "${component}" is not finite`);
	if (unit === null) return {
		kind: "scale",
		value: numberValue,
		unit: null
	};
	if (angleUnits$1.has(unit)) return {
		kind: "rotate",
		value: numberValue,
		unit
	};
	if (lengthUnits$1.has(unit)) return {
		kind: "translate",
		value: numberValue,
		unit
	};
	throw new TypeError(`Cannot interpolate "${value}" because "${unit}" is not a supported translate or rotate unit`);
};
var parseTransformOriginLengthPercentage$1 = ({ component, value, allowPercentage }) => {
	const match = cssNumberRegex$1.exec(component);
	if (match === null) throw new TypeError(`Cannot interpolate "${value}" because "${component}" is not a supported transform-origin ${allowPercentage ? "length-percentage" : "z length"}`);
	const unit = match[2] ?? null;
	const numberValue = Number(match[1]);
	if (!Number.isFinite(numberValue)) throw new TypeError(`Cannot interpolate "${value}" because "${component}" is not finite`);
	if (unit === null || !lengthUnits$1.has(unit) || !allowPercentage && unit === "%") throw new TypeError(`Cannot interpolate "${value}" because "${component}" is not a supported transform-origin ${allowPercentage ? "length-percentage" : "z length"}`);
	return {
		value: numberValue,
		unit
	};
};
var parseTransformOriginToken$1 = (component, value) => {
	const lower = component.toLowerCase();
	if (transformOriginKeywords$1.has(lower)) return {
		type: "keyword",
		keyword: lower
	};
	return {
		type: "length-percentage",
		parsed: parseTransformOriginLengthPercentage$1({
			component,
			value,
			allowPercentage: true
		})
	};
};
var parseTwoTransformOriginKeywords$1 = (first, second, value) => {
	const candidates = [];
	for (const firstOption of transformOriginKeywordOptions$1(first)) for (const secondOption of transformOriginKeywordOptions$1(second)) {
		if (firstOption.axis === secondOption.axis) continue;
		candidates.push(firstOption.axis === "x" ? [firstOption.value, secondOption.value] : [secondOption.value, firstOption.value]);
	}
	if (candidates.length === 0) throw new TypeError(`Cannot interpolate "${value}" because "${first} ${second}" is not a valid transform-origin keyword pair`);
	return candidates[0];
};
var parseTransformOriginXY$1 = (parts, value) => {
	if (parts.length === 1) {
		const token = parseTransformOriginToken$1(parts[0], value);
		if (token.type === "length-percentage") return [token.parsed, transformOriginCenter$1];
		if (token.keyword === "top" || token.keyword === "bottom") return [transformOriginCenter$1, transformOriginKeywordOptions$1(token.keyword)[0].value];
		return [transformOriginKeywordOptions$1(token.keyword)[0].value, transformOriginCenter$1];
	}
	const first = parseTransformOriginToken$1(parts[0], value);
	const second = parseTransformOriginToken$1(parts[1], value);
	if (first.type === "length-percentage" && second.type === "length-percentage") return [first.parsed, second.parsed];
	if (first.type === "keyword" && second.type === "keyword") return parseTwoTransformOriginKeywords$1(first.keyword, second.keyword, value);
	const keyword = first.type === "keyword" ? first : second.type === "keyword" ? second : null;
	const length = first.type === "length-percentage" ? first.parsed : second.type === "length-percentage" ? second.parsed : null;
	if (keyword === null || length === null) throw new Error("Expected a keyword and a length-percentage value");
	const keywordIsFirst = first.type === "keyword";
	if (keyword.keyword === "left" || keyword.keyword === "right") {
		if (!keywordIsFirst) throw new TypeError(`Cannot interpolate "${value}" because horizontal transform-origin keywords must come before a length-percentage value`);
		return [transformOriginKeywordOptions$1(keyword.keyword)[0].value, length];
	}
	if (keyword.keyword === "top" || keyword.keyword === "bottom") return [length, transformOriginKeywordOptions$1(keyword.keyword)[0].value];
	return keywordIsFirst ? [transformOriginCenter$1, length] : [length, transformOriginCenter$1];
};
var parseTransformOriginValue$1 = (output, parts) => {
	const [x, y] = parseTransformOriginXY$1(parts.slice(0, 2), output);
	const z = parts[2] === void 0 ? {
		value: 0,
		unit: null
	} : parseTransformOriginLengthPercentage$1({
		component: parts[2],
		value: output,
		allowPercentage: false
	});
	return {
		kind: "translate",
		values: [
			x.value,
			y.value,
			z.value
		],
		units: [
			x.unit,
			y.unit,
			z.unit
		],
		dimensions: parts[2] === void 0 ? 2 : 3
	};
};
var parseStringInterpolationValue$1 = (output) => {
	if (typeof output === "number") {
		if (!Number.isFinite(output)) throw new Error(`outputRange must contain only finite numbers, but got [${output}]`);
		return {
			kind: "scale",
			values: [
				output,
				output,
				1
			],
			units: [
				null,
				null,
				null
			],
			dimensions: 1
		};
	}
	const parts = output.trim().split(/\s+/);
	if (parts.length < 1 || parts.length > 3 || parts[0] === "") throw new TypeError(`String outputRange values must contain 1 to 3 components, but got "${output}"`);
	if (parts.some((part) => transformOriginKeywords$1.has(part.toLowerCase()))) return parseTransformOriginValue$1(output, parts);
	const parsed = parts.map((part) => parseStringInterpolationComponent$1(part, output));
	const [{ kind }] = parsed;
	for (const part of parsed) if (part.kind !== kind) throw new TypeError(`Cannot interpolate "${output}" because it mixes ${kind} and ${part.kind} values`);
	if (kind === "scale") {
		const x = parsed[0].value;
		return {
			kind,
			values: [
				x,
				parsed[1]?.value ?? x,
				parsed[2]?.value ?? 1
			],
			units: [
				null,
				null,
				null
			],
			dimensions: parsed.length
		};
	}
	return {
		kind,
		values: [
			parsed[0].value,
			parsed[1]?.value ?? 0,
			parsed[2]?.value ?? 0
		],
		units: [
			parsed[0].unit,
			parsed[1]?.unit ?? null,
			parsed[2]?.unit ?? null
		],
		dimensions: parsed.length
	};
};
var serializeStringInterpolationValue$1 = ({ kind, values, units, dimensions }) => {
	if (kind === "scale") return values.slice(0, dimensions).map((value) => stringifyNumber$1(value)).join(" ");
	return values.slice(0, dimensions).map((value, index) => `${stringifyNumber$1(value)}${units[index]}`).join(" ");
};
function interpolateFunction$1(input, inputRange, outputRange, options) {
	const { extrapolateLeft, extrapolateRight, easing } = options;
	let result = input;
	const [inputMin, inputMax] = inputRange;
	const [outputMin, outputMax] = outputRange;
	if (result < inputMin) {
		if (extrapolateLeft === "identity") return result;
		if (extrapolateLeft === "clamp") result = inputMin;
		else if (extrapolateLeft === "wrap") {
			const range = inputMax - inputMin;
			result = ((result - inputMin) % range + range) % range + inputMin;
		} else if (extrapolateLeft === "extend") {}
	}
	if (result > inputMax) {
		if (extrapolateRight === "identity") return result;
		if (extrapolateRight === "clamp") result = inputMax;
		else if (extrapolateRight === "wrap") {
			const range = inputMax - inputMin;
			result = ((result - inputMin) % range + range) % range + inputMin;
		} else if (extrapolateRight === "extend") {}
	}
	if (outputMin === outputMax) return outputMin;
	result = (result - inputMin) / (inputMax - inputMin);
	result = easing(result);
	result = result * (outputMax - outputMin) + outputMin;
	return result;
}
function findRange$1(input, inputRange) {
	let i;
	for (i = 1; i < inputRange.length - 1; ++i) if (inputRange[i] >= input) break;
	return i - 1;
}
var defaultEasing$1 = (num) => num;
var shouldExtendRightForEasing$1 = (easing) => {
	return easing.remotionShouldExtendRight === true;
};
var resolveEasingForSegment$1 = ({ easing, segmentIndex }) => {
	if (easing === void 0) return defaultEasing$1;
	if (typeof easing === "function") return easing;
	return easing[segmentIndex];
};
var interpolateSegment$1 = ({ input, inputRange, outputRange, easing, extrapolateLeft, extrapolateRight }) => {
	return interpolateFunction$1(input, inputRange, outputRange, {
		easing,
		extrapolateLeft,
		extrapolateRight: input > inputRange[1] && extrapolateRight === "clamp" && shouldExtendRightForEasing$1(easing) ? "extend" : extrapolateRight
	});
};
var interpolateNumber$1 = ({ input, inputRange, outputRange, options }) => {
	if (inputRange.length === 1) return outputRange[0];
	const easingOption = options?.easing;
	let extrapolateLeft = "extend";
	if (options?.extrapolateLeft !== void 0) extrapolateLeft = options.extrapolateLeft;
	let extrapolateRight = "extend";
	if (options?.extrapolateRight !== void 0) extrapolateRight = options.extrapolateRight;
	const posterizedInput = options?.posterize === void 0 ? input : Math.floor(input / options.posterize) * options.posterize;
	const range = findRange$1(posterizedInput, inputRange);
	const easing = resolveEasingForSegment$1({
		easing: easingOption,
		segmentIndex: range
	});
	let result = interpolateSegment$1({
		input: posterizedInput,
		inputRange: [inputRange[range], inputRange[range + 1]],
		outputRange: [outputRange[range], outputRange[range + 1]],
		easing,
		extrapolateLeft,
		extrapolateRight
	});
	for (let segmentIndex = 0; segmentIndex < range; segmentIndex++) {
		const previousEasing = resolveEasingForSegment$1({
			easing: easingOption,
			segmentIndex
		});
		if (!shouldExtendRightForEasing$1(previousEasing)) continue;
		const previousSegmentEnd = inputRange[segmentIndex + 1];
		if (posterizedInput <= previousSegmentEnd) continue;
		const continuedSegmentValue = interpolateSegment$1({
			input: posterizedInput,
			inputRange: [inputRange[segmentIndex], previousSegmentEnd],
			outputRange: [outputRange[segmentIndex], outputRange[segmentIndex + 1]],
			easing: previousEasing,
			extrapolateLeft,
			extrapolateRight: "extend"
		});
		result += continuedSegmentValue - outputRange[segmentIndex + 1];
	}
	return result;
};
var interpolateString$1 = ({ input, inputRange, outputRange, options }) => {
	const parsedOutputRange = outputRange.map(parseStringInterpolationValue$1);
	const kind = parsedOutputRange[0]?.kind;
	if (kind === void 0) throw new Error("outputRange must have at least 1 element");
	for (const parsed of parsedOutputRange) if (parsed.kind !== kind) throw new TypeError(`Cannot interpolate ${kind} values with ${parsed.kind} values`);
	const dimensions = Math.max(...parsedOutputRange.map((parsed) => parsed.dimensions));
	const units = [
		null,
		null,
		null
	];
	if (kind !== "scale") for (let axis = 0; axis < dimensions; axis++) {
		for (const parsed of parsedOutputRange) {
			const unit = parsed.units[axis];
			if (unit === null) continue;
			if (units[axis] === null) {
				units[axis] = unit;
				continue;
			}
			if (units[axis] !== unit) throw new TypeError(`Cannot interpolate ${kind} values with different units on axis ${axis + 1}: ${units[axis]} and ${unit}`);
		}
		if (units[axis] === null) throw new TypeError(`Cannot interpolate ${kind} values because axis ${axis + 1} has no unit`);
	}
	return serializeStringInterpolationValue$1({
		kind,
		values: [
			0,
			0,
			0
		].map((_, axis) => interpolateNumber$1({
			input,
			inputRange,
			outputRange: parsedOutputRange.map((parsed) => parsed.values[axis]),
			options
		})),
		units,
		dimensions
	});
};
var validateTupleOutputRange$1 = (outputRange) => {
	const dimensions = outputRange[0]?.length;
	if (dimensions === void 0) throw new Error("outputRange must have at least 1 element");
	if (dimensions === 0) throw new TypeError("outputRange tuples must contain at least 1 number");
	for (const output of outputRange) {
		if (output.length !== dimensions) throw new TypeError(`outputRange tuples must all have the same length, but got ${dimensions} and ${output.length}`);
		for (const value of output) if (typeof value !== "number" || !Number.isFinite(value)) throw new TypeError(`outputRange tuples must contain only finite numbers, but got [${output.join(",")}]`);
	}
	return dimensions;
};
var interpolateTuple$1 = ({ input, inputRange, outputRange, options }) => {
	const dimensions = validateTupleOutputRange$1(outputRange);
	return new Array(dimensions).fill(true).map((_, axis) => interpolateNumber$1({
		input,
		inputRange,
		outputRange: outputRange.map((output) => output[axis]),
		options
	}));
};
function checkValidInputRange$1(arr) {
	for (let i = 1; i < arr.length; ++i) if (!(arr[i] > arr[i - 1])) throw new Error(`inputRange must be strictly monotonically increasing but got [${arr.join(",")}]`);
}
function checkInfiniteRange$1(name, arr) {
	if (arr.length < 1) throw new Error(name + " must have at least 1 element");
	for (const element of arr) {
		if (typeof element !== "number") throw new Error(`${name} must contain only numbers`);
		if (!Number.isFinite(element)) throw new Error(`${name} must contain only finite numbers, but got [${arr.join(",")}]`);
	}
}
function assertValidInterpolateEasingOption$1(easing, inputRangeLength) {
	if (easing === void 0) return;
	if (typeof easing === "function") return;
	const expectedLength = inputRangeLength - 1;
	if (easing.length !== expectedLength) throw new Error(`When easing is an array, it must have one entry per segment between keyframes (length inputRange.length - 1 = ${expectedLength}), but got length ${easing.length}`);
	for (let i = 0; i < easing.length; i++) if (typeof easing[i] !== "function") throw new Error(`easing[${i}] must be a function`);
}
function assertValidInterpolatePosterizeOption$1(posterize) {
	if (posterize === void 0) return;
	if (typeof posterize !== "number" || !Number.isFinite(posterize) || posterize <= 0) throw new Error(`posterize must be a positive finite number, but got ${posterize}`);
}
function interpolate$1(input, inputRange, outputRange, options) {
	if (typeof input === "undefined") throw new Error("input can not be undefined");
	if (typeof inputRange === "undefined") throw new Error("inputRange can not be undefined");
	if (typeof outputRange === "undefined") throw new Error("outputRange can not be undefined");
	if (inputRange.length !== outputRange.length) throw new Error("inputRange (" + inputRange.length + ") and outputRange (" + outputRange.length + ") must have the same length");
	checkInfiniteRange$1("inputRange", inputRange);
	checkValidInputRange$1(inputRange);
	assertValidInterpolateEasingOption$1(options?.easing, inputRange.length);
	assertValidInterpolatePosterizeOption$1(options?.posterize);
	if (typeof input !== "number") throw new TypeError("Cannot interpolate an input which is not a number");
	if (!Array.isArray(outputRange)) throw new Error("outputRange must contain only numbers");
	if (outputRange.some((output) => typeof output === "string")) {
		if (!outputRange.every((output) => typeof output === "string" || typeof output === "number")) throw new TypeError("outputRange must contain only numbers, or supported scale, translate, and rotate strings");
		return interpolateString$1({
			input,
			inputRange,
			outputRange,
			options
		});
	}
	if (outputRange.every((output) => Array.isArray(output))) return interpolateTuple$1({
		input,
		inputRange,
		outputRange,
		options
	});
	if (!outputRange.every((output) => typeof output === "number")) throw new TypeError("outputRange must contain only numbers, numeric tuples, or supported scale, translate, and rotate strings");
	checkInfiniteRange$1("outputRange", outputRange);
	return interpolateNumber$1({
		input,
		inputRange,
		outputRange,
		options
	});
}
var validateFrame$1 = ({ allowFloats, durationInFrames, frame }) => {
	if (typeof frame === "undefined") throw new TypeError(`Argument missing for parameter "frame"`);
	if (typeof frame !== "number") throw new TypeError(`Argument passed for "frame" is not a number: ${frame}`);
	if (!Number.isFinite(frame)) throw new RangeError(`Frame ${frame} is not finite`);
	if (frame % 1 !== 0 && !allowFloats) throw new RangeError(`Argument for frame must be an integer, but got ${frame}`);
	if (frame < 0 && frame < -durationInFrames) throw new RangeError(`Cannot use frame ${frame}: Duration of composition is ${durationInFrames}, therefore the lowest frame that can be rendered is ${-durationInFrames}`);
	if (frame > durationInFrames - 1) throw new RangeError(`Cannot use frame ${frame}: Duration of composition is ${durationInFrames}, therefore the highest frame that can be rendered is ${durationInFrames - 1}`);
};
var validateSpringDuration = (dur) => {
	if (typeof dur === "undefined") return;
	if (typeof dur !== "number") throw new TypeError(`A "duration" of a spring must be a "number" but is "${typeof dur}"`);
	if (Number.isNaN(dur)) throw new TypeError("A \"duration\" of a spring is NaN, which it must not be");
	if (!Number.isFinite(dur)) throw new TypeError("A \"duration\" of a spring must be finite, but is " + dur);
	if (dur <= 0) throw new TypeError("A \"duration\" of a spring must be positive, but is " + dur);
};
var defaultSpringConfig = {
	damping: 10,
	mass: 1,
	stiffness: 100,
	overshootClamping: false
};
var advanceCache = {};
function advance({ animation, now, config }) {
	const { toValue, lastTimestamp, current, velocity } = animation;
	const deltaTime = Math.min(now - lastTimestamp, 64);
	if (config.damping <= 0) throw new Error("Spring damping must be greater than 0, otherwise the spring() animation will never end, causing an infinite loop.");
	const c2 = config.damping;
	const m = config.mass;
	const k = config.stiffness;
	const cacheKey = [
		toValue,
		lastTimestamp,
		current,
		velocity,
		c2,
		m,
		k,
		now
	].join("-");
	if (advanceCache[cacheKey]) return advanceCache[cacheKey];
	const v0 = -velocity;
	const x0 = toValue - current;
	const zeta = c2 / (2 * Math.sqrt(k * m));
	const omega0 = Math.sqrt(k / m);
	const omega1 = omega0 * Math.sqrt(1 - zeta ** 2);
	const t = deltaTime / 1e3;
	const sin1 = Math.sin(omega1 * t);
	const cos1 = Math.cos(omega1 * t);
	const underDampedEnvelope = Math.exp(-zeta * omega0 * t);
	const underDampedFrag1 = underDampedEnvelope * (sin1 * ((v0 + zeta * omega0 * x0) / omega1) + x0 * cos1);
	const underDampedPosition = toValue - underDampedFrag1;
	const underDampedVelocity = zeta * omega0 * underDampedFrag1 - underDampedEnvelope * (cos1 * (v0 + zeta * omega0 * x0) - omega1 * x0 * sin1);
	const criticallyDampedEnvelope = Math.exp(-omega0 * t);
	const criticallyDampedPosition = toValue - criticallyDampedEnvelope * (x0 + (v0 + omega0 * x0) * t);
	const criticallyDampedVelocity = criticallyDampedEnvelope * (v0 * (t * omega0 - 1) + t * x0 * omega0 * omega0);
	const animationNode = {
		toValue,
		prevPosition: current,
		lastTimestamp: now,
		current: zeta < 1 ? underDampedPosition : criticallyDampedPosition,
		velocity: zeta < 1 ? underDampedVelocity : criticallyDampedVelocity
	};
	advanceCache[cacheKey] = animationNode;
	return animationNode;
}
var calculationCache = {};
function springCalculation({ frame, fps, config = {} }) {
	const from = 0;
	const to = 1;
	const cacheKey = [
		frame,
		fps,
		config.damping,
		config.mass,
		config.overshootClamping,
		config.stiffness
	].join("-");
	if (calculationCache[cacheKey]) return calculationCache[cacheKey];
	let animation = {
		lastTimestamp: 0,
		current: from,
		toValue: to,
		velocity: 0,
		prevPosition: 0
	};
	const frameClamped = Math.max(0, frame);
	const unevenRest = frameClamped % 1;
	for (let f = 0; f <= Math.floor(frameClamped); f++) {
		if (f === Math.floor(frameClamped)) f += unevenRest;
		const time = f / fps * 1e3;
		animation = advance({
			animation,
			now: time,
			config: {
				...defaultSpringConfig,
				...config
			}
		});
	}
	calculationCache[cacheKey] = animation;
	return animation;
}
var cache = /* @__PURE__ */ new Map();
function measureSpring({ fps, config = {}, threshold = .005 }) {
	if (typeof threshold !== "number") throw new TypeError(`threshold must be a number, got ${threshold} of type ${typeof threshold}`);
	if (threshold === 0) return Infinity;
	if (threshold === 1) return 0;
	if (isNaN(threshold)) throw new TypeError("Threshold is NaN");
	if (!Number.isFinite(threshold)) throw new TypeError("Threshold is not finite");
	if (threshold < 0) throw new TypeError("Threshold is below 0");
	const cacheKey = [
		fps,
		config.damping,
		config.mass,
		config.overshootClamping,
		config.stiffness,
		threshold
	].join("-");
	if (cache.has(cacheKey)) return cache.get(cacheKey);
	validateFps$2(fps, "to the measureSpring() function", false);
	let frame = 0;
	let finishedFrame = 0;
	const calc = () => {
		return springCalculation({
			fps,
			frame,
			config
		});
	};
	let animation = calc();
	const calcDifference = () => {
		return Math.abs(animation.current - animation.toValue);
	};
	let difference = calcDifference();
	while (difference >= threshold) {
		frame++;
		animation = calc();
		difference = calcDifference();
	}
	finishedFrame = frame;
	for (let i = 0; i < 20; i++) {
		frame++;
		animation = calc();
		difference = calcDifference();
		if (difference >= threshold) {
			i = 0;
			finishedFrame = frame + 1;
		}
	}
	cache.set(cacheKey, finishedFrame);
	return finishedFrame;
}
function spring({ frame: passedFrame, fps, config = {}, from = 0, to = 1, durationInFrames: passedDurationInFrames, durationRestThreshold, delay = 0, reverse = false }) {
	validateSpringDuration(passedDurationInFrames);
	validateFrame$1({
		frame: passedFrame,
		durationInFrames: Infinity,
		allowFloats: true
	});
	validateFps$2(fps, "to spring()", false);
	const needsToCalculateNaturalDuration = reverse || typeof passedDurationInFrames !== "undefined";
	const naturalDuration = needsToCalculateNaturalDuration ? measureSpring({
		fps,
		config,
		threshold: durationRestThreshold
	}) : void 0;
	const naturalDurationGetter = needsToCalculateNaturalDuration ? { get: () => naturalDuration } : { get: () => {
		throw new Error("did not calculate natural duration, this is an error with Remotion. Please report");
	} };
	const delayProcessed = (reverse ? (passedDurationInFrames ?? naturalDurationGetter.get()) - passedFrame : passedFrame) + (reverse ? delay : -delay);
	const durationProcessed = passedDurationInFrames === void 0 ? delayProcessed : delayProcessed / (passedDurationInFrames / naturalDurationGetter.get());
	if (passedDurationInFrames && delayProcessed > passedDurationInFrames) return to;
	const spr = springCalculation({
		fps,
		frame: durationProcessed,
		config
	});
	const inner = config.overshootClamping ? to >= from ? Math.min(spr.current, to) : Math.max(spr.current, to) : spr.current;
	return from === 0 && to === 1 ? inner : interpolate$1(inner, [0, 1], [from, to]);
}
var clampUnit = (t) => Math.min(1, Math.max(0, t));
var springEasingDurationInFrames = 30;
var Easing = class Easing {
	static step0(n) {
		return n > 0 ? 1 : 0;
	}
	static step1(n) {
		return n >= 1 ? 1 : 0;
	}
	static linear(t) {
		return t;
	}
	static ease(t) {
		return Easing.bezier(.42, 0, 1, 1)(t);
	}
	static quad(t) {
		return t * t;
	}
	static cubic(t) {
		return t * t * t;
	}
	static poly(n) {
		return (t) => t ** n;
	}
	static sin(t) {
		return 1 - Math.cos(t * Math.PI / 2);
	}
	static circle(t) {
		const u = clampUnit(t);
		return 1 - Math.sqrt(1 - u * u);
	}
	static exp(t) {
		return 2 ** (10 * (t - 1));
	}
	static elastic(bounciness = 1) {
		const p = bounciness * Math.PI;
		return (t) => 1 - Math.cos(t * Math.PI / 2) ** 3 * Math.cos(t * p);
	}
	static back(s = 1.70158) {
		return (t) => t * t * ((s + 1) * t - s);
	}
	static spring({ allowTail = false, durationRestThreshold, ...config } = {}) {
		const easing = (t) => {
			if (t <= 0) return 0;
			if (!allowTail && t >= 1) return 1;
			if (allowTail) return spring({
				fps: springEasingDurationInFrames,
				frame: t * measureSpring({
					fps: springEasingDurationInFrames,
					config,
					threshold: durationRestThreshold
				}),
				config
			});
			return spring({
				fps: springEasingDurationInFrames,
				frame: t * springEasingDurationInFrames,
				config,
				durationInFrames: springEasingDurationInFrames,
				durationRestThreshold
			});
		};
		return Object.assign(easing, { remotionShouldExtendRight: allowTail });
	}
	static bounce(t) {
		const u = clampUnit(t);
		if (u < 1 / 2.75) return 7.5625 * u * u;
		if (u < 2 / 2.75) {
			const t2_ = u - 1.5 / 2.75;
			return 7.5625 * t2_ * t2_ + .75;
		}
		if (u < 2.5 / 2.75) {
			const t2_ = u - 2.25 / 2.75;
			return 7.5625 * t2_ * t2_ + .9375;
		}
		const t2 = u - 2.625 / 2.75;
		return 7.5625 * t2 * t2 + .984375;
	}
	static bezier(x1, y1, x2, y2) {
		return bezier(x1, y1, x2, y2);
	}
	static in(easing) {
		return easing;
	}
	static out(easing) {
		return (t) => 1 - easing(1 - t);
	}
	static inOut(easing) {
		return (t) => {
			if (t < .5) return easing(t * 2) / 2;
			return 1 - easing((1 - t) * 2) / 2;
		};
	}
};
var NUMBER$1 = "[-+]?\\d*\\.?\\d+";
var PERCENTAGE$1 = NUMBER$1 + "%";
function call$1(...args) {
	return "\\(\\s*(" + args.join(")\\s*,\\s*(") + ")\\s*\\)";
}
var MODERN_VALUE$1 = "(?:none|[-+]?\\d*\\.?\\d+(?:%|deg|rad|grad|turn)?)";
function modernColorCall$1(name) {
	return new RegExp(name + "\\(\\s*(" + MODERN_VALUE$1 + ")\\s+(" + MODERN_VALUE$1 + ")\\s+(" + MODERN_VALUE$1 + ")(?:\\s*\\/\\s*(" + MODERN_VALUE$1 + "))?\\s*\\)");
}
function getMatchers$1() {
	const cachedMatchers = {
		rgb: void 0,
		rgba: void 0,
		hsl: void 0,
		hsla: void 0,
		hex3: void 0,
		hex4: void 0,
		hex5: void 0,
		hex6: void 0,
		hex8: void 0,
		oklch: void 0,
		oklab: void 0,
		lab: void 0,
		lch: void 0,
		hwb: void 0
	};
	if (cachedMatchers.rgb === void 0) {
		cachedMatchers.rgb = new RegExp("rgb" + call$1(NUMBER$1, NUMBER$1, NUMBER$1));
		cachedMatchers.rgba = new RegExp("rgba" + call$1(NUMBER$1, NUMBER$1, NUMBER$1, NUMBER$1));
		cachedMatchers.hsl = new RegExp("hsl" + call$1(NUMBER$1, PERCENTAGE$1, PERCENTAGE$1));
		cachedMatchers.hsla = new RegExp("hsla" + call$1(NUMBER$1, PERCENTAGE$1, PERCENTAGE$1, NUMBER$1));
		cachedMatchers.hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
		cachedMatchers.hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
		cachedMatchers.hex6 = /^#([0-9a-fA-F]{6})$/;
		cachedMatchers.hex8 = /^#([0-9a-fA-F]{8})$/;
		cachedMatchers.oklch = modernColorCall$1("oklch");
		cachedMatchers.oklab = modernColorCall$1("oklab");
		cachedMatchers.lab = modernColorCall$1("lab");
		cachedMatchers.lch = modernColorCall$1("lch");
		cachedMatchers.hwb = modernColorCall$1("hwb");
	}
	return cachedMatchers;
}
function hue2rgb$1(p, q, t) {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) return p + (q - p) * 6 * t;
	if (t < 1 / 2) return q;
	if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	return p;
}
function hslToRgb$1(h, s, l) {
	const q = l < .5 ? l * (1 + s) : l + s - l * s;
	const p = 2 * l - q;
	const r = hue2rgb$1(p, q, h + 1 / 3);
	const g = hue2rgb$1(p, q, h);
	const b2 = hue2rgb$1(p, q, h - 1 / 3);
	return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b2 * 255) << 8;
}
function parse255$1(str) {
	const int = Number.parseInt(str, 10);
	if (int < 0) return 0;
	if (int > 255) return 255;
	return int;
}
function parse360$1(str) {
	return (Number.parseFloat(str) % 360 + 360) % 360 / 360;
}
function parse1$1(str) {
	const num = Number.parseFloat(str);
	if (num < 0) return 0;
	if (num > 1) return 255;
	return Math.round(num * 255);
}
function parsePercentage$1(str) {
	const int = Number.parseFloat(str);
	if (int < 0) return 0;
	if (int > 100) return 1;
	return int / 100;
}
function parseModernComponent$1(str, percentScale) {
	if (str === "none") return 0;
	if (str.endsWith("%")) return Number.parseFloat(str) / 100 * percentScale;
	return Number.parseFloat(str);
}
function parseHueAngle$1(str) {
	if (str === "none") return 0;
	if (str.endsWith("rad")) return Number.parseFloat(str) * 180 / Math.PI;
	if (str.endsWith("grad")) return Number.parseFloat(str) * .9;
	if (str.endsWith("turn")) return Number.parseFloat(str) * 360;
	return Number.parseFloat(str);
}
function parseModernAlpha$1(str) {
	if (str === void 0 || str === "none") return 1;
	if (str.endsWith("%")) return Math.max(0, Math.min(1, Number.parseFloat(str) / 100));
	return Math.max(0, Math.min(1, Number.parseFloat(str)));
}
function linearToSrgb$1(c2) {
	if (c2 <= .0031308) return 12.92 * c2;
	return 1.055 * c2 ** (1 / 2.4) - .055;
}
function clamp01$1(v) {
	return Math.max(0, Math.min(1, v));
}
function rgbFloatToInt$1(r, g, b2, alpha) {
	const ri = Math.round(clamp01$1(r) * 255);
	const gi = Math.round(clamp01$1(g) * 255);
	const bi = Math.round(clamp01$1(b2) * 255);
	const ai = Math.round(clamp01$1(alpha) * 255);
	return (ri << 24 | gi << 16 | bi << 8 | ai) >>> 0;
}
function oklabToSrgb$1(L, a2, b2) {
	const l_ = L + .3963377774 * a2 + .2158037573 * b2;
	const m_ = L - .1055613458 * a2 - .0638541728 * b2;
	const s_ = L - .0894841775 * a2 - 1.291485548 * b2;
	const l = l_ * l_ * l_;
	const m = m_ * m_ * m_;
	const s = s_ * s_ * s_;
	const rLin = 4.0767416621 * l - 3.3077115913 * m + .2309699292 * s;
	const gLin = -1.2684380046 * l + 2.6097574011 * m - .3413193965 * s;
	const bLin = -.0041960863 * l - .7034186147 * m + 1.707614701 * s;
	return [
		linearToSrgb$1(rLin),
		linearToSrgb$1(gLin),
		linearToSrgb$1(bLin)
	];
}
function labToSrgb$1(L, a2, b2) {
	const epsilon = 216 / 24389;
	const kappa = 24389 / 27;
	const Xn = .95047;
	const Yn = 1;
	const Zn = 1.08883;
	const fy = (L + 16) / 116;
	const fx = a2 / 500 + fy;
	const fz = fy - b2 / 200;
	const fx3 = fx * fx * fx;
	const fz3 = fz * fz * fz;
	const xr = fx3 > epsilon ? fx3 : (116 * fx - 16) / kappa;
	const yr = L > kappa * epsilon ? ((L + 16) / 116) ** 3 : L / kappa;
	const zr = fz3 > epsilon ? fz3 : (116 * fz - 16) / kappa;
	const X = xr * Xn;
	const Y = yr * Yn;
	const Z = zr * Zn;
	const rLin = 3.2404542 * X - 1.5371385 * Y - .4985314 * Z;
	const gLin = -.969266 * X + 1.8760108 * Y + .041556 * Z;
	const bLin = .0556434 * X - .2040259 * Y + 1.0572252 * Z;
	return [
		linearToSrgb$1(rLin),
		linearToSrgb$1(gLin),
		linearToSrgb$1(bLin)
	];
}
function hwbToSrgb$1(h, w, bk) {
	if (w + bk >= 1) {
		const gray = w / (w + bk);
		return [
			gray,
			gray,
			gray
		];
	}
	const q = 1;
	const p = 0;
	const r = hue2rgb$1(p, q, h + 1 / 3);
	const g = hue2rgb$1(p, q, h);
	const bl = hue2rgb$1(p, q, h - 1 / 3);
	const factor = 1 - w - bk;
	return [
		r * factor + w,
		g * factor + w,
		bl * factor + w
	];
}
var colorNames$1 = {
	transparent: 0,
	aliceblue: 4042850303,
	antiquewhite: 4209760255,
	aqua: 16777215,
	aquamarine: 2147472639,
	azure: 4043309055,
	beige: 4126530815,
	bisque: 4293182719,
	black: 255,
	blanchedalmond: 4293643775,
	blue: 65535,
	blueviolet: 2318131967,
	brown: 2771004159,
	burlywood: 3736635391,
	burntsienna: 3934150143,
	cadetblue: 1604231423,
	chartreuse: 2147418367,
	chocolate: 3530104575,
	coral: 4286533887,
	cornflowerblue: 1687547391,
	cornsilk: 4294499583,
	crimson: 3692313855,
	cyan: 16777215,
	darkblue: 35839,
	darkcyan: 9145343,
	darkgoldenrod: 3095792639,
	darkgray: 2846468607,
	darkgreen: 6553855,
	darkgrey: 2846468607,
	darkkhaki: 3182914559,
	darkmagenta: 2332068863,
	darkolivegreen: 1433087999,
	darkorange: 4287365375,
	darkorchid: 2570243327,
	darkred: 2332033279,
	darksalmon: 3918953215,
	darkseagreen: 2411499519,
	darkslateblue: 1211993087,
	darkslategray: 793726975,
	darkslategrey: 793726975,
	darkturquoise: 13554175,
	darkviolet: 2483082239,
	deeppink: 4279538687,
	deepskyblue: 12582911,
	dimgray: 1768516095,
	dimgrey: 1768516095,
	dodgerblue: 512819199,
	firebrick: 2988581631,
	floralwhite: 4294635775,
	forestgreen: 579543807,
	fuchsia: 4278255615,
	gainsboro: 3705462015,
	ghostwhite: 4177068031,
	gold: 4292280575,
	goldenrod: 3668254975,
	gray: 2155905279,
	green: 8388863,
	greenyellow: 2919182335,
	grey: 2155905279,
	honeydew: 4043305215,
	hotpink: 4285117695,
	indianred: 3445382399,
	indigo: 1258324735,
	ivory: 4294963455,
	khaki: 4041641215,
	lavender: 3873897215,
	lavenderblush: 4293981695,
	lawngreen: 2096890111,
	lemonchiffon: 4294626815,
	lightblue: 2916673279,
	lightcoral: 4034953471,
	lightcyan: 3774873599,
	lightgoldenrodyellow: 4210742015,
	lightgray: 3553874943,
	lightgreen: 2431553791,
	lightgrey: 3553874943,
	lightpink: 4290167295,
	lightsalmon: 4288707327,
	lightseagreen: 548580095,
	lightskyblue: 2278488831,
	lightslategray: 2005441023,
	lightslategrey: 2005441023,
	lightsteelblue: 2965692159,
	lightyellow: 4294959359,
	lime: 16711935,
	limegreen: 852308735,
	linen: 4210091775,
	magenta: 4278255615,
	maroon: 2147483903,
	mediumaquamarine: 1724754687,
	mediumblue: 52735,
	mediumorchid: 3126187007,
	mediumpurple: 2473647103,
	mediumseagreen: 1018393087,
	mediumslateblue: 2070474495,
	mediumspringgreen: 16423679,
	mediumturquoise: 1221709055,
	mediumvioletred: 3340076543,
	midnightblue: 421097727,
	mintcream: 4127193855,
	mistyrose: 4293190143,
	moccasin: 4293178879,
	navajowhite: 4292783615,
	navy: 33023,
	oldlace: 4260751103,
	olive: 2155872511,
	olivedrab: 1804477439,
	orange: 4289003775,
	orangered: 4282712319,
	orchid: 3664828159,
	palegoldenrod: 4008225535,
	palegreen: 2566625535,
	paleturquoise: 2951671551,
	palevioletred: 3681588223,
	papayawhip: 4293907967,
	peachpuff: 4292524543,
	peru: 3448061951,
	pink: 4290825215,
	plum: 3718307327,
	powderblue: 2967529215,
	purple: 2147516671,
	rebeccapurple: 1714657791,
	red: 4278190335,
	rosybrown: 3163525119,
	royalblue: 1097458175,
	saddlebrown: 2336560127,
	salmon: 4202722047,
	sandybrown: 4104413439,
	seagreen: 780883967,
	seashell: 4294307583,
	sienna: 2689740287,
	silver: 3233857791,
	skyblue: 2278484991,
	slateblue: 1784335871,
	slategray: 1887473919,
	slategrey: 1887473919,
	snow: 4294638335,
	springgreen: 16744447,
	steelblue: 1182971135,
	tan: 3535047935,
	teal: 8421631,
	thistle: 3636451583,
	tomato: 4284696575,
	turquoise: 1088475391,
	violet: 4001558271,
	wheat: 4125012991,
	white: 4294967295,
	whitesmoke: 4126537215,
	yellow: 4294902015,
	yellowgreen: 2597139199
};
function normalizeColor$1(color) {
	const matchers = getMatchers$1();
	let match;
	if (matchers.hex6) {
		if (match = matchers.hex6.exec(color)) return Number.parseInt(match[1] + "ff", 16) >>> 0;
	}
	if (colorNames$1[color] !== void 0) return colorNames$1[color];
	if (matchers.rgb) {
		if (match = matchers.rgb.exec(color)) return (parse255$1(match[1]) << 24 | parse255$1(match[2]) << 16 | parse255$1(match[3]) << 8 | 255) >>> 0;
	}
	if (matchers.rgba) {
		if (match = matchers.rgba.exec(color)) return (parse255$1(match[1]) << 24 | parse255$1(match[2]) << 16 | parse255$1(match[3]) << 8 | parse1$1(match[4])) >>> 0;
	}
	if (matchers.hex3) {
		if (match = matchers.hex3.exec(color)) return Number.parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + "ff", 16) >>> 0;
	}
	if (matchers.hex8) {
		if (match = matchers.hex8.exec(color)) return Number.parseInt(match[1], 16) >>> 0;
	}
	if (matchers.hex4) {
		if (match = matchers.hex4.exec(color)) return Number.parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + match[4] + match[4], 16) >>> 0;
	}
	if (matchers.hsl) {
		if (match = matchers.hsl.exec(color)) return (hslToRgb$1(parse360$1(match[1]), parsePercentage$1(match[2]), parsePercentage$1(match[3])) | 255) >>> 0;
	}
	if (matchers.hsla) {
		if (match = matchers.hsla.exec(color)) return (hslToRgb$1(parse360$1(match[1]), parsePercentage$1(match[2]), parsePercentage$1(match[3])) | parse1$1(match[4])) >>> 0;
	}
	if (matchers.oklch) {
		if (match = matchers.oklch.exec(color)) {
			const L = parseModernComponent$1(match[1], 1);
			const C = parseModernComponent$1(match[2], .4);
			const H = parseHueAngle$1(match[3]);
			const alpha = parseModernAlpha$1(match[4]);
			const hRad = H * Math.PI / 180;
			const [r, g, b2] = oklabToSrgb$1(L, C * Math.cos(hRad), C * Math.sin(hRad));
			return rgbFloatToInt$1(r, g, b2, alpha);
		}
	}
	if (matchers.oklab) {
		if (match = matchers.oklab.exec(color)) {
			const L = parseModernComponent$1(match[1], 1);
			const a2 = parseModernComponent$1(match[2], .4);
			const b2 = parseModernComponent$1(match[3], .4);
			const alpha = parseModernAlpha$1(match[4]);
			const [r, g, bl] = oklabToSrgb$1(L, a2, b2);
			return rgbFloatToInt$1(r, g, bl, alpha);
		}
	}
	if (matchers.lab) {
		if (match = matchers.lab.exec(color)) {
			const L = parseModernComponent$1(match[1], 100);
			const a2 = parseModernComponent$1(match[2], 125);
			const b2 = parseModernComponent$1(match[3], 125);
			const alpha = parseModernAlpha$1(match[4]);
			const [r, g, bl] = labToSrgb$1(L, a2, b2);
			return rgbFloatToInt$1(r, g, bl, alpha);
		}
	}
	if (matchers.lch) {
		if (match = matchers.lch.exec(color)) {
			const L = parseModernComponent$1(match[1], 100);
			const C = parseModernComponent$1(match[2], 150);
			const H = parseHueAngle$1(match[3]);
			const alpha = parseModernAlpha$1(match[4]);
			const hRad = H * Math.PI / 180;
			const [r, g, bl] = labToSrgb$1(L, C * Math.cos(hRad), C * Math.sin(hRad));
			return rgbFloatToInt$1(r, g, bl, alpha);
		}
	}
	if (matchers.hwb) {
		if (match = matchers.hwb.exec(color)) {
			const H = parseHueAngle$1(match[1]);
			const W = parseModernComponent$1(match[2], 1);
			const B = parseModernComponent$1(match[3], 1);
			const alpha = parseModernAlpha$1(match[4]);
			const [r, g, bl] = hwbToSrgb$1(H / 360, W, B);
			return rgbFloatToInt$1(r, g, bl, alpha);
		}
	}
	throw new Error(`invalid color string ${color} provided`);
}
var opacity = (c2) => {
	return (c2 >> 24 & 255) / 255;
};
var red = (c2) => {
	return c2 >> 16 & 255;
};
var green = (c2) => {
	return c2 >> 8 & 255;
};
var blue = (c2) => {
	return c2 & 255;
};
var rgbaColor = (r, g, b2, alpha) => {
	return `rgba(${r}, ${g}, ${b2}, ${alpha})`;
};
function processColor$1(color) {
	const normalizedColor = normalizeColor$1(color);
	return (normalizedColor << 24 | normalizedColor >>> 8) >>> 0;
}
var interpolateColorsRGB = (value, inputRange, colors, options) => {
	const [r, g, b2, a2] = [
		red,
		green,
		blue,
		opacity
	].map((f) => {
		const unrounded = interpolate$1(value, inputRange, colors.map((c2) => f(c2)), {
			easing: options?.easing,
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			posterize: options?.posterize
		});
		if (f === opacity) return Number(unrounded.toFixed(3));
		return Math.round(unrounded);
	});
	return rgbaColor(r, g, b2, a2);
};
var interpolateColors = (input, inputRange, outputRange, options) => {
	if (typeof input === "undefined") throw new TypeError("input can not be undefined");
	if (typeof inputRange === "undefined") throw new TypeError("inputRange can not be undefined");
	if (typeof outputRange === "undefined") throw new TypeError("outputRange can not be undefined");
	if (inputRange.length !== outputRange.length) throw new TypeError("inputRange (" + inputRange.length + " values provided) and outputRange (" + outputRange.length + " values provided) must have the same length");
	return interpolateColorsRGB(input, inputRange, outputRange.map((c2) => processColor$1(c2)), options);
};
var easingToFn = ({ easing, forceSpringAllowTail }) => {
	switch (easing.type) {
		case "linear": return Easing.linear;
		case "spring": return Easing.spring({
			allowTail: forceSpringAllowTail ?? easing.allowTail ?? void 0,
			damping: easing.damping,
			durationRestThreshold: easing.durationRestThreshold ?? void 0,
			mass: easing.mass,
			overshootClamping: easing.overshootClamping,
			stiffness: easing.stiffness
		});
		case "bezier": return bezier(easing.x1, easing.y1, easing.x2, easing.y2);
		default: throw new TypeError(`Unsupported easing: ${JSON.stringify(easing)}`);
	}
};
var interpolateKeyframedStatus = ({ frame, forceSpringAllowTail, status }) => {
	const { keyframes, easing, clamping, interpolationFunction } = status;
	if (keyframes.length === 0) return null;
	const sortedKeyframes = [...keyframes].sort((a2, b2) => a2.frame - b2.frame);
	const inputRange = sortedKeyframes.map((k) => k.frame);
	const outputs = sortedKeyframes.map((k) => k.value);
	if (interpolationFunction === "interpolateColors") {
		if (!outputs.every((v) => typeof v === "string")) return null;
		if (keyframes.length === 1) return outputs[0];
		try {
			return interpolateColors(frame, inputRange, outputs, {
				easing: easing.map((e) => easingToFn({
					easing: e,
					forceSpringAllowTail
				})),
				posterize: status.posterize
			});
		} catch {
			return null;
		}
	}
	if (interpolationFunction !== "interpolate") return null;
	try {
		return interpolate$1(frame, inputRange, outputs, {
			easing: easing.map((e) => easingToFn({
				easing: e,
				forceSpringAllowTail
			})),
			extrapolateLeft: clamping.left,
			extrapolateRight: clamping.right,
			posterize: status.posterize
		});
	} catch {
		return null;
	}
};
var resolveDragOverrideValue = ({ dragOverrideValue, frame }) => {
	if (dragOverrideValue === void 0) return { type: "none" };
	if (dragOverrideValue.type === "static") return {
		type: "resolved",
		value: dragOverrideValue.value
	};
	if (frame === null) return { type: "none" };
	const interpolated = interpolateKeyframedStatus({
		forceSpringAllowTail: null,
		frame,
		status: dragOverrideValue.status
	});
	if (interpolated === null) return { type: "none" };
	return {
		type: "resolved",
		value: interpolated
	};
};
var getEffectiveVisualModeValue = ({ propStatus, dragOverrideValue, defaultValue, frame = null, shouldResortToDefaultValueIfUndefined = false }) => {
	const dragOverride = resolveDragOverrideValue({
		dragOverrideValue,
		frame
	});
	if (dragOverride.type === "resolved" && dragOverride.value !== void 0) return dragOverride.value;
	if (propStatus.status === "keyframed") {
		if (frame !== null) return interpolateKeyframedStatus({
			forceSpringAllowTail: null,
			frame,
			status: propStatus
		});
		return shouldResortToDefaultValueIfUndefined ? defaultValue : void 0;
	}
	if (propStatus.codeValue === void 0 && shouldResortToDefaultValueIfUndefined) return defaultValue;
	return propStatus.codeValue;
};
var OverrideIdsToNodePathsGettersContext = (0, import_react.createContext)({ overrideIdToNodePathMappings: {} });
var OverrideIdsToNodePathsSettersContext = (0, import_react.createContext)({ setOverrideIdToNodePath: () => {
	throw new Error("OverrideIdsToNodePathsSettersContext not initialized");
} });
var mergeOverrides = ({ descriptor, propStatusOverrides, dragOverrides, frame }) => {
	if (!propStatusOverrides && !dragOverrides) return {
		params: descriptor.params,
		effectKey: descriptor.effectKey
	};
	const merged = { ...descriptor.params };
	if (propStatusOverrides) {
		for (const [key, value] of Object.entries(propStatusOverrides)) if (value !== void 0) merged[key] = value;
	}
	if (dragOverrides) for (const [key, value] of Object.entries(dragOverrides)) {
		const resolved = resolveDragOverrideValue({
			dragOverrideValue: value,
			frame
		});
		if (resolved.type === "resolved") merged[key] = resolved.value;
	}
	return {
		params: merged,
		effectKey: descriptor.definition.calculateKey(merged)
	};
};
var resolvePropStatusOverrides = (propStatus, frame) => {
	if (!propStatus) return null;
	const out = {};
	let hasAny = false;
	for (const [key, status] of Object.entries(propStatus)) {
		if (status.status === "static") {
			out[key] = status.codeValue;
			hasAny = true;
			continue;
		}
		if (status.status === "keyframed") {
			const value = interpolateKeyframedStatus({
				forceSpringAllowTail: null,
				frame,
				status
			});
			if (value !== null) {
				out[key] = value;
				hasAny = true;
			}
		}
	}
	return hasAny ? out : null;
};
var useMemoizedEffectDefinitions = (effects) => {
	const previousRef = (0, import_react.useRef)(null);
	const definitions = effects.map((descriptor) => descriptor.definition);
	const previous = previousRef.current;
	if (previous !== null && previous.length === definitions.length && previous.every((def, i) => def === definitions[i])) return previous;
	previousRef.current = definitions;
	return definitions;
};
var getEffectPropStatusesCtx = ({ propStatuses, nodePath, effectIndex }) => {
	const status = propStatuses[makeSequencePropsSubscriptionKey(nodePath)];
	if (!status) return {
		type: "cannot-update-sequence",
		reason: "not-found"
	};
	if (!status.canUpdate) return {
		type: "cannot-update-sequence",
		reason: status.reason
	};
	const effect = status.effects.find((e) => e.effectIndex === effectIndex);
	if (!effect) return {
		type: "cannot-update-effect",
		reason: "not-found"
	};
	if (!effect.canUpdate) return {
		type: "cannot-update-effect",
		reason: effect.reason
	};
	return {
		type: "can-update-effect",
		props: effect.props
	};
};
var getPropStatusesCtx = (propStatuses, nodePath) => {
	const status = propStatuses[makeSequencePropsSubscriptionKey(nodePath)];
	if (!status) return;
	if (!status.canUpdate) return;
	return status.props;
};
var useMemoizedEffects = ({ effects, overrideId }) => {
	const previousRef = (0, import_react.useRef)(null);
	const { propStatuses } = (0, import_react.useContext)(VisualModePropStatusesContext);
	const { getEffectDragOverrides } = (0, import_react.useContext)(VisualModeDragOverridesContext);
	const frame = useCurrentFrame();
	const { overrideIdToNodePathMappings } = (0, import_react.useContext)(OverrideIdsToNodePathsGettersContext);
	const previous = previousRef.current;
	const nodePath = overrideId ? overrideIdToNodePathMappings[overrideId] ?? null : null;
	const resolved = effects.map((descriptor, index) => {
		if (nodePath === null) return {
			descriptor,
			params: descriptor.params,
			effectKey: descriptor.effectKey
		};
		const effectStatus = getEffectPropStatusesCtx({
			propStatuses,
			nodePath,
			effectIndex: index
		});
		const propStatusOverrides = effectStatus.type === "can-update-effect" ? resolvePropStatusOverrides(effectStatus.props, frame) : null;
		const dragOverridesMap = getEffectDragOverrides(nodePath, index);
		const { params, effectKey } = mergeOverrides({
			descriptor,
			propStatusOverrides,
			dragOverrides: Object.keys(dragOverridesMap).length === 0 ? null : dragOverridesMap,
			frame
		});
		return {
			descriptor,
			params,
			effectKey
		};
	});
	if (previous !== null && previous.length === resolved.length && previous.every((p, i) => p.definition === resolved[i].descriptor.definition && p.effectKey === resolved[i].effectKey)) return previous;
	const next = resolved.map(({ descriptor, params, effectKey }) => ({
		definition: descriptor.definition,
		effectKey,
		params,
		memoized: true
	}));
	previousRef.current = next;
	return next;
};
var flattenActiveSchema = (schema, resolve) => {
	const out = {};
	for (const key of Object.keys(schema)) {
		const field = schema[key];
		if (field.type === "hidden") continue;
		else if (field.type === "enum") {
			out[key] = field;
			const current = resolve(key) ?? field.default;
			const variant = field.variants[current];
			if (variant) Object.assign(out, flattenActiveSchema(variant, resolve));
		} else out[key] = field;
	}
	return out;
};
var getFlatSchemaWithAllKeys = (schema) => {
	const out = {};
	const addKey = (key, field) => {
		if (key in out) throw new Error(`Duplicate key "${key}" in schema: discriminated union variants must not share keys`);
		out[key] = field;
	};
	for (const key of Object.keys(schema)) {
		const field = schema[key];
		addKey(key, field);
		if (field.type === "enum") for (const variant of Object.values(field.variants)) {
			const flatVariant = getFlatSchemaWithAllKeys(variant);
			for (const variantKey of Object.keys(flatVariant)) addKey(variantKey, flatVariant[variantKey]);
		}
	}
	return out;
};
var findPropsToDelete$1 = ({ schema, key, value }) => {
	const fieldSchema = schema[key];
	if (!fieldSchema) throw new Error("Key " + JSON.stringify(key) + " not found in schema");
	if (typeof value !== "string") throw new Error("Value must be a string, but is " + JSON.stringify(value));
	if (fieldSchema.type !== "enum") throw new Error("Key " + JSON.stringify(key) + " is not an enum");
	if (!fieldSchema.variants[value]) throw new Error("Value for " + JSON.stringify(key) + " must be one of " + Object.keys(fieldSchema.variants).map((v) => JSON.stringify(v)).join(", ") + ", got " + JSON.stringify(value));
	const otherVariants = Object.keys(fieldSchema.variants).filter((v) => v !== value);
	const otherKeys = /* @__PURE__ */ new Set();
	for (const variant of otherVariants) {
		const otherVariant = fieldSchema.variants[variant];
		const keys = Object.keys(otherVariant);
		for (const k of keys) otherKeys.add(k);
	}
	return [...otherKeys];
};
var DEFAULT_LINEAR_EASING = { type: "linear" };
var getEasingIndexToDuplicate = ({ insertedKeyframeIndex, easingLength, keyframeCount }) => {
	if (!(insertedKeyframeIndex > 0 && insertedKeyframeIndex < keyframeCount - 1) || easingLength === 0) return null;
	return Math.min(insertedKeyframeIndex - 1, easingLength - 1);
};
var makeStaticDragOverride = (value) => {
	return {
		type: "static",
		value
	};
};
var makeKeyframedDragOverride = ({ status, frame, value }) => {
	const existingIndex = status.keyframes.findIndex((keyframe) => keyframe.frame === frame);
	const keyframes = existingIndex === -1 ? [...status.keyframes, {
		frame,
		value
	}].sort((first, second) => first.frame - second.frame) : status.keyframes.map((keyframe, index) => index === existingIndex ? {
		frame,
		value
	} : keyframe);
	const easing = [...status.easing];
	if (existingIndex === -1) {
		const insertedKeyframeIndex = keyframes.findIndex((keyframe) => keyframe.frame === frame);
		const easingIndexToDuplicate = getEasingIndexToDuplicate({
			insertedKeyframeIndex,
			easingLength: easing.length,
			keyframeCount: keyframes.length
		});
		const easingToDuplicate = easingIndexToDuplicate === null ? DEFAULT_LINEAR_EASING : easing[easingIndexToDuplicate];
		easing.splice(insertedKeyframeIndex, 0, easingToDuplicate);
	}
	while (easing.length < keyframes.length - 1) easing.push(DEFAULT_LINEAR_EASING);
	if (easing.length > keyframes.length - 1) easing.length = keyframes.length - 1;
	return {
		type: "keyframed",
		status: {
			...status,
			keyframes,
			easing
		}
	};
};
var getStaticDragOverrideValue = (dragOverrideValue) => {
	if (dragOverrideValue?.type !== "static") return;
	return dragOverrideValue.value;
};
var isKeyframedStatus = (status) => {
	return status !== null && status.status === "keyframed";
};
var findFieldInSchema = (schema, key) => {
	if (key in schema) return schema[key];
	for (const field of Object.values(schema)) {
		if (field.type !== "enum") continue;
		for (const variant of Object.values(field.variants)) {
			const found = findFieldInSchema(variant, key);
			if (found) return found;
		}
	}
};
var computeEffectiveSchemaValuesDotNotation = ({ schema, currentValue, overrideValues, propStatus, frame }) => {
	const merged = {};
	const propsToDelete = /* @__PURE__ */ new Set();
	for (const key of Object.keys(currentValue)) {
		const status = propStatus?.[key] ?? null;
		const field = findFieldInSchema(schema, key);
		if (field?.type === "hidden") continue;
		let value;
		if (status === null) value = currentValue[key];
		else if (isKeyframedStatus(status)) if (field?.type === "array" || field?.keyframable === false) value = currentValue[key];
		else {
			const dragOverride = resolveDragOverrideValue({
				dragOverrideValue: overrideValues[key],
				frame
			});
			if (dragOverride.type === "resolved") value = dragOverride.value;
			else if (frame !== null) value = interpolateKeyframedStatus({
				forceSpringAllowTail: null,
				frame,
				status
			}) ?? currentValue[key];
			else value = currentValue[key];
		}
		else if (status.status === "computed") value = currentValue[key];
		else value = getEffectiveVisualModeValue({
			propStatus: status,
			dragOverrideValue: overrideValues[key],
			defaultValue: field?.default,
			frame,
			shouldResortToDefaultValueIfUndefined: false
		});
		if (value === void 0) propsToDelete.add(key);
		merged[key] = value;
	}
	for (const key of Object.keys(overrideValues)) if (schema[key]?.type === "enum") {
		const propsToDeleteForKey = findPropsToDelete$1({
			schema,
			key,
			value: merged[key]
		});
		for (const propToDelete of propsToDeleteForKey) propsToDelete.add(propToDelete);
	}
	return {
		merged,
		propsToDelete
	};
};
var getNestedValue = (obj, key) => {
	const parts = key.split(".");
	let current = obj;
	for (const part of parts) {
		if (current === null || current === void 0 || typeof current !== "object") return;
		current = current[part];
	}
	return current;
};
var readValuesFromProps = (props, keys) => {
	const out = {};
	for (const key of keys) out[key] = getNestedValue(props, key);
	return out;
};
var selectActiveKeys = (schema, values) => {
	return Object.keys(flattenActiveSchema(schema, (key) => values[key]));
};
var mergeValues = ({ props, valuesDotNotation, schemaKeys, propsToDelete }) => {
	const merged = { ...props };
	for (const key of schemaKeys) {
		const value = valuesDotNotation[key];
		const parts = key.split(".");
		if (parts.length === 1) {
			merged[key] = value;
			continue;
		}
		let current = merged;
		for (let i = 0; i < parts.length - 1; i++) {
			const part = parts[i];
			if (typeof current[part] === "object" && current[part] !== null) current[part] = { ...current[part] };
			else current[part] = {};
			current = current[part];
		}
		current[parts[parts.length - 1]] = value;
	}
	deleteNestedKey(merged, propsToDelete);
	return merged;
};
var stackToOverrideMap = {};
var withInteractivitySchema = ({ Component, componentName, componentIdentity, schema, supportsEffects }) => {
	const schemaWithSequenceName = extendSchemaWithSequenceName(schema);
	const flatSchema = getFlatSchemaWithAllKeys(schemaWithSequenceName);
	const flatKeys = Object.keys(flatSchema);
	const Wrapped = (0, import_react.forwardRef)((props, ref) => {
		const env = useRemotionEnvironment();
		if (!env.isStudio || env.isReadOnlyStudio || env.isRendering) return import_react.createElement(Component, {
			...props,
			controls: null,
			ref
		});
		const { propStatuses } = (0, import_react.useContext)(VisualModePropStatusesContext);
		const { getDragOverrides } = (0, import_react.useContext)(VisualModeDragOverridesContext);
		const nodePathMapping = (0, import_react.useContext)(OverrideIdsToNodePathsGettersContext);
		const frame = useCurrentFrame();
		if (props.controls) return import_react.createElement(Component, {
			...props,
			ref
		});
		const [overrideId] = (0, import_react.useState)(() => {
			const { stack } = props;
			if (!stack) return String(Math.random());
			const existingOverrideId = stackToOverrideMap[stack];
			if (existingOverrideId) return existingOverrideId;
			const newOverrideId = String(Math.random());
			stackToOverrideMap[stack] = newOverrideId;
			return newOverrideId;
		});
		const nodePath = nodePathMapping.overrideIdToNodePathMappings[overrideId] ?? null;
		const currentRuntimeValueDotNotation = (0, import_react.useMemo)(() => readValuesFromProps(props, flatKeys), flatKeys.map((k) => getNestedValue(props, k)));
		const controls = (0, import_react.useMemo)(() => {
			return {
				schema: schemaWithSequenceName,
				currentRuntimeValueDotNotation,
				overrideId,
				supportsEffects,
				componentIdentity,
				componentName
			};
		}, [currentRuntimeValueDotNotation, overrideId]);
		const { merged: valuesDotNotation, propsToDelete } = (0, import_react.useMemo)(() => {
			return computeEffectiveSchemaValuesDotNotation({
				schema: schemaWithSequenceName,
				currentValue: currentRuntimeValueDotNotation,
				overrideValues: nodePath === null ? {} : getDragOverrides(nodePath),
				propStatus: nodePath === null ? void 0 : getPropStatusesCtx(propStatuses, nodePath),
				frame
			});
		}, [
			currentRuntimeValueDotNotation,
			getDragOverrides,
			nodePath,
			propStatuses,
			frame
		]);
		const mergedProps = mergeValues({
			props,
			valuesDotNotation,
			schemaKeys: selectActiveKeys(schemaWithSequenceName, valuesDotNotation),
			propsToDelete
		});
		return import_react.createElement(Component, {
			...mergedProps,
			controls,
			ref
		});
	});
	Wrapped.displayName = `withInteractivitySchema(${Component.displayName || Component.name || "Component"})`;
	return Wrapped;
};
var EMPTY_EFFECTS = [];
var RegularSequenceRefForwardingFunction = ({ from = 0, trimBefore = 0, freeze, durationInFrames = Infinity, children, name, height, width, showInTimeline = true, hidden = false, controls, _remotionInternalEffects, _remotionInternalLoopDisplay: loopDisplay, _remotionInternalStack: stack, _remotionInternalDocumentationLink: documentationLink, _remotionInternalPremountDisplay: premountDisplay, _remotionInternalPostmountDisplay: postmountDisplay, _remotionInternalIsMedia: isMedia, outlineRef: passedRefForOutline, ...other }, ref) => {
	const { layout = "absolute-fill" } = other;
	const [id] = (0, import_react.useState)(() => String(Math.random()));
	const parentSequence = (0, import_react.useContext)(SequenceContext);
	const { rootId } = useTimelineContext();
	const cumulatedFrom = parentSequence ? parentSequence.cumulatedFrom + parentSequence.relativeFrom : 0;
	const nonce = useNonce();
	if (layout !== "absolute-fill" && layout !== "none") throw new TypeError(`The layout prop of <Sequence /> expects either "absolute-fill" or "none", but you passed: ${layout}`);
	if (layout === "none" && typeof other.style !== "undefined") throw new TypeError("If layout=\"none\", you may not pass a style. Passed: " + JSON.stringify(other.style));
	if (typeof durationInFrames !== "number") throw new TypeError(`You passed to durationInFrames an argument of type ${typeof durationInFrames}, but it must be a number.`);
	if (durationInFrames <= 0) throw new TypeError(`durationInFrames must be positive, but got ${durationInFrames}`);
	if (typeof from !== "number") throw new TypeError(`You passed to the "from" props of your <Sequence> an argument of type ${typeof from}, but it must be a number.`);
	if (!Number.isFinite(from)) throw new TypeError(`The "from" prop of a sequence must be finite, but got ${from}.`);
	if (typeof trimBefore !== "number") throw new TypeError(`You passed to the "trimBefore" prop of your <Sequence> an argument of type ${typeof trimBefore}, but it must be a number.`);
	if (trimBefore < 0) throw new TypeError(`The "trimBefore" prop of <Sequence /> must be greater than or equal to 0, but got ${trimBefore}.`);
	if (Number.isNaN(trimBefore)) throw new TypeError("The \"trimBefore\" prop of <Sequence /> must be a real number, but it is NaN.");
	if (!Number.isFinite(trimBefore)) throw new TypeError(`The "trimBefore" prop of <Sequence /> must be finite, but it is ${trimBefore}.`);
	if (typeof freeze !== "undefined" && freeze !== null) {
		if (typeof freeze !== "number") throw new TypeError(`The "freeze" prop of <Sequence /> must be a number, but is of type ${typeof freeze}.`);
		if (Number.isNaN(freeze)) throw new TypeError(`The "freeze" prop of <Sequence /> must be a real number, but it is NaN.`);
		if (!Number.isFinite(freeze)) throw new TypeError(`The "freeze" prop of <Sequence /> must be finite, but it is ${freeze}.`);
	}
	const absoluteFrame = useTimelinePosition();
	const videoConfig = useVideoConfig();
	const effectiveRelativeFrom = from - trimBefore;
	const absoluteFrom = (parentSequence?.absoluteFrom ?? 0) + effectiveRelativeFrom;
	const parentSequenceDuration = parentSequence ? Math.min(parentSequence.durationInFrames - effectiveRelativeFrom, durationInFrames) : durationInFrames;
	const actualDurationInFrames = Math.max(0, Math.min(videoConfig.durationInFrames - from, parentSequenceDuration));
	const { registerSequence, unregisterSequence } = (0, import_react.useContext)(SequenceManager);
	const wrapperRefForOutline = (0, import_react.useRef)(null);
	const refForOutline = other.layout === "none" ? passedRefForOutline ?? null : passedRefForOutline ?? wrapperRefForOutline;
	const premounting = (0, import_react.useMemo)(() => {
		return parentSequence?.premounting || Boolean(other._remotionInternalIsPremounting);
	}, [other._remotionInternalIsPremounting, parentSequence?.premounting]);
	const postmounting = (0, import_react.useMemo)(() => {
		return parentSequence?.postmounting || Boolean(other._remotionInternalIsPostmounting);
	}, [other._remotionInternalIsPostmounting, parentSequence?.postmounting]);
	const currentSequenceStart = cumulatedFrom + effectiveRelativeFrom;
	const parentSequenceStart = parentSequence ? parentSequence.cumulatedFrom + parentSequence.relativeFrom : 0;
	const parentFirstFrame = parentSequence ? parentSequenceStart - parentSequence.cumulatedNegativeFrom : 0;
	const cumulatedNegativeFrom = currentSequenceStart - Math.max(0, parentFirstFrame, currentSequenceStart);
	const contextValue = (0, import_react.useMemo)(() => {
		return {
			absoluteFrom,
			cumulatedFrom,
			relativeFrom: effectiveRelativeFrom,
			cumulatedNegativeFrom,
			durationInFrames: actualDurationInFrames,
			parentFrom: parentSequence?.relativeFrom ?? 0,
			id,
			height: height ?? parentSequence?.height ?? null,
			width: width ?? parentSequence?.width ?? null,
			premounting,
			postmounting,
			premountDisplay: premountDisplay ?? null,
			postmountDisplay: postmountDisplay ?? null
		};
	}, [
		cumulatedFrom,
		absoluteFrom,
		effectiveRelativeFrom,
		actualDurationInFrames,
		parentSequence,
		id,
		height,
		width,
		premounting,
		postmounting,
		premountDisplay,
		postmountDisplay,
		cumulatedNegativeFrom
	]);
	const timelineClipName = (0, import_react.useMemo)(() => {
		return name ?? "";
	}, [name]);
	const resolvedDocumentationLink = documentationLink ?? "https://www.remotion.dev/docs/sequence";
	const env = useRemotionEnvironment();
	const isInsideSeries = (0, import_react.useContext)(IsInsideSeriesContext);
	const inheritedStack = other?.stack ?? null;
	const stackRef = (0, import_react.useRef)(null);
	stackRef.current = stack ?? inheritedStack;
	const registeredFrozenFrame = typeof freeze === "number" ? freeze : null;
	const registeredTrimBefore = trimBefore === 0 ? null : trimBefore;
	const parentCumulatedNegativeFrom = parentSequence?.cumulatedNegativeFrom ?? 0;
	const startMediaFrom = isMedia && isMedia.type !== "image" ? isMedia.data.startMediaFrom + parentCumulatedNegativeFrom - cumulatedNegativeFrom : null;
	const mediaFrameAtSequenceZero = isMedia && isMedia.type !== "image" ? isMedia.data.startMediaFrom + parentCumulatedNegativeFrom : null;
	const frozenMediaFrame = isMedia && isMedia.type !== "image" && mediaFrameAtSequenceZero !== null ? registeredFrozenFrame === null ? null : mediaFrameAtSequenceZero + (loopDisplay ? registeredFrozenFrame % loopDisplay.durationInFrames : registeredFrozenFrame) * isMedia.data.playbackRate : null;
	(0, import_react.useEffect)(() => {
		if (!env.isStudio) return;
		if (isMedia) {
			if (isMedia.type === "image") registerSequence({
				type: "image",
				controls: controls ?? null,
				effects: _remotionInternalEffects ?? EMPTY_EFFECTS,
				displayName: timelineClipName,
				documentationLink: resolvedDocumentationLink,
				duration: actualDurationInFrames,
				from,
				trimBefore: registeredTrimBefore,
				id,
				loopDisplay,
				nonce: nonce.get(),
				parent: parentSequence?.id ?? null,
				postmountDisplay: postmountDisplay ?? null,
				premountDisplay: premountDisplay ?? null,
				rootId,
				showInTimeline,
				src: isMedia.src,
				getStack: () => stackRef.current,
				refForOutline: refForOutline ?? null,
				isInsideSeries,
				frozenFrame: registeredFrozenFrame
			});
			else registerSequence({
				type: isMedia.type,
				controls: controls ?? null,
				effects: _remotionInternalEffects ?? EMPTY_EFFECTS,
				displayName: timelineClipName,
				documentationLink: resolvedDocumentationLink,
				doesVolumeChange: isMedia.data.doesVolumeChange,
				duration: actualDurationInFrames,
				from,
				trimBefore: registeredTrimBefore,
				id,
				loopDisplay,
				nonce: nonce.get(),
				parent: parentSequence?.id ?? null,
				playbackRate: isMedia.data.playbackRate,
				postmountDisplay: postmountDisplay ?? null,
				premountDisplay: premountDisplay ?? null,
				rootId,
				showInTimeline,
				src: isMedia.data.src,
				getStack: () => stackRef.current,
				startMediaFrom: startMediaFrom ?? isMedia.data.startMediaFrom,
				volume: isMedia.data.volumes,
				refForOutline: refForOutline ?? null,
				isInsideSeries,
				frozenFrame: registeredFrozenFrame,
				frozenMediaFrame
			});
			return () => {
				unregisterSequence(id);
			};
		}
		registerSequence({
			from,
			trimBefore: registeredTrimBefore,
			duration: actualDurationInFrames,
			id,
			displayName: timelineClipName,
			documentationLink: resolvedDocumentationLink,
			parent: parentSequence?.id ?? null,
			type: "sequence",
			rootId,
			showInTimeline,
			nonce: nonce.get(),
			loopDisplay,
			getStack: () => stackRef.current,
			premountDisplay: premountDisplay ?? null,
			postmountDisplay: postmountDisplay ?? null,
			controls: controls ?? null,
			effects: _remotionInternalEffects ?? EMPTY_EFFECTS,
			refForOutline: refForOutline ?? null,
			isInsideSeries,
			frozenFrame: registeredFrozenFrame
		});
		return () => {
			unregisterSequence(id);
		};
	}, [
		durationInFrames,
		id,
		name,
		registerSequence,
		timelineClipName,
		unregisterSequence,
		parentSequence?.id,
		actualDurationInFrames,
		rootId,
		from,
		trimBefore,
		registeredTrimBefore,
		showInTimeline,
		nonce,
		loopDisplay,
		premountDisplay,
		postmountDisplay,
		env.isStudio,
		controls,
		_remotionInternalEffects,
		isMedia,
		resolvedDocumentationLink,
		refForOutline,
		isInsideSeries,
		registeredFrozenFrame,
		startMediaFrom,
		frozenMediaFrame
	]);
	const endThreshold = Math.ceil(cumulatedFrom + from + durationInFrames - 1);
	const content = absoluteFrame < cumulatedFrom + from ? null : absoluteFrame > endThreshold ? null : children;
	const frozenContent = content === null || typeof freeze === "undefined" || freeze === null ? content : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Freeze, {
		frame: freeze,
		children: content
	});
	const styleIfThere = other.layout === "none" ? void 0 : other.style;
	const sequenceRef = (0, import_react.useCallback)((node) => {
		wrapperRefForOutline.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	}, [ref]);
	const defaultStyle = (0, import_react.useMemo)(() => {
		return {
			flexDirection: void 0,
			...width ? { width } : {},
			...height ? { height } : {},
			...styleIfThere ?? {}
		};
	}, [
		height,
		styleIfThere,
		width
	]);
	if (ref !== null && layout === "none") throw new TypeError("It is not supported to pass both a `ref` and `layout=\"none\"` to <Sequence />.");
	if (hidden) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SequenceContext.Provider, {
		value: contextValue,
		children: frozenContent === null ? null : other.layout === "none" ? frozenContent : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AbsoluteFill, {
			ref: sequenceRef,
			style: defaultStyle,
			className: other.className,
			children: frozenContent
		})
	});
};
var RegularSequence = (0, import_react.forwardRef)(RegularSequenceRefForwardingFunction);
var PremountedPostmountedSequenceRefForwardingFunction = (props, ref) => {
	const parentPremountContext = (0, import_react.useContext)(PremountContext);
	const frame = useCurrentFrame() - parentPremountContext.premountFramesRemaining;
	if (props.layout === "none") throw new Error("`<Sequence>` with `premountFor` and `postmountFor` props does not support layout=\"none\"");
	const { style: passedStyle, from = 0, durationInFrames = Infinity, premountFor = 0, postmountFor = 0, styleWhilePremounted, styleWhilePostmounted, ...otherProps } = props;
	const endThreshold = Math.ceil(from + durationInFrames - 1);
	const premountingActive = frame < from && frame >= from - premountFor;
	const postmountingActive = frame > endThreshold && frame <= endThreshold + postmountFor;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Freeze, {
		frame: premountingActive ? from : postmountingActive ? from + durationInFrames - 1 : 0,
		active: premountingActive || postmountingActive,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SequenceInner, {
			ref,
			from,
			durationInFrames,
			style: (0, import_react.useMemo)(() => {
				return {
					...passedStyle,
					opacity: premountingActive || postmountingActive ? 0 : 1,
					pointerEvents: premountingActive || postmountingActive ? "none" : passedStyle?.pointerEvents ?? void 0,
					...premountingActive ? styleWhilePremounted : {},
					...postmountingActive ? styleWhilePostmounted : {}
				};
			}, [
				passedStyle,
				premountingActive,
				postmountingActive,
				styleWhilePremounted,
				styleWhilePostmounted
			]),
			_remotionInternalPremountDisplay: premountFor,
			_remotionInternalPostmountDisplay: postmountFor,
			_remotionInternalIsPremounting: premountingActive,
			_remotionInternalIsPostmounting: postmountingActive,
			...otherProps
		})
	});
};
var PremountedPostmountedSequence = (0, import_react.forwardRef)(PremountedPostmountedSequenceRefForwardingFunction);
var SequenceRefForwardingFunction = (props, ref) => {
	const env = useRemotionEnvironment();
	const { fps } = useVideoConfig();
	if (props.layout !== "none" && !env.isRendering) {
		const effectivePremountFor = ENABLE_V5_BREAKING_CHANGES$1 ? props.premountFor ?? fps : props.premountFor;
		if (effectivePremountFor || props.postmountFor) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremountedPostmountedSequence, {
			ref,
			...props,
			premountFor: effectivePremountFor
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegularSequence, {
		...props,
		ref
	});
};
var SequenceInner = (0, import_react.forwardRef)(SequenceRefForwardingFunction);
var SequenceWithoutSchema = SequenceInner;
var Sequence = withInteractivitySchema({
	Component: SequenceInner,
	componentName: "<Sequence>",
	componentIdentity: "dev.remotion.remotion.Sequence",
	schema: sequenceSchema$1,
	supportsEffects: false
});
withInteractivitySchema({
	Component: SequenceInner,
	componentName: "<Sequence>",
	componentIdentity: null,
	schema: sequenceSchemaWithoutFrom,
	supportsEffects: false
});
var calculateImageFit = (fit, imageSize, canvasSize) => {
	switch (fit) {
		case "fill": return [
			0,
			0,
			imageSize.width,
			imageSize.height,
			0,
			0,
			canvasSize.width,
			canvasSize.height
		];
		case "contain": {
			const ratio = Math.min(canvasSize.width / imageSize.width, canvasSize.height / imageSize.height);
			const centerX = (canvasSize.width - imageSize.width * ratio) / 2;
			const centerY = (canvasSize.height - imageSize.height * ratio) / 2;
			return [
				0,
				0,
				imageSize.width,
				imageSize.height,
				centerX,
				centerY,
				imageSize.width * ratio,
				imageSize.height * ratio
			];
		}
		case "cover": {
			const ratio = Math.max(canvasSize.width / imageSize.width, canvasSize.height / imageSize.height);
			const centerX = (canvasSize.width - imageSize.width * ratio) / 2;
			const centerY = (canvasSize.height - imageSize.height * ratio) / 2;
			return [
				0,
				0,
				imageSize.width,
				imageSize.height,
				centerX,
				centerY,
				imageSize.width * ratio,
				imageSize.height * ratio
			];
		}
		default: throw new Error("Unknown fit: " + fit);
	}
};
var WEBGL_CONTEXT_DOCS_URL = "https://remotion.dev/docs/troubleshooting/webgl2-context";
var webGlContextErrorMessage = (versionLabel, effectName) => `Failed to acquire ${versionLabel} context for ${effectName}. Pass --gl=angle when using the CLI, set chromiumOptions: { gl: "angle" } when using SSR APIs, or set "OpenGL render backend" to "angle" in the Advanced section when rendering in the Studio. See ${WEBGL_CONTEXT_DOCS_URL}`;
var createWebGLContextError = (effectName) => new Error(webGlContextErrorMessage("WebGL", effectName));
var createWebGL2ContextError = (effectName) => new Error(webGlContextErrorMessage("WebGL2", effectName));
var CanvasPool = class {
	width;
	height;
	pairs = /* @__PURE__ */ new Map();
	lostContexts = /* @__PURE__ */ new Set();
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}
	getPair(backend) {
		const existing = this.pairs.get(backend);
		if (existing) return existing;
		const pair = [this.allocateCanvas(backend), this.allocateCanvas(backend)];
		this.pairs.set(backend, pair);
		return pair;
	}
	assertContextNotLost(canvas) {
		if (this.lostContexts.has(canvas)) throw new Error("WebGL context was lost during canvas effect rendering. This typically happens in headless or memory-constrained environments (e.g. Remotion Lambda). Try reducing concurrency or increasing the Lambda function memory.");
	}
	allocateCanvas(backend) {
		const canvas = document.createElement("canvas");
		canvas.width = this.width;
		canvas.height = this.height;
		switch (backend) {
			case "2d":
				if (!canvas.getContext("2d", { colorSpace: "srgb" })) throw new Error("Failed to acquire 2D context for canvas effect");
				return canvas;
			case "webgl2": {
				const ctx = canvas.getContext("webgl2", {
					premultipliedAlpha: true,
					alpha: true,
					preserveDrawingBuffer: true
				});
				if (!ctx) throw createWebGL2ContextError("canvas effect");
				canvas.addEventListener("webglcontextlost", (e) => {
					e.preventDefault();
					this.lostContexts.add(canvas);
				});
				canvas.addEventListener("webglcontextrestored", () => {
					this.lostContexts.delete(canvas);
				});
				ctx.pixelStorei(ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
				return canvas;
			}
			case "webgpu":
				if (typeof navigator === "undefined" || !("gpu" in navigator)) throw new Error("WebGPU is not available in this environment for canvas effect");
				return canvas;
			default: throw new Error(`Unknown effect backend: ${backend}`);
		}
	}
};
var groupByBackend = (effects) => {
	const runs = [];
	let current = [];
	let currentBackend = null;
	for (const eff of effects) {
		const { backend } = eff.definition;
		if (currentBackend === null || backend === currentBackend) {
			current.push(eff);
			currentBackend = backend;
		} else {
			runs.push({
				backend: currentBackend,
				effects: current
			});
			current = [eff];
			currentBackend = backend;
		}
	}
	if (currentBackend !== null && current.length > 0) runs.push({
		backend: currentBackend,
		effects: current
	});
	return runs;
};
var devicePromise = null;
var getGpuDevice = () => {
	if (devicePromise) return devicePromise;
	devicePromise = (async () => {
		if (typeof navigator === "undefined" || !("gpu" in navigator)) throw new Error("WebGPU is not available in this environment");
		const { gpu } = navigator;
		const adapter = await gpu.requestAdapter();
		if (!adapter) throw new Error("No WebGPU adapter available");
		return adapter.requestDevice();
	})();
	return devicePromise;
};
var createEffectChainState = (width, height) => ({
	pool: new CanvasPool(width, height),
	setupCache: /* @__PURE__ */ new WeakMap(),
	cleanupRegistry: [],
	currentRunId: 0
});
var cleanupEffectChainState = (state) => {
	state.currentRunId++;
	for (const entry of state.cleanupRegistry) entry.definition.cleanup(entry.state);
};
var ensureSetup = (state, def, target) => {
	const widened = def;
	let cacheForDefinition = state.setupCache.get(widened);
	if (!cacheForDefinition) {
		cacheForDefinition = /* @__PURE__ */ new WeakMap();
		state.setupCache.set(widened, cacheForDefinition);
	}
	if (cacheForDefinition.has(target)) return cacheForDefinition.get(target);
	const setupState = def.setup(target);
	cacheForDefinition.set(target, setupState);
	state.cleanupRegistry.push({
		definition: widened,
		state: setupState
	});
	return setupState;
};
var runEffectChain = async ({ state, source, effects, output, width, height }) => {
	const runId = ++state.currentRunId;
	const isCancelled = () => state.currentRunId !== runId;
	const runs = groupByBackend(effects.filter((e) => !e.params.disabled));
	let currentImage = source;
	let lastTarget = null;
	if (runs.length === 0) {
		if (source === output) return true;
		const ctx = output.getContext("2d");
		if (!ctx) throw new Error("Failed to acquire 2D context for output canvas");
		ctx.clearRect(0, 0, width, height);
		ctx.drawImage(currentImage, 0, 0, width, height);
		return true;
	}
	let needsGpuDevice = false;
	for (const run of runs) if (run.backend === "webgpu") {
		needsGpuDevice = true;
		break;
	}
	const gpuDevice = needsGpuDevice ? await getGpuDevice() : null;
	if (isCancelled()) return false;
	let flipWebGLSourceY = true;
	for (let runIndex = 0; runIndex < runs.length; runIndex++) {
		const run = runs[runIndex];
		const [a2, b2] = state.pool.getPair(run.backend);
		let dst = a2;
		for (const eff of run.effects) {
			const def = eff.definition;
			const setupState = ensureSetup(state, def, dst);
			def.apply({
				source: currentImage,
				target: dst,
				state: setupState,
				params: eff.params,
				width,
				height,
				gpuDevice,
				flipSourceY: run.backend === "webgl2" ? flipWebGLSourceY : false
			});
			if (run.backend === "webgl2") {
				flipWebGLSourceY = true;
				state.pool.assertContextNotLost(dst);
			}
			currentImage = dst;
			dst = dst === a2 ? b2 : a2;
		}
		lastTarget = currentImage ?? lastTarget;
		const nextRun = runs[runIndex + 1];
		if (nextRun && nextRun.backend !== run.backend && lastTarget) if (run.backend === "2d" && nextRun.backend === "webgl2") {
			currentImage = lastTarget;
			flipWebGLSourceY = true;
		} else {
			const bitmap = await createImageBitmap(lastTarget);
			if (isCancelled()) {
				bitmap.close();
				return false;
			}
			currentImage = bitmap;
			if (nextRun.backend === "webgl2") flipWebGLSourceY = false;
		}
	}
	if (!lastTarget) return true;
	const outCtx = output.getContext("2d");
	if (!outCtx) throw new Error("Failed to acquire 2D context for output canvas");
	outCtx.clearRect(0, 0, width, height);
	outCtx.drawImage(lastTarget, 0, 0, width, height);
	return true;
};
var useEffectChainState = () => {
	const chainStateRef = (0, import_react.useRef)(null);
	const sizeRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		return () => {
			if (chainStateRef.current) cleanupEffectChainState(chainStateRef.current);
		};
	}, []);
	return (0, import_react.useMemo)(() => ({ get: (width, height) => {
		if (!sizeRef.current || sizeRef.current.width !== width || sizeRef.current.height !== height) {
			if (chainStateRef.current) cleanupEffectChainState(chainStateRef.current);
			chainStateRef.current = createEffectChainState(width, height);
			sizeRef.current = {
				width,
				height
			};
		}
		return chainStateRef.current;
	} }), []);
};
var CanvasRefForwardingFunction = ({ width, height, fit, className, style, effects }, ref) => {
	const canvasRef = (0, import_react.useRef)(null);
	const chainState = useEffectChainState();
	const sourceCanvas = (0, import_react.useMemo)(() => {
		if (typeof document === "undefined") return null;
		return document.createElement("canvas");
	}, []);
	const draw = (0, import_react.useCallback)((imageData) => {
		const canvas = canvasRef.current;
		const canvasWidth = width ?? imageData.displayWidth;
		const canvasHeight = height ?? imageData.displayHeight;
		if (!canvas) throw new Error("Canvas ref is not set");
		if (!sourceCanvas) throw new Error("Source canvas is not available");
		sourceCanvas.width = canvasWidth;
		sourceCanvas.height = canvasHeight;
		const sourceCtx = sourceCanvas.getContext("2d");
		if (!sourceCtx) throw new Error("Could not get 2d context for source canvas");
		sourceCtx.drawImage(imageData, ...calculateImageFit(fit, {
			height: imageData.displayHeight,
			width: imageData.displayWidth
		}, {
			width: canvasWidth,
			height: canvasHeight
		}));
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		return runEffectChain({
			state: chainState.get(canvasWidth, canvasHeight),
			source: sourceCanvas,
			effects,
			output: canvas,
			width: canvasWidth,
			height: canvasHeight
		});
	}, [
		chainState,
		effects,
		fit,
		height,
		sourceCanvas,
		width
	]);
	(0, import_react.useImperativeHandle)(ref, () => {
		return {
			draw,
			getCanvas: () => {
				if (!canvasRef.current) throw new Error("Canvas ref is not set");
				return canvasRef.current;
			},
			clear: () => {
				const ctx = canvasRef.current?.getContext("2d");
				if (!ctx) throw new Error("Could not get 2d context");
				ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
			}
		};
	}, [draw]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className,
		style
	});
};
var Canvas = import_react.forwardRef(CanvasRefForwardingFunction);
var CACHE_SIZE = 5;
var getActualTime = ({ loopBehavior, durationFound, timeInSec }) => {
	return loopBehavior === "loop" ? durationFound ? timeInSec % durationFound : timeInSec : Math.min(timeInSec, durationFound || Infinity);
};
var decodeImage = async ({ resolvedSrc, signal, requestInit, currentTime, initialLoopBehavior }) => {
	if (typeof ImageDecoder === "undefined") throw new Error("Your browser does not support the WebCodecs ImageDecoder API.");
	const res = await fetch(resolvedSrc, {
		...requestInit,
		signal
	});
	const { body } = res;
	if (!body) throw new Error("Got no body");
	const decoder = new ImageDecoder({
		data: body,
		type: res.headers.get("Content-Type") || "image/gif"
	});
	await decoder.completed;
	const { selectedTrack } = decoder.tracks;
	if (!selectedTrack) throw new Error("No selected track");
	const cache2 = [];
	let durationFound = null;
	const getFrameByIndex = async (frameIndex) => {
		const foundInCache = cache2.find((c2) => c2.frameIndex === frameIndex);
		if (foundInCache && foundInCache.frame) return foundInCache;
		const frame = await decoder.decode({
			frameIndex,
			completeFramesOnly: true
		});
		if (foundInCache) foundInCache.frame = frame.image;
		else cache2.push({
			frame: frame.image,
			frameIndex,
			timeInSeconds: frame.image.timestamp / 1e6
		});
		return {
			frame: frame.image,
			frameIndex,
			timeInSeconds: frame.image.timestamp / 1e6
		};
	};
	const clearCache = (closeToTimeInSec) => {
		const sortByClosestToCurrentTime = cache2.filter((c2) => c2.frame).sort((a2, b2) => {
			return Math.abs(a2.timeInSeconds - closeToTimeInSec) - Math.abs(b2.timeInSeconds - closeToTimeInSec);
		});
		for (let i = 0; i < sortByClosestToCurrentTime.length; i++) {
			if (i < CACHE_SIZE) continue;
			const item = sortByClosestToCurrentTime[i];
			item.frame = null;
		}
	};
	const ensureFrameBeforeAndAfter = async ({ timeInSec, loopBehavior }) => {
		const actualTimeInSec = getActualTime({
			durationFound,
			loopBehavior,
			timeInSec
		});
		const biggestIndex = cache2.filter((c2) => c2.timeInSeconds <= actualTimeInSec).map((c2) => c2.frameIndex).reduce((a2, b2) => Math.max(a2, b2), 0);
		let i = biggestIndex;
		while (true) {
			const f = await getFrameByIndex(i);
			i++;
			if (!f.frame) throw new Error("No frame found");
			if (!f.frame.duration) break;
			if (i === selectedTrack.frameCount && durationFound === null) durationFound = (f.frame.timestamp + f.frame.duration) / 1e6;
			if (f.timeInSeconds > actualTimeInSec || i === selectedTrack.frameCount) break;
		}
		if (selectedTrack.frameCount - biggestIndex < 3 && loopBehavior === "loop") await getFrameByIndex(0);
		clearCache(actualTimeInSec);
	};
	await ensureFrameBeforeAndAfter({
		timeInSec: currentTime,
		loopBehavior: initialLoopBehavior
	});
	await ensureFrameBeforeAndAfter({
		timeInSec: currentTime,
		loopBehavior: initialLoopBehavior
	});
	const getFrame = async (timeInSec, loopBehavior) => {
		if (durationFound !== null && timeInSec > durationFound && loopBehavior === "clear-after-finish") return null;
		const actualTimeInSec = getActualTime({
			loopBehavior,
			durationFound,
			timeInSec
		});
		await ensureFrameBeforeAndAfter({
			timeInSec: actualTimeInSec,
			loopBehavior
		});
		const closest = cache2.filter((c2) => c2.frame).reduce((a2, b2) => {
			return Math.abs(a2.timeInSeconds - actualTimeInSec) < Math.abs(b2.timeInSeconds - actualTimeInSec) ? a2 : b2;
		});
		if (!closest.frame) throw new Error("No frame found");
		return closest;
	};
	return {
		getFrame,
		frameCount: selectedTrack.frameCount
	};
};
var serializeRequestInit = (requestInit) => {
	if (!requestInit) return null;
	const requestInitWithoutSignal = { ...requestInit };
	delete requestInitWithoutSignal.signal;
	const { headers, ...rest } = requestInitWithoutSignal;
	return JSON.stringify({
		...rest,
		headers: headers ? Array.from(new Headers(headers).entries()) : null
	});
};
var resolveAnimatedImageSource = (src) => {
	if (typeof window === "undefined") return src;
	return new URL(src, window.origin).href;
};
var animatedImageSchema = {
	...baseSchema,
	playbackRate: {
		type: "number",
		min: 0,
		max: 10,
		step: .1,
		default: 1,
		description: "Playback rate",
		hiddenFromList: false,
		keyframable: false
	},
	...transformSchema$1
};
var AnimatedImageContent = (0, import_react.forwardRef)(({ src, width, height, onError, loopBehavior = "loop", playbackRate = 1, fit = "fill", requestInit, effects, controls, ...props }, canvasRef) => {
	const resolvedSrc = resolveAnimatedImageSource(src);
	const [imageDecoder, setImageDecoder] = (0, import_react.useState)(null);
	const { delayRender: delayRender2, continueRender: continueRender2 } = useDelayRender();
	const [decodeHandle] = (0, import_react.useState)(() => delayRender2(`Rendering <AnimatedImage/> with src="${resolvedSrc}"`));
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const currentTime = frame / playbackRate / fps;
	const currentTimeRef = (0, import_react.useRef)(currentTime);
	currentTimeRef.current = currentTime;
	const requestInitKey = serializeRequestInit(requestInit);
	const requestInitRef = (0, import_react.useRef)(requestInit);
	requestInitRef.current = requestInit;
	const ref = (0, import_react.useRef)(null);
	const memoizedEffects = useMemoizedEffects({
		effects,
		overrideId: controls?.overrideId ?? null
	});
	(0, import_react.useImperativeHandle)(canvasRef, () => {
		const c2 = ref.current?.getCanvas();
		if (!c2) throw new Error("Canvas ref is not set");
		return c2;
	}, []);
	const [initialLoopBehavior] = (0, import_react.useState)(() => loopBehavior);
	(0, import_react.useEffect)(() => {
		const controller = new AbortController();
		decodeImage({
			resolvedSrc,
			signal: controller.signal,
			requestInit: requestInitRef.current,
			currentTime: currentTimeRef.current,
			initialLoopBehavior
		}).then((d) => {
			setImageDecoder(d);
			continueRender2(decodeHandle);
		}).catch((err) => {
			if (err.name === "AbortError") {
				continueRender2(decodeHandle);
				return;
			}
			if (onError) {
				onError?.(err);
				continueRender2(decodeHandle);
			} else cancelRender(err);
		});
		return () => {
			controller.abort();
		};
	}, [
		resolvedSrc,
		decodeHandle,
		onError,
		requestInitKey,
		initialLoopBehavior,
		continueRender2
	]);
	(0, import_react.useLayoutEffect)(() => {
		if (!imageDecoder) return;
		const delay = delayRender2(`Rendering frame at ${currentTime} of <AnimatedImage src="${src}"/>`);
		let cancelled = false;
		imageDecoder.getFrame(currentTime, loopBehavior).then(async (videoFrame) => {
			if (cancelled) return;
			if (videoFrame === null) {
				ref.current?.clear();
				continueRender2(delay);
				return;
			}
			if (await ref.current?.draw(videoFrame.frame) && !cancelled) continueRender2(delay);
		}).catch((err) => {
			if (cancelled) return;
			if (onError) {
				onError(err);
				continueRender2(delay);
			} else cancelRender(err);
		});
		return () => {
			cancelled = true;
			continueRender2(delay);
		};
	}, [
		currentTime,
		imageDecoder,
		loopBehavior,
		onError,
		src,
		continueRender2,
		delayRender2,
		memoizedEffects,
		fit,
		width,
		height
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
		ref,
		width,
		height,
		fit,
		effects: memoizedEffects,
		...props
	});
});
AnimatedImageContent.displayName = "AnimatedImageContent";
var AnimatedImageInner = ({ src, width, height, onError, fit, playbackRate, loopBehavior, id, className, style, durationInFrames, requestInit, effects = [], controls, ref, ...sequenceProps }) => {
	const { durationInFrames: videoDuration } = useVideoConfig();
	const resolvedDuration = durationInFrames ?? videoDuration;
	const actualRef = (0, import_react.useRef)(null);
	const memoizedEffectDefinitions = useMemoizedEffectDefinitions(effects);
	(0, import_react.useImperativeHandle)(ref, () => {
		return actualRef.current;
	}, []);
	const animatedImageProps = {
		src,
		width,
		height,
		onError,
		fit,
		playbackRate,
		loopBehavior,
		id,
		className,
		style,
		requestInit
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sequence, {
		layout: "none",
		durationInFrames: resolvedDuration,
		name: "<AnimatedImage>",
		_remotionInternalDocumentationLink: "https://www.remotion.dev/docs/animatedimage",
		controls,
		_remotionInternalEffects: memoizedEffectDefinitions,
		...sequenceProps,
		outlineRef: actualRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedImageContent, {
			...animatedImageProps,
			ref: actualRef,
			effects,
			controls
		})
	});
};
var AnimatedImage = withInteractivitySchema({
	Component: AnimatedImageInner,
	componentName: "<AnimatedImage>",
	componentIdentity: "dev.remotion.remotion.AnimatedImage",
	schema: animatedImageSchema,
	supportsEffects: true
});
AnimatedImage.displayName = "AnimatedImage";
addSequenceStackTraces(AnimatedImage);
var disabledEffectField = {
	type: "boolean",
	default: false,
	description: "Disabled"
};
var createEffect = (definition) => {
	const { calculateKey: userCalculateKey, validateParams } = definition;
	const widened = {
		...definition,
		documentationLink: definition.documentationLink ?? null,
		calculateKey: (params) => {
			const disabled = params.disabled ?? false;
			return `${userCalculateKey(params)}-disabled-${disabled}`;
		},
		schema: {
			disabled: disabledEffectField,
			...definition.schema
		}
	};
	const factory = (params = {}) => {
		validateParams(params);
		return {
			definition: widened,
			params,
			effectKey: widened.calculateKey(params),
			memoized: false
		};
	};
	return factory;
};
var validateArtifactFilename = (filename) => {
	if (typeof filename !== "string") throw new TypeError(`The "filename" must be a string, but you passed a value of type ${typeof filename}`);
	if (filename.trim() === "") throw new Error("The `filename` must not be empty");
	if (!filename.match(/^([0-9a-zA-Z-!_.*'()/:&$@=;+,?]+)/g)) throw new Error("The `filename` must match \"/^([0-9a-zA-Z-!_.*'()/:&$@=;+,?]+)/g\". Use forward slashes only, even on Windows.");
};
var validateContent = (content) => {
	if (typeof content !== "string" && !(content instanceof Uint8Array)) throw new TypeError(`The "content" must be a string or Uint8Array, but you passed a value of type ${typeof content}`);
	if (typeof content === "string" && content.trim() === "") throw new Error("The `content` must not be empty");
};
var validateRenderAsset = (artifact) => {
	if (artifact.type !== "artifact") return;
	validateArtifactFilename(artifact.filename);
	if (artifact.contentType === "thumbnail") return;
	validateContent(artifact.content);
};
var RenderAssetManager = (0, import_react.createContext)({
	registerRenderAsset: () => {},
	unregisterRenderAsset: () => {},
	renderAssets: []
});
var RenderAssetManagerProvider = ({ children, collectAssets }) => {
	const [renderAssets, setRenderAssets] = (0, import_react.useState)([]);
	const renderAssetsRef = (0, import_react.useRef)([]);
	const registerRenderAsset = (0, import_react.useCallback)((renderAsset) => {
		validateRenderAsset(renderAsset);
		renderAssetsRef.current = [...renderAssetsRef.current, renderAsset];
		setRenderAssets(renderAssetsRef.current);
	}, []);
	if (collectAssets) (0, import_react.useImperativeHandle)(collectAssets, () => {
		return { collectAssets: () => {
			const assets = renderAssetsRef.current;
			renderAssetsRef.current = [];
			setRenderAssets([]);
			return assets;
		} };
	}, []);
	const unregisterRenderAsset = (0, import_react.useCallback)((id) => {
		renderAssetsRef.current = renderAssetsRef.current.filter((a2) => a2.id !== id);
		setRenderAssets(renderAssetsRef.current);
	}, []);
	(0, import_react.useLayoutEffect)(() => {
		if (typeof window !== "undefined") window.remotion_collectAssets = () => {
			const assets = renderAssetsRef.current;
			renderAssetsRef.current = [];
			setRenderAssets([]);
			return assets;
		};
	}, []);
	const contextValue = (0, import_react.useMemo)(() => {
		return {
			registerRenderAsset,
			unregisterRenderAsset,
			renderAssets
		};
	}, [
		renderAssets,
		registerRenderAsset,
		unregisterRenderAsset
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderAssetManager.Provider, {
		value: contextValue,
		children
	});
};
var ArtifactThumbnail = Symbol("Thumbnail");
var Artifact = ({ filename, content, downloadBehavior }) => {
	const { registerRenderAsset, unregisterRenderAsset } = (0, import_react.useContext)(RenderAssetManager);
	const env = useRemotionEnvironment();
	const frame = useCurrentFrame();
	const [id] = (0, import_react.useState)(() => {
		return String(Math.random());
	});
	(0, import_react.useLayoutEffect)(() => {
		if (!env.isRendering) return;
		if (content instanceof Uint8Array) registerRenderAsset({
			type: "artifact",
			id,
			content: btoa(new TextDecoder("utf8").decode(content)),
			filename,
			frame,
			contentType: "binary",
			downloadBehavior: downloadBehavior ?? null
		});
		else if (content === ArtifactThumbnail) registerRenderAsset({
			type: "artifact",
			id,
			filename,
			frame,
			contentType: "thumbnail",
			downloadBehavior: downloadBehavior ?? null
		});
		else registerRenderAsset({
			type: "artifact",
			id,
			content,
			filename,
			frame,
			contentType: "text",
			downloadBehavior: downloadBehavior ?? null
		});
		return () => {
			return unregisterRenderAsset(id);
		};
	}, [
		content,
		env.isRendering,
		filename,
		frame,
		id,
		registerRenderAsset,
		unregisterRenderAsset,
		downloadBehavior
	]);
	return null;
};
Artifact.Thumbnail = ArtifactThumbnail;
var getAbsoluteSrc$1 = (relativeSrc) => {
	if (typeof window === "undefined") return relativeSrc;
	if (relativeSrc.startsWith("http://") || relativeSrc.startsWith("https://") || relativeSrc.startsWith("file://") || relativeSrc.startsWith("blob:") || relativeSrc.startsWith("data:")) return relativeSrc;
	return new URL(relativeSrc, window.origin).href;
};
var calculateMediaDuration = ({ trimAfter, mediaDurationInFrames, playbackRate, trimBefore }) => {
	let duration = mediaDurationInFrames;
	if (typeof trimAfter !== "undefined") duration = trimAfter;
	if (typeof trimBefore !== "undefined") duration -= trimBefore;
	const actualDuration = duration / playbackRate;
	return Number(actualDuration.toFixed(10));
};
var LoopContext = (0, import_react.createContext)(null);
var useLoop = () => {
	return import_react.useContext(LoopContext);
};
var Loop = ({ durationInFrames, times = Infinity, children, name, showInTimeline, ...props }) => {
	const currentFrame = useCurrentFrame();
	const { durationInFrames: compDuration } = useVideoConfig();
	validateDurationInFrames$2(durationInFrames, {
		component: "of the <Loop /> component",
		allowFloats: true
	});
	if (typeof times !== "number") throw new TypeError(`You passed to "times" an argument of type ${typeof times}, but it must be a number.`);
	if (times !== Infinity && times % 1 !== 0) throw new TypeError(`The "times" prop of a loop must be an integer, but got ${times}.`);
	if (times < 0) throw new TypeError(`The "times" prop of a loop must be at least 0, but got ${times}`);
	const maxTimes = Math.ceil(compDuration / durationInFrames);
	const actualTimes = Math.min(maxTimes, times);
	const style = props.layout === "none" ? void 0 : props.style;
	const maxFrame = durationInFrames * (actualTimes - 1);
	const start = Math.floor(currentFrame / durationInFrames) * durationInFrames;
	const from = Math.min(start, maxFrame);
	const loopDisplay = (0, import_react.useMemo)(() => {
		return {
			numberOfTimes: Math.min(compDuration / durationInFrames, times),
			startOffset: -from,
			durationInFrames
		};
	}, [
		compDuration,
		durationInFrames,
		from,
		times
	]);
	const loopContext = (0, import_react.useMemo)(() => {
		return {
			iteration: Math.floor(currentFrame / durationInFrames),
			durationInFrames
		};
	}, [currentFrame, durationInFrames]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoopContext.Provider, {
		value: loopContext,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sequence, {
			durationInFrames,
			from,
			name: name ?? "<Loop>",
			_remotionInternalDocumentationLink: "https://www.remotion.dev/docs/loop",
			_remotionInternalLoopDisplay: loopDisplay,
			layout: props.layout,
			style,
			showInTimeline,
			children
		})
	});
};
Loop.useLoop = useLoop;
var playbackLogging = ({ logLevel, tag, message, mountTime }) => {
	const tags = [mountTime ? Date.now() - mountTime + "ms " : null, tag].filter(Boolean).join(" ");
	Log.trace({
		logLevel,
		tag: null
	}, `[${tags}]`, message);
};
var PreloadContext = (0, import_react.createContext)({});
var preloads = {};
var updaters = [];
var PrefetchProvider = ({ children }) => {
	const [_preloads, _setPreloads] = (0, import_react.useState)(() => preloads);
	(0, import_react.useEffect)(() => {
		const updaterFunction = () => {
			_setPreloads(preloads);
		};
		updaters.push(updaterFunction);
		return () => {
			updaters = updaters.filter((u) => u !== updaterFunction);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreloadContext.Provider, {
		value: _preloads,
		children
	});
};
var removeAndGetHashFragment = (src) => {
	const hashIndex = src.indexOf("#");
	if (hashIndex === -1) return null;
	return hashIndex;
};
var getSrcWithoutHash = (src) => {
	const hashIndex = removeAndGetHashFragment(src);
	if (hashIndex === null) return src;
	return src.slice(0, hashIndex);
};
var usePreload = (src) => {
	const preloads2 = (0, import_react.useContext)(PreloadContext);
	const hashFragmentIndex = removeAndGetHashFragment(src);
	const withoutHashFragment = getSrcWithoutHash(src);
	if (!preloads2[withoutHashFragment]) return src;
	if (hashFragmentIndex !== null) return preloads2[withoutHashFragment] + src.slice(hashFragmentIndex);
	return preloads2[withoutHashFragment];
};
var validateMediaProps = (props, component) => {
	if (typeof props.volume !== "number" && typeof props.volume !== "function" && typeof props.volume !== "undefined") throw new TypeError(`You have passed a volume of type ${typeof props.volume} to your <${component} /> component. Volume must be a number or a function with the signature '(frame: number) => number' undefined.`);
	if (typeof props.volume === "number" && props.volume < 0) throw new TypeError(`You have passed a volume below 0 to your <${component} /> component. Volume must be between 0 and 1`);
	if (typeof props.playbackRate !== "number" && typeof props.playbackRate !== "undefined") throw new TypeError(`You have passed a playbackRate of type ${typeof props.playbackRate} to your <${component} /> component. Playback rate must a real number or undefined.`);
	if (typeof props.playbackRate === "number" && (isNaN(props.playbackRate) || !Number.isFinite(props.playbackRate) || props.playbackRate <= 0)) throw new TypeError(`You have passed a playbackRate of ${props.playbackRate} to your <${component} /> component. Playback rate must be a real number above 0.`);
	if (typeof props.preservePitch !== "boolean" && typeof props.preservePitch !== "undefined") throw new TypeError(`'preservePitch' must be a boolean or undefined but got '${typeof props.preservePitch}' instead`);
};
var validateStartFromProps = (startFrom, endAt) => {
	if (typeof startFrom !== "undefined") {
		if (typeof startFrom !== "number") throw new TypeError(`type of startFrom prop must be a number, instead got type ${typeof startFrom}.`);
		if (isNaN(startFrom) || startFrom === Infinity) throw new TypeError("startFrom prop can not be NaN or Infinity.");
		if (startFrom < 0) throw new TypeError(`startFrom must be greater than equal to 0 instead got ${startFrom}.`);
	}
	if (typeof endAt !== "undefined") {
		if (typeof endAt !== "number") throw new TypeError(`type of endAt prop must be a number, instead got type ${typeof endAt}.`);
		if (isNaN(endAt)) throw new TypeError("endAt prop can not be NaN.");
		if (endAt <= 0) throw new TypeError(`endAt must be a positive number, instead got ${endAt}.`);
	}
	if (endAt < startFrom) throw new TypeError("endAt prop must be greater than startFrom prop.");
};
var validateTrimProps = (trimBefore, trimAfter) => {
	if (typeof trimBefore !== "undefined") {
		if (typeof trimBefore !== "number") throw new TypeError(`type of trimBefore prop must be a number, instead got type ${typeof trimBefore}.`);
		if (isNaN(trimBefore) || trimBefore === Infinity) throw new TypeError("trimBefore prop can not be NaN or Infinity.");
		if (trimBefore < 0) throw new TypeError(`trimBefore must be greater than equal to 0 instead got ${trimBefore}.`);
	}
	if (typeof trimAfter !== "undefined") {
		if (typeof trimAfter !== "number") throw new TypeError(`type of trimAfter prop must be a number, instead got type ${typeof trimAfter}.`);
		if (isNaN(trimAfter)) throw new TypeError("trimAfter prop can not be NaN.");
		if (trimAfter <= 0) throw new TypeError(`trimAfter must be a positive number, instead got ${trimAfter}.`);
	}
	if (trimAfter <= trimBefore) throw new TypeError("trimAfter prop must be greater than trimBefore prop.");
};
var validateMediaTrimProps = ({ startFrom, endAt, trimBefore, trimAfter }) => {
	if (typeof startFrom !== "undefined" && typeof trimBefore !== "undefined") throw new TypeError("Cannot use both startFrom and trimBefore props. Use trimBefore instead as startFrom is deprecated.");
	if (typeof endAt !== "undefined" && typeof trimAfter !== "undefined") throw new TypeError("Cannot use both endAt and trimAfter props. Use trimAfter instead as endAt is deprecated.");
	const hasNewProps = typeof trimBefore !== "undefined" || typeof trimAfter !== "undefined";
	const hasOldProps = typeof startFrom !== "undefined" || typeof endAt !== "undefined";
	if (hasNewProps) validateTrimProps(trimBefore, trimAfter);
	else if (hasOldProps) validateStartFromProps(startFrom, endAt);
};
var resolveTrimProps = ({ startFrom, endAt, trimBefore, trimAfter }) => {
	return {
		trimBeforeValue: trimBefore ?? startFrom ?? void 0,
		trimAfterValue: trimAfter ?? endAt ?? void 0
	};
};
var durationReducer = (state, action) => {
	switch (action.type) {
		case "got-duration": {
			const absoluteSrc = getAbsoluteSrc$1(action.src);
			if (state[absoluteSrc] === action.durationInSeconds) return state;
			return {
				...state,
				[absoluteSrc]: action.durationInSeconds
			};
		}
		default: return state;
	}
};
var DurationsContext = (0, import_react.createContext)({
	durations: {},
	setDurations: () => {
		throw new Error("context missing");
	}
});
var DurationsContextProvider = ({ children }) => {
	const [durations, setDurations] = (0, import_react.useReducer)(durationReducer, {});
	const value = (0, import_react.useMemo)(() => {
		return {
			durations,
			setDurations
		};
	}, [durations]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DurationsContext.Provider, {
		value,
		children
	});
};
var getCrossOriginValue = ({ crossOrigin, requestsVideoFrame, isClientSideRendering }) => {
	if (crossOrigin !== void 0 && crossOrigin !== null) return crossOrigin;
	if (isClientSideRendering) return "anonymous";
	if (requestsVideoFrame) return "anonymous";
};
var playAndHandleNotAllowedError = ({ mediaRef, mediaType, onAutoPlayError, logLevel, mountTime, reason, isPlayer }) => {
	const { current } = mediaRef;
	if (!current) return;
	playbackLogging({
		logLevel,
		tag: "play",
		message: `Attempting to play ${current.src}. Reason: ${reason}`,
		mountTime
	});
	const prom = current.play();
	if (!prom.catch) return;
	prom.catch((err) => {
		if (!current) return;
		if (err.message.includes("request was interrupted by a call to pause")) return;
		if (err.message.includes("The operation was aborted.")) return;
		if (err.message.includes("The fetching process for the media resource was aborted by the user agent")) return;
		if (err.message.includes("request was interrupted by a new load request")) return;
		if (err.message.includes("because the media was removed from the document")) return;
		if (err.message.includes("user didn't interact with the document") && current.muted) return;
		console.log(`Could not play ${mediaType} due to following error: `, err);
		if (!current.muted) {
			if (onAutoPlayError) {
				onAutoPlayError();
				return;
			}
			if (mediaType === "video" && isPlayer) {
				Log.info({
					logLevel,
					tag: "<" + mediaType + ">"
				}, `The video will be muted and we'll retry playing it.`);
				Log.info({
					logLevel,
					tag: "<" + mediaType + ">"
				}, "Use onAutoPlayError() to handle this error yourself.");
				current.muted = true;
				current.play();
			}
		}
	});
};
var makeSharedElementSourceNode = ({ audioContext, ref }) => {
	let connected = null;
	let disposed = false;
	return {
		attemptToConnect: () => {
			if (disposed) throw new Error("SharedElementSourceNode has been disposed");
			if (!connected && ref.current) connected = audioContext.createMediaElementSource(ref.current);
		},
		get: () => {
			if (!connected) throw new Error("Audio element not connected");
			return connected;
		},
		cleanup: () => {
			if (connected) {
				connected.disconnect();
				connected = null;
			}
			disposed = true;
		}
	};
};
var warned = false;
var warnOnce = (logLevel) => {
	if (warned) return;
	warned = true;
	if (typeof window !== "undefined") Log.warn({
		logLevel,
		tag: null
	}, "AudioContext is not supported in this browser");
};
var useSingletonAudioContext = ({ logLevel, latencyHint, audioEnabled, sampleRate }) => {
	const env = useRemotionEnvironment();
	const initialSampleRate = (0, import_react.useRef)(sampleRate);
	if (sampleRate !== initialSampleRate.current) throw new Error(`Changing the AudioContext sample rate dynamically is not supported. The sample rate was initialized with ${initialSampleRate.current} Hz, but ${sampleRate} Hz was passed later.`);
	return (0, import_react.useMemo)(() => {
		if (env.isRendering) return null;
		if (!audioEnabled) return null;
		if (typeof AudioContext === "undefined") {
			warnOnce(logLevel);
			return null;
		}
		const audioContext = new AudioContext({
			latencyHint,
			sampleRate
		});
		const gainNode = audioContext.createGain();
		gainNode.connect(audioContext.destination);
		Log.trace({
			logLevel,
			tag: "audio"
		}, "Creating new audio context");
		audioContext.suspend();
		let transitionTarget = null;
		const getState = () => {
			const nativeState = audioContext.state;
			if (transitionTarget === "running" && nativeState !== "running") return "suspended-to-running";
			if (transitionTarget === "suspended" && nativeState !== "suspended") return "running-to-suspended";
			return nativeState;
		};
		const resume = () => {
			transitionTarget = "running";
			const promise = audioContext.resume();
			promise.finally(() => {
				if (transitionTarget === "running") transitionTarget = null;
			});
			return promise;
		};
		const suspend = () => {
			transitionTarget = "suspended";
			const promise = audioContext.suspend();
			promise.finally(() => {
				if (transitionTarget === "suspended") transitionTarget = null;
			});
			return promise;
		};
		return {
			audioContext,
			gainNode,
			getState,
			resume,
			suspend
		};
	}, [
		logLevel,
		latencyHint,
		env.isRendering,
		audioEnabled,
		sampleRate
	]);
};
var waitUntilActuallyResumed = (audioContext, logLevel) => {
	return new Promise((resolve) => {
		const startCurrentTime = audioContext.currentTime;
		const startOutputPerformanceTime = audioContext.getOutputTimestamp().performanceTime;
		const startWallClock = performance.now();
		const check = () => {
			const { currentTime } = audioContext;
			const outputTimestamp = audioContext.getOutputTimestamp();
			const elapsedWallClock = performance.now() - startWallClock;
			if (startOutputPerformanceTime !== void 0 && outputTimestamp.performanceTime !== void 0 && outputTimestamp.performanceTime > startOutputPerformanceTime && outputTimestamp.contextTime !== void 0 && outputTimestamp.contextTime > startCurrentTime) {
				Log.verbose({
					logLevel,
					tag: "audio"
				}, `waitUntilActuallyResumed: getOutputTimestamp.performanceTime advanced from ${startOutputPerformanceTime.toFixed(6)} to ${outputTimestamp.performanceTime.toFixed(6)} after ${elapsedWallClock.toFixed(1)}ms. currentTime=${currentTime.toFixed(6)} (advanced by ${(currentTime - startCurrentTime).toFixed(6)}), getOutputTimestamp.performanceTime=${outputTimestamp.performanceTime?.toFixed(1) ?? "undefined"}`);
				resolve();
				return;
			}
			requestAnimationFrame(check);
		};
		requestAnimationFrame(check);
	});
};
var EMPTY_AUDIO = "data:audio/mp3;base64,/+MYxAAJcAV8AAgAABn//////+/gQ5BAMA+D4Pg+BAQBAEAwD4Pg+D4EBAEAQDAPg++hYBH///hUFQVBUFREDQNHmf///////+MYxBUGkAGIMAAAAP/29Xt6lUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxDUAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
var compareProps = (obj1, obj2) => {
	const keysA = Object.keys(obj1).sort();
	const keysB = Object.keys(obj2).sort();
	if (keysA.length !== keysB.length) return false;
	for (let i = 0; i < keysA.length; i++) {
		if (keysA[i] !== keysB[i]) return false;
		if (obj1[keysA[i]] !== obj2[keysB[i]]) return false;
	}
	return true;
};
var didPropChange = (key, newProp, prevProp) => {
	if (key === "src" && !prevProp.startsWith("data:") && !newProp.startsWith("data:")) return new URL(prevProp, window.origin).toString() !== new URL(newProp, window.origin).toString();
	if (prevProp === newProp) return false;
	return true;
};
var SharedAudioContext = (0, import_react.createContext)(null);
var SharedAudioTagsContext = (0, import_react.createContext)(null);
var shouldSaveForLater = (state) => {
	if (state === "suspended" || state === "running-to-suspended" || state === "interrupted") return true;
	if (state === "running" || state === "suspended-to-running") return false;
	throw new Error(`Unexpected audio context state: ${state}`);
};
var SharedAudioContextProvider = ({ children, audioLatencyHint, audioEnabled, previewSampleRate }) => {
	const logLevel = useLogLevel();
	const sampleRate = previewSampleRate ?? 48e3;
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		window.remotion_sampleRate = sampleRate;
	}, [sampleRate]);
	const ctxAndGain = useSingletonAudioContext({
		logLevel,
		latencyHint: audioLatencyHint,
		audioEnabled,
		sampleRate
	});
	const audioContextIsPlayingEventually = (0, import_react.useRef)(false);
	const isResuming = (0, import_react.useRef)(null);
	const audioSyncAnchor = (0, import_react.useMemo)(() => ({ value: 0 }), []);
	const audioSyncAnchorListeners = (0, import_react.useRef)([]);
	const audioSyncAnchorEmitter = (0, import_react.useMemo)(() => {
		return {
			dispatch: (event) => {
				audioSyncAnchorListeners.current.forEach((l) => l(event));
			},
			subscribe: (listener) => {
				audioSyncAnchorListeners.current.push(listener);
				return { remove: () => {
					audioSyncAnchorListeners.current = audioSyncAnchorListeners.current.filter((l) => l !== listener);
				} };
			}
		};
	}, []);
	const prevEndTimes = (0, import_react.useRef)({
		scheduledEndTime: null,
		mediaEndTime: null
	});
	const nodesToResume = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const unscheduleAudioNode = (0, import_react.useCallback)((node) => {
		nodesToResume.current.delete(node);
	}, []);
	const scheduleAudioNode = (0, import_react.useMemo)(() => {
		return ({ node, mediaTimestamp, scheduledTime, duration, offset, originalUnloopedMediaTimestamp }) => {
			if (!ctxAndGain) throw new Error("Audio context not found");
			const currentState = ctxAndGain.getState();
			if (currentState === "closed") return {
				type: "not-started",
				reason: "audio context is closed"
			};
			const saveForLater = shouldSaveForLater(currentState);
			if (duration > 0) if (saveForLater) nodesToResume.current.set(node, {
				scheduledTime,
				offset,
				duration
			});
			else node.start(scheduledTime, offset, duration);
			const scheduledEndTime = scheduledTime + duration / node.playbackRate.value;
			const mediaTime = mediaTimestamp + offset;
			const mediaEndTime = mediaTime + duration;
			const latency = ctxAndGain.audioContext.baseLatency + ctxAndGain.audioContext.outputLatency;
			const timeDiff = scheduledTime - ctxAndGain.audioContext.currentTime;
			const prev = prevEndTimes.current;
			const scheduledMismatch = prev.scheduledEndTime !== null && Math.abs(scheduledTime - prev.scheduledEndTime) > .001;
			const mediaMismatch = prev.mediaEndTime !== null && Math.abs(mediaTime - prev.mediaEndTime) > .001;
			Log.verbose({
				logLevel,
				tag: "audio-scheduling"
			}, "scheduled %c%s%c %s %c%s%c %s %c%s%c %s %s %s %s %s", scheduledMismatch ? "color: red; font-weight: bold" : "", scheduledTime.toFixed(4), "", scheduledEndTime.toFixed(4), mediaMismatch ? "color: red; font-weight: bold" : "", mediaTime.toFixed(4), "", mediaEndTime.toFixed(4), duration < 0 ? "color: red; font-weight: bold" : timeDiff < 0 ? "color: red; font-weight: bold" : "color: blue; font-weight: bold", duration < 0 ? "missed " + Math.abs(offset).toFixed(2) + "s" : Math.abs(timeDiff).toFixed(2) + (timeDiff < 0 ? " delay" : " ahead"), "", "current=" + ctxAndGain.audioContext.currentTime.toFixed(4), "offset=" + offset.toFixed(4), "latency=" + latency.toFixed(4), "state=" + ctxAndGain.audioContext.state, originalUnloopedMediaTimestamp !== mediaTime ? "original_ts=" + originalUnloopedMediaTimestamp.toFixed(4) : "", "action=" + (saveForLater ? "schedule" : "start"), "");
			prev.scheduledEndTime = scheduledEndTime;
			prev.mediaEndTime = mediaEndTime;
			return duration > 0 ? {
				type: "started",
				scheduledTime
			} : {
				type: "not-started",
				reason: "missed " + Math.abs(offset).toFixed(2) + "s"
			};
		};
	}, [ctxAndGain, logLevel]);
	const resume = (0, import_react.useCallback)(() => {
		if (!ctxAndGain) return Promise.resolve();
		if (audioContextIsPlayingEventually.current) return Promise.resolve();
		audioContextIsPlayingEventually.current = true;
		ctxAndGain.gainNode.gain.cancelScheduledValues(ctxAndGain.audioContext.currentTime);
		ctxAndGain.gainNode.gain.setValueAtTime(0, ctxAndGain.audioContext.currentTime);
		ctxAndGain.gainNode.gain.linearRampToValueAtTime(1, ctxAndGain.audioContext.currentTime + .03);
		nodesToResume.current.forEach((r, node) => {
			node.start(r.scheduledTime, r.offset, r.duration);
		});
		nodesToResume.current.clear();
		const resumePromise = ctxAndGain.resume();
		isResuming.current = new Promise((resolve) => {
			waitUntilActuallyResumed(ctxAndGain.audioContext, logLevel).then(resolve);
			resumePromise.catch((err) => {
				Log.warn({
					logLevel,
					tag: "audio"
				}, "AudioContext resume rejected, continuing without audio sync", err);
				resolve();
			});
		}).finally(() => {
			isResuming.current = null;
		});
		return resumePromise.catch(() => {});
	}, [ctxAndGain, logLevel]);
	const getIsResumingAudioContext = (0, import_react.useCallback)(() => {
		return isResuming.current;
	}, []);
	const suspend = (0, import_react.useCallback)(() => {
		if (!ctxAndGain) return Promise.resolve();
		if (!audioContextIsPlayingEventually.current) return Promise.resolve();
		audioContextIsPlayingEventually.current = false;
		return ctxAndGain.suspend();
	}, [ctxAndGain]);
	const audioContextValue = (0, import_react.useMemo)(() => {
		return {
			audioContext: ctxAndGain?.audioContext ?? null,
			getAudioContextState: () => ctxAndGain?.getState() ?? null,
			gainNode: ctxAndGain?.gainNode ?? null,
			audioSyncAnchor,
			audioSyncAnchorEmitter,
			scheduleAudioNode,
			resume,
			suspend,
			getIsResumingAudioContext,
			unscheduleAudioNode
		};
	}, [
		ctxAndGain,
		audioSyncAnchor,
		audioSyncAnchorEmitter,
		scheduleAudioNode,
		resume,
		suspend,
		getIsResumingAudioContext,
		unscheduleAudioNode
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SharedAudioContext.Provider, {
		value: audioContextValue,
		children
	});
};
var SharedAudioTagsContextProvider = ({ children, numberOfAudioTags }) => {
	const audios = (0, import_react.useRef)([]);
	const [initialNumberOfAudioTags] = (0, import_react.useState)(numberOfAudioTags);
	if (numberOfAudioTags !== initialNumberOfAudioTags) throw new Error("The number of shared audio tags has changed dynamically. Once you have set this property, you cannot change it afterwards.");
	const logLevel = useLogLevel();
	const mountTime = useMountTime();
	const env = useRemotionEnvironment();
	const audioCtx = (0, import_react.useContext)(SharedAudioContext);
	const audioContext = audioCtx?.audioContext ?? null;
	const resume = audioCtx?.resume;
	const refs = (0, import_react.useMemo)(() => {
		return new Array(numberOfAudioTags).fill(true).map(() => {
			const ref = (0, import_react.createRef)();
			return {
				id: Math.random(),
				ref,
				mediaElementSourceNode: audioContext ? makeSharedElementSourceNode({
					audioContext,
					ref
				}) : null
			};
		});
	}, [audioContext, numberOfAudioTags]);
	(import_react.useInsertionEffect ?? import_react.useLayoutEffect)(() => {
		return () => {
			requestAnimationFrame(() => {
				refs.forEach(({ mediaElementSourceNode }) => {
					mediaElementSourceNode?.cleanup();
				});
			});
		};
	}, [refs]);
	const takenAudios = (0, import_react.useRef)(new Array(numberOfAudioTags).fill(false));
	const rerenderAudios = (0, import_react.useCallback)(() => {
		refs.forEach(({ ref, id }) => {
			const data = audios.current?.find((a2) => a2.id === id);
			const { current } = ref;
			if (!current) return;
			if (data === void 0) {
				current.src = EMPTY_AUDIO;
				return;
			}
			if (!data) throw new TypeError("Expected audio data to be there");
			Object.keys(data.props).forEach((key) => {
				if (didPropChange(key, data.props[key], current[key])) current[key] = data.props[key];
			});
		});
	}, [refs]);
	const registerAudio = (0, import_react.useCallback)((options) => {
		const { aud, audioId, premounting, postmounting } = options;
		const found = audios.current?.find((a2) => a2.audioId === audioId);
		if (found) return found;
		const firstFreeAudio = takenAudios.current.findIndex((a2) => a2 === false);
		if (firstFreeAudio === -1) throw new Error(`Tried to simultaneously mount ${numberOfAudioTags + 1} <Html5Audio /> tags at the same time. With the current settings, the maximum amount of <Html5Audio /> tags is limited to ${numberOfAudioTags} at the same time. Remotion pre-mounts silent audio tags to help avoid browser autoplay restrictions. See https://remotion.dev/docs/player/autoplay#using-the-numberofsharedaudiotags-prop for more information on how to increase this limit.`);
		const { id, ref, mediaElementSourceNode } = refs[firstFreeAudio];
		const cloned = [...takenAudios.current];
		cloned[firstFreeAudio] = id;
		takenAudios.current = cloned;
		const newElem = {
			props: aud,
			id,
			el: ref,
			audioId,
			mediaElementSourceNode,
			premounting,
			audioMounted: Boolean(ref.current),
			postmounting,
			cleanupOnMediaTagUnmount: () => {}
		};
		audios.current?.push(newElem);
		rerenderAudios();
		return newElem;
	}, [
		numberOfAudioTags,
		refs,
		rerenderAudios
	]);
	const unregisterAudio = (0, import_react.useCallback)((id) => {
		const cloned = [...takenAudios.current];
		const index = refs.findIndex((r) => r.id === id);
		if (index === -1) throw new TypeError("Error occured in ");
		cloned[index] = false;
		takenAudios.current = cloned;
		audios.current = audios.current?.filter((a2) => a2.id !== id);
		rerenderAudios();
	}, [refs, rerenderAudios]);
	const updateAudio = (0, import_react.useCallback)(({ aud, audioId, id, premounting, postmounting }) => {
		let changed = false;
		audios.current = audios.current?.map((prevA) => {
			const audioMounted = Boolean(prevA.el.current);
			if (prevA.audioMounted !== audioMounted) changed = true;
			if (prevA.id === id) {
				if (compareProps(aud, prevA.props) && prevA.premounting === premounting && prevA.postmounting === postmounting) return prevA;
				changed = true;
				return {
					...prevA,
					props: aud,
					premounting,
					postmounting,
					audioId,
					audioMounted
				};
			}
			return prevA;
		});
		if (changed) rerenderAudios();
	}, [rerenderAudios]);
	const playAllAudios = (0, import_react.useCallback)(() => {
		refs.forEach((ref) => {
			if (audios.current.find((a2) => a2.el === ref.ref)?.premounting) return;
			playAndHandleNotAllowedError({
				mediaRef: ref.ref,
				mediaType: "audio",
				onAutoPlayError: null,
				logLevel,
				mountTime,
				reason: "playing all audios",
				isPlayer: env.isPlayer
			});
		});
		resume?.();
	}, [
		logLevel,
		mountTime,
		refs,
		env.isPlayer,
		resume
	]);
	const audioTagsValue = (0, import_react.useMemo)(() => {
		return {
			registerAudio,
			unregisterAudio,
			updateAudio,
			playAllAudios,
			numberOfAudioTags
		};
	}, [
		numberOfAudioTags,
		playAllAudios,
		registerAudio,
		unregisterAudio,
		updateAudio
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SharedAudioTagsContext.Provider, {
		value: audioTagsValue,
		children: [refs.map(({ id, ref }) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
				ref,
				preload: "metadata",
				src: EMPTY_AUDIO
			}, id);
		}), children]
	});
};
var useSharedAudio = ({ aud, audioId, premounting, postmounting }) => {
	const audioCtx = (0, import_react.useContext)(SharedAudioContext);
	const tagsCtx = (0, import_react.useContext)(SharedAudioTagsContext);
	const [elem] = (0, import_react.useState)(() => {
		if (tagsCtx && tagsCtx.numberOfAudioTags > 0) return tagsCtx.registerAudio({
			aud,
			audioId,
			premounting,
			postmounting
		});
		const el = import_react.createRef();
		const mediaElementSourceNode = audioCtx?.audioContext ? makeSharedElementSourceNode({
			audioContext: audioCtx.audioContext,
			ref: el
		}) : null;
		return {
			el,
			id: Math.random(),
			props: aud,
			audioId,
			mediaElementSourceNode,
			premounting,
			audioMounted: Boolean(el.current),
			postmounting,
			cleanupOnMediaTagUnmount: () => {
				mediaElementSourceNode?.cleanup();
			}
		};
	});
	const effectToUse = import_react.useInsertionEffect ?? import_react.useLayoutEffect;
	if (typeof document !== "undefined") {
		effectToUse(() => {
			if (tagsCtx && tagsCtx.numberOfAudioTags > 0) tagsCtx.updateAudio({
				id: elem.id,
				aud,
				audioId,
				premounting,
				postmounting
			});
		}, [
			aud,
			tagsCtx,
			elem.id,
			audioId,
			premounting,
			postmounting
		]);
		effectToUse(() => {
			return () => {
				if (tagsCtx && tagsCtx.numberOfAudioTags > 0) tagsCtx.unregisterAudio(elem.id);
			};
		}, [tagsCtx, elem.id]);
	}
	return elem;
};
var FLOATING_POINT_ERROR_THRESHOLD = 1e-5;
var isApproximatelyTheSame = (num1, num2) => {
	return Math.abs(num1 - num2) < FLOATING_POINT_ERROR_THRESHOLD;
};
var toSeconds = (time, fps) => {
	return Math.round(time / fps * 100) / 100;
};
var isSafari = () => {
	if (typeof window === "undefined") return false;
	if (!/AppleWebKit/.test(window.navigator.userAgent)) return false;
	return !window.navigator.userAgent.includes("Chrome/");
};
var isIosSafari = () => {
	if (typeof window === "undefined") return false;
	return /iP(ad|od|hone)/i.test(window.navigator.userAgent) && isSafari();
};
var isIOSSafariAndBlob = (actualSrc) => {
	return isIosSafari() && actualSrc.startsWith("blob:");
};
var getVideoFragmentStart = ({ actualFrom, fps }) => {
	return toSeconds(Math.max(0, -actualFrom), fps);
};
var getVideoFragmentEnd = ({ duration, fps }) => {
	return toSeconds(duration, fps);
};
var appendVideoFragment = ({ actualSrc, actualFrom, duration, fps }) => {
	if (isIOSSafariAndBlob(actualSrc)) return actualSrc;
	if (actualSrc.startsWith("data:")) return actualSrc;
	if (Boolean(new URL(actualSrc, (typeof window === "undefined" ? null : window.location.href) ?? "http://localhost:3000").hash)) return actualSrc;
	if (!Number.isFinite(actualFrom)) return actualSrc;
	const withStartHash = `${actualSrc}#t=${getVideoFragmentStart({
		actualFrom,
		fps
	})}`;
	if (!Number.isFinite(duration)) return withStartHash;
	return `${withStartHash},${getVideoFragmentEnd({
		duration,
		fps
	})}`;
};
var isSubsetOfDuration = ({ prevStartFrom, newStartFrom, prevDuration, newDuration, fps }) => {
	const previousFrom = getVideoFragmentStart({
		actualFrom: prevStartFrom,
		fps
	});
	const newFrom = getVideoFragmentStart({
		actualFrom: newStartFrom,
		fps
	});
	const previousEnd = getVideoFragmentEnd({
		duration: prevDuration,
		fps
	});
	const newEnd = getVideoFragmentEnd({
		duration: newDuration,
		fps
	});
	if (newFrom < previousFrom) return false;
	if (newEnd > previousEnd) return false;
	return true;
};
var useAppendVideoFragment = ({ actualSrc: initialActualSrc, actualFrom: initialActualFrom, duration: initialDuration, fps }) => {
	const actualFromRef = (0, import_react.useRef)(initialActualFrom);
	const actualDuration = (0, import_react.useRef)(initialDuration);
	const actualSrc = (0, import_react.useRef)(initialActualSrc);
	if (!isSubsetOfDuration({
		prevStartFrom: actualFromRef.current,
		newStartFrom: initialActualFrom,
		prevDuration: actualDuration.current,
		newDuration: initialDuration,
		fps
	}) || initialActualSrc !== actualSrc.current) {
		actualFromRef.current = initialActualFrom;
		actualDuration.current = initialDuration;
		actualSrc.current = initialActualSrc;
	}
	return appendVideoFragment({
		actualSrc: actualSrc.current,
		actualFrom: actualFromRef.current,
		duration: actualDuration.current,
		fps
	});
};
var warned2 = false;
var warnSafariOnce = (logLevel) => {
	if (warned2) return;
	warned2 = true;
	Log.warn({
		logLevel,
		tag: null
	}, "In Safari, setting a volume and a playback rate at the same time is buggy.");
	Log.warn({
		logLevel,
		tag: null
	}, "In Desktop Safari, only volumes <= 1 will be applied.");
	Log.warn({
		logLevel,
		tag: null
	}, logLevel, "In Mobile Safari, the volume will be ignored and set to 1 if a playbackRate is set.");
};
var useVolume = ({ mediaRef, volume, logLevel, source, shouldUseWebAudioApi }) => {
	const audioStuffRef = (0, import_react.useRef)(null);
	const currentVolumeRef = (0, import_react.useRef)(volume);
	currentVolumeRef.current = volume;
	const sharedAudioContext = (0, import_react.useContext)(SharedAudioContext);
	if (!sharedAudioContext) throw new Error("useAmplification must be used within a SharedAudioContext");
	const { audioContext, gainNode: masterGainNode } = sharedAudioContext;
	if (typeof window !== "undefined") (0, import_react.useLayoutEffect)(() => {
		if (!audioContext) return;
		if (!mediaRef.current) return;
		if (!shouldUseWebAudioApi) return;
		if (mediaRef.current.playbackRate !== 1 && isSafari()) {
			warnSafariOnce(logLevel);
			return;
		}
		if (!source) return;
		if (!masterGainNode) return;
		const gainNode = new GainNode(audioContext, { gain: currentVolumeRef.current });
		source.attemptToConnect();
		source.get().connect(gainNode);
		gainNode.connect(masterGainNode);
		audioStuffRef.current = { gainNode };
		Log.trace({
			logLevel,
			tag: null
		}, `Starting to amplify ${mediaRef.current?.src}. Gain = ${currentVolumeRef.current}, playbackRate = ${mediaRef.current?.playbackRate}`);
		return () => {
			audioStuffRef.current = null;
			gainNode.disconnect();
			source.get().disconnect();
		};
	}, [
		logLevel,
		mediaRef,
		audioContext,
		source,
		shouldUseWebAudioApi,
		masterGainNode
	]);
	if (audioStuffRef.current) {
		const valueToSet = volume;
		if (!isApproximatelyTheSame(audioStuffRef.current.gainNode.gain.value, valueToSet)) {
			audioStuffRef.current.gainNode.gain.value = valueToSet;
			Log.trace({
				logLevel,
				tag: null
			}, `Setting gain to ${valueToSet} for ${mediaRef.current?.src}`);
		}
	}
	if ((isSafari() && mediaRef.current && mediaRef.current?.playbackRate !== 1 || !shouldUseWebAudioApi) && mediaRef.current && !isApproximatelyTheSame(volume, mediaRef.current?.volume)) mediaRef.current.volume = Math.min(volume, 1);
	return audioStuffRef;
};
var useMediaStartsAt = () => {
	return (0, import_react.useContext)(SequenceContext)?.cumulatedNegativeFrom ?? 0;
};
var useFrameForVolumeProp = (behavior) => {
	const loop = Loop.useLoop();
	const frame = useCurrentFrame();
	const startsAt = useMediaStartsAt();
	if (behavior === "repeat" || loop === null) return frame + startsAt;
	return frame + startsAt + loop.durationInFrames * loop.iteration;
};
var getAssetDisplayName = (filename) => {
	if (/data:|blob:/.test(filename.substring(0, 5))) return "Data URL";
	const splitted = filename.split("/").map((s) => s.split("\\")).flat(1);
	return splitted[splitted.length - 1];
};
var getTimelineDuration = ({ compositionDurationInFrames, playbackRate, trimBefore, trimAfter, parentSequenceDurationInFrames, loop }) => {
	if (loop) return compositionDurationInFrames;
	const mediaDuration = calculateMediaDuration({
		mediaDurationInFrames: compositionDurationInFrames * playbackRate + (trimBefore ?? 0),
		playbackRate,
		trimBefore,
		trimAfter
	});
	if (parentSequenceDurationInFrames !== null) {
		const cappedDuration = Math.min(parentSequenceDurationInFrames * playbackRate, mediaDuration);
		return Number(cappedDuration.toFixed(10));
	}
	return mediaDuration;
};
var evaluateVolume = ({ frame, volume, mediaVolume = 1 }) => {
	if (typeof volume === "number") return volume * mediaVolume;
	if (typeof volume === "undefined") return Number(mediaVolume);
	const evaluated = volume(frame) * mediaVolume;
	if (typeof evaluated !== "number") throw new TypeError(`You passed in a a function to the volume prop but it did not return a number but a value of type ${typeof evaluated} for frame ${frame}`);
	if (Number.isNaN(evaluated)) throw new TypeError(`You passed in a function to the volume prop but it returned NaN for frame ${frame}.`);
	if (!Number.isFinite(evaluated)) throw new TypeError(`You passed in a function to the volume prop but it returned a non-finite number for frame ${frame}.`);
	return Math.max(0, evaluated);
};
var didWarn = {};
var warnOnce2 = (message) => {
	if (didWarn[message]) return;
	console.warn(message);
	didWarn[message] = true;
};
var useBasicMediaInTimeline = ({ volume, mediaVolume, mediaType, src, displayName, trimBefore, trimAfter, playbackRate, sequenceDurationInFrames, mediaStartsAt, loop }) => {
	if (!src) throw new Error("No src passed");
	const parentSequence = (0, import_react.useContext)(SequenceContext);
	const [initialVolume] = (0, import_react.useState)(() => volume);
	const duration = getTimelineDuration({
		compositionDurationInFrames: sequenceDurationInFrames,
		playbackRate,
		trimBefore,
		trimAfter,
		parentSequenceDurationInFrames: parentSequence?.durationInFrames ?? null,
		loop
	});
	const volumes = (0, import_react.useMemo)(() => {
		if (typeof volume === "number") return volume;
		return new Array(Math.floor(Math.max(0, duration + mediaStartsAt))).fill(true).map((_, i) => {
			return evaluateVolume({
				frame: i + mediaStartsAt,
				volume,
				mediaVolume
			});
		}).join(",");
	}, [
		duration,
		mediaStartsAt,
		volume,
		mediaVolume
	]);
	(0, import_react.useEffect)(() => {
		if (typeof volume === "number" && volume !== initialVolume) warnOnce2(`Remotion: The ${mediaType} with src ${src} has changed it's volume. Prefer the callback syntax for setting volume to get better timeline display: https://www.remotion.dev/docs/audio/volume`);
	}, [
		initialVolume,
		mediaType,
		src,
		volume
	]);
	const doesVolumeChange = typeof volume === "function";
	const nonce = useNonce();
	const { rootId } = useTimelineContext();
	const startMediaFrom = 0 - mediaStartsAt + (trimBefore ?? 0);
	return (0, import_react.useMemo)(() => {
		return {
			volumes,
			duration,
			doesVolumeChange,
			nonce,
			rootId,
			finalDisplayName: displayName ?? getAssetDisplayName(src),
			startMediaFrom,
			src,
			playbackRate
		};
	}, [
		volumes,
		duration,
		doesVolumeChange,
		nonce,
		rootId,
		displayName,
		src,
		startMediaFrom,
		playbackRate
	]);
};
var useMediaInTimeline = ({ volume, mediaVolume, src, mediaType, playbackRate, displayName, id, getStack, showInTimeline, premountDisplay, postmountDisplay, loopDisplay, documentationLink, refForOutline }) => {
	const parentSequence = (0, import_react.useContext)(SequenceContext);
	const startsAt = useMediaStartsAt();
	const { registerSequence, unregisterSequence } = (0, import_react.useContext)(SequenceManager);
	const { durationInFrames } = useVideoConfig();
	const { volumes, duration, doesVolumeChange, nonce, rootId, finalDisplayName } = useBasicMediaInTimeline({
		volume,
		mediaVolume,
		mediaType,
		src,
		displayName,
		trimAfter: void 0,
		trimBefore: void 0,
		playbackRate,
		sequenceDurationInFrames: durationInFrames,
		mediaStartsAt: useMediaStartsAt(),
		loop: false
	});
	const { isStudio } = useRemotionEnvironment();
	(0, import_react.useEffect)(() => {
		if (!src) throw new Error("No src passed");
		if (!isStudio && window.process?.env?.NODE_ENV !== "test") return;
		if (!showInTimeline) return;
		registerSequence({
			type: mediaType,
			src,
			id,
			duration,
			from: 0,
			trimBefore: null,
			parent: parentSequence?.id ?? null,
			displayName: finalDisplayName,
			documentationLink,
			rootId,
			volume: volumes,
			showInTimeline: true,
			nonce: nonce.get(),
			startMediaFrom: 0 - startsAt,
			doesVolumeChange,
			loopDisplay,
			playbackRate,
			getStack,
			premountDisplay,
			postmountDisplay,
			controls: null,
			effects: [],
			refForOutline,
			isInsideSeries: false,
			frozenFrame: null,
			frozenMediaFrame: null
		});
		return () => {
			unregisterSequence(id);
		};
	}, [
		duration,
		id,
		parentSequence,
		src,
		registerSequence,
		unregisterSequence,
		volumes,
		doesVolumeChange,
		nonce,
		mediaType,
		startsAt,
		playbackRate,
		getStack,
		showInTimeline,
		premountDisplay,
		postmountDisplay,
		loopDisplay,
		documentationLink,
		rootId,
		finalDisplayName,
		isStudio,
		refForOutline
	]);
};
var useBufferManager = (logLevel, mountTime) => {
	const [blocks, setBlocks] = (0, import_react.useState)([]);
	const [onBufferingCallbacks, setOnBufferingCallbacks] = (0, import_react.useState)([]);
	const [onResumeCallbacks, setOnResumeCallbacks] = (0, import_react.useState)([]);
	const rendering = useRemotionEnvironment().isRendering;
	const buffering = (0, import_react.useRef)(false);
	const addBlock = (0, import_react.useCallback)((block) => {
		if (rendering) return { unblock: () => {} };
		let unblocked = false;
		setBlocks((b2) => [...b2, block]);
		return { unblock: () => {
			if (unblocked) return;
			unblocked = true;
			setBlocks((b2) => {
				const newArr = b2.filter((bx) => bx !== block);
				if (newArr.length === b2.length) return b2;
				return newArr;
			});
		} };
	}, [rendering]);
	const listenForBuffering = (0, import_react.useCallback)((callback) => {
		setOnBufferingCallbacks((c2) => [...c2, callback]);
		return { remove: () => {
			setOnBufferingCallbacks((c2) => c2.filter((cb) => cb !== callback));
		} };
	}, []);
	const listenForResume = (0, import_react.useCallback)((callback) => {
		setOnResumeCallbacks((c2) => [...c2, callback]);
		return { remove: () => {
			setOnResumeCallbacks((c2) => c2.filter((cb) => cb !== callback));
		} };
	}, []);
	(0, import_react.useEffect)(() => {
		if (rendering) return;
		if (blocks.length > 0) {
			onBufferingCallbacks.forEach((c2) => c2());
			playbackLogging({
				logLevel,
				message: "Player is entering buffer state",
				mountTime,
				tag: "player"
			});
		}
	}, [blocks]);
	if (typeof window !== "undefined") (0, import_react.useLayoutEffect)(() => {
		if (rendering) return;
		if (blocks.length === 0) {
			onResumeCallbacks.forEach((c2) => c2());
			playbackLogging({
				logLevel,
				message: "Player is exiting buffer state",
				mountTime,
				tag: "player"
			});
		}
	}, [blocks]);
	return (0, import_react.useMemo)(() => {
		return {
			addBlock,
			listenForBuffering,
			listenForResume,
			buffering
		};
	}, [
		addBlock,
		buffering,
		listenForBuffering,
		listenForResume
	]);
};
var BufferingContextReact = import_react.createContext(null);
var BufferingProvider = ({ children }) => {
	const { logLevel, mountTime } = (0, import_react.useContext)(LogLevelContext);
	const bufferManager = useBufferManager(logLevel ?? "info", mountTime);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BufferingContextReact.Provider, {
		value: bufferManager,
		children
	});
};
var useIsPlayerBuffering = (bufferManager) => {
	const [isBuffering, setIsBuffering] = (0, import_react.useState)(bufferManager.buffering.current);
	(0, import_react.useEffect)(() => {
		const onBuffer = () => {
			setIsBuffering(true);
		};
		const onResume = () => {
			setIsBuffering(false);
		};
		bufferManager.listenForBuffering(onBuffer);
		bufferManager.listenForResume(onResume);
		return () => {
			bufferManager.listenForBuffering(() => {});
			bufferManager.listenForResume(() => {});
		};
	}, [bufferManager]);
	return isBuffering;
};
var useBufferState = () => {
	const buffer = (0, import_react.useContext)(BufferingContextReact);
	const logLevel = useLogLevel();
	const addBlock = buffer ? buffer.addBlock : null;
	return (0, import_react.useMemo)(() => ({ delayPlayback: () => {
		if (!addBlock) throw new Error("Tried to enable the buffering state, but a Remotion context was not found. This API can only be called in a component that was passed to the Remotion Player or a <Composition>. Or you might have experienced a version mismatch - run `npx remotion versions` and ensure all packages have the same version. This error is thrown by the buffer state https://remotion.dev/docs/player/buffer-state");
		Log.trace({
			logLevel,
			tag: "[buffer-state]"
		}, "Adding buffer handle", (/* @__PURE__ */ new Error()).stack);
		const { unblock } = addBlock({ id: String(Math.random()) });
		let unblocked = false;
		return { unblock: () => {
			if (unblocked) return;
			unblocked = true;
			Log.trace({
				logLevel,
				tag: "[buffer-state]"
			}, "Removing buffer handle");
			unblock();
		} };
	} }), [addBlock, logLevel]);
};
var isSafariWebkit = () => {
	return /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
};
var useBufferUntilFirstFrame = ({ mediaRef, mediaType, onVariableFpsVideoDetected, pauseWhenBuffering, logLevel, mountTime }) => {
	const bufferingRef = (0, import_react.useRef)(false);
	const { delayPlayback } = useBufferState();
	const bufferUntilFirstFrame = (0, import_react.useCallback)((requestedTime) => {
		if (mediaType !== "video") return;
		if (!pauseWhenBuffering) return;
		const current = mediaRef.current;
		if (!current) return;
		if (current.readyState >= current.HAVE_FUTURE_DATA && !isSafariWebkit()) {
			playbackLogging({
				logLevel,
				message: `Not using buffer until first frame, because readyState is ${current.readyState} and is not Safari or Desktop Chrome`,
				mountTime,
				tag: "buffer"
			});
			return;
		}
		if (!current.requestVideoFrameCallback) {
			playbackLogging({
				logLevel,
				message: `Not using buffer until first frame, because requestVideoFrameCallback is not supported`,
				mountTime,
				tag: "buffer"
			});
			return;
		}
		bufferingRef.current = true;
		playbackLogging({
			logLevel,
			message: `Buffering ${mediaRef.current?.src} until the first frame is received`,
			mountTime,
			tag: "buffer"
		});
		const playback = delayPlayback();
		const unblock = () => {
			playback.unblock();
			current.removeEventListener("ended", unblock, { once: true });
			current.removeEventListener("pause", unblock, { once: true });
			bufferingRef.current = false;
		};
		const onEndedOrPauseOrCanPlay = () => {
			unblock();
		};
		current.requestVideoFrameCallback((_, info2) => {
			if (Math.abs(info2.mediaTime - requestedTime) > .5) onVariableFpsVideoDetected();
			unblock();
		});
		current.addEventListener("ended", onEndedOrPauseOrCanPlay, { once: true });
		current.addEventListener("pause", onEndedOrPauseOrCanPlay, { once: true });
		current.addEventListener("canplay", onEndedOrPauseOrCanPlay, { once: true });
	}, [
		delayPlayback,
		logLevel,
		mediaRef,
		mediaType,
		mountTime,
		onVariableFpsVideoDetected,
		pauseWhenBuffering
	]);
	return (0, import_react.useMemo)(() => {
		return {
			isBuffering: () => bufferingRef.current,
			bufferUntilFirstFrame
		};
	}, [bufferUntilFirstFrame]);
};
var useCurrentTimeOfMediaTagWithUpdateTimeStamp = (mediaRef) => {
	const lastUpdate = import_react.useRef({
		time: mediaRef.current?.currentTime ?? 0,
		lastUpdate: performance.now()
	});
	const nowCurrentTime = mediaRef.current?.currentTime ?? null;
	if (nowCurrentTime !== null) {
		if (lastUpdate.current.time !== nowCurrentTime) {
			lastUpdate.current.time = nowCurrentTime;
			lastUpdate.current.lastUpdate = performance.now();
		}
	}
	return lastUpdate;
};
var seek = ({ mediaRef, time, logLevel, why, mountTime }) => {
	const timeToSet = isIosSafari() ? Number(time.toFixed(1)) : time;
	playbackLogging({
		logLevel,
		tag: "seek",
		message: `Seeking from ${mediaRef.currentTime} to ${timeToSet}. src= ${mediaRef.src} Reason: ${why}`,
		mountTime
	});
	mediaRef.currentTime = timeToSet;
	return timeToSet;
};
var useMediaBuffering = ({ element, shouldBuffer, isPremounting, isPostmounting, logLevel, mountTime, src }) => {
	const buffer = useBufferState();
	const [isBuffering, setIsBuffering] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cleanupFns = [];
		const { current } = element;
		if (!current) return;
		if (!shouldBuffer) return;
		if (isPremounting || isPostmounting) {
			if ((isPremounting || isPostmounting) && current.readyState < current.HAVE_FUTURE_DATA) {
				if (!navigator.userAgent.includes("Firefox/")) {
					playbackLogging({
						logLevel,
						message: `Calling .load() on ${current.src} because readyState is ${current.readyState} and it is not Firefox. Element is premounted ${current.playbackRate}`,
						tag: "load",
						mountTime
					});
					const previousPlaybackRate = current.playbackRate;
					current.load();
					current.playbackRate = previousPlaybackRate;
				}
			}
			return;
		}
		const cleanup = (reason) => {
			let didDoSomething = false;
			cleanupFns.forEach((fn) => {
				fn(reason);
				didDoSomething = true;
			});
			cleanupFns = [];
			setIsBuffering((previous) => {
				if (previous) didDoSomething = true;
				return false;
			});
			if (didDoSomething) playbackLogging({
				logLevel,
				message: `Unmarking as buffering: ${current.src}. Reason: ${reason}`,
				tag: "buffer",
				mountTime
			});
		};
		const blockMedia = (reason) => {
			setIsBuffering(true);
			playbackLogging({
				logLevel,
				message: `Marking as buffering: ${current.src}. Reason: ${reason}`,
				tag: "buffer",
				mountTime
			});
			const { unblock } = buffer.delayPlayback();
			const onCanPlay = () => {
				cleanup("\"canplay\" was fired");
				init();
			};
			const onError = () => {
				cleanup("\"error\" event was occurred");
				init();
			};
			current.addEventListener("canplay", onCanPlay, { once: true });
			cleanupFns.push(() => {
				current.removeEventListener("canplay", onCanPlay);
			});
			current.addEventListener("error", onError, { once: true });
			cleanupFns.push(() => {
				current.removeEventListener("error", onError);
			});
			cleanupFns.push((cleanupReason) => {
				playbackLogging({
					logLevel,
					message: `Unblocking ${current.src} from buffer. Reason: ${cleanupReason}`,
					tag: "buffer",
					mountTime
				});
				unblock();
			});
		};
		const init = () => {
			if (current.readyState < current.HAVE_FUTURE_DATA) {
				blockMedia(`readyState is ${current.readyState}, which is less than HAVE_FUTURE_DATA`);
				if (!navigator.userAgent.includes("Firefox/")) {
					playbackLogging({
						logLevel,
						message: `Calling .load() on ${src} because readyState is ${current.readyState} and it is not Firefox. ${current.playbackRate}`,
						tag: "load",
						mountTime
					});
					const previousPlaybackRate = current.playbackRate;
					current.load();
					current.playbackRate = previousPlaybackRate;
				}
			} else {
				const onWaiting = () => {
					blockMedia("\"waiting\" event was fired");
				};
				current.addEventListener("waiting", onWaiting);
				cleanupFns.push(() => {
					current.removeEventListener("waiting", onWaiting);
				});
			}
		};
		init();
		return () => {
			cleanup("element was unmounted or prop changed");
		};
	}, [
		buffer,
		src,
		element,
		isPremounting,
		isPostmounting,
		logLevel,
		shouldBuffer,
		mountTime
	]);
	return isBuffering;
};
var useRequestVideoCallbackTime = ({ mediaRef, mediaType, lastSeek, onVariableFpsVideoDetected }) => {
	const currentTime = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const { current } = mediaRef;
		if (current) currentTime.current = {
			time: current.currentTime,
			lastUpdate: performance.now()
		};
		else {
			currentTime.current = null;
			return;
		}
		if (mediaType !== "video") {
			currentTime.current = null;
			return;
		}
		const videoTag = current;
		if (!videoTag.requestVideoFrameCallback) return;
		let cancel = () => {};
		const request = () => {
			if (!videoTag) return;
			const cb = videoTag.requestVideoFrameCallback((_, info2) => {
				if (currentTime.current !== null) {
					const difference = Math.abs(currentTime.current.time - info2.mediaTime);
					const differenceToLastSeek = Math.abs(lastSeek.current === null ? Infinity : info2.mediaTime - lastSeek.current);
					if (difference > .5 && differenceToLastSeek > .5 && info2.mediaTime > currentTime.current.time) onVariableFpsVideoDetected();
				}
				currentTime.current = {
					time: info2.mediaTime,
					lastUpdate: performance.now()
				};
				request();
			});
			cancel = () => {
				videoTag.cancelVideoFrameCallback(cb);
				cancel = () => {};
			};
		};
		request();
		return () => {
			cancel();
		};
	}, [
		lastSeek,
		mediaRef,
		mediaType,
		onVariableFpsVideoDetected
	]);
	return currentTime;
};
var getExpectedMediaFrameUncorrected$1 = ({ frame, playbackRate, startFrom }) => {
	return interpolate$1(frame, [
		-1,
		startFrom,
		startFrom + 1
	], [
		-1,
		startFrom,
		startFrom + playbackRate
	]);
};
var getMediaTime = ({ fps, frame, playbackRate, startFrom }) => {
	return getExpectedMediaFrameUncorrected$1({
		frame,
		playbackRate,
		startFrom
	}) * (1e3 / fps) / 1e3;
};
var alreadyWarned = {};
var warnAboutNonSeekableMedia = (ref, type) => {
	if (ref === null) return;
	if (ref.seekable.length === 0) return;
	if (ref.seekable.length > 1) return;
	if (alreadyWarned[ref.src]) return;
	const range = {
		start: ref.seekable.start(0),
		end: ref.seekable.end(0)
	};
	if (range.start === 0 && range.end === 0) {
		const msg = [
			`The media ${ref.src} cannot be seeked. This could be one of few reasons:`,
			"1) The media resource was replaced while the video is playing but it was not loaded yet.",
			"2) The media does not support seeking.",
			"3) The media was loaded with security headers prventing it from being included.",
			"Please see https://remotion.dev/docs/non-seekable-media for assistance."
		].join(`
`);
		if (type === "console-error") console.error(msg);
		else if (type === "console-warning") console.warn(`The media ${ref.src} does not support seeking. The video will render fine, but may not play correctly in the Remotion Studio and in the <Player>. See https://remotion.dev/docs/non-seekable-media for an explanation.`);
		else throw new Error(msg);
		alreadyWarned[ref.src] = true;
	}
};
var useMediaPlayback = ({ mediaRef, src, mediaType, playbackRate: localPlaybackRate, preservePitch = true, onlyWarnForMediaSeekingError, acceptableTimeshift, pauseWhenBuffering, isPremounting, isPostmounting, onAutoPlayError }) => {
	const { playbackRate: globalPlaybackRate } = usePlaybackRate();
	const frame = useCurrentFrame();
	const absoluteFrame = useTimelinePosition();
	const [playing] = usePlayingState();
	const buffering = (0, import_react.useContext)(BufferingContextReact);
	const { fps } = useVideoConfig();
	const mediaStartsAt = useMediaStartsAt();
	const lastSeekDueToShift = (0, import_react.useRef)(null);
	const lastSeek = (0, import_react.useRef)(null);
	const logLevel = useLogLevel();
	const mountTime = useMountTime();
	if (!buffering) throw new Error("useMediaPlayback must be used inside a <BufferingContext>");
	const isVariableFpsVideoMap = (0, import_react.useRef)({});
	const onVariableFpsVideoDetected = (0, import_react.useCallback)(() => {
		if (!src) return;
		if (isVariableFpsVideoMap.current[src]) return;
		Log.verbose({
			logLevel,
			tag: null
		}, `Detected ${src} as a variable FPS video. Disabling buffering while seeking.`);
		isVariableFpsVideoMap.current[src] = true;
	}, [logLevel, src]);
	const rvcCurrentTime = useRequestVideoCallbackTime({
		mediaRef,
		mediaType,
		lastSeek,
		onVariableFpsVideoDetected
	});
	const mediaTagCurrentTime = useCurrentTimeOfMediaTagWithUpdateTimeStamp(mediaRef);
	const desiredUnclampedTime = getMediaTime({
		frame,
		playbackRate: localPlaybackRate,
		startFrom: -mediaStartsAt,
		fps
	});
	const isMediaTagBuffering = useMediaBuffering({
		element: mediaRef,
		shouldBuffer: pauseWhenBuffering,
		isPremounting,
		isPostmounting,
		logLevel,
		mountTime,
		src: src ?? null
	});
	const { bufferUntilFirstFrame, isBuffering } = useBufferUntilFirstFrame({
		mediaRef,
		mediaType,
		onVariableFpsVideoDetected,
		pauseWhenBuffering,
		logLevel,
		mountTime
	});
	const playbackRate = localPlaybackRate * globalPlaybackRate;
	const acceptableTimeShiftButLessThanDuration = (() => {
		const defaultAcceptableTimeshift = .65;
		if (mediaRef.current?.duration) return Math.min(mediaRef.current.duration, acceptableTimeshift ?? defaultAcceptableTimeshift);
		return acceptableTimeshift ?? defaultAcceptableTimeshift;
	})();
	(0, import_react.useEffect)(() => {
		if (mediaRef.current?.paused) return;
		if (!playing) {
			playbackLogging({
				logLevel,
				tag: "pause",
				message: `Pausing ${mediaRef.current?.src} because ${isPremounting ? "media is premounting" : isPostmounting ? "media is postmounting" : "Player is not playing"}`,
				mountTime
			});
			mediaRef.current?.pause();
			return;
		}
		const isMediaTagBufferingOrStalled = isMediaTagBuffering || isBuffering();
		if (buffering.buffering.current && !isMediaTagBufferingOrStalled) {
			playbackLogging({
				logLevel,
				tag: "pause",
				message: `Pausing ${mediaRef.current?.src} because player is buffering but media tag is not`,
				mountTime
			});
			mediaRef.current?.pause();
		}
	}, [
		isBuffering,
		isMediaTagBuffering,
		buffering,
		useIsPlayerBuffering(buffering),
		isPremounting,
		logLevel,
		mediaRef,
		mediaType,
		mountTime,
		playing,
		isPostmounting
	]);
	const env = useRemotionEnvironment();
	(0, import_react.useLayoutEffect)(() => {
		const playbackRateToSet = Math.max(0, playbackRate);
		if (mediaRef.current && mediaRef.current.playbackRate !== playbackRateToSet) mediaRef.current.playbackRate = playbackRateToSet;
		if (mediaRef.current && mediaRef.current.preservesPitch !== preservePitch) mediaRef.current.preservesPitch = preservePitch;
	}, [
		mediaRef,
		playbackRate,
		preservePitch
	]);
	(0, import_react.useEffect)(() => {
		const tagName = mediaType === "audio" ? "<Html5Audio>" : "<Html5Video>";
		if (!mediaRef.current) throw new Error(`No ${mediaType} ref found`);
		if (!src) throw new Error(`No 'src' attribute was passed to the ${tagName} element.`);
		const { duration } = mediaRef.current;
		const shouldBeTime = !Number.isNaN(duration) && Number.isFinite(duration) ? Math.min(duration, desiredUnclampedTime) : desiredUnclampedTime;
		const mediaTagTime = mediaTagCurrentTime.current.time;
		const rvcTime = rvcCurrentTime.current?.time ?? null;
		const isVariableFpsVideo = isVariableFpsVideoMap.current[src];
		const timeShiftMediaTag = Math.abs(shouldBeTime - mediaTagTime);
		const timeShiftRvcTag = rvcTime ? Math.abs(shouldBeTime - rvcTime) : null;
		const mostRecentTimeshift = rvcCurrentTime.current?.lastUpdate && rvcCurrentTime.current.time > mediaTagCurrentTime.current.lastUpdate ? timeShiftRvcTag : timeShiftMediaTag;
		const timeShift = timeShiftRvcTag && !isVariableFpsVideo ? mostRecentTimeshift : timeShiftMediaTag;
		if (timeShift > acceptableTimeShiftButLessThanDuration && lastSeekDueToShift.current !== shouldBeTime) {
			lastSeek.current = seek({
				mediaRef: mediaRef.current,
				time: shouldBeTime,
				logLevel,
				why: `because time shift is too big. shouldBeTime = ${shouldBeTime}, isTime = ${mediaTagTime}, requestVideoCallbackTime = ${rvcTime}, timeShift = ${timeShift}${isVariableFpsVideo ? ", isVariableFpsVideo = true" : ""}, isPremounting = ${isPremounting}, isPostmounting = ${isPostmounting}, pauseWhenBuffering = ${pauseWhenBuffering}`,
				mountTime
			});
			lastSeekDueToShift.current = lastSeek.current;
			if (playing) {
				if (playbackRate > 0) bufferUntilFirstFrame(shouldBeTime);
				if (mediaRef.current.paused) playAndHandleNotAllowedError({
					mediaRef,
					mediaType,
					onAutoPlayError,
					logLevel,
					mountTime,
					reason: "player is playing but media tag is paused, and just seeked",
					isPlayer: env.isPlayer
				});
			}
			if (!onlyWarnForMediaSeekingError) warnAboutNonSeekableMedia(mediaRef.current, onlyWarnForMediaSeekingError ? "console-warning" : "console-error");
			return;
		}
		const seekThreshold = playing ? .15 : .01;
		const makesSenseToSeek = Math.abs(mediaRef.current.currentTime - shouldBeTime) > seekThreshold;
		const isMediaTagBufferingOrStalled = isMediaTagBuffering || isBuffering();
		const isSomethingElseBuffering = buffering.buffering.current && !isMediaTagBufferingOrStalled;
		if (!playing || isSomethingElseBuffering) {
			if (makesSenseToSeek) lastSeek.current = seek({
				mediaRef: mediaRef.current,
				time: shouldBeTime,
				logLevel,
				why: `not playing or something else is buffering. time offset is over seek threshold (${seekThreshold})`,
				mountTime
			});
			return;
		}
		if (!playing || buffering.buffering.current) return;
		const pausedCondition = mediaRef.current.paused && !mediaRef.current.ended;
		if (pausedCondition || absoluteFrame === 0) {
			const reason = pausedCondition ? "media tag is paused" : "absolute frame is 0";
			if (makesSenseToSeek) lastSeek.current = seek({
				mediaRef: mediaRef.current,
				time: shouldBeTime,
				logLevel,
				why: `is over timeshift threshold (threshold = ${seekThreshold}) and ${reason}`,
				mountTime
			});
			playAndHandleNotAllowedError({
				mediaRef,
				mediaType,
				onAutoPlayError,
				logLevel,
				mountTime,
				reason: `player is playing and ${reason}`,
				isPlayer: env.isPlayer
			});
			if (!isVariableFpsVideo && playbackRate > 0) bufferUntilFirstFrame(shouldBeTime);
		}
	}, [
		absoluteFrame,
		acceptableTimeShiftButLessThanDuration,
		bufferUntilFirstFrame,
		buffering.buffering,
		rvcCurrentTime,
		logLevel,
		desiredUnclampedTime,
		isBuffering,
		isMediaTagBuffering,
		mediaRef,
		mediaType,
		onlyWarnForMediaSeekingError,
		playbackRate,
		playing,
		src,
		onAutoPlayError,
		isPremounting,
		isPostmounting,
		pauseWhenBuffering,
		mountTime,
		mediaTagCurrentTime,
		env.isPlayer
	]);
};
var useMediaTag = ({ mediaRef, id, mediaType, onAutoPlayError, isPremounting, isPostmounting }) => {
	const { audioAndVideoTags, imperativePlaying } = useTimelineContext();
	const logLevel = useLogLevel();
	const mountTime = useMountTime();
	const env = useRemotionEnvironment();
	(0, import_react.useEffect)(() => {
		const tag = {
			id,
			play: (reason) => {
				if (!imperativePlaying.current) return;
				if (isPremounting || isPostmounting) return;
				return playAndHandleNotAllowedError({
					mediaRef,
					mediaType,
					onAutoPlayError,
					logLevel,
					mountTime,
					reason,
					isPlayer: env.isPlayer
				});
			}
		};
		audioAndVideoTags.current.push(tag);
		return () => {
			audioAndVideoTags.current = audioAndVideoTags.current.filter((a2) => a2.id !== id);
		};
	}, [
		audioAndVideoTags,
		id,
		mediaRef,
		mediaType,
		onAutoPlayError,
		imperativePlaying,
		isPremounting,
		isPostmounting,
		logLevel,
		mountTime,
		env.isPlayer
	]);
};
var MediaVolumeContext = (0, import_react.createContext)({
	playerMuted: false,
	mediaVolume: 1
});
var SetMediaVolumeContext = (0, import_react.createContext)({
	setPlayerMuted: () => {
		throw new Error("default");
	},
	setMediaVolume: () => {
		throw new Error("default");
	}
});
var useMediaVolumeState = () => {
	const { mediaVolume } = (0, import_react.useContext)(MediaVolumeContext);
	const { setMediaVolume } = (0, import_react.useContext)(SetMediaVolumeContext);
	return (0, import_react.useMemo)(() => {
		return [mediaVolume, setMediaVolume];
	}, [mediaVolume, setMediaVolume]);
};
var usePlayerMutedState = () => {
	const { playerMuted } = (0, import_react.useContext)(MediaVolumeContext);
	const { setPlayerMuted } = (0, import_react.useContext)(SetMediaVolumeContext);
	return (0, import_react.useMemo)(() => {
		return [playerMuted, setPlayerMuted];
	}, [playerMuted, setPlayerMuted]);
};
var warnAboutTooHighVolume = (volume) => {
	if (volume >= 100) throw new Error(`Volume was set to ${volume}, but regular volume is 1, not 100. Did you forget to divide by 100? Set a volume of less than 100 to dismiss this error.`);
};
var AudioForDevelopmentForwardRefFunction = (props, ref) => {
	const [initialShouldPreMountAudioElements] = (0, import_react.useState)(props.shouldPreMountAudioTags);
	if (props.shouldPreMountAudioTags !== initialShouldPreMountAudioElements) throw new Error("Cannot change the behavior for pre-mounting audio tags dynamically.");
	const logLevel = useLogLevel();
	const { volume, muted, playbackRate, preservePitch, shouldPreMountAudioTags, src, onDuration, acceptableTimeShiftInSeconds, _remotionInternalNeedsDurationCalculation, _remotionInternalNativeLoopPassed, _remotionInternalStack, allowAmplificationDuringRender, name, pauseWhenBuffering, showInTimeline, loopVolumeCurveBehavior, stack, crossOrigin, delayRenderRetries, delayRenderTimeoutInMilliseconds, toneFrequency, useWebAudioApi, onError, onNativeError, audioStreamIndex, ...nativeProps } = props;
	const [mediaVolume] = useMediaVolumeState();
	const [playerMuted] = usePlayerMutedState();
	const volumePropFrame = useFrameForVolumeProp(loopVolumeCurveBehavior ?? "repeat");
	if (!src) throw new TypeError("No 'src' was passed to <Html5Audio>.");
	const preloadedSrc = usePreload(src);
	const sequenceContext = (0, import_react.useContext)(SequenceContext);
	const [timelineId] = (0, import_react.useState)(() => String(Math.random()));
	const userPreferredVolume = evaluateVolume({
		frame: volumePropFrame,
		volume,
		mediaVolume
	});
	warnAboutTooHighVolume(userPreferredVolume);
	const crossOriginValue = getCrossOriginValue({
		crossOrigin,
		requestsVideoFrame: false,
		isClientSideRendering: false
	});
	const propsToPass = (0, import_react.useMemo)(() => {
		return {
			muted: muted || playerMuted || userPreferredVolume <= 0,
			src: preloadedSrc,
			loop: _remotionInternalNativeLoopPassed,
			crossOrigin: crossOriginValue,
			...nativeProps
		};
	}, [
		_remotionInternalNativeLoopPassed,
		playerMuted,
		muted,
		nativeProps,
		preloadedSrc,
		userPreferredVolume,
		crossOriginValue
	]);
	const { el: audioRef, mediaElementSourceNode, cleanupOnMediaTagUnmount } = useSharedAudio({
		aud: propsToPass,
		audioId: (0, import_react.useMemo)(() => `audio-${random(src ?? "")}-${sequenceContext?.relativeFrom}-${sequenceContext?.cumulatedFrom}-${sequenceContext?.durationInFrames}-muted:${props.muted}-loop:${props.loop}`, [
			src,
			sequenceContext?.relativeFrom,
			sequenceContext?.cumulatedFrom,
			sequenceContext?.durationInFrames,
			props.muted,
			props.loop
		]),
		premounting: Boolean(sequenceContext?.premounting),
		postmounting: Boolean(sequenceContext?.postmounting)
	});
	const getStack = (0, import_react.useCallback)(() => {
		return _remotionInternalStack ?? null;
	}, [_remotionInternalStack]);
	useMediaInTimeline({
		volume,
		mediaVolume,
		src,
		mediaType: "audio",
		playbackRate: playbackRate ?? 1,
		displayName: name ?? null,
		id: timelineId,
		getStack,
		showInTimeline,
		premountDisplay: sequenceContext?.premountDisplay ?? null,
		postmountDisplay: sequenceContext?.postmountDisplay ?? null,
		loopDisplay: void 0,
		documentationLink: "https://www.remotion.dev/docs/html5-audio",
		refForOutline: null
	});
	useMediaPlayback({
		mediaRef: audioRef,
		src,
		mediaType: "audio",
		playbackRate: playbackRate ?? 1,
		preservePitch,
		onlyWarnForMediaSeekingError: false,
		acceptableTimeshift: acceptableTimeShiftInSeconds ?? null,
		isPremounting: Boolean(sequenceContext?.premounting),
		isPostmounting: Boolean(sequenceContext?.postmounting),
		pauseWhenBuffering,
		onAutoPlayError: null
	});
	useMediaTag({
		id: timelineId,
		isPostmounting: Boolean(sequenceContext?.postmounting),
		isPremounting: Boolean(sequenceContext?.premounting),
		mediaRef: audioRef,
		mediaType: "audio",
		onAutoPlayError: null
	});
	useVolume({
		logLevel,
		mediaRef: audioRef,
		source: mediaElementSourceNode,
		volume: userPreferredVolume,
		shouldUseWebAudioApi: useWebAudioApi ?? false
	});
	(import_react.useInsertionEffect ?? import_react.useLayoutEffect)(() => {
		return () => {
			requestAnimationFrame(() => {
				cleanupOnMediaTagUnmount();
			});
		};
	}, [cleanupOnMediaTagUnmount]);
	(0, import_react.useImperativeHandle)(ref, () => {
		return audioRef.current;
	}, [audioRef]);
	const currentOnDurationCallback = (0, import_react.useRef)(onDuration);
	currentOnDurationCallback.current = onDuration;
	(0, import_react.useEffect)(() => {
		const { current } = audioRef;
		if (!current) return;
		if (current.duration) {
			currentOnDurationCallback.current?.(current.src, current.duration);
			return;
		}
		const onLoadedMetadata = () => {
			currentOnDurationCallback.current?.(current.src, current.duration);
		};
		current.addEventListener("loadedmetadata", onLoadedMetadata);
		return () => {
			current.removeEventListener("loadedmetadata", onLoadedMetadata);
		};
	}, [audioRef, src]);
	if (initialShouldPreMountAudioElements) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
		ref: audioRef,
		preload: "metadata",
		crossOrigin: crossOriginValue,
		...propsToPass
	});
};
var AudioForPreview = (0, import_react.forwardRef)(AudioForDevelopmentForwardRefFunction);
var AudioForRenderingRefForwardingFunction = (props, ref) => {
	const audioRef = (0, import_react.useRef)(null);
	const { volume: volumeProp, playbackRate, allowAmplificationDuringRender, onDuration, toneFrequency, _remotionInternalNeedsDurationCalculation, _remotionInternalNativeLoopPassed, acceptableTimeShiftInSeconds, name, onNativeError, delayRenderRetries, delayRenderTimeoutInMilliseconds, loopVolumeCurveBehavior, pauseWhenBuffering, audioStreamIndex, preservePitch: _preservePitch, ...nativeProps } = props;
	const absoluteFrame = useTimelinePosition();
	const volumePropFrame = useFrameForVolumeProp(loopVolumeCurveBehavior ?? "repeat");
	const frame = useCurrentFrame();
	const sequenceContext = (0, import_react.useContext)(SequenceContext);
	const { registerRenderAsset, unregisterRenderAsset } = (0, import_react.useContext)(RenderAssetManager);
	const { delayRender: delayRender2, continueRender: continueRender2 } = useDelayRender();
	const id = (0, import_react.useMemo)(() => `audio-${random(props.src ?? "")}-${sequenceContext?.relativeFrom}-${sequenceContext?.cumulatedFrom}-${sequenceContext?.durationInFrames}`, [
		props.src,
		sequenceContext?.relativeFrom,
		sequenceContext?.cumulatedFrom,
		sequenceContext?.durationInFrames
	]);
	const volume = evaluateVolume({
		volume: volumeProp,
		frame: volumePropFrame,
		mediaVolume: 1
	});
	warnAboutTooHighVolume(volume);
	(0, import_react.useImperativeHandle)(ref, () => {
		return audioRef.current;
	}, []);
	(0, import_react.useEffect)(() => {
		if (!props.src) throw new Error("No src passed");
		if (!window.remotion_audioEnabled) return;
		if (props.muted) return;
		if (volume <= 0) return;
		registerRenderAsset({
			type: "audio",
			src: getAbsoluteSrc$1(props.src),
			id,
			frame: absoluteFrame,
			volume,
			mediaFrame: frame,
			playbackRate: props.playbackRate ?? 1,
			toneFrequency: toneFrequency ?? 1,
			audioStartFrame: Math.max(0, -(sequenceContext?.cumulatedNegativeFrom ?? 0)),
			audioStreamIndex: audioStreamIndex ?? 0
		});
		return () => unregisterRenderAsset(id);
	}, [
		props.muted,
		props.src,
		registerRenderAsset,
		absoluteFrame,
		id,
		unregisterRenderAsset,
		volume,
		volumePropFrame,
		frame,
		playbackRate,
		props.playbackRate,
		toneFrequency,
		sequenceContext?.cumulatedNegativeFrom,
		audioStreamIndex
	]);
	const { src } = props;
	const needsToRenderAudioTag = ref || _remotionInternalNeedsDurationCalculation;
	(0, import_react.useLayoutEffect)(() => {
		if (window.process?.env?.NODE_ENV === "test") return;
		if (!needsToRenderAudioTag) return;
		const newHandle = delayRender2("Loading <Html5Audio> duration with src=" + src, {
			retries: delayRenderRetries ?? void 0,
			timeoutInMilliseconds: delayRenderTimeoutInMilliseconds ?? void 0
		});
		const { current } = audioRef;
		const didLoad = () => {
			if (current?.duration) onDuration(current.src, current.duration);
			continueRender2(newHandle);
		};
		if (current?.duration) {
			onDuration(current.src, current.duration);
			continueRender2(newHandle);
		} else current?.addEventListener("loadedmetadata", didLoad, { once: true });
		return () => {
			current?.removeEventListener("loadedmetadata", didLoad);
			continueRender2(newHandle);
		};
	}, [
		src,
		onDuration,
		needsToRenderAudioTag,
		delayRenderRetries,
		delayRenderTimeoutInMilliseconds,
		continueRender2,
		delayRender2
	]);
	if (!needsToRenderAudioTag) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
		ref: audioRef,
		...nativeProps,
		onError: onNativeError
	});
};
var AudioForRendering = (0, import_react.forwardRef)(AudioForRenderingRefForwardingFunction);
var AudioRefForwardingFunction = (props, ref) => {
	const audioTagsContext = (0, import_react.useContext)(SharedAudioTagsContext);
	const propsWithFreeze = props;
	const { startFrom, endAt, trimBefore, trimAfter, name, stack, pauseWhenBuffering, showInTimeline, onError: onRemotionError, freeze, ...otherProps } = propsWithFreeze;
	const { loop, freeze: _freeze, ...propsOtherThanLoop } = propsWithFreeze;
	const { fps } = useVideoConfig();
	const environment = useRemotionEnvironment();
	if (environment.isClientSideRendering) throw new Error("<Html5Audio> is not supported in @remotion/web-renderer. Use <Audio> from @remotion/media instead. See https://remotion.dev/docs/client-side-rendering/limitations");
	if (typeof freeze !== "undefined") throw new TypeError("The \"freeze\" prop is not supported on <Html5Audio />. Use <Sequence freeze={...}> to freeze media playback.");
	const { durations, setDurations } = (0, import_react.useContext)(DurationsContext);
	if (typeof props.src !== "string") throw new TypeError(`The \`<Html5Audio>\` tag requires a string for \`src\`, but got ${JSON.stringify(props.src)} instead.`);
	const preloadedSrc = usePreload(props.src);
	const onError = (0, import_react.useCallback)((e) => {
		console.log(e.currentTarget.error);
		const errMessage = `Could not play audio with src ${preloadedSrc}: ${e.currentTarget.error}. See https://remotion.dev/docs/media-playback-error for help.`;
		if (loop) {
			if (onRemotionError) {
				onRemotionError(new Error(errMessage));
				return;
			}
			cancelRender(new Error(errMessage));
		} else {
			onRemotionError?.(new Error(errMessage));
			console.warn(errMessage);
		}
	}, [
		loop,
		onRemotionError,
		preloadedSrc
	]);
	const onDuration = (0, import_react.useCallback)((src, durationInSeconds) => {
		setDurations({
			type: "got-duration",
			durationInSeconds,
			src
		});
	}, [setDurations]);
	const durationFetched = durations[getAbsoluteSrc$1(preloadedSrc)] ?? durations[getAbsoluteSrc$1(props.src)];
	validateMediaTrimProps({
		startFrom,
		endAt,
		trimBefore,
		trimAfter
	});
	const { trimBeforeValue, trimAfterValue } = resolveTrimProps({
		startFrom,
		endAt,
		trimBefore,
		trimAfter
	});
	if (loop && durationFetched !== void 0) {
		if (!Number.isFinite(durationFetched)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html5Audio, {
			...propsOtherThanLoop,
			ref,
			_remotionInternalNativeLoopPassed: true
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loop, {
			layout: "none",
			durationInFrames: calculateMediaDuration({
				trimAfter: trimAfterValue,
				mediaDurationInFrames: durationFetched * fps,
				playbackRate: props.playbackRate ?? 1,
				trimBefore: trimBeforeValue
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html5Audio, {
				...propsOtherThanLoop,
				ref,
				_remotionInternalNativeLoopPassed: true
			})
		});
	}
	if (typeof trimBeforeValue !== "undefined" || typeof trimAfterValue !== "undefined") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sequence, {
		layout: "none",
		from: 0 - (trimBeforeValue ?? 0),
		showInTimeline: false,
		durationInFrames: trimAfterValue,
		name,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html5Audio, {
			_remotionInternalNeedsDurationCalculation: Boolean(loop),
			pauseWhenBuffering: pauseWhenBuffering ?? false,
			...otherProps,
			ref
		})
	});
	validateMediaProps({
		playbackRate: props.playbackRate,
		preservePitch: props.preservePitch,
		volume: props.volume
	}, "Html5Audio");
	if (environment.isRendering) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioForRendering, {
		onDuration,
		...props,
		ref,
		onNativeError: onError,
		_remotionInternalNeedsDurationCalculation: Boolean(loop)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioForPreview, {
		_remotionInternalNativeLoopPassed: props._remotionInternalNativeLoopPassed ?? false,
		_remotionInternalStack: stack ?? null,
		shouldPreMountAudioTags: audioTagsContext !== null && audioTagsContext.numberOfAudioTags > 0,
		...props,
		ref,
		onNativeError: onError,
		onDuration,
		pauseWhenBuffering: pauseWhenBuffering ?? false,
		_remotionInternalNeedsDurationCalculation: Boolean(loop),
		showInTimeline: showInTimeline ?? true
	});
};
var Html5Audio = (0, import_react.forwardRef)(AudioRefForwardingFunction);
addSequenceStackTraces(Html5Audio);
var resolveSolidPixelDensity = (pixelDensity) => {
	if (pixelDensity === void 0) return 1;
	if (typeof pixelDensity !== "number" || !Number.isFinite(pixelDensity) || pixelDensity <= 0) throw new Error(`<Solid>: \`pixelDensity\` must be a positive finite number. Received: ${String(pixelDensity)}.`);
	return pixelDensity;
};
var solidSchema = {
	...baseSchema,
	color: {
		type: "color",
		default: "transparent",
		description: "Color"
	},
	width: {
		type: "number",
		min: 1,
		step: 1,
		default: 1920,
		description: "Width",
		hiddenFromList: false
	},
	height: {
		type: "number",
		min: 1,
		step: 1,
		default: 1080,
		description: "Height",
		hiddenFromList: false
	},
	pixelDensity: {
		type: "number",
		min: 1,
		max: 3,
		step: .1,
		default: 1,
		description: "Pixel density",
		hiddenFromList: false
	},
	...transformSchema$1
};
var SolidInner = ({ color, width, height, effects = [], className, style, pixelDensity, overrideId, reference }) => {
	const { delayRender: delayRender2, continueRender: continueRender2, cancelRender: cancelRender2 } = useDelayRender();
	const resolvedPixelDensity = resolveSolidPixelDensity(pixelDensity);
	const canvasWidth = Math.ceil(width * resolvedPixelDensity);
	const canvasHeight = Math.ceil(height * resolvedPixelDensity);
	const [outputCanvas, setOutputCanvas] = (0, import_react.useState)(null);
	const memoizedEffects = useMemoizedEffects({
		effects,
		overrideId: overrideId ?? null
	});
	const sourceCanvas = (0, import_react.useMemo)(() => {
		if (typeof document === "undefined") return null;
		const canvas = document.createElement("canvas");
		canvas.width = 1;
		canvas.height = 1;
		return canvas;
	}, []);
	const chainState = useEffectChainState();
	const canvasRef = (0, import_react.useCallback)((canvas) => {
		setOutputCanvas(canvas);
		if (typeof reference === "function") reference(canvas);
		else if (reference) reference.current = canvas;
	}, [reference]);
	(0, import_react.useEffect)(() => {
		if (!outputCanvas || !sourceCanvas) return;
		const handle = delayRender2("Solid effect chain");
		if (!chainState) {
			continueRender2(handle);
			return () => {
				continueRender2(handle);
			};
		}
		const ctx = sourceCanvas.getContext("2d", { colorSpace: "srgb" });
		if (!ctx) {
			cancelRender2(/* @__PURE__ */ new Error("Failed to acquire 2D context for <Solid> source"));
			return;
		}
		ctx.clearRect(0, 0, 1, 1);
		if (color !== void 0) {
			ctx.fillStyle = color;
			ctx.fillRect(0, 0, 1, 1);
		}
		runEffectChain({
			state: chainState.get(canvasWidth, canvasHeight),
			source: sourceCanvas,
			effects: memoizedEffects,
			output: outputCanvas,
			width: canvasWidth,
			height: canvasHeight
		}).then((completed) => {
			if (completed) continueRender2(handle);
		}).catch((err) => {
			cancelRender2(err);
		});
		return () => {
			continueRender2(handle);
		};
	}, [
		color,
		outputCanvas,
		sourceCanvas,
		chainState,
		canvasWidth,
		canvasHeight,
		delayRender2,
		continueRender2,
		cancelRender2,
		memoizedEffects
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		width: canvasWidth,
		height: canvasHeight,
		className,
		style: (0, import_react.useMemo)(() => {
			return {
				width,
				height,
				...style ?? {}
			};
		}, [
			height,
			style,
			width
		])
	});
};
var Solid = withInteractivitySchema({
	Component: (0, import_react.forwardRef)(({ effects = [], controls, color, height, width, className, durationInFrames, style, name, from, trimBefore, freeze, hidden, showInTimeline, pixelDensity, ...props2 }, ref) => {
		const memoizedEffectDefinitions = useMemoizedEffectDefinitions(effects);
		const actualRef = (0, import_react.useRef)(null);
		(0, import_react.useImperativeHandle)(ref, () => {
			return actualRef.current;
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sequence, {
			layout: "none",
			from,
			trimBefore,
			freeze,
			hidden,
			showInTimeline,
			controls,
			_remotionInternalEffects: memoizedEffectDefinitions,
			durationInFrames,
			name: name ?? "<Solid>",
			outlineRef: actualRef,
			_remotionInternalDocumentationLink: "https://www.remotion.dev/docs/solid",
			...props2,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SolidInner, {
				reference: actualRef,
				overrideId: controls?.overrideId ?? null,
				color,
				height,
				width,
				className,
				style,
				effects,
				pixelDensity
			})
		});
	}),
	componentName: "<Solid>",
	componentIdentity: "dev.remotion.remotion.Solid",
	schema: solidSchema,
	supportsEffects: true
});
Solid.displayName = "Solid";
addSequenceStackTraces(Solid);
var cachedSupport = null;
var isHtmlInCanvasSupported = () => {
	if (cachedSupport !== null) return cachedSupport;
	if (typeof document === "undefined") return false;
	const canvas = document.createElement("canvas");
	cachedSupport = typeof canvas.getContext("2d")?.drawElementImage === "function" && typeof canvas.requestPaint === "function" && typeof canvas.captureElementImage === "function" && "transferControlToOffscreen" in HTMLCanvasElement.prototype;
	return cachedSupport;
};
var HTML_IN_CANVAS_UNSUPPORTED_MESSAGE = "HTML in Canvas is not supported. Two common causes: Chrome is older than version 148 (update Chrome), or the HTML-in-Canvas flag is disabled at chrome://flags/#canvas-draw-element (enable it and restart Chrome).";
function assertHtmlInCanvasDimensions(width, height) {
	if (typeof width !== "number" || typeof height !== "number") throw new Error(`HtmlInCanvas: \`width\` and \`height\` must be numbers. Received width=${String(width)}, height=${String(height)}.`);
	if (!Number.isInteger(width) || width <= 0) throw new Error(`HtmlInCanvas: \`width\` must be a positive integer. Received: ${String(width)}.`);
	if (!Number.isInteger(height) || height <= 0) throw new Error(`HtmlInCanvas: \`height\` must be a positive integer. Received: ${String(height)}.`);
}
function resolveHtmlInCanvasPixelDensity(pixelDensity) {
	if (pixelDensity === void 0) return 1;
	if (typeof pixelDensity !== "number" || !Number.isFinite(pixelDensity) || pixelDensity <= 0) throw new Error(`HtmlInCanvas: \`pixelDensity\` must be a positive finite number. Received: ${String(pixelDensity)}.`);
	return pixelDensity;
}
var isMissingPaintRecordError = (error2) => {
	return error2 instanceof DOMException && error2.name === "InvalidStateError";
};
var missingPaintRecordMessage = "HtmlInCanvas: Expected the element to be inside the viewport during rendering, but Chrome had no cached paint record for it.";
var resizeOffscreenCanvas = ({ offscreen, width, height }) => {
	if (offscreen.width !== width) offscreen.width = width;
	if (offscreen.height !== height) offscreen.height = height;
};
var defaultOnPaint = ({ canvas, element, elementImage }) => {
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Failed to acquire 2D context for <HtmlInCanvas> canvas");
	ctx.reset();
	const transform = ctx.drawElementImage(elementImage, 0, 0);
	element.style.transform = transform.toString();
};
var HtmlInCanvasAncestorContext = (0, import_react.createContext)(false);
var HtmlInCanvasContent = (0, import_react.forwardRef)(({ width, height, effects, children, onPaint, onInit, pixelDensity, controls, style }, ref) => {
	const isInsideAncestorHtmlInCanvas = (0, import_react.useContext)(HtmlInCanvasAncestorContext);
	assertHtmlInCanvasDimensions(width, height);
	const resolvedPixelDensity = resolveHtmlInCanvasPixelDensity(pixelDensity);
	const canvasWidth = Math.ceil(width * resolvedPixelDensity);
	const canvasHeight = Math.ceil(height * resolvedPixelDensity);
	const { continueRender: continueRender2, cancelRender: cancelRender2 } = useDelayRender();
	const { isRendering } = useRemotionEnvironment();
	if (!isHtmlInCanvasSupported()) cancelRender2(new Error(HTML_IN_CANVAS_UNSUPPORTED_MESSAGE));
	const canvas2dRef = (0, import_react.useRef)(null);
	const offscreenRef = (0, import_react.useRef)(null);
	const divRef = (0, import_react.useRef)(null);
	const canvasSizeKey = `${width}x${height}@${resolvedPixelDensity}`;
	const setLayoutCanvasRef = (0, import_react.useCallback)((node) => {
		canvas2dRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	}, [ref]);
	const chainState = useEffectChainState();
	const memoizedEffects = useMemoizedEffects({
		effects,
		overrideId: controls?.overrideId ?? null
	});
	const effectsRef = (0, import_react.useRef)(memoizedEffects);
	effectsRef.current = memoizedEffects;
	const onPaintRef = (0, import_react.useRef)(onPaint);
	onPaintRef.current = onPaint;
	const onInitRef = (0, import_react.useRef)(onInit);
	onInitRef.current = onInit;
	const initializedRef = (0, import_react.useRef)(false);
	const onInitCleanupRef = (0, import_react.useRef)(null);
	const unmountedRef = (0, import_react.useRef)(false);
	const onPaintCb = (0, import_react.useCallback)(async () => {
		const element = divRef.current;
		if (!element) throw new Error("Canvas or scene element not found");
		const offscreen = offscreenRef.current;
		if (!offscreen) throw new Error("HtmlInCanvas: offscreen canvas not ready (transferControlToOffscreen failed or canvas is remounting)");
		resizeOffscreenCanvas({
			offscreen,
			width: canvasWidth,
			height: canvasHeight
		});
		try {
			const placeholderCanvas = canvas2dRef.current;
			if (!placeholderCanvas) throw new Error("Canvas not found");
			const handle = delayRender("onPaint");
			if (!initializedRef.current) {
				let initImage = null;
				try {
					initImage = placeholderCanvas.captureElementImage(element);
				} catch (error2) {
					if (isMissingPaintRecordError(error2) && !isRendering) {} else if (isMissingPaintRecordError(error2)) throw new Error(missingPaintRecordMessage);
					else throw error2;
				}
				if (initImage) {
					initializedRef.current = true;
					const currentOnInit = onInitRef.current;
					if (currentOnInit) {
						const cleanup = await currentOnInit({
							canvas: offscreen,
							element,
							elementImage: initImage,
							pixelDensity: resolvedPixelDensity
						});
						if (typeof cleanup !== "function") throw new Error("HtmlInCanvas: when `onInit` is provided, it must return a cleanup function, or a Promise that resolves to one.");
						if (unmountedRef.current) cleanup();
						else onInitCleanupRef.current = cleanup;
					}
				}
			}
			const handler = onPaintRef.current ?? defaultOnPaint;
			let elImage;
			try {
				elImage = placeholderCanvas.captureElementImage(element);
			} catch (error2) {
				if (isMissingPaintRecordError(error2) && !isRendering) {
					continueRender2(handle);
					return;
				}
				if (isMissingPaintRecordError(error2)) throw new Error(missingPaintRecordMessage);
				throw error2;
			}
			await handler({
				canvas: offscreen,
				element,
				elementImage: elImage,
				pixelDensity: resolvedPixelDensity
			});
			await runEffectChain({
				state: chainState.get(canvasWidth, canvasHeight),
				source: offscreen,
				effects: effectsRef.current,
				output: offscreen,
				width: canvasWidth,
				height: canvasHeight
			});
			continueRender2(handle);
		} catch (error2) {
			cancelRender2(error2);
		}
	}, [
		canvasHeight,
		canvasWidth,
		chainState,
		continueRender2,
		cancelRender2,
		resolvedPixelDensity,
		isRendering
	]);
	(0, import_react.useLayoutEffect)(() => {
		const placeholder = canvas2dRef.current;
		if (!placeholder) throw new Error("Canvas not found");
		placeholder.layoutSubtree = true;
		const offscreen = placeholder.transferControlToOffscreen();
		offscreenRef.current = offscreen;
		resizeOffscreenCanvas({
			offscreen,
			width: canvasWidth,
			height: canvasHeight
		});
		initializedRef.current = false;
		unmountedRef.current = false;
		placeholder.addEventListener("paint", onPaintCb);
		return () => {
			placeholder.removeEventListener("paint", onPaintCb);
			offscreenRef.current = null;
			initializedRef.current = false;
			unmountedRef.current = true;
			onInitCleanupRef.current?.();
			onInitCleanupRef.current = null;
		};
	}, [
		onPaintCb,
		cancelRender2,
		canvasWidth,
		canvasHeight
	]);
	const onPaintChangedRef = (0, import_react.useRef)(false);
	(0, import_react.useLayoutEffect)(() => {
		if (!onPaintChangedRef.current) {
			onPaintChangedRef.current = true;
			return;
		}
		const canvas = canvas2dRef.current;
		if (!canvas) return;
		canvas.requestPaint?.();
	}, [onPaint, memoizedEffects]);
	(0, import_react.useLayoutEffect)(() => {
		const canvas = canvas2dRef.current;
		if (!canvas) return;
		const handle = delayRender("waiting for first paint after canvas resize");
		canvas.addEventListener("paint", () => {
			continueRender2(handle);
		}, { once: true });
		return () => {
			continueRender2(handle);
		};
	}, [
		width,
		height,
		continueRender2,
		canvasSizeKey
	]);
	const innerStyle = (0, import_react.useMemo)(() => {
		return {
			width,
			height
		};
	}, [width, height]);
	const canvasStyle = (0, import_react.useMemo)(() => {
		return {
			width,
			height,
			...style ?? {}
		};
	}, [
		height,
		style,
		width
	]);
	if (isInsideAncestorHtmlInCanvas) throw new Error("<HtmlInCanvas> effects cannot be nested together. Chrome will only display the outer effect. Consider merging the effects into one if you can.");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HtmlInCanvasAncestorContext.Provider, {
		value: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: setLayoutCanvasRef,
			width: canvasWidth,
			height: canvasHeight,
			style: canvasStyle,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: divRef,
				style: innerStyle,
				children
			})
		}, canvasSizeKey)
	});
});
HtmlInCanvasContent.displayName = "HtmlInCanvasContent";
var HtmlInCanvasInner = (0, import_react.forwardRef)(({ width, height, effects = [], children, onPaint, onInit, pixelDensity, controls, style, durationInFrames, name, ...sequenceProps }, ref) => {
	const { durationInFrames: videoDuration } = useVideoConfig();
	const resolvedDuration = durationInFrames ?? videoDuration;
	const memoizedEffectDefinitions = useMemoizedEffectDefinitions(effects);
	const actualRef = (0, import_react.useRef)(null);
	const setCanvasRef = (0, import_react.useCallback)((node) => {
		actualRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	}, [ref]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sequence, {
		durationInFrames: resolvedDuration,
		name: name ?? "<HtmlInCanvas>",
		_remotionInternalDocumentationLink: "https://www.remotion.dev/docs/remotion/html-in-canvas",
		controls,
		_remotionInternalEffects: memoizedEffectDefinitions,
		outlineRef: actualRef,
		layout: "none",
		...sequenceProps,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HtmlInCanvasContent, {
			ref: setCanvasRef,
			width,
			height,
			effects,
			onPaint,
			onInit,
			pixelDensity,
			controls,
			style,
			children
		})
	});
});
HtmlInCanvasInner.displayName = "HtmlInCanvas";
var HtmlInCanvasWrapped = withInteractivitySchema({
	Component: HtmlInCanvasInner,
	componentName: "<HtmlInCanvas>",
	componentIdentity: "dev.remotion.remotion.HtmlInCanvas",
	schema: {
		...baseSchema,
		pixelDensity: {
			type: "number",
			min: 1,
			max: 3,
			step: .1,
			default: 1,
			description: "Pixel density",
			hiddenFromList: false
		},
		...transformSchema$1
	},
	supportsEffects: true
});
var HtmlInCanvas = Object.assign(HtmlInCanvasWrapped, { isSupported: isHtmlInCanvasSupported });
HtmlInCanvas.displayName = "HtmlInCanvas";
addSequenceStackTraces(HtmlInCanvas);
function truncateSrcForLabel(src) {
	if (src.startsWith("data:") && src.length > 100) return src.slice(0, 60) + "...[" + src.length + " chars total]";
	return src;
}
var canvasImageSchema = {
	...baseSchema,
	fit: {
		type: "enum",
		default: "fill",
		description: "Fit",
		variants: {
			fill: {},
			contain: {},
			cover: {}
		}
	},
	...transformSchema$1
};
var makeAbortError = () => {
	if (typeof DOMException !== "undefined") return new DOMException("Image loading was aborted", "AbortError");
	const error2 = /* @__PURE__ */ new Error("Image loading was aborted");
	error2.name = "AbortError";
	return error2;
};
var loadImage = ({ src, signal }) => {
	return new Promise((resolve, reject) => {
		const image = new Image();
		let settled = false;
		function cleanup() {
			image.onload = null;
			image.onerror = null;
		}
		function settle(callback) {
			if (settled) return;
			settled = true;
			cleanup();
			callback();
		}
		function onAbort() {
			settle(() => reject(makeAbortError()));
		}
		image.onload = () => {
			Promise.resolve(image.decode?.()).catch(() => {}).then(() => {
				const imageWidth = image.naturalWidth || image.width;
				const imageHeight = image.naturalHeight || image.height;
				if (imageWidth <= 0 || imageHeight <= 0) {
					settle(() => reject(/* @__PURE__ */ new Error(`Could not determine dimensions for <CanvasImage> with src="${truncateSrcForLabel(src)}"`)));
					return;
				}
				settle(() => resolve({
					element: image,
					width: imageWidth,
					height: imageHeight
				}));
			});
		};
		image.onerror = () => {
			settle(() => reject(/* @__PURE__ */ new Error(`Could not load <CanvasImage> with src="${truncateSrcForLabel(src)}"`)));
		};
		signal.addEventListener("abort", onAbort, { once: true });
		if (signal.aborted) {
			onAbort();
			return;
		}
		image.crossOrigin = "anonymous";
		image.src = src;
	});
};
function exponentialBackoff(errorCount) {
	return 1e3 * 2 ** (errorCount - 1);
}
var CanvasImageContent = (0, import_react.forwardRef)(({ src, width, height, fit = "fill", effects, controls, onError, className, style, id, pauseWhenLoading, maxRetries = 2, delayRenderRetries, delayRenderTimeoutInMilliseconds, refForOutline, ...canvasProps }, ref) => {
	const { delayRender: delayRender2, continueRender: continueRender2, cancelRender: cancelRender2 } = useDelayRender();
	const { delayPlayback } = useBufferState();
	const [outputCanvas, setOutputCanvas] = (0, import_react.useState)(null);
	const [loadedImage, setLoadedImage] = (0, import_react.useState)(null);
	const actualSrc = usePreload(src);
	const chainState = useEffectChainState();
	const memoizedEffects = useMemoizedEffects({
		effects,
		overrideId: controls?.overrideId ?? null
	});
	const sequenceContext = (0, import_react.useContext)(SequenceContext);
	const sourceCanvas = (0, import_react.useMemo)(() => {
		if (typeof document === "undefined") return null;
		return document.createElement("canvas");
	}, []);
	const canvasRef = (0, import_react.useCallback)((canvas) => {
		setOutputCanvas(canvas);
		if (refForOutline) refForOutline.current = canvas;
		if (typeof ref === "function") ref(canvas);
		else if (ref) ref.current = canvas;
	}, [ref, refForOutline]);
	(0, import_react.useEffect)(() => {
		const isPremounting = Boolean(sequenceContext?.premounting);
		const isPostmounting = Boolean(sequenceContext?.postmounting);
		const handle = delayRender2(`Rendering <CanvasImage> with src="${truncateSrcForLabel(actualSrc)}"`, {
			retries: delayRenderRetries ?? void 0,
			timeoutInMilliseconds: delayRenderTimeoutInMilliseconds ?? void 0
		});
		const unblock = pauseWhenLoading && !isPremounting && !isPostmounting ? delayPlayback().unblock : () => {};
		const controller = new AbortController();
		let cancelled = false;
		let continued = false;
		let errorCount = 0;
		let timeoutId = null;
		setLoadedImage(null);
		const continueRenderOnce = () => {
			if (continued) return;
			continued = true;
			unblock();
			continueRender2(handle);
		};
		const attemptLoad = () => {
			loadImage({
				src: actualSrc,
				signal: controller.signal
			}).then((image) => {
				if (cancelled) return;
				setLoadedImage(image);
			}).then(() => {
				if (!cancelled) continueRenderOnce();
			}).catch((err) => {
				if (err.name === "AbortError") {
					continueRenderOnce();
					return;
				}
				errorCount++;
				if (errorCount <= maxRetries) {
					const backoff = exponentialBackoff(errorCount);
					console.warn(`Could not load <CanvasImage> with src="${truncateSrcForLabel(actualSrc)}", retrying in ${backoff}ms`);
					timeoutId = setTimeout(() => {
						if (!cancelled) attemptLoad();
					}, backoff);
				} else if (onError) {
					onError(err);
					continueRenderOnce();
				} else cancelRender2(err);
			});
		};
		attemptLoad();
		return () => {
			cancelled = true;
			if (timeoutId !== null) clearTimeout(timeoutId);
			controller.abort();
			continueRenderOnce();
		};
	}, [
		actualSrc,
		cancelRender2,
		continueRender2,
		delayPlayback,
		delayRender2,
		delayRenderRetries,
		delayRenderTimeoutInMilliseconds,
		maxRetries,
		onError,
		pauseWhenLoading,
		sequenceContext?.postmounting,
		sequenceContext?.premounting
	]);
	(0, import_react.useEffect)(() => {
		if (!loadedImage || !outputCanvas || !sourceCanvas) return;
		const handle = delayRender2(`Applying effects to <CanvasImage> with src="${truncateSrcForLabel(actualSrc)}"`);
		let cancelled = false;
		let continued = false;
		const continueRenderOnce = () => {
			if (continued) return;
			continued = true;
			continueRender2(handle);
		};
		const canvasWidth = width ?? loadedImage.width;
		const canvasHeight = height ?? loadedImage.height;
		const sourceContext = sourceCanvas.getContext("2d", { colorSpace: "srgb" });
		if (!sourceContext) {
			cancelRender2(/* @__PURE__ */ new Error("Could not get 2D context for <CanvasImage> source canvas"));
			continueRenderOnce();
			return () => {
				continueRenderOnce();
			};
		}
		sourceCanvas.width = canvasWidth;
		sourceCanvas.height = canvasHeight;
		outputCanvas.width = canvasWidth;
		outputCanvas.height = canvasHeight;
		sourceContext.clearRect(0, 0, canvasWidth, canvasHeight);
		sourceContext.drawImage(loadedImage.element, ...calculateImageFit(fit, {
			width: loadedImage.width,
			height: loadedImage.height
		}, {
			width: canvasWidth,
			height: canvasHeight
		}));
		runEffectChain({
			state: chainState.get(canvasWidth, canvasHeight),
			source: sourceCanvas,
			effects: memoizedEffects,
			output: outputCanvas,
			width: canvasWidth,
			height: canvasHeight
		}).then((completed) => {
			if (completed && !cancelled) continueRenderOnce();
		}).catch((err) => {
			if (cancelled) return;
			if (onError) {
				onError(err);
				continueRenderOnce();
			} else cancelRender2(err);
		});
		return () => {
			cancelled = true;
			continueRenderOnce();
		};
	}, [
		actualSrc,
		cancelRender2,
		chainState,
		continueRender2,
		delayRender2,
		fit,
		height,
		loadedImage,
		memoizedEffects,
		onError,
		outputCanvas,
		sourceCanvas,
		width
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		...canvasProps,
		ref: canvasRef,
		width,
		height,
		className,
		style,
		id
	});
});
CanvasImageContent.displayName = "CanvasImageContent";
var CanvasImage = withInteractivitySchema({
	Component: (0, import_react.forwardRef)(({ src, width, height, fit, effects = [], className, style, id, onError, pauseWhenLoading, maxRetries, delayRenderRetries, delayRenderTimeoutInMilliseconds, durationInFrames, from, trimBefore, freeze, hidden, name, showInTimeline, stack, controls, _remotionInternalDocumentationLink, outlineRef, ...canvasProps }, ref) => {
		if (!src) throw new Error("No \"src\" prop was passed to <CanvasImage>.");
		const memoizedEffectDefinitions = useMemoizedEffectDefinitions(effects);
		const actualRef = (0, import_react.useRef)(null);
		(0, import_react.useImperativeHandle)(ref, () => {
			return actualRef.current;
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sequence, {
			layout: "none",
			from: from ?? 0,
			trimBefore,
			durationInFrames: durationInFrames ?? Infinity,
			freeze,
			hidden,
			showInTimeline: showInTimeline ?? true,
			name: name ?? "<CanvasImage>",
			_remotionInternalDocumentationLink: _remotionInternalDocumentationLink ?? "https://www.remotion.dev/docs/canvasimage",
			controls,
			_remotionInternalEffects: memoizedEffectDefinitions,
			_remotionInternalIsMedia: {
				type: "image",
				src
			},
			_remotionInternalStack: stack,
			outlineRef: outlineRef ?? actualRef,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanvasImageContent, {
				ref: actualRef,
				src,
				width,
				height,
				fit,
				effects,
				controls,
				className,
				style,
				id,
				onError,
				pauseWhenLoading,
				maxRetries,
				delayRenderRetries,
				delayRenderTimeoutInMilliseconds,
				refForOutline: outlineRef ?? null,
				...canvasProps
			})
		});
	}),
	componentName: "<CanvasImage>",
	componentIdentity: "dev.remotion.remotion.CanvasImage",
	schema: canvasImageSchema,
	supportsEffects: true
});
CanvasImage.displayName = "CanvasImage";
addSequenceStackTraces(CanvasImage);
var IFrameRefForwarding = ({ onLoad, onError, delayRenderRetries, delayRenderTimeoutInMilliseconds, ...props2 }, ref) => {
	const { delayRender: delayRender2, continueRender: continueRender2 } = useDelayRender();
	const [handle] = (0, import_react.useState)(() => delayRender2(`Loading <IFrame> with source ${props2.src}`, {
		retries: delayRenderRetries ?? void 0,
		timeoutInMilliseconds: delayRenderTimeoutInMilliseconds ?? void 0
	}));
	const didLoad = (0, import_react.useCallback)((e) => {
		continueRender2(handle);
		onLoad?.(e);
	}, [
		handle,
		onLoad,
		continueRender2
	]);
	const didGetError = (0, import_react.useCallback)((e) => {
		continueRender2(handle);
		if (onError) onError(e);
		else console.error("Error loading iframe:", e, "Handle the event using the onError() prop to make this message disappear.");
	}, [
		handle,
		onError,
		continueRender2
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
		referrerPolicy: "strict-origin-when-cross-origin",
		...props2,
		ref,
		onError: didGetError,
		onLoad: didLoad
	});
};
(0, import_react.forwardRef)(IFrameRefForwarding);
function exponentialBackoff2(errorCount) {
	return 1e3 * 2 ** (errorCount - 1);
}
var ImgContent = ({ onError, maxRetries = 2, src, pauseWhenLoading, delayRenderRetries, delayRenderTimeoutInMilliseconds, onImageFrame, crossOrigin, decoding, ref, refForOutline, ...props2 }) => {
	const imageRef = (0, import_react.useRef)(null);
	const errors = (0, import_react.useRef)({});
	const { delayPlayback } = useBufferState();
	const sequenceContext = (0, import_react.useContext)(SequenceContext);
	const imageCallbackRef = (0, import_react.useCallback)((img) => {
		imageRef.current = img;
		refForOutline.current = img;
		if (typeof ref === "function") ref(img);
		else if (ref) ref.current = img;
	}, [ref, refForOutline]);
	const actualSrc = usePreload(src);
	const retryIn = (0, import_react.useCallback)((timeout) => {
		if (!imageRef.current) return;
		const currentSrc = imageRef.current.src;
		setTimeout(() => {
			if (!imageRef.current) return;
			const newSrc = imageRef.current?.src;
			if (newSrc !== currentSrc) return;
			imageRef.current.removeAttribute("src");
			imageRef.current.setAttribute("src", newSrc);
		}, timeout);
	}, []);
	const { delayRender: delayRender2, continueRender: continueRender2, cancelRender: cancelRender2 } = useDelayRender();
	const didGetError = (0, import_react.useCallback)((e) => {
		if (!errors.current) return;
		errors.current[imageRef.current?.src] = (errors.current[imageRef.current?.src] ?? 0) + 1;
		if (onError && (errors.current[imageRef.current?.src] ?? 0) > maxRetries) {
			onError(e);
			return;
		}
		if ((errors.current[imageRef.current?.src] ?? 0) <= maxRetries) {
			const backoff = exponentialBackoff2(errors.current[imageRef.current?.src] ?? 0);
			console.warn(`Could not load image with source ${truncateSrcForLabel(imageRef.current?.src)}, retrying again in ${backoff}ms`);
			retryIn(backoff);
			return;
		}
		try {
			cancelRender2("Error loading image with src: " + truncateSrcForLabel(imageRef.current?.src));
		} catch {}
	}, [
		cancelRender2,
		maxRetries,
		onError,
		retryIn
	]);
	if (typeof window !== "undefined") {
		const isPremounting = Boolean(sequenceContext?.premounting);
		const isPostmounting = Boolean(sequenceContext?.postmounting);
		(0, import_react.useLayoutEffect)(() => {
			if (window.process?.env?.NODE_ENV === "test") {
				if (imageRef.current) imageRef.current.src = actualSrc;
				return;
			}
			const { current } = imageRef;
			if (!current) return;
			const newHandle = delayRender2("Loading <Img> with src=" + truncateSrcForLabel(actualSrc), {
				retries: delayRenderRetries ?? void 0,
				timeoutInMilliseconds: delayRenderTimeoutInMilliseconds ?? void 0
			});
			const unblock = pauseWhenLoading && !isPremounting && !isPostmounting ? delayPlayback().unblock : () => {};
			let unmounted = false;
			const onComplete = () => {
				if (unmounted) {
					continueRender2(newHandle);
					return;
				}
				if ((errors.current[imageRef.current?.src] ?? 0) > 0) {
					delete errors.current[imageRef.current?.src];
					console.info(`Retry successful - ${truncateSrcForLabel(imageRef.current?.src)} is now loaded`);
				}
				if (current) onImageFrame?.(current);
				unblock();
				continueRender2(newHandle);
			};
			if (!imageRef.current) {
				onComplete();
				return;
			}
			current.src = actualSrc;
			current.decode().then(onComplete).catch((err) => {
				console.warn(err);
				if (current.complete && current.naturalWidth > 0 && current.naturalHeight > 0) onComplete();
				else current.addEventListener("load", onComplete);
			});
			return () => {
				unmounted = true;
				current.removeEventListener("load", onComplete);
				unblock();
				continueRender2(newHandle);
			};
		}, [
			actualSrc,
			delayPlayback,
			delayRenderRetries,
			delayRenderTimeoutInMilliseconds,
			pauseWhenLoading,
			isPremounting,
			isPostmounting,
			onImageFrame,
			continueRender2,
			delayRender2
		]);
	}
	const { isClientSideRendering, isRendering } = useRemotionEnvironment();
	const crossOriginValue = getCrossOriginValue({
		crossOrigin,
		requestsVideoFrame: false,
		isClientSideRendering
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		...props2,
		ref: imageCallbackRef,
		crossOrigin: crossOriginValue,
		onError: didGetError,
		decoding: isRendering ? "sync" : decoding
	});
};
var NativeImgInner = ({ hidden, name, stack, showInTimeline, src, from, trimBefore, durationInFrames, freeze, controls, outlineRef: refForOutline, ...props2 }) => {
	if (!src) throw new Error("No \"src\" prop was passed to <Img>.");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sequence, {
		layout: "none",
		from: from ?? 0,
		trimBefore,
		durationInFrames: durationInFrames ?? Infinity,
		freeze,
		_remotionInternalStack: stack,
		_remotionInternalDocumentationLink: "https://www.remotion.dev/docs/img",
		_remotionInternalIsMedia: {
			type: "image",
			src
		},
		name: name ?? "<Img>",
		controls,
		showInTimeline: showInTimeline ?? true,
		hidden,
		outlineRef: refForOutline,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImgContent, {
			src,
			refForOutline,
			...props2
		})
	});
};
var CanvasImageWithPrivateProps = CanvasImage;
var imgSchema = {
	...baseSchema,
	...transformSchema$1
};
var imgCanvasFallbackIncompatibleProps = /* @__PURE__ */ new Set([
	"alt",
	"crossOrigin",
	"decoding",
	"fetchPriority",
	"loading",
	"onError",
	"onImageFrame",
	"onLoad",
	"sizes",
	"srcSet",
	"useMap"
]);
var getIncompatiblePropNames = (props2) => Object.keys(props2).filter((key) => props2[key] !== void 0 && imgCanvasFallbackIncompatibleProps.has(key));
var formatPropList = (props2) => {
	return props2.map((prop) => `"${prop}"`).join(", ");
};
var validateCanvasImageFallbackProps = ({ props: props2, ref, width, height }) => {
	if (typeof width === "string" || typeof height === "string") throw new Error("The \"width\" and \"height\" props must be numbers on <Img> when effects are passed, because <Img> renders a <CanvasImage>. Use numeric props or CSS dimensions in \"style\".");
	const conflictingProps = getIncompatiblePropNames(props2);
	if (ref !== null && ref !== void 0) conflictingProps.unshift("ref");
	if (conflictingProps.length === 0) return;
	throw new Error(`The ${formatPropList(conflictingProps)} prop${conflictingProps.length === 1 ? "" : "s"} cannot be used on <Img> when effects are passed, because <Img> renders a <canvas> instead of a native <img>. Remove ${conflictingProps.length === 1 ? "this prop" : "these props"}.`);
};
var getFitFromObjectFit = (style) => {
	const objectFit = style?.objectFit;
	if (objectFit === "fill" || objectFit === "contain" || objectFit === "cover") return objectFit;
};
var ImgInner = ({ effects = [], ref, hidden, name, stack, showInTimeline, src, from, trimBefore, durationInFrames, freeze, controls, width, height, className, style, id, pauseWhenLoading, maxRetries, delayRenderRetries, delayRenderTimeoutInMilliseconds, ...props2 }) => {
	const refForOutline = (0, import_react.useRef)(null);
	if (effects.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeImgInner, {
		...props2,
		ref,
		hidden,
		name,
		stack,
		showInTimeline,
		src,
		from,
		trimBefore,
		durationInFrames,
		freeze,
		controls,
		width,
		height,
		className,
		style,
		id,
		pauseWhenLoading,
		maxRetries,
		delayRenderRetries,
		delayRenderTimeoutInMilliseconds,
		outlineRef: refForOutline
	});
	if (!src) throw new Error("No \"src\" prop was passed to <Img>.");
	validateCanvasImageFallbackProps({
		props: props2,
		ref,
		width,
		height
	});
	const canvasWidth = typeof width === "number" ? width : void 0;
	const canvasHeight = typeof height === "number" ? height : void 0;
	const canvasProps = props2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanvasImageWithPrivateProps, {
		src,
		width: canvasWidth,
		height: canvasHeight,
		fit: getFitFromObjectFit(style) ?? "fill",
		effects,
		className,
		style,
		id,
		pauseWhenLoading,
		maxRetries,
		delayRenderRetries,
		delayRenderTimeoutInMilliseconds,
		from,
		trimBefore,
		durationInFrames,
		freeze,
		hidden,
		name: name ?? "<Img>",
		showInTimeline,
		stack,
		_remotionInternalDocumentationLink: "https://www.remotion.dev/docs/img",
		controls,
		outlineRef: refForOutline,
		...canvasProps
	});
};
var Img = withInteractivitySchema({
	Component: ImgInner,
	componentName: "<Img>",
	componentIdentity: "dev.remotion.remotion.Img",
	schema: imgSchema,
	supportsEffects: true
});
addSequenceStackTraces(Img);
var interactiveElementSchema = {
	...baseSchema,
	...transformSchema$1,
	...textSchema
};
var setRef = (ref, value) => {
	if (typeof ref === "function") ref(value);
	else if (ref) ref.current = value;
};
var makeInteractiveElement = (tag, displayName) => {
	const Inner = (0, import_react.forwardRef)((propsWithControls, ref) => {
		const { durationInFrames, from, trimBefore, freeze, hidden, name, showInTimeline, stack, controls, ...props2 } = propsWithControls;
		const refForOutline = (0, import_react.useRef)(null);
		const callbackRef = (0, import_react.useCallback)((element) => {
			refForOutline.current = element;
			setRef(ref, element);
		}, [ref]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sequence, {
			layout: "none",
			from: from ?? 0,
			trimBefore,
			durationInFrames: durationInFrames ?? Infinity,
			freeze,
			hidden,
			name: name ?? displayName,
			showInTimeline: showInTimeline ?? true,
			controls,
			_remotionInternalStack: stack,
			_remotionInternalDocumentationLink: "https://www.remotion.dev/docs/interactive",
			outlineRef: refForOutline,
			children: import_react.createElement(tag, {
				...props2,
				ref: callbackRef
			})
		});
	});
	Inner.displayName = displayName;
	const Wrapped = withInteractivitySchema({
		Component: Inner,
		componentName: displayName,
		componentIdentity: `dev.remotion.remotion.${displayName.slice(1, -1)}`,
		schema: interactiveElementSchema,
		supportsEffects: false
	});
	Wrapped.displayName = displayName;
	addSequenceStackTraces(Wrapped);
	return Wrapped;
};
makeInteractiveElement("a", "<Interactive.A>"), makeInteractiveElement("article", "<Interactive.Article>"), makeInteractiveElement("aside", "<Interactive.Aside>"), makeInteractiveElement("button", "<Interactive.Button>"), makeInteractiveElement("circle", "<Interactive.Circle>"), makeInteractiveElement("code", "<Interactive.Code>"), makeInteractiveElement("div", "<Interactive.Div>"), makeInteractiveElement("ellipse", "<Interactive.Ellipse>"), makeInteractiveElement("em", "<Interactive.Em>"), makeInteractiveElement("footer", "<Interactive.Footer>"), makeInteractiveElement("g", "<Interactive.G>"), makeInteractiveElement("h1", "<Interactive.H1>"), makeInteractiveElement("h2", "<Interactive.H2>"), makeInteractiveElement("h3", "<Interactive.H3>"), makeInteractiveElement("h4", "<Interactive.H4>"), makeInteractiveElement("h5", "<Interactive.H5>"), makeInteractiveElement("h6", "<Interactive.H6>"), makeInteractiveElement("header", "<Interactive.Header>"), makeInteractiveElement("label", "<Interactive.Label>"), makeInteractiveElement("li", "<Interactive.Li>"), makeInteractiveElement("line", "<Interactive.Line>"), makeInteractiveElement("main", "<Interactive.Main>"), makeInteractiveElement("nav", "<Interactive.Nav>"), makeInteractiveElement("ol", "<Interactive.Ol>"), makeInteractiveElement("p", "<Interactive.P>"), makeInteractiveElement("path", "<Interactive.Path>"), makeInteractiveElement("pre", "<Interactive.Pre>"), makeInteractiveElement("rect", "<Interactive.Rect>"), makeInteractiveElement("section", "<Interactive.Section>"), makeInteractiveElement("small", "<Interactive.Small>"), makeInteractiveElement("span", "<Interactive.Span>"), makeInteractiveElement("strong", "<Interactive.Strong>"), makeInteractiveElement("svg", "<Interactive.Svg>"), makeInteractiveElement("text", "<Interactive.Text>"), makeInteractiveElement("ul", "<Interactive.Ul>");
var compositionsRef = import_react.createRef();
var CompositionManagerProvider = ({ children, onlyRenderComposition, currentCompositionMetadata, initialCompositions, initialCanvasContent }) => {
	const [folders, setFolders] = (0, import_react.useState)([]);
	const [canvasContent, setCanvasContent] = (0, import_react.useState)(initialCanvasContent);
	const [compositions, setCompositions] = (0, import_react.useState)(initialCompositions);
	const currentcompositionsRef = (0, import_react.useRef)(compositions);
	const updateCompositions = (0, import_react.useCallback)((updateComps) => {
		setCompositions((comps) => {
			const updated = updateComps(comps);
			currentcompositionsRef.current = updated;
			return updated;
		});
	}, []);
	const registerComposition = (0, import_react.useCallback)((comp) => {
		updateCompositions((comps) => {
			if (comps.find((c2) => c2.id === comp.id)) throw new Error(`Multiple composition with id ${comp.id} are registered.`);
			return [...comps, comp];
		});
	}, [updateCompositions]);
	const unregisterComposition = (0, import_react.useCallback)((id) => {
		setCompositions((comps) => {
			return comps.filter((c2) => c2.id !== id);
		});
	}, []);
	const registerFolder = (0, import_react.useCallback)((name, parent, nonce, stack) => {
		setFolders((prevFolders) => {
			return [...prevFolders, {
				name,
				parent,
				nonce,
				stack
			}];
		});
	}, []);
	const unregisterFolder = (0, import_react.useCallback)((name, parent) => {
		setFolders((prevFolders) => {
			return prevFolders.filter((p) => !(p.name === name && p.parent === parent));
		});
	}, []);
	(0, import_react.useImperativeHandle)(compositionsRef, () => {
		return { getCompositions: () => currentcompositionsRef.current };
	}, []);
	const compositionManagerSetters = (0, import_react.useMemo)(() => {
		return {
			registerComposition,
			unregisterComposition,
			registerFolder,
			unregisterFolder,
			setCanvasContent,
			onlyRenderComposition
		};
	}, [
		registerComposition,
		registerFolder,
		unregisterComposition,
		unregisterFolder,
		onlyRenderComposition
	]);
	const compositionManagerContextValue = (0, import_react.useMemo)(() => {
		return {
			compositions,
			folders,
			currentCompositionMetadata,
			canvasContent
		};
	}, [
		compositions,
		folders,
		currentCompositionMetadata,
		canvasContent
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompositionManager.Provider, {
		value: compositionManagerContextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompositionSetters.Provider, {
			value: compositionManagerSetters,
			children
		})
	});
};
var exports_default_css = {};
__export(exports_default_css, {
	makeDefaultPreviewCSS: () => makeDefaultPreviewCSS,
	injectCSS: () => injectCSS,
	OBJECTFIT_CONTAIN_CLASS_NAME: () => OBJECTFIT_CONTAIN_CLASS_NAME
});
var injected = {};
var injectCSS = (css) => {
	if (typeof document === "undefined") return () => {};
	if (injected[css]) return () => {};
	const head = document.head || document.getElementsByTagName("head")[0];
	const style = document.createElement("style");
	style.appendChild(document.createTextNode(css));
	head.prepend(style);
	injected[css] = style;
	return () => {
		const styleElement = injected[css];
		if (styleElement) {
			if (styleElement.parentNode) styleElement.parentNode.removeChild(styleElement);
			delete injected[css];
		}
	};
};
var OBJECTFIT_CONTAIN_CLASS_NAME = "__remotion_objectfitcontain";
var makeDefaultPreviewCSS = (scope, backgroundColor) => {
	if (!scope) return `
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
	    background-color: ${backgroundColor};
    }
    .${OBJECTFIT_CONTAIN_CLASS_NAME} {
      object-fit: contain;
    }
    `;
	return `
    ${scope} * {
      box-sizing: border-box;
    }
    ${scope} *:-webkit-full-screen {
      width: 100%;
      height: 100%;
    }
    ${scope} .${OBJECTFIT_CONTAIN_CLASS_NAME} {
      object-fit: contain;
    }
  `;
};
var REMOTION_STUDIO_CONTAINER_ELEMENT = "__remotion-studio-container";
var getPreviewDomElement = () => {
	return document.getElementById(REMOTION_STUDIO_CONTAINER_ELEMENT);
};
var MaxMediaCacheSizeContext = import_react.createContext(null);
var Root = null;
var listeners = [];
var getRoot = () => {
	return Root;
};
var waitForRoot = (fn) => {
	if (Root) {
		fn(Root);
		return () => {};
	}
	listeners.push(fn);
	return () => {
		listeners = listeners.filter((l) => l !== fn);
	};
};
var MediaEnabledContext = (0, import_react.createContext)(null);
var useVideoEnabled = () => {
	const context = (0, import_react.useContext)(MediaEnabledContext);
	if (!context) return window.remotion_videoEnabled;
	if (context.videoEnabled === null) return window.remotion_videoEnabled;
	return context.videoEnabled;
};
var useAudioEnabled = () => {
	const context = (0, import_react.useContext)(MediaEnabledContext);
	if (!context) return window.remotion_audioEnabled;
	if (context.audioEnabled === null) return window.remotion_audioEnabled;
	return context.audioEnabled;
};
var MediaEnabledProvider = ({ children, videoEnabled, audioEnabled }) => {
	const value = (0, import_react.useMemo)(() => ({
		videoEnabled,
		audioEnabled
	}), [videoEnabled, audioEnabled]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaEnabledContext.Provider, {
		value,
		children
	});
};
var RemotionRootContexts = ({ children, numberOfAudioTags, logLevel, audioLatencyHint, previewSampleRate, videoEnabled, audioEnabled, frameState }) => {
	const nonceContext = (0, import_react.useMemo)(() => {
		let counter = 0;
		return { getNonce: () => counter++ };
	}, []);
	const logging = (0, import_react.useMemo)(() => {
		return {
			logLevel,
			mountTime: Date.now()
		};
	}, [logLevel]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogLevelContext.Provider, {
		value: logging,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NonceContext.Provider, {
			value: nonceContext,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineContextProvider, {
				frameState,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaEnabledProvider, {
					videoEnabled,
					audioEnabled,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorPropsProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrefetchProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SequenceManagerProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DurationsContextProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BufferingProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SharedAudioContextProvider, {
						audioLatencyHint,
						audioEnabled,
						previewSampleRate,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SharedAudioTagsContextProvider, {
							numberOfAudioTags,
							children
						})
					}) }) }) }) }) })
				})
			})
		})
	});
};
var validCodecs$1 = [
	"h264",
	"h265",
	"vp8",
	"vp9",
	"av1",
	"mp3",
	"aac",
	"wav",
	"prores",
	"h264-mkv",
	"h264-ts",
	"gif"
];
function validateCodec$1(defaultCodec, location, name) {
	if (typeof defaultCodec === "undefined") return;
	if (typeof defaultCodec !== "string") throw new TypeError(`The "${name}" prop ${location} must be a string, but you passed a value of type ${typeof defaultCodec}.`);
	if (!validCodecs$1.includes(defaultCodec)) throw new Error(`The "${name}" prop ${location} must be one of ${validCodecs$1.join(", ")}, but you passed ${defaultCodec}.`);
}
var validateCalculated = ({ calculated, compositionId, compositionFps, compositionHeight, compositionWidth, compositionDurationInFrames }) => {
	const calculateMetadataErrorLocation = `calculated by calculateMetadata() for the composition "${compositionId}"`;
	const defaultErrorLocation = `of the "<Composition />" component with the id "${compositionId}"`;
	const width = calculated?.width ?? compositionWidth ?? void 0;
	validateDimension$2(width, "width", calculated?.width ? calculateMetadataErrorLocation : defaultErrorLocation);
	const height = calculated?.height ?? compositionHeight ?? void 0;
	validateDimension$2(height, "height", calculated?.height ? calculateMetadataErrorLocation : defaultErrorLocation);
	const fps = calculated?.fps ?? compositionFps ?? null;
	validateFps$2(fps, calculated?.fps ? calculateMetadataErrorLocation : defaultErrorLocation, false);
	const durationInFrames = calculated?.durationInFrames ?? compositionDurationInFrames ?? null;
	validateDurationInFrames$2(durationInFrames, {
		allowFloats: false,
		component: `of the "<Composition />" component with the id "${compositionId}"`
	});
	const defaultCodec = calculated?.defaultCodec;
	validateCodec$1(defaultCodec, calculateMetadataErrorLocation, "defaultCodec");
	return {
		width,
		height,
		fps,
		durationInFrames,
		defaultCodec,
		defaultOutName: calculated?.defaultOutName,
		defaultVideoImageFormat: calculated?.defaultVideoImageFormat,
		defaultPixelFormat: calculated?.defaultPixelFormat,
		defaultProResProfile: calculated?.defaultProResProfile,
		defaultSampleRate: calculated?.defaultSampleRate
	};
};
var resolveVideoConfig = ({ calculateMetadata, signal, defaultProps, inputProps: originalProps, compositionId, compositionDurationInFrames, compositionFps, compositionHeight, compositionWidth }) => {
	const calculatedProm = calculateMetadata ? calculateMetadata({
		defaultProps,
		props: originalProps,
		abortSignal: signal,
		compositionId,
		isRendering: getRemotionEnvironment().isRendering
	}) : null;
	if (calculatedProm !== null && typeof calculatedProm === "object" && "then" in calculatedProm) return calculatedProm.then((c2) => {
		const { height, width, durationInFrames, fps, defaultCodec, defaultOutName, defaultVideoImageFormat, defaultPixelFormat, defaultProResProfile, defaultSampleRate } = validateCalculated({
			calculated: c2,
			compositionDurationInFrames,
			compositionFps,
			compositionHeight,
			compositionWidth,
			compositionId
		});
		return {
			width,
			height,
			fps,
			durationInFrames,
			id: compositionId,
			defaultProps: serializeThenDeserializeInStudio(defaultProps),
			props: serializeThenDeserializeInStudio(c2.props ?? originalProps),
			defaultCodec: defaultCodec ?? null,
			defaultOutName: defaultOutName ?? null,
			defaultVideoImageFormat: defaultVideoImageFormat ?? null,
			defaultPixelFormat: defaultPixelFormat ?? null,
			defaultProResProfile: defaultProResProfile ?? null,
			defaultSampleRate: defaultSampleRate ?? null
		};
	});
	const data = validateCalculated({
		calculated: calculatedProm,
		compositionDurationInFrames,
		compositionFps,
		compositionHeight,
		compositionWidth,
		compositionId
	});
	if (calculatedProm === null) return {
		...data,
		id: compositionId,
		defaultProps: serializeThenDeserializeInStudio(defaultProps ?? {}),
		props: serializeThenDeserializeInStudio(originalProps),
		defaultCodec: null,
		defaultOutName: null,
		defaultVideoImageFormat: null,
		defaultPixelFormat: null,
		defaultProResProfile: null,
		defaultSampleRate: null
	};
	return {
		...data,
		id: compositionId,
		defaultProps: serializeThenDeserializeInStudio(defaultProps ?? {}),
		props: serializeThenDeserializeInStudio(calculatedProm.props ?? originalProps),
		defaultCodec: calculatedProm.defaultCodec ?? null,
		defaultOutName: calculatedProm.defaultOutName ?? null,
		defaultVideoImageFormat: calculatedProm.defaultVideoImageFormat ?? null,
		defaultPixelFormat: calculatedProm.defaultPixelFormat ?? null,
		defaultProResProfile: calculatedProm.defaultProResProfile ?? null,
		defaultSampleRate: calculatedProm.defaultSampleRate ?? null
	};
};
var resolveVideoConfigOrCatch = (params) => {
	try {
		return {
			type: "success",
			result: resolveVideoConfig(params)
		};
	} catch (err) {
		return {
			type: "error",
			error: err
		};
	}
};
var SequenceStackTracesUpdateContext = import_react.createContext(() => {});
var getEnvVariables = () => {
	if (getRemotionEnvironment().isRendering) {
		const param = window.remotion_envVariables;
		if (!param) return {};
		return {
			...JSON.parse(param),
			NODE_ENV: "production"
		};
	}
	return { NODE_ENV: "production" };
};
var setupEnvVariables = () => {
	const env = getEnvVariables();
	if (!window.process) window.process = {};
	if (!window.process.env) window.process.env = {};
	Object.keys(env).forEach((key) => {
		window.process.env[key] = env[key];
	});
};
var CurrentScaleContext = import_react.createContext(null);
var PreviewSizeContext = (0, import_react.createContext)({
	setSize: () => {},
	size: {
		size: "auto",
		translation: {
			x: 0,
			y: 0
		}
	}
});
var calculateScale = ({ canvasSize, compositionHeight, compositionWidth, previewSize }) => {
	const heightRatio = canvasSize.height / compositionHeight;
	const widthRatio = canvasSize.width / compositionWidth;
	const ratio = Math.min(heightRatio, widthRatio);
	if (previewSize === "auto") {
		if (ratio === 0) return 1;
		return ratio;
	}
	return Number(previewSize);
};
var PixelDensityContext = import_react.createContext(null);
var getOffthreadVideoSource$1 = ({ src, transparent, currentTime, toneMapped }) => {
	return `http://localhost:${window.remotion_proxyPort}/proxy?src=${encodeURIComponent(getAbsoluteSrc$1(src))}&time=${encodeURIComponent(Math.max(0, currentTime))}&transparent=${String(transparent)}&toneMapped=${String(toneMapped)}`;
};
var OffthreadVideoForRendering = ({ onError, volume: volumeProp, playbackRate, src, muted, allowAmplificationDuringRender, transparent, toneMapped, toneFrequency, name, loopVolumeCurveBehavior, delayRenderRetries, delayRenderTimeoutInMilliseconds, onVideoFrame, crossOrigin, audioStreamIndex, preservePitch: _preservePitch, ...props2 }) => {
	const absoluteFrame = useTimelinePosition();
	const frame = useCurrentFrame();
	const volumePropsFrame = useFrameForVolumeProp(loopVolumeCurveBehavior);
	const videoConfig = useUnsafeVideoConfig();
	const sequenceContext = (0, import_react.useContext)(SequenceContext);
	const mediaStartsAt = useMediaStartsAt();
	const { registerRenderAsset, unregisterRenderAsset } = (0, import_react.useContext)(RenderAssetManager);
	if (!src) throw new TypeError("No `src` was passed to <OffthreadVideo>.");
	const id = (0, import_react.useMemo)(() => `offthreadvideo-${random(src)}-${sequenceContext?.cumulatedFrom}-${sequenceContext?.relativeFrom}-${sequenceContext?.durationInFrames}`, [
		src,
		sequenceContext?.cumulatedFrom,
		sequenceContext?.relativeFrom,
		sequenceContext?.durationInFrames
	]);
	if (!videoConfig) throw new Error("No video config found");
	const volume = evaluateVolume({
		volume: volumeProp,
		frame: volumePropsFrame,
		mediaVolume: 1
	});
	warnAboutTooHighVolume(volume);
	(0, import_react.useEffect)(() => {
		if (!src) throw new Error("No src passed");
		if (!window.remotion_audioEnabled) return;
		if (muted) return;
		if (volume <= 0) return;
		registerRenderAsset({
			type: "video",
			src: getAbsoluteSrc$1(src),
			id,
			frame: absoluteFrame,
			volume,
			mediaFrame: frame,
			playbackRate,
			toneFrequency,
			audioStartFrame: Math.max(0, -(sequenceContext?.cumulatedNegativeFrom ?? 0)),
			audioStreamIndex
		});
		return () => unregisterRenderAsset(id);
	}, [
		muted,
		src,
		registerRenderAsset,
		id,
		unregisterRenderAsset,
		volume,
		frame,
		absoluteFrame,
		playbackRate,
		toneFrequency,
		sequenceContext?.cumulatedNegativeFrom,
		audioStreamIndex
	]);
	const currentTime = (0, import_react.useMemo)(() => {
		return getExpectedMediaFrameUncorrected$1({
			frame,
			playbackRate: playbackRate || 1,
			startFrom: -mediaStartsAt
		}) / videoConfig.fps;
	}, [
		frame,
		mediaStartsAt,
		playbackRate,
		videoConfig.fps
	]);
	const actualSrc = (0, import_react.useMemo)(() => {
		return getOffthreadVideoSource$1({
			src,
			currentTime,
			transparent,
			toneMapped
		});
	}, [
		toneMapped,
		currentTime,
		src,
		transparent
	]);
	const [imageSrc, setImageSrc] = (0, import_react.useState)(null);
	const { delayRender: delayRender2, continueRender: continueRender2 } = useDelayRender();
	(0, import_react.useLayoutEffect)(() => {
		if (!window.remotion_videoEnabled) return;
		const cleanup = [];
		setImageSrc(null);
		const controller = new AbortController();
		const newHandle = delayRender2(`Fetching ${actualSrc} from server`, {
			retries: delayRenderRetries ?? void 0,
			timeoutInMilliseconds: delayRenderTimeoutInMilliseconds ?? void 0
		});
		const execute = async () => {
			try {
				const res = await fetch(actualSrc, {
					signal: controller.signal,
					cache: "no-store"
				});
				if (res.status !== 200) {
					if (res.status === 500) {
						const json = await res.json();
						if (json.error) {
							const cleanedUpErrorMessage = json.error.replace(/^Error: /, "");
							throw new Error(cleanedUpErrorMessage);
						}
					}
					throw new Error(`Server returned status ${res.status} while fetching ${actualSrc}`);
				}
				const blob = await res.blob();
				const url = URL.createObjectURL(blob);
				cleanup.push(() => URL.revokeObjectURL(url));
				setImageSrc({
					src: url,
					handle: newHandle
				});
			} catch (err) {
				if (err.message.includes("aborted")) {
					continueRender2(newHandle);
					return;
				}
				if (controller.signal.aborted) {
					continueRender2(newHandle);
					return;
				}
				if (err.message.includes("Failed to fetch")) err = new Error(`Failed to fetch ${actualSrc}. This could be caused by Chrome rejecting the request because the disk space is low. Consider increasing the disk size of your environment.`, { cause: err });
				if (onError) onError(err);
				else cancelRender(err);
			}
		};
		execute();
		cleanup.push(() => {
			if (controller.signal.aborted) return;
			controller.abort();
		});
		return () => {
			cleanup.forEach((c2) => c2());
		};
	}, [
		actualSrc,
		delayRenderRetries,
		delayRenderTimeoutInMilliseconds,
		onError,
		continueRender2,
		delayRender2
	]);
	const onErr = (0, import_react.useCallback)(() => {
		if (onError) onError?.(/* @__PURE__ */ new Error("Failed to load image with src " + imageSrc));
		else cancelRender("Failed to load image with src " + imageSrc);
	}, [imageSrc, onError]);
	const className = (0, import_react.useMemo)(() => {
		return [OBJECTFIT_CONTAIN_CLASS_NAME, props2.className].filter(truthy$1).join(" ");
	}, [props2.className]);
	const onImageFrame = (0, import_react.useCallback)((img) => {
		if (onVideoFrame) onVideoFrame(img);
	}, [onVideoFrame]);
	if (!imageSrc || !window.remotion_videoEnabled) return null;
	continueRender2(imageSrc.handle);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Img, {
		src: imageSrc.src,
		delayRenderRetries,
		delayRenderTimeoutInMilliseconds,
		onImageFrame,
		...props2,
		onError: onErr,
		className
	});
};
var useEmitVideoFrame = ({ ref, onVideoFrame }) => {
	(0, import_react.useEffect)(() => {
		const { current } = ref;
		if (!current) return;
		if (!onVideoFrame) return;
		let handle = 0;
		const callback = (_now, metadata) => {
			if (!ref.current) return;
			onVideoFrame(ref.current, _now, metadata);
			handle = ref.current.requestVideoFrameCallback(callback);
		};
		onVideoFrame(current);
		if (!current.requestVideoFrameCallback) return;
		handle = current.requestVideoFrameCallback(callback);
		return () => {
			if (handle) current.cancelVideoFrameCallback(handle);
		};
	}, [onVideoFrame, ref]);
};
var MediaPlaybackError = class extends Error {
	src;
	constructor({ message, src }) {
		super(message);
		this.name = "MediaPlaybackError";
		this.src = src;
	}
};
var VideoForDevelopmentRefForwardingFunction = (props2, ref) => {
	const context = (0, import_react.useContext)(SharedAudioContext);
	if (!context) throw new Error("SharedAudioContext not found");
	const videoRef = (0, import_react.useRef)(null);
	const sharedSource = (0, import_react.useMemo)(() => {
		if (!context.audioContext) return null;
		return makeSharedElementSourceNode({
			audioContext: context.audioContext,
			ref: videoRef
		});
	}, [context.audioContext]);
	(import_react.useInsertionEffect ?? import_react.useLayoutEffect)(() => {
		return () => {
			requestAnimationFrame(() => {
				sharedSource?.cleanup();
			});
		};
	}, [sharedSource]);
	const { volume, muted, playbackRate, preservePitch, onlyWarnForMediaSeekingError, src, onDuration, acceptableTimeShift, acceptableTimeShiftInSeconds, toneFrequency, name, _remotionInternalNativeLoopPassed, _remotionInternalStack, style, pauseWhenBuffering, showInTimeline, loopVolumeCurveBehavior, onError, onAutoPlayError, onVideoFrame, crossOrigin, delayRenderRetries, delayRenderTimeoutInMilliseconds, allowAmplificationDuringRender, useWebAudioApi, audioStreamIndex, ...nativeProps } = props2;
	const volumePropFrame = useFrameForVolumeProp(loopVolumeCurveBehavior ?? "repeat");
	const { fps, durationInFrames } = useVideoConfig();
	const parentSequence = (0, import_react.useContext)(SequenceContext);
	const logLevel = useLogLevel();
	const mountTime = useMountTime();
	const [timelineId] = (0, import_react.useState)(() => String(Math.random()));
	if (typeof acceptableTimeShift !== "undefined") throw new Error("acceptableTimeShift has been removed. Use acceptableTimeShiftInSeconds instead.");
	const [mediaVolume] = useMediaVolumeState();
	const [playerMuted] = usePlayerMutedState();
	const userPreferredVolume = evaluateVolume({
		frame: volumePropFrame,
		volume,
		mediaVolume
	});
	warnAboutTooHighVolume(userPreferredVolume);
	const getStack = (0, import_react.useCallback)(() => {
		return _remotionInternalStack ?? null;
	}, [_remotionInternalStack]);
	useMediaInTimeline({
		volume,
		mediaVolume,
		mediaType: "video",
		src,
		playbackRate: props2.playbackRate ?? 1,
		displayName: name ?? null,
		id: timelineId,
		getStack,
		showInTimeline,
		premountDisplay: parentSequence?.premountDisplay ?? null,
		postmountDisplay: parentSequence?.postmountDisplay ?? null,
		loopDisplay: void 0,
		documentationLink: onlyWarnForMediaSeekingError ? "https://www.remotion.dev/docs/offthreadvideo" : "https://www.remotion.dev/docs/html5-video",
		refForOutline: videoRef
	});
	useMediaPlayback({
		mediaRef: videoRef,
		src,
		mediaType: "video",
		playbackRate: props2.playbackRate ?? 1,
		preservePitch,
		onlyWarnForMediaSeekingError,
		acceptableTimeshift: acceptableTimeShiftInSeconds ?? null,
		isPremounting: Boolean(parentSequence?.premounting),
		isPostmounting: Boolean(parentSequence?.postmounting),
		pauseWhenBuffering,
		onAutoPlayError: onAutoPlayError ?? null
	});
	useMediaTag({
		id: timelineId,
		isPostmounting: Boolean(parentSequence?.postmounting),
		isPremounting: Boolean(parentSequence?.premounting),
		mediaRef: videoRef,
		mediaType: "video",
		onAutoPlayError: onAutoPlayError ?? null
	});
	useVolume({
		logLevel,
		mediaRef: videoRef,
		volume: userPreferredVolume,
		source: sharedSource,
		shouldUseWebAudioApi: useWebAudioApi ?? false
	});
	const actualFrom = parentSequence ? parentSequence.relativeFrom : 0;
	const duration = parentSequence ? Math.min(parentSequence.durationInFrames, durationInFrames) : durationInFrames;
	const actualSrc = useAppendVideoFragment({
		actualSrc: usePreload(src),
		actualFrom,
		duration,
		fps
	});
	(0, import_react.useImperativeHandle)(ref, () => {
		return videoRef.current;
	}, []);
	(0, import_react.useState)(() => playbackLogging({
		logLevel,
		message: `Mounting video with source = ${actualSrc}, v=${VERSION}, user agent=${typeof navigator === "undefined" ? "server" : navigator.userAgent}`,
		tag: "video",
		mountTime
	}));
	(0, import_react.useEffect)(() => {
		const { current } = videoRef;
		if (!current) return;
		const errorHandler = () => {
			if (current.error) {
				console.error("Error occurred in video", current?.error);
				if (onError) {
					const err = new MediaPlaybackError({
						message: `Code ${current.error.code}: ${current.error.message}`,
						src
					});
					onError(err);
					return;
				}
				throw new MediaPlaybackError({
					message: `The browser threw an error while playing the video ${src}: Code ${current.error.code} - ${current?.error?.message}. See https://remotion.dev/docs/media-playback-error for help. Pass an onError() prop to handle the error.`,
					src
				});
			} else {
				if (onError) {
					const err = new MediaPlaybackError({
						message: `The browser threw an error while playing the video ${src}`,
						src
					});
					onError(err);
					return;
				}
				throw new MediaPlaybackError({
					message: "The browser threw an error while playing the video",
					src
				});
			}
		};
		current.addEventListener("error", errorHandler, { once: true });
		return () => {
			current.removeEventListener("error", errorHandler);
		};
	}, [onError, src]);
	const currentOnDurationCallback = (0, import_react.useRef)(onDuration);
	currentOnDurationCallback.current = onDuration;
	useEmitVideoFrame({
		ref: videoRef,
		onVideoFrame
	});
	(0, import_react.useEffect)(() => {
		const { current } = videoRef;
		if (!current) return;
		if (current.duration) {
			currentOnDurationCallback.current?.(src, current.duration);
			return;
		}
		const onLoadedMetadata = () => {
			currentOnDurationCallback.current?.(src, current.duration);
		};
		current.addEventListener("loadedmetadata", onLoadedMetadata);
		return () => {
			current.removeEventListener("loadedmetadata", onLoadedMetadata);
		};
	}, [src]);
	(0, import_react.useEffect)(() => {
		const { current } = videoRef;
		if (!current) return;
		if (isIosSafari()) current.preload = "metadata";
		else current.preload = "auto";
	}, []);
	const actualStyle = (0, import_react.useMemo)(() => {
		return { ...style };
	}, [style]);
	const crossOriginValue = getCrossOriginValue({
		crossOrigin,
		requestsVideoFrame: Boolean(onVideoFrame),
		isClientSideRendering: false
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		...nativeProps,
		ref: videoRef,
		muted: muted || playerMuted || userPreferredVolume <= 0,
		playsInline: true,
		src: actualSrc,
		loop: _remotionInternalNativeLoopPassed,
		style: actualStyle,
		disableRemotePlayback: true,
		crossOrigin: crossOriginValue,
		controls: false
	});
};
var VideoForPreview = (0, import_react.forwardRef)(VideoForDevelopmentRefForwardingFunction);
var InnerOffthreadVideo = (props2) => {
	const { startFrom, endAt, trimBefore, trimAfter, name, pauseWhenBuffering, stack, showInTimeline, ...otherProps } = props2;
	const environment = useRemotionEnvironment();
	if (environment.isClientSideRendering) throw new Error("<OffthreadVideo> is not supported in @remotion/web-renderer. Use <Video> from @remotion/media instead. See https://remotion.dev/docs/client-side-rendering/limitations");
	const onDuration = (0, import_react.useCallback)(() => {}, []);
	if (typeof props2.src !== "string") throw new TypeError(`The \`<OffthreadVideo>\` tag requires a string for \`src\`, but got ${JSON.stringify(props2.src)} instead.`);
	validateMediaTrimProps({
		startFrom,
		endAt,
		trimBefore,
		trimAfter
	});
	const { trimBeforeValue, trimAfterValue } = resolveTrimProps({
		startFrom,
		endAt,
		trimBefore,
		trimAfter
	});
	if (typeof trimBeforeValue !== "undefined" || typeof trimAfterValue !== "undefined") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sequence, {
		layout: "none",
		from: 0 - (trimBeforeValue ?? 0),
		showInTimeline: false,
		durationInFrames: trimAfterValue,
		name,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InnerOffthreadVideo, {
			pauseWhenBuffering: pauseWhenBuffering ?? false,
			...otherProps,
			trimAfter: void 0,
			name: void 0,
			showInTimeline,
			trimBefore: void 0,
			stack: void 0,
			startFrom: void 0,
			endAt: void 0
		})
	});
	validateMediaProps(props2, "Video");
	if (environment.isRendering) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OffthreadVideoForRendering, {
		pauseWhenBuffering: pauseWhenBuffering ?? false,
		...otherProps,
		trimAfter: void 0,
		name: void 0,
		showInTimeline,
		trimBefore: void 0,
		stack: void 0,
		startFrom: void 0,
		endAt: void 0
	});
	const { transparent, toneMapped, onAutoPlayError, onVideoFrame, crossOrigin, delayRenderRetries, delayRenderTimeoutInMilliseconds, ...propsForPreview } = otherProps;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoForPreview, {
		_remotionInternalStack: stack ?? null,
		onDuration,
		onlyWarnForMediaSeekingError: true,
		pauseWhenBuffering: pauseWhenBuffering ?? false,
		showInTimeline: showInTimeline ?? true,
		onAutoPlayError: onAutoPlayError ?? void 0,
		onVideoFrame: onVideoFrame ?? null,
		crossOrigin,
		...propsForPreview,
		_remotionInternalNativeLoopPassed: false
	});
};
var OffthreadVideo = ({ src, acceptableTimeShiftInSeconds, allowAmplificationDuringRender, audioStreamIndex, crossOrigin, delayRenderRetries, delayRenderTimeoutInMilliseconds, loopVolumeCurveBehavior, muted, name, onAutoPlayError, onError, onVideoFrame, pauseWhenBuffering, playbackRate, preservePitch, showInTimeline, style, toneFrequency, toneMapped, transparent, trimAfter, trimBefore, useWebAudioApi, volume, _remotionInternalNativeLoopPassed, endAt, stack, startFrom, imageFormat, ...props2 }) => {
	if (imageFormat) throw new TypeError(`The \`<OffthreadVideo>\` tag does no longer accept \`imageFormat\`. Use the \`transparent\` prop if you want to render a transparent video.`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InnerOffthreadVideo, {
		acceptableTimeShiftInSeconds,
		allowAmplificationDuringRender: allowAmplificationDuringRender ?? true,
		audioStreamIndex: audioStreamIndex ?? 0,
		crossOrigin,
		delayRenderRetries,
		delayRenderTimeoutInMilliseconds,
		loopVolumeCurveBehavior: loopVolumeCurveBehavior ?? "repeat",
		muted: muted ?? false,
		name,
		onAutoPlayError: onAutoPlayError ?? null,
		onError,
		onVideoFrame,
		pauseWhenBuffering: pauseWhenBuffering ?? true,
		playbackRate: playbackRate ?? 1,
		preservePitch,
		toneFrequency: toneFrequency ?? 1,
		showInTimeline: showInTimeline ?? true,
		src,
		stack,
		startFrom,
		_remotionInternalNativeLoopPassed: _remotionInternalNativeLoopPassed ?? false,
		endAt,
		style,
		toneMapped: toneMapped ?? true,
		transparent: transparent ?? false,
		trimAfter,
		trimBefore,
		useWebAudioApi: useWebAudioApi ?? false,
		volume,
		...props2
	});
};
addSequenceStackTraces(OffthreadVideo);
var WATCH_REMOTION_STATIC_FILES = "remotion_staticFilesChanged";
function useRemotionContexts() {
	const compositionManagerCtx = import_react.useContext(CompositionManager);
	const timelineContext = import_react.useContext(TimelineContext);
	const setTimelineContext = import_react.useContext(SetTimelineContext);
	const sequenceContext = import_react.useContext(SequenceContext);
	const nonceContext = import_react.useContext(NonceContext);
	const canUseRemotionHooksContext = import_react.useContext(CanUseRemotionHooks);
	const preloadContext = import_react.useContext(PreloadContext);
	const resolveCompositionContext = import_react.useContext(ResolveCompositionContext);
	const renderAssetManagerContext = import_react.useContext(RenderAssetManager);
	const sequenceManagerContext = import_react.useContext(SequenceManager);
	const sequenceManagerRefContext = import_react.useContext(SequenceManagerRefContext);
	const visualModePropStatusesRefContext = import_react.useContext(VisualModePropStatusesRefContext);
	const bufferManagerContext = import_react.useContext(BufferingContextReact);
	const logLevelContext = import_react.useContext(LogLevelContext);
	return (0, import_react.useMemo)(() => ({
		compositionManagerCtx,
		timelineContext,
		setTimelineContext,
		sequenceContext,
		nonceContext,
		canUseRemotionHooksContext,
		preloadContext,
		resolveCompositionContext,
		renderAssetManagerContext,
		sequenceManagerContext,
		sequenceManagerRefContext,
		visualModePropStatusesRefContext,
		bufferManagerContext,
		logLevelContext
	}), [
		compositionManagerCtx,
		nonceContext,
		sequenceContext,
		setTimelineContext,
		timelineContext,
		canUseRemotionHooksContext,
		preloadContext,
		resolveCompositionContext,
		renderAssetManagerContext,
		sequenceManagerContext,
		sequenceManagerRefContext,
		visualModePropStatusesRefContext,
		bufferManagerContext,
		logLevelContext
	]);
}
var RemotionContextProvider = (props2) => {
	const { children, contexts } = props2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogLevelContext.Provider, {
		value: contexts.logLevelContext,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanUseRemotionHooks.Provider, {
			value: contexts.canUseRemotionHooksContext,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NonceContext.Provider, {
				value: contexts.nonceContext,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreloadContext.Provider, {
					value: contexts.preloadContext,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompositionManager.Provider, {
						value: contexts.compositionManagerCtx,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SequenceManagerRefContext.Provider, {
							value: contexts.sequenceManagerRefContext,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SequenceManager.Provider, {
								value: contexts.sequenceManagerContext,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualModePropStatusesRefContext.Provider, {
									value: contexts.visualModePropStatusesRefContext,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderAssetManager.Provider, {
										value: contexts.renderAssetManagerContext,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResolveCompositionContext.Provider, {
											value: contexts.resolveCompositionContext,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineContext.Provider, {
												value: contexts.timelineContext,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetTimelineContext.Provider, {
													value: contexts.setTimelineContext,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SequenceContext.Provider, {
														value: contexts.sequenceContext,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BufferingContextReact.Provider, {
															value: contexts.bufferManagerContext,
															children
														})
													})
												})
											})
										})
									})
								})
							})
						})
					})
				})
			})
		})
	});
};
var Internals = {
	MaxMediaCacheSizeContext,
	useUnsafeVideoConfig,
	useFrameForVolumeProp,
	useTimelinePosition,
	useAbsoluteTimelinePosition,
	evaluateVolume,
	getAbsoluteSrc: getAbsoluteSrc$1,
	getAssetDisplayName,
	Timeline: exports_timeline_position_state,
	validateMediaTrimProps,
	validateMediaProps,
	resolveTrimProps,
	VideoForPreview,
	CompositionManager,
	CompositionSetters,
	VisualModePropStatusesContext,
	VisualModePropStatusesRefContext,
	VisualModeDragOverridesContext,
	VisualModeSettersContext,
	SequenceManager,
	SequenceManagerRefContext,
	SequenceStackTracesUpdateContext,
	baseSchema,
	sequenceSchema: sequenceSchema$1,
	SequenceWithoutSchema,
	sequenceStyleSchema,
	sequenceVisualStyleSchema,
	sequencePremountSchema,
	textSchema,
	transformSchema: transformSchema$1,
	premountSchema: premountSchema$1,
	flattenActiveSchema,
	getFlatSchemaWithAllKeys,
	RemotionRootContexts,
	CompositionManagerProvider,
	useVideo,
	getRoot,
	useMediaVolumeState,
	usePlayerMutedState,
	useMediaInTimeline,
	useLazyComponent,
	truthy: truthy$1,
	SequenceContext,
	PremountContext,
	useRemotionContexts,
	RemotionContextProvider,
	CSSUtils: exports_default_css,
	setupEnvVariables,
	MediaVolumeContext,
	SetMediaVolumeContext,
	getRemotionEnvironment,
	SharedAudioContext,
	SharedAudioContextProvider,
	SharedAudioTagsContext,
	SharedAudioTagsContextProvider,
	invalidCompositionErrorMessage,
	invalidFolderNameErrorMessage,
	calculateMediaDuration,
	isCompositionIdValid,
	isFolderNameValid,
	getPreviewDomElement,
	compositionsRef,
	portalNode,
	waitForRoot,
	SetTimelineContext,
	CanUseRemotionHooksProvider,
	CanUseRemotionHooks,
	PrefetchProvider,
	DurationsContextProvider,
	IsPlayerContextProvider,
	useIsPlayer,
	EditorPropsProvider,
	EditorPropsContext,
	usePreload,
	NonceContext,
	resolveVideoConfig,
	resolveVideoConfigOrCatch,
	ResolveCompositionContext,
	useResolvedVideoConfig,
	resolveCompositionsRef,
	REMOTION_STUDIO_CONTAINER_ELEMENT,
	RenderAssetManager,
	persistCurrentFrame,
	usePlaybackRate,
	useTimelineContext,
	useTimelineSetFrame,
	isIosSafari,
	WATCH_REMOTION_STATIC_FILES,
	addSequenceStackTraces,
	useMediaStartsAt,
	BufferingProvider,
	BufferingContextReact,
	getComponentsToAddStacksTo,
	CurrentScaleContext,
	PixelDensityContext,
	PreviewSizeContext,
	calculateScale,
	validateRenderAsset,
	Log,
	LogLevelContext,
	useLogLevel,
	playbackLogging,
	timeValueRef,
	compositionSelectorRef: (0, import_react.createRef)(),
	RemotionEnvironmentContext,
	warnAboutTooHighVolume,
	AudioForPreview,
	OBJECTFIT_CONTAIN_CLASS_NAME,
	InnerOffthreadVideo,
	useBasicMediaInTimeline,
	getInputPropsOverride,
	setInputPropsOverride,
	useVideoEnabled,
	useAudioEnabled,
	useIsPlayerBuffering,
	TimelinePosition: exports_timeline_position_state,
	DelayRenderContextType,
	TimelineContext,
	PlaybackRateContext,
	AbsoluteTimeContext,
	RenderAssetManagerProvider,
	getEffectiveVisualModeValue,
	CompositionRenderErrorContext,
	useEffectChainState,
	createEffectChainState,
	cleanupEffectChainState,
	runEffectChain,
	useMemoizedEffects,
	useMemoizedEffectDefinitions,
	createEffect,
	createWebGLContextError,
	createWebGL2ContextError,
	computeEffectiveSchemaValuesDotNotation,
	interpolateKeyframedStatus,
	makeStaticDragOverride,
	makeKeyframedDragOverride,
	resolveDragOverrideValue,
	getStaticDragOverrideValue,
	OverrideIdsToNodePathsGettersContext,
	OverrideIdsToNodePathsSettersContext,
	findPropsToDelete: findPropsToDelete$1,
	makeSequencePropsSubscriptionKey,
	getPropStatusesCtx,
	getEffectPropStatusesCtx,
	hiddenField,
	durationInFramesField,
	freezeField,
	fromField
};
var flattenChildren = (children) => {
	return import_react.Children.toArray(children).reduce((flatChildren, child) => {
		if (child.type === import_react.Fragment) return flatChildren.concat(flattenChildren(child.props.children));
		flatChildren.push(child);
		return flatChildren;
	}, []);
};
var SeriesSequenceRefForwardingFunction = ({ children }, _ref) => {
	useRequireToBeInsideSeries();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IsNotInsideSeriesProvider, { children });
};
var SeriesSequence = (0, import_react.forwardRef)(SeriesSequenceRefForwardingFunction);
var SequenceWithoutSchemaWithRef = SequenceWithoutSchema;
var SeriesInner = (props2) => {
	const childrenValue = (0, import_react.useMemo)(() => {
		let startFrame = 0;
		const flattenedChildren = flattenChildren(props2.children);
		return import_react.Children.map(flattenedChildren, (child, i) => {
			const castedChild = child;
			if (typeof castedChild === "string") {
				if (castedChild.trim() === "") return null;
				throw new TypeError(`The <Series /> component only accepts a list of <Series.Sequence /> components as its children, but you passed a string "${castedChild}"`);
			}
			if (castedChild.type !== SeriesSequence) throw new TypeError(`The <Series /> component only accepts a list of <Series.Sequence /> components as its children, but got ${castedChild} instead`);
			const debugInfo = `index = ${i}, duration = ${castedChild.props.durationInFrames}`;
			const durationInFramesProp = castedChild.props.durationInFrames;
			const { durationInFrames, children: _children, from, name, ...passedProps } = castedChild.props;
			if (i !== flattenedChildren.length - 1 || durationInFramesProp !== Infinity) validateDurationInFrames$2(durationInFramesProp, {
				component: `of a <Series.Sequence /> component`,
				allowFloats: true
			});
			const offset = castedChild.props.offset ?? 0;
			if (Number.isNaN(offset)) throw new TypeError(`The "offset" property of a <Series.Sequence /> must not be NaN, but got NaN (${debugInfo}).`);
			if (!Number.isFinite(offset)) throw new TypeError(`The "offset" property of a <Series.Sequence /> must be finite, but got ${offset} (${debugInfo}).`);
			if (offset % 1 !== 0) throw new TypeError(`The "offset" property of a <Series.Sequence /> must be finite, but got ${offset} (${debugInfo}).`);
			const currentStartFrame = startFrame + offset;
			startFrame += durationInFramesProp + offset;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SequenceWithoutSchemaWithRef, {
				ref: castedChild.ref,
				name: name || "<Series.Sequence>",
				_remotionInternalDocumentationLink: name ? void 0 : "https://www.remotion.dev/docs/series",
				from: currentStartFrame,
				durationInFrames: durationInFramesProp,
				...passedProps,
				children: child
			});
		});
	}, [props2.children]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IsInsideSeriesContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sequence, {
		layout: "none",
		name: "<Series>",
		_remotionInternalDocumentationLink: "https://www.remotion.dev/docs/series",
		...props2,
		children: childrenValue
	}) });
};
addSequenceStackTraces(Object.assign(withInteractivitySchema({
	Component: SeriesInner,
	componentName: "<Series>",
	componentIdentity: "dev.remotion.remotion.Series",
	schema: sequenceSchemaDefaultLayoutNone,
	supportsEffects: false
}), { Sequence: SeriesSequence }));
var roundTo6Commas = (num) => {
	return Math.round(num * 1e5) / 1e5;
};
var seekToTime = ({ element, desiredTime, logLevel, mountTime }) => {
	if (isApproximatelyTheSame(element.currentTime, desiredTime)) return {
		wait: Promise.resolve(desiredTime),
		cancel: () => {}
	};
	seek({
		logLevel,
		mediaRef: element,
		time: desiredTime,
		why: "Seeking during rendering",
		mountTime
	});
	let cancel;
	let cancelSeeked = null;
	const prom = new Promise((resolve) => {
		cancel = element.requestVideoFrameCallback((now, metadata) => {
			const displayIn = metadata.expectedDisplayTime - now;
			if (displayIn <= 0) {
				resolve(metadata.mediaTime);
				return;
			}
			setTimeout(() => {
				resolve(metadata.mediaTime);
			}, displayIn + 150);
		});
	});
	const waitForSeekedEvent = new Promise((resolve) => {
		const onDone = () => {
			resolve();
		};
		element.addEventListener("seeked", onDone, { once: true });
		cancelSeeked = () => {
			element.removeEventListener("seeked", onDone);
		};
	});
	return {
		wait: Promise.all([prom, waitForSeekedEvent]).then(([time]) => time),
		cancel: () => {
			cancelSeeked?.();
			element.cancelVideoFrameCallback(cancel);
		}
	};
};
var seekToTimeMultipleUntilRight = ({ element, desiredTime, fps, logLevel, mountTime }) => {
	const threshold = 1 / fps / 2;
	let currentCancel = () => {};
	if (Number.isFinite(element.duration) && element.currentTime >= element.duration && desiredTime >= element.duration) return {
		prom: Promise.resolve(),
		cancel: () => {}
	};
	return {
		prom: new Promise((resolve, reject) => {
			const firstSeek = seekToTime({
				element,
				desiredTime: desiredTime + threshold,
				logLevel,
				mountTime
			});
			firstSeek.wait.then((seekedTo) => {
				if (Math.abs(desiredTime - seekedTo) <= threshold) return resolve();
				const newSeek = seekToTime({
					element,
					desiredTime: seekedTo + threshold * (desiredTime > seekedTo ? 1 : -1),
					logLevel,
					mountTime
				});
				currentCancel = newSeek.cancel;
				newSeek.wait.then((newTime) => {
					if (roundTo6Commas(Math.abs(desiredTime - newTime)) <= roundTo6Commas(threshold)) return resolve();
					const thirdSeek = seekToTime({
						element,
						desiredTime: desiredTime + threshold,
						logLevel,
						mountTime
					});
					currentCancel = thirdSeek.cancel;
					return thirdSeek.wait.then(() => {
						resolve();
					}).catch((err) => {
						reject(err);
					});
				}).catch((err) => {
					reject(err);
				});
			});
			currentCancel = firstSeek.cancel;
		}),
		cancel: () => {
			currentCancel();
		}
	};
};
var VideoForRenderingForwardFunction = ({ onError, volume: volumeProp, allowAmplificationDuringRender, playbackRate, onDuration, toneFrequency, name, acceptableTimeShiftInSeconds, delayRenderRetries, delayRenderTimeoutInMilliseconds, loopVolumeCurveBehavior, audioStreamIndex, onVideoFrame, preservePitch: _preservePitch, ...props2 }, ref) => {
	const absoluteFrame = useTimelinePosition();
	const frame = useCurrentFrame();
	const volumePropsFrame = useFrameForVolumeProp(loopVolumeCurveBehavior ?? "repeat");
	const videoConfig = useUnsafeVideoConfig();
	const videoRef = (0, import_react.useRef)(null);
	const sequenceContext = (0, import_react.useContext)(SequenceContext);
	const mediaStartsAt = useMediaStartsAt();
	const environment = useRemotionEnvironment();
	const logLevel = useLogLevel();
	const mountTime = useMountTime();
	const { delayRender: delayRender2, continueRender: continueRender2 } = useDelayRender();
	const { registerRenderAsset, unregisterRenderAsset } = (0, import_react.useContext)(RenderAssetManager);
	const id = (0, import_react.useMemo)(() => `video-${random(props2.src ?? "")}-${sequenceContext?.cumulatedFrom}-${sequenceContext?.relativeFrom}-${sequenceContext?.durationInFrames}`, [
		props2.src,
		sequenceContext?.cumulatedFrom,
		sequenceContext?.relativeFrom,
		sequenceContext?.durationInFrames
	]);
	if (!videoConfig) throw new Error("No video config found");
	const volume = evaluateVolume({
		volume: volumeProp,
		frame: volumePropsFrame,
		mediaVolume: 1
	});
	warnAboutTooHighVolume(volume);
	(0, import_react.useEffect)(() => {
		if (!props2.src) throw new Error("No src passed");
		if (props2.muted) return;
		if (volume <= 0) return;
		if (!window.remotion_audioEnabled) return;
		registerRenderAsset({
			type: "video",
			src: getAbsoluteSrc$1(props2.src),
			id,
			frame: absoluteFrame,
			volume,
			mediaFrame: frame,
			playbackRate: playbackRate ?? 1,
			toneFrequency: toneFrequency ?? 1,
			audioStartFrame: Math.max(0, -(sequenceContext?.cumulatedNegativeFrom ?? 0)),
			audioStreamIndex: audioStreamIndex ?? 0
		});
		return () => unregisterRenderAsset(id);
	}, [
		props2.muted,
		props2.src,
		registerRenderAsset,
		id,
		unregisterRenderAsset,
		volume,
		frame,
		absoluteFrame,
		playbackRate,
		toneFrequency,
		sequenceContext?.cumulatedNegativeFrom,
		audioStreamIndex
	]);
	(0, import_react.useImperativeHandle)(ref, () => {
		return videoRef.current;
	}, []);
	useEmitVideoFrame({
		ref: videoRef,
		onVideoFrame
	});
	(0, import_react.useEffect)(() => {
		if (!window.remotion_videoEnabled) return;
		const { current } = videoRef;
		if (!current) return;
		const currentTime = getMediaTime({
			frame,
			playbackRate: playbackRate || 1,
			startFrom: -mediaStartsAt,
			fps: videoConfig.fps
		});
		const handle = delayRender2(`Rendering <Html5Video /> with src="${props2.src}" at time ${currentTime}`, {
			retries: delayRenderRetries ?? void 0,
			timeoutInMilliseconds: delayRenderTimeoutInMilliseconds ?? void 0
		});
		if (window.process?.env?.NODE_ENV === "test") {
			continueRender2(handle);
			return;
		}
		if (isApproximatelyTheSame(current.currentTime, currentTime)) {
			if (current.readyState >= 2) {
				continueRender2(handle);
				return;
			}
			const loadedDataHandler = () => {
				continueRender2(handle);
			};
			current.addEventListener("loadeddata", loadedDataHandler, { once: true });
			return () => {
				current.removeEventListener("loadeddata", loadedDataHandler);
			};
		}
		const endedHandler = () => {
			continueRender2(handle);
		};
		const seek2 = seekToTimeMultipleUntilRight({
			element: current,
			desiredTime: currentTime,
			fps: videoConfig.fps,
			logLevel,
			mountTime
		});
		seek2.prom.then(() => {
			continueRender2(handle);
		});
		current.addEventListener("ended", endedHandler, { once: true });
		const errorHandler = () => {
			if (current?.error) {
				console.error("Error occurred in video", current?.error);
				if (onError) return;
				throw new MediaPlaybackError({
					message: `The browser threw an error while playing the video ${props2.src}: Code ${current.error.code} - ${current?.error?.message}. See https://remotion.dev/docs/media-playback-error for help. Pass an onError() prop to handle the error.`,
					src: props2.src
				});
			} else throw new MediaPlaybackError({
				message: "The browser threw an error",
				src: props2.src
			});
		};
		current.addEventListener("error", errorHandler, { once: true });
		return () => {
			seek2.cancel();
			current.removeEventListener("ended", endedHandler);
			current.removeEventListener("error", errorHandler);
			continueRender2(handle);
		};
	}, [
		volumePropsFrame,
		props2.src,
		playbackRate,
		videoConfig.fps,
		frame,
		mediaStartsAt,
		onError,
		delayRenderRetries,
		delayRenderTimeoutInMilliseconds,
		logLevel,
		mountTime,
		continueRender2,
		delayRender2
	]);
	const { src } = props2;
	if (environment.isRendering) (0, import_react.useLayoutEffect)(() => {
		if (window.process?.env?.NODE_ENV === "test") return;
		const newHandle = delayRender2("Loading <Html5Video> duration with src=" + src, {
			retries: delayRenderRetries ?? void 0,
			timeoutInMilliseconds: delayRenderTimeoutInMilliseconds ?? void 0
		});
		const { current } = videoRef;
		const didLoad = () => {
			if (current?.duration) onDuration(src, current.duration);
			continueRender2(newHandle);
		};
		if (current?.duration) {
			onDuration(src, current.duration);
			continueRender2(newHandle);
		} else current?.addEventListener("loadedmetadata", didLoad, { once: true });
		return () => {
			current?.removeEventListener("loadedmetadata", didLoad);
			continueRender2(newHandle);
		};
	}, [
		src,
		onDuration,
		delayRenderRetries,
		delayRenderTimeoutInMilliseconds,
		continueRender2,
		delayRender2
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		ref: videoRef,
		disableRemotePlayback: true,
		...props2
	});
};
var VideoForRendering = (0, import_react.forwardRef)(VideoForRenderingForwardFunction);
var VideoForwardingFunction = (props2, ref) => {
	const { startFrom, endAt, trimBefore, trimAfter, name, pauseWhenBuffering, stack, _remotionInternalNativeLoopPassed, showInTimeline, onAutoPlayError, onVideoFrame, ...otherProps } = props2;
	const { loop, ...propsOtherThanLoop } = props2;
	const { fps } = useVideoConfig();
	const environment = useRemotionEnvironment();
	if (environment.isClientSideRendering) throw new Error("<Html5Video> is not supported in @remotion/web-renderer. Use <Video> from @remotion/media instead. See https://remotion.dev/docs/client-side-rendering/limitations");
	const { durations, setDurations } = (0, import_react.useContext)(DurationsContext);
	if (typeof ref === "string") throw new Error("string refs are not supported");
	if (typeof props2.src !== "string") throw new TypeError(`The \`<Html5Video>\` tag requires a string for \`src\`, but got ${JSON.stringify(props2.src)} instead.`);
	const preloadedSrc = usePreload(props2.src);
	const onDuration = (0, import_react.useCallback)((src, durationInSeconds) => {
		setDurations({
			type: "got-duration",
			durationInSeconds,
			src
		});
	}, [setDurations]);
	const durationFetched = durations[getAbsoluteSrc$1(preloadedSrc)] ?? durations[getAbsoluteSrc$1(props2.src)];
	validateMediaTrimProps({
		startFrom,
		endAt,
		trimBefore,
		trimAfter
	});
	const { trimBeforeValue, trimAfterValue } = resolveTrimProps({
		startFrom,
		endAt,
		trimBefore,
		trimAfter
	});
	if (loop && durationFetched !== void 0) {
		if (!Number.isFinite(durationFetched)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html5Video, {
			...propsOtherThanLoop,
			ref,
			stack,
			_remotionInternalNativeLoopPassed: true
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loop, {
			durationInFrames: calculateMediaDuration({
				trimAfter: trimAfterValue,
				mediaDurationInFrames: durationFetched * fps,
				playbackRate: props2.playbackRate ?? 1,
				trimBefore: trimBeforeValue
			}),
			layout: "none",
			name,
			showInTimeline: false,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html5Video, {
				...propsOtherThanLoop,
				ref,
				stack,
				_remotionInternalNativeLoopPassed: true
			})
		});
	}
	if (typeof trimBeforeValue !== "undefined" || typeof trimAfterValue !== "undefined") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sequence, {
		layout: "none",
		from: 0 - (trimBeforeValue ?? 0),
		showInTimeline: false,
		durationInFrames: trimAfterValue === void 0 ? void 0 : trimAfterValue / (props2.playbackRate ?? 1),
		name,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html5Video, {
			pauseWhenBuffering: pauseWhenBuffering ?? false,
			onVideoFrame,
			...otherProps,
			ref,
			stack
		})
	});
	validateMediaProps({
		playbackRate: props2.playbackRate,
		preservePitch: props2.preservePitch,
		volume: props2.volume
	}, "Html5Video");
	if (environment.isRendering) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoForRendering, {
		onDuration,
		onVideoFrame: onVideoFrame ?? null,
		...otherProps,
		ref
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoForPreview, {
		onlyWarnForMediaSeekingError: false,
		...otherProps,
		ref,
		onVideoFrame: onVideoFrame ?? null,
		pauseWhenBuffering: pauseWhenBuffering ?? false,
		onDuration,
		_remotionInternalStack: stack ?? null,
		_remotionInternalNativeLoopPassed: _remotionInternalNativeLoopPassed ?? false,
		showInTimeline: showInTimeline ?? true,
		onAutoPlayError: onAutoPlayError ?? void 0
	});
};
var Html5Video = (0, import_react.forwardRef)(VideoForwardingFunction);
addSequenceStackTraces(Html5Video);
var Video = Html5Video;
checkMultipleRemotionVersions();
var Config = new Proxy({}, { get(_, prop) {
	if (prop === "Bundling" || prop === "Rendering" || prop === "Log" || prop === "Puppeteer" || prop === "Output") return Config;
	return () => {
		console.warn("⚠️  The CLI configuration has been extracted from Remotion Core.");
		console.warn("Update the import from the config file:");
		console.warn();
		console.warn("- Delete:");
		console.warn("import {Config} from \"remotion\";");
		console.warn("+ Replace:");
		console.warn("import {Config} from \"@remotion/cli/config\";");
		console.warn();
		console.warn("For more information, see https://www.remotion.dev/docs/4-0-migration.");
		process.exit(1);
	};
} });
Sequence.displayName = "Sequence";
addSequenceStackTraces(Sequence);
addSequenceStackTraces(Composition);
addSequenceStackTraces(Folder);
//#endregion
//#region node_modules/remotion/dist/esm/no-react.mjs
var normalizeNumber = (value) => {
	return Math.round(value * 1e6) / 1e6;
};
var angleUnits = /* @__PURE__ */ new Set([
	"deg",
	"rad",
	"grad",
	"turn"
]);
var lengthUnits = /* @__PURE__ */ new Set([
	"%",
	"cap",
	"ch",
	"cm",
	"cqb",
	"cqh",
	"cqi",
	"cqmax",
	"cqmin",
	"cqw",
	"dvh",
	"dvw",
	"em",
	"ex",
	"ic",
	"in",
	"lh",
	"lvh",
	"lvw",
	"mm",
	"pc",
	"pt",
	"px",
	"q",
	"rem",
	"rlh",
	"svh",
	"svw",
	"vb",
	"vh",
	"vi",
	"vmax",
	"vmin",
	"vw"
]);
var cssNumberRegex = /^([+-]?(?:\d+\.?\d*|\.\d+))([a-zA-Z%]+)?$/;
var transformOriginKeywords = /* @__PURE__ */ new Set([
	"left",
	"center",
	"right",
	"top",
	"bottom"
]);
var transformOriginKeywordOptions = (keyword) => {
	if (keyword === "left") return [{
		axis: "x",
		value: {
			value: 0,
			unit: "%"
		}
	}];
	if (keyword === "right") return [{
		axis: "x",
		value: {
			value: 100,
			unit: "%"
		}
	}];
	if (keyword === "top") return [{
		axis: "y",
		value: {
			value: 0,
			unit: "%"
		}
	}];
	if (keyword === "bottom") return [{
		axis: "y",
		value: {
			value: 100,
			unit: "%"
		}
	}];
	return [{
		axis: "x",
		value: {
			value: 50,
			unit: "%"
		}
	}, {
		axis: "y",
		value: {
			value: 50,
			unit: "%"
		}
	}];
};
var transformOriginCenter = {
	value: 50,
	unit: "%"
};
var stringifyNumber = (value) => {
	return String(normalizeNumber(value));
};
var parseStringInterpolationComponent = (component, value) => {
	const match = cssNumberRegex.exec(component);
	if (match === null) throw new TypeError(`Cannot interpolate "${value}" because "${component}" is not a supported scale, translate, or rotate value`);
	const unit = match[2] ?? null;
	const numberValue = Number(match[1]);
	if (!Number.isFinite(numberValue)) throw new TypeError(`Cannot interpolate "${value}" because "${component}" is not finite`);
	if (unit === null) return {
		kind: "scale",
		value: numberValue,
		unit: null
	};
	if (angleUnits.has(unit)) return {
		kind: "rotate",
		value: numberValue,
		unit
	};
	if (lengthUnits.has(unit)) return {
		kind: "translate",
		value: numberValue,
		unit
	};
	throw new TypeError(`Cannot interpolate "${value}" because "${unit}" is not a supported translate or rotate unit`);
};
var parseTransformOriginLengthPercentage = ({ component, value, allowPercentage }) => {
	const match = cssNumberRegex.exec(component);
	if (match === null) throw new TypeError(`Cannot interpolate "${value}" because "${component}" is not a supported transform-origin ${allowPercentage ? "length-percentage" : "z length"}`);
	const unit = match[2] ?? null;
	const numberValue = Number(match[1]);
	if (!Number.isFinite(numberValue)) throw new TypeError(`Cannot interpolate "${value}" because "${component}" is not finite`);
	if (unit === null || !lengthUnits.has(unit) || !allowPercentage && unit === "%") throw new TypeError(`Cannot interpolate "${value}" because "${component}" is not a supported transform-origin ${allowPercentage ? "length-percentage" : "z length"}`);
	return {
		value: numberValue,
		unit
	};
};
var parseTransformOriginToken = (component, value) => {
	const lower = component.toLowerCase();
	if (transformOriginKeywords.has(lower)) return {
		type: "keyword",
		keyword: lower
	};
	return {
		type: "length-percentage",
		parsed: parseTransformOriginLengthPercentage({
			component,
			value,
			allowPercentage: true
		})
	};
};
var parseTwoTransformOriginKeywords = (first, second, value) => {
	const candidates = [];
	for (const firstOption of transformOriginKeywordOptions(first)) for (const secondOption of transformOriginKeywordOptions(second)) {
		if (firstOption.axis === secondOption.axis) continue;
		candidates.push(firstOption.axis === "x" ? [firstOption.value, secondOption.value] : [secondOption.value, firstOption.value]);
	}
	if (candidates.length === 0) throw new TypeError(`Cannot interpolate "${value}" because "${first} ${second}" is not a valid transform-origin keyword pair`);
	return candidates[0];
};
var parseTransformOriginXY = (parts, value) => {
	if (parts.length === 1) {
		const token = parseTransformOriginToken(parts[0], value);
		if (token.type === "length-percentage") return [token.parsed, transformOriginCenter];
		if (token.keyword === "top" || token.keyword === "bottom") return [transformOriginCenter, transformOriginKeywordOptions(token.keyword)[0].value];
		return [transformOriginKeywordOptions(token.keyword)[0].value, transformOriginCenter];
	}
	const first = parseTransformOriginToken(parts[0], value);
	const second = parseTransformOriginToken(parts[1], value);
	if (first.type === "length-percentage" && second.type === "length-percentage") return [first.parsed, second.parsed];
	if (first.type === "keyword" && second.type === "keyword") return parseTwoTransformOriginKeywords(first.keyword, second.keyword, value);
	const keyword = first.type === "keyword" ? first : second.type === "keyword" ? second : null;
	const length = first.type === "length-percentage" ? first.parsed : second.type === "length-percentage" ? second.parsed : null;
	if (keyword === null || length === null) throw new Error("Expected a keyword and a length-percentage value");
	const keywordIsFirst = first.type === "keyword";
	if (keyword.keyword === "left" || keyword.keyword === "right") {
		if (!keywordIsFirst) throw new TypeError(`Cannot interpolate "${value}" because horizontal transform-origin keywords must come before a length-percentage value`);
		return [transformOriginKeywordOptions(keyword.keyword)[0].value, length];
	}
	if (keyword.keyword === "top" || keyword.keyword === "bottom") return [length, transformOriginKeywordOptions(keyword.keyword)[0].value];
	return keywordIsFirst ? [transformOriginCenter, length] : [length, transformOriginCenter];
};
var parseTransformOriginValue = (output, parts) => {
	const [x, y] = parseTransformOriginXY(parts.slice(0, 2), output);
	const z = parts[2] === void 0 ? {
		value: 0,
		unit: null
	} : parseTransformOriginLengthPercentage({
		component: parts[2],
		value: output,
		allowPercentage: false
	});
	return {
		kind: "translate",
		values: [
			x.value,
			y.value,
			z.value
		],
		units: [
			x.unit,
			y.unit,
			z.unit
		],
		dimensions: parts[2] === void 0 ? 2 : 3
	};
};
var parseStringInterpolationValue = (output) => {
	if (typeof output === "number") {
		if (!Number.isFinite(output)) throw new Error(`outputRange must contain only finite numbers, but got [${output}]`);
		return {
			kind: "scale",
			values: [
				output,
				output,
				1
			],
			units: [
				null,
				null,
				null
			],
			dimensions: 1
		};
	}
	const parts = output.trim().split(/\s+/);
	if (parts.length < 1 || parts.length > 3 || parts[0] === "") throw new TypeError(`String outputRange values must contain 1 to 3 components, but got "${output}"`);
	if (parts.some((part) => transformOriginKeywords.has(part.toLowerCase()))) return parseTransformOriginValue(output, parts);
	const parsed = parts.map((part) => parseStringInterpolationComponent(part, output));
	const [{ kind }] = parsed;
	for (const part of parsed) if (part.kind !== kind) throw new TypeError(`Cannot interpolate "${output}" because it mixes ${kind} and ${part.kind} values`);
	if (kind === "scale") {
		const x = parsed[0].value;
		return {
			kind,
			values: [
				x,
				parsed[1]?.value ?? x,
				parsed[2]?.value ?? 1
			],
			units: [
				null,
				null,
				null
			],
			dimensions: parsed.length
		};
	}
	return {
		kind,
		values: [
			parsed[0].value,
			parsed[1]?.value ?? 0,
			parsed[2]?.value ?? 0
		],
		units: [
			parsed[0].unit,
			parsed[1]?.unit ?? null,
			parsed[2]?.unit ?? null
		],
		dimensions: parsed.length
	};
};
var serializeStringInterpolationValue = ({ kind, values, units, dimensions }) => {
	if (kind === "scale") return values.slice(0, dimensions).map((value) => stringifyNumber(value)).join(" ");
	return values.slice(0, dimensions).map((value, index) => `${stringifyNumber(value)}${units[index]}`).join(" ");
};
function interpolateFunction(input, inputRange, outputRange, options) {
	const { extrapolateLeft, extrapolateRight, easing } = options;
	let result = input;
	const [inputMin, inputMax] = inputRange;
	const [outputMin, outputMax] = outputRange;
	if (result < inputMin) {
		if (extrapolateLeft === "identity") return result;
		if (extrapolateLeft === "clamp") result = inputMin;
		else if (extrapolateLeft === "wrap") {
			const range = inputMax - inputMin;
			result = ((result - inputMin) % range + range) % range + inputMin;
		} else if (extrapolateLeft === "extend") {}
	}
	if (result > inputMax) {
		if (extrapolateRight === "identity") return result;
		if (extrapolateRight === "clamp") result = inputMax;
		else if (extrapolateRight === "wrap") {
			const range = inputMax - inputMin;
			result = ((result - inputMin) % range + range) % range + inputMin;
		} else if (extrapolateRight === "extend") {}
	}
	if (outputMin === outputMax) return outputMin;
	result = (result - inputMin) / (inputMax - inputMin);
	result = easing(result);
	result = result * (outputMax - outputMin) + outputMin;
	return result;
}
function findRange(input, inputRange) {
	let i;
	for (i = 1; i < inputRange.length - 1; ++i) if (inputRange[i] >= input) break;
	return i - 1;
}
var defaultEasing = (num) => num;
var shouldExtendRightForEasing = (easing) => {
	return easing.remotionShouldExtendRight === true;
};
var resolveEasingForSegment = ({ easing, segmentIndex }) => {
	if (easing === void 0) return defaultEasing;
	if (typeof easing === "function") return easing;
	return easing[segmentIndex];
};
var interpolateSegment = ({ input, inputRange, outputRange, easing, extrapolateLeft, extrapolateRight }) => {
	return interpolateFunction(input, inputRange, outputRange, {
		easing,
		extrapolateLeft,
		extrapolateRight: input > inputRange[1] && extrapolateRight === "clamp" && shouldExtendRightForEasing(easing) ? "extend" : extrapolateRight
	});
};
var interpolateNumber = ({ input, inputRange, outputRange, options }) => {
	if (inputRange.length === 1) return outputRange[0];
	const easingOption = options?.easing;
	let extrapolateLeft = "extend";
	if (options?.extrapolateLeft !== void 0) extrapolateLeft = options.extrapolateLeft;
	let extrapolateRight = "extend";
	if (options?.extrapolateRight !== void 0) extrapolateRight = options.extrapolateRight;
	const posterizedInput = options?.posterize === void 0 ? input : Math.floor(input / options.posterize) * options.posterize;
	const range = findRange(posterizedInput, inputRange);
	const easing = resolveEasingForSegment({
		easing: easingOption,
		segmentIndex: range
	});
	let result = interpolateSegment({
		input: posterizedInput,
		inputRange: [inputRange[range], inputRange[range + 1]],
		outputRange: [outputRange[range], outputRange[range + 1]],
		easing,
		extrapolateLeft,
		extrapolateRight
	});
	for (let segmentIndex = 0; segmentIndex < range; segmentIndex++) {
		const previousEasing = resolveEasingForSegment({
			easing: easingOption,
			segmentIndex
		});
		if (!shouldExtendRightForEasing(previousEasing)) continue;
		const previousSegmentEnd = inputRange[segmentIndex + 1];
		if (posterizedInput <= previousSegmentEnd) continue;
		const continuedSegmentValue = interpolateSegment({
			input: posterizedInput,
			inputRange: [inputRange[segmentIndex], previousSegmentEnd],
			outputRange: [outputRange[segmentIndex], outputRange[segmentIndex + 1]],
			easing: previousEasing,
			extrapolateLeft,
			extrapolateRight: "extend"
		});
		result += continuedSegmentValue - outputRange[segmentIndex + 1];
	}
	return result;
};
var interpolateString = ({ input, inputRange, outputRange, options }) => {
	const parsedOutputRange = outputRange.map(parseStringInterpolationValue);
	const kind = parsedOutputRange[0]?.kind;
	if (kind === void 0) throw new Error("outputRange must have at least 1 element");
	for (const parsed of parsedOutputRange) if (parsed.kind !== kind) throw new TypeError(`Cannot interpolate ${kind} values with ${parsed.kind} values`);
	const dimensions = Math.max(...parsedOutputRange.map((parsed) => parsed.dimensions));
	const units = [
		null,
		null,
		null
	];
	if (kind !== "scale") for (let axis = 0; axis < dimensions; axis++) {
		for (const parsed of parsedOutputRange) {
			const unit = parsed.units[axis];
			if (unit === null) continue;
			if (units[axis] === null) {
				units[axis] = unit;
				continue;
			}
			if (units[axis] !== unit) throw new TypeError(`Cannot interpolate ${kind} values with different units on axis ${axis + 1}: ${units[axis]} and ${unit}`);
		}
		if (units[axis] === null) throw new TypeError(`Cannot interpolate ${kind} values because axis ${axis + 1} has no unit`);
	}
	return serializeStringInterpolationValue({
		kind,
		values: [
			0,
			0,
			0
		].map((_, axis) => interpolateNumber({
			input,
			inputRange,
			outputRange: parsedOutputRange.map((parsed) => parsed.values[axis]),
			options
		})),
		units,
		dimensions
	});
};
var validateTupleOutputRange = (outputRange) => {
	const dimensions = outputRange[0]?.length;
	if (dimensions === void 0) throw new Error("outputRange must have at least 1 element");
	if (dimensions === 0) throw new TypeError("outputRange tuples must contain at least 1 number");
	for (const output of outputRange) {
		if (output.length !== dimensions) throw new TypeError(`outputRange tuples must all have the same length, but got ${dimensions} and ${output.length}`);
		for (const value of output) if (typeof value !== "number" || !Number.isFinite(value)) throw new TypeError(`outputRange tuples must contain only finite numbers, but got [${output.join(",")}]`);
	}
	return dimensions;
};
var interpolateTuple = ({ input, inputRange, outputRange, options }) => {
	const dimensions = validateTupleOutputRange(outputRange);
	return new Array(dimensions).fill(true).map((_, axis) => interpolateNumber({
		input,
		inputRange,
		outputRange: outputRange.map((output) => output[axis]),
		options
	}));
};
function checkValidInputRange(arr) {
	for (let i = 1; i < arr.length; ++i) if (!(arr[i] > arr[i - 1])) throw new Error(`inputRange must be strictly monotonically increasing but got [${arr.join(",")}]`);
}
function checkInfiniteRange(name, arr) {
	if (arr.length < 1) throw new Error(name + " must have at least 1 element");
	for (const element of arr) {
		if (typeof element !== "number") throw new Error(`${name} must contain only numbers`);
		if (!Number.isFinite(element)) throw new Error(`${name} must contain only finite numbers, but got [${arr.join(",")}]`);
	}
}
function assertValidInterpolateEasingOption(easing, inputRangeLength) {
	if (easing === void 0) return;
	if (typeof easing === "function") return;
	const expectedLength = inputRangeLength - 1;
	if (easing.length !== expectedLength) throw new Error(`When easing is an array, it must have one entry per segment between keyframes (length inputRange.length - 1 = ${expectedLength}), but got length ${easing.length}`);
	for (let i = 0; i < easing.length; i++) if (typeof easing[i] !== "function") throw new Error(`easing[${i}] must be a function`);
}
function assertValidInterpolatePosterizeOption(posterize) {
	if (posterize === void 0) return;
	if (typeof posterize !== "number" || !Number.isFinite(posterize) || posterize <= 0) throw new Error(`posterize must be a positive finite number, but got ${posterize}`);
}
function interpolate(input, inputRange, outputRange, options) {
	if (typeof input === "undefined") throw new Error("input can not be undefined");
	if (typeof inputRange === "undefined") throw new Error("inputRange can not be undefined");
	if (typeof outputRange === "undefined") throw new Error("outputRange can not be undefined");
	if (inputRange.length !== outputRange.length) throw new Error("inputRange (" + inputRange.length + ") and outputRange (" + outputRange.length + ") must have the same length");
	checkInfiniteRange("inputRange", inputRange);
	checkValidInputRange(inputRange);
	assertValidInterpolateEasingOption(options?.easing, inputRange.length);
	assertValidInterpolatePosterizeOption(options?.posterize);
	if (typeof input !== "number") throw new TypeError("Cannot interpolate an input which is not a number");
	if (!Array.isArray(outputRange)) throw new Error("outputRange must contain only numbers");
	if (outputRange.some((output) => typeof output === "string")) {
		if (!outputRange.every((output) => typeof output === "string" || typeof output === "number")) throw new TypeError("outputRange must contain only numbers, or supported scale, translate, and rotate strings");
		return interpolateString({
			input,
			inputRange,
			outputRange,
			options
		});
	}
	if (outputRange.every((output) => Array.isArray(output))) return interpolateTuple({
		input,
		inputRange,
		outputRange,
		options
	});
	if (!outputRange.every((output) => typeof output === "number")) throw new TypeError("outputRange must contain only numbers, numeric tuples, or supported scale, translate, and rotate strings");
	checkInfiniteRange("outputRange", outputRange);
	return interpolateNumber({
		input,
		inputRange,
		outputRange,
		options
	});
}
function truthy(value) {
	return Boolean(value);
}
if (typeof window !== "undefined") {
	window.remotion_renderReady = false;
	if (!window.remotion_delayRenderTimeouts) window.remotion_delayRenderTimeouts = {};
	window.remotion_delayRenderHandles = [];
}
var DELAY_RENDER_CALLSTACK_TOKEN = "The delayRender was called:";
var DELAY_RENDER_RETRIES_LEFT = "Retries left: ";
var DELAY_RENDER_RETRY_TOKEN = "- Rendering the frame will be retried.";
var DELAY_RENDER_CLEAR_TOKEN = "handle was cleared after";
var findPropsToDelete = ({ schema, key, value }) => {
	const fieldSchema = schema[key];
	if (!fieldSchema) throw new Error("Key " + JSON.stringify(key) + " not found in schema");
	if (typeof value !== "string") throw new Error("Value must be a string, but is " + JSON.stringify(value));
	if (fieldSchema.type !== "enum") throw new Error("Key " + JSON.stringify(key) + " is not an enum");
	if (!fieldSchema.variants[value]) throw new Error("Value for " + JSON.stringify(key) + " must be one of " + Object.keys(fieldSchema.variants).map((v) => JSON.stringify(v)).join(", ") + ", got " + JSON.stringify(value));
	const otherVariants = Object.keys(fieldSchema.variants).filter((v) => v !== value);
	const otherKeys = /* @__PURE__ */ new Set();
	for (const variant of otherVariants) {
		const otherVariant = fieldSchema.variants[variant];
		const keys = Object.keys(otherVariant);
		for (const k of keys) otherKeys.add(k);
	}
	return [...otherKeys];
};
var DATE_TOKEN = "remotion-date:";
var FILE_TOKEN = "remotion-file:";
var serializeJSONWithSpecialTypes = ({ data, indent, staticBase }) => {
	let customDateUsed = false;
	let customFileUsed = false;
	let mapUsed = false;
	let setUsed = false;
	try {
		return {
			serializedString: JSON.stringify(data, function(key, value) {
				const item = this[key];
				if (item instanceof Date) {
					customDateUsed = true;
					return `${DATE_TOKEN}${item.toISOString()}`;
				}
				if (item instanceof Map) {
					mapUsed = true;
					return value;
				}
				if (item instanceof Set) {
					setUsed = true;
					return value;
				}
				if (typeof item === "string" && staticBase !== null && item.startsWith(staticBase)) {
					customFileUsed = true;
					return `${FILE_TOKEN}${item.replace(staticBase + "/", "")}`;
				}
				return value;
			}, indent),
			customDateUsed,
			customFileUsed,
			mapUsed,
			setUsed
		};
	} catch (err) {
		throw new Error("Could not serialize the passed input props to JSON: " + err.message);
	}
};
var deserializeJSONWithSpecialTypes = (data) => {
	return JSON.parse(data, (_, value) => {
		if (typeof value === "string" && value.startsWith(DATE_TOKEN)) return new Date(value.replace(DATE_TOKEN, ""));
		if (typeof value === "string" && value.startsWith(FILE_TOKEN)) return `${window.remotion_staticBase}/${value.replace(FILE_TOKEN, "")}`;
		return value;
	});
};
var transformSchema = {
	"style.transformOrigin": {
		type: "transform-origin",
		step: 1,
		default: "50% 50%",
		description: "Transform origin"
	},
	"style.translate": {
		type: "translate",
		step: 1,
		default: "0px 0px",
		description: "Offset"
	},
	"style.scale": {
		type: "scale",
		max: 100,
		step: .01,
		default: 1,
		description: "Scale"
	},
	"style.rotate": {
		type: "rotation-css",
		step: 1,
		default: "0deg",
		description: "Rotation"
	},
	"style.opacity": {
		type: "number",
		min: 0,
		max: 1,
		step: .01,
		default: 1,
		description: "Opacity",
		hiddenFromList: false
	}
};
var premountSchema = {
	premountFor: {
		type: "number",
		default: 0,
		description: "Premount For",
		min: 0,
		step: 1,
		hiddenFromList: false
	},
	postmountFor: {
		type: "number",
		default: 0,
		min: 0,
		step: 1,
		hiddenFromList: true
	},
	styleWhilePremounted: { type: "hidden" },
	styleWhilePostmounted: { type: "hidden" }
};
var sequenceSchema = {
	durationInFrames: {
		type: "number",
		default: void 0,
		min: 1,
		step: 1,
		hiddenFromList: true
	},
	from: {
		type: "number",
		default: 0,
		step: 1,
		hiddenFromList: true
	},
	trimBefore: {
		type: "number",
		default: 0,
		min: 0,
		step: 1,
		hiddenFromList: true
	},
	freeze: {
		type: "number",
		default: null,
		step: 1,
		hiddenFromList: true
	},
	hidden: {
		type: "boolean",
		default: false,
		description: "Hidden"
	},
	name: { type: "hidden" },
	showInTimeline: { type: "hidden" },
	layout: {
		type: "enum",
		default: "absolute-fill",
		description: "Layout",
		variants: {
			"absolute-fill": {
				...transformSchema,
				...premountSchema
			},
			none: {}
		}
	}
};
sequenceSchema.layout;
({ ...sequenceSchema }), { ...sequenceSchema.layout };
var NUMBER = "[-+]?\\d*\\.?\\d+";
var PERCENTAGE = NUMBER + "%";
function call(...args) {
	return "\\(\\s*(" + args.join(")\\s*,\\s*(") + ")\\s*\\)";
}
var MODERN_VALUE = "(?:none|[-+]?\\d*\\.?\\d+(?:%|deg|rad|grad|turn)?)";
function modernColorCall(name) {
	return new RegExp(name + "\\(\\s*(" + MODERN_VALUE + ")\\s+(" + MODERN_VALUE + ")\\s+(" + MODERN_VALUE + ")(?:\\s*\\/\\s*(" + MODERN_VALUE + "))?\\s*\\)");
}
function getMatchers() {
	const cachedMatchers = {
		rgb: void 0,
		rgba: void 0,
		hsl: void 0,
		hsla: void 0,
		hex3: void 0,
		hex4: void 0,
		hex5: void 0,
		hex6: void 0,
		hex8: void 0,
		oklch: void 0,
		oklab: void 0,
		lab: void 0,
		lch: void 0,
		hwb: void 0
	};
	if (cachedMatchers.rgb === void 0) {
		cachedMatchers.rgb = new RegExp("rgb" + call(NUMBER, NUMBER, NUMBER));
		cachedMatchers.rgba = new RegExp("rgba" + call(NUMBER, NUMBER, NUMBER, NUMBER));
		cachedMatchers.hsl = new RegExp("hsl" + call(NUMBER, PERCENTAGE, PERCENTAGE));
		cachedMatchers.hsla = new RegExp("hsla" + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER));
		cachedMatchers.hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
		cachedMatchers.hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
		cachedMatchers.hex6 = /^#([0-9a-fA-F]{6})$/;
		cachedMatchers.hex8 = /^#([0-9a-fA-F]{8})$/;
		cachedMatchers.oklch = modernColorCall("oklch");
		cachedMatchers.oklab = modernColorCall("oklab");
		cachedMatchers.lab = modernColorCall("lab");
		cachedMatchers.lch = modernColorCall("lch");
		cachedMatchers.hwb = modernColorCall("hwb");
	}
	return cachedMatchers;
}
function hue2rgb(p, q, t) {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) return p + (q - p) * 6 * t;
	if (t < 1 / 2) return q;
	if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	return p;
}
function hslToRgb(h, s, l) {
	const q = l < .5 ? l * (1 + s) : l + s - l * s;
	const p = 2 * l - q;
	const r = hue2rgb(p, q, h + 1 / 3);
	const g = hue2rgb(p, q, h);
	const b = hue2rgb(p, q, h - 1 / 3);
	return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b * 255) << 8;
}
function parse255(str) {
	const int = Number.parseInt(str, 10);
	if (int < 0) return 0;
	if (int > 255) return 255;
	return int;
}
function parse360(str) {
	return (Number.parseFloat(str) % 360 + 360) % 360 / 360;
}
function parse1(str) {
	const num = Number.parseFloat(str);
	if (num < 0) return 0;
	if (num > 1) return 255;
	return Math.round(num * 255);
}
function parsePercentage(str) {
	const int = Number.parseFloat(str);
	if (int < 0) return 0;
	if (int > 100) return 1;
	return int / 100;
}
function parseModernComponent(str, percentScale) {
	if (str === "none") return 0;
	if (str.endsWith("%")) return Number.parseFloat(str) / 100 * percentScale;
	return Number.parseFloat(str);
}
function parseHueAngle(str) {
	if (str === "none") return 0;
	if (str.endsWith("rad")) return Number.parseFloat(str) * 180 / Math.PI;
	if (str.endsWith("grad")) return Number.parseFloat(str) * .9;
	if (str.endsWith("turn")) return Number.parseFloat(str) * 360;
	return Number.parseFloat(str);
}
function parseModernAlpha(str) {
	if (str === void 0 || str === "none") return 1;
	if (str.endsWith("%")) return Math.max(0, Math.min(1, Number.parseFloat(str) / 100));
	return Math.max(0, Math.min(1, Number.parseFloat(str)));
}
function linearToSrgb(c) {
	if (c <= .0031308) return 12.92 * c;
	return 1.055 * c ** (1 / 2.4) - .055;
}
function clamp01(v) {
	return Math.max(0, Math.min(1, v));
}
function rgbFloatToInt(r, g, b, alpha) {
	const ri = Math.round(clamp01(r) * 255);
	const gi = Math.round(clamp01(g) * 255);
	const bi = Math.round(clamp01(b) * 255);
	const ai = Math.round(clamp01(alpha) * 255);
	return (ri << 24 | gi << 16 | bi << 8 | ai) >>> 0;
}
function oklabToSrgb(L, a, b) {
	const l_ = L + .3963377774 * a + .2158037573 * b;
	const m_ = L - .1055613458 * a - .0638541728 * b;
	const s_ = L - .0894841775 * a - 1.291485548 * b;
	const l = l_ * l_ * l_;
	const m = m_ * m_ * m_;
	const s = s_ * s_ * s_;
	const rLin = 4.0767416621 * l - 3.3077115913 * m + .2309699292 * s;
	const gLin = -1.2684380046 * l + 2.6097574011 * m - .3413193965 * s;
	const bLin = -.0041960863 * l - .7034186147 * m + 1.707614701 * s;
	return [
		linearToSrgb(rLin),
		linearToSrgb(gLin),
		linearToSrgb(bLin)
	];
}
function labToSrgb(L, a, b) {
	const epsilon = 216 / 24389;
	const kappa = 24389 / 27;
	const Xn = .95047;
	const Yn = 1;
	const Zn = 1.08883;
	const fy = (L + 16) / 116;
	const fx = a / 500 + fy;
	const fz = fy - b / 200;
	const fx3 = fx * fx * fx;
	const fz3 = fz * fz * fz;
	const xr = fx3 > epsilon ? fx3 : (116 * fx - 16) / kappa;
	const yr = L > kappa * epsilon ? ((L + 16) / 116) ** 3 : L / kappa;
	const zr = fz3 > epsilon ? fz3 : (116 * fz - 16) / kappa;
	const X = xr * Xn;
	const Y = yr * Yn;
	const Z = zr * Zn;
	const rLin = 3.2404542 * X - 1.5371385 * Y - .4985314 * Z;
	const gLin = -.969266 * X + 1.8760108 * Y + .041556 * Z;
	const bLin = .0556434 * X - .2040259 * Y + 1.0572252 * Z;
	return [
		linearToSrgb(rLin),
		linearToSrgb(gLin),
		linearToSrgb(bLin)
	];
}
function hwbToSrgb(h, w, bk) {
	if (w + bk >= 1) {
		const gray = w / (w + bk);
		return [
			gray,
			gray,
			gray
		];
	}
	const q = 1;
	const p = 0;
	const r = hue2rgb(p, q, h + 1 / 3);
	const g = hue2rgb(p, q, h);
	const bl = hue2rgb(p, q, h - 1 / 3);
	const factor = 1 - w - bk;
	return [
		r * factor + w,
		g * factor + w,
		bl * factor + w
	];
}
var colorNames = {
	transparent: 0,
	aliceblue: 4042850303,
	antiquewhite: 4209760255,
	aqua: 16777215,
	aquamarine: 2147472639,
	azure: 4043309055,
	beige: 4126530815,
	bisque: 4293182719,
	black: 255,
	blanchedalmond: 4293643775,
	blue: 65535,
	blueviolet: 2318131967,
	brown: 2771004159,
	burlywood: 3736635391,
	burntsienna: 3934150143,
	cadetblue: 1604231423,
	chartreuse: 2147418367,
	chocolate: 3530104575,
	coral: 4286533887,
	cornflowerblue: 1687547391,
	cornsilk: 4294499583,
	crimson: 3692313855,
	cyan: 16777215,
	darkblue: 35839,
	darkcyan: 9145343,
	darkgoldenrod: 3095792639,
	darkgray: 2846468607,
	darkgreen: 6553855,
	darkgrey: 2846468607,
	darkkhaki: 3182914559,
	darkmagenta: 2332068863,
	darkolivegreen: 1433087999,
	darkorange: 4287365375,
	darkorchid: 2570243327,
	darkred: 2332033279,
	darksalmon: 3918953215,
	darkseagreen: 2411499519,
	darkslateblue: 1211993087,
	darkslategray: 793726975,
	darkslategrey: 793726975,
	darkturquoise: 13554175,
	darkviolet: 2483082239,
	deeppink: 4279538687,
	deepskyblue: 12582911,
	dimgray: 1768516095,
	dimgrey: 1768516095,
	dodgerblue: 512819199,
	firebrick: 2988581631,
	floralwhite: 4294635775,
	forestgreen: 579543807,
	fuchsia: 4278255615,
	gainsboro: 3705462015,
	ghostwhite: 4177068031,
	gold: 4292280575,
	goldenrod: 3668254975,
	gray: 2155905279,
	green: 8388863,
	greenyellow: 2919182335,
	grey: 2155905279,
	honeydew: 4043305215,
	hotpink: 4285117695,
	indianred: 3445382399,
	indigo: 1258324735,
	ivory: 4294963455,
	khaki: 4041641215,
	lavender: 3873897215,
	lavenderblush: 4293981695,
	lawngreen: 2096890111,
	lemonchiffon: 4294626815,
	lightblue: 2916673279,
	lightcoral: 4034953471,
	lightcyan: 3774873599,
	lightgoldenrodyellow: 4210742015,
	lightgray: 3553874943,
	lightgreen: 2431553791,
	lightgrey: 3553874943,
	lightpink: 4290167295,
	lightsalmon: 4288707327,
	lightseagreen: 548580095,
	lightskyblue: 2278488831,
	lightslategray: 2005441023,
	lightslategrey: 2005441023,
	lightsteelblue: 2965692159,
	lightyellow: 4294959359,
	lime: 16711935,
	limegreen: 852308735,
	linen: 4210091775,
	magenta: 4278255615,
	maroon: 2147483903,
	mediumaquamarine: 1724754687,
	mediumblue: 52735,
	mediumorchid: 3126187007,
	mediumpurple: 2473647103,
	mediumseagreen: 1018393087,
	mediumslateblue: 2070474495,
	mediumspringgreen: 16423679,
	mediumturquoise: 1221709055,
	mediumvioletred: 3340076543,
	midnightblue: 421097727,
	mintcream: 4127193855,
	mistyrose: 4293190143,
	moccasin: 4293178879,
	navajowhite: 4292783615,
	navy: 33023,
	oldlace: 4260751103,
	olive: 2155872511,
	olivedrab: 1804477439,
	orange: 4289003775,
	orangered: 4282712319,
	orchid: 3664828159,
	palegoldenrod: 4008225535,
	palegreen: 2566625535,
	paleturquoise: 2951671551,
	palevioletred: 3681588223,
	papayawhip: 4293907967,
	peachpuff: 4292524543,
	peru: 3448061951,
	pink: 4290825215,
	plum: 3718307327,
	powderblue: 2967529215,
	purple: 2147516671,
	rebeccapurple: 1714657791,
	red: 4278190335,
	rosybrown: 3163525119,
	royalblue: 1097458175,
	saddlebrown: 2336560127,
	salmon: 4202722047,
	sandybrown: 4104413439,
	seagreen: 780883967,
	seashell: 4294307583,
	sienna: 2689740287,
	silver: 3233857791,
	skyblue: 2278484991,
	slateblue: 1784335871,
	slategray: 1887473919,
	slategrey: 1887473919,
	snow: 4294638335,
	springgreen: 16744447,
	steelblue: 1182971135,
	tan: 3535047935,
	teal: 8421631,
	thistle: 3636451583,
	tomato: 4284696575,
	turquoise: 1088475391,
	violet: 4001558271,
	wheat: 4125012991,
	white: 4294967295,
	whitesmoke: 4126537215,
	yellow: 4294902015,
	yellowgreen: 2597139199
};
function normalizeColor(color) {
	const matchers = getMatchers();
	let match;
	if (matchers.hex6) {
		if (match = matchers.hex6.exec(color)) return Number.parseInt(match[1] + "ff", 16) >>> 0;
	}
	if (colorNames[color] !== void 0) return colorNames[color];
	if (matchers.rgb) {
		if (match = matchers.rgb.exec(color)) return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | 255) >>> 0;
	}
	if (matchers.rgba) {
		if (match = matchers.rgba.exec(color)) return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | parse1(match[4])) >>> 0;
	}
	if (matchers.hex3) {
		if (match = matchers.hex3.exec(color)) return Number.parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + "ff", 16) >>> 0;
	}
	if (matchers.hex8) {
		if (match = matchers.hex8.exec(color)) return Number.parseInt(match[1], 16) >>> 0;
	}
	if (matchers.hex4) {
		if (match = matchers.hex4.exec(color)) return Number.parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + match[4] + match[4], 16) >>> 0;
	}
	if (matchers.hsl) {
		if (match = matchers.hsl.exec(color)) return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | 255) >>> 0;
	}
	if (matchers.hsla) {
		if (match = matchers.hsla.exec(color)) return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | parse1(match[4])) >>> 0;
	}
	if (matchers.oklch) {
		if (match = matchers.oklch.exec(color)) {
			const L = parseModernComponent(match[1], 1);
			const C = parseModernComponent(match[2], .4);
			const H = parseHueAngle(match[3]);
			const alpha = parseModernAlpha(match[4]);
			const hRad = H * Math.PI / 180;
			const [r, g, b] = oklabToSrgb(L, C * Math.cos(hRad), C * Math.sin(hRad));
			return rgbFloatToInt(r, g, b, alpha);
		}
	}
	if (matchers.oklab) {
		if (match = matchers.oklab.exec(color)) {
			const L = parseModernComponent(match[1], 1);
			const a = parseModernComponent(match[2], .4);
			const b = parseModernComponent(match[3], .4);
			const alpha = parseModernAlpha(match[4]);
			const [r, g, bl] = oklabToSrgb(L, a, b);
			return rgbFloatToInt(r, g, bl, alpha);
		}
	}
	if (matchers.lab) {
		if (match = matchers.lab.exec(color)) {
			const L = parseModernComponent(match[1], 100);
			const a = parseModernComponent(match[2], 125);
			const b = parseModernComponent(match[3], 125);
			const alpha = parseModernAlpha(match[4]);
			const [r, g, bl] = labToSrgb(L, a, b);
			return rgbFloatToInt(r, g, bl, alpha);
		}
	}
	if (matchers.lch) {
		if (match = matchers.lch.exec(color)) {
			const L = parseModernComponent(match[1], 100);
			const C = parseModernComponent(match[2], 150);
			const H = parseHueAngle(match[3]);
			const alpha = parseModernAlpha(match[4]);
			const hRad = H * Math.PI / 180;
			const [r, g, bl] = labToSrgb(L, C * Math.cos(hRad), C * Math.sin(hRad));
			return rgbFloatToInt(r, g, bl, alpha);
		}
	}
	if (matchers.hwb) {
		if (match = matchers.hwb.exec(color)) {
			const H = parseHueAngle(match[1]);
			const W = parseModernComponent(match[2], 1);
			const B = parseModernComponent(match[3], 1);
			const alpha = parseModernAlpha(match[4]);
			const [r, g, bl] = hwbToSrgb(H / 360, W, B);
			return rgbFloatToInt(r, g, bl, alpha);
		}
	}
	throw new Error(`invalid color string ${color} provided`);
}
function processColor(color) {
	const normalizedColor = normalizeColor(color);
	return (normalizedColor << 24 | normalizedColor >>> 8) >>> 0;
}
var proResProfileOptions = [
	"4444-xq",
	"4444",
	"hq",
	"standard",
	"light",
	"proxy"
];
var defaultScaleValue = [
	1,
	1,
	1
];
var parseScaleString = (value) => {
	const parts = value.trim().split(/\s+/);
	if (parts.length < 1 || parts.length > 3 || parts[0] === "") return null;
	const parsed = parts.map((part) => Number(part));
	if (!parsed.every((part) => Number.isFinite(part))) return null;
	const x = parsed[0];
	return [
		x,
		parsed[1] ?? x,
		parsed[2] ?? 1
	];
};
var parseValidScaleValue = (value) => {
	if (typeof value === "number") return Number.isFinite(value) ? [
		value,
		value,
		1
	] : null;
	if (typeof value === "string") return parseScaleString(value);
	return null;
};
var parseScaleValue = (value) => {
	return parseValidScaleValue(value) ?? defaultScaleValue;
};
var serializeScaleValue = ([x, y, z]) => {
	const normalizedX = normalizeNumber(x);
	const normalizedY = normalizeNumber(y);
	const normalizedZ = normalizeNumber(z);
	if (normalizedX === normalizedY && normalizedZ === 1) return normalizedX;
	if (normalizedZ === 1) return `${normalizedX} ${normalizedY}`;
	return `${normalizedX} ${normalizedY} ${normalizedZ}`;
};
var ENABLE_V5_BREAKING_CHANGES = false;
var validateFrame = ({ allowFloats, durationInFrames, frame }) => {
	if (typeof frame === "undefined") throw new TypeError(`Argument missing for parameter "frame"`);
	if (typeof frame !== "number") throw new TypeError(`Argument passed for "frame" is not a number: ${frame}`);
	if (!Number.isFinite(frame)) throw new RangeError(`Frame ${frame} is not finite`);
	if (frame % 1 !== 0 && !allowFloats) throw new RangeError(`Argument for frame must be an integer, but got ${frame}`);
	if (frame < 0 && frame < -durationInFrames) throw new RangeError(`Cannot use frame ${frame}: Duration of composition is ${durationInFrames}, therefore the lowest frame that can be rendered is ${-durationInFrames}`);
	if (frame > durationInFrames - 1) throw new RangeError(`Cannot use frame ${frame}: Duration of composition is ${durationInFrames}, therefore the highest frame that can be rendered is ${durationInFrames - 1}`);
};
var validCodecs = [
	"h264",
	"h265",
	"vp8",
	"vp9",
	"av1",
	"mp3",
	"aac",
	"wav",
	"prores",
	"h264-mkv",
	"h264-ts",
	"gif"
];
function validateCodec(defaultCodec, location, name) {
	if (typeof defaultCodec === "undefined") return;
	if (typeof defaultCodec !== "string") throw new TypeError(`The "${name}" prop ${location} must be a string, but you passed a value of type ${typeof defaultCodec}.`);
	if (!validCodecs.includes(defaultCodec)) throw new Error(`The "${name}" prop ${location} must be one of ${validCodecs.join(", ")}, but you passed ${defaultCodec}.`);
}
var validateDefaultAndInputProps$1 = (defaultProps, name, compositionId) => {
	if (!defaultProps) return;
	if (typeof defaultProps !== "object") throw new Error(`"${name}" must be an object, but you passed a value of type ${typeof defaultProps}`);
	if (Array.isArray(defaultProps)) throw new Error(`"${name}" must be an object, an array was passed ${compositionId ? `for composition "${compositionId}"` : ""}`);
};
function validateDimension$1(amount, nameOfProp, location) {
	if (typeof amount !== "number") throw new Error(`The "${nameOfProp}" prop ${location} must be a number, but you passed a value of type ${typeof amount}`);
	if (isNaN(amount)) throw new TypeError(`The "${nameOfProp}" prop ${location} must not be NaN, but is NaN.`);
	if (!Number.isFinite(amount)) throw new TypeError(`The "${nameOfProp}" prop ${location} must be finite, but is ${amount}.`);
	if (amount % 1 !== 0) throw new TypeError(`The "${nameOfProp}" prop ${location} must be an integer, but is ${amount}.`);
	if (amount <= 0) throw new TypeError(`The "${nameOfProp}" prop ${location} must be positive, but got ${amount}.`);
}
function validateDurationInFrames$1(durationInFrames, options) {
	const { allowFloats, component } = options;
	if (typeof durationInFrames === "undefined") throw new Error(`The "durationInFrames" prop ${component} is missing.`);
	if (typeof durationInFrames !== "number") throw new Error(`The "durationInFrames" prop ${component} must be a number, but you passed a value of type ${typeof durationInFrames}`);
	if (durationInFrames <= 0) throw new TypeError(`The "durationInFrames" prop ${component} must be positive, but got ${durationInFrames}.`);
	if (!allowFloats && durationInFrames % 1 !== 0) throw new TypeError(`The "durationInFrames" prop ${component} must be an integer, but got ${durationInFrames}.`);
	if (!Number.isFinite(durationInFrames)) throw new TypeError(`The "durationInFrames" prop ${component} must be finite, but got ${durationInFrames}.`);
}
function validateFps$1(fps, location, isGif) {
	if (typeof fps !== "number") throw new Error(`"fps" must be a number, but you passed a value of type ${typeof fps} ${location}`);
	if (!Number.isFinite(fps)) throw new Error(`"fps" must be a finite, but you passed ${fps} ${location}`);
	if (isNaN(fps)) throw new Error(`"fps" must not be NaN, but got ${fps} ${location}`);
	if (fps <= 0) throw new TypeError(`"fps" must be positive, but got ${fps} ${location}`);
	if (isGif && fps > 50) throw new TypeError(`The FPS for a GIF cannot be higher than 50. Use the --every-nth-frame option to lower the FPS: https://remotion.dev/docs/render-as-gif`);
}
var getExpectedMediaFrameUncorrected = ({ frame, playbackRate, startFrom }) => {
	return interpolate(frame, [
		-1,
		startFrom,
		startFrom + 1
	], [
		-1,
		startFrom,
		startFrom + playbackRate
	]);
};
var getAbsoluteSrc = (relativeSrc) => {
	if (typeof window === "undefined") return relativeSrc;
	if (relativeSrc.startsWith("http://") || relativeSrc.startsWith("https://") || relativeSrc.startsWith("file://") || relativeSrc.startsWith("blob:") || relativeSrc.startsWith("data:")) return relativeSrc;
	return new URL(relativeSrc, window.origin).href;
};
var getOffthreadVideoSource = ({ src, transparent, currentTime, toneMapped }) => {
	return `http://localhost:${window.remotion_proxyPort}/proxy?src=${encodeURIComponent(getAbsoluteSrc(src))}&time=${encodeURIComponent(Math.max(0, currentTime))}&transparent=${String(transparent)}&toneMapped=${String(toneMapped)}`;
};
var NoReactInternals = {
	processColor,
	truthy,
	validateFps: validateFps$1,
	validateDimension: validateDimension$1,
	validateDurationInFrames: validateDurationInFrames$1,
	validateDefaultAndInputProps: validateDefaultAndInputProps$1,
	validateFrame,
	serializeJSONWithSpecialTypes,
	bundleName: "bundle.js",
	bundleMapName: "bundle.js.map",
	deserializeJSONWithSpecialTypes,
	DELAY_RENDER_CALLSTACK_TOKEN,
	DELAY_RENDER_RETRY_TOKEN,
	DELAY_RENDER_CLEAR_TOKEN,
	DELAY_RENDER_ATTEMPT_TOKEN: DELAY_RENDER_RETRIES_LEFT,
	getOffthreadVideoSource,
	getExpectedMediaFrameUncorrected,
	ENABLE_V5_BREAKING_CHANGES,
	MIN_NODE_VERSION: ENABLE_V5_BREAKING_CHANGES ? 18 : 16,
	MIN_BUN_VERSION: ENABLE_V5_BREAKING_CHANGES ? "1.1.3" : "1.0.3",
	colorNames,
	DATE_TOKEN,
	FILE_TOKEN,
	validateCodec,
	proResProfileOptions,
	findPropsToDelete,
	sequenceSchema,
	parseScaleValue,
	serializeScaleValue
};
//#endregion
//#region node_modules/@remotion/player/dist/esm/index.mjs
if (typeof import_react.createContext !== "function") throw new Error([
	"Remotion requires React.createContext, but it is \"undefined\".",
	"If you are in a React Server Component, turn it into a client component by adding \"use client\" at the top of the file.",
	"",
	"Before:",
	"  import {Player} from \"@remotion/player\";",
	"",
	"After:",
	"  \"use client\";",
	"  import {Player} from \"@remotion/player\";"
].join(`
`));
var ICON_SIZE = 25;
var fullscreenIconSize = 16;
var focusRingFallbackColor = "Highlight";
var focusRingStyle = { stroke: "-webkit-focus-ring-color" };
var playPath = "M8 6.375C7.40904 8.17576 7.06921 10.2486 7.01438 12.3871C6.95955 14.5255 7.19163 16.6547 7.6875 18.5625C9.95364 18.2995 12.116 17.6164 14.009 16.5655C15.902 15.5147 17.4755 14.124 18.6088 12.5C17.5158 10.8949 15.9949 9.51103 14.1585 8.45082C12.3222 7.3906 10.2174 6.68116 8 6.375Z";
var playFocusPath = "M93.4691 0.0367432C84.4873 0.520935 77.2494 1.93634 69.9553 4.69266C66.3176 6.05219 60.3548 9.0134 57.0734 11.062C43.3476 19.6103 32.8846 32.4606 27.428 47.4154C26.3405 50.3766 23.3966 59.8188 21.5027 66.3185C8.88329 109.768 1.7204 157.277 0.182822 207.561C-0.0609408 215.569 -0.0609408 234.639 0.182822 242.517C1.21413 275.854 4.42055 305.949 10.2334 336.641C12.596 349.063 16.3837 365.75 18.5776 373.33C23.059 388.732 32.2095 401.843 45.2227 411.453C53.9419 417.896 63.8425 422.217 74.8118 424.34C80.0996 425.365 87.075 425.83 92.2127 425.495C99.3194 425.029 113.42 423.148 124.877 421.118C176.517 411.974 224.22 395.604 267.478 372.175C294.874 357.332 318.294 341.26 340.888 321.761C363.408 302.355 382.609 281.478 399.504 258.049C403.423 252.63 405.392 249.464 407.361 245.478C412.424 235.198 414.805 224.974 414.786 213.539C414.786 202.886 412.761 193.425 408.392 183.741C406.292 179.066 404.286 175.714 399.785 169.345C383.21 145.898 364.815 125.467 342.389 105.614C307.624 74.8481 266.335 49.613 220.226 30.9334C210.232 26.8921 200.387 23.335 188.537 19.4799C163.448 11.3413 132.396 4.28293 106.126 0.763062C102.001 0.204346 96.3942 -0.112244 93.4691 0.0367432Z";
var playIconStrokeWidth = 6.25;
var playFocusStrokeWidth = 1.5;
var playFocusPadding = 2;
var playPathBounds = {
	x1: 7.006500987565134,
	y1: 6.375,
	x2: 18.6088,
	y2: 18.5625
};
var playFocusPathBounds = {
	x1: -9.999999999649709e-8,
	y1: 13203698169792638e-21,
	x2: 414.7861127950162,
	y2: 425.60252460486765
};
var expandBounds = (bounds, padding) => {
	return {
		x1: bounds.x1 - padding,
		y1: bounds.y1 - padding,
		x2: bounds.x2 + padding,
		y2: bounds.y2 + padding
	};
};
var getBoundsWidth = (bounds) => bounds.x2 - bounds.x1;
var getBoundsHeight = (bounds) => bounds.y2 - bounds.y1;
var fitBoundsTransform = ({ source, target }) => {
	const scale = Math.min(getBoundsWidth(target) / getBoundsWidth(source), getBoundsHeight(target) / getBoundsHeight(source));
	const x = target.x1 + (getBoundsWidth(target) - getBoundsWidth(source) * scale) / 2 - source.x1 * scale;
	const y = target.y1 + (getBoundsHeight(target) - getBoundsHeight(source) * scale) / 2 - source.y1 * scale;
	return `translate(${x.toFixed(4)} ${y.toFixed(4)}) scale(${scale.toFixed(5)})`;
};
var playFocusTransform = fitBoundsTransform({
	source: playFocusPathBounds,
	target: expandBounds(expandBounds(playPathBounds, playIconStrokeWidth / 2), playFocusPadding)
});
var PlayIcon = ({ focused }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: ICON_SIZE,
		height: ICON_SIZE,
		viewBox: "0 0 25 25",
		fill: "none",
		children: [focused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: playFocusPath,
			fill: "none",
			stroke: focusRingFallbackColor,
			strokeWidth: playFocusStrokeWidth,
			style: focusRingStyle,
			transform: playFocusTransform,
			vectorEffect: "non-scaling-stroke"
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: playPath,
			fill: "white",
			stroke: "white",
			strokeWidth: playIconStrokeWidth,
			strokeLinejoin: "round"
		})]
	});
};
var PauseIcon = ({ focused }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 100 100",
		width: ICON_SIZE,
		height: ICON_SIZE,
		children: [
			focused ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "21",
				y: "16",
				width: "28",
				height: "68",
				fill: "none",
				stroke: focusRingFallbackColor,
				strokeWidth: "4",
				ry: "9",
				rx: "9",
				style: focusRingStyle
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "51",
				y: "16",
				width: "28",
				height: "68",
				fill: "none",
				stroke: focusRingFallbackColor,
				strokeWidth: "4",
				ry: "9",
				rx: "9",
				style: focusRingStyle
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "25",
				y: "20",
				width: "20",
				height: "60",
				fill: "#fff",
				ry: "5",
				rx: "5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "55",
				y: "20",
				width: "20",
				height: "60",
				fill: "#fff",
				ry: "5",
				rx: "5"
			})
		]
	});
};
var FullscreenIcon = ({ isFullscreen }) => {
	const strokeWidth = 6;
	const viewSize = 32;
	const out = isFullscreen ? 0 : strokeWidth / 2;
	const middleInset = isFullscreen ? strokeWidth * 1.6 : strokeWidth / 2;
	const inset = isFullscreen ? strokeWidth * 1.6 : strokeWidth * 2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${viewSize} ${viewSize}`,
		height: fullscreenIconSize,
		width: fullscreenIconSize,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `
				M ${out} ${inset}
				L ${middleInset} ${middleInset}
				L ${inset} ${out}
				`,
				stroke: "#fff",
				strokeWidth,
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `
				M ${viewSize - out} ${inset}
				L ${viewSize - middleInset} ${middleInset}
				L ${viewSize - inset} ${out}
				`,
				stroke: "#fff",
				strokeWidth,
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `
				M ${out} ${viewSize - inset}
				L ${middleInset} ${viewSize - middleInset}
				L ${inset} ${viewSize - out}
				`,
				stroke: "#fff",
				strokeWidth,
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `
				M ${viewSize - out} ${viewSize - inset}
				L ${viewSize - middleInset} ${viewSize - middleInset}
				L ${viewSize - inset} ${viewSize - out}
				`,
				stroke: "#fff",
				strokeWidth,
				fill: "none"
			})
		]
	});
};
var VolumeOffIcon = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: ICON_SIZE,
		height: ICON_SIZE,
		viewBox: "0 0 24 24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12A4.5 4.5 0 0014 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z",
			fill: "#fff"
		})
	});
};
var VolumeOnIcon = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: ICON_SIZE,
		height: ICON_SIZE,
		viewBox: "0 0 24 24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 4.45v.2c0 .38.25.71.6.85C17.18 6.53 19 9.06 19 12s-1.82 5.47-4.4 6.5c-.36.14-.6.47-.6.85v.2c0 .63.63 1.07 1.21.85C18.6 19.11 21 15.84 21 12s-2.4-7.11-5.79-8.4c-.58-.23-1.21.22-1.21.85z",
			fill: "#fff"
		})
	});
};
var className = "__remotion_buffering_indicator";
var remotionBufferingAnimation = "__remotion_buffering_animation";
var playerStyle = {
	width: ICON_SIZE,
	height: ICON_SIZE,
	overflow: "hidden",
	lineHeight: "normal",
	fontSize: "inherit"
};
var studioStyle = {
	width: 14,
	height: 14,
	overflow: "hidden",
	lineHeight: "normal",
	fontSize: "inherit"
};
var BufferingIndicator = ({ type }) => {
	const style = type === "player" ? playerStyle : studioStyle;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
		type: "text/css",
		children: `
				@keyframes ${remotionBufferingAnimation} {
          0% {
            rotate: 0deg;
          }
          100% {
            rotate: 360deg;
          }
        }
        
        .${className} {
            animation: ${remotionBufferingAnimation} 1s linear infinite;
        }        
			`
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: type === "player" ? "0 0 22 22" : "0 0 18 18",
			style,
			className,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: type === "player" ? "M 11 4 A 7 7 0 0 1 15.1145 16.66312" : "M 9 2 A 7 7 0 0 1 13.1145 14.66312",
				stroke: "white",
				strokeLinecap: "round",
				fill: "none",
				strokeWidth: 3
			})
		})
	})] });
};
var calculatePlayerSize = ({ currentSize, width, height, compositionWidth, compositionHeight }) => {
	if (width !== void 0 && height === void 0) return { aspectRatio: [compositionWidth, compositionHeight].join("/") };
	if (height !== void 0 && width === void 0) return { aspectRatio: [compositionWidth, compositionHeight].join("/") };
	if (!currentSize) return {
		width: compositionWidth,
		height: compositionHeight
	};
	return {
		width: compositionWidth,
		height: compositionHeight
	};
};
var calculateCanvasTransformation = ({ previewSize, compositionWidth, compositionHeight, canvasSize }) => {
	const scale = Internals.calculateScale({
		canvasSize,
		compositionHeight,
		compositionWidth,
		previewSize
	});
	const correction = 0 - (1 - scale) / 2;
	const xCorrection = correction * compositionWidth;
	const yCorrection = correction * compositionHeight;
	const width = compositionWidth * scale;
	const height = compositionHeight * scale;
	return {
		centerX: canvasSize.width / 2 - width / 2,
		centerY: canvasSize.height / 2 - height / 2,
		xCorrection,
		yCorrection,
		scale
	};
};
var calculateOuterStyle = ({ config, style, canvasSize, overflowVisible, layout }) => {
	if (!config) return {};
	return {
		position: "relative",
		overflow: overflowVisible ? "visible" : "hidden",
		...calculatePlayerSize({
			compositionHeight: config.height,
			compositionWidth: config.width,
			currentSize: canvasSize,
			height: style?.height,
			width: style?.width
		}),
		opacity: layout ? 1 : 0,
		...style
	};
};
var calculateContainerStyle = ({ config, layout, scale, overflowVisible }) => {
	if (!config) return {};
	if (!layout) return {
		position: "absolute",
		width: config.width,
		height: config.height,
		display: "flex",
		transform: `scale(${scale})`,
		overflow: overflowVisible ? "visible" : "hidden"
	};
	return {
		position: "absolute",
		width: config.width,
		height: config.height,
		display: "flex",
		transform: `scale(${scale})`,
		marginLeft: layout.xCorrection,
		marginTop: layout.yCorrection,
		overflow: overflowVisible ? "visible" : "hidden"
	};
};
var calculateOuter = ({ layout, scale, config, overflowVisible }) => {
	if (!config) return {};
	if (!layout) return {
		width: config.width * scale,
		height: config.height * scale,
		display: "flex",
		flexDirection: "column",
		position: "absolute",
		overflow: overflowVisible ? "visible" : "hidden"
	};
	const { centerX, centerY } = layout;
	return {
		width: config.width * scale,
		height: config.height * scale,
		display: "flex",
		flexDirection: "column",
		position: "absolute",
		left: centerX,
		top: centerY,
		overflow: overflowVisible ? "visible" : "hidden"
	};
};
var PlayerEventEmitterContext = import_react.createContext(void 0);
var ThumbnailEmitterContext = import_react.createContext(void 0);
var PlayerEmitter = class {
	listeners = {
		ended: [],
		error: [],
		pause: [],
		play: [],
		ratechange: [],
		scalechange: [],
		seeked: [],
		timeupdate: [],
		frameupdate: [],
		fullscreenchange: [],
		volumechange: [],
		mutechange: [],
		waiting: [],
		resume: []
	};
	addEventListener(name, callback) {
		this.listeners[name].push(callback);
	}
	removeEventListener(name, callback) {
		this.listeners[name] = this.listeners[name].filter((l) => l !== callback);
	}
	dispatchEvent(dispatchName, context) {
		this.listeners[dispatchName].forEach((callback) => {
			callback({ detail: context });
		});
	}
	dispatchSeek = (frame) => {
		this.dispatchEvent("seeked", { frame });
	};
	dispatchVolumeChange = (volume) => {
		this.dispatchEvent("volumechange", { volume });
	};
	dispatchPause = () => {
		this.dispatchEvent("pause", void 0);
	};
	dispatchPlay = () => {
		this.dispatchEvent("play", void 0);
	};
	dispatchEnded = () => {
		this.dispatchEvent("ended", void 0);
	};
	dispatchRateChange = (playbackRate) => {
		this.dispatchEvent("ratechange", { playbackRate });
	};
	dispatchScaleChange = (scale) => {
		this.dispatchEvent("scalechange", { scale });
	};
	dispatchError = (error) => {
		this.dispatchEvent("error", { error });
	};
	dispatchTimeUpdate = (event) => {
		this.dispatchEvent("timeupdate", event);
	};
	dispatchFrameUpdate = (event) => {
		this.dispatchEvent("frameupdate", event);
	};
	dispatchFullscreenChange = (event) => {
		this.dispatchEvent("fullscreenchange", event);
	};
	dispatchMuteChange = (event) => {
		this.dispatchEvent("mutechange", event);
	};
	dispatchWaiting = (event) => {
		this.dispatchEvent("waiting", event);
	};
	dispatchResume = (event) => {
		this.dispatchEvent("resume", event);
	};
};
var ThumbnailEmitter = class {
	listeners = {
		error: [],
		waiting: [],
		resume: []
	};
	addEventListener(name, callback) {
		this.listeners[name].push(callback);
	}
	removeEventListener(name, callback) {
		this.listeners[name] = this.listeners[name].filter((l) => l !== callback);
	}
	dispatchEvent(dispatchName, context) {
		this.listeners[dispatchName].forEach((callback) => {
			callback({ detail: context });
		});
	}
	dispatchError = (error) => {
		this.dispatchEvent("error", { error });
	};
	dispatchWaiting = (event) => {
		this.dispatchEvent("waiting", event);
	};
	dispatchResume = (event) => {
		this.dispatchEvent("resume", event);
	};
};
var useBufferStateEmitter = (emitter) => {
	const bufferManager = (0, import_react.useContext)(Internals.BufferingContextReact);
	if (!bufferManager) throw new Error("BufferingContextReact not found");
	(0, import_react.useLayoutEffect)(() => {
		const clear1 = bufferManager.listenForBuffering(() => {
			bufferManager.buffering.current = true;
			emitter.dispatchWaiting({});
		});
		const clear2 = bufferManager.listenForResume(() => {
			bufferManager.buffering.current = false;
			emitter.dispatchResume({});
		});
		return () => {
			clear1.remove();
			clear2.remove();
		};
	}, [bufferManager, emitter]);
};
var PlayerEmitterProvider = ({ children, currentPlaybackRate }) => {
	const [emitter] = (0, import_react.useState)(() => new PlayerEmitter());
	if (!(0, import_react.useContext)(Internals.BufferingContextReact)) throw new Error("BufferingContextReact not found");
	(0, import_react.useEffect)(() => {
		if (currentPlaybackRate) emitter.dispatchRateChange(currentPlaybackRate);
	}, [emitter, currentPlaybackRate]);
	useBufferStateEmitter(emitter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerEventEmitterContext.Provider, {
		value: emitter,
		children
	});
};
var useHoverState = (ref, hideControlsWhenPointerDoesntMove) => {
	const [hovered, setHovered] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const { current } = ref;
		if (!current) return;
		let hoverTimeout;
		const addHoverTimeout = () => {
			if (hideControlsWhenPointerDoesntMove) {
				clearTimeout(hoverTimeout);
				hoverTimeout = setTimeout(() => {
					setHovered(false);
				}, hideControlsWhenPointerDoesntMove === true ? 3e3 : hideControlsWhenPointerDoesntMove);
			}
		};
		const onHover = () => {
			setHovered(true);
			addHoverTimeout();
		};
		const onLeave = () => {
			setHovered(false);
			clearTimeout(hoverTimeout);
		};
		const onMove = () => {
			setHovered(true);
			addHoverTimeout();
		};
		current.addEventListener("mouseenter", onHover);
		current.addEventListener("mouseleave", onLeave);
		current.addEventListener("mousemove", onMove);
		return () => {
			current.removeEventListener("mouseenter", onHover);
			current.removeEventListener("mouseleave", onLeave);
			current.removeEventListener("mousemove", onMove);
			clearTimeout(hoverTimeout);
		};
	}, [hideControlsWhenPointerDoesntMove, ref]);
	return hovered;
};
var usePlayer = () => {
	const [playing, setPlaying, imperativePlaying] = Internals.Timeline.usePlayingState();
	const [hasPlayed, setHasPlayed] = (0, import_react.useState)(false);
	const frame = Internals.Timeline.useTimelinePosition();
	const playStart = (0, import_react.useRef)(frame);
	const setFrame = Internals.Timeline.useTimelineSetFrame();
	const setTimelinePosition = Internals.Timeline.useTimelineSetFrame();
	const audioContext = (0, import_react.useContext)(Internals.SharedAudioContext);
	const audioTagsContext = (0, import_react.useContext)(Internals.SharedAudioTagsContext);
	const { audioAndVideoTags } = Internals.useTimelineContext();
	const frameRef = (0, import_react.useRef)(frame);
	frameRef.current = frame;
	const video = Internals.useVideo();
	const config = Internals.useUnsafeVideoConfig();
	const emitter = (0, import_react.useContext)(PlayerEventEmitterContext);
	const lastFrame = (config?.durationInFrames ?? 1) - 1;
	const isLastFrame = frame === lastFrame;
	const isFirstFrame = frame === 0;
	if (!emitter) throw new TypeError("Expected Player event emitter context");
	const bufferingContext = (0, import_react.useContext)(Internals.BufferingContextReact);
	if (!bufferingContext) throw new Error("Missing the buffering context. Most likely you have a Remotion version mismatch.");
	const { buffering } = bufferingContext;
	const seek = (0, import_react.useCallback)((newFrame) => {
		const frameToSeekTo = config ? Internals.TimelinePosition.clampFrameToCompositionRange(newFrame, config.durationInFrames) : Math.max(0, newFrame);
		if (video?.id) setTimelinePosition((c) => ({
			...c,
			[video.id]: frameToSeekTo
		}));
		frameRef.current = frameToSeekTo;
		emitter.dispatchSeek(frameToSeekTo);
	}, [
		config,
		emitter,
		setTimelinePosition,
		video?.id
	]);
	const play = (0, import_react.useCallback)((e) => {
		if (imperativePlaying.current) return;
		setHasPlayed(true);
		if (isLastFrame) seek(0);
		audioContext?.resume();
		if (audioTagsContext && audioTagsContext.numberOfAudioTags > 0 && e) audioTagsContext.playAllAudios();
		audioAndVideoTags.current.forEach((a) => a.play("player play() was called and playing audio from a click"));
		imperativePlaying.current = true;
		setPlaying(true);
		playStart.current = frameRef.current;
		emitter.dispatchPlay();
	}, [
		imperativePlaying,
		isLastFrame,
		audioContext,
		audioTagsContext,
		setPlaying,
		emitter,
		seek,
		audioAndVideoTags
	]);
	const pause = (0, import_react.useCallback)(() => {
		if (imperativePlaying.current) {
			imperativePlaying.current = false;
			setPlaying(false);
			emitter.dispatchPause();
			audioContext?.suspend();
		}
	}, [
		emitter,
		imperativePlaying,
		setPlaying,
		audioContext
	]);
	const pauseAndReturnToPlayStart = (0, import_react.useCallback)(() => {
		if (imperativePlaying.current) {
			imperativePlaying.current = false;
			frameRef.current = playStart.current;
			if (config) {
				setTimelinePosition((c) => ({
					...c,
					[config.id]: playStart.current
				}));
				setPlaying(false);
				emitter.dispatchPause();
			}
		}
	}, [
		config,
		emitter,
		imperativePlaying,
		setPlaying,
		setTimelinePosition
	]);
	const videoId = video?.id;
	const frameBack = (0, import_react.useCallback)((frames) => {
		if (!videoId) return null;
		if (imperativePlaying.current) return;
		setFrame((c) => {
			const prevFrame = c[videoId] ?? window.remotion_initialFrame ?? 0;
			const newFrame = Math.max(0, prevFrame - frames);
			if (prevFrame === newFrame) return c;
			return {
				...c,
				[videoId]: newFrame
			};
		});
	}, [
		imperativePlaying,
		setFrame,
		videoId
	]);
	const frameForward = (0, import_react.useCallback)((frames) => {
		if (!videoId) return null;
		if (imperativePlaying.current) return;
		setFrame((c) => {
			const prevFrame = c[videoId] ?? window.remotion_initialFrame ?? 0;
			const newFrame = Math.min(lastFrame, prevFrame + frames);
			if (prevFrame === newFrame) return c;
			return {
				...c,
				[videoId]: newFrame
			};
		});
	}, [
		videoId,
		imperativePlaying,
		lastFrame,
		setFrame
	]);
	const toggle = (0, import_react.useCallback)((e) => {
		if (imperativePlaying.current) pause();
		else play(e);
	}, [
		imperativePlaying,
		pause,
		play
	]);
	const isPlaying = (0, import_react.useCallback)(() => {
		return imperativePlaying.current;
	}, [imperativePlaying]);
	const getCurrentFrame = (0, import_react.useCallback)(() => {
		return frameRef.current;
	}, [frameRef]);
	const isBuffering = (0, import_react.useCallback)(() => {
		return buffering.current;
	}, [buffering]);
	return (0, import_react.useMemo)(() => {
		return {
			frameBack,
			frameForward,
			isLastFrame,
			emitter,
			playing,
			play,
			pause,
			seek,
			isFirstFrame,
			getCurrentFrame,
			isPlaying,
			isBuffering,
			pauseAndReturnToPlayStart,
			hasPlayed,
			toggle
		};
	}, [
		emitter,
		frameBack,
		frameForward,
		hasPlayed,
		isFirstFrame,
		isLastFrame,
		getCurrentFrame,
		pause,
		pauseAndReturnToPlayStart,
		play,
		playing,
		seek,
		toggle,
		isPlaying,
		isBuffering
	]);
};
var useBrowserMediaSession = ({ browserMediaControlsBehavior, videoConfig, playbackRate }) => {
	const { playing, pause, play, emitter, getCurrentFrame, seek } = usePlayer();
	const hasEverPlayed = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (playing) hasEverPlayed.current = true;
	}, [playing]);
	(0, import_react.useEffect)(() => {
		if (!navigator.mediaSession) return;
		if (browserMediaControlsBehavior.mode === "do-nothing") return;
		if (playing) navigator.mediaSession.playbackState = "playing";
		else if (hasEverPlayed.current) navigator.mediaSession.playbackState = "paused";
	}, [browserMediaControlsBehavior.mode, playing]);
	(0, import_react.useEffect)(() => {
		if (!navigator.mediaSession) return;
		if (browserMediaControlsBehavior.mode === "do-nothing") return;
		const onTimeUpdate = () => {
			if (!videoConfig) return;
			if (navigator.mediaSession) navigator.mediaSession.setPositionState({
				duration: videoConfig.durationInFrames / videoConfig.fps,
				playbackRate,
				position: getCurrentFrame() / videoConfig.fps
			});
		};
		emitter.addEventListener("timeupdate", onTimeUpdate);
		return () => {
			emitter.removeEventListener("timeupdate", onTimeUpdate);
		};
	}, [
		browserMediaControlsBehavior.mode,
		emitter,
		getCurrentFrame,
		playbackRate,
		videoConfig
	]);
	(0, import_react.useEffect)(() => {
		if (!navigator.mediaSession) return;
		if (browserMediaControlsBehavior.mode === "do-nothing") return;
		navigator.mediaSession.setActionHandler("play", () => {
			if (browserMediaControlsBehavior.mode === "register-media-session") play();
		});
		navigator.mediaSession.setActionHandler("pause", () => {
			if (browserMediaControlsBehavior.mode === "register-media-session") pause();
		});
		navigator.mediaSession.setActionHandler("seekto", (event) => {
			if (browserMediaControlsBehavior.mode === "register-media-session" && event.seekTime !== void 0 && videoConfig) seek(Math.round(event.seekTime * videoConfig.fps));
		});
		navigator.mediaSession.setActionHandler("seekbackward", () => {
			if (browserMediaControlsBehavior.mode === "register-media-session" && videoConfig) seek(Math.max(0, Math.round((getCurrentFrame() - 10) * videoConfig.fps)));
		});
		navigator.mediaSession.setActionHandler("seekforward", () => {
			if (browserMediaControlsBehavior.mode === "register-media-session" && videoConfig) seek(Math.max(videoConfig.durationInFrames - 1, Math.round((getCurrentFrame() + 10) * videoConfig.fps)));
		});
		navigator.mediaSession.setActionHandler("previoustrack", () => {
			if (browserMediaControlsBehavior.mode === "register-media-session") seek(0);
		});
		return () => {
			navigator.mediaSession.metadata = null;
			navigator.mediaSession.setActionHandler("play", null);
			navigator.mediaSession.setActionHandler("pause", null);
			navigator.mediaSession.setActionHandler("seekto", null);
			navigator.mediaSession.setActionHandler("seekbackward", null);
			navigator.mediaSession.setActionHandler("seekforward", null);
			navigator.mediaSession.setActionHandler("previoustrack", null);
		};
	}, [
		browserMediaControlsBehavior.mode,
		getCurrentFrame,
		pause,
		play,
		seek,
		videoConfig
	]);
};
var calculateNextFrame = ({ time, currentFrame: startFrame, playbackSpeed, fps, actualLastFrame, actualFirstFrame, framesAdvanced, shouldLoop }) => {
	const framesToAdvance = (playbackSpeed < 0 ? Math.ceil : Math.floor)(time * playbackSpeed / (1e3 / fps)) - framesAdvanced;
	const nextFrame = framesToAdvance + startFrame;
	const isCurrentFrameOutside = startFrame > actualLastFrame || startFrame < actualFirstFrame;
	const isNextFrameOutside = nextFrame > actualLastFrame || nextFrame < actualFirstFrame;
	const hasEnded = !shouldLoop && isNextFrameOutside && !isCurrentFrameOutside;
	if (playbackSpeed > 0) {
		if (isNextFrameOutside) return {
			nextFrame: actualFirstFrame,
			framesToAdvance,
			hasEnded
		};
		return {
			nextFrame,
			framesToAdvance,
			hasEnded
		};
	}
	if (isNextFrameOutside) return {
		nextFrame: actualLastFrame,
		framesToAdvance,
		hasEnded
	};
	return {
		nextFrame,
		framesToAdvance,
		hasEnded
	};
};
var getIsBackgrounded = () => {
	if (typeof document === "undefined") return false;
	return document.visibilityState === "hidden";
};
var useIsBackgrounded = () => {
	const isBackgrounded = (0, import_react.useRef)(getIsBackgrounded());
	(0, import_react.useEffect)(() => {
		const onVisibilityChange = () => {
			isBackgrounded.current = getIsBackgrounded();
		};
		document.addEventListener("visibilitychange", onVisibilityChange);
		return () => {
			document.removeEventListener("visibilitychange", onVisibilityChange);
		};
	}, []);
	return isBackgrounded;
};
var ALLOWED_GLOBAL_TIME_ANCHOR_SHIFT = .1;
var setGlobalTimeAnchor = ({ audioContext, audioSyncAnchor, absoluteTimeInSeconds, globalPlaybackRate, logLevel, force }) => {
	const newAnchor = audioContext.currentTime - absoluteTimeInSeconds / globalPlaybackRate;
	const shift = newAnchor - audioSyncAnchor.value;
	const { outputLatency } = audioContext;
	const safeOutputLatency = outputLatency === 0 ? .3 : outputLatency;
	const latency = audioContext.baseLatency + safeOutputLatency;
	if (Math.abs(shift) < ALLOWED_GLOBAL_TIME_ANCHOR_SHIFT + latency && !force) return false;
	if (Math.abs(shift) < Number.EPSILON) return false;
	Internals.Log.verbose({
		logLevel,
		tag: "audio-scheduling"
	}, "Anchor " + (force ? "forcibly " : "") + "changed from %s to %s with shift %s", audioSyncAnchor.value, newAnchor, shift);
	audioSyncAnchor.value = newAnchor;
	return true;
};
var shouldForceAnchorChange = (newState) => {
	if (newState === "suspended" || newState === "running-to-suspended") return true;
	if (newState === "closed" || newState === "interrupted" || newState === "running" || newState === "suspended-to-running") return false;
	throw new Error(`Unexpected audio context state: ${newState}`);
};
var usePlayback = ({ loop, playbackRate, moveToBeginningWhenEnded, inFrame, outFrame, browserMediaControlsBehavior, getCurrentFrame, muted }) => {
	const config = Internals.useUnsafeVideoConfig();
	const frame = Internals.Timeline.useTimelinePosition();
	const { playing, pause, emitter, isPlaying } = usePlayer();
	const setFrame = Internals.Timeline.useTimelineSetFrame();
	const sharedAudioContext = (0, import_react.useContext)(Internals.SharedAudioContext);
	const logLevel = Internals.useLogLevel();
	const isBackgroundedRef = useIsBackgrounded();
	const lastTimeUpdateTimestamp = (0, import_react.useRef)(0);
	const context = (0, import_react.useContext)(Internals.BufferingContextReact);
	if (!context) throw new Error("Missing the buffering context. Most likely you have a Remotion version mismatch.");
	useBrowserMediaSession({
		browserMediaControlsBehavior,
		playbackRate,
		videoConfig: config
	});
	(0, import_react.useLayoutEffect)(() => {
		if (!sharedAudioContext) return;
		if (!sharedAudioContext.audioContext) return;
		if (!config) return;
		if (muted) return;
		if (setGlobalTimeAnchor({
			audioContext: sharedAudioContext.audioContext,
			audioSyncAnchor: sharedAudioContext.audioSyncAnchor,
			absoluteTimeInSeconds: frame / config.fps,
			globalPlaybackRate: playbackRate,
			logLevel,
			force: false
		})) sharedAudioContext.audioSyncAnchorEmitter.dispatch("changed");
	}, [
		config,
		frame,
		logLevel,
		playbackRate,
		sharedAudioContext,
		muted
	]);
	(0, import_react.useLayoutEffect)(() => {
		const audioContext = sharedAudioContext?.audioContext;
		if (!audioContext) return;
		if (!config) return;
		if (muted) return;
		const callback = () => {
			const newState = sharedAudioContext?.getAudioContextState();
			if (newState && shouldForceAnchorChange(newState)) setGlobalTimeAnchor({
				audioContext,
				audioSyncAnchor: sharedAudioContext.audioSyncAnchor,
				absoluteTimeInSeconds: getCurrentFrame() / config.fps,
				globalPlaybackRate: playbackRate,
				logLevel,
				force: true
			});
		};
		audioContext?.addEventListener("statechange", callback);
		return () => {
			audioContext?.removeEventListener("statechange", callback);
		};
	}, [
		config,
		getCurrentFrame,
		logLevel,
		muted,
		playbackRate,
		sharedAudioContext
	]);
	(0, import_react.useEffect)(() => {
		if (!config) return;
		if (!playing) {
			sharedAudioContext?.suspend?.();
			return;
		}
		let hasBeenStopped = false;
		let reqAnimFrameCall = null;
		let startedTime = performance.now();
		let framesAdvanced = 0;
		const cancelQueuedFrame = () => {
			if (reqAnimFrameCall !== null) if (reqAnimFrameCall.type === "raf") cancelAnimationFrame(reqAnimFrameCall.id);
			else clearTimeout(reqAnimFrameCall.id);
		};
		const stop = () => {
			hasBeenStopped = true;
			cancelQueuedFrame();
		};
		const callback = () => {
			if (hasBeenStopped) return;
			if (!isPlaying()) {
				sharedAudioContext?.suspend?.();
				return;
			}
			if (!muted && !context.buffering.current) sharedAudioContext?.resume?.();
			const time = performance.now() - startedTime;
			const actualLastFrame = outFrame ?? config.durationInFrames - 1;
			const actualFirstFrame = inFrame ?? 0;
			const { nextFrame, framesToAdvance, hasEnded } = calculateNextFrame({
				time,
				currentFrame: getCurrentFrame(),
				playbackSpeed: playbackRate,
				fps: config.fps,
				actualFirstFrame,
				actualLastFrame,
				framesAdvanced,
				shouldLoop: loop
			});
			framesAdvanced += framesToAdvance;
			if (nextFrame !== getCurrentFrame() && (!hasEnded || moveToBeginningWhenEnded) && !context.buffering.current) setFrame((c) => ({
				...c,
				[config.id]: nextFrame
			}));
			if (hasEnded) {
				stop();
				pause();
				emitter.dispatchEnded();
				return;
			}
			queueNextFrame();
		};
		const queueNextFrame = () => {
			const getIsResumingAudioContext = sharedAudioContext?.getIsResumingAudioContext?.() ?? null;
			if (getIsResumingAudioContext !== null && !muted) {
				getIsResumingAudioContext.then(() => {
					startedTime = performance.now();
					framesAdvanced = 0;
					queueNextFrame();
				});
				return;
			}
			if (context.buffering.current) {
				if (!muted) sharedAudioContext?.suspend?.();
				const stopListening = context.listenForResume(() => {
					stopListening.remove();
					startedTime = performance.now();
					framesAdvanced = 0;
					queueNextFrame();
				});
				return;
			}
			if (isBackgroundedRef.current) {
				reqAnimFrameCall = {
					type: "timeout",
					id: setTimeout(callback, 1e3 / config.fps)
				};
				return;
			}
			reqAnimFrameCall = {
				type: "raf",
				id: requestAnimationFrame(callback)
			};
		};
		queueNextFrame();
		const onVisibilityChange = () => {
			if (document.visibilityState === "visible") return;
			cancelQueuedFrame();
			callback();
		};
		window.addEventListener("visibilitychange", onVisibilityChange);
		return () => {
			window.removeEventListener("visibilitychange", onVisibilityChange);
			stop();
		};
	}, [
		config,
		loop,
		pause,
		playing,
		setFrame,
		emitter,
		playbackRate,
		inFrame,
		outFrame,
		moveToBeginningWhenEnded,
		isBackgroundedRef,
		getCurrentFrame,
		context,
		isPlaying,
		sharedAudioContext,
		logLevel,
		muted
	]);
	(0, import_react.useEffect)(() => {
		const now = performance.now();
		const timeSinceLastUpdate = now - lastTimeUpdateTimestamp.current;
		if (timeSinceLastUpdate >= 250) {
			emitter.dispatchTimeUpdate({ frame });
			lastTimeUpdateTimestamp.current = now;
			return;
		}
		const timeoutId = setTimeout(() => {
			emitter.dispatchTimeUpdate({ frame });
			lastTimeUpdateTimestamp.current = performance.now();
		}, 250 - timeSinceLastUpdate);
		return () => clearTimeout(timeoutId);
	}, [emitter, frame]);
	(0, import_react.useEffect)(() => {
		emitter.dispatchFrameUpdate({ frame });
	}, [emitter, frame]);
};
var elementSizeHooks = [];
var getElement = (source) => {
	if (!source) return null;
	if ("current" in source) return source.current;
	return source;
};
var useElementSize = (source, options) => {
	const [size, setSize] = (0, import_react.useState)(() => {
		const element = getElement(source);
		if (!element) return null;
		const rect = element.getClientRects();
		if (!rect[0]) return null;
		return {
			width: rect[0].width,
			height: rect[0].height,
			left: rect[0].x,
			top: rect[0].y,
			windowSize: {
				height: window.innerHeight,
				width: window.innerWidth
			}
		};
	});
	const observer = (0, import_react.useMemo)(() => {
		if (typeof ResizeObserver === "undefined") return null;
		return new ResizeObserver((entries) => {
			const { contentRect, target } = entries[0];
			const newSize = target.getClientRects();
			if (!newSize?.[0]) {
				setSize(null);
				return;
			}
			const probableCssParentScaleX = contentRect.width === 0 ? 1 : newSize[0].width / contentRect.width;
			const probableCssParentScaleY = contentRect.height === 0 ? 1 : newSize[0].height / contentRect.height;
			const width = options.shouldApplyCssTransforms || probableCssParentScaleX === 0 ? newSize[0].width : newSize[0].width * (1 / probableCssParentScaleX);
			const height = options.shouldApplyCssTransforms || probableCssParentScaleY === 0 ? newSize[0].height : newSize[0].height * (1 / probableCssParentScaleY);
			setSize((prevState) => {
				if (prevState && prevState.width === width && prevState.height === height && prevState.left === newSize[0].x && prevState.top === newSize[0].y && prevState.windowSize.height === window.innerHeight && prevState.windowSize.width === window.innerWidth) return prevState;
				return {
					width,
					height,
					left: newSize[0].x,
					top: newSize[0].y,
					windowSize: {
						height: window.innerHeight,
						width: window.innerWidth
					}
				};
			});
		});
	}, [options.shouldApplyCssTransforms]);
	const updateSize = (0, import_react.useCallback)(() => {
		const element = getElement(source);
		if (!element) return;
		const rect = element.getClientRects();
		if (!rect[0]) {
			setSize(null);
			return;
		}
		setSize((prevState) => {
			if (prevState && prevState.width === rect[0].width && prevState.height === rect[0].height && prevState.left === rect[0].x && prevState.top === rect[0].y && prevState.windowSize.height === window.innerHeight && prevState.windowSize.width === window.innerWidth) return prevState;
			return {
				width: rect[0].width,
				height: rect[0].height,
				left: rect[0].x,
				top: rect[0].y,
				windowSize: {
					height: window.innerHeight,
					width: window.innerWidth
				}
			};
		});
	}, [source]);
	(0, import_react.useEffect)(() => {
		updateSize();
	}, [updateSize]);
	(0, import_react.useEffect)(() => {
		if (!observer) return;
		const element = getElement(source);
		if (element) observer.observe(element);
		return () => {
			if (element) observer.unobserve(element);
		};
	}, [observer, source]);
	(0, import_react.useEffect)(() => {
		if (!options.triggerOnWindowResize) return;
		window.addEventListener("resize", updateSize);
		return () => {
			window.removeEventListener("resize", updateSize);
		};
	}, [options.triggerOnWindowResize, updateSize]);
	(0, import_react.useEffect)(() => {
		elementSizeHooks.push(updateSize);
		return () => {
			elementSizeHooks = elementSizeHooks.filter((e) => e !== updateSize);
		};
	}, [updateSize]);
	return (0, import_react.useMemo)(() => {
		if (!size) return null;
		return {
			...size,
			refresh: updateSize
		};
	}, [size, updateSize]);
};
var playerCssClassname = (override) => {
	return override ?? "__remotion-player";
};
var errorStyle = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flex: 1,
	height: "100%",
	width: "100%"
};
var ErrorBoundary = class extends import_react.Component {
	state = { hasError: null };
	static getDerivedStateFromError(error) {
		return { hasError: error };
	}
	componentDidCatch(error) {
		this.props.onError(error);
	}
	render() {
		if (this.state.hasError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: errorStyle,
			children: this.props.errorFallback({ error: this.state.hasError })
		});
		return this.props.children;
	}
};
var getHashOfDomain = async () => {
	if (typeof window === "undefined") return null;
	if (typeof window.crypto === "undefined") return null;
	if (typeof window.crypto.subtle === "undefined") return null;
	try {
		const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(window.location.hostname));
		return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
	} catch {
		return null;
	}
};
var style = {
	backgroundColor: "red",
	position: "absolute",
	padding: 12,
	fontFamily: "Arial"
};
var DOMAIN_BLACKLIST = [
	"28d262b44cc61fa750f1686b16ad0604dabfe193fbc263eec05c89b7ad4c2cd6",
	"4db1b0a94be33165dfefcb3ba03d04c7a2666dd27c496d3dc9fa41858e94925e",
	"fbc48530bbf245da790f63675e84e06bab38c3b114fab07eb350025119922bdc",
	"7baf10a8932757b1b3a22b3fce10a048747ac2f8eaf638603487e3705b07eb83",
	"8a6c21a598d8c667272b5207c051b85997bf5b45d5fb712378be3f27cd72c6a6",
	"a2f7aaac9c50a9255e7fc376110c4e0bfe153722dc66ed3c5d3bf2a135f65518"
];
var ran = false;
var RenderWarningIfBlacklist = () => {
	const [unlicensed, setUnlicensed] = import_react.useState(false);
	(0, import_react.useEffect)(() => {
		if (ran) return;
		ran = true;
		getHashOfDomain().then((hash) => {
			if (hash && DOMAIN_BLACKLIST.includes(hash)) setUnlicensed(true);
		}).catch(() => {});
	}, []);
	(0, import_react.useEffect)(() => {
		if (!unlicensed) return;
		const ensureBanner = () => {
			if (!document.querySelector(".warning-banner")) {
				const div = document.createElement("div");
				div.className = "warning-banner";
				Object.assign(div.style, style, {
					zIndex: "9999",
					cssText: `${style.cssText} !important;`
				});
				div.innerHTML = `
	        <a href="https://github.com/remotion-dev/remotion/pull/4589" style="color: white;">
	          Remotion Unlicensed – Contact hi@remotion.dev
	        </a>
	      `;
				document.body.appendChild(div);
			}
		};
		const observer = new MutationObserver(() => ensureBanner());
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
		return () => {
			observer.disconnect();
		};
	}, [unlicensed]);
	if (!unlicensed) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style,
		className: "warning-banner",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			style: { color: "white" },
			href: "https://github.com/remotion-dev/remotion/pull/4589",
			children: "Remotion Unlicensed – Contact hi@remotion.dev"
		})
	});
};
var DefaultPlayPauseButton = ({ playing, buffering, focused }) => {
	if (playing && buffering) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BufferingIndicator, { type: "player" });
	if (playing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PauseIcon, { focused });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayIcon, { focused });
};
var KNOB_SIZE = 12;
var BAR_HEIGHT = 5;
var DefaultVolumeSlider = ({ volume, isVertical, onBlur, inputRef, setVolume }) => {
	const sliderContainer = (0, import_react.useMemo)(() => {
		const common = {
			paddingLeft: 5,
			height: ICON_SIZE,
			width: VOLUME_SLIDER_WIDTH,
			display: "inline-flex",
			alignItems: "center"
		};
		if (isVertical) return {
			...common,
			position: "absolute",
			transform: `rotate(-90deg) translateX(${VOLUME_SLIDER_WIDTH / 2 + ICON_SIZE / 2}px)`
		};
		return { ...common };
	}, [isVertical]);
	const randomId = typeof import_react.useId === "undefined" ? "volume-slider" : import_react.useId();
	const [randomClass] = (0, import_react.useState)(() => `__remotion-volume-slider-${random(randomId)}`.replace(".", ""));
	const onVolumeChange = (0, import_react.useCallback)((e) => {
		setVolume(parseFloat(e.target.value));
	}, [setVolume]);
	const inputStyle = (0, import_react.useMemo)(() => {
		const commonStyle = {
			WebkitAppearance: "none",
			backgroundColor: "rgba(255, 255, 255, 0.5)",
			borderRadius: BAR_HEIGHT / 2,
			cursor: "pointer",
			height: BAR_HEIGHT,
			width: VOLUME_SLIDER_WIDTH,
			backgroundImage: `linear-gradient(
				to right,
				white ${volume * 100}%, rgba(255, 255, 255, 0) ${volume * 100}%
			)`
		};
		if (isVertical) return {
			...commonStyle,
			bottom: ICON_SIZE + VOLUME_SLIDER_WIDTH / 2
		};
		return commonStyle;
	}, [isVertical, volume]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: sliderContainer,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { dangerouslySetInnerHTML: { __html: `
	.${randomClass}::-webkit-slider-thumb {
		-webkit-appearance: none;
		background-color: white;
		border-radius: ${KNOB_SIZE / 2}px;
		box-shadow: 0 0 2px black;
		height: ${KNOB_SIZE}px;
		width: ${KNOB_SIZE}px;
	}

	.${randomClass}::-moz-range-thumb {
		-webkit-appearance: none;
		background-color: white;
		border-radius: ${KNOB_SIZE / 2}px;
		box-shadow: 0 0 2px black;
		height: ${KNOB_SIZE}px;
		width: ${KNOB_SIZE}px;
	}
` } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: inputRef,
			"aria-label": "Change volume",
			className: randomClass,
			max: 1,
			min: 0,
			onBlur,
			onChange: onVolumeChange,
			step: .01,
			type: "range",
			value: volume,
			style: inputStyle
		})]
	});
};
var renderDefaultVolumeSlider = (props) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultVolumeSlider, { ...props });
};
var VOLUME_SLIDER_WIDTH = 100;
var MediaVolumeSlider = ({ displayVerticalVolumeSlider, renderMuteButton, renderVolumeSlider }) => {
	const [playerMuted, setPlayerMuted] = Internals.usePlayerMutedState();
	const [mediaVolume, setMediaVolume] = Internals.useMediaVolumeState();
	const [focused, setFocused] = (0, import_react.useState)(false);
	const parentDivRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	const hover = useHoverState(parentDivRef, false);
	const onBlur = (0, import_react.useCallback)(() => {
		setTimeout(() => {
			if (inputRef.current && document.activeElement !== inputRef.current) setFocused(false);
		}, 10);
	}, []);
	const isVolume0 = mediaVolume === 0;
	const onClick = (0, import_react.useCallback)(() => {
		if (isVolume0) {
			setMediaVolume(1);
			setPlayerMuted(false);
			return;
		}
		setPlayerMuted((mute) => !mute);
	}, [
		isVolume0,
		setPlayerMuted,
		setMediaVolume
	]);
	const parentDivStyle = (0, import_react.useMemo)(() => {
		return {
			display: "inline-flex",
			background: "none",
			border: "none",
			justifyContent: "center",
			alignItems: "center",
			touchAction: "none",
			...displayVerticalVolumeSlider && { position: "relative" }
		};
	}, [displayVerticalVolumeSlider]);
	const volumeContainer = (0, import_react.useMemo)(() => {
		return {
			display: "inline",
			width: ICON_SIZE,
			height: ICON_SIZE,
			cursor: "pointer",
			appearance: "none",
			background: "none",
			border: "none",
			padding: 0
		};
	}, []);
	const renderDefaultMuteButton = (0, import_react.useCallback)(({ muted, volume }) => {
		const isMutedOrZero = muted || volume === 0;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			"aria-label": isMutedOrZero ? "Unmute sound" : "Mute sound",
			title: isMutedOrZero ? "Unmute sound" : "Mute sound",
			onClick,
			onBlur,
			onFocus: () => setFocused(true),
			style: volumeContainer,
			type: "button",
			children: isMutedOrZero ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeOffIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeOnIcon, {})
		});
	}, [
		onBlur,
		onClick,
		volumeContainer
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: parentDivRef,
		style: parentDivStyle,
		children: [(0, import_react.useMemo)(() => {
			return renderMuteButton ? renderMuteButton({
				muted: playerMuted,
				volume: mediaVolume
			}) : renderDefaultMuteButton({
				muted: playerMuted,
				volume: mediaVolume
			});
		}, [
			playerMuted,
			mediaVolume,
			renderDefaultMuteButton,
			renderMuteButton
		]), (0, import_react.useMemo)(() => {
			return (focused || hover) && !playerMuted && !Internals.isIosSafari() ? (renderVolumeSlider ?? renderDefaultVolumeSlider)({
				isVertical: displayVerticalVolumeSlider,
				volume: mediaVolume,
				onBlur: () => setFocused(false),
				inputRef,
				setVolume: setMediaVolume
			}) : null;
		}, [
			displayVerticalVolumeSlider,
			focused,
			hover,
			playerMuted,
			mediaVolume,
			renderVolumeSlider,
			setMediaVolume
		])]
	});
};
function useComponentVisible(initialIsVisible) {
	const [isComponentVisible, setIsComponentVisible] = (0, import_react.useState)(initialIsVisible);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) setIsComponentVisible(false);
		};
		document.addEventListener("pointerup", handleClickOutside, true);
		return () => {
			document.removeEventListener("pointerup", handleClickOutside, true);
		};
	}, []);
	return {
		ref,
		isComponentVisible,
		setIsComponentVisible
	};
}
var BOTTOM = 35;
var THRESHOLD = 70;
var rateDiv = {
	height: 30,
	paddingRight: 15,
	paddingLeft: 12,
	display: "flex",
	flexDirection: "row",
	alignItems: "center"
};
var checkmarkContainer = {
	width: 22,
	display: "flex",
	alignItems: "center"
};
var checkmarkStyle = {
	width: 14,
	height: 14,
	color: "black"
};
var Checkmark = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	viewBox: "0 0 512 512",
	style: checkmarkStyle,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "currentColor",
		d: "M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"
	})
});
var formatPlaybackRate = (rate) => {
	const str = rate.toString();
	return str.includes(".") ? str : str + ".0";
};
var PlaybackrateOption = ({ rate, onSelect, selectedRate, keyboardSelectedRate }) => {
	const onClick = (0, import_react.useCallback)((e) => {
		e.stopPropagation();
		e.preventDefault();
		onSelect(rate);
	}, [onSelect, rate]);
	const [hovered, setHovered] = (0, import_react.useState)(false);
	const onMouseEnter = (0, import_react.useCallback)(() => {
		setHovered(true);
	}, []);
	const onMouseLeave = (0, import_react.useCallback)(() => {
		setHovered(false);
	}, []);
	const isFocused = keyboardSelectedRate === rate;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		onPointerEnter: onMouseEnter,
		onPointerLeave: onMouseLeave,
		tabIndex: 0,
		style: (0, import_react.useMemo)(() => {
			return {
				...rateDiv,
				backgroundColor: hovered || isFocused ? "#eee" : "transparent"
			};
		}, [hovered, isFocused]),
		onClick,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: checkmarkContainer,
				children: rate === selectedRate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkmark, {}) : null
			}),
			formatPlaybackRate(rate),
			"x"
		]
	}, rate);
};
var PlaybackPopup = ({ setIsComponentVisible, playbackRates, canvasSize }) => {
	const { setPlaybackRate, playbackRate } = Internals.usePlaybackRate();
	const [keyboardSelectedRate, setKeyboardSelectedRate] = (0, import_react.useState)(playbackRate);
	(0, import_react.useEffect)(() => {
		const listener = (e) => {
			e.preventDefault();
			if (e.key === "ArrowUp") {
				const currentIndex = playbackRates.findIndex((rate) => rate === keyboardSelectedRate);
				if (currentIndex === 0) return;
				if (currentIndex === -1) setKeyboardSelectedRate(playbackRates[0]);
				else setKeyboardSelectedRate(playbackRates[currentIndex - 1]);
			} else if (e.key === "ArrowDown") {
				const currentIndex = playbackRates.findIndex((rate) => rate === keyboardSelectedRate);
				if (currentIndex === playbackRates.length - 1) return;
				if (currentIndex === -1) setKeyboardSelectedRate(playbackRates[playbackRates.length - 1]);
				else setKeyboardSelectedRate(playbackRates[currentIndex + 1]);
			} else if (e.key === "Enter") {
				setPlaybackRate(keyboardSelectedRate);
				setIsComponentVisible(false);
			}
		};
		window.addEventListener("keydown", listener);
		return () => {
			window.removeEventListener("keydown", listener);
		};
	}, [
		playbackRates,
		keyboardSelectedRate,
		setPlaybackRate,
		setIsComponentVisible
	]);
	const onSelect = (0, import_react.useCallback)((rate) => {
		setPlaybackRate(rate);
		setIsComponentVisible(false);
	}, [setIsComponentVisible, setPlaybackRate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: (0, import_react.useMemo)(() => {
			return {
				position: "absolute",
				right: 0,
				width: 125,
				maxHeight: canvasSize.height - THRESHOLD - BOTTOM,
				bottom: 35,
				background: "#fff",
				borderRadius: 4,
				overflow: "auto",
				color: "black",
				textAlign: "left"
			};
		}, [canvasSize.height]),
		children: playbackRates.map((rate) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaybackrateOption, {
				selectedRate: playbackRate,
				onSelect,
				rate,
				keyboardSelectedRate
			}, rate);
		})
	});
};
var label = {
	fontSize: 13,
	fontWeight: "bold",
	color: "white",
	border: "2px solid white",
	borderRadius: 20,
	paddingLeft: 8,
	paddingRight: 8,
	paddingTop: 2,
	paddingBottom: 2
};
var playerButtonStyle = {
	appearance: "none",
	backgroundColor: "transparent",
	border: "none",
	cursor: "pointer",
	paddingLeft: 0,
	paddingRight: 0,
	paddingTop: 6,
	paddingBottom: 6,
	height: 37,
	display: "inline-flex",
	marginBottom: 0,
	marginTop: 0,
	alignItems: "center"
};
var button = {
	...playerButtonStyle,
	position: "relative"
};
var PlaybackrateControl = ({ playbackRates, canvasSize }) => {
	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
	const { playbackRate } = Internals.usePlaybackRate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"aria-label": "Change playback rate",
			style: button,
			onClick: (0, import_react.useCallback)((e) => {
				e.stopPropagation();
				e.preventDefault();
				setIsComponentVisible((prevIsComponentVisible) => !prevIsComponentVisible);
			}, [setIsComponentVisible]),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: label,
				children: [playbackRate, "x"]
			}), isComponentVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaybackPopup, {
				canvasSize,
				playbackRates,
				setIsComponentVisible
			})]
		})
	});
};
var getFrameFromX = (clientX, durationInFrames, width) => {
	return Math.round(interpolate$1(clientX, [0, width], [0, durationInFrames - 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp"
	}));
};
var BAR_HEIGHT2 = 5;
var KNOB_SIZE2 = 12;
var VERTICAL_PADDING = 4;
var containerStyle = {
	userSelect: "none",
	WebkitUserSelect: "none",
	paddingTop: VERTICAL_PADDING,
	paddingBottom: VERTICAL_PADDING,
	boxSizing: "border-box",
	cursor: "pointer",
	position: "relative",
	touchAction: "none"
};
var barBackground = {
	height: BAR_HEIGHT2,
	backgroundColor: "rgba(255, 255, 255, 0.25)",
	width: "100%",
	borderRadius: BAR_HEIGHT2 / 2
};
var findBodyInWhichDivIsLocated = (div) => {
	let current = div;
	while (current.parentElement) current = current.parentElement;
	return current;
};
var PlayerSeekBar = ({ durationInFrames, onSeekEnd, onSeekStart, inFrame, outFrame }) => {
	const containerRef = (0, import_react.useRef)(null);
	const barHovered = useHoverState(containerRef, false);
	const size = useElementSize(containerRef, {
		triggerOnWindowResize: true,
		shouldApplyCssTransforms: true
	});
	const { seek, play, pause, playing } = usePlayer();
	const frame = Internals.Timeline.useTimelinePosition();
	const [dragging, setDragging] = (0, import_react.useState)({ dragging: false });
	const width = size?.width ?? 0;
	const onPointerDown = (0, import_react.useCallback)((e) => {
		if (e.button !== 0) return;
		const posLeft = containerRef.current?.getBoundingClientRect().left;
		const _frame = getFrameFromX(e.clientX - posLeft, durationInFrames, width);
		pause();
		seek(_frame);
		setDragging({
			dragging: true,
			wasPlaying: playing
		});
		onSeekStart();
	}, [
		durationInFrames,
		width,
		pause,
		seek,
		playing,
		onSeekStart
	]);
	const onPointerMove = (0, import_react.useCallback)((e) => {
		if (!size) throw new Error("Player has no size");
		if (!dragging.dragging) return;
		const posLeft = containerRef.current?.getBoundingClientRect().left;
		const _frame = getFrameFromX(e.clientX - posLeft, durationInFrames, size.width);
		seek(_frame);
	}, [
		dragging.dragging,
		durationInFrames,
		seek,
		size
	]);
	const onPointerUp = (0, import_react.useCallback)(() => {
		setDragging({ dragging: false });
		if (!dragging.dragging) return;
		if (dragging.wasPlaying) play();
		else pause();
		onSeekEnd();
	}, [
		dragging,
		onSeekEnd,
		pause,
		play
	]);
	(0, import_react.useEffect)(() => {
		if (!dragging.dragging) return;
		const body = findBodyInWhichDivIsLocated(containerRef.current);
		body.addEventListener("pointermove", onPointerMove);
		body.addEventListener("pointerup", onPointerUp);
		return () => {
			body.removeEventListener("pointermove", onPointerMove);
			body.removeEventListener("pointerup", onPointerUp);
		};
	}, [
		dragging.dragging,
		onPointerMove,
		onPointerUp
	]);
	const knobStyle = (0, import_react.useMemo)(() => {
		return {
			height: KNOB_SIZE2,
			width: KNOB_SIZE2,
			borderRadius: KNOB_SIZE2 / 2,
			position: "absolute",
			top: VERTICAL_PADDING - KNOB_SIZE2 / 2 + 5 / 2,
			backgroundColor: "white",
			left: Math.max(0, frame / Math.max(1, durationInFrames - 1) * width - KNOB_SIZE2 / 2),
			boxShadow: "0 0 2px black",
			opacity: Number(barHovered || dragging.dragging)
		};
	}, [
		barHovered,
		dragging.dragging,
		durationInFrames,
		frame,
		width
	]);
	const fillStyle = (0, import_react.useMemo)(() => {
		return {
			height: BAR_HEIGHT2,
			backgroundColor: "rgba(255, 255, 255, 1)",
			width: (frame - (inFrame ?? 0)) / (durationInFrames - 1) * width,
			marginLeft: (inFrame ?? 0) / (durationInFrames - 1) * width,
			borderRadius: BAR_HEIGHT2 / 2
		};
	}, [
		durationInFrames,
		frame,
		inFrame,
		width
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: containerRef,
		onPointerDown,
		style: containerStyle,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: barBackground,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: (0, import_react.useMemo)(() => {
				return {
					height: BAR_HEIGHT2,
					backgroundColor: "rgba(255, 255, 255, 0.25)",
					width: ((outFrame ?? durationInFrames - 1) - (inFrame ?? 0)) / (durationInFrames - 1) * 100 + "%",
					marginLeft: (inFrame ?? 0) / (durationInFrames - 1) * 100 + "%",
					borderRadius: BAR_HEIGHT2 / 2,
					position: "absolute"
				};
			}, [
				durationInFrames,
				inFrame,
				outFrame
			]) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: fillStyle })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: knobStyle })]
	});
};
var formatTime = (timeInSeconds) => {
	const minutes = Math.floor(timeInSeconds / 60);
	const seconds = Math.floor(timeInSeconds - minutes * 60);
	return `${String(minutes)}:${String(seconds).padStart(2, "0")}`;
};
var PlayerTimeLabel = ({ durationInFrames, maxTimeLabelWidth, fps }) => {
	const frame = Internals.Timeline.useTimelinePosition();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: (0, import_react.useMemo)(() => {
			return {
				color: "white",
				fontFamily: "sans-serif",
				fontSize: 14,
				maxWidth: maxTimeLabelWidth === null ? void 0 : maxTimeLabelWidth,
				overflow: "hidden",
				textOverflow: "ellipsis"
			};
		}, [maxTimeLabelWidth]),
		children: [
			formatTime((frame === durationInFrames - 1 ? frame + 1 : frame) / fps),
			" / ",
			formatTime(durationInFrames / fps)
		]
	});
};
var X_SPACER = 10;
var X_PADDING = 12;
var useVideoControlsResize = ({ allowFullscreen: allowFullScreen, playerWidth }) => {
	return (0, import_react.useMemo)(() => {
		const playPauseIconSize = ICON_SIZE;
		const volumeIconSize = ICON_SIZE;
		const _fullscreenIconSize = allowFullScreen ? fullscreenIconSize : 0;
		const elementsSize = volumeIconSize + playPauseIconSize + _fullscreenIconSize + X_PADDING * 2 + X_SPACER * 2;
		const maxTimeLabelWidth = playerWidth - elementsSize;
		const maxTimeLabelWidthWithoutNegativeValue = Math.max(maxTimeLabelWidth, 0);
		const availableTimeLabelWidthIfVolumeOpen = maxTimeLabelWidthWithoutNegativeValue - VOLUME_SLIDER_WIDTH;
		const displayVerticalVolumeSlider = playerWidth < (availableTimeLabelWidthIfVolumeOpen < VOLUME_SLIDER_WIDTH ? maxTimeLabelWidthWithoutNegativeValue : availableTimeLabelWidthIfVolumeOpen) + elementsSize + VOLUME_SLIDER_WIDTH;
		return {
			maxTimeLabelWidth: maxTimeLabelWidthWithoutNegativeValue === 0 ? null : maxTimeLabelWidthWithoutNegativeValue,
			displayVerticalVolumeSlider
		};
	}, [allowFullScreen, playerWidth]);
};
var gradientSteps = [
	0,
	.013,
	.049,
	.104,
	.175,
	.259,
	.352,
	.45,
	.55,
	.648,
	.741,
	.825,
	.896,
	.951,
	.987
];
var gradientOpacities = [
	0,
	8.1,
	15.5,
	22.5,
	29,
	35.3,
	41.2,
	47.1,
	52.9,
	58.8,
	64.7,
	71,
	77.5,
	84.5,
	91.9
];
var globalGradientOpacity = 1 / .7;
var containerStyle2 = {
	boxSizing: "border-box",
	position: "absolute",
	bottom: 0,
	width: "100%",
	paddingTop: 40,
	paddingBottom: 10,
	backgroundImage: `linear-gradient(to bottom,${gradientSteps.map((g, i) => {
		return `hsla(0, 0%, 0%, ${g}) ${gradientOpacities[i] * globalGradientOpacity}%`;
	}).join(", ")}, hsl(0, 0%, 0%) 100%)`,
	backgroundSize: "auto 145px",
	display: "flex",
	paddingRight: X_PADDING,
	paddingLeft: X_PADDING,
	flexDirection: "column",
	transition: "opacity 0.3s"
};
var controlsRow = {
	display: "flex",
	flexDirection: "row",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	userSelect: "none",
	WebkitUserSelect: "none"
};
var leftPartStyle = {
	display: "flex",
	flexDirection: "row",
	userSelect: "none",
	WebkitUserSelect: "none",
	alignItems: "center"
};
var xSpacer = { width: 12 };
var ySpacer = { height: 8 };
var flex1 = { flex: 1 };
var fullscreen = {};
var Controls = ({ durationInFrames, isFullscreen, fps, showVolumeControls, onFullscreenButtonClick, allowFullscreen, onExitFullscreenButtonClick, spaceKeyToPlayOrPause, onSeekEnd, onSeekStart, inFrame, outFrame, initiallyShowControls, canvasSize, renderPlayPauseButton, renderFullscreenButton, alwaysShowControls, showPlaybackRateControl, containerRef, buffering, hideControlsWhenPointerDoesntMove, onPointerDown, onDoubleClick, renderMuteButton, renderVolumeSlider, playing, toggle, renderCustomControls }) => {
	const playButtonRef = (0, import_react.useRef)(null);
	const [playButtonFocused, setPlayButtonFocused] = (0, import_react.useState)(false);
	const [supportsFullscreen, setSupportsFullscreen] = (0, import_react.useState)(false);
	const hovered = useHoverState(containerRef, hideControlsWhenPointerDoesntMove);
	const { maxTimeLabelWidth, displayVerticalVolumeSlider } = useVideoControlsResize({
		allowFullscreen,
		playerWidth: canvasSize?.width ?? 0
	});
	const [shouldShowInitially, setInitiallyShowControls] = (0, import_react.useState)(() => {
		if (typeof initiallyShowControls === "boolean") return initiallyShowControls;
		if (typeof initiallyShowControls === "number") {
			if (initiallyShowControls % 1 !== 0) throw new Error("initiallyShowControls must be an integer or a boolean");
			if (Number.isNaN(initiallyShowControls)) throw new Error("initiallyShowControls must not be NaN");
			if (!Number.isFinite(initiallyShowControls)) throw new Error("initiallyShowControls must be finite");
			if (initiallyShowControls <= 0) throw new Error("initiallyShowControls must be a positive integer");
			return initiallyShowControls;
		}
		throw new TypeError("initiallyShowControls must be a number or a boolean");
	});
	const containerCss = (0, import_react.useMemo)(() => {
		const shouldShow = hovered || !playing || shouldShowInitially || alwaysShowControls;
		return {
			...containerStyle2,
			opacity: Number(shouldShow)
		};
	}, [
		hovered,
		shouldShowInitially,
		playing,
		alwaysShowControls
	]);
	const playPauseButtonStyle = (0, import_react.useMemo)(() => {
		if (renderPlayPauseButton !== null || playing && buffering) return playerButtonStyle;
		return {
			...playerButtonStyle,
			outline: "none"
		};
	}, [
		buffering,
		playing,
		renderPlayPauseButton
	]);
	(0, import_react.useEffect)(() => {
		if (playButtonRef.current && spaceKeyToPlayOrPause) playButtonRef.current.focus({ preventScroll: true });
	}, [playing, spaceKeyToPlayOrPause]);
	(0, import_react.useEffect)(() => {
		setSupportsFullscreen((typeof document !== "undefined" && (document.fullscreenEnabled || document.webkitFullscreenEnabled)) ?? false);
	}, []);
	(0, import_react.useEffect)(() => {
		if (shouldShowInitially === false) return;
		const timeout = setTimeout(() => {
			setInitiallyShowControls(false);
		}, shouldShowInitially === true ? 2e3 : shouldShowInitially);
		return () => {
			clearInterval(timeout);
		};
	}, [shouldShowInitially]);
	const playbackRates = (0, import_react.useMemo)(() => {
		if (showPlaybackRateControl === true) return [
			.5,
			.8,
			1,
			1.2,
			1.5,
			1.8,
			2,
			2.5,
			3
		];
		if (Array.isArray(showPlaybackRateControl)) {
			for (const rate of showPlaybackRateControl) {
				if (typeof rate !== "number") throw new Error("Every item in showPlaybackRateControl must be a number");
				if (rate <= 0) throw new Error("Every item in showPlaybackRateControl must be positive");
			}
			return showPlaybackRateControl;
		}
		return null;
	}, [showPlaybackRateControl]);
	const customControlsElement = renderCustomControls ? renderCustomControls() : null;
	const ref = (0, import_react.useRef)(null);
	const flexRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		style: containerCss,
		onPointerDown: (0, import_react.useCallback)((e) => {
			if (e.target === ref.current || e.target === flexRef.current) onPointerDown?.(e);
		}, [onPointerDown]),
		onDoubleClick: (0, import_react.useCallback)((e) => {
			if (e.target === ref.current || e.target === flexRef.current) onDoubleClick?.(e);
		}, [onDoubleClick]),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: flexRef,
				style: controlsRow,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: leftPartStyle,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								ref: playButtonRef,
								type: "button",
								style: playPauseButtonStyle,
								onClick: toggle,
								onFocus: (0, import_react.useCallback)(() => {
									setPlayButtonFocused(true);
								}, []),
								onBlur: (0, import_react.useCallback)(() => {
									setPlayButtonFocused(false);
								}, []),
								"aria-label": playing ? "Pause video" : "Play video",
								title: playing ? "Pause video" : "Play video",
								children: renderPlayPauseButton === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultPlayPauseButton, {
									buffering,
									focused: playButtonFocused,
									playing
								}) : renderPlayPauseButton({
									playing,
									isBuffering: buffering
								}) ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultPlayPauseButton, {
									buffering,
									focused: false,
									playing
								})
							}),
							showVolumeControls ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: xSpacer }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaVolumeSlider, {
								renderMuteButton,
								renderVolumeSlider,
								displayVerticalVolumeSlider
							})] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: xSpacer }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerTimeLabel, {
								durationInFrames,
								fps,
								maxTimeLabelWidth
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: xSpacer })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: flex1 }),
					customControlsElement,
					customControlsElement && playbackRates && canvasSize ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: xSpacer }) : null,
					playbackRates && canvasSize && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaybackrateControl, {
						canvasSize,
						playbackRates
					}),
					playbackRates && supportsFullscreen && allowFullscreen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: xSpacer }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: fullscreen,
						children: supportsFullscreen && allowFullscreen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": isFullscreen ? "Exit fullscreen" : "Enter Fullscreen",
							title: isFullscreen ? "Exit fullscreen" : "Enter Fullscreen",
							style: playerButtonStyle,
							onClick: isFullscreen ? onExitFullscreenButtonClick : onFullscreenButtonClick,
							children: renderFullscreenButton === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FullscreenIcon, { isFullscreen }) : renderFullscreenButton({ isFullscreen })
						}) : null
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: ySpacer }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerSeekBar, {
				onSeekEnd,
				onSeekStart,
				durationInFrames,
				inFrame,
				outFrame
			})
		]
	});
};
var IS_NODE = typeof document === "undefined";
var cancellablePromise = (promise) => {
	let isCanceled = false;
	return {
		promise: new Promise((resolve, reject) => {
			promise.then((value) => {
				if (isCanceled) {
					reject({
						isCanceled,
						value
					});
					return;
				}
				resolve(value);
			}).catch((error) => {
				reject({
					isCanceled,
					error
				});
			});
		}),
		cancel: () => {
			isCanceled = true;
		}
	};
};
var delay = (n) => new Promise((resolve) => setTimeout(resolve, n));
var useCancellablePromises = () => {
	const pendingPromises = (0, import_react.useRef)([]);
	const appendPendingPromise = (0, import_react.useCallback)((promise) => {
		pendingPromises.current = [...pendingPromises.current, promise];
	}, []);
	const removePendingPromise = (0, import_react.useCallback)((promise) => {
		pendingPromises.current = pendingPromises.current.filter((p) => p !== promise);
	}, []);
	const clearPendingPromises = (0, import_react.useCallback)(() => pendingPromises.current.map((p) => p.cancel()), []);
	return (0, import_react.useMemo)(() => ({
		appendPendingPromise,
		removePendingPromise,
		clearPendingPromises
	}), [
		appendPendingPromise,
		clearPendingPromises,
		removePendingPromise
	]);
};
var useClickPreventionOnDoubleClick = (onClick, onDoubleClick, doubleClickToFullscreen) => {
	const api = useCancellablePromises();
	const handleClick = (0, import_react.useCallback)(async (e) => {
		if (e instanceof PointerEvent ? e.pointerType === "touch" : e.nativeEvent.pointerType === "touch") {
			onClick(e);
			return;
		}
		api.clearPendingPromises();
		const waitForClick = cancellablePromise(delay(200));
		api.appendPendingPromise(waitForClick);
		try {
			await waitForClick.promise;
			api.removePendingPromise(waitForClick);
			onClick(e);
		} catch (errorInfo) {
			const info = errorInfo;
			api.removePendingPromise(waitForClick);
			if (!info.isCanceled) throw info.error;
		}
	}, [api, onClick]);
	const handlePointerDown = (0, import_react.useCallback)(() => {
		document.addEventListener("pointerup", (newEvt) => {
			handleClick(newEvt);
		}, { once: true });
	}, [handleClick]);
	const handleDoubleClick = (0, import_react.useCallback)(() => {
		api.clearPendingPromises();
		onDoubleClick();
	}, [api, onDoubleClick]);
	return (0, import_react.useMemo)(() => {
		if (!doubleClickToFullscreen) return {
			handlePointerDown: onClick,
			handleDoubleClick: () => {}
		};
		return {
			handlePointerDown,
			handleDoubleClick
		};
	}, [
		doubleClickToFullscreen,
		handleDoubleClick,
		handlePointerDown,
		onClick
	]);
};
var reactVersion = "19.2.7".split(".")[0];
if (reactVersion === "0") throw new Error(`Version ${reactVersion} of "react" is not supported by Remotion`);
var doesReactVersionSupportSuspense = parseInt(reactVersion, 10) >= 18;
var PlayerUI = ({ controls, style: style2, loop, autoPlay, allowFullscreen, inputProps, clickToPlay, showVolumeControls, doubleClickToFullscreen, spaceKeyToPlayOrPause, errorFallback, playbackRate, renderLoading, renderPoster, className: className2, moveToBeginningWhenEnded, showPosterWhenUnplayed, showPosterWhenEnded, showPosterWhenPaused, showPosterWhenBuffering, showPosterWhenBufferingAndPaused, inFrame, outFrame, initiallyShowControls, renderFullscreen: renderFullscreenButton, renderPlayPauseButton, renderMuteButton, renderVolumeSlider, renderCustomControls, alwaysShowControls, showPlaybackRateControl, posterFillMode, bufferStateDelayInMilliseconds, hideControlsWhenPointerDoesntMove, overflowVisible, browserMediaControlsBehavior, overrideInternalClassName, noSuspense }, ref) => {
	const config = Internals.useUnsafeVideoConfig();
	const video = Internals.useVideo();
	const container = (0, import_react.useRef)(null);
	const canvasSize = useElementSize(container, {
		triggerOnWindowResize: false,
		shouldApplyCssTransforms: false
	});
	const [hasPausedToResume, setHasPausedToResume] = (0, import_react.useState)(false);
	const [shouldAutoplay, setShouldAutoPlay] = (0, import_react.useState)(autoPlay);
	const [isFullscreen, setIsFullscreen] = (0, import_react.useState)(() => false);
	const [seeking, setSeeking] = (0, import_react.useState)(false);
	const supportsFullScreen = (0, import_react.useMemo)(() => {
		if (typeof document === "undefined") return false;
		return Boolean(document.fullscreenEnabled || document.webkitFullscreenEnabled);
	}, []);
	const player = usePlayer();
	const playerToggle = player.toggle;
	const { playerMuted, mediaVolume } = (0, import_react.useContext)(Internals.MediaVolumeContext);
	(0, import_react.useEffect)(() => {
		player.emitter.dispatchVolumeChange(mediaVolume);
	}, [player.emitter, mediaVolume]);
	const isMuted = playerMuted || mediaVolume === 0;
	(0, import_react.useEffect)(() => {
		player.emitter.dispatchMuteChange({ isMuted });
	}, [player.emitter, isMuted]);
	usePlayback({
		loop,
		playbackRate,
		moveToBeginningWhenEnded,
		inFrame,
		outFrame,
		getCurrentFrame: player.getCurrentFrame,
		browserMediaControlsBehavior,
		muted: isMuted
	});
	(0, import_react.useEffect)(() => {
		if (hasPausedToResume && !player.playing) {
			setHasPausedToResume(false);
			player.play();
		}
	}, [hasPausedToResume, player]);
	(0, import_react.useEffect)(() => {
		const { current } = container;
		if (!current) return;
		const onFullscreenChange = () => {
			const newValue = document.fullscreenElement === current || document.webkitFullscreenElement === current;
			setIsFullscreen(newValue);
		};
		document.addEventListener("fullscreenchange", onFullscreenChange);
		document.addEventListener("webkitfullscreenchange", onFullscreenChange);
		return () => {
			document.removeEventListener("fullscreenchange", onFullscreenChange);
			document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
		};
	}, []);
	const toggle = (0, import_react.useCallback)((e) => {
		playerToggle(e);
	}, [playerToggle]);
	const requestFullscreen = (0, import_react.useCallback)(() => {
		if (!allowFullscreen) throw new Error("allowFullscreen is false");
		if (!supportsFullScreen) throw new Error("Browser doesnt support fullscreen");
		if (!container.current) throw new Error("No player ref found");
		if (container.current.webkitRequestFullScreen) container.current.webkitRequestFullScreen();
		else container.current.requestFullscreen();
	}, [allowFullscreen, supportsFullScreen]);
	const exitFullscreen = (0, import_react.useCallback)(() => {
		if (document.webkitExitFullscreen) document.webkitExitFullscreen();
		else document.exitFullscreen();
	}, []);
	(0, import_react.useEffect)(() => {
		const { current } = container;
		if (!current) return;
		const fullscreenChange = () => {
			const element = document.webkitFullscreenElement ?? document.fullscreenElement;
			if (element && element === container.current) player.emitter.dispatchFullscreenChange({ isFullscreen: true });
			else player.emitter.dispatchFullscreenChange({ isFullscreen: false });
		};
		current.addEventListener("webkitfullscreenchange", fullscreenChange);
		current.addEventListener("fullscreenchange", fullscreenChange);
		return () => {
			current.removeEventListener("webkitfullscreenchange", fullscreenChange);
			current.removeEventListener("fullscreenchange", fullscreenChange);
		};
	}, [player.emitter]);
	const durationInFrames = config?.durationInFrames ?? 1;
	const layout = (0, import_react.useMemo)(() => {
		if (!config || !canvasSize) return null;
		return calculateCanvasTransformation({
			canvasSize,
			compositionHeight: config.height,
			compositionWidth: config.width,
			previewSize: "auto"
		});
	}, [canvasSize, config]);
	const scale = layout?.scale ?? 1;
	const initialScaleIgnored = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!initialScaleIgnored.current) {
			initialScaleIgnored.current = true;
			return;
		}
		player.emitter.dispatchScaleChange(scale);
	}, [player.emitter, scale]);
	const { setMediaVolume, setPlayerMuted } = (0, import_react.useContext)(Internals.SetMediaVolumeContext);
	const [showBufferIndicator, setShowBufferState] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let timeout = null;
		let stopped = false;
		const onBuffer = () => {
			stopped = false;
			requestAnimationFrame(() => {
				if (bufferStateDelayInMilliseconds === 0) setShowBufferState(true);
				else timeout = setTimeout(() => {
					if (!stopped) setShowBufferState(true);
				}, bufferStateDelayInMilliseconds);
			});
		};
		const onResume = () => {
			requestAnimationFrame(() => {
				stopped = true;
				setShowBufferState(false);
				if (timeout) clearTimeout(timeout);
			});
		};
		player.emitter.addEventListener("waiting", onBuffer);
		player.emitter.addEventListener("resume", onResume);
		return () => {
			player.emitter.removeEventListener("waiting", onBuffer);
			player.emitter.removeEventListener("resume", onResume);
			setShowBufferState(false);
			if (timeout) clearTimeout(timeout);
			stopped = true;
		};
	}, [bufferStateDelayInMilliseconds, player.emitter]);
	(0, import_react.useImperativeHandle)(ref, () => {
		const methods = {
			play: player.play,
			pause: () => {
				setHasPausedToResume(false);
				player.pause();
			},
			toggle,
			getContainerNode: () => container.current,
			getCurrentFrame: player.getCurrentFrame,
			isPlaying: player.isPlaying,
			seekTo: (f) => {
				const lastFrame = durationInFrames - 1;
				const frameToSeekTo = Math.max(0, Math.min(lastFrame, f));
				if (player.isPlaying()) {
					setHasPausedToResume(frameToSeekTo !== lastFrame || loop);
					player.pause();
				}
				if (frameToSeekTo === lastFrame && !loop) player.emitter.dispatchEnded();
				player.seek(frameToSeekTo);
			},
			isFullscreen: () => {
				const { current } = container;
				if (!current) return false;
				return document.fullscreenElement === current || document.webkitFullscreenElement === current;
			},
			requestFullscreen,
			exitFullscreen,
			getVolume: () => {
				if (playerMuted) return 0;
				return mediaVolume;
			},
			setVolume: (vol) => {
				if (typeof vol !== "number") throw new TypeError(`setVolume() takes a number, got value of type ${typeof vol}`);
				if (isNaN(vol)) throw new TypeError(`setVolume() got a number that is NaN. Volume must be between 0 and 1.`);
				if (vol < 0 || vol > 1) throw new TypeError(`setVolume() got a number that is out of range. Must be between 0 and 1, got ${vol}`);
				setMediaVolume(vol);
			},
			isMuted: () => isMuted,
			mute: () => {
				setPlayerMuted(true);
			},
			unmute: () => {
				setPlayerMuted(false);
			},
			getScale: () => scale,
			pauseAndReturnToPlayStart: () => {
				player.pauseAndReturnToPlayStart();
			}
		};
		return Object.assign(player.emitter, methods);
	}, [
		durationInFrames,
		exitFullscreen,
		loop,
		playerMuted,
		isMuted,
		mediaVolume,
		player,
		requestFullscreen,
		setPlayerMuted,
		setMediaVolume,
		toggle,
		scale
	]);
	const VideoComponent = video ? video.component : null;
	const outerStyle = (0, import_react.useMemo)(() => {
		return calculateOuterStyle({
			canvasSize,
			config,
			style: style2,
			overflowVisible,
			layout
		});
	}, [
		canvasSize,
		config,
		layout,
		overflowVisible,
		style2
	]);
	const outer = (0, import_react.useMemo)(() => {
		return calculateOuter({
			config,
			layout,
			scale,
			overflowVisible
		});
	}, [
		config,
		layout,
		overflowVisible,
		scale
	]);
	const containerStyle3 = (0, import_react.useMemo)(() => {
		return calculateContainerStyle({
			config,
			layout,
			scale,
			overflowVisible
		});
	}, [
		config,
		layout,
		overflowVisible,
		scale
	]);
	const playerPause = player.pause;
	const playerDispatchError = player.emitter.dispatchError;
	const onError = (0, import_react.useCallback)((error) => {
		playerPause();
		playerDispatchError(error);
	}, [playerDispatchError, playerPause]);
	const onFullscreenButtonClick = (0, import_react.useCallback)((e) => {
		e.stopPropagation();
		requestFullscreen();
	}, [requestFullscreen]);
	const onExitFullscreenButtonClick = (0, import_react.useCallback)((e) => {
		e.stopPropagation();
		exitFullscreen();
	}, [exitFullscreen]);
	const onSingleClick = (0, import_react.useCallback)((e) => {
		if (e instanceof MouseEvent ? e.button === 2 : e.nativeEvent.button) return;
		toggle(e);
	}, [toggle]);
	const onSeekStart = (0, import_react.useCallback)(() => {
		setSeeking(true);
	}, []);
	const onSeekEnd = (0, import_react.useCallback)(() => {
		setSeeking(false);
	}, []);
	const { handlePointerDown, handleDoubleClick } = useClickPreventionOnDoubleClick(onSingleClick, (0, import_react.useCallback)(() => {
		if (isFullscreen) exitFullscreen();
		else requestFullscreen();
	}, [
		exitFullscreen,
		isFullscreen,
		requestFullscreen
	]), doubleClickToFullscreen && allowFullscreen && supportsFullScreen);
	(0, import_react.useEffect)(() => {
		if (shouldAutoplay) {
			player.play();
			setShouldAutoPlay(false);
		}
	}, [shouldAutoplay, player]);
	const loadingMarkup = (0, import_react.useMemo)(() => {
		return renderLoading ? renderLoading({
			height: outerStyle.height,
			width: outerStyle.width,
			isBuffering: showBufferIndicator
		}) : null;
	}, [
		outerStyle.height,
		outerStyle.width,
		renderLoading,
		showBufferIndicator
	]);
	const currentScale = (0, import_react.useMemo)(() => {
		return {
			type: "scale",
			scale
		};
	}, [scale]);
	if (!config) return null;
	const poster = renderPoster ? renderPoster({
		height: posterFillMode === "player-size" ? outerStyle.height : config.height,
		width: posterFillMode === "player-size" ? outerStyle.width : config.width,
		isBuffering: showBufferIndicator
	}) : null;
	if (poster === void 0) throw new TypeError("renderPoster() must return a React element, but undefined was returned");
	const shouldShowPoster = poster && [
		showPosterWhenPaused && !player.isPlaying() && !seeking,
		showPosterWhenEnded && player.isLastFrame && !player.isPlaying(),
		showPosterWhenUnplayed && !player.hasPlayed && !player.isPlaying(),
		showPosterWhenBuffering && showBufferIndicator && player.isPlaying(),
		showPosterWhenBufferingAndPaused && showBufferIndicator && !player.isPlaying()
	].some(Boolean);
	const { left, top, width, height, ...outerWithoutScale } = outer;
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: outer,
			onPointerDown: clickToPlay ? handlePointerDown : void 0,
			onDoubleClick: doubleClickToFullscreen ? handleDoubleClick : void 0,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: containerStyle3,
				className: playerCssClassname(overrideInternalClassName),
				children: [VideoComponent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, {
					onError,
					errorFallback,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Internals.CurrentScaleContext.Provider, {
						value: currentScale,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoComponent, {
							...video?.props ?? {},
							...inputProps ?? {}
						})
					})
				}) : null, shouldShowPoster && posterFillMode === "composition-size" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						...outerWithoutScale,
						width: config.width,
						height: config.height
					},
					onPointerDown: clickToPlay ? handlePointerDown : void 0,
					onDoubleClick: doubleClickToFullscreen ? handleDoubleClick : void 0,
					children: poster
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderWarningIfBlacklist, {})]
		}),
		shouldShowPoster && posterFillMode === "player-size" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: outer,
			onPointerDown: clickToPlay ? handlePointerDown : void 0,
			onDoubleClick: doubleClickToFullscreen ? handleDoubleClick : void 0,
			children: poster
		}) : null,
		controls ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controls, {
			fps: config.fps,
			playing: player.playing,
			toggle: player.toggle,
			durationInFrames: config.durationInFrames,
			containerRef: container,
			onFullscreenButtonClick,
			isFullscreen,
			allowFullscreen,
			showVolumeControls,
			onExitFullscreenButtonClick,
			spaceKeyToPlayOrPause,
			onSeekEnd,
			onSeekStart,
			inFrame,
			outFrame,
			initiallyShowControls,
			canvasSize,
			renderFullscreenButton,
			renderPlayPauseButton,
			alwaysShowControls,
			showPlaybackRateControl,
			buffering: showBufferIndicator,
			hideControlsWhenPointerDoesntMove,
			onDoubleClick: doubleClickToFullscreen ? handleDoubleClick : void 0,
			onPointerDown: clickToPlay ? handlePointerDown : void 0,
			renderMuteButton,
			renderVolumeSlider,
			renderCustomControls
		}) : null
	] });
	if (noSuspense || IS_NODE && !doesReactVersionSupportSuspense) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: container,
		style: outerStyle,
		className: className2,
		children: content
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: container,
		style: outerStyle,
		className: className2,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: loadingMarkup,
			children: content
		})
	});
};
var PlayerUI_default = (0, import_react.forwardRef)(PlayerUI);
var DEFAULT_VOLUME_PERSISTENCE_KEY = "remotion.volumePreference";
var persistVolume = (volume, logLevel, volumePersistenceKey) => {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(volumePersistenceKey ?? DEFAULT_VOLUME_PERSISTENCE_KEY, String(volume));
	} catch (e) {
		Internals.Log.error({
			logLevel,
			tag: null
		}, "Could not persist volume", e);
	}
};
var getPreferredVolume = (volumePersistenceKey) => {
	if (typeof window === "undefined") return 1;
	try {
		const val = window.localStorage.getItem(volumePersistenceKey ?? DEFAULT_VOLUME_PERSISTENCE_KEY);
		return val ? Number(val) : 1;
	} catch {
		return 1;
	}
};
var PLAYER_COMP_ID = "player-comp";
var SharedPlayerContexts = ({ children, timelineContext, playbackRateContext, fps, compositionHeight, compositionWidth, durationInFrames, component, numberOfSharedAudioTags, initiallyMuted, logLevel, audioLatencyHint, sampleRate, volumePersistenceKey, initialVolume, inputProps, audioEnabled }) => {
	const persistVolumeToStorage = initialVolume === void 0;
	const compositionManagerContext = (0, import_react.useMemo)(() => {
		return {
			compositions: [{
				component,
				durationInFrames,
				height: compositionHeight,
				width: compositionWidth,
				fps,
				id: PLAYER_COMP_ID,
				nonce: [[0, 777]],
				folderName: null,
				parentFolderName: null,
				schema: null,
				calculateMetadata: null,
				stack: null
			}],
			folders: [],
			currentCompositionMetadata: {
				defaultCodec: null,
				defaultOutName: null,
				defaultPixelFormat: null,
				defaultProResProfile: null,
				defaultSampleRate: null,
				defaultVideoImageFormat: null,
				durationInFrames,
				fps,
				height: compositionHeight,
				width: compositionWidth,
				props: inputProps
			},
			canvasContent: {
				type: "composition",
				compositionId: "player-comp"
			}
		};
	}, [
		component,
		durationInFrames,
		compositionHeight,
		compositionWidth,
		fps,
		inputProps
	]);
	const [playerMuted, setPlayerMuted] = (0, import_react.useState)(() => initiallyMuted);
	const [mediaVolume, setMediaVolume] = (0, import_react.useState)(() => persistVolumeToStorage ? getPreferredVolume(volumePersistenceKey ?? null) : initialVolume);
	const mediaVolumeContextValue = (0, import_react.useMemo)(() => {
		return {
			playerMuted,
			mediaVolume
		};
	}, [playerMuted, mediaVolume]);
	const shouldCreateAudioContext = audioEnabled && !playerMuted && mediaVolume > 0;
	const setMediaVolumeAndPersist = (0, import_react.useCallback)((vol) => {
		setMediaVolume(vol);
		if (persistVolumeToStorage) persistVolume(vol, logLevel, volumePersistenceKey ?? null);
	}, [
		persistVolumeToStorage,
		logLevel,
		volumePersistenceKey
	]);
	const setMediaVolumeContextValue = (0, import_react.useMemo)(() => {
		return {
			setPlayerMuted,
			setMediaVolume: setMediaVolumeAndPersist
		};
	}, [setMediaVolumeAndPersist]);
	const logLevelContext = (0, import_react.useMemo)(() => {
		return {
			logLevel,
			mountTime: Date.now()
		};
	}, [logLevel]);
	const env = (0, import_react.useMemo)(() => {
		return {
			isPlayer: true,
			isRendering: false,
			isStudio: false,
			isClientSideRendering: false,
			isReadOnlyStudio: false
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Internals.RemotionEnvironmentContext.Provider, {
		value: env,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Internals.LogLevelContext.Provider, {
			value: logLevelContext,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Internals.CanUseRemotionHooksProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Internals.AbsoluteTimeContext.Provider, {
				value: timelineContext,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Internals.PlaybackRateContext.Provider, {
					value: playbackRateContext,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Internals.TimelineContext.Provider, {
						value: timelineContext,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Internals.CompositionManager.Provider, {
							value: compositionManagerContext,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Internals.PrefetchProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Internals.DurationsContextProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Internals.MediaVolumeContext.Provider, {
								value: mediaVolumeContextValue,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Internals.SetMediaVolumeContext.Provider, {
									value: setMediaVolumeContextValue,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Internals.BufferingProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Internals.SharedAudioContextProvider, {
										audioLatencyHint,
										audioEnabled: shouldCreateAudioContext,
										previewSampleRate: sampleRate,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Internals.SharedAudioTagsContextProvider, {
											numberOfAudioTags: numberOfSharedAudioTags,
											children
										})
									}) })
								})
							}) }) })
						})
					})
				})
			}) })
		})
	});
};
var warningShown = false;
var acknowledgeRemotionLicenseMessage = (acknowledge, logLevel) => {
	if (acknowledge) return;
	if (warningShown) return;
	warningShown = true;
	Internals.Log.warn({
		logLevel,
		tag: null
	}, "Note: Some companies are required to obtain a license to use Remotion. See: https://remotion.dev/license\nPass the `acknowledgeRemotionLicense` prop to `<Player />` function to make this message disappear.");
};
var validateSingleFrame = (frame, variableName) => {
	if (typeof frame === "undefined" || frame === null) return frame ?? null;
	if (typeof frame !== "number") throw new TypeError(`"${variableName}" must be a number, but is ${JSON.stringify(frame)}`);
	if (Number.isNaN(frame)) throw new TypeError(`"${variableName}" must not be NaN, but is ${JSON.stringify(frame)}`);
	if (!Number.isFinite(frame)) throw new TypeError(`"${variableName}" must be finite, but is ${JSON.stringify(frame)}`);
	if (frame % 1 !== 0) throw new TypeError(`"${variableName}" must be an integer, but is ${JSON.stringify(frame)}`);
	return frame;
};
var validateInOutFrames = ({ inFrame, durationInFrames, outFrame }) => {
	const validatedInFrame = validateSingleFrame(inFrame, "inFrame");
	const validatedOutFrame = validateSingleFrame(outFrame, "outFrame");
	if (validatedInFrame === null && validatedOutFrame === null) return;
	if (validatedInFrame !== null && validatedInFrame > durationInFrames - 1) throw new Error("inFrame must be less than (durationInFrames - 1), but is " + validatedInFrame);
	if (validatedOutFrame !== null && validatedOutFrame > durationInFrames - 1) throw new Error("outFrame must be less than (durationInFrames - 1), but is " + validatedOutFrame);
	if (validatedInFrame !== null && validatedInFrame < 0) throw new Error("inFrame must be greater than 0, but is " + validatedInFrame);
	if (validatedOutFrame !== null && validatedOutFrame <= 0) throw new Error(`outFrame must be greater than 0, but is ${validatedOutFrame}. If you want to render a single frame, use <Thumbnail /> instead.`);
	if (validatedOutFrame !== null && validatedInFrame !== null && validatedOutFrame <= validatedInFrame) throw new Error("outFrame must be greater than inFrame, but is " + validatedOutFrame + " <= " + validatedInFrame);
};
var validateInitialFrame = ({ initialFrame, durationInFrames }) => {
	if (typeof durationInFrames !== "number") throw new Error(`\`durationInFrames\` must be a number, but is ${JSON.stringify(durationInFrames)}`);
	if (typeof initialFrame === "undefined") return;
	if (typeof initialFrame !== "number") throw new Error(`\`initialFrame\` must be a number, but is ${JSON.stringify(initialFrame)}`);
	if (Number.isNaN(initialFrame)) throw new Error(`\`initialFrame\` must be a number, but is NaN`);
	if (!Number.isFinite(initialFrame)) throw new Error(`\`initialFrame\` must be a number, but is Infinity`);
	if (initialFrame % 1 !== 0) throw new Error(`\`initialFrame\` must be an integer, but is ${JSON.stringify(initialFrame)}`);
	if (initialFrame > durationInFrames - 1) throw new Error(`\`initialFrame\` must be less or equal than \`durationInFrames - 1\`, but is ${JSON.stringify(initialFrame)}`);
};
var validatePlaybackRate = (playbackRate) => {
	if (playbackRate === void 0) return;
	if (playbackRate > 10) throw new Error(`The highest possible playback rate is 10. You passed: ${playbackRate}`);
	if (playbackRate < -10) throw new Error(`The lowest possible playback rate is -10. You passed: ${playbackRate}`);
	if (playbackRate === 0) throw new Error(`A playback rate of 0 is not supported.`);
};
var validateFps = NoReactInternals.validateFps;
var validateDimension = NoReactInternals.validateDimension;
var validateDurationInFrames = NoReactInternals.validateDurationInFrames;
var validateDefaultAndInputProps = NoReactInternals.validateDefaultAndInputProps;
var componentOrNullIfLazy = (props) => {
	if ("component" in props) return props.component;
	return null;
};
var PlayerFn = ({ durationInFrames, compositionHeight, compositionWidth, fps, inputProps, style: style2, controls = false, loop = false, autoPlay = false, showVolumeControls = true, allowFullscreen = true, clickToPlay, doubleClickToFullscreen = false, spaceKeyToPlayOrPause = true, moveToBeginningWhenEnded = true, numberOfSharedAudioTags = 5, errorFallback = () => "⚠️", playbackRate = 1, renderLoading, className: className2, showPosterWhenUnplayed, showPosterWhenEnded, showPosterWhenPaused, showPosterWhenBuffering, showPosterWhenBufferingAndPaused, initialFrame, renderPoster, inFrame, outFrame, initiallyShowControls, renderFullscreenButton, renderPlayPauseButton, renderVolumeSlider, renderCustomControls, alwaysShowControls = false, initiallyMuted = false, showPlaybackRateControl = false, posterFillMode = "player-size", bufferStateDelayInMilliseconds, hideControlsWhenPointerDoesntMove = true, overflowVisible = false, renderMuteButton, browserMediaControlsBehavior: passedBrowserMediaControlsBehavior, overrideInternalClassName, logLevel = "info", noSuspense, acknowledgeRemotionLicense, audioLatencyHint = "playback", sampleRate = 48e3, volumePersistenceKey, initialVolume, ...componentProps }, ref) => {
	if (typeof window !== "undefined") window.remotion_isPlayer = true;
	if (componentProps.defaultProps !== void 0) throw new Error("The <Player /> component does not accept `defaultProps`, but some were passed. Use `inputProps` instead.");
	const componentForValidation = componentOrNullIfLazy(componentProps);
	if (componentForValidation?.type === Composition) throw new TypeError(`'component' should not be an instance of <Composition/>. Pass the React component directly, and set the duration, fps and dimensions as separate props. See https://www.remotion.dev/docs/player/examples for an example.`);
	if (componentForValidation === Composition) throw new TypeError(`'component' must not be the 'Composition' component. Pass your own React component directly, and set the duration, fps and dimensions as separate props. See https://www.remotion.dev/docs/player/examples for an example.`);
	(0, import_react.useState)(() => acknowledgeRemotionLicenseMessage(Boolean(acknowledgeRemotionLicense), logLevel));
	const component = Internals.useLazyComponent({
		compProps: componentProps,
		componentName: "Player",
		noSuspense: Boolean(noSuspense)
	});
	validateInitialFrame({
		initialFrame,
		durationInFrames
	});
	const [frame, setFrame] = (0, import_react.useState)(() => ({ [PLAYER_COMP_ID]: initialFrame ?? 0 }));
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [rootId] = (0, import_react.useState)("player-comp");
	const rootRef = (0, import_react.useRef)(null);
	const audioAndVideoTags = (0, import_react.useRef)([]);
	const imperativePlaying = (0, import_react.useRef)(false);
	const [currentPlaybackRate, setCurrentPlaybackRate] = (0, import_react.useState)(playbackRate);
	if (typeof compositionHeight !== "number") throw new TypeError(`'compositionHeight' must be a number but got '${typeof compositionHeight}' instead`);
	if (typeof compositionWidth !== "number") throw new TypeError(`'compositionWidth' must be a number but got '${typeof compositionWidth}' instead`);
	validateDimension(compositionHeight, "compositionHeight", "of the <Player /> component");
	validateDimension(compositionWidth, "compositionWidth", "of the <Player /> component");
	validateDurationInFrames(durationInFrames, {
		component: "of the <Player/> component",
		allowFloats: false
	});
	validateFps(fps, "as a prop of the <Player/> component", false);
	validateDefaultAndInputProps(inputProps, "inputProps", null);
	validateInOutFrames({
		durationInFrames,
		inFrame,
		outFrame
	});
	if (typeof controls !== "boolean" && typeof controls !== "undefined") throw new TypeError(`'controls' must be a boolean or undefined but got '${typeof controls}' instead`);
	if (typeof autoPlay !== "boolean" && typeof autoPlay !== "undefined") throw new TypeError(`'autoPlay' must be a boolean or undefined but got '${typeof autoPlay}' instead`);
	if (typeof loop !== "boolean" && typeof loop !== "undefined") throw new TypeError(`'loop' must be a boolean or undefined but got '${typeof loop}' instead`);
	if (typeof doubleClickToFullscreen !== "boolean" && typeof doubleClickToFullscreen !== "undefined") throw new TypeError(`'doubleClickToFullscreen' must be a boolean or undefined but got '${typeof doubleClickToFullscreen}' instead`);
	if (typeof showVolumeControls !== "boolean" && typeof showVolumeControls !== "undefined") throw new TypeError(`'showVolumeControls' must be a boolean or undefined but got '${typeof showVolumeControls}' instead`);
	if (typeof allowFullscreen !== "boolean" && typeof allowFullscreen !== "undefined") throw new TypeError(`'allowFullscreen' must be a boolean or undefined but got '${typeof allowFullscreen}' instead`);
	if (typeof clickToPlay !== "boolean" && typeof clickToPlay !== "undefined") throw new TypeError(`'clickToPlay' must be a boolean or undefined but got '${typeof clickToPlay}' instead`);
	if (typeof spaceKeyToPlayOrPause !== "boolean" && typeof spaceKeyToPlayOrPause !== "undefined") throw new TypeError(`'spaceKeyToPlayOrPause' must be a boolean or undefined but got '${typeof spaceKeyToPlayOrPause}' instead`);
	if (typeof sampleRate !== "number" || !Number.isFinite(sampleRate) || Number.isNaN(sampleRate) || sampleRate <= 0 || sampleRate % 1 !== 0) throw new TypeError(`'sampleRate' must be a positive integer but got '${sampleRate}' instead`);
	if (typeof initialVolume !== "undefined" && typeof initialVolume !== "number") throw new TypeError(`'initialVolume' must be a number or undefined but got '${typeof initialVolume}' instead`);
	if (typeof initialVolume === "number" && (!Number.isFinite(initialVolume) || Number.isNaN(initialVolume) || initialVolume < 0 || initialVolume > 1)) throw new TypeError(`'initialVolume' must be between 0 and 1 but got '${initialVolume}' instead`);
	if (typeof numberOfSharedAudioTags !== "number" || numberOfSharedAudioTags % 1 !== 0 || !Number.isFinite(numberOfSharedAudioTags) || Number.isNaN(numberOfSharedAudioTags) || numberOfSharedAudioTags < 0) throw new TypeError(`'numberOfSharedAudioTags' must be an integer but got '${numberOfSharedAudioTags}' instead`);
	validatePlaybackRate(currentPlaybackRate);
	(0, import_react.useEffect)(() => {
		setCurrentPlaybackRate(playbackRate);
	}, [playbackRate]);
	(0, import_react.useImperativeHandle)(ref, () => rootRef.current, []);
	(0, import_react.useState)(() => {
		Internals.playbackLogging({
			logLevel,
			message: `[player] Mounting <Player>. User agent = ${typeof navigator === "undefined" ? "server" : navigator.userAgent}`,
			tag: "player",
			mountTime: Date.now()
		});
	});
	const timelineContextValue = (0, import_react.useMemo)(() => {
		return {
			frame,
			playing,
			rootId,
			imperativePlaying,
			audioAndVideoTags
		};
	}, [
		frame,
		playing,
		rootId
	]);
	const playbackRateContextValue = (0, import_react.useMemo)(() => {
		return {
			playbackRate: currentPlaybackRate,
			setPlaybackRate: setCurrentPlaybackRate
		};
	}, [currentPlaybackRate]);
	const setTimelineContextValue = (0, import_react.useMemo)(() => {
		return {
			setFrame,
			setPlaying
		};
	}, [setFrame]);
	if (typeof window !== "undefined") (0, import_react.useLayoutEffect)(() => {
		Internals.CSSUtils.injectCSS(Internals.CSSUtils.makeDefaultPreviewCSS(`.${playerCssClassname(overrideInternalClassName)}`, "#fff"));
	}, [overrideInternalClassName]);
	const actualInputProps = (0, import_react.useMemo)(() => inputProps ?? {}, [inputProps]);
	const browserMediaControlsBehavior = (0, import_react.useMemo)(() => {
		return passedBrowserMediaControlsBehavior ?? { mode: "prevent-media-session" };
	}, [passedBrowserMediaControlsBehavior]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Internals.IsPlayerContextProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SharedPlayerContexts, {
		timelineContext: timelineContextValue,
		playbackRateContext: playbackRateContextValue,
		component,
		compositionHeight,
		compositionWidth,
		durationInFrames,
		fps,
		numberOfSharedAudioTags,
		initiallyMuted,
		logLevel,
		audioLatencyHint,
		sampleRate,
		volumePersistenceKey,
		initialVolume,
		inputProps: actualInputProps,
		audioEnabled: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Internals.SetTimelineContext.Provider, {
			value: setTimelineContextValue,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerEmitterProvider, {
				currentPlaybackRate,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerUI_default, {
					ref: rootRef,
					posterFillMode,
					renderLoading,
					autoPlay: Boolean(autoPlay),
					loop: Boolean(loop),
					controls: Boolean(controls),
					errorFallback,
					style: style2,
					inputProps: actualInputProps,
					allowFullscreen: Boolean(allowFullscreen),
					moveToBeginningWhenEnded: Boolean(moveToBeginningWhenEnded),
					clickToPlay: typeof clickToPlay === "boolean" ? clickToPlay : Boolean(controls),
					showVolumeControls: Boolean(showVolumeControls),
					doubleClickToFullscreen: Boolean(doubleClickToFullscreen),
					spaceKeyToPlayOrPause: Boolean(spaceKeyToPlayOrPause),
					playbackRate: currentPlaybackRate,
					className: className2 ?? void 0,
					showPosterWhenUnplayed: Boolean(showPosterWhenUnplayed),
					showPosterWhenEnded: Boolean(showPosterWhenEnded),
					showPosterWhenPaused: Boolean(showPosterWhenPaused),
					showPosterWhenBuffering: Boolean(showPosterWhenBuffering),
					showPosterWhenBufferingAndPaused: Boolean(showPosterWhenBufferingAndPaused),
					renderPoster,
					inFrame: inFrame ?? null,
					outFrame: outFrame ?? null,
					initiallyShowControls: initiallyShowControls ?? true,
					renderFullscreen: renderFullscreenButton ?? null,
					renderPlayPauseButton: renderPlayPauseButton ?? null,
					renderMuteButton: renderMuteButton ?? null,
					renderVolumeSlider: renderVolumeSlider ?? null,
					renderCustomControls: renderCustomControls ?? null,
					alwaysShowControls,
					showPlaybackRateControl,
					bufferStateDelayInMilliseconds: bufferStateDelayInMilliseconds ?? 300,
					hideControlsWhenPointerDoesntMove,
					overflowVisible,
					browserMediaControlsBehavior,
					overrideInternalClassName: overrideInternalClassName ?? void 0,
					noSuspense: Boolean(noSuspense)
				})
			})
		})
	}) });
};
var Player = (0, import_react.forwardRef)(PlayerFn);
var useThumbnail = () => {
	const emitter = (0, import_react.useContext)(ThumbnailEmitterContext);
	if (!emitter) throw new TypeError("Expected Player event emitter context");
	return (0, import_react.useMemo)(() => {
		return { emitter };
	}, [emitter]);
};
var reactVersion2 = "19.2.7".split(".")[0];
if (reactVersion2 === "0") throw new Error(`Version ${reactVersion2} of "react" is not supported by Remotion`);
var doesReactVersionSupportSuspense2 = parseInt(reactVersion2, 10) >= 18;
var ThumbnailUI = ({ style: style2, inputProps, errorFallback, renderLoading, className: className2, overflowVisible, noSuspense, overrideInternalClassName }, ref) => {
	const config = Internals.useUnsafeVideoConfig();
	const video = Internals.useVideo();
	const container = (0, import_react.useRef)(null);
	const canvasSize = useElementSize(container, {
		triggerOnWindowResize: false,
		shouldApplyCssTransforms: false
	});
	const layout = (0, import_react.useMemo)(() => {
		if (!config || !canvasSize) return null;
		return calculateCanvasTransformation({
			canvasSize,
			compositionHeight: config.height,
			compositionWidth: config.width,
			previewSize: "auto"
		});
	}, [canvasSize, config]);
	const scale = layout?.scale ?? 1;
	const thumbnail = useThumbnail();
	useBufferStateEmitter(thumbnail.emitter);
	(0, import_react.useImperativeHandle)(ref, () => {
		return Object.assign(thumbnail.emitter, {
			getContainerNode: () => container.current,
			getScale: () => scale
		});
	}, [scale, thumbnail.emitter]);
	const VideoComponent = video ? video.component : null;
	const outerStyle = (0, import_react.useMemo)(() => {
		return calculateOuterStyle({
			config,
			style: style2,
			canvasSize,
			overflowVisible,
			layout
		});
	}, [
		canvasSize,
		config,
		layout,
		overflowVisible,
		style2
	]);
	const outer = (0, import_react.useMemo)(() => {
		return calculateOuter({
			config,
			layout,
			scale,
			overflowVisible
		});
	}, [
		config,
		layout,
		overflowVisible,
		scale
	]);
	const containerStyle3 = (0, import_react.useMemo)(() => {
		return calculateContainerStyle({
			config,
			layout,
			scale,
			overflowVisible
		});
	}, [
		config,
		layout,
		overflowVisible,
		scale
	]);
	const onError = (0, import_react.useCallback)((error) => {
		thumbnail.emitter.dispatchError(error);
	}, [thumbnail.emitter]);
	const loadingMarkup = (0, import_react.useMemo)(() => {
		return renderLoading ? renderLoading({
			height: outerStyle.height,
			width: outerStyle.width,
			isBuffering: false
		}) : null;
	}, [
		outerStyle.height,
		outerStyle.width,
		renderLoading
	]);
	const currentScaleContext = (0, import_react.useMemo)(() => {
		return {
			type: "scale",
			scale
		};
	}, [scale]);
	if (!config) return null;
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: outer,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: containerStyle3,
			className: playerCssClassname(overrideInternalClassName),
			children: VideoComponent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, {
				onError,
				errorFallback,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Internals.CurrentScaleContext.Provider, {
					value: currentScaleContext,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoComponent, {
						...video?.props ?? {},
						...inputProps ?? {}
					})
				})
			}) : null
		})
	});
	if (noSuspense || IS_NODE && !doesReactVersionSupportSuspense2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: container,
		style: outerStyle,
		className: className2,
		children: content
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: container,
		style: outerStyle,
		className: className2,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: loadingMarkup,
			children: content
		})
	});
};
var ThumbnailUI_default = (0, import_react.forwardRef)(ThumbnailUI);
var ThumbnailFn = ({ frameToDisplay, style: style2, inputProps, compositionHeight, compositionWidth, durationInFrames, fps, className: className2, errorFallback = () => "⚠️", renderLoading, overflowVisible = false, overrideInternalClassName, logLevel = "info", noSuspense, ...componentProps }, ref) => {
	if (typeof window !== "undefined") (0, import_react.useLayoutEffect)(() => {
		window.remotion_isPlayer = true;
	}, []);
	const [thumbnailId] = (0, import_react.useState)(() => String(random(null)));
	const rootRef = (0, import_react.useRef)(null);
	const timelineState = (0, import_react.useMemo)(() => {
		return {
			playing: false,
			frame: { [PLAYER_COMP_ID]: frameToDisplay },
			rootId: thumbnailId,
			imperativePlaying: { current: false },
			audioAndVideoTags: { current: [] }
		};
	}, [frameToDisplay, thumbnailId]);
	const playbackRateContext = (0, import_react.useMemo)(() => {
		return {
			playbackRate: 1,
			setPlaybackRate: () => {
				throw new Error("thumbnail");
			}
		};
	}, []);
	(0, import_react.useImperativeHandle)(ref, () => rootRef.current, []);
	const Component = Internals.useLazyComponent({
		compProps: componentProps,
		componentName: "Thumbnail",
		noSuspense: Boolean(noSuspense)
	});
	const [emitter] = (0, import_react.useState)(() => new ThumbnailEmitter());
	const passedInputProps = (0, import_react.useMemo)(() => {
		return inputProps ?? {};
	}, [inputProps]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Internals.IsPlayerContextProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SharedPlayerContexts, {
		timelineContext: timelineState,
		playbackRateContext,
		component: Component,
		compositionHeight,
		compositionWidth,
		durationInFrames,
		fps,
		numberOfSharedAudioTags: 0,
		initiallyMuted: true,
		logLevel,
		audioLatencyHint: "playback",
		sampleRate: 48e3,
		inputProps: passedInputProps,
		audioEnabled: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbnailEmitterContext.Provider, {
			value: emitter,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbnailUI_default, {
				ref: rootRef,
				className: className2,
				errorFallback,
				inputProps: passedInputProps,
				renderLoading,
				style: style2,
				overflowVisible,
				overrideInternalClassName,
				noSuspense: Boolean(noSuspense)
			})
		})
	}) });
};
(0, import_react.forwardRef)(ThumbnailFn);
//#endregion
export { useVideoConfig as a, require_react as c, useCurrentFrame as i, AbsoluteFill as n, require_react_dom as o, Video as r, require_jsx_runtime as s, Player as t };
