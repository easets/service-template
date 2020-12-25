const oas = require('fastify-swagger');
const swagger = require('../swagger');

const apiRoutes = async (fastify, opts, done) => {
    fastify.register(oas, swagger);
    fastify.get('/__stats', {}, () => fastify.stats({ percentile: [0.9] }));
    done();
};

module.exports = apiRoutes;
