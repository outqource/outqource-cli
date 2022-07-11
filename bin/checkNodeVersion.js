"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var currentNodeVersion = process.versions.node;
var semver = currentNodeVersion.split(".");
var major = Number(semver[0]);
function checkNodeVersion() {
    if (major < 14) {
        console.error("You are running Node " +
            currentNodeVersion +
            ".\n" +
            "Outqource CLI requires Node 14 or higher. \n" +
            "Please update your version of Node.");
        process.exit(1);
    }
}
exports.default = checkNodeVersion;
