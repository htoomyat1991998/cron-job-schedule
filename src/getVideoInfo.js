const ytdl = require('ytdl-core');
const toUnicode = require('./toUnicode');
const createContentForFacebook = require('./createContentForFacebook');

async function getVideoInfo(youtube_url) {
    let { videoDetails, formats } = await ytdl.getInfo(youtube_url);
    let data = {
        title: toUnicode(videoDetails.title),
        description: toUnicode(videoDetails.description),
        thumbnail: videoDetails.thumbnails.pop().url,
        channelName: videoDetails.ownerChannelName,
        url: videoDetails.video_url,
        content: createContentForFacebook(videoDetails),
        formats: [],
    };
    formats = formats.sort((a, b) => b.bitrate - a.bitrate);
    data.formats = formats.filter(({
        container,
        hasAudio,
        hasVideo
    }) => hasAudio && hasVideo && ['ts', 'mp4'].includes(container));
    console.log(data.formats);
    return data;
}

module.exports = getVideoInfo;
