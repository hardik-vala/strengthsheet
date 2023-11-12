/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@data/(.*)$': '<rootDir>/../client/src/data/$1',
    '^@models/(.*)$': '<rootDir>/../client/src/models/$1'
  }
};