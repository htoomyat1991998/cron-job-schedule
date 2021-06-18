const { schedule } = require("node-cron");
const { searchUntilLiveOnYoutube, fetchUntilLiveFromYoutube, broadcastLiveStream } = require("../src/_helpers");
const createLiveStream = require("../src/createLiveStream");
const updateLiveStream = require("../src/updateLiveStream");
const deleteLiveStream = require("../src/deleteLiveStream");

const CRON_SCHEDULE = '0 0 19 * * *'; // 19:00:00.000
const QUERY_STRING = 'RFA နေ့စဉ်တိုက်ရိုက်ထုတ်လွှင့်ချက်';

// schedule(CRON_SCHEDULE, () => start(), { timezone: 'Asia/Rangoon' });

start()

function start() {
    let liveId;

    searchUntilLiveOnYoutube(QUERY_STRING)
        .then((videoId) => {
            return fetchUntilLiveFromYoutube(videoId);
        })
        .then(async ({ title, channelName, content, formats }) => {
            let format = formats.find(({ qualityLabel }) => qualityLabel === '720p' || qualityLabel === '480p');

            let { id, stream_url } = await createLiveStream({
                title: `${title} - ${channelName}`,
                description: content,
            });

            liveId = id;

            let { video_id } = await updateLiveStream(liveId);

            broadcastLiveStream(format.url, 'stream_url.mp4');
        })
        .catch(err => {
            console.error(err);
            deleteLiveStream(liveId);
            process.exit(1);
        });
}

