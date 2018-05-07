exports.ids = [3];
exports.modules = {

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);

class Count extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {
    constructor() {
        super(...arguments);
        this.state = {
            count: 0
        };
        this.onIncrement = (event) => {
            event.preventDefault;
            this.setState((state) => ({ count: state.count + 1 }));
        };
    }
    render() {
        const { count } = this.state;
        return (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h1", null,
                "Count ",
                count),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button", { onClick: this.onIncrement }, "Increment")));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Count);


/***/ })

};;
//# sourceMappingURL=3.index.js.map