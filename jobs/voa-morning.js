const { schedule } = require("node-cron");
const { searchUntilLiveOnYoutube } = require("../src/_helpers");

const CRON_SCHEDULE = '4 0 6 * * *';
const QUERY_STRING = 'ဗီြအိုေအ ျမန္မာနံနက္ခင္း';

searchUntilLiveOnYoutube(QUERY_STRING)
    .then((live) => {
        console.log('is live')
    })