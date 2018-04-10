exports.id = 0;
exports.modules = {

/***/ "./modules/query.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable__ = __webpack_require__("immutable");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_immutable__);

const testData = { message: 'hello' };
const controllers = {
    createOne(model, body) {
        const createdOne = model.create(body);
        return createdOne ? createdOne : 'Already exists';
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
//# sourceMappingURL=0.9a9cfbdf19c85cb10991.hot-update.js.map