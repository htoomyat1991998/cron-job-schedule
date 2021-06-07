const { exec } = require('shelljs');
const { exec: execBG } = require('child_process');

function saveLiveStream(input, output) {
    console.log('[1/2] saving live streaming video to local file at %s', output);
    return execBG(`ffmpeg -re -i '${input}' '${output}' -y`)
}

function broadcastLiveStream(input, output) {
    console.log('[2/2] streaming live video RTMP url: %s', output);
    return exec(`ffmpeg -re -i '${input}' -c:v libx264 -preset veryfast -tune zerolatency -c:a aac -f flv '${output}'`)
}

function optimizeLiveStream(source_url, path, stream_url, timeout = 30000) {
    saveLiveStream(source_url, path)
    setTimeout(() => {
        broadcastLiveStream(path, stream_url + 3820)
    }, timeout)
}

module.exports = {
    saveLiveStream,
    broadcastLiveStream,
    optimizeLiveStream,
}