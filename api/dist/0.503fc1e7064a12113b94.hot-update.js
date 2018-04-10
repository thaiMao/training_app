exports.id = 0;
exports.modules = {

/***/ "./utils/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const PRODUCTION_URL = 'https://proddomain.com';
const DEVELOPMENT_URL = 'http://localhost:8080';
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
    return isProd ? PRODUCTION_URL : DEVELOPMENT_URL;
}
/* harmony default export */ __webpack_exports__["a"] = ({
    getCorsOptions,
    getUrl,
    isProd
});


/***/ })

};
//# sourceMappingURL=0.503fc1e7064a12113b94.hot-update.js.map