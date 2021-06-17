const getVideoInfo = require('./getVideoInfo');
const createLiveStream = require('./createLiveStream');
const updateLiveStream = require('./updateLiveStream');

const { broadcastLiveStream } = require('./_helpers');

module.exports = function broadcastLiveStream(youtube_id) {
    return getVideoInfo(youtube_id)
        .then(async ({ title, channelName, content, formats }) => {
            if (!formats.length) throw "no video source is available.";
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
        }).catch(e => {
            console.log(e.response?.headers, e.response?.data);
            console.log(e.message);
        });
};