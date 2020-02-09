const { createGunzip } = require('zlib');
const { createReadStream } = require('fs');

const UserAgentsPath = require.resolve('user-agents/src/user-agents.json.gz');
const operaMini = require('./opera_mini.json');

exports.initialize = async () => {
    /** @type {Array<{ userAgent: string }>} */
    const userAgents = await new Promise(async (resolve) => {
        const buffers = [];

        for await (const chunk of createReadStream(UserAgentsPath).pipe(createGunzip())) {
            buffers.push(chunk);
        }

        resolve(JSON.parse(Buffer.concat(buffers).toString('utf8')));
    });

    const mapUserAgent = e => e.userAgent;

    const mobile = userAgents.filter(({ userAgent }) => {
        return (
            /^Mozilla/.test(userAgent)
            && /(Android [67891]|iPhone OS 1)/.test(userAgent)
        );
    }).map(mapUserAgent);

    const desktop = userAgents.filter(({ userAgent }) => {
        return (
            /^Mozilla/.test(userAgent)
            && /(X11|Win64|Intel Mac OS X)/.test(userAgent)
        );
    }).map(mapUserAgent);

    return {
        operaMini,
        desktop,
        mobile,
    };
};
