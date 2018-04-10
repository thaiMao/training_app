exports.id = 0;
exports.modules = {

/***/ "./modules/query.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable__ = __webpack_require__("immutable");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_immutable__);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const testData = { message: 'hello' };
const controllers = {
    createOne(model, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdOne = yield model.create(body);
            console.log(createdOne ? createdOne : 'Already exists');
            return createdOne ? createdOne : 'Already exists';
        });
    },
    updateOne(docToUpdate, update) {
        const updatedDocument = Object(__WEBPACK_IMPORTED_MODULE_0_immutable__["mergeDeep"])(docToUpdate, update);
        return updatedDocument.save();
    },
    deleteOne(docToDelete) {
        return docToDelete.remove();
    },
    getOne(docToGet) {
        return Promise.resolve(docToGet);
    },
    getAll(model) {
        return model.find({}).exec();
    },
    findByParam(model, id) {
        return model.findById(id).exec();
    }
};
/* unused harmony export controllers */

function getAll(model) {
    return function (req, res, next) {
        controllers
            .getAll(model)
            .then((result) => res.json(result))
            .catch((err) => res.status(504).send('Something went wrong'));
    };
}
function getOne(model) {
    return function (req, res) {
        return controllers
            .getOne(req.body)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(504).send('Something went wrong'));
    };
}
function createOne(model) {
    return function (req, res, next) {
        return controllers
            .createOne(model, req.body)
            .then((doc) => res.status(201).json(doc))
            .catch((err) => next(err));
    };
}
function updateOne(model) {
    return function (req, res, next) {
        const docToUpdate = req.docFromId;
        const update = req.body;
        return controllers
            .updateOne(docToUpdate, update)
            .then((doc) => res.status(201).json(doc))
            .catch((err) => next(err));
    };
}
function deleteOne(model) {
    return function (req, res, next) {
        return controllers
            .deleteOne(req.body)
            .then((result) => {
            res.status(201).json(result);
        })
            .then((err) => {
            next(err);
        });
    };
}
function findByParam(model) {
    return function (req, res, next, id) {
        return controllers
            .findByParam(model, id)
            .then((doc) => {
            if (!doc) {
                next(new Error('Not Found Error'));
            }
            else {
                req.docFromId = doc;
                next();
            }
        })
            .catch((err) => {
            next(err);
        });
    };
}
function generateControllers(model) {
    return {
        getAll: getAll(model),
        getOne: getOne(model),
        createOne: createOne(model),
        deleteOne: deleteOne(model),
        findByParam: findByParam(model)
    };
}
/* harmony default export */ __webpack_exports__["a"] = (generateControllers);


/***/ })

};
//# sourceMappingURL=0.65198db84b8400a54303.hot-update.js.map