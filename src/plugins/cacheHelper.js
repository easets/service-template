const fp = require('fastify-plugin');
const { CacheHelper, CacheTime } = require('../helpers/cache');

module.exports = fp((fastify, opts, done) => {
    const cacheHelper = new CacheHelper(CacheTime.LARGE);

    fastify.decorate('cacheHelper', cacheHelper);

    done();
});
