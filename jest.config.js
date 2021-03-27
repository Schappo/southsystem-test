const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  bail: true,
  clearMocks: true,
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.test.ts'
  ],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@controllers/(.*)': '<rootDir>/src/controllers/$1',
    '@services/(.*)': '<rootDir>/src/services/$1',
    '@models/(.*)': '<rootDir>/src/models/$1',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
    '@config/(.*)': '<rootDir>/src/config/$1',
    '@types/(.*)': '<rootDir>/src/types/$1'
  },
  transform: tsjPreset.transform
}
