const createError = require('fastify-error');

const NotAuthorized = createError('NOT_AUTHORIZED', 'Not Authorized', 401);

module.exports = {
    NotAuthorized,
};
