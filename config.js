let FACEBOOK_PAGE_TOKEN;

switch (process.argv[2]) {
  case "main":
    FACEBOOK_PAGE_TOKEN = process.env.FACEBOOK_MAIN_TOKEN;
    break;
  default:
    FACEBOOK_PAGE_TOKEN = process.env.FACEBOOK_TEST_TOKEN;
}

module.exports = {
  FACEBOOK_PAGE_TOKEN,
  FACEBOOK_GRAPH_URL: 'https://graph.facebook.com',
};