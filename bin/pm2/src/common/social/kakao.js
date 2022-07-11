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
exports.logoutKakaoUser = exports.getRestKakaoCallback = exports.getKakaoUser = exports.getKakaoToken = exports.getRestKakao = void 0;
var axios_1 = require("axios");
var query_string_1 = require("query-string");
var config_1 = require("../../config");
var KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize?client_id=".concat(config_1.default.KAKAO_KEY, "&redirect_uri=").concat(config_1.default.KAKAO_REDIRECT_URL, "&response_type=code");
var KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
var KAKAO_USER_URL = 'https://kapi.kakao.com/v2/user/me';
var getRestKakao = function (res) {
    res.redirect(KAKAO_AUTH_URL);
};
exports.getRestKakao = getRestKakao;
var getKakaoToken = function (code, redirectUri) { return __awaiter(void 0, void 0, void 0, function () {
    var data, response, token, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                data = query_string_1.default.stringify({
                    grant_type: 'authorization_code',
                    client_id: config_1.default.KAKAO_KEY,
                    client_secret: config_1.default.KAKAO_SECRET_KEY,
                    redirectUri: redirectUri || config_1.default.KAKAO_REDIRECT_URL,
                    code: code,
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.post(KAKAO_TOKEN_URL, data, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    })];
            case 2:
                response = _b.sent();
                token = (_a = response.data) === null || _a === void 0 ? void 0 : _a.access_token;
                return [2 /*return*/, token];
            case 3:
                error_1 = _b.sent();
                return [2 /*return*/, undefined];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getKakaoToken = getKakaoToken;
var getKakaoUser = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, response, id, error_2;
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
                return [4 /*yield*/, axios_1.default.get(KAKAO_USER_URL, {
                        headers: headers,
                    })];
            case 2:
                response = _a.sent();
                id = response.data.id;
                return [2 /*return*/, { id: id }];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, undefined];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getKakaoUser = getKakaoUser;
var getRestKakaoCallback = function (code) { return __awaiter(void 0, void 0, void 0, function () {
    var token, user, error_3, e;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getKakaoToken(code)];
            case 1:
                token = _a.sent();
                if (!token) {
                    throw { status: 400, message: '카카오 토큰 발급 오류!' };
                }
                return [4 /*yield*/, getKakaoUser(token)];
            case 2:
                user = _a.sent();
                if (!user) {
                    throw { status: 500, message: '카카오 유저정보 발급 오류!' };
                }
                return [2 /*return*/, { token: token, user: user }];
            case 3:
                error_3 = _a.sent();
                e = error_3;
                return [2 /*return*/, e];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getRestKakaoCallback = getRestKakaoCallback;
var logoutKakaoUser = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, data, response, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                headers = {
                    Authorization: "KakaoAK ".concat(config_1.default.KAKAO_ADMIN_KEY),
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                };
                data = query_string_1.default.stringify({
                    target_id_type: 'user_id',
                    target_id: id,
                });
                return [4 /*yield*/, axios_1.default.post('https://kapi.kakao.com/v1/user/logout', data, { headers: headers })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, err_1];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.logoutKakaoUser = logoutKakaoUser;
