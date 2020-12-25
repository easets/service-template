const mongodb = require('fastify-mongodb');
const config = require('../helpers/config');

const urlMongo = config.urlDb || `mongodb://${config.hostDb}:${config.portDb}/${config.nameDb}?retryWrites=true`;

const connect = async (app) => {
    app.register(mongodb, {
        forceClose: true,
        url: urlMongo,
    });
};

module.exports = connect;
