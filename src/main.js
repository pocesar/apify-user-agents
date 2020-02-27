const Apify = require('apify');
const { initialize } = require('./functions');

const { log } = Apify.utils;

Apify.main(async () => {
    const {
        storageName = 'user-agents',
    } = await Apify.getInput();

    const userAgents = await initialize();

    log.info(`Executing at ${new Date().toISOString()}`);

    const total = Object.entries(userAgents).reduce((o, [_, s]) => o + s.length, 0);

    if (total < 1000) {
        throw new Error(`Current total count ${total} looks like it's missing data`);
    }

    const kv = await Apify.openKeyValueStore(storageName);

    await kv.setValue('LIST', {
        updated: new Date().toISOString(),
        totalCount: total,
        ...userAgents,
    });

    log.info(`Done, ${total} user-agents`);
});
