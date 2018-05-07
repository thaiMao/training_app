/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/ 	
/******/ 	function hotDisposeChunk(chunkId) { //eslint-disable-line no-unused-vars
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "5e48a422a370b9c394fc"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/webpack/hot/log-apply-result.js":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__("../node_modules/webpack/hot/log.js");

	if(unacceptedModules.length > 0) {
		log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if(!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if(typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if(numberIds)
			log("info", "[HMR] Consider using the NamedModulesPlugin for module names.");
	}
};


/***/ }),

/***/ "../node_modules/webpack/hot/log.js":
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog = (logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if(shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if(shouldLog(level)) {
		if(level === "info") {
			console.log(msg);
		} else if(level === "warning") {
			console.warn(msg);
		} else if(level === "error") {
			console.error(msg);
		}
	}
};

var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};


/***/ }),

/***/ "../node_modules/webpack/hot/poll.js?1000":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if(true) {
	var hotPollInterval = +(__resourceQuery.substr(1)) || (10 * 60 * 1000);
	var log = __webpack_require__("../node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if(module.hot.status() === "idle") {
			module.hot.check(true).then(function(updatedModules) {
				if(!updatedModules) {
					if(fromUpdate) log("info", "[HMR] Update applied.");
					return;
				}
				__webpack_require__("../node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
				checkForUpdate(true);
			}).catch(function(err) {
				var status = module.hot.status();
				if(["abort", "fail"].indexOf(status) >= 0) {
					log("warning", "[HMR] Cannot apply update.");
					log("warning", "[HMR] " + err.stack || err.message);
					log("warning", "[HMR] You need to restart the application!");
				} else {
					log("warning", "[HMR] Update failed: " + err.stack || err.message);
				}
			});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {
	throw new Error("[HMR] Hot Module Replacement is disabled.");
}

/* WEBPACK VAR INJECTION */}.call(exports, "?1000"))

/***/ }),

/***/ "./config/database/sql/index.js":
/***/ (function(module, exports, __webpack_require__) {

var Sequelize = __webpack_require__("sequelize");

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var env = process.env.NODE_ENV;

var getUrl = function getUrl(e) {
  if (e === 'test' || e === 'testing') {
    return 'postgres://dimyihln:una8-JtjtmwLTPVJUQf_k_XLNSecb4mY@horton.elephantsql.com:5432/dimyihln';
  } else if (e === 'dev' || e === 'development') {
    return 'postgres://pfamegvv:erxqOPc5RdMIgTnBqAQFM8DtTXRAfn4p@horton.elephantsql.com:5432/pfamegvv';
  } else if (e === 'prod' || e === 'production') {
    return 'prod';
  }
  return null;
};

module.exports = {
  url: getUrl(env),
  options: {
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    operatorsAliases: Sequelize.Op
  },
  dialect: 'postgres'
};

/***/ }),

/***/ "./config/development.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_config_database_sql__ = __webpack_require__("./config/database/sql/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_config_database_sql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_config_database_sql__);

const config = {
    expireTime: '30d',
    disableAuth: true,
    secrets: {
        JWT_SECRET: 'yeezy350boost'
    },
    db: {
        url: 'mongodb://admin:pass@ds261078.mlab.com:61078/dev0',
        sql: __WEBPACK_IMPORTED_MODULE_0_config_database_sql__
    }
};
/* harmony export (immutable) */ __webpack_exports__["config"] = config;



/***/ }),

/***/ "./config/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable__ = __webpack_require__("immutable");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_immutable__);

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const env = process.env.NODE_ENV;
const baseConfig = {
    port: 3000,
    secrets: {
        JWT_SECRET: 'worstkeptsecret'
    },
    db: {
        url: 'mongodb://localhost/exercises',
        sql: {
            url: '',
            options: {
                logging: false,
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000
                }
            },
            dialect: 'postgres'
        }
    },
    disableAuth: false,
    expireTime: '30d'
};
let envConfig = {};
switch (env) {
    case 'development':
    case 'dev':
        envConfig = __webpack_require__("./config/development.ts").config;
        break;
    case 'test':
    case 'testing':
        envConfig = __webpack_require__("./config/test.ts").config;
        break;
    case 'prod':
    case 'production':
        envConfig = __webpack_require__("./config/production.ts").config;
        break;
    default:
        envConfig = __webpack_require__("./config/development.ts").config;
}
/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_immutable__["mergeDeep"])(baseConfig, envConfig));


/***/ }),

/***/ "./config/production.ts":
/***/ (function(module, exports) {



/***/ }),

/***/ "./config/test.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_config_database_sql__ = __webpack_require__("./config/database/sql/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_config_database_sql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_config_database_sql__);

const config = {
    expireTime: '30d',
    secrets: {
        JWT_SECRET: 'yeezy350boost'
    },
    db: {
        url: 'mongodb://admin:admin@ds259258.mlab.com:59258/test0',
        sql: __WEBPACK_IMPORTED_MODULE_0_config_database_sql__
    }
};
/* harmony export (immutable) */ __webpack_exports__["config"] = config;



/***/ }),

/***/ "./constant/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__url__ = __webpack_require__("./constant/url.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__url__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__url__["b"]; });



/***/ }),

/***/ "./constant/url.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const PRODUCTION_URL = 'https://proddomain.com';
/* harmony export (immutable) */ __webpack_exports__["b"] = PRODUCTION_URL;

const DEVELOPMENT_URL = 'https://localhost:8080';
/* harmony export (immutable) */ __webpack_exports__["a"] = DEVELOPMENT_URL;



/***/ }),

/***/ "./db/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nosql__ = __webpack_require__("./db/nosql/index.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__nosql__["a"]; });



/***/ }),

/***/ "./db/nosql/db.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__("mongoose");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);

__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Promise = global.Promise;
const connect = (config) => {
    return __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.connect(config.db.url, {
        useMongoClient: true
    });
};
/* harmony default export */ __webpack_exports__["a"] = (connect);


/***/ }),

/***/ "./db/nosql/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db__ = __webpack_require__("./db/nosql/db.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__db__["a"]; });



/***/ }),

/***/ "./db/sql/models/advertiser.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db__ = __webpack_require__("./db/sql/models/db.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sequelize__ = __webpack_require__("sequelize");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_sequelize__);


const Advertiser = __WEBPACK_IMPORTED_MODULE_0__db__["a" /* default */].define('Advertiser', {
    name: __WEBPACK_IMPORTED_MODULE_1_sequelize___default.a.TEXT,
    age: __WEBPACK_IMPORTED_MODULE_1_sequelize___default.a.INTEGER,
    createdAt: __WEBPACK_IMPORTED_MODULE_1_sequelize___default.a.DATE,
    updatedAt: __WEBPACK_IMPORTED_MODULE_1_sequelize___default.a.DATE
});
/* harmony default export */ __webpack_exports__["a"] = (Advertiser);


/***/ }),

/***/ "./db/sql/models/db.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__("sequelize");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_config__ = __webpack_require__("./config/index.ts");


const { db: { sql: { url, options } } } = __WEBPACK_IMPORTED_MODULE_1_config__["a" /* default */];
const database = new __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a(url, options);
/* harmony default export */ __webpack_exports__["a"] = (database);


/***/ }),

/***/ "./db/sql/models/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__advertiser__ = __webpack_require__("./db/sql/models/advertiser.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__advertiser__["a"]; });



/***/ }),

/***/ "./index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_config__ = __webpack_require__("./config/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_http__ = __webpack_require__("http");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__server__ = __webpack_require__("./server.ts");



const server = Object(__WEBPACK_IMPORTED_MODULE_1_http__["createServer"])(__WEBPACK_IMPORTED_MODULE_2__server__["default"]);
let currentApp = __WEBPACK_IMPORTED_MODULE_2__server__["default"];
server.listen(__WEBPACK_IMPORTED_MODULE_0_config__["a" /* default */].port, () => {
    console.log(`Express server listening on port ${__WEBPACK_IMPORTED_MODULE_0_config__["a" /* default */].port}`);
});
if (true) {
    module.hot.accept(["./server.ts"], function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__server__ = __webpack_require__("./server.ts"); (() => {
        server.removeListener('request', currentApp);
        server.on('request', __WEBPACK_IMPORTED_MODULE_2__server__["default"]);
        currentApp = __WEBPACK_IMPORTED_MODULE_2__server__["default"];
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}


/***/ }),

/***/ "./middleware/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__middleware__ = __webpack_require__("./middleware/middleware.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__middleware__["a"]; });



/***/ }),

/***/ "./middleware/middleware.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_body_parser__ = __webpack_require__("body-parser");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cors__ = __webpack_require__("cors");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_utils__ = __webpack_require__("./utils/index.ts");



const origin = __WEBPACK_IMPORTED_MODULE_2_utils__["a" /* default */].getUrl(__WEBPACK_IMPORTED_MODULE_2_utils__["a" /* default */].isProd());
const corsOptions = __WEBPACK_IMPORTED_MODULE_2_utils__["a" /* default */].getCorsOptions(origin);
function setupMiddleware(app) {
    app.use(__WEBPACK_IMPORTED_MODULE_1_cors___default()(corsOptions));
    app.use(__WEBPACK_IMPORTED_MODULE_0_body_parser___default.a.urlencoded({ extended: true }));
    app.use(__WEBPACK_IMPORTED_MODULE_0_body_parser___default.a.json());
}
/* harmony default export */ __webpack_exports__["a"] = (setupMiddleware);


/***/ }),

/***/ "./modules/auth.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = protect;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_config__ = __webpack_require__("./config/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express_jwt__ = __webpack_require__("express-jwt");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__ = __webpack_require__("jsonwebtoken");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_resources__ = __webpack_require__("./resources/index.ts");




const checkToken = __WEBPACK_IMPORTED_MODULE_1_express_jwt___default()({ secret: __WEBPACK_IMPORTED_MODULE_0_config__["a" /* default */].secrets.JWT_SECRET });
const signin = (req, res, next) => {
    const token = signToken(req.user);
    res.json({ token: token });
};
/* unused harmony export signin */

const decodeToken = () => (req, res, next) => {
    if (__WEBPACK_IMPORTED_MODULE_0_config__["a" /* default */].disableAuth) {
        return next();
    }
    if (req.query && req.query.hasOwnProperty()) {
        req.headers.authorization = '';
    }
    checkToken(req, res, next);
};
/* unused harmony export decodeToken */

const getFreshUser = () => (req, res, next) => {
    return __WEBPACK_IMPORTED_MODULE_3_resources__["a" /* User */].findById(req.user.id)
        .then(function (user) {
        if (!user) {
            // if no user is found it was not
            // it was a valid JWT but didn't decode
            // to a real user in our DB. Either the user was deleted
            // since the client got the JWT, or
            // it was a JWT from some other source
            res.status(401).send('Unauthorized');
        }
        else {
            // update req.user with fresh user from
            // stale token data
            req.user = user;
            next();
        }
    })
        .catch(error => next(error));
};
/* unused harmony export getFreshUser */

/*
export const verifyUser = () => (req: any, res: any, next: any) => {
  const username = req.body.username
  const password = req.body.password

  // if no username or password then send
  if (!username || !password) {
    res.status(400).send('You need a username and password')
    return
  }

  // look user up in the DB so we can check
  // if the passwords match for the username
  User.findOne({ username: username })
    .then(function(user) {
      if (!user) {
        res.status(401).send('No user with the given username')
      } else {
        // checking the passwords here
        if (!(user as any).authenticate(password)) {
          res.status(401).send('Wrong password')
        } else {
          // if everything is good,
          // then attach to req.user
          // and call next so the controller
          // can sign a token from the req.user._id
          req.user = user
          next()
        }
      }
    })
    .catch((error: any) => next(error))
}
*/
const signToken = (id) => __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default.a.sign({ id }, __WEBPACK_IMPORTED_MODULE_0_config__["a" /* default */].secrets.JWT_SECRET, { expiresIn: __WEBPACK_IMPORTED_MODULE_0_config__["a" /* default */].expireTime });
/* unused harmony export signToken */

function protect() {
    return checkToken;
}


/***/ }),

/***/ "./modules/error-handler.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = errorHandler;
function errorHandler(err, req, res, next) {
    return 'Error Found';
}


/***/ }),

/***/ "./modules/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__query__ = __webpack_require__("./modules/query.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__query__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__error_handler__ = __webpack_require__("./modules/error-handler.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__error_handler__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth__ = __webpack_require__("./modules/auth.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__auth__["a"]; });





/***/ }),

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
            try {
                return yield model.create(body);
            }
            catch (err) {
                console.log(err);
                return { error: 'duplicate - already exists' };
            }
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


/***/ }),

/***/ "./resources/advertiser/advertiserTypes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const advertiserTypes = `
  type Advertiser {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
  }
  
  input CreateAdvertiser {
    name: String!
  }
  
  input UpdateAdvertiser {
    name: String!
  }
  
  extend type Query {
    getAdvertiser(id: ID!): Advertiser!
    getAllAdvertisers: [Advertiser]!
  }
  
  extend type Mutation {
    createAdvertiser(input: CreateAdvertiser!): Advertiser!
    updateAdvertiser(input: UpdateAdvertiser!): Advertiser!
    removeAdvertiser(id: ID!): Advertiser!
  }
`;
/* harmony default export */ __webpack_exports__["a"] = (advertiserTypes);


/***/ }),

/***/ "./resources/advertiser/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__advertiserTypes__ = __webpack_require__("./resources/advertiser/advertiserTypes.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__advertiserTypes__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resolvers__ = __webpack_require__("./resources/advertiser/resolvers.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__resolvers__["a"]; });




/***/ }),

/***/ "./resources/advertiser/resolvers.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_db_sql_models__ = __webpack_require__("./db/sql/models/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable__ = __webpack_require__("immutable");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutable__);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};


function getAdvertiser(_, { id }) { }
function getAllAdvertisers(_) {
    return __awaiter(this, void 0, void 0, function* () {
        const advertisers = yield __WEBPACK_IMPORTED_MODULE_0_db_sql_models__["a" /* Advertiser */].findAll({
            limit: 1000,
            order: [['createdAt', 'ASC']]
        });
        if (!advertisers) {
            // TODO Handle error properly
            new Error('No advertisers found');
        }
        else {
            return advertisers;
        }
    });
}
function createAdvertiser(_, { input }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield __WEBPACK_IMPORTED_MODULE_0_db_sql_models__["a" /* Advertiser */].create(input);
    });
}
function updateAdvertiser(_, { input }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = input, update = __rest(input, ["id"]);
        const advertiser = yield __WEBPACK_IMPORTED_MODULE_0_db_sql_models__["a" /* Advertiser */].findById(id);
        if (!advertiser) {
            // TODO Handle error properly
            new Error('No advertiser id found');
        }
        else {
            const updatedAdvertiser = Object(__WEBPACK_IMPORTED_MODULE_1_immutable__["mergeDeep"])(advertiser, update);
            return updatedAdvertiser.save();
        }
    });
}
function removeAdvertiser(_, { id }) {
    return __WEBPACK_IMPORTED_MODULE_0_db_sql_models__["a" /* Advertiser */].destroy({
        where: {
            id
        }
    });
}
const advertiserResolvers = {
    Query: {
        getAdvertiser,
        getAllAdvertisers
    },
    Mutation: {
        createAdvertiser,
        updateAdvertiser,
        removeAdvertiser
    }
};
/* harmony default export */ __webpack_exports__["a"] = (advertiserResolvers);


/***/ }),

/***/ "./resources/exercise/exerciseTypes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const exerciseTypes = `
type Exercise {
  id: ID!
  name: String!
  muscle: String!
  users: [User]!
  createdAt: String!
  updatedAt: String!
}

input CreateExercise {
  name: String!
  muscle: String!
}

input UpdateExercise {
  name: String!
}

extend type Query {
  getExercise(id: ID!): Exercise!
  getAllExercises: [Exercise]!
}

extend type Mutation {
  createExercise(input: CreateExercise!): Exercise!
  updateExercise(input: UpdateExercise!): Exercise!
  removeExercise(id: ID!): Exercise!
}`;
/* harmony default export */ __webpack_exports__["a"] = (exerciseTypes);


/***/ }),

/***/ "./resources/exercise/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__exerciseTypes__ = __webpack_require__("./resources/exercise/exerciseTypes.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__exerciseTypes__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model__ = __webpack_require__("./resources/exercise/model.ts");
/* unused harmony reexport Exercise */
/* unused harmony reexport exerciseSchema */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resolvers__ = __webpack_require__("./resources/exercise/resolvers.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__resolvers__["a"]; });





/***/ }),

/***/ "./resources/exercise/model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__("mongoose");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);

const schema = {
    name: {
        type: String,
        required: [true, 'Error - name is a required property of Exercise'],
        unique: true
    },
    muscle: {
        type: String,
        required: true,
        default: 'Bicep'
    },
    goal: {
        type: __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema.Types.ObjectId,
        ref: 'size'
    },
    users: {
        type: __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema.Types.ObjectId,
        ref: 'user'
    }
};
/* unused harmony export schema */

const exerciseSchema = new __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema(schema);
const Exercise = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('exercise', exerciseSchema);
/* harmony export (immutable) */ __webpack_exports__["a"] = Exercise;



/***/ }),

/***/ "./resources/exercise/resolvers.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__("./resources/exercise/model.ts");
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};

const getExercise = (_, { id }, context) => __awaiter(this, void 0, void 0, function* () {
    const exercise = yield __WEBPACK_IMPORTED_MODULE_0__model__["a" /* Exercise */].findById(id).exec();
    if (!exercise) {
        throw new Error('No exercise id found');
    }
    else {
        return exercise;
    }
});
const getAllExercises = () => {
    return __WEBPACK_IMPORTED_MODULE_0__model__["a" /* Exercise */].find({}).exec();
};
const createExercise = (_, { input }, context) => {
    return __WEBPACK_IMPORTED_MODULE_0__model__["a" /* Exercise */].create(input);
};
const updateExercise = (_, { input }, context) => {
    const { id } = input, update = __rest(input, ["id"]);
    return __WEBPACK_IMPORTED_MODULE_0__model__["a" /* Exercise */].findByIdAndUpdate(id, update, { new: true }).exec();
};
const removeExercise = (_, { id }, context) => {
    return __WEBPACK_IMPORTED_MODULE_0__model__["a" /* Exercise */].findByIdAndRemove(id).exec();
};
const exerciseResolvers = {
    Query: {
        getExercise,
        getAllExercises
    },
    Mutation: {
        createExercise,
        updateExercise,
        removeExercise
    },
    Exercise: {
        users(exercise) {
            return __awaiter(this, void 0, void 0, function* () {
                const populated = yield exercise.populate('users').execPopulate();
                return populated.users;
            });
        }
    }
};
/* harmony default export */ __webpack_exports__["a"] = (exerciseResolvers);


/***/ }),

/***/ "./resources/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__exercise__ = __webpack_require__("./resources/exercise/index.ts");
/* unused harmony reexport Exercise */
/* unused harmony reexport exerciseSchema */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__exercise__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__exercise__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user__ = __webpack_require__("./resources/user/index.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__user__["a"]; });
/* unused harmony reexport userSchema */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_1__user__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_1__user__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__advertiser__ = __webpack_require__("./resources/advertiser/index.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__advertiser__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__advertiser__["a"]; });





/***/ }),

/***/ "./resources/user/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__userTypes__ = __webpack_require__("./resources/user/userTypes.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__userTypes__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model__ = __webpack_require__("./resources/user/model.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__model__["a"]; });
/* unused harmony reexport userSchema */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resolvers__ = __webpack_require__("./resources/user/resolvers.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__resolvers__["a"]; });





/***/ }),

/***/ "./resources/user/model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__("mongoose");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);

const schema = {
    name: {
        type: String,
        required: [true, 'Error - name is a required property of User'],
        unique: true
    },
    passwordHash: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    }
};
/* unused harmony export schema */

const userSchema = new __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema(schema, { timestamps: true });
const User = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('user', userSchema);
/* harmony export (immutable) */ __webpack_exports__["a"] = User;



/***/ }),

/***/ "./resources/user/resolvers.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__("./resources/user/model.ts");
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const getUser = (_, { id }) => __awaiter(this, void 0, void 0, function* () {
    const user = yield __WEBPACK_IMPORTED_MODULE_0__model__["a" /* User */].findById(id).exec();
    if (!user) {
        throw new Error(`No user id ${id} found`);
    }
    else {
        return user;
    }
});
const getAllUsers = () => {
    return __WEBPACK_IMPORTED_MODULE_0__model__["a" /* User */].find({}).exec();
};
const createUser = (_, { input }) => {
    return __WEBPACK_IMPORTED_MODULE_0__model__["a" /* User */].create(input);
};
const updateUser = (_, { input }, { user }) => {
    const { id } = user;
    return __WEBPACK_IMPORTED_MODULE_0__model__["a" /* User */].findByIdAndUpdate(id, input, { new: true });
};
const removeUser = (_, { id }) => {
    return __WEBPACK_IMPORTED_MODULE_0__model__["a" /* User */].findByIdAndRemove(id).exec();
};
const userResolvers = {
    Query: {
        getUser,
        getAllUsers
    },
    Mutation: {
        createUser,
        updateUser,
        removeUser
    }
};
/* harmony default export */ __webpack_exports__["a"] = (userResolvers);


/***/ }),

/***/ "./resources/user/userTypes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const userTypes = `
type User {
  id: ID!
  name: String!
  createdAt: String!
  updatedAt: String!
}

input UpdatedUser {
  name: String!
}

input CreateUser {
  name: String!
}

type Query {
  getUser(id: ID!): User!
  getAllUsers: [User]!
}

type Mutation {
  createUser(input: CreateUser!): User!
  updateUser(input: UpdatedUser!): User!
  removeUser(id: ID!): User!
}
`;
/* harmony default export */ __webpack_exports__["a"] = (userTypes);


/***/ }),

/***/ "./routes/admin.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

const adminRouter = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();
adminRouter.get('/', (req, res) => {
    res.json({ adminRouter: true });
});
/* harmony default export */ __webpack_exports__["a"] = (adminRouter);


/***/ }),

/***/ "./routes/analytics.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

const analyticsRouter = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();
analyticsRouter.get('/', (req, res) => {
    res.json({ analyticsRouter: true });
});
/* harmony default export */ __webpack_exports__["a"] = (analyticsRouter);


/***/ }),

/***/ "./routes/graphql/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__("./routes/graphql/router.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__router__["a"]; });
/* unused harmony reexport schema */



/***/ }),

/***/ "./routes/graphql/router.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_resources__ = __webpack_require__("./resources/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_apollo_server_express__ = __webpack_require__("apollo-server-express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_apollo_server_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_apollo_server_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_graphql_tools__ = __webpack_require__("graphql-tools");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_graphql_tools___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_graphql_tools__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_immutable__ = __webpack_require__("immutable");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_immutable__);




const baseSchema = `
  schema {
    query: Query
    mutation: Mutation
  }
`;
const schema = Object(__WEBPACK_IMPORTED_MODULE_2_graphql_tools__["makeExecutableSchema"])({
    typeDefs: [baseSchema, __WEBPACK_IMPORTED_MODULE_0_resources__["g" /* userTypes */], __WEBPACK_IMPORTED_MODULE_0_resources__["e" /* exerciseTypes */], __WEBPACK_IMPORTED_MODULE_0_resources__["c" /* advertiserTypes */]],
    resolvers: Object(__WEBPACK_IMPORTED_MODULE_3_immutable__["mergeDeep"])(__WEBPACK_IMPORTED_MODULE_0_resources__["f" /* userResolvers */], __WEBPACK_IMPORTED_MODULE_0_resources__["d" /* exerciseResolvers */], __WEBPACK_IMPORTED_MODULE_0_resources__["b" /* advertiserResolvers */])
});
/* unused harmony export schema */

const graphQLRouter = Object(__WEBPACK_IMPORTED_MODULE_1_apollo_server_express__["graphqlExpress"])(req => ({
    schema,
    context: {
        req,
        user: req.user
    }
}));
/* harmony export (immutable) */ __webpack_exports__["a"] = graphQLRouter;



/***/ }),

/***/ "./routes/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__admin__ = __webpack_require__("./routes/admin.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__admin__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__analytics__ = __webpack_require__("./routes/analytics.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__analytics__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signin__ = __webpack_require__("./routes/signin.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__signin__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user__ = __webpack_require__("./routes/user/index.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__user__["a"]; });






/***/ }),

/***/ "./routes/signin.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

const signinRouter = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();
signinRouter.get('/', (req, res) => {
    res.json({ signinRouter: true });
});
/* harmony default export */ __webpack_exports__["a"] = (signinRouter);


/***/ }),

/***/ "./routes/user/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user__ = __webpack_require__("./routes/user/user.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__user__["a"]; });



/***/ }),

/***/ "./routes/user/user.controller.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_modules__ = __webpack_require__("./modules/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_resources_user__ = __webpack_require__("./resources/user/index.ts");


const userControllers = Object(__WEBPACK_IMPORTED_MODULE_0_modules__["b" /* generateControllers */])(__WEBPACK_IMPORTED_MODULE_1_resources_user__["a" /* User */]);
/* harmony default export */ __webpack_exports__["a"] = (userControllers);


/***/ }),

/***/ "./routes/user/user.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_controller__ = __webpack_require__("./routes/user/user.controller.ts");


const usersRouter = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();
usersRouter.param('id', __WEBPACK_IMPORTED_MODULE_1__user_controller__["a" /* default */].findByParam);
usersRouter
    .route('/')
    .get(__WEBPACK_IMPORTED_MODULE_1__user_controller__["a" /* default */].getAll)
    .post(__WEBPACK_IMPORTED_MODULE_1__user_controller__["a" /* default */].createOne);
usersRouter
    .route('/:id')
    .get(__WEBPACK_IMPORTED_MODULE_1__user_controller__["a" /* default */].getOne)
    .delete(__WEBPACK_IMPORTED_MODULE_1__user_controller__["a" /* default */].createOne);
/* harmony default export */ __webpack_exports__["a"] = (usersRouter);


/***/ }),

/***/ "./server.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_config__ = __webpack_require__("./config/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_db__ = __webpack_require__("./db/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_routes_graphql__ = __webpack_require__("./routes/graphql/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_apollo_server_express__ = __webpack_require__("apollo-server-express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_apollo_server_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_apollo_server_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__middleware__ = __webpack_require__("./middleware/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules__ = __webpack_require__("./modules/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__routes__ = __webpack_require__("./routes/index.ts");








const app = __WEBPACK_IMPORTED_MODULE_2_express___default()();
Object(__WEBPACK_IMPORTED_MODULE_5__middleware__["a" /* setupMiddleware */])(app);
Object(__WEBPACK_IMPORTED_MODULE_1_db__["a" /* connect */])(__WEBPACK_IMPORTED_MODULE_0_config__["a" /* default */]);
app.use('/signin', __WEBPACK_IMPORTED_MODULE_7__routes__["c" /* signin */]);
app.use('/admin', __WEBPACK_IMPORTED_MODULE_6__modules__["c" /* protect */], __WEBPACK_IMPORTED_MODULE_7__routes__["a" /* admin */]);
app.use('/analytics', __WEBPACK_IMPORTED_MODULE_6__modules__["c" /* protect */], __WEBPACK_IMPORTED_MODULE_7__routes__["b" /* analytics */]);
app.use('/user', __WEBPACK_IMPORTED_MODULE_7__routes__["d" /* user */]);
app.use('/graphql', __WEBPACK_IMPORTED_MODULE_3_routes_graphql__["a" /* graphQLRouter */]);
app.use('/docs', Object(__WEBPACK_IMPORTED_MODULE_4_apollo_server_express__["graphiqlExpress"])({ endpointURL: '/graphql' }));
app.use(__WEBPACK_IMPORTED_MODULE_6__modules__["a" /* errorHandler */]);
app.get('/', (req, res) => {
    res.json({ ok: true });
});
app.post('/', function (req, res) {
    res.send('POST request to the homepage');
});
/* harmony default export */ __webpack_exports__["default"] = (app);


/***/ }),

/***/ "./utils/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_constant__ = __webpack_require__("./constant/index.ts");

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
    return isProd ? __WEBPACK_IMPORTED_MODULE_0_constant__["b" /* PRODUCTION_URL */] : __WEBPACK_IMPORTED_MODULE_0_constant__["a" /* DEVELOPMENT_URL */];
}
/* harmony default export */ __webpack_exports__["a"] = ({
    getCorsOptions,
    getUrl,
    isProd
});


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../node_modules/webpack/hot/poll.js?1000");
module.exports = __webpack_require__("./index.ts");


/***/ }),

/***/ "apollo-server-express":
/***/ (function(module, exports) {

module.exports = require("apollo-server-express");

/***/ }),

/***/ "body-parser":
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-jwt":
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),

/***/ "graphql-tools":
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),

/***/ "http":
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "immutable":
/***/ (function(module, exports) {

module.exports = require("immutable");

/***/ }),

/***/ "jsonwebtoken":
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "sequelize":
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map