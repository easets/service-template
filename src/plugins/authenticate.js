const fp = require('fastify-plugin');
const { NotAuthorized } = require('../errors/errors');

module.exports = fp((fastify, opts, done) => {
    const authenticate = async (request, reply) => {
        try {
            await request.jwtVerify({
                audience: ['USER', 'ADMIN'],
                issuer: 'EASE_USER_SERVICE',
                algorithms: ['RS256'],
            });
        } catch (err) {
            reply.send(new NotAuthorized());
        }
    };
    fastify.decorate('authenticate', authenticate);
    done();
});
