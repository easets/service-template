/* eslint-disable no-console */

const replace = require('replace-in-file');
const crypto = require('crypto');

const serviceName = process.argv[2];
const companyName = process.argv[3] || serviceName;

if (serviceName) {
    const files = ['.github/workflows/test.yml',
        '.env.*',
        'src/routes/swagger/index.js',
        'dev/docker-compose.yml',
        'package*.json',
        'src/routes/swagger/index.js'];
    const name = {
        files,
        from: /{{name}}/g,
        to: serviceName,
    };
    const company = {
        files,
        from: /{{company}}/g,
        to: companyName,
    };
    const jwt = {
        files: ['src/helpers/config.js'],
        from: /{{jwtSecret}}/g,
        to: crypto.randomBytes(20).toString('hex'),
    };
    const cookie = {
        files: ['src/helpers/config.js'],
        from: /{{cookieSecret}}/g,
        to: crypto.randomBytes(20).toString('hex'),
    };
    try {
        let result = [];
        result = result.concat(replace.sync(name));
        result = result.concat(replace.sync(company));
        result = result.concat(replace.sync(jwt));
        result = result.concat(replace.sync(cookie));

        console.log('Replacement results:', result);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}
/* eslint-enable no-console */
