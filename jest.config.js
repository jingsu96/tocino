module.exports = {
  roots: ['./packages/components'],
  preset: 'ts-jest',
  testEnvironment: './custom-env.ts',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './packages/tsconfig/react-ui.json',
      },
    ],
  },
  cacheDirectory: '.jest-cache',
  collectCoverage: true,
  coverageDirectory: 'jest-coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '.stories.js', 'index.js'],
  coverageProvider: 'v8',
  coverageReporters: ['html', 'text'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 65,
      lines: 80,
    },
  },
  setupFilesAfterEnv: ['./scripts/setupTests.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/eslint-plugin/'],
  testMatch: ['**/*.test.[jt]s?(x)'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
  },
};
