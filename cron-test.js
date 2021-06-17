const cron = require('node-cron');
const { exec } = require('shelljs');
const [/* node */,/* __filename */, channel, cron_schedule, youtube_id] = process.argv;

cron.schedule(cron_schedule, async () => {
    const command = `node ${__dirname}/live-stream.js '${channel}' '${youtube_id}'`;
    exec(command);
}, { timezone: 'Asia/Rangoon' });