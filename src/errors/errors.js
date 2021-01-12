const createError = require('fastify-error');

const NotAuthorized = createError('NOT_AUTHORIZED_ERROR', 'Not Authorized', 401);
const ConfigurationError = createError('ConfigurationError', '%s', 500);

module.exports = {
    NotAuthorized,
    ConfigurationError,
};
