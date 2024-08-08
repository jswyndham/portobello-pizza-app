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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../src/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const setup_1 = require("./setup");
const clearOldAuditLogs_1 = require("../src/jobs/clearOldAuditLogs");
const url = `mongodb://127.0.0.1:27017/test_database`;
const options = {
    serverSelectionTimeoutMS: 60000,
    connectTimeoutMS: 60000,
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, setup_1.connectToDatabase)();
}), 60000);
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.db.dropDatabase();
}), 60000);
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // Stop the cron job
    clearOldAuditLogs_1.clearOldAuditLogsJob.stop();
    // Close the Mongoose connection
    yield (0, setup_1.disconnectFromDatabase)();
    // Ensure all other asynchronous operations are cleared
    jest.clearAllTimers();
    jest.clearAllMocks();
}), 60000);
describe('Auth API', () => {
    it('should register a new user without authentication (first user)', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).post('/api/v1/auth/register').send({
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe1@example.com',
            password: 'Password123!',
            confirmPassword: 'Password123!',
            userStatus: 'MANAGER',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('msg', 'User registered');
        expect(res.body.user).toHaveProperty('email', 'johndoe1@example.com');
    }), 40000);
    it('should login a user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(server_1.default).post('/api/v1/auth/register').send({
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe2@example.com',
            password: 'Password123!',
            confirmPassword: 'Password123!',
            userStatus: 'MANAGER',
        });
        const res = yield (0, supertest_1.default)(server_1.default).post('/api/v1/auth/login').send({
            email: 'johndoe2@example.com',
            password: 'Password123!',
        });
        const token = res.body.token;
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg', 'User is logged in');
        expect(res.body.user).toHaveProperty('email', 'johndoe2@example.com');
        expect(token).toBeDefined();
    }), 40000);
    it('should logout a user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(server_1.default).post('/api/v1/auth/register').send({
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe3@example.com',
            password: 'Password123!',
            confirmPassword: 'Password123!',
            userStatus: 'MANAGER',
        });
        const loginRes = yield (0, supertest_1.default)(server_1.default).post('/api/v1/auth/login').send({
            email: 'johndoe3@example.com',
            password: 'Password123!',
        });
        const token = loginRes.body.token;
        const res = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/auth/logout')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg', 'User logged out');
    }), 40000);
});
