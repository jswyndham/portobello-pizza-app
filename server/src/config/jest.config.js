module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	testMatch: ['**/?(*.)+(spec|test).ts'],
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
