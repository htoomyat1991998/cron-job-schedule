const yts = require('yt-search');
const { exec } = require('shelljs');
const { exec: execBG } = require('child_process');
module.exports = function searchUntilLiveOnYoutube(q) {
    let refresh_count = 0
    return new Promise((resolve) => {
        let search = async () => {
            let { live } = await yts(q);
            live = live.filter(({ status }) => status === 'LIVE')
            if (live.length) {
                console.log('live stream:', live.length, live[0].videoId)
                resolve(live)
            } else {
                console.log('refresh:', refresh_count++)
                setTimeout(() => search(), 3000)
            }
        }
        search()
    })
}
