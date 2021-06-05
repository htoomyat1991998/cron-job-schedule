const getVideoInfo = require('./src/getVideoInfo');
const createLiveStream = require('./src/createLiveStream');
const updateLiveStream = require('./src/updateLiveStream');

const { exec } = require('shelljs');
const { default: axios } = require('axios');
const { FACEBOOK_GRAPH_URL, FACEBOOK_PAGE_TOKEN } = require('./config');

getVideoInfo('https://www.youtube.com/watch?v=WiwfiVdfRIc')
  .then(async ({ title, channelName, content, formats }) => {
    let format = formats[0];
    if (!format) throw "no video source is available.";
    console.log(await (await axios(FACEBOOK_GRAPH_URL + '/me?access_token=' + FACEBOOK_PAGE_TOKEN)).data)
    let { id, stream_url } = await createLiveStream({
      title: `${title} - ${channelName}`,
      description: content,
    });
    let { video_id } = await updateLiveStream(id);
    exec(`ffmpeg -re -i '${format.url}' -c:v libx264 -preset veryfast -tune zerolatency -c:a aac -ar 44100 -f flv '${stream_url}'`);
  }).catch(e => {
    console.log(e.response?.headers, e.response?.data);
    console.log(e.message);
  });