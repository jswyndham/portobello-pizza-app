import request from 'supertest';
import app from '../server';
import mongoose, { ConnectOptions } from 'mongoose';
import FoodMenu from '../models/FoodMenuModel';
import User from '../models/UserModel';
import jwt from 'jsonwebtoken';
import { connectToDatabase, disconnectFromDatabase } from './setup';

const url = `mongodb://127.0.0.1:27017/test_database`;
const options: ConnectOptions = {
	serverSelectionTimeoutMS: 40000, // 40 seconds
	connectTimeoutMS: 40000, // 40 seconds
};

beforeAll(async () => {
	await connectToDatabase();
}, 40000);

beforeEach(async () => {
	await FoodMenu.deleteMany({});
	await User.deleteMany({});
	await mongoose.connection.db.dropDatabase();
}, 40000);

afterAll(async () => {
	await disconnectFromDatabase();
}, 40000);

let emailCounter = 1;

const getEmail = () => `testuser${emailCounter++}@example.com`;

// Function to generate a JWT for testing
const generateJWT = (userId: string, userStatus: string) => {
	return jwt.sign({ userId, userStatus }, process.env.JWT_SECRET as string, {
		expiresIn: '1h',
	});
};

describe('FoodMenu API', () => {
	// Create a new food menu item
	it('should register a new food menu item', async () => {
		const email = getEmail();

		const registerRes = await request(app)
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

		const loginRes = await request(app).post('/api/v1/auth/login').send({
			email,
			password: 'Password123!',
		});

		const token = loginRes.body.token;
		expect(token).toBeDefined();

		const res = await request(app)
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
	}, 40000);

	// Get a single food item (needed for edit food menu)
	it('should get food menu items', async () => {
		const email = getEmail();

		const registerRes = await request(app)
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

		const loginRes = await request(app).post('/api/v1/auth/login').send({
			email,
			password: 'Password123!',
		});

		const token = loginRes.body.token;
		expect(token).toBeDefined();

		await request(app)
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

		await request(app)
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

		const res = await request(app)
			.get('/api/v1/foodMenu')
			.set('Authorization', `Bearer ${token}`)
			.query({ page: 1, limit: 10 });

		expect(res.statusCode).toEqual(200);
		expect(res.body.items).toBeInstanceOf(Array);
		expect(res.body.items.length).toBeGreaterThanOrEqual(2);
		expect(res.body.items[0]).toHaveProperty('name', 'Test Pizza 1');
		expect(res.body.items[1]).toHaveProperty('name', 'Test Pizza 2');
	}, 40000);

	// Delete a food item
	it('should delete a food menu item', async () => {
		const email = getEmail();

		// Register Jane Doe
		const registerRes = await request(app)
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
		const loginRes = await request(app).post('/api/v1/auth/login').send({
			email,
			password: 'Password123!',
		});

		const token = loginRes.body.token;
		expect(token).toBeDefined();

		// Create a food menu item
		const createRes = await request(app)
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
		expect(createRes.body.foodItem).toHaveProperty(
			'name',
			'Test Pizza To Delete'
		);

		// Delete the food menu item
		const deleteRes = await request(app)
			.delete(`/api/v1/foodMenu/${createRes.body.foodItem._id}`)
			.set('Authorization', `Bearer ${token}`);

		expect(deleteRes.statusCode).toEqual(200);
		expect(deleteRes.body).toHaveProperty('msg', 'Food menu item deleted');
	}, 40000);

	// Edit a food menu item
	it('should edit a food menu item', async () => {
		const email = getEmail();

		// Register Jane Doe
		const registerRes = await request(app)
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
		const loginRes = await request(app).post('/api/v1/auth/login').send({
			email,
			password: 'Password123!',
		});

		const token = loginRes.body.token;
		expect(token).toBeDefined();

		// Create a food menu item
		const createRes = await request(app)
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
		expect(createRes.body.foodItem).toHaveProperty(
			'name',
			'Test Pizza To Edit'
		);

		// Edit the food menu item
		const editRes = await request(app)
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
	}, 40000);
});
