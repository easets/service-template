const { NotAuthorized } = require('../errors/errors');

const fp = require('fastify-plugin');

module.exports = fp((fastify, opts, done) => {
    fastify.decorate('authenticate', async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(new NotAuthorized());
        }
    });
    done()
});
