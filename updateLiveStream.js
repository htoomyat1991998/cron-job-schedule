const { default: axios } = require('axios');
const { FACEBOOK_PAGE_TOKEN, FACEBOOK_GRAPH_URL } = require('../config');

async function updateLiveStream(id) {
    let url = `${FACEBOOK_GRAPH_URL}/${id}`;
    let data = {
        access_token: FACEBOOK_PAGE_TOKEN,
        status: 'LIVE_NOW',
        fields: 'video',
        embeddable: false,
    };
    let { data: { video } } = await axios.post(url, data);
    console.log('[FB] updated live video, watch live stream at: https://www.facebook.com/watch/live/?v=%s', video.id);
    return { video_id: video.id }
}

module.exports = updateLiveStream;