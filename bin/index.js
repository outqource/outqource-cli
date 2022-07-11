#!/usr/bin/env node
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
var yargs = require("yargs");
var checkNodeVersion_1 = require("./checkNodeVersion");
var utils_1 = require("./utils");
(0, checkNodeVersion_1.default)();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var options, _a, name_1, path, newPath;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, yargs
                    .usage("\n\tOutqource CLI for js/ts library\" \\\n\tUsage: npx outqource \\\n\t-t --template <template> \\\n\t-s --stack <stack> \\\n\t-n --name <name>\n")
                    .options({
                    stack: {
                        alias: "s",
                        describe: "Stack to use",
                        type: "string",
                    },
                    template: {
                        alias: "t",
                        describe: "Template to use",
                        type: "string",
                    },
                    name: {
                        alias: "n",
                        describe: "Name of the project",
                        type: "string",
                    },
                }).argv];
            case 1:
                options = _b.sent();
                if (!options.stack || !options.template) {
                    console.log("Please provide a template and stack");
                    process.exit(1);
                }
                try {
                    _a = (function () {
                        var _a;
                        var name = (_a = options.name) !== null && _a !== void 0 ? _a : "outqource";
                        var pathArray = [name, options.stack, options.template];
                        return [name, pathArray.join("/"), pathArray.join("-")];
                    })(), name_1 = _a[0], path = _a[1], newPath = _a[2];
                    (0, utils_1.getSubdirectoryFromGithub)({
                        orgainzation: "outqource",
                        repository: "outqource-template",
                        projectName: name_1,
                        branch: "dev",
                        path: path,
                        newPath: newPath,
                    });
                }
                catch (error) {
                    console.error(error);
                    process.exit(1);
                }
                return [2 /*return*/];
        }
    });
}); })();