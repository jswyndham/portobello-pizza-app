import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testTimeout: 40000,
	roots: ['<rootDir>/tests', '<rootDir>/src'],
	moduleNameMapper: {
		'^../utils/tokenUtils$': '<rootDir>/tests/__mocks__/tokenUtils.ts',
	},
};

export default config;
