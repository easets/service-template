const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

let envPath;

const { NODE_ENV } = process.env;

switch (NODE_ENV) {
case 'development':
    envPath = path.resolve(__dirname, '../../.env.development');
    break;
case 'test':
    envPath = path.resolve(__dirname, '../../.env.test');
    break;
default:
    envPath = path.resolve(__dirname, '../../.env.other');
    break;
}

dotenv.config({ path: envPath });

const config = {
    portApp: process.env.PORT || 8080,
    cookieSecret: 'b742dd1d-2019-4273-8960-0d18b63de84f',
    jwtSecret: '37f148f1-39fe-47ac-947c-fee7878c2c60',

    disableRequestLogging: process.env.DISABLE_REQUEST_LOGGING || 'true',

    hostDb: process.env.DB_HOST || 'localhost',
    nameDb: process.env.DB_NAME || 'ease-user-service',
    portDb: process.env.DB_PORT || '27017',
    urlDb: process.env.DB_URL,

};

module.exports = config;
