"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.unpackActions = void 0;
var zustand_1 = require("zustand");
/**
 * Unpack store actions object.
 * @param packedActions all store actions imported from file
 * @param setState setState action
 */
var unpackActions = function (packedActions, setState) {
    var actionKeys = Object.keys(packedActions);
    return actionKeys.reduce(function (result, key) {
        var _a;
        if (typeof packedActions[key] === "function") {
            if (typeof packedActions[key](setState) === "function") {
                return __assign(__assign({}, result), (_a = {}, _a[key] = packedActions[key](setState), _a));
            }
            else {
                console.error("[unpackActions]: action with name \"".concat(String(key), "\" has wrong return, it's should be \n(setState: SetState) => (...args: any[]) => {...}\nbut it \n(setState: SetState) => {...}"));
            }
        }
        else {
            console.error("[unpackActions]: action with name \"".concat(String(key), "\" not a function, please check actions file"));
        }
        return result;
    }, {});
};
exports.unpackActions = unpackActions;
// Create store, return [useStoreHook, storeSelectors, defaultZustandStore]
var create = function (initState) {
    var selectors = function (key) {
        return function (state) {
            return state[key];
        };
    };
    var createdStore = (0, zustand_1.create)(function (set) {
        return initState(set);
    });
    function store(value) {
        if (!value) {
            return createdStore;
        }
        if (typeof value === "function") {
            return createdStore(value);
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return createdStore(function (state) { return state[value]; });
    }
    return [store, selectors, createdStore];
};
exports.create = create;
