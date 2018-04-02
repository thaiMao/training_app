exports.ids = [1];
exports.modules = {

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_helmet__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_helmet__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




function mapStateToProps(state) {
    return {
        exercises: state.exercises
    };
}
let Home = class Home extends __WEBPACK_IMPORTED_MODULE_1_react__["PureComponent"] {
    componentDidMount() { }
    render() {
        const homeScreenTitle = 'Traning App';
        const schema = JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'Product',
            image: 'dell-30in-lcd.jpg',
            name: 'Dell UltraSharp 30" LCD Monitor',
            offers: {
                '@type': 'Offer',
                price: '$1495'
            }
        });
        return (__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Fragment, null,
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_helmet__["Helmet"], null,
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("meta", { name: "apple-mobile-web-app-title", content: `${homeScreenTitle}` }),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("script", { type: "application/ld+json" }, schema)),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("h1", null, "My Brand"),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("button", null, "Login"),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react_router_dom__["Link"], { to: "/about" }, "About"),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("link", { href: "https://placehold.it/152", sizes: "152*152", rel: "apple-touch-icon" }),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("pre", null,
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("code", null, JSON.stringify(this.props.exercises, null, 4)))));
    }
};
Home = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(mapStateToProps)
], Home);
/* harmony default export */ __webpack_exports__["default"] = (Home);


/***/ })

};;
//# sourceMappingURL=1.index.js.map