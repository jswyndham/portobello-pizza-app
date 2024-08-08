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
exports.seedAdminUser = void 0;
// seeds/adminUserSeed.js
const UserModel_1 = __importDefault(require("../src/models/UserModel"));
const constants_1 = require("../src/constants");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedAdminUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcryptjs_1.default.hash('AdminPassword123!', 10);
    const adminUser = new UserModel_1.default({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: hashedPassword,
        userStatus: constants_1.USER_STATUS.ADMIN,
    });
    yield adminUser.save();
});
exports.seedAdminUser = seedAdminUser;
