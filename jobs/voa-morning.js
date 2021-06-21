const { schedule } = require("node-cron");
const { searchUntilLiveOnYoutube, fetchUntilLiveFromYoutube, broadcastLiveStream } = require("../src/_helpers");
const createLiveStream = require("../src/createLiveStream");
const updateLiveStream = require("../src/updateLiveStream");

const CRON_SCHEDULE = '4 0 6 * * *';
const QUERY_STRING = 'ဗီြအိုေအ ျမန္မာနံနက္ခင္း';

schedule(CRON_SCHEDULE, start, { timezone: 'Asia/Rangoon' });

function start() {
    setTimeout(() => process.exit(), 3 * 60 * 60 * 1000); //max. 3hr

    searchUntilLiveOnYoutube(QUERY_STRING)
        .then(({ videoId }) => {
            return fetchUntilLiveFromYoutube(videoId);
        })
        .then(async ({ title, channelName, content, formats }) => {
            let format = formats[0];
            if (format.container === 'ts') {
                format = formats[1];
            }
            let { id, stream_url } = await createLiveStream({
                title: `${title} - ${channelName}`,
                description: content,
            });
            let { video_id } = await updateLiveStream(id);
            broadcastLiveStream(format.url, stream_url);
        });
}
