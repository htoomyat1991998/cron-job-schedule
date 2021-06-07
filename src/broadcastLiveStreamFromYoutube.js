const { exec, cat } = require('shelljs');
const { exec: execBG } = require('child_process');
const getVideoInfo = require("./getVideoInfo");
const createLiveStream = require("./createLiveStream");
const updateLiveStream = require("./updateLiveStream");
const searchUntilLiveOnYoutube = require("./searchUntilLiveOnYoutube");

module.exports = async function broadcastLiveStreamFromYoutube(q) {
    let live = await searchUntilLiveOnYoutube(q)
    let { title, content, channelName, formats } = await getVideoInfo(live[0].url)
    let source_url = formats[0].url
    let path = './tmp/video.flv'
    try {
        let { id, stream_url } = await createLiveStream({
            title: `${title} - ${channelName}`,
            description: content,
        })
        let { video_id } = updateLiveStream(id)
        console.log('watch live on https://www.facebook.com/%s', video_id)
        optimizeLiveStream(source_url, path, stream_url)
    } catch (e) {
        throw e
    }
}

function saveLiveStreamToLocal(input, output) {
    return execBG(`ffmpeg -i '${input}' -c:v libx264 -b:v 5M -bufsize 5M -maxrate 5M -threads 32 -g 120 -r 60 -c:a aac -ar 44100 '${output}' -y`)
}

function broadcastLiveStreamFromLocal(input, output) {
    return exec(`ffmpeg -re -i '${input}' -c:v libx264 -preset veryfast -tune zerolatency -c:a aac -f flv '${output}'`)
}

function optimizeLiveStream(source_url, path, stream_url, timeout = 10000) {
    saveLiveStreamToLocal(source_url, path)
    setTimeout(() => {
        broadcastLiveStreamFromLocal(path, stream_url)
    }, timeout)
}
