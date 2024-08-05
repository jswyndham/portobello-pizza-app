import request from 'supertest';
import app from '../src/server';
import mongoose, { ConnectOptions } from 'mongoose';
import { connectToDatabase, disconnectFromDatabase } from './setup';
import { clearOldAuditLogsJob } from '../src/jobs/clearOldAuditLogs';

const url = `mongodb://127.0.0.1:27017/test_database`;
const options: ConnectOptions = {
	serverSelectionTimeoutMS: 60000,
	connectTimeoutMS: 60000,
};

beforeAll(async () => {
	await connectToDatabase();
}, 60000);

beforeEach(async () => {
	await mongoose.connection.db.dropDatabase();
}, 60000);

afterAll(async () => {
	// Stop the cron job
	clearOldAuditLogsJob.stop();
	// Close the Mongoose connection
	await disconnectFromDatabase();
	// Ensure all other asynchronous operations are cleared
	jest.clearAllTimers();
	jest.clearAllMocks();
}, 60000);

describe('Auth API', () => {
	it('should register a new user without authentication (first user)', async () => {
		const res = await request(app).post('/api/v1/auth/register').send({
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
	}, 40000);

	it('should login a user', async () => {
		await request(app).post('/api/v1/auth/register').send({
			firstName: 'John',
			lastName: 'Doe',
			email: 'johndoe2@example.com',
			password: 'Password123!',
			confirmPassword: 'Password123!',
			userStatus: 'MANAGER',
		});

		const res = await request(app).post('/api/v1/auth/login').send({
			email: 'johndoe2@example.com',
			password: 'Password123!',
		});

		const token = res.body.token;

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('msg', 'User is logged in');
		expect(res.body.user).toHaveProperty('email', 'johndoe2@example.com');
		expect(token).toBeDefined();
	}, 40000);

	it('should logout a user', async () => {
		await request(app).post('/api/v1/auth/register').send({
			firstName: 'John',
			lastName: 'Doe',
			email: 'johndoe3@example.com',
			password: 'Password123!',
			confirmPassword: 'Password123!',
			userStatus: 'MANAGER',
		});

		const loginRes = await request(app).post('/api/v1/auth/login').send({
			email: 'johndoe3@example.com',
			password: 'Password123!',
		});

		const token = loginRes.body.token;

		const res = await request(app)
			.post('/api/v1/auth/logout')
			.set('Authorization', `Bearer ${token}`);

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('msg', 'User logged out');
	}, 40000);
});
