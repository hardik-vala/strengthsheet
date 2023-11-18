/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@common/(.*)$': '<rootDir>/../client/src/common/$1',
    '^@data/(.*)$': '<rootDir>/../client/src/data/$1',
    '^@models/(.*)$': '<rootDir>/../client/src/models/$1'
  }
};