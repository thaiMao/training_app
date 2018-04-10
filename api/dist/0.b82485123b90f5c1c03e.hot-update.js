exports.id = 0;
exports.modules = {

/***/ "./utils/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
throw new Error("Cannot find module \"constant\"");

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
    return isProd ? __WEBPACK_IMPORTED_MODULE_0_constant__["PRODUCTION_URL"] : __WEBPACK_IMPORTED_MODULE_0_constant__["DEVELOPMENT_URL"];
}
/* harmony default export */ __webpack_exports__["a"] = ({
    getCorsOptions,
    getUrl,
    isProd
});


/***/ }),

/***/ "constants":
false

};
//# sourceMappingURL=0.b82485123b90f5c1c03e.hot-update.js.map