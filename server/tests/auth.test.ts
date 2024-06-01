import request from 'supertest';
import app from '../src/server';
import mongoose, { ConnectOptions } from 'mongoose';
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
	await User.deleteMany({});
}, 40000);

// After all tests, close the connection to the test database
afterAll(async () => {
	await mongoose.disconnect();
}, 40000);

describe('Auth API', () => {
	it('should register a new user', async () => {
		const res = await request(app).post('/api/v1/auth/register').send({
			firstName: 'John',
			lastName: 'Doe',
			email: 'johndoe1@example.com', // Use a unique email
			password: 'password123',
			userStatus: 'MANAGER',
		});

		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('msg', 'User registered');
		expect(res.body.user).toHaveProperty('email', 'johndoe1@example.com');
	}, 40000);

	it('should login a user', async () => {
		// Register the user first
		await request(app).post('/api/v1/auth/register').send({
			firstName: 'John',
			lastName: 'Doe',
			email: 'johndoe2@example.com', // Use a unique email
			password: 'password123',
			userStatus: 'MANAGER',
		});

		const res = await request(app).post('/api/v1/auth/login').send({
			email: 'johndoe2@example.com',
			password: 'password123',
		});

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('msg', 'User is logged in');
		expect(res.body.user).toHaveProperty('email', 'johndoe2@example.com');
	}, 40000);

	it('should logout a user', async () => {
		// Register and login the user first
		await request(app).post('/api/v1/auth/register').send({
			firstName: 'John',
			lastName: 'Doe',
			email: 'johndoe3@example.com', // Use a unique email
			password: 'password123',
			userStatus: 'MANAGER',
		});

		const loginRes = await request(app).post('/api/v1/auth/login').send({
			email: 'johndoe3@example.com',
			password: 'password123',
		});

		const token = loginRes.headers['set-cookie'][0]
			.split(';')[0]
			.split('=')[1];

		const res = await request(app)
			.get('/api/v1/auth/logout')
			.set('Cookie', [`token=${token}`]);

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('msg', 'User logged out');
	}, 40000);
});
