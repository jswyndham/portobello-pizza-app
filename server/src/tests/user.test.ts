import request from 'supertest';
import app from '..';
import mongoose, { ConnectOptions } from 'mongoose';
import User from '../models/UserModel';
import { seedAdminUser } from '../seeds/adminUserSeed';
import { connectToDatabase, disconnectFromDatabase } from './setup';

const url = `mongodb://127.0.0.1:27017/test_database`;
const options: ConnectOptions = {
	serverSelectionTimeoutMS: 40000,
	connectTimeoutMS: 40000,
};

beforeAll(async () => {
	await connectToDatabase();
	await seedAdminUser();
}, 40000);

beforeEach(async () => {
	await User.deleteMany({});
	await mongoose.connection.db.dropDatabase();
	await seedAdminUser();
}, 40000);

afterAll(async () => {
	await disconnectFromDatabase();
}, 40000);

let emailCounter = 1;

const getEmail = () => `testusers${emailCounter++}@example.com`;

describe('User API', () => {
	it('should get all users', async () => {
		const email = getEmail();

		const registerRes = await request(app)
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

		const loginRes = await request(app).post('/api/v1/auth/login').send({
			email,
			password: 'Password123!',
		});

		const token = loginRes.body.token;
		expect(token).toBeDefined();

		const res = await request(app)
			.get('/api/v1/user')
			.set('Authorization', `Bearer ${token}`)
			.query({ page: 1, limit: 10 });

		expect(res.statusCode).toEqual(200);
		expect(res.body).toBeInstanceOf(Array);
	}, 40000);

	it('should edit a user', async () => {
		const email = getEmail();

		const registerRes = await request(app)
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

		const loginRes = await request(app).post('/api/v1/auth/login').send({
			email,
			password: 'Password123!',
		});

		const token = loginRes.body.token;
		expect(token).toBeDefined();

		const editRes = await request(app)
			.patch(`/api/v1/user/${userIdToEdit}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				firstName: 'John',
				lastName: 'Doe',
				email: 'newemail@example.com',
				password: 'NewPassword123!',
			});

		expect(editRes.statusCode).toEqual(200);
		expect(editRes.body).toHaveProperty(
			'message',
			'User details updated successfully'
		);
		expect(editRes.body.user).toHaveProperty('firstName', 'John');
	}, 40000);

	it('should delete a user', async () => {
		// Login as ADMIN user
		const loginAdminRes = await request(app)
			.post('/api/v1/auth/login')
			.send({
				email: 'admin@example.com',
				password: 'AdminPassword123!',
			});

		const adminToken = loginAdminRes.body.token;
		expect(adminToken).toBeDefined();

		const managerEmail = getEmail();

		// Register MANAGER user by ADMIN user
		const registerManagerRes = await request(app)
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
		const deleteRes = await request(app)
			.delete(`/api/v1/user/${managerId}`)
			.set('Authorization', `Bearer ${adminToken}`);

		expect(deleteRes.statusCode).toEqual(200);
		expect(deleteRes.body).toHaveProperty(
			'message',
			'User deleted successfully'
		);
	}, 40000);
});
