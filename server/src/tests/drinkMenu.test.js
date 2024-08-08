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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DrinkMenuModel_1 = __importDefault(require("../src/models/DrinkMenuModel"));
const setup_1 = require("./setup");
const url = `mongodb://127.0.0.1:27017/test_database`;
const options = {
    serverSelectionTimeoutMS: 40000, // 40 seconds
    connectTimeoutMS: 40000, // 40 seconds
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, setup_1.connectToDatabase)();
}), 40000);
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield DrinkMenuModel_1.default.deleteMany({});
    yield UserModel_1.default.deleteMany({});
    yield mongoose_1.default.connection.db.dropDatabase();
}), 40000);
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, setup_1.disconnectFromDatabase)();
}), 40000);
let emailCounter = 1;
const getEmail = () => `testusers${emailCounter++}@example.com`;
// Function to generate a JWT for testing
const generateJWT = (userId, userStatus) => {
    return jsonwebtoken_1.default.sign({ userId, userStatus }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};
describe('DrinkMenu API', () => {
    // Create a new drink menu item
    it('should create a new drink menu item', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = getEmail();
        const registerRes = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/auth/register')
            .send({
            firstName: 'James',
            lastName: 'Doe',
            email,
            password: 'Password123!',
            confirmPassword: 'Password123!',
            userStatus: 'MANAGER',
        });
        expect(registerRes.statusCode).toEqual(201);
        const loginRes = yield (0, supertest_1.default)(server_1.default).post('/api/v1/auth/login').send({
            email,
            password: 'Password123!',
        });
        const token = loginRes.body.token;
        expect(token).toBeDefined();
        const res = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/drinkMenu')
            .set('Authorization', `Bearer ${token}`)
            .send({
            drinkCategory: 'BEER',
            name: 'Test Drink',
            price: 666,
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('msg', 'New drink item created');
        expect(res.body.drinkItem).toHaveProperty('name', 'Test Drink');
    }), 40000);
    // Get a single drink item (needed for edit drink menu)
    it('should get drink menu items', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = getEmail();
        const registerRes = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/auth/register')
            .send({
            firstName: 'James',
            lastName: 'Doe',
            email,
            password: 'Password123!',
            confirmPassword: 'Password123!',
            userStatus: 'MANAGER',
        });
        expect(registerRes.statusCode).toEqual(201);
        const loginRes = yield (0, supertest_1.default)(server_1.default).post('/api/v1/auth/login').send({
            email,
            password: 'Password123!',
        });
        const token = loginRes.body.token;
        expect(token).toBeDefined();
        yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/drinkMenu')
            .set('Authorization', `Bearer ${token}`)
            .send({
            drinkCategory: 'BEER',
            name: 'Test Drink 1',
            ingredients: ['Water', 'Hops', 'Yeast', 'Malt'],
            price: 666,
            size: '500ml',
        });
        yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/drinkMenu')
            .set('Authorization', `Bearer ${token}`)
            .send({
            drinkCategory: 'BEER',
            name: 'Test Drink 2',
            price: 666,
        });
        const res = yield (0, supertest_1.default)(server_1.default)
            .get('/api/v1/drinkMenu')
            .set('Authorization', `Bearer ${token}`)
            .query({ page: 1, limit: 10 });
        expect(res.statusCode).toEqual(200);
        expect(res.body.items).toBeInstanceOf(Array);
        expect(res.body.items.length).toBeGreaterThanOrEqual(2);
        expect(res.body.items[0]).toHaveProperty('name', 'Test Drink 1');
        expect(res.body.items[1]).toHaveProperty('name', 'Test Drink 2');
    }), 40000);
    // Delete a drink item
    it('should delete a drink menu item', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = getEmail();
        // Register Amy Doe
        const registerRes = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/auth/register')
            .send({
            firstName: 'Amy',
            lastName: 'Doe',
            email,
            password: 'Password123!',
            confirmPassword: 'Password123!',
            userStatus: 'ADMIN', // Ensure the user has ADMIN role
        });
        expect(registerRes.statusCode).toEqual(201);
        // Login Amy Doe
        const loginRes = yield (0, supertest_1.default)(server_1.default).post('/api/v1/auth/login').send({
            email,
            password: 'Password123!',
        });
        const token = loginRes.body.token;
        expect(token).toBeDefined();
        // Create a drink menu item
        const createRes = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/drinkMenu')
            .set('Authorization', `Bearer ${token}`)
            .send({
            drinkCategory: 'COCKTAIL',
            name: 'Test Cocktail To Delete',
            price: 666,
        });
        expect(createRes.statusCode).toEqual(201);
        expect(createRes.body).toHaveProperty('msg', 'New drink item created');
        expect(createRes.body.drinkItem).toHaveProperty('name', 'Test Cocktail To Delete');
        // Delete the drink menu item
        const deleteRes = yield (0, supertest_1.default)(server_1.default)
            .delete(`/api/v1/drinkMenu/${createRes.body.drinkItem._id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(deleteRes.statusCode).toEqual(200);
        expect(deleteRes.body).toHaveProperty('msg', 'Drink menu item deleted');
    }), 40000);
    // Edit a drink menu item
    it('should edit a drink menu item', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = getEmail();
        // Register Amy Doe
        const registerRes = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/auth/register')
            .send({
            firstName: 'Amy',
            lastName: 'Doe',
            email,
            password: 'Password123!',
            confirmPassword: 'Password123!',
            userStatus: 'ADMIN', // Ensure the user has ADMIN role
        });
        expect(registerRes.statusCode).toEqual(201);
        // Login Amy Doe
        const loginRes = yield (0, supertest_1.default)(server_1.default).post('/api/v1/auth/login').send({
            email,
            password: 'Password123!',
        });
        const token = loginRes.body.token;
        expect(token).toBeDefined();
        // Create a drink menu item
        const createRes = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/drinkMenu')
            .set('Authorization', `Bearer ${token}`)
            .send({
            drinkCategory: 'COCKTAIL',
            name: 'Test Cocktail To Edit',
            price: 666,
        });
        expect(createRes.statusCode).toEqual(201);
        expect(createRes.body).toHaveProperty('msg', 'New drink item created');
        expect(createRes.body.drinkItem).toHaveProperty('name', 'Test Cocktail To Edit');
        // Edit the drink menu item
        const editRes = yield (0, supertest_1.default)(server_1.default)
            .patch(`/api/v1/drinkMenu/${createRes.body.drinkItem._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
            drinkCategory: 'BEER',
            name: 'Test Beer Edit',
            price: 777,
        });
        expect(editRes.statusCode).toEqual(200);
        expect(editRes.body).toHaveProperty('message', 'Drink menu item updated successfully');
        expect(editRes.body.drinkItem).toHaveProperty('name', 'Test Beer Edit');
        expect(editRes.body.drinkItem).toHaveProperty('drinkCategory', 'BEER');
        expect(editRes.body.drinkItem).toHaveProperty('price', 777);
    }), 40000);
});
