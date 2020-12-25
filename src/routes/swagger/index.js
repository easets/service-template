const config = require('../../helpers/config');

module.exports = {
    routePrefix: '/swagger-ui',
    exposeRoute: true,
    swagger: {
        info: {
            title: 'ease {{template}} service api',
            description: 'docs',
            version: '0.1.0',
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here',
        },
        servers: [
            { url: `http://localhost:${config.portApp}`, description: 'local development' },
        ],
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            { name: '{{template}}', description: '{{template}} API end-points' },
        ],
    },
};
