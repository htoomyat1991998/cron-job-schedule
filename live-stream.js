const getVideoInfo = require('./src/getVideoInfo');
const createLiveStream = require('./src/createLiveStream');
const updateLiveStream = require('./src/updateLiveStream');
const deleteLiveStream = require('./src/deleteLiveStream');

const { exec } = require('shelljs');
const input = process.argv[3];
const url = input.length === '11' ? `https://www.youtube.com/watch?v=${input}` : input;

getVideoInfo(url)
  .then(async ({ title, channelName, content, formats }) => {
    let format = formats[0];
    if (!format) throw "no video source is available.";
    let { id, stream_url } = await createLiveStream({
      title: `${title} - ${channelName}`,
      description: content,
    });
    let { video_id } = await updateLiveStream(id);
    let cmd = [
      `ffmpeg -re -i '${format.url}' -c:v libx264`,
      '-preset veryfast -b:v 2500k',//-r 30 -g 60 
      '-c:a aac -ar 44100 -b:a 128k',
      `-bufsize 512k -f flv '${stream_url}'`,
    ].join(' ');
    exec(cmd)
  }).catch(e => {
    console.log(e.response?.headers, e.response?.data);
    console.log(e.message);
  });