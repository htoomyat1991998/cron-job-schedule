const ytdl = require('ytdl-core');
const toUnicode = require('./toUnicode');
const createContentForFacebook = require('./createContentForFacebook');

async function getVideoInfo(youtube_url) {
    let { videoDetails, formats } = await ytdl.getBasicInfo(youtube_url);
    let data = {
        title: toUnicode(videoDetails.title),
        description: toUnicode(videoDetails.description),
        thumbnail: videoDetails.thumbnails.pop().url,
        channelName: videoDetails.ownerChannelName,
        url: videoDetails.video_url,
        formats: [],
        content: createContentForFacebook(videoDetails),
    };

    data.formats = formats.filter(({
        container,
        hasAudio,
        hasVideo
    }) => hasAudio && hasVideo && container === 'mp4' || container === 'ts');

    return data;
}

module.exports = getVideoInfo;
