"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var outqource_node_1 = require("outqource-node");
var parseEnv = new outqource_node_1.ParseEnv({ options: { path: path_1.default.join(__dirname, '../../.env') } }, [
    'NODE_ENV',
    'PORT',
    'DATABASE_URL',
    'CLIENT_URL',
    'SWAGGER_PATH',
    'SWAGGER_URLS',
    'SOFT_DELETE_MODELS',
    'JWT_KEY',
    'AES_KEY',
    'PASSWORD_SALT',
    'SOCIAL_SALT',
    'KAKAO_KEY',
    'KAKAO_ADMIN_KEY',
    'KAKAO_SECRET_KEY',
    'KAKAO_REDIRECT_URL',
    'GOOGLE_KEY',
    'GOOGLE_SECRET_KEY',
    'GOOGLE_REDIRECT_URL',
    'SLACK_VERIFY_TOKEN',
    'SLACK_SIGNING_SECRET',
    'SLACK_CLIENT_SECRET',
    'SLACK_CLIENT_ID',
    'SLACK_BOT_TOKEN',
    'NAVER_CLIENT_ID',
    'NAVER_CLIENT_SECRET',
    'NAVER_REDIRECT_URL',
]);
var config = parseEnv.result;
console.log('💙 Config Loading...', config);
exports.default = config;
