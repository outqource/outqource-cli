"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubdirectoryFromGithub = exports.installDependencies = exports.removeFolder = exports.moveFolder = exports.checkFolder = void 0;
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
var installDependencies = function (path) {
    (0, child_process_1.execSync)("ls -al");
    if ((0, exports.checkFolder)(path)) {
        // execSync(`cd ./${path} && yarn && cd ../`, { cwd: path });
    }
};
exports.installDependencies = installDependencies;
var getSubdirectoryFromGithub = function (_a) {
    var orgainzation = _a.orgainzation, repository = _a.repository, projectName = _a.projectName, branch = _a.branch, src = _a.src, dest = _a.dest;
    try {
        (0, child_process_1.execSync)("git clone https://github.com/".concat(orgainzation, "/").concat(repository, " ").concat(projectName));
        (0, child_process_1.execSync)("cd ".concat(projectName, " && git checkout ").concat(branch, " && cd ../"));
        var isExist = (0, exports.checkFolder)(src);
        if (!isExist) {
            throw new Error("Cannot find path in project");
        }
        (0, exports.moveFolder)(src, dest);
        (0, exports.removeFolder)(projectName);
        (0, exports.installDependencies)(dest);
    }
    catch (e) {
        var error = e;
        console.red((error === null || error === void 0 ? void 0 : error.message) || "Unknown error");
        process.exit(1);
    }
};
exports.getSubdirectoryFromGithub = getSubdirectoryFromGithub;
