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
/******/ 	var hotCurrentHash = "2f013c62500a9d51f65e"; // eslint-disable-line no-unused-vars
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

/***/ "../private/vapid.json":
/***/ (function(module, exports) {

module.exports = {"publicKey":"BIebrpRIEscL3E8iHjMc54je7rlBlZdpIpNyeeU78WKn2YhCryCXUzPrKD3eRNmfYqaPQJd5F8n_FRntBt44wjI","privateKey":"_Jddpp2p4lknzRezTiObdixuje9TUYj1PkJ509Jv9ks"}

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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql = __importStar(__webpack_require__("./config/database/sql/index.js"));
exports.config = {
    expireTime: '30d',
    disableAuth: true,
    secrets: {
        JWT_SECRET: 'yeezy350boost'
    },
    db: {
        url: 'mongodb://admin:pass@ds261078.mlab.com:61078/dev0',
        sql
    }
};


/***/ }),

/***/ "./config/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = __webpack_require__("immutable");
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
exports.default = immutable_1.mergeDeep(baseConfig, envConfig);


/***/ }),

/***/ "./config/production.ts":
/***/ (function(module, exports) {



/***/ }),

/***/ "./config/test.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql = __importStar(__webpack_require__("./config/database/sql/index.js"));
exports.config = {
    expireTime: '30d',
    secrets: {
        JWT_SECRET: 'yeezy350boost'
    },
    db: {
        url: 'mongodb://admin:admin@ds259258.mlab.com:59258/test0',
        sql
    }
};


/***/ }),

/***/ "./constant/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = __webpack_require__("./constant/url.ts");
exports.DEVELOPMENT_URL = url_1.DEVELOPMENT_URL;
exports.PRODUCTION_URL = url_1.PRODUCTION_URL;


/***/ }),

/***/ "./constant/url.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCTION_URL = 'https://proddomain.com';
exports.DEVELOPMENT_URL = 'https://localhost:8080';


/***/ }),

/***/ "./db/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nosql_1 = __webpack_require__("./db/nosql/index.ts");
exports.connectNoSqlDb = nosql_1.connectNoSqlDb;


/***/ }),

/***/ "./db/nosql/db.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(__webpack_require__("mongoose"));
mongoose_1.default.Promise = global.Promise;
const connect = (config) => {
    return mongoose_1.default.connect(config.db.url);
};
exports.default = connect;


/***/ }),

/***/ "./db/nosql/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __webpack_require__("./db/nosql/db.ts");
exports.connectNoSqlDb = db_1.default;


/***/ }),

/***/ "./db/sql/db-push.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(__webpack_require__("chalk"));
const path = __importStar(__webpack_require__("path"));
const new_database_1 = __importDefault(__webpack_require__("./db/sql/new-database.ts"));
const models_1 = __importDefault(__webpack_require__("./db/sql/models/index.ts"));
const PROJECT_ROOT_PATH = path.join(__dirname, '..', '..');
function getNewDb(resolve, reject) {
    let sequelize = new_database_1.default;
    resolve(sequelize);
}
function handleSyncError(err) {
    process.stderr.write('Problem synchronizing database', err);
}
class PushDb {
    constructor() {
        this._models = null;
    }
    open() {
        return new Promise(getNewDb);
    }
    get models() {
        if (this._models === null) {
            this._models = models_1.default(this.db);
        }
        return this._models;
    }
    transaction(callback) {
        return this.db.transaction(callback);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield this.connectToDatabase();
            process.stdout.write(chalk_1.default.blue('📦  Updating database'));
            yield this.db.sync({ force: true }).catch(handleSyncError);
            process.stdout.write(chalk_1.default.blue('   Database update complete ✅'));
        });
    }
    connectToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield this.open();
            yield conn.authenticate();
            try {
                return conn;
            }
            catch (err) {
                process.stderr.write(chalk_1.default.red(' - Problem authenticating to database\n', err));
                process.exit(1);
            }
        });
    }
}
exports.default = PushDb;

/* WEBPACK VAR INJECTION */}.call(exports, "db/sql"))

/***/ }),

/***/ "./db/sql/models/advertiser.js":
/***/ (function(module, exports) {

var Advertiser = null;
function defineAdvertiserModel(database, dataTypes) {
  if (!Advertiser) {
    Advertiser = database.define('Advertiser', {
      name: dataTypes.TEXT,
      age: dataTypes.INTEGER,
      createdAt: dataTypes.DATE,
      updatedAt: dataTypes.DATE
    });
  }
  return Advertiser;
}

module.exports = defineAdvertiserModel;

/***/ }),

/***/ "./db/sql/models/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var advertiser_1 = __webpack_require__("./db/sql/models/advertiser.js");
exports.Advertiser = advertiser_1.default;
var push_subscription_1 = __webpack_require__("./db/sql/models/push-subscription.js");
exports.PushSubscription = push_subscription_1.default;
const fs = __importStar(__webpack_require__("fs"));
const path = __importStar(__webpack_require__("path"));
const sequelize_1 = __importDefault(__webpack_require__("sequelize"));
function removeNonModelFiles(file) {
    return file.indexOf('.') !== 0 && file !== 'index.ts';
}
function getDatabaseModels(sequelize) {
    let db = {};
    let modelFiles = fs
        .readdirSync('api/db/sql/models') //TODO set programatically
        .filter(removeNonModelFiles);
    modelFiles.forEach(file => {
        let model = sequelize.import(path.join('..', 'db/sql/models', file)); //TODO set programatically
        db[model.name] = model;
    });
    Object.keys(db).forEach(modelName => {
        if ('associate' in db[modelName]) {
            db[modelName].associate(db);
        }
        db[modelName].sync();
    });
    db.sequelize = sequelize;
    db.Sequelize = sequelize_1.default;
    return db;
}
exports.default = getDatabaseModels;


/***/ }),

/***/ "./db/sql/models/push-subscription.js":
/***/ (function(module, exports) {

var PushSubscription = null;

function definePushSubscriptionModel(database, dataTypes) {
  PushSubscription = database.define('PushSubscription', {
    endpoint: {
      type: dataTypes.STRING,
      allowNull: false
    },
    keys: {
      type: dataTypes.STRING,
      allowNull: false
    }
  });
  return PushSubscription;
}

module.exports = definePushSubscriptionModel;

/***/ }),

/***/ "./db/sql/new-database.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(__webpack_require__("sequelize"));
const config_1 = __importDefault(__webpack_require__("./config/index.ts"));
const { db: { sql: { url, options } } } = config_1.default;
const database = new sequelize_1.default(url, options);
exports.default = database;


/***/ }),

/***/ "./index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(__webpack_require__("./server.ts"));
function setupApiServer(apiServer) {
    return __awaiter(this, void 0, void 0, function* () {
        yield apiServer.start();
        debugger;
        apiServer.listen();
    });
}
const apiServer = new server_1.default();
setupApiServer(apiServer);
const app = apiServer.app;
let currentApp = app;
if (true) {
    module.hot.accept(["./server.ts"], () => {
        apiServer.httpsServer.removeListener('request', currentApp);
        apiServer.httpsServer.on('request', app);
        currentApp = app;
    });
}


/***/ }),

/***/ "./middleware/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var middleware_1 = __webpack_require__("./middleware/middleware.ts");
exports.setupMiddleware = middleware_1.default;


/***/ }),

/***/ "./middleware/middleware.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(__webpack_require__("body-parser"));
const cors_1 = __importDefault(__webpack_require__("cors"));
const helmet_1 = __importDefault(__webpack_require__("helmet"));
const utils_1 = __importDefault(__webpack_require__("./utils/index.ts"));
const origin = utils_1.default.getUrl(utils_1.default.isProd());
const corsOptions = utils_1.default.getCorsOptions(origin);
function setupMiddleware(app) {
    app.use(helmet_1.default());
    app.use(cors_1.default(corsOptions));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    return app;
}
exports.default = setupMiddleware;


/***/ }),

/***/ "./modules/auth.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(__webpack_require__("./config/index.ts"));
const express_jwt_1 = __importDefault(__webpack_require__("express-jwt"));
const jsonwebtoken_1 = __importDefault(__webpack_require__("jsonwebtoken"));
const resources_1 = __webpack_require__("./resources/index.ts");
const checkToken = express_jwt_1.default({ secret: config_1.default.secrets.JWT_SECRET });
exports.signin = (req, res, next) => {
    const token = exports.signToken(req.user);
    res.json({ token: token });
};
exports.decodeToken = () => (req, res, next) => {
    if (config_1.default.disableAuth) {
        return next();
    }
    if (req.query && req.query.hasOwnProperty()) {
        req.headers.authorization = '';
    }
    checkToken(req, res, next);
};
exports.getFreshUser = () => (req, res, next) => {
    return resources_1.User.findById(req.user.id)
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
exports.signToken = (id) => jsonwebtoken_1.default.sign({ id }, config_1.default.secrets.JWT_SECRET, { expiresIn: config_1.default.expireTime });
function protect() {
    return checkToken;
}
exports.protect = protect;


/***/ }),

/***/ "./modules/error-handler.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    return 'Error Found';
}
exports.errorHandler = errorHandler;


/***/ }),

/***/ "./modules/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = __webpack_require__("./modules/query.ts");
exports.generateControllers = query_1.default;
var error_handler_1 = __webpack_require__("./modules/error-handler.ts");
exports.errorHandler = error_handler_1.errorHandler;
var auth_1 = __webpack_require__("./modules/auth.ts");
exports.protect = auth_1.protect;


/***/ }),

/***/ "./modules/query.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = __webpack_require__("immutable");
const testData = { message: 'hello' };
exports.controllers = {
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
        const updatedDocument = immutable_1.mergeDeep(docToUpdate, update);
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
function getAll(model) {
    return function (req, res, next) {
        exports.controllers
            .getAll(model)
            .then((result) => res.json(result))
            .catch((err) => res.status(504).send('Something went wrong'));
    };
}
function getOne(model) {
    return function (req, res) {
        return exports.controllers
            .getOne(req.body)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(504).send('Something went wrong'));
    };
}
function createOne(model) {
    return function (req, res, next) {
        return exports.controllers
            .createOne(model, req.body)
            .then((doc) => res.status(201).json(doc))
            .catch((err) => next(err));
    };
}
function updateOne(model) {
    return function (req, res, next) {
        const docToUpdate = req.docFromId;
        const update = req.body;
        return exports.controllers
            .updateOne(docToUpdate, update)
            .then((doc) => res.status(201).json(doc))
            .catch((err) => next(err));
    };
}
function deleteOne(model) {
    return function (req, res, next) {
        return exports.controllers
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
        return exports.controllers
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
exports.default = generateControllers;


/***/ }),

/***/ "./notification.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(__webpack_require__("chalk"));
const path = __importStar(__webpack_require__("path"));
const webpush = __webpack_require__("web-push");
let VAPID;
if (process.env.VAPID) {
    VAPID = JSON.parse(process.env.VAPID);
}
else {
    let pth = path.join('..', 'private', 'vapid');
    try {
        //VAPID = require(pth) TODO not working
        VAPID = __webpack_require__("../private/vapid.json");
    }
    catch (error) {
        process.stderr.write(chalk_1.default.bgRed.white('ERROR!: VAPID keys could not be loaded'));
        process.stderr.write(chalk_1.default.red(`  ↪ Expected to find keys in ${pth}.json\n    Make sure to run `) +
            chalk_1.default.yellow('npm run prepvapid') +
            chalk_1.default.red(' which should create this file for you'));
        process.exit(1);
    }
}
let PushSubscription = null;
webpush.setVapidDetails('mailto:maot.tm@gmail.com', VAPID.publicKey, VAPID.privateKey);
class NotificationManager {
    constructor(api) {
        this.api = api;
        PushSubscription = this.api.db.models['PushSubscription'];
    }
    push({ title, body }) {
        return PushSubscription.findAll()
            .then((subscriptions) => {
            subscriptions.forEach((subs) => {
                let record = subs.get({ plain: true });
                record.keys = JSON.parse(record.keys);
                return webpush
                    .sendNotification(record, JSON.stringify({
                    notification: {
                        title,
                        body
                    }
                }))
                    .catch((err) => {
                    if (err.statusCode === 410) {
                        console.log('deleteSubscriptionFromDatabase ', subs.id);
                        subs.destroy();
                    }
                    else {
                        console.log('Subscription is no longer valid: ', err);
                    }
                });
            });
        })
            .then(() => this);
    }
    pushWithDelay(delay, info) {
        return new Promise(resolve => {
            setTimeout(() => {
                let pushPromise = this.push(info);
                resolve(pushPromise);
            }, delay);
        });
    }
}
exports.default = NotificationManager;


/***/ }),

/***/ "./resources/exercise/exerciseTypes.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = exerciseTypes;


/***/ }),

/***/ "./resources/exercise/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var exerciseTypes_1 = __webpack_require__("./resources/exercise/exerciseTypes.ts");
exports.exerciseTypes = exerciseTypes_1.default;
var model_1 = __webpack_require__("./resources/exercise/model.ts");
exports.Exercise = model_1.default;
exports.exerciseSchema = model_1.schema;
var resolvers_1 = __webpack_require__("./resources/exercise/resolvers.ts");
exports.exerciseResolvers = resolvers_1.default;


/***/ }),

/***/ "./resources/exercise/model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(__webpack_require__("mongoose"));
exports.schema = {
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'size'
    },
    users: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user'
    }
};
const exerciseSchema = new mongoose_1.default.Schema(exports.schema);
exports.Exercise = mongoose_1.default.model('exercise', exerciseSchema);


/***/ }),

/***/ "./resources/exercise/resolvers.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __webpack_require__("./resources/exercise/model.ts");
const getExercise = (_, { id }, context) => __awaiter(this, void 0, void 0, function* () {
    const exercise = yield model_1.Exercise.findById(id).exec();
    if (!exercise) {
        throw new Error('No exercise id found');
    }
    else {
        return exercise;
    }
});
const getAllExercises = () => {
    return model_1.Exercise.find({}).exec();
};
const createExercise = (_, { input }, context) => {
    return model_1.Exercise.create(input);
};
const updateExercise = (_, { input }, context) => {
    const { id } = input, update = __rest(input, ["id"]);
    return model_1.Exercise.findByIdAndUpdate(id, update, { new: true }).exec();
};
const removeExercise = (_, { id }, context) => {
    return model_1.Exercise.findByIdAndRemove(id).exec();
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
exports.default = exerciseResolvers;


/***/ }),

/***/ "./resources/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var exercise_1 = __webpack_require__("./resources/exercise/index.ts");
exports.Exercise = exercise_1.Exercise;
exports.exerciseSchema = exercise_1.exerciseSchema;
exports.exerciseTypes = exercise_1.exerciseTypes;
exports.exerciseResolvers = exercise_1.exerciseResolvers;
var user_1 = __webpack_require__("./resources/user/index.ts");
exports.User = user_1.User;
exports.userSchema = user_1.userSchema;
exports.userTypes = user_1.userTypes;
exports.userResolvers = user_1.userResolvers;


/***/ }),

/***/ "./resources/user/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var userTypes_1 = __webpack_require__("./resources/user/userTypes.ts");
exports.userTypes = userTypes_1.default;
var model_1 = __webpack_require__("./resources/user/model.ts");
exports.User = model_1.User;
exports.userSchema = model_1.schema;
var resolvers_1 = __webpack_require__("./resources/user/resolvers.ts");
exports.userResolvers = resolvers_1.default;


/***/ }),

/***/ "./resources/user/model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(__webpack_require__("mongoose"));
exports.schema = {
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
const userSchema = new mongoose_1.default.Schema(exports.schema, { timestamps: true });
exports.User = mongoose_1.default.model('user', userSchema);


/***/ }),

/***/ "./resources/user/resolvers.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __webpack_require__("./resources/user/model.ts");
const getUser = (_, { id }) => __awaiter(this, void 0, void 0, function* () {
    const user = yield model_1.User.findById(id).exec();
    if (!user) {
        throw new Error(`No user id ${id} found`);
    }
    else {
        return user;
    }
});
const getAllUsers = () => {
    return model_1.User.find({}).exec();
};
const createUser = (_, { input }) => {
    return model_1.User.create(input);
};
const updateUser = (_, { input }, { user }) => {
    const { id } = user;
    return model_1.User.findByIdAndUpdate(id, input, { new: true });
};
const removeUser = (_, { id }) => {
    return model_1.User.findByIdAndRemove(id).exec();
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
exports.default = userResolvers;


/***/ }),

/***/ "./resources/user/userTypes.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = userTypes;


/***/ }),

/***/ "./routes/admin.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(__webpack_require__("express"));
const adminRouter = express.Router();
adminRouter.get('/', (req, res) => {
    res.json({ adminRouter: true });
});
exports.default = adminRouter;


/***/ }),

/***/ "./routes/analytics.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(__webpack_require__("express"));
const analyticsRouter = express.Router();
analyticsRouter.get('/', (req, res) => {
    res.json({ analyticsRouter: true });
});
exports.default = analyticsRouter;


/***/ }),

/***/ "./routes/graphql/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__("./routes/graphql/router.ts");
exports.graphQLRouter = router_1.graphQLRouter;
exports.schema = router_1.schema;


/***/ }),

/***/ "./routes/graphql/router.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const resources_1 = __webpack_require__("./resources/index.ts");
const apollo_server_express_1 = __webpack_require__("apollo-server-express");
const graphql_tools_1 = __webpack_require__("graphql-tools");
const immutable_1 = __webpack_require__("immutable");
const baseSchema = `
  schema {
    query: Query
    mutation: Mutation
  }
`;
exports.schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: [baseSchema, resources_1.userTypes, resources_1.exerciseTypes],
    resolvers: immutable_1.mergeDeep(resources_1.userResolvers, resources_1.exerciseResolvers)
});
exports.graphQLRouter = apollo_server_express_1.graphqlExpress(req => ({
    schema: exports.schema,
    context: {
        req,
        user: req.user
    }
}));


/***/ }),

/***/ "./routes/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var admin_1 = __webpack_require__("./routes/admin.ts");
exports.admin = admin_1.default;
var analytics_1 = __webpack_require__("./routes/analytics.ts");
exports.analytics = analytics_1.default;
var signin_1 = __webpack_require__("./routes/signin.ts");
exports.signin = signin_1.default;
var user_1 = __webpack_require__("./routes/user/index.ts");
exports.user = user_1.default;
var push_subscription_1 = __webpack_require__("./routes/push-subscription/index.ts");
exports.pushSubscription = push_subscription_1.default;


/***/ }),

/***/ "./routes/push-subscription/controller.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const createPushSubscriptionRoute = (api) => {
    var PushSubscription = api.db.models['PushSubscription'];
    return (req, res) => {
        let { endpoint, keys } = req.body;
        PushSubscription.destroy({
            truncate: true
        })
            .then(() => {
            return PushSubscription.create({ endpoint, keys: JSON.stringify(keys) })
                .then((ps) => {
                let record = ps.get({ plain: true });
                record.keys = JSON.parse(record.keys);
                res.json(record);
            })
                .catch((err) => {
                res.json({ error: `Problem saving data: ${err}` });
            });
        })
            .catch((err) => console.log(err, 'PushSubscription', PushSubscription));
    };
};
exports.default = createPushSubscriptionRoute;


/***/ }),

/***/ "./routes/push-subscription/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = __webpack_require__("./routes/push-subscription/controller.ts");
exports.create = controller_1.default;


/***/ }),

/***/ "./routes/setup.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = __webpack_require__("./modules/index.ts");
const graphql_1 = __webpack_require__("./routes/graphql/index.ts");
const apollo_server_express_1 = __webpack_require__("apollo-server-express");
const routes = __importStar(__webpack_require__("./routes/index.ts"));
const controller_1 = __importDefault(__webpack_require__("./routes/push-subscription/controller.ts"));
function setupRouters(app) {
    app.use('/signin', routes.signin);
    app.use('/admin', modules_1.protect, routes.admin);
    app.use('/analytics', modules_1.protect, routes.analytics);
    app.use('/user', routes.user);
    app.use('/graphql', graphql_1.graphQLRouter);
    app.use('/docs', apollo_server_express_1.graphiqlExpress({ endpointURL: '/graphql' }));
    return app;
}
exports.setupRouters = setupRouters;
function setupRoutes(api) {
    api.app.get('/', (req, res) => {
        res.json({ ok: true });
    });
    api.app.post('/', function (req, res) {
        res.send('POST request to the homepage');
    });
    api.app.post('/push-subscription', controller_1.default(api));
    api.app.get('/push-subscription', (req, res) => {
        res.json({ isWorking: true });
    });
    api.app.post('/push-msg', (req, res) => {
        api.notifications.push(req.body);
        res.json({ isWorking: true });
    });
    return api;
}
exports.setupRoutes = setupRoutes;


/***/ }),

/***/ "./routes/signin.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(__webpack_require__("express"));
const signinRouter = express.Router();
signinRouter.get('/', (req, res) => {
    res.json({ signinRouter: true });
});
exports.default = signinRouter;


/***/ }),

/***/ "./routes/user/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __webpack_require__("./routes/user/user.ts");
exports.default = user_1.default;


/***/ }),

/***/ "./routes/user/user.controller.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = __webpack_require__("./modules/index.ts");
const user_1 = __webpack_require__("./resources/user/index.ts");
const userControllers = modules_1.generateControllers(user_1.User);
exports.default = userControllers;


/***/ }),

/***/ "./routes/user/user.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(__webpack_require__("express"));
const user_controller_1 = __importDefault(__webpack_require__("./routes/user/user.controller.ts"));
const usersRouter = express.Router();
usersRouter.param('id', user_controller_1.default.findByParam);
usersRouter
    .route('/')
    .get(user_controller_1.default.getAll)
    .post(user_controller_1.default.createOne);
usersRouter
    .route('/:id')
    .get(user_controller_1.default.getOne)
    .delete(user_controller_1.default.createOne);
exports.default = usersRouter;


/***/ }),

/***/ "./server.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="typings.d.ts" />
const chalk_1 = __importDefault(__webpack_require__("chalk"));
const config_1 = __importDefault(__webpack_require__("./config/index.ts"));
const db_1 = __webpack_require__("./db/index.ts");
const express_1 = __importDefault(__webpack_require__("express"));
const https_1 = __webpack_require__("https");
const middleware_1 = __webpack_require__("./middleware/index.ts");
const modules_1 = __webpack_require__("./modules/index.ts");
const setup_1 = __webpack_require__("./routes/setup.ts");
const db_push_1 = __importDefault(__webpack_require__("./db/sql/db-push.ts"));
const notification_1 = __importDefault(__webpack_require__("./notification.ts"));
// TODO Import getDevelopmentCertificate dynamically
const devcert_with_localhost_1 = __importDefault(__webpack_require__("devcert-with-localhost"));
const devCertOptions = { installCertutil: false };
function startAndListen(app, port) {
    return new Promise(resolve => {
        app.listen(port, () => {
            console.log(`API Server is listening on port ${port}`);
            resolve();
        });
    });
}
function createApp() {
    return express_1.default();
}
function setupErrorHandler(app) {
    app.use(modules_1.errorHandler);
    return app;
}
function getDevelopmentSSL() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield devcert_with_localhost_1.default('Training App', devCertOptions);
        }
        catch (err) {
            console.log('Failed to get dev cert: ', err);
        }
    });
}
function createHttpsServer(app, ssl) {
    return https_1.createServer(ssl, app);
}
class ApiServer {
    constructor() {
        this.notifications = null;
        debugger;
        this.db = new db_push_1.default();
    }
    startApi() {
        this.app = createApp();
        middleware_1.setupMiddleware(this.app);
        db_1.connectNoSqlDb(config_1.default);
        setupErrorHandler(this.app);
        setup_1.setupRouters(this.app);
        setup_1.setupRoutes(this);
        this.createServer();
    }
    createServer() {
        devcert_with_localhost_1.default('Trainingaapp', devCertOptions)
            .then((ssl) => {
            this.httpsServer = createHttpsServer(this.app, ssl);
        })
            .catch((err) => console.log('dev cert failed:', err));
    }
    listen() {
        startAndListen(this.httpsServer, ApiServer.port);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            debugger;
            yield this.db.start();
            try {
                this.notifications = new notification_1.default(this);
            }
            catch (err) {
                console.log('Some error', err);
            }
            yield this.startApi();
            process.stdout.write(chalk_1.default.magenta('💻  API has started!'));
        });
    }
}
ApiServer.port = 3100;
exports.default = ApiServer;


/***/ }),

/***/ "./utils/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = __webpack_require__("./constant/index.ts");
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
    return isProd ? constant_1.PRODUCTION_URL : constant_1.DEVELOPMENT_URL;
}
exports.default = {
    getCorsOptions,
    getUrl,
    isProd
};


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

/***/ "chalk":
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),

/***/ "cors":
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "devcert-with-localhost":
/***/ (function(module, exports) {

module.exports = require("devcert-with-localhost");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-jwt":
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),

/***/ "fs":
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "graphql-tools":
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),

/***/ "helmet":
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),

/***/ "https":
/***/ (function(module, exports) {

module.exports = require("https");

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

/***/ "path":
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "sequelize":
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),

/***/ "web-push":
/***/ (function(module, exports) {

module.exports = require("web-push");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map