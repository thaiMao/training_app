exports.id = 0;
exports.modules = {

/***/ "./middleware/middleware.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_body_parser__ = __webpack_require__("body-parser");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cors__ = __webpack_require__("cors");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_utils__ = __webpack_require__("./utils/index.ts");



const origin = __WEBPACK_IMPORTED_MODULE_2_utils__["a" /* default */].isProd()
    ? 'https://proddomain.com'
    : 'http://localhost:8080';
const corsOptions = {
    origin,
    optionsSuccessStatus: 200
};
console.log('middleware: ', origin);
function setupMiddleware(app) {
    app.use(__WEBPACK_IMPORTED_MODULE_1_cors___default()(corsOptions));
    app.use(__WEBPACK_IMPORTED_MODULE_0_body_parser___default.a.urlencoded({ extended: true }));
    app.use(__WEBPACK_IMPORTED_MODULE_0_body_parser___default.a.json());
}
/* harmony default export */ __webpack_exports__["a"] = (setupMiddleware);


/***/ }),

/***/ "./utils/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function isProd() {
    return (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production');
}
/* harmony default export */ __webpack_exports__["a"] = ({ isProd });


/***/ })

};
//# sourceMappingURL=0.33f1c0bf50266786f505.hot-update.js.map