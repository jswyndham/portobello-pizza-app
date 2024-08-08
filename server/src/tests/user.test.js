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
const UserModel_1 = __importDefault(require("../src/models/UserModel"));
const adminUserSeed_1 = require("../seeds/adminUserSeed");
const setup_1 = require("./setup");
const url = `mongodb://127.0.0.1:27017/test_database`;
const options = {
    serverSelectionTimeoutMS: 40000,
    connectTimeoutMS: 40000,
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, setup_1.connectToDatabase)();
    yield (0, adminUserSeed_1.seedAdminUser)();
}), 40000);
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield UserModel_1.default.deleteMany({});
    yield mongoose_1.default.connection.db.dropDatabase();
    yield (0, adminUserSeed_1.seedAdminUser)();
}), 40000);
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, setup_1.disconnectFromDatabase)();
}), 40000);
let emailCounter = 1;
const getEmail = () => `testusers${emailCounter++}@example.com`;
describe('User API', () => {
    it('should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = getEmail();
        const registerRes = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/auth/register')
            .send({
            firstName: 'James',
            lastName: 'Doe',
            email,
            password: 'Password123!',
            confirmPassword: 'Password123!',
            userStatus: 'ADMIN',
        });
        expect(registerRes.statusCode).toEqual(201);
        const loginRes = yield (0, supertest_1.default)(server_1.default).post('/api/v1/auth/login').send({
            email,
            password: 'Password123!',
        });
        const token = loginRes.body.token;
        expect(token).toBeDefined();
        const res = yield (0, supertest_1.default)(server_1.default)
            .get('/api/v1/user')
            .set('Authorization', `Bearer ${token}`)
            .query({ page: 1, limit: 10 });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    }), 40000);
    it('should edit a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = getEmail();
        const registerRes = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/auth/register')
            .send({
            firstName: 'James',
            lastName: 'Doe',
            email,
            password: 'Password123!',
            confirmPassword: 'Password123!',
            userStatus: 'ADMIN',
        });
        expect(registerRes.statusCode).toEqual(201);
        const userIdToEdit = registerRes.body.user.id;
        expect(userIdToEdit).toBeDefined();
        const loginRes = yield (0, supertest_1.default)(server_1.default).post('/api/v1/auth/login').send({
            email,
            password: 'Password123!',
        });
        const token = loginRes.body.token;
        expect(token).toBeDefined();
        const editRes = yield (0, supertest_1.default)(server_1.default)
            .patch(`/api/v1/user/${userIdToEdit}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
            firstName: 'John',
            lastName: 'Doe',
            email: 'newemail@example.com',
            password: 'NewPassword123!',
        });
        expect(editRes.statusCode).toEqual(200);
        expect(editRes.body).toHaveProperty('message', 'User details updated successfully');
        expect(editRes.body.user).toHaveProperty('firstName', 'John');
    }), 40000);
    it('should delete a user', () => __awaiter(void 0, void 0, void 0, function* () {
        // Login as ADMIN user
        const loginAdminRes = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/auth/login')
            .send({
            email: 'admin@example.com',
            password: 'AdminPassword123!',
        });
        const adminToken = loginAdminRes.body.token;
        expect(adminToken).toBeDefined();
        const managerEmail = getEmail();
        // Register MANAGER user by ADMIN user
        const registerManagerRes = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/auth/register')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
            firstName: 'Manager',
            lastName: 'User',
            email: managerEmail,
            password: 'ManagerPassword123!',
            confirmPassword: 'ManagerPassword123!',
            userStatus: 'MANAGER',
        });
        expect(registerManagerRes.statusCode).toEqual(201);
        const managerId = registerManagerRes.body.user.id;
        expect(managerId).toBeDefined();
        // Delete MANAGER user by ADMIN user
        const deleteRes = yield (0, supertest_1.default)(server_1.default)
            .delete(`/api/v1/user/${managerId}`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect(deleteRes.statusCode).toEqual(200);
        expect(deleteRes.body).toHaveProperty('message', 'User deleted successfully');
    }), 40000);
});
