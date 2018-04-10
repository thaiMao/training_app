exports.id = 0;
exports.modules = {

/***/ "./constants/index.ts":
false,

/***/ "./constants/url.ts":
false,

/***/ "./utils/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_constants__ = __webpack_require__("constants");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_constants___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_constants__);

function isProd() {
    return (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production');
}
function getCorsOptions(origin) {
    return Object.freeze({
        origin,
        optionsSuccessStatus: 200
    });
}
function getUrl(isProd) {
    return isProd ? __WEBPACK_IMPORTED_MODULE_0_constants__["PRODUCTION_URL"] : __WEBPACK_IMPORTED_MODULE_0_constants__["DEVELOPMENT_URL"];
}
/* harmony default export */ __webpack_exports__["a"] = ({
    getCorsOptions,
    getUrl,
    isProd
});


/***/ }),

/***/ "constants":
/***/ (function(module, exports) {

module.exports = require("constants");

/***/ })

};
//# sourceMappingURL=0.0b0a3a3618329b585cee.hot-update.js.map