const toUnicode = require("./toUnicode");

function createContentForFacebook({
    title,
    description,
    ownerChannelName,
    video_url,
}) {
    title = toUnicode(title);
    description = toUnicode(description);
    return `${title}\n\n${description}\n\nOriginally uploaded from ${ownerChannelName} at ${video_url}\n\n#NweOoBot #NweOoLive`;
}

module.exports = createContentForFacebook;