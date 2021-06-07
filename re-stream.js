const { exec } = require('shelljs');
const createLiveStream = require("./src/createLiveStream");
const updateLiveStream = require("./src/updateLiveStream");
const { getBasicInfo } = require('ytdl-core');

const [/* node */, /* __filename */, /* env */, source_url, youtube_id, payload] = process.argv;

!async function () {
    let title, description;
    if (youtube_id && youtube_id.length > 5) {
        console.log('a');
        const { videoDetails } = await getBasicInfo(youtube_id)
        title = videoDetails.title
        description = `${videoDetails.title}\n\n${videoDetails.description}\n\nOriginally uploaded from ${videoDetails.ownerChannelName} at ${videoDetails.video_url}\n\n#NweOoBot #NweOoLive`
    } else {
        console.log('b');
        const data = JSON.parse(payload);
        title = data.title;
        description = `${data.title}\n\n${data.description}\n\n#NweOoBot #NweOoLive`
    }
    const { id, stream_url } = createLiveStream({ title, description })
    const { video_id } = updateLiveStream(id)
    const cmd = [
        `ffmpeg -re -i '${source_url}' -c:v libx264`,
        '-preset veryfast -b:v 2500k',//-r 30 -g 60 
        '-c:a aac -ar 44100 -b:a 128k',
        `-bufsize 512k -f flv '${stream_url}'`,
    ]
    exec(cmd.join(' '))
}()