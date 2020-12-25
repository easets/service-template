const fp = require('fastify-plugin');
const { NotAuthorized } = require('../errors/errors');

module.exports = fp((fastify, opts, done) => {
    fastify.decorate('authenticate', async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(new NotAuthorized());
        }
    });
    done();
});
