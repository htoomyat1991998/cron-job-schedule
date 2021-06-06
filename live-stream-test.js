const getVideoInfo = require('./src/getVideoInfo');
const createLiveStream = require('./src/createLiveStream');
const updateLiveStream = require('./src/updateLiveStream');
const deleteLiveStream = require('./src/deleteLiveStream');

const { exec } = require('child_process');
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
      `ffmpeg -re -i '${format.url}' -deinterlace -vcodec libx264`,
      '-pix_fmt yuv420p -preset medium -r 30 -g 60 -b:v 2500k',
      '-acodec libfdk_aac -ar 44100 -threads 6 -qscale 3 -b:a 128k',
      `-bufsize 512k -f flv '${stream_url}'`,
    ].join(' ');
    exec(cmd).on('error', async (err) => {
      console.error(err);
      console.error('Failed to stream live!', id);
      await deleteLiveStream(id);
    });
  }).catch(e => {
    console.log(e.response?.headers, e.response?.data);
    console.log(e.message);
  });