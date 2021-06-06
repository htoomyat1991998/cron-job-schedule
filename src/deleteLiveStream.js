const { default: axios } = require('axios');
const { FACEBOOK_PAGE_TOKEN, FACEBOOK_GRAPH_URL } = require('../config');

async function deleteLiveStream(id) {
    let url = `${FACEBOOK_GRAPH_URL}/${id}?access_token=${FACEBOOK_PAGE_TOKEN}`;
    const { data: { success } } = await axios.delete(url);
    console.log('[FB] Deleted Facebook Live Stream', id);
    return { success };
}

module.exports = deleteLiveStream;