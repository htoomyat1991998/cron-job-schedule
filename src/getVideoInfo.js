const ytdl = require('ytdl-core');
const toUnicode = require('./toUnicode');
const createContentForFacebook = require('./createContentForFacebook');

async function getVideoInfo(youtube_url) {
    let { videoDetails, formats } = await ytdl.getBasicInfo(youtube_url);
    let isLive = videoDetails.isLiveContent;
    let data = {
        title: toUnicode(videoDetails.title),
        description: toUnicode(videoDetails.description),
        thumbnail: videoDetails.thumbnails.pop().url,
        channelName: videoDetails.ownerChannelName,
        url: videoDetails.video_url,
        formats: [],
        content: createContentForFacebook(videoDetails),
    };
    if (isLive && videoDetails.liveBroadcastDetails.isLiveNow) {
        data.formats = formats.filter(({ container }) => container === 'ts');
    } else {
        data.formats = formats.filter(({ container }) => container === 'mp4');
    }
    return data;
}

module.exports = getVideoInfo;
