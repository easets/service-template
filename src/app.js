const Fastify = require('fastify');
const sensible = require('fastify-sensible');
const middleware = require('fastify-express');
const etag = require('fastify-etag');
const cookie = require('fastify-cookie');
const axios = require('axios');
const cors = require('fastify-cors');
const stats = require('fastify-routes-stats');
const bcryptLib = require('fastify-bcrypt');
const jwtLib = require('fastify-jwt');
const connect = require('./db/db');
const routes = require('./routes/api');
const config = require('./helpers/config');
const authenticate = require('./plugins/authenticate');
const cacheHelper = require('./plugins/cacheHelper');
const favicon = require('fastify-favicon');

const healthCheck = require('fastify-healthcheck');

const build = async function builder() {
    const fastify = Fastify({
        logger: { prettyPrint: true },
        disableRequestLogging: config.disableRequestLogging === 'true',
    });

    // Connect to database ...
    await connect(fastify);

    // add middleware
    await fastify.register(jwtLib, {
        secret: config.cookieSecret,
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

    await fastify.register(stats, { log: false });
    await fastify.register(authenticate);
    await fastify.register(cacheHelper);
    fastify.register(favicon, { path: './' });

    fastify.register(cors, {
        origin: '*',
        method: ['GET', 'PUT', 'POST', 'DELETE'],
    });
    // add routes
    await fastify.register(routes);

    return fastify;
};

module.exports = build;
