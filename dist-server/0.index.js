exports.ids = [0];
exports.modules = {

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Home__ = __webpack_require__(38);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__Home__["a"]; });



/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_helmet__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_workers__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_utils__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_workers_service__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







function mapStateToProps(state) {
    return {
        exercises: state.exercises
    };
}
let Home = class Home extends __WEBPACK_IMPORTED_MODULE_1_react__["PureComponent"] {
    componentDidMount() {
        Object(__WEBPACK_IMPORTED_MODULE_6_workers_service__["a" /* Service */])();
        const worker = new __WEBPACK_IMPORTED_MODULE_4_workers__["a" /* default */]();
        worker.postMessage({ a: 1 });
        worker.onmessage = (event) => {
            console.log(event.data.result);
        };
    }
    handleCreateUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = { name: 'Tony Montana' };
            const body = JSON.stringify(user);
            const postUserOptions = __WEBPACK_IMPORTED_MODULE_5_app_utils__["a" /* Fetch */].postJSONOptions(body);
            const createOneUser = __WEBPACK_IMPORTED_MODULE_5_app_utils__["a" /* Fetch */].fetchUser(postUserOptions);
            try {
                const data = yield createOneUser;
                const jsonData = yield data.json();
                console.log('Server POST response: ', jsonData);
                // TODO handle different status responses with appropriate messages
            }
            catch (error) {
                console.error('Network error', error);
            }
        });
    }
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
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("button", { onClick: this.handleCreateUser }, "Create New User"),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react_router_dom__["Link"], { to: "/about" }, "About"),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("link", { href: "https://placehold.it/152", sizes: "152*152", rel: "apple-touch-icon" }),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("img", { src: "https://localhost:8080/dist/images/user.png" }),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("pre", null,
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("code", null, JSON.stringify(this.props.exercises, null, 4)))));
    }
};
Home = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(mapStateToProps)
], Home);
/* harmony default export */ __webpack_exports__["a"] = (Home);


/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const MyWorker = __webpack_require__(40);
/* harmony default export */ __webpack_exports__["a"] = (MyWorker);


/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

module.exports = function() {
  return new Worker(__webpack_require__.p + "3847ef56281177cb9fef.worker.js");
};

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch__ = __webpack_require__(42);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__fetch__["a"]; });



/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);

const API_URL = 'http://localhost:3000';
const USER_URL = `${API_URL}/user`;
function setContent(type) {
    return {
        'content-type': type
    };
}
function setFetchOptions(method, headers, body) {
    return __WEBPACK_IMPORTED_MODULE_0_ramda__["mergeAll"]([{ method }, { headers }, { body }]);
}
const curriedSetFetchOptions = __WEBPACK_IMPORTED_MODULE_0_ramda__["curry"](setFetchOptions);
const postOptions = curriedSetFetchOptions('POST');
const postJSONOptions = postOptions(setContent('application/json'));
function invokeFetch(url, options) {
    return fetch(url, options);
}
const curriedInvokeFetch = __WEBPACK_IMPORTED_MODULE_0_ramda__["curry"](invokeFetch);
const fetchUser = curriedInvokeFetch(USER_URL);
/* harmony default export */ __webpack_exports__["a"] = ({
    postJSONOptions,
    fetchUser
});


/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service__ = __webpack_require__(44);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__service__["a"]; });



/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_worker_loader_name_service_worker_js_service_worker_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_worker_loader_name_service_worker_js_service_worker_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_worker_loader_name_service_worker_js_service_worker_js__);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function setupServiceWorker() {
    return __awaiter(this, void 0, void 0, function* () {
        if ('serviceWorker' in navigator) {
            try {
                console.log('Service worker exists in navigator');
                let registration = yield navigator.serviceWorker.register('./service-worker.js');
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            console.log('No such thing as serviceWorker');
        }
    });
}
/* harmony default export */ __webpack_exports__["a"] = (setupServiceWorker);


/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

module.exports = function() {
  return new Worker(__webpack_require__.p + "./service-worker.js");
};

/***/ })

};;
//# sourceMappingURL=0.index.js.map