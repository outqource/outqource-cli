"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteScheduler = exports.creatSchedulerWithFCM = void 0;
var node_schedule_1 = require("node-schedule");
var creatSchedulerWithFCM = function (props) {
    return new Promise(function (resolve, reject) {
        try {
            node_schedule_1.default.scheduleJob(props.date, function () {
                try {
                    if (props.callback)
                        props.callback();
                    resolve(true);
                }
                catch (e) {
                    resolve(false);
                    reject(e);
                }
            });
        }
        catch (e) {
            resolve(false);
            reject(e);
        }
    });
};
exports.creatSchedulerWithFCM = creatSchedulerWithFCM;
var deleteScheduler = function (props) {
    return new Promise(function (resolve, reject) {
        try {
            resolve(node_schedule_1.default.cancelJob(props.targetId));
        }
        catch (e) {
            reject(e);
        }
    });
};
exports.deleteScheduler = deleteScheduler;
