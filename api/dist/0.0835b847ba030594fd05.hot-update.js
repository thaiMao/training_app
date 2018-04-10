exports.id = 0;
exports.modules = {

/***/ "./utils/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    return isProd ? PRODUCTION_URL : DEVELOPMENT_URL;
}
/* harmony default export */ __webpack_exports__["a"] = ({
    getCorsOptions,
    getUrl,
    isProd
});


/***/ })

};
//# sourceMappingURL=0.0835b847ba030594fd05.hot-update.js.map