exports.id = 0;
exports.modules = {

/***/ "./utils/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function isProd() {
    return (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production');
}
function getCorsOptions(origin) {
    return {
        origin,
        optionsSuccessStatus: 200
    };
}
function getUrl(isProd) {
    return isProd ? 'https://proddomain.com' : 'http://localhost:8080';
}
/* harmony default export */ __webpack_exports__["a"] = ({
    getCorsOptions,
    getUrl,
    isProd
});


/***/ })

};
//# sourceMappingURL=0.da5459c795a39e887a3b.hot-update.js.map