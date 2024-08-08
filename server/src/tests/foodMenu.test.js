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
const FoodMenuModel_1 = __importDefault(require("../src/models/FoodMenuModel"));
const UserModel_1 = __importDefault(require("../src/models/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
    yield FoodMenuModel_1.default.deleteMany({});
    yield UserModel_1.default.deleteMany({});
    yield mongoose_1.default.connection.db.dropDatabase();
}), 40000);
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, setup_1.disconnectFromDatabase)();
}), 40000);
let emailCounter = 1;
const getEmail = () => `testuser${emailCounter++}@example.com`;
// Function to generate a JWT for testing
const generateJWT = (userId, userStatus) => {
    return jsonwebtoken_1.default.sign({ userId, userStatus }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};
describe('FoodMenu API', () => {
    // Create a new food menu item
    it('should register a new food menu item', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = getEmail();
        const registerRes = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/auth/register')
            .send({
            firstName: 'John',
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
            .post('/api/v1/foodMenu')
            .set('Authorization', `Bearer ${token}`)
            .send({
            menuCategory: 'PIZZA',
            pizzaType: 'MEAT',
            name: 'Test Pizza',
            ingredients: JSON.stringify([
                'test chicken',
                'test basil',
                'test chilli',
                'test tomato paste',
            ]),
            price: 666,
            imageUrl: 'http://example.com/image.png', // optional
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('msg', 'New food item created');
        expect(res.body.foodItem).toHaveProperty('name', 'Test Pizza');
    }), 40000);
    // Get a single food item (needed for edit food menu)
    it('should get food menu items', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = getEmail();
        const registerRes = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/auth/register')
            .send({
            firstName: 'John',
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
            .post('/api/v1/foodMenu')
            .set('Authorization', `Bearer ${token}`)
            .send({
            menuCategory: 'PIZZA',
            pizzaType: 'MEAT',
            name: 'Test Pizza 1',
            ingredients: JSON.stringify([
                'test chicken',
                'test basil',
                'test chilli',
                'test tomato paste',
            ]),
            price: 666,
            imageUrl: 'http://example.com/image.png', // optional
        });
        yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/foodMenu')
            .set('Authorization', `Bearer ${token}`)
            .send({
            menuCategory: 'PIZZA',
            pizzaType: 'MEAT',
            name: 'Test Pizza 2',
            ingredients: JSON.stringify([
                'test chicken',
                'test basil',
                'test chilli',
                'test tomato paste',
            ]),
            price: 666,
            imageUrl: 'http://example.com/image.png', // optional
        });
        const res = yield (0, supertest_1.default)(server_1.default)
            .get('/api/v1/foodMenu')
            .set('Authorization', `Bearer ${token}`)
            .query({ page: 1, limit: 10 });
        expect(res.statusCode).toEqual(200);
        expect(res.body.items).toBeInstanceOf(Array);
        expect(res.body.items.length).toBeGreaterThanOrEqual(2);
        expect(res.body.items[0]).toHaveProperty('name', 'Test Pizza 1');
        expect(res.body.items[1]).toHaveProperty('name', 'Test Pizza 2');
    }), 40000);
    // Delete a food item
    it('should delete a food menu item', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = getEmail();
        // Register Jane Doe
        const registerRes = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/auth/register')
            .send({
            firstName: 'Jane',
            lastName: 'Doe',
            email,
            password: 'Password123!',
            confirmPassword: 'Password123!',
            userStatus: 'ADMIN', // Ensure the user has ADMIN role
        });
        expect(registerRes.statusCode).toEqual(201);
        // Login Jane Doe
        const loginRes = yield (0, supertest_1.default)(server_1.default).post('/api/v1/auth/login').send({
            email,
            password: 'Password123!',
        });
        const token = loginRes.body.token;
        expect(token).toBeDefined();
        // Create a food menu item
        const createRes = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/foodMenu')
            .set('Authorization', `Bearer ${token}`)
            .send({
            menuCategory: 'PIZZA',
            pizzaType: 'MEAT',
            name: 'Test Pizza To Delete',
            ingredients: JSON.stringify([
                'test chicken',
                'test basil',
                'test chilli',
                'test tomato paste',
            ]),
            price: 666,
            imageUrl: 'http://example.com/image.png', // optional
        });
        expect(createRes.statusCode).toEqual(201);
        expect(createRes.body).toHaveProperty('msg', 'New food item created');
        expect(createRes.body.foodItem).toHaveProperty('name', 'Test Pizza To Delete');
        // Delete the food menu item
        const deleteRes = yield (0, supertest_1.default)(server_1.default)
            .delete(`/api/v1/foodMenu/${createRes.body.foodItem._id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(deleteRes.statusCode).toEqual(200);
        expect(deleteRes.body).toHaveProperty('msg', 'Food menu item deleted');
    }), 40000);
    // Edit a food menu item
    it('should edit a food menu item', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = getEmail();
        // Register Jane Doe
        const registerRes = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/auth/register')
            .send({
            firstName: 'Jane',
            lastName: 'Doe',
            email,
            password: 'Password123!',
            confirmPassword: 'Password123!',
            userStatus: 'ADMIN', // Ensure the user has ADMIN role
        });
        expect(registerRes.statusCode).toEqual(201);
        // Login Jane Doe
        const loginRes = yield (0, supertest_1.default)(server_1.default).post('/api/v1/auth/login').send({
            email,
            password: 'Password123!',
        });
        const token = loginRes.body.token;
        expect(token).toBeDefined();
        // Create a food menu item
        const createRes = yield (0, supertest_1.default)(server_1.default)
            .post('/api/v1/foodMenu')
            .set('Authorization', `Bearer ${token}`)
            .send({
            menuCategory: 'PIZZA',
            pizzaType: 'MEAT',
            name: 'Test Pizza To Edit',
            ingredients: JSON.stringify([
                'test chicken',
                'test basil',
                'test chilli',
                'test tomato paste',
            ]),
            price: 666,
            imageUrl: 'http://example.com/image.png', // optional
        });
        expect(createRes.statusCode).toEqual(201);
        expect(createRes.body).toHaveProperty('msg', 'New food item created');
        expect(createRes.body.foodItem).toHaveProperty('name', 'Test Pizza To Edit');
        // Edit the food menu item
        const editRes = yield (0, supertest_1.default)(server_1.default)
            .patch(`/api/v1/foodMenu/${createRes.body.foodItem._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
            menuCategory: 'PASTA',
            name: 'Test Pasta',
            ingredients: JSON.stringify([
                'test chicken',
                'test basil',
                'test chilli',
                'test tomato paste',
            ]),
            price: 777,
            imageUrl: 'http://example.com/new-image.png', // optional
        });
        expect(editRes.statusCode).toEqual(200);
        expect(editRes.body).toHaveProperty('msg', 'Food item edited');
        expect(editRes.body.foodItem).toHaveProperty('name', 'Test Pasta');
        expect(editRes.body.foodItem).toHaveProperty('menuCategory', 'PASTA');
        expect(editRes.body.foodItem).toHaveProperty('price', 777);
    }), 40000);
});
