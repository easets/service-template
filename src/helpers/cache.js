const NodeCache = require('node-cache');

class CacheHelper {
    /**
     * Creates an CacheHelper
     */
    constructor(ttl) {
        this.storage = new NodeCache({ stdTTL: ttl, checkperiod: ttl + 60, useClones: false });
    }

    deleteKeys(tag) {
        const keys = [];
        this.storage.keys().filter((it) => it.includes(tag)).forEach((key) => {
            keys.push(key);
        });

        return keys;
    }

    keys(tag) {
        const inputs = Array.isArray(tag) ? tag : [tag];
        const keys = [];
        this.storage.keys().filter((it) => inputs
            .reduce((previousValue, currentValue) => previousValue
                && it.indexOf(currentValue) > -1, true))
            .forEach((key) => {
                keys.push(key);
            });

        return keys;
    }

    instance() {
        return this.storage;
    }
}

const CacheTime = {
    X_SMALL: 60,
    SMALL: 60 * 10,
    LARGE: 60 * 60,
    XXL_LARGE: 24 * 60 * 60,
};

module.exports = {
    CacheHelper,
    CacheTime,
};
