const redis = require("redis");
const tmiService = require("./services/tmi-handler");
const tmi = require("tmi.js");

require("bluebird").promisifyAll(redis);
require("dotenv").config();

const options = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.BOT_OAUTH_TOKEN
  },
  channels: [process.env.CHANNEL_NAME]
};

const tmiClient = new tmi.client(options);

tmiClient.on("connected", tmiService.onConnectionHandler);
tmiClient.on("message", tmiService.onMessageHandler);

tmiClient.connect();

