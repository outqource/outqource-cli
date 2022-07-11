"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseWithId = exports.emptyResponse = exports.tokenDTO = exports.timeDTO = exports.createPaginationDTO = exports.createListResponse = exports.createRequestDTO = exports.createPaginationRequestDTO = exports.paginationDTO = exports.paginationRequestDTO = void 0;
var range_1 = require("lodash/range");
var pagination_1 = require("./pagination");
var paginationRequestDTO = function () {
    return [
        { key: 'page', type: 'number', default: 1, nullable: true },
        { key: 'limit', type: 'number', default: 20, nullable: true },
    ];
};
exports.paginationRequestDTO = paginationRequestDTO;
exports.paginationDTO = {
    count: 'number',
    page: 'number',
    limit: 'number',
    offset: 'number',
    isPrev: 'boolean',
    isNext: 'boolean',
};
var createPaginationRequestDTO = function (data, status) { return ({
    status: status || 200,
    example: { pagination: exports.paginationDTO, rows: (0, range_1.default)(0, 3).map(function (index) { return data; }) },
}); };
exports.createPaginationRequestDTO = createPaginationRequestDTO;
var createRequestDTO = function (row, status) { return ({
    status: status || 200,
    example: { row: row },
}); };
exports.createRequestDTO = createRequestDTO;
var createListResponse = function (rows, status) { return ({
    status: status || 200,
    example: { rows: [rows], pagination: exports.paginationDTO },
}); };
exports.createListResponse = createListResponse;
var createPaginationDTO = function (take, skip, count, rows) { return ({
    pagination: (0, pagination_1.getPagination)(take, skip, count),
    rows: rows,
}); };
exports.createPaginationDTO = createPaginationDTO;
exports.timeDTO = {
    createdAt: 'date',
    updatedAt: 'date',
    deletedAt: 'date | null',
};
var tokenDTO = function (status) {
    return {
        status: status,
        example: {
            accessToken: 'string',
            refreshToken: 'string',
        },
    };
};
exports.tokenDTO = tokenDTO;
var emptyResponse = function (status) {
    return {
        status: status,
        example: {},
    };
};
exports.emptyResponse = emptyResponse;
var responseWithId = function (status) {
    return {
        status: status,
        example: { id: 'string' },
    };
};
exports.responseWithId = responseWithId;
