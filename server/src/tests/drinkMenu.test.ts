import request from 'supertest';
import app from '../server';
import mongoose, { ConnectOptions } from 'mongoose';
import User from '../models/UserModel';
import jwt from 'jsonwebtoken';
import DrinkMenu from '../models/DrinkMenuModel';
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
	await DrinkMenu.deleteMany({});
	await User.deleteMany({});
	await mongoose.connection.db.dropDatabase();
}, 40000);

afterAll(async () => {
	await disconnectFromDatabase();
}, 40000);

let emailCounter = 1;

const getEmail = () => `testusers${emailCounter++}@example.com`;

// Function to generate a JWT for testing
const generateJWT = (userId: string, userStatus: string) => {
	return jwt.sign({ userId, userStatus }, process.env.JWT_SECRET as string, {
		expiresIn: '1h',
	});
};

describe('DrinkMenu API', () => {
	// Create a new drink menu item
	it('should create a new drink menu item', async () => {
		const email = getEmail();

		const registerRes = await request(app)
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

		const loginRes = await request(app).post('/api/v1/auth/login').send({
			email,
			password: 'Password123!',
		});

		const token = loginRes.body.token;
		expect(token).toBeDefined();

		const res = await request(app)
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
	}, 40000);

	// Get a single drink item (needed for edit drink menu)
	it('should get drink menu items', async () => {
		const email = getEmail();

		const registerRes = await request(app)
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

		const loginRes = await request(app).post('/api/v1/auth/login').send({
			email,
			password: 'Password123!',
		});

		const token = loginRes.body.token;
		expect(token).toBeDefined();

		await request(app)
			.post('/api/v1/drinkMenu')
			.set('Authorization', `Bearer ${token}`)
			.send({
				drinkCategory: 'BEER',
				name: 'Test Drink 1',
				ingredients: ['Water', 'Hops', 'Yeast', 'Malt'],
				price: 666,
				size: '500ml',
			});

		await request(app)
			.post('/api/v1/drinkMenu')
			.set('Authorization', `Bearer ${token}`)
			.send({
				drinkCategory: 'BEER',
				name: 'Test Drink 2',

				price: 666,
			});

		const res = await request(app)
			.get('/api/v1/drinkMenu')
			.set('Authorization', `Bearer ${token}`)
			.query({ page: 1, limit: 10 });

		expect(res.statusCode).toEqual(200);
		expect(res.body.items).toBeInstanceOf(Array);
		expect(res.body.items.length).toBeGreaterThanOrEqual(2);
		expect(res.body.items[0]).toHaveProperty('name', 'Test Drink 1');
		expect(res.body.items[1]).toHaveProperty('name', 'Test Drink 2');
	}, 40000);

	// Delete a drink item
	it('should delete a drink menu item', async () => {
		const email = getEmail();

		// Register Amy Doe
		const registerRes = await request(app)
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
		const loginRes = await request(app).post('/api/v1/auth/login').send({
			email,
			password: 'Password123!',
		});

		const token = loginRes.body.token;
		expect(token).toBeDefined();

		// Create a drink menu item
		const createRes = await request(app)
			.post('/api/v1/drinkMenu')
			.set('Authorization', `Bearer ${token}`)
			.send({
				drinkCategory: 'COCKTAIL',
				name: 'Test Cocktail To Delete',

				price: 666,
			});

		expect(createRes.statusCode).toEqual(201);
		expect(createRes.body).toHaveProperty('msg', 'New drink item created');
		expect(createRes.body.drinkItem).toHaveProperty(
			'name',
			'Test Cocktail To Delete'
		);

		// Delete the drink menu item
		const deleteRes = await request(app)
			.delete(`/api/v1/drinkMenu/${createRes.body.drinkItem._id}`)
			.set('Authorization', `Bearer ${token}`);

		expect(deleteRes.statusCode).toEqual(200);
		expect(deleteRes.body).toHaveProperty('msg', 'Drink menu item deleted');
	}, 40000);

	// Edit a drink menu item
	it('should edit a drink menu item', async () => {
		const email = getEmail();

		// Register Amy Doe
		const registerRes = await request(app)
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
		const loginRes = await request(app).post('/api/v1/auth/login').send({
			email,
			password: 'Password123!',
		});

		const token = loginRes.body.token;
		expect(token).toBeDefined();

		// Create a drink menu item
		const createRes = await request(app)
			.post('/api/v1/drinkMenu')
			.set('Authorization', `Bearer ${token}`)
			.send({
				drinkCategory: 'COCKTAIL',
				name: 'Test Cocktail To Edit',

				price: 666,
			});

		expect(createRes.statusCode).toEqual(201);
		expect(createRes.body).toHaveProperty('msg', 'New drink item created');
		expect(createRes.body.drinkItem).toHaveProperty(
			'name',
			'Test Cocktail To Edit'
		);

		// Edit the drink menu item
		const editRes = await request(app)
			.patch(`/api/v1/drinkMenu/${createRes.body.drinkItem._id}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				drinkCategory: 'BEER',
				name: 'Test Beer Edit',
				price: 777,
			});

		expect(editRes.statusCode).toEqual(200);
		expect(editRes.body).toHaveProperty(
			'message',
			'Drink menu item updated successfully'
		);
		expect(editRes.body.drinkItem).toHaveProperty('name', 'Test Beer Edit');
		expect(editRes.body.drinkItem).toHaveProperty('drinkCategory', 'BEER');
		expect(editRes.body.drinkItem).toHaveProperty('price', 777);
	}, 40000);
});
