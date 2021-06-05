const { default: axios } = require('axios');
const { FACEBOOK_PAGE_TOKEN, FACEBOOK_GRAPH_URL } = require('../config');

async function createLiveStream({ title, description }) {
    let url = `${FACEBOOK_GRAPH_URL}/me/live_videos?access_token${FACEBOOK_PAGE_TOKEN}`;
    let data = { title, description, status: 'LIVE_NOW', };
    let { id, stream_url } = await axios.post(url, data);
    console.log('[FB]', 'created live video', id);
    return { id, video_id, stream_url };
}

module.exports = createLiveStream;