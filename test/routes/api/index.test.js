
const build = require('../../../src/app');

let fastify;

beforeAll(async () => {
    fastify = await build();
    await fastify.listen();

});
afterAll(async () => {
    if (fastify) {
        await fastify.close();
    }
});

beforeEach(async () => {

});
afterEach(async () => {

});


test('service is up', async () => {
    const healthCheck = await fastify.inject({
        method: 'GET',
        url: '/health'
    });

    expect(healthCheck.statusCode)
        .toBe(200);
});
