const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  automock: false,
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
  },
};

module.exports = createJestConfig(customJestConfig);
