module.exports = {

  // 'node' is the default env starting from v27 so this must be specified
  testEnvironment: 'jsdom',

  // Root directory for tests
  roots: ['<rootDir>/tests'],

  // A list of paths to modules that run some code to configure or set up the testing environment.
  // Each setupFile will be run once per test file. Since every test runs in its own environment,
  // these scripts will be executed in the testing environment immediately before executing the test code itself.
  setupFiles: ['./jest.setup.js'],

  transformIgnorePatterns: [
    '/node_modules/(?!vis-network).+\\.js$'
  ],

  // Jest transformations -- this adds support for TypeScript
  // using @swc/jest
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  },

  // Test spec file resolution pattern should contain `test`.
  testRegex: '((\\.|/*.)(test))\\.tsx?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  moduleNameMapper: {
    '^axios$': '<rootDir>/node_modules/axios/dist/node/axios.cjs',
    '^react-i18next$': '<rootDir>/tests/__fixtures__/mocks/react-i18next.js',               // Map react-i18next to the mock file
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/tests/__fixtures__/mocks/iconsMock.js',   // Map image files to iconsMock.js
    '\\.module\\.css$': 'identity-obj-proxy',                                               // CSS module files
    '\\.css$': '<rootDir>/tests/__fixtures__/mocks/stylesMock.js',                          // Optional: Mock regular CSS files
  },

  // Jest configurations
  collectCoverage: true,                                                                    // Enable coverage collection
  coverageDirectory: 'coverage',                                                            // Output folder for coverage
  collectCoverageFrom: ['./src/**'],                                                        // Specify the path from which Jest should collect coverage
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'json-summary'],                    // Add 'json-summary' to generate coverage-summary.json
  coverageThreshold: {
    global: {
      lines: 90                                                                             // Line coverage must be over 90%
    }
  },
};
