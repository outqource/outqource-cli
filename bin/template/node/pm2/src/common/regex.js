"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePhoneNumber = exports.validateEmail = void 0;
var validateEmail = function (email) {
    var emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(email);
};
exports.validateEmail = validateEmail;
var validatePhoneNumber = function (phoneNumber) {
    var phoneNumberRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    return phoneNumberRegex.test(phoneNumber);
};
exports.validatePhoneNumber = validatePhoneNumber;
