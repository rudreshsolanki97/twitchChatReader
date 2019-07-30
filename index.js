const tmiService = require("./services/tmi-handler");
const tmi = require("tmi.js");
const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

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

app.get("/api/getAllChat", tmiService.showAllChat);
app.get("/api/getAllModChat", tmiService.getAllModChat);
app.post("/api/getAllSubChat", tmiService.getAllSubChat);
app.get("/api/getAllStreamerChat", tmiService.getAllStreamerChat);

tmiClient.connect();

app.listen(process.env.PORT);
