"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnumValues = void 0;
var getEnumValues = function (target) {
    var value = Object.values(target).reduce(function (prev, curr) {
        prev[0] += curr + ',';
        return prev;
    }, ['']);
    return [value[0].slice(0, value[0].length - 1)];
};
exports.getEnumValues = getEnumValues;
