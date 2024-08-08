"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
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
exports.default = config;
