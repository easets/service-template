const oas = require('fastify-swagger');
const swagger = require('../swagger');

const apiRoutes = async (fastify, opts, done) => {
    fastify.register(oas, swagger);
    done();
};

module.exports = apiRoutes;
