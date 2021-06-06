let FACEBOOK_PAGE_TOKEN;

const env = process.argv[2];

switch (env) {
    case "main":
        FACEBOOK_PAGE_TOKEN = process.env.FACEBOOK_MAIN_TOKEN;
        break;
    default:
        FACEBOOK_PAGE_TOKEN = process.env.FACEBOOK_TEST_TOKEN;
}

console.log('using "%s" environment', env);

module.exports = {
    FACEBOOK_PAGE_TOKEN,
    FACEBOOK_GRAPH_URL: 'https://graph.facebook.com',
};