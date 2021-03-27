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
    '\\.scss$': 'identity-obj-proxy'
  },
  transform: tsjPreset.transform
}
