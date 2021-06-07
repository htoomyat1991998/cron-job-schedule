const getVideoInfo = require('./src/getVideoInfo');
const createLiveStream = require('./src/createLiveStream');
const updateLiveStream = require('./src/updateLiveStream');

const { broadcastLiveStream } = require('./src/_helpers');
const input = process.argv[3];
const url = input.length === '11' ? `https://www.youtube.com/watch?v=${input}` : input;

getVideoInfo(url)
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