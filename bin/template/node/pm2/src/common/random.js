"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomSixNumber = exports.randomNumber = void 0;
var randomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};
exports.randomNumber = randomNumber;
var createRandomSixNumber = function () {
    var chars = '0123456789';
    var stringLength = 6;
    var randomstring = '';
    for (var i = 0; i < stringLength; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
};
exports.createRandomSixNumber = createRandomSixNumber;
