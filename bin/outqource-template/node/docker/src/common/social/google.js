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
exports.getGoogleUserInfo = exports.getRestGoogleCallback = exports.getGoogleUser = exports.getGoogleToken = exports.getRestGoogle = void 0;
var axios_1 = require("axios");
var query_string_1 = require("query-string");
var config_1 = require("../../config");
var GOOGLE_AUTH_URL_PARAMS = query_string_1.default.stringify({
    client_id: config_1.default.GOOGLE_KEY,
    redirect_uri: config_1.default.GOOGLE_REDIRECT_URL,
    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
});
var GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/auth?".concat(GOOGLE_AUTH_URL_PARAMS);
var GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
var GOOGLE_USER_WEB_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';
var GOOGLE_USER_URL = 'https://oauth2.googleapis.com/tokeninfo?id_token=';
var getRestGoogle = function (res) {
    res.redirect(GOOGLE_AUTH_URL);
};
exports.getRestGoogle = getRestGoogle;
var getGoogleToken = function (code) { return __awaiter(void 0, void 0, void 0, function () {
    var data, response, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                data = {
                    client_id: config_1.default.GOOGLE_KEY,
                    client_secret: config_1.default.GOOGLE_SECRET_KEY,
                    redirect_uri: config_1.default.GOOGLE_REDIRECT_URL,
                    grant_type: 'authorization_code',
                    code: code,
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.post(GOOGLE_TOKEN_URL, data)];
            case 2:
                response = _b.sent();
                return [2 /*return*/, (_a = response.data) === null || _a === void 0 ? void 0 : _a.access_token];
            case 3:
                error_1 = _b.sent();
                return [2 /*return*/, undefined];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getGoogleToken = getGoogleToken;
var getGoogleUser = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var response, _a, id, email, nickname, profileImage, error_2, response;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("".concat(GOOGLE_USER_URL).concat(token))];
            case 1:
                response = _b.sent();
                _a = response.data, id = _a.id, email = _a.email, nickname = _a.name, profileImage = _a.picture;
                return [2 /*return*/, {
                        id: id,
                        email: email,
                        nickname: nickname,
                        profileImage: profileImage,
                    }];
            case 2:
                error_2 = _b.sent();
                response = error_2.response;
                console.log(response.data);
                if (response.data.error === 'invalid_token')
                    throw { status: 403, message: 'GOOGLE_TOKEN_EXPIRED' };
                return [2 /*return*/, undefined];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getGoogleUser = getGoogleUser;
var getGoogleUserInfo = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, response, _a, id, email, nickname, profileImage, error_3, response;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                headers = {
                    Authorization: "Bearer ".concat(token),
                };
                return [4 /*yield*/, axios_1.default.get(GOOGLE_USER_WEB_URL, { headers: headers })];
            case 1:
                response = _b.sent();
                _a = response.data, id = _a.id, email = _a.email, nickname = _a.name, profileImage = _a.picture;
                if (response.data.error === 'invalid_token') {
                    throw { status: 401, message: 'TOKEN_EXPIRED' };
                }
                return [2 /*return*/, {
                        id: id,
                        email: email,
                        nickname: nickname,
                        profileImage: profileImage,
                    }];
            case 2:
                error_3 = _b.sent();
                response = error_3.response;
                if (response.data.error === 'invalid_token')
                    throw { status: 403, message: 'GOOGLE_TOKEN_EXPIRED' };
                return [2 /*return*/, undefined];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getGoogleUserInfo = getGoogleUserInfo;
var getRestGoogleCallback = function (code) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getGoogleUserInfo(code)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw { status: 500, message: '구글 유저정보 발급 오류!' };
                }
                return [2 /*return*/, { token: code, user: user }];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, error_4];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getRestGoogleCallback = getRestGoogleCallback;
