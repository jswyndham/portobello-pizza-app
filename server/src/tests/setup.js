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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectFromDatabase = exports.connectToDatabase = void 0;
// tests/setup.ts
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = `mongodb://127.0.0.1:27017/test_database_${new Date().getTime()}`;
    const options = {
        serverSelectionTimeoutMS: 40000,
        connectTimeoutMS: 40000,
    };
    yield mongoose_1.default.connect(url, options);
});
exports.connectToDatabase = connectToDatabase;
const disconnectFromDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.db.dropDatabase();
    yield mongoose_1.default.disconnect();
});
exports.disconnectFromDatabase = disconnectFromDatabase;
