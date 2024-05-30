import request from 'supertest';
import app from '../src/server';
import mongoose from 'mongoose';

// Before running the tests, connect to a test database
beforeAll(async () => {
	const url = `mongodb://127.0.0.1/test_database`; // Use a separate test database
	await mongoose.connect(url);
});

// After all tests, close the connection to the test database
afterAll(async () => {
	await mongoose.connection.close();
});

describe('Auth API', () => {
	it('should register a new user', async () => {
		const res = await request(app).post('/api/v1/auth/register').send({
			firstName: 'John',
			lastName: 'Doe',
			email: 'johndoe@example.com',
			password: 'password123',
			userStatus: 'MANAGER',
		});

		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('msg', 'User registered');
		expect(res.body.user).toHaveProperty('email', 'johndoe@example.com');
	});

	it('should login a user', async () => {
		const res = await request(app).post('/api/v1/auth/login').send({
			email: 'johndoe@example.com',
			password: 'password123',
		});

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('msg', 'User is logged in');
		expect(res.body.user).toHaveProperty('email', 'johndoe@example.com');
	});

	it('should logout a user', async () => {
		// First login the user to get the token
		const loginRes = await request(app).post('/api/v1/auth/login').send({
			email: 'johndoe@example.com',
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
	});
});
