const tmiService = require("./services/tmi-handler");
const tmi = require("tmi.js");
const express = require("express");

require("dotenv").config();

const app = express();

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


app.listen(process.env.PORT);
