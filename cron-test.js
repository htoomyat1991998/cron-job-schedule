const cron = require('node-cron');
const broadcastLiveStreamFromYoutube = require('./src/broadcastLiveStreamFromYoutube')

const [, , search, cron_schedule] = process.argv;
const rerun = () => broadcastLiveStreamFromYoutube(search).catch((e) => rerun())

// RFA (7PM)
cron.schedule(cron_schedule, async () => {
    try {
        await rerun();
    } catch (e) {
        console.log(e);
        await rerun();
    }
}, {
    timezone: 'Asia/Rangoon'
})