const Apify = require('apify');
const { initialize } = require('./functions');

const { log } = Apify.utils;

Apify.main(async () => {
    const userAgents = await initialize();

    log.info(`Executing at ${new Date().toISOString()}`);

    const total = Object.entries(userAgents).reduce((o, [_, s]) => o + s.length, 0);

    await Apify.setValue('OUTPUT', {
        updated: new Date().toISOString(),
        totalCount: total,
        ...userAgents,
    });

    log.info(`Done, ${total} user-agents`);
});
