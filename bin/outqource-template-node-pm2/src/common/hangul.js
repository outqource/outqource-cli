"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChosungSearchedData = exports.hangulSearch = exports.isKorean = void 0;
var Hangul = require("hangul-js");
var korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
var isKorean = function (target) {
    if (!target)
        return false;
    return korean.test(target);
};
exports.isKorean = isKorean;
var hangulSearch = function (target, keyword) {
    target = target.toUpperCase();
    keyword = keyword.toUpperCase();
    for (var i = 0; i < keyword.length; i++) {
        if (Hangul.isJong(keyword[i])) {
            keyword = keyword.slice(0, i) + Hangul.d(keyword[i]).join('') + keyword.slice(i + 1);
        }
    }
    var seperatedTarget = Hangul.d(target, true);
    var seperatedKeyword = Hangul.d(keyword, true);
    var choTarget = seperatedTarget.map(function (el) { return el[0]; }).join('');
    var choKeyword = seperatedKeyword.map(function (el) { return el[0]; }).join('');
    var correctIdx = choTarget.indexOf(choKeyword);
    var check = false;
    while (correctIdx >= 0) {
        check = true;
        for (var charIdx = 0; charIdx < seperatedKeyword.length; charIdx++) {
            var dTargetIdx = charIdx + correctIdx;
            for (var dIdx = 0; dIdx < seperatedKeyword[charIdx].length; dIdx++) {
                if (seperatedTarget[dTargetIdx][dIdx] !== seperatedKeyword[charIdx][dIdx]) {
                    check = false;
                    if (dIdx === choKeyword[charIdx].length - 1 &&
                        Hangul.isCho(choKeyword[charIdx][dIdx]) &&
                        choKeyword[dTargetIdx + 1] &&
                        choKeyword[dTargetIdx + 1][0] === choKeyword[charIdx][dIdx])
                        check = true;
                    break;
                }
            }
            if (check === false) {
                correctIdx = choTarget.indexOf(choKeyword, correctIdx + 1);
                break;
            }
        }
        if (check)
            break;
    }
    return check;
};
exports.hangulSearch = hangulSearch;
var getChosungSearchedData = function (target, data, keyword) {
    return data.filter(function (value) { return (0, exports.hangulSearch)(value[target], keyword); });
};
exports.getChosungSearchedData = getChosungSearchedData;
