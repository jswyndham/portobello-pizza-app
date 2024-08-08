"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../../src/logger"));
const verifyJWT = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded !== 'object' ||
            !decoded.userId ||
            !decoded.userStatus) {
            return null;
        }
        return {
            userId: decoded.userId,
            userStatus: decoded.userStatus,
        };
    }
    catch (err) {
        logger_1.default.error('Error during token verification:', err); // Add logging for debugging
        return null;
    }
};
exports.verifyJWT = verifyJWT;
