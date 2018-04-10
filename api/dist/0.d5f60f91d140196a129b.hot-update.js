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



const origin = __WEBPACK_IMPORTED_MODULE_2_utils__["a" /* default */].getUrl(__WEBPACK_IMPORTED_MODULE_2_utils__["a" /* default */].isProd());
const corsOptions = __WEBPACK_IMPORTED_MODULE_2_utils__["a" /* default */].getCorsOptions(origin);
function setupMiddleware(app) {
    app.use(__WEBPACK_IMPORTED_MODULE_1_cors___default()(corsOptions));
    app.use(__WEBPACK_IMPORTED_MODULE_0_body_parser___default.a.urlencoded({ extended: true }));
    app.use(__WEBPACK_IMPORTED_MODULE_0_body_parser___default.a.json());
}
/* harmony default export */ __webpack_exports__["a"] = (setupMiddleware);


/***/ })

};
//# sourceMappingURL=0.d5f60f91d140196a129b.hot-update.js.map