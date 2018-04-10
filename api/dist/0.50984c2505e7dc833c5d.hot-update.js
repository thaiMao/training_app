exports.id = 0;
exports.modules = {

/***/ "./middleware/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__middleware__ = __webpack_require__("./middleware/middleware.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__middleware__["a"]; });



/***/ }),

/***/ "./middleware/middleware.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_body_parser__ = __webpack_require__("body-parser");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cors__ = __webpack_require__("cors");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cors__);


console.log('middleware: ', process.env.NODE_ENV);
function isProd() {
    return (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production');
}
const origin = isProd() ? 'https://proddomain.com' : 'http://localhost:8080';
const corsOptions = {
    origin,
    optionsSuccessStatus: 200
};
function setupMiddleware(app) {
    app.use(__WEBPACK_IMPORTED_MODULE_1_cors___default()(corsOptions));
    app.use(__WEBPACK_IMPORTED_MODULE_0_body_parser___default.a.urlencoded({ extended: true }));
    app.use(__WEBPACK_IMPORTED_MODULE_0_body_parser___default.a.json());
}
/* harmony default export */ __webpack_exports__["a"] = (setupMiddleware);


/***/ }),

/***/ "body-parser":
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ })

};
//# sourceMappingURL=0.50984c2505e7dc833c5d.hot-update.js.map