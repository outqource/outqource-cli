"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("outqource-node/express");
var index_1 = require("config/index");
var controllers_1 = require("controllers");
var path_1 = require("path");
var openAPIOptions = {
    title: '메디스 서버',
    version: '0.0.1',
    urls: index_1.default.SWAGGER_URLS.split(','),
};
var initApp = new express_1.InitApp({
    controllers: controllers_1.default,
    openAPI: {
        path: path_1.default.join(__dirname, index_1.default.SWAGGER_PATH),
        options: openAPIOptions,
        endPoint: '/api-docs',
    },
});
exports.default = initApp;
