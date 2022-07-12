"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortByDistance = exports.getDistance = exports.getLocationByGeocode = exports.getLocationByKeyword = exports.getLocationByAddress = void 0;
var axios_1 = require("axios");
var query_string_1 = require("query-string");
var config_1 = require("../config");
var getLocationByAddress = function (address, page, size) {
    if (page === void 0) { page = 1; }
    if (size === void 0) { size = 15; }
    return __awaiter(void 0, void 0, void 0, function () {
        var query, url, headers, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = {
                        query: address,
                    };
                    url = "https://dapi.kakao.com/v2/local/search/address?".concat(query_string_1.default.stringify(query));
                    headers = {
                        Authorization: "KakaoAK ".concat(config_1.default.KAKAO_KEY),
                    };
                    return [4 /*yield*/, axios_1.default.get(url, { headers: headers })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, { data: response.data.documents, count: response.data.meta.total_count }];
            }
        });
    });
};
exports.getLocationByAddress = getLocationByAddress;
var getLocationByKeyword = function (keyword, x, y, radius, page, size) {
    if (page === void 0) { page = 1; }
    if (size === void 0) { size = 15; }
    return __awaiter(void 0, void 0, void 0, function () {
        var query, headers, kakaoUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = {
                        query: keyword,
                        page: page,
                        size: size,
                        x: x,
                        y: y,
                    };
                    if (radius)
                        query['radius'] = radius;
                    headers = {
                        Authorization: "KakaoAK ".concat(config_1.default.KAKAO_KEY),
                    };
                    kakaoUrl = "https://dapi.kakao.com/v2/local/search/keyword?".concat(query_string_1.default.stringify(query));
                    return [4 /*yield*/, axios_1.default.get(kakaoUrl, { headers: headers })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, { data: response.data.documents, count: response.data.meta.total_count }];
            }
        });
    });
};
exports.getLocationByKeyword = getLocationByKeyword;
var getLocationByGeocode = function (x, y) { return __awaiter(void 0, void 0, void 0, function () {
    var query, url, headers, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = { x: x, y: y };
                url = "https://dapi.kakao.com/v2/local/geo/coord2address?".concat(query_string_1.default.stringify(query));
                headers = {
                    Authorization: "KakaoAK ".concat(config_1.default.KAKAO_KEY),
                };
                return [4 /*yield*/, axios_1.default.get(url, { headers: headers })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data.documents];
        }
    });
}); };
exports.getLocationByGeocode = getLocationByGeocode;
var getDistance = function (_a) {
    var target = _a.target, current = _a.current;
    if (!target.latitude || !target.longitude)
        return -1;
    var R = 6371e3; // metres
    var φ1 = (Number(current.latitude) * Math.PI) / 180; // φ, λ in radians
    var φ2 = (Number(target.latitude) * Math.PI) / 180;
    var Δφ = ((Number(target.latitude) - Number(current.latitude)) * Math.PI) / 180;
    var Δλ = ((Number(target.longitude) - Number(target.longitude)) * Math.PI) / 180;
    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
};
exports.getDistance = getDistance;
var sortByDistance = function (_a) {
    var prev = _a.prev, next = _a.next, options = _a.options;
    var prevLongitude = prev.longitude, prevLatitude = prev.latitude;
    var nextLongitude = next.longitude, nextLatitude = next.latitude;
    if (!prevLatitude || !prevLongitude || !nextLatitude || !nextLongitude)
        return 0;
    var prevDistance = (0, exports.getDistance)({
        target: { latitude: prevLatitude, longitude: prevLongitude },
        current: {
            latitude: options.latitude,
            longitude: options.longitude,
        },
    });
    var nextDistance = (0, exports.getDistance)({
        target: { latitude: nextLatitude, longitude: nextLongitude },
        current: {
            latitude: options.latitude,
            longitude: options.longitude,
        },
    });
    if (prevDistance === -1 || prevDistance > nextDistance)
        return 1;
    else if (prevDistance < nextDistance)
        return -1;
    else
        return 0;
};
exports.sortByDistance = sortByDistance;
