// src/jest.config.js
const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '..'),
  testEnvironment: 'jsdom', // just "jsdom", not the full path
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|svg|webp|JPG|mp4)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
    testMatch: ['<rootDir>/src/Testing_Frontend/Unit_Testing/**/*.test.js'],
};
