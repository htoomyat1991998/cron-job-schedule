const rss = {
    feed: [
      {
        source: "RFA",
        target: "https://www.rfa.org/burmese/rss2.xml",
        video: true
      },
      {
        source: "RFA",
        target: "https://www.rfa.org/burmese/news/rss2.xml",
        video: false
      },
      {
        source: "RFA",
        target: "https://www.rfa.org/burmese/multimedia/rss2.xml",
        video: true
      },
      {
        source: "VOA",
        target: "https://burmese.voanews.com/api/z$_u_etrky",
        video: false
      },
      {
        source: "VOA",
        target: "https://burmese.voanews.com/api/zykqqyeqmoqy",
        video: true
      }
    ]
};

const xml = {
    options: {
        attributeNamePrefix: "",
        attrNodeName: "attr",
        textNodeName: "text",
        trimValues: true,
        parseAttributeValue: true,
        ignoreAttributes: false,
    },
};

const config = {
  rss,
  xml,
};

module.exports = config;