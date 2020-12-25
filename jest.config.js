// jest.config.js
const { defaults } = require('jest-config');

module.exports = async () => ({
    verbose: true,
    testMatch: [...defaults.testMatch, '**/test/**/*.test.js'],
    rootDir: './',
    setupFiles: ['./test/setEnvVars.js'],
});
