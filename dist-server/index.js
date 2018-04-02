/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		5: 0
/******/ 	};
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("./" + chunkId + ".index.js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.resolve();
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
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
/******/ 	__webpack_require__.p = "/dist-server/";
/******/
/******/ 	// uncatched error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using System.import().catch()
/******/ 		});
/******/ 	};
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-loadable");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint no-console:0 */
const Loadable = __webpack_require__(1);
const app = __webpack_require__(5).default;
const PORT = 8080;
Loadable.preloadAll().then(() => {
    app.listen(PORT, () => {
        console.log(`Running on port ${PORT}`);
    });
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_loadable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_loadable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_loadable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_morgan__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_morgan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_morgan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom_server__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_loadable_webpack__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_loadable_webpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_loadable_webpack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_App__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dist_react_loadable_json__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dist_react_loadable_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__dist_react_loadable_json__);
///<reference path="typings.d.ts" />
/* eslint no-console:0 */









const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
app.use('/', __WEBPACK_IMPORTED_MODULE_2_morgan___default()('tiny'));
app.use('/dist', __WEBPACK_IMPORTED_MODULE_0_express___default.a.static('./dist'));
app.use((req, res) => {
    console.log('request url: ', req.url);
    let modules = [];
    const context = {};
    const html = __WEBPACK_IMPORTED_MODULE_4_react_dom_server___default.a.renderToString(__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_loadable__["Capture"], { report: moduleName => modules.push(moduleName) },
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_router_dom__["StaticRouter"], { location: req.url, context: context },
            __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_App__["a" /* default */], null))));
    console.log('modules: ', modules);
    const bundles = Object(__WEBPACK_IMPORTED_MODULE_6_react_loadable_webpack__["getBundles"])(__WEBPACK_IMPORTED_MODULE_8__dist_react_loadable_json___default.a, modules);
    if (context.url) {
        res.redirect(301, context.url);
    }
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="utf-8" />
      <title>Training App</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <meta name="theme-color" content="#2d89ef" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <link href="dist/web-app-manifest.json" rel="manifest" />
    </head>
    
    <body>
      <div id="app">
        ${html}
      </div>
      <script type="text/javascript" src="dist/manifest.bundle.js"></script>
      ${bundles
        .map((bundle) => `<script src="dist/${bundle.file}"></script>`)
        .join('\n')}
      <script type="text/javascript" src="dist/main.bundle.js"></script></body>
    </body>
    
    </html>
  `);
    res.end();
});
/* harmony default export */ __webpack_exports__["default"] = (app);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("react-loadable/webpack");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_file_loader_web_app_manifest_json__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_file_loader_web_app_manifest_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_file_loader_web_app_manifest_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_styled_components__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_styled_components___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_styled_components__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_loadable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_loadable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_loadable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_Loading__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_store__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_theme__ = __webpack_require__(20);
///<reference path="typings.d.ts" />

// import 'add-to-homescreen/addtohomescreen.js'
// import 'styles/addtohomescreen.css'








const About = __WEBPACK_IMPORTED_MODULE_4_react_loadable___default()({
    loader: () => __webpack_require__.e/* import() */(4).then(__webpack_require__.bind(null, 26)),
    loading: __WEBPACK_IMPORTED_MODULE_5_Loading__["a" /* Loading */],
    timeout: 10000
});
const Count = __WEBPACK_IMPORTED_MODULE_4_react_loadable___default()({
    loader: () => __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, 27)),
    loading: __WEBPACK_IMPORTED_MODULE_5_Loading__["a" /* Loading */],
    timeout: 10000
});
const Exercise = __WEBPACK_IMPORTED_MODULE_4_react_loadable___default()({
    loader: () => __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, 28)),
    loading: __WEBPACK_IMPORTED_MODULE_5_Loading__["a" /* Loading */],
    timeout: 10000
});
const Home = __WEBPACK_IMPORTED_MODULE_4_react_loadable___default()({
    loader: () => __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 29)),
    loading: __WEBPACK_IMPORTED_MODULE_5_Loading__["a" /* Loading */],
    timeout: 10000
});
const NotFound = __WEBPACK_IMPORTED_MODULE_4_react_loadable___default()({
    loader: () => __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 31)),
    loading: __WEBPACK_IMPORTED_MODULE_5_Loading__["a" /* Loading */],
    timeout: 10000
});
// Render Props using Loadable.Map
class App extends __WEBPACK_IMPORTED_MODULE_2_react__["Component"] {
    componentDidMount() { }
    render() {
        return (__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_react_redux__["Provider"], { store: __WEBPACK_IMPORTED_MODULE_7_store__["a" /* default */] },
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_styled_components__["ThemeProvider"], { theme: __WEBPACK_IMPORTED_MODULE_8_theme__["a" /* theme */] },
                __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Switch"], null,
                    __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: "/", component: Home }),
                    __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { path: "/count", component: Count }),
                    __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { path: "/:id", component: Exercise }),
                    __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { path: "/about", component: About }),
                    __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { component: NotFound })))));
    }
}
/* harmony default export */ __webpack_exports__["a"] = (App);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "18ce2c5b214160f28642a00ed4eca978.json";

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Loading__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Loading__["a"]; });



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);

const Loading = props => {
    if (props.error) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", null, "Error");
    }
    else if (props.timedOut) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", null, "Taking a long time...");
    }
    else if (props.pastDelay) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", null, "This is a loading component");
    }
    else {
        return null;
    }
};
/* harmony default export */ __webpack_exports__["a"] = (Loading);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reducers__ = __webpack_require__(17);


const store = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_1_reducers__["a" /* exercises */]);
/* harmony default export */ __webpack_exports__["a"] = (store);


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reducers_exercises__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_reducers_exercises__["a"]; });



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_actions__ = __webpack_require__(19);

const DEFAULT_STATE = {
    exercises: ['Deadlift', 'Squat', 'Benchpress'],
    exercise: undefined
};
const setExercise = (state, action) => {
    return Object.assign({}, state, { exercise: action.payload });
};
const rootReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_0_actions__["a" /* SET_EXERCISE */]:
            return setExercise(state, action);
        default:
            return state;
    }
};
/* harmony default export */ __webpack_exports__["a"] = (rootReducer);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const SET_EXERCISE = 'SET_EXERCISE';
/* harmony export (immutable) */ __webpack_exports__["a"] = SET_EXERCISE;



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__theme__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__theme__["a"]; });



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const theme = { color: 'mediumseagreen' };
/* harmony default export */ __webpack_exports__["a"] = (theme);


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = {"./src/Client.tsx":[{"id":0,"name":"./src/Client.tsx","file":"main.bundle.js"}]}

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("object-assign");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("fbjs/lib/emptyObject");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("fbjs/lib/emptyFunction");

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),
/* 31 */,
/* 32 */
/***/ (function(module, exports) {

module.exports = require("fbjs/lib/invariant");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("fbjs/lib/warning");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("prop-types/checkPropTypes");

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map