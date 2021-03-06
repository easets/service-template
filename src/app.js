const Fastify = require('fastify');
const sensible = require('fastify-sensible');
const middleware = require('fastify-express');
const etag = require('fastify-etag');
const cookie = require('fastify-cookie');
const axios = require('axios');
const cors = require('fastify-cors');
const bcryptLib = require('fastify-bcrypt');
const { readFileSync } = require('fs');
const jwtLib = require('fastify-jwt');
const favicon = require('fastify-favicon');
const healthCheck = require('fastify-healthcheck');
const connect = require('./db/db');
const routes = require('./routes/api');
const config = require('./helpers/config');
const authenticate = require('./plugins/authenticate');
const cacheHelper = require('./plugins/cacheHelper');

const build = async function builder() {
    const fastify = Fastify({
        logger: { prettyPrint: true },
        disableRequestLogging: config.disableRequestLogging === 'true',
    });

    // Connect to database ...
    await connect(fastify);

    // add middleware
    await fastify.register(jwtLib, {
        secret: {
            private: readFileSync('.cert/jwtRS256.key.pub', 'utf8'),
            public: readFileSync('.cert/jwtRS256.key.pub', 'utf8'),
        },
        sign: { algorithm: 'RS256' },
    });

    fastify.register(cookie, {
        secret: config.jwtSecret, // for cookies signature
        parseOptions: {}, // options for parsing cookies
    });

    await fastify.register(middleware);
    await fastify.register(sensible);
    await fastify.register(etag);
    await fastify.register(bcryptLib, {
        saltWorkFactor: 12,
    });
    fastify.register(healthCheck);

    fastify.decorate('axios', axios);

    await fastify.register(authenticate);
    await fastify.register(cacheHelper);
    fastify.register(favicon);

    fastify.register(cors, {
        origin: '*',
        method: ['GET', 'PUT', 'POST', 'DELETE'],
    });
    // add routes
    await fastify.register(routes);

    return fastify;
};

module.exports = build;
