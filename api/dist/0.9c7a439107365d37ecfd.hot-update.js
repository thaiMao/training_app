exports.id = 0;
exports.modules = {

/***/ "./constants/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__url__ = __webpack_require__("./constants/url.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__url__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__url__["b"]; });



/***/ }),

/***/ "./constants/url.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const PRODUCTION_URL = 'https://proddomain.com';
/* harmony export (immutable) */ __webpack_exports__["b"] = PRODUCTION_URL;

const DEVELOPMENT_URL = 'http://localhost:8080';
/* harmony export (immutable) */ __webpack_exports__["a"] = DEVELOPMENT_URL;



/***/ }),

/***/ "./utils/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__("./constants/index.ts");

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
    return isProd ? __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* PRODUCTION_URL */] : __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* DEVELOPMENT_URL */];
}
/* harmony default export */ __webpack_exports__["a"] = ({
    getCorsOptions,
    getUrl,
    isProd
});


/***/ })

};
//# sourceMappingURL=0.9c7a439107365d37ecfd.hot-update.js.map