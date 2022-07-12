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
exports.getRestAppleCallback = exports.getAppleUser = exports.getRestApple = void 0;
var path_1 = require("path");
var jsonwebtoken_1 = require("jsonwebtoken");
var apple_auth_1 = require("apple-auth");
var apple_config_json_1 = require("../../config/apple.config.json");
var appleAuth = new apple_auth_1.default(apple_config_json_1.default, path_1.default.join(__dirname, "../../config/apple/".concat(apple_config_json_1.default.private_key_path)), 'text');
var getRestApple = function (res) {
    res.redirect(appleAuth.loginURL());
};
exports.getRestApple = getRestApple;
var getAppleUser = function (id_token) { return __awaiter(void 0, void 0, void 0, function () {
    var idToken, user;
    return __generator(this, function (_a) {
        try {
            idToken = jsonwebtoken_1.default.decode(id_token);
            if (!(idToken === null || idToken === void 0 ? void 0 : idToken.sub))
                return [2 /*return*/, undefined];
            user = {
                id: idToken.sub,
            };
            if (idToken.email)
                user.email = idToken.email;
            return [2 /*return*/, user];
        }
        catch (error) {
            return [2 /*return*/, undefined];
        }
        return [2 /*return*/];
    });
}); };
exports.getAppleUser = getAppleUser;
var getRestAppleCallback = function (code) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_1, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getAppleUser(code)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw { status: 500, message: '애플 유저 정보 발급 오류!' };
                return [2 /*return*/, { user: user }];
            case 2:
                error_1 = _a.sent();
                err = error_1;
                return [2 /*return*/, err];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getRestAppleCallback = getRestAppleCallback;
