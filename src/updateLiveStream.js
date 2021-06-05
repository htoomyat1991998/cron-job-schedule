const { default: axios } = require('axios');
const { FACEBOOK_PAGE_TOKEN, FACEBOOK_GRAPH_URL } = require('../config');

async function updateLiveStream(id) {
    let url = `${FACEBOOK_GRAPH_URL}/${id}`;
    let headers = { Authentication: 'Bearer ' + FACEBOOK_PAGE_TOKEN };
    let data = {
        status: 'LIVE_NOW',
        fields: 'video',
        embeddable: false,
    };
    let { data: { video } } = await axios.post(url, data, { headers });
    console.log('[FB]', 'updated live video', video.id);
    return { video_id: video.id }
}

module.exports = updateLiveStream;