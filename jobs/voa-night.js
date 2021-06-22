const { schedule } = require("node-cron");
const { searchUntilLiveOnYoutube, fetchUntilLiveFromYoutube, broadcastLiveStream } = require("../src/_helpers");
const createLiveStream = require("../src/createLiveStream");
const updateLiveStream = require("../src/updateLiveStream");
const deleteLiveStream = require("../src/deleteLiveStream");
                    /* s  m  h d  M D */
const CRON_SCHEDULE = '54 59 18 *  * *'; // at every 6:59:54 PM
const QUERY_STRING = 'VOA နေ့စဉ် တီဗွီသတင်းလွှာ';

schedule(CRON_SCHEDULE, start, { timezone: 'Asia/Rangoon' });

function start() {
    console.log('> querying "', QUERY_STRING, '" at', new Date().toLocaleString('en-US', { timeZone: 'Asia/Yangon' }));
    
    searchUntilLiveOnYoutube(QUERY_STRING)
        .then(videoId => fetchUntilLiveFromYoutube(videoId))
        .then(async ({ title, channelName, content, formats }) => {
            console.log(' >>', new Date().toLocaleString('en-US', { timeZone: 'Asia/Yangon' }));
            let format = formats.find(({ qualityLabel }) => qualityLabel === '720p' || qualityLabel === '480p');
            let { id, stream_url } = await createLiveStream({
                title: `${title} - ${channelName}`,
                description: content,
            });
            let { video_id } = await updateLiveStream(id);
            console.log(' >>', new Date().toLocaleString('en-US', { timeZone: 'Asia/Yangon' }));
            return broadcastLiveStream(format.url, stream_url);
        });
}
