"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubdirectoryFromGithub = exports.removeFolder = exports.moveFolder = exports.checkFolder = void 0;
var fs = require("fs-extra");
var child_process_1 = require("child_process");
var checkFolder = function (path) {
    if (Array.isArray(path)) {
        path = path.join("/");
    }
    return fs.existsSync(path);
};
exports.checkFolder = checkFolder;
var moveFolder = function (src, dest) {
    fs.moveSync(src, dest, { overwrite: true });
};
exports.moveFolder = moveFolder;
var removeFolder = function (path) {
    fs.removeSync(path);
};
exports.removeFolder = removeFolder;
var getSubdirectoryFromGithub = function (_a) {
    var orgainzation = _a.orgainzation, repository = _a.repository, projectName = _a.projectName, branch = _a.branch, path = _a.path, newPath = _a.newPath;
    (0, child_process_1.execSync)("git clone https://github.com/".concat(orgainzation, "/").concat(repository, " ").concat(projectName));
    (0, child_process_1.execSync)("cd ".concat(projectName, " && git checkout ").concat(branch, " && cd ../"));
    var isExist = (0, exports.checkFolder)(path);
    if (!isExist) {
        throw new Error("Cannot find path in project");
    }
    (0, exports.moveFolder)(path, newPath);
    (0, exports.removeFolder)(projectName);
};
exports.getSubdirectoryFromGithub = getSubdirectoryFromGithub;
