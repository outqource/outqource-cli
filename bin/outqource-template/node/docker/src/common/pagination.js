"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = void 0;
var getPagination = function (take, skip, count) {
    var limit = Number(take);
    var page = (Number(skip) % Number(take)) + 1;
    var offset = Number(skip);
    var isPrev = Number(page) <= 0;
    var isNext = page * limit < count;
    return {
        count: count,
        isNext: isNext,
        isPrev: isPrev,
        limit: limit,
        offset: offset,
        page: page,
    };
};
exports.getPagination = getPagination;
