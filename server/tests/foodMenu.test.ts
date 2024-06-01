import request from 'supertest';
import app from '../src/server';
import mongoose, { ConnectOptions } from 'mongoose';
import FoodMenu from '../src/models/FoodMenuModel';
import User from '../src/models/UserModel';

const url = `mongodb://127.0.0.1:27017/test_database`;

// Define connection options explicitly
const options: ConnectOptions = {
	serverSelectionTimeoutMS: 40000, // 40 seconds
	connectTimeoutMS: 40000, // 40 seconds
};

// Before running the tests, connect to a test database
beforeAll(async () => {
	if (mongoose.connection.readyState === 0) {
		await mongoose.connect(url, options);
	}
}, 40000);

// Clean up the database before each test
beforeEach(async () => {
	await FoodMenu.deleteMany({});
	await User.deleteMany({});
}, 40000);

// After all tests, close the connection to the test database
afterAll(async () => {
	await mongoose.disconnect();
}, 40000);

describe('FoodMenu API', () => {
	it('should register a new food menu item', async () => {
		// Step 1: Register a new user
		await request(app).post('/api/v1/auth/register').send({
			firstName: 'John',
			lastName: 'Doe',
			email: 'johndoe@example.com',
			password: 'password123',
			userStatus: 'MANAGER',
		});

		// Step 2: Log in the user to get a token
		const loginRes = await request(app).post('/api/v1/auth/login').send({
			email: 'johndoe@example.com',
			password: 'password123',
		});

		const token = loginRes.body.token;
		expect(token).toBeDefined();

		// Step 3: Use the token to create a food menu item
		const res = await request(app)
			.post('/api/v1/foodMenu/create')
			.set('Authorization', `Bearer ${token}`)
			.send({
				menuCategory: 'PIZZA',
				pizzaType: 'MEAT',
				name: 'Test Pizza',
				ingredients: [
					'test chicken',
					'test basil',
					'test chilli',
					'test tomato paste',
				],
				price: 666,
			});

		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('msg', 'New food item created');
		expect(res.body.foodItem).toHaveProperty('name', 'Test Pizza');
	}, 40000);

	it('should get food menu items', async () => {
		// Step 1: Register a new user
		await request(app).post('/api/v1/auth/register').send({
			firstName: 'John',
			lastName: 'Doe',
			email: 'johndoe2@example.com',
			password: 'password123',
			userStatus: 'MANAGER',
		});

		// Step 2: Log in the user to get a token
		const loginRes = await request(app).post('/api/v1/auth/login').send({
			email: 'johndoe2@example.com',
			password: 'password123',
		});

		const token = loginRes.body.token;
		expect(token).toBeDefined();

		// Step 3: Use the token to create a few food menu items
		await request(app)
			.post('/api/v1/foodMenu/create')
			.set('Authorization', `Bearer ${token}`)
			.send({
				menuCategory: 'PIZZA',
				pizzaType: 'MEAT',
				name: 'Test Pizza 1',
				ingredients: [
					'test chicken',
					'test basil',
					'test chilli',
					'test tomato paste',
				],
				price: 666,
			});

		await request(app)
			.post('/api/v1/foodMenu/create')
			.set('Authorization', `Bearer ${token}`)
			.send({
				menuCategory: 'PIZZA',
				pizzaType: 'MEAT',
				name: 'Test Pizza 2',
				ingredients: [
					'test chicken',
					'test basil',
					'test chilli',
					'test tomato paste',
				],
				price: 666,
			});

		// Step 4: Use the token to fetch food menu items
		const res = await request(app)
			.get('/api/v1/foodMenu/food-menu-items')
			.set('Authorization', `Bearer ${token}`)
			.query({ page: 1, limit: 10 });

		expect(res.statusCode).toEqual(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body.length).toBeGreaterThanOrEqual(2);
		expect(res.body[0]).toHaveProperty('name', 'Test Pizza 1');
		expect(res.body[1]).toHaveProperty('name', 'Test Pizza 2');
	}, 40000);
});
