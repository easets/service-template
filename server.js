const build = require('./src/app');
const config = require('./src/helpers/config');

build()
    .then((app) => {
    // run the server!
        app.listen(config.portApp, '0.0.0.0', (err, address) => {
            if (err) {
                app.log.error(err);
                process.exit(1);
            }
            app.log.info(`server listening on ${address}`);
        });
    });
