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
exports.getRestNaverCallback = exports.getNaverUser = exports.getNaverToken = exports.getRestNaver = void 0;
var axios_1 = require("axios");
var query_string_1 = require("query-string");
var config_1 = require("config");
var nanoid_1 = require("nanoid");
var NAVER_CODE = (0, nanoid_1.nanoid)(5);
var NAVER_AUTH_URL = "https://nid.naver.com/oauth2.0/authorize?response_type=code&state=".concat(NAVER_CODE, "&redirect_url=").concat(config_1.default.NAVER_REDIRECT_URL, "&client_id=").concat(config_1.default.NAVER_CLIENT_ID);
var NAVER_TOKEN_URL = 'https://nid.naver.com/oauth2.0/token?';
var NAVER_USER_URL = 'https://openapi.naver.com/v1/nid/me';
var getRestNaver = function (res) {
    res.redirect(NAVER_AUTH_URL);
};
exports.getRestNaver = getRestNaver;
var getNaverToken = function (code, redirectUri) { return __awaiter(void 0, void 0, void 0, function () {
    var data, response, token, tokenType, err_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                data = query_string_1.default.stringify({
                    grant_type: 'authorization_code',
                    client_id: config_1.default.NAVER_CLIENT_ID,
                    client_secret: config_1.default.NAVER_CLIENT_SECRET,
                    code: code,
                });
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.get(NAVER_TOKEN_URL + data)];
            case 2:
                response = _c.sent();
                token = (_a = response.data) === null || _a === void 0 ? void 0 : _a.access_token;
                tokenType = (_b = response.data) === null || _b === void 0 ? void 0 : _b.token_type;
                return [2 /*return*/, { token: token, tokenType: tokenType }];
            case 3:
                err_1 = _c.sent();
                return [2 /*return*/, undefined];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getNaverToken = getNaverToken;
var getNaverUser = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, response, naverResponse, id, email, gender, age, phoneNumber, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                headers = {
                    Authorization: "Bearer ".concat(token),
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.get(NAVER_USER_URL, { headers: headers })];
            case 2:
                response = _a.sent();
                naverResponse = response.data.response;
                id = naverResponse.id, email = naverResponse.email, gender = naverResponse.gender, age = naverResponse.age, phoneNumber = naverResponse.mobile;
                return [2 /*return*/, {
                        id: id,
                        email: email,
                        gender: gender,
                        age: age,
                        phoneNumber: phoneNumber,
                    }];
            case 3:
                err_2 = _a.sent();
                return [2 /*return*/, undefined];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getNaverUser = getNaverUser;
var getRestNaverCallback = function (code) { return __awaiter(void 0, void 0, void 0, function () {
    var tokenInfo, user, error_1, e;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getNaverToken(code)];
            case 1:
                tokenInfo = _a.sent();
                if (!tokenInfo) {
                    throw { status: 400, message: '네이버 토큰 발급 오류!' };
                }
                return [4 /*yield*/, getNaverUser(tokenInfo.token)];
            case 2:
                user = _a.sent();
                if (!user) {
                    throw { status: 500, message: '네이버 유저정보 발급 오류!' };
                }
                return [2 /*return*/, __assign(__assign({}, tokenInfo), { user: user })];
            case 3:
                error_1 = _a.sent();
                e = error_1;
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getRestNaverCallback = getRestNaverCallback;
