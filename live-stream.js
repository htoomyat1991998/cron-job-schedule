const getVideoInfo = require('./src/getVideoInfo');
const createLiveStream = require('./src/createLiveStream');
const updateLiveStream = require('./src/updateLiveStream');

const { exec } = require('shelljs');

let youtube_id = process.argv.slice(2)[0];

getVideoInfo(`https://www.youtube.com/watch?v=${youtube_id}`)
  .then(async ({ title, channelName, content, formats }) => {
    let format = formats[0];
    if (!format) throw "no video source is available.";
    let { id, stream_url } = await createLiveStream({
      title: `${title} - ${channelName}`,
      description: content,
    });
    let { video_id } = await updateLiveStream(id);
    exec(`ffmpeg -re -i '${format.url}' -c:v libx264 -preset fast -tune zerolatency -c:a aac -ar 44100 -f flv '${stream_url}'`);
  }).catch(e => {
    console.log(e.response?.headers, e.response?.data);
    console.log(e.message);
  });