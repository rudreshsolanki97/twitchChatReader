var loki = require("lokijs"),
  db = new loki("test.json");

var chat = db.addCollection("chat");

var modChat = chat.addDynamicView("modChat");
modChat.applyWhere(obj => {
  return obj.isMod;
});

var subChat = chat.addDynamicView("subChat");
subChat.applyWhere(obj => {
  return obj.isSubscribed;
});

var streamerChat = chat.addDynamicView("streamerChat");
streamerChat.applyWhere(obj => obj.from == process.env.CHANNEL_NAME);

exports.onConnectionHandler = (address, port) => {
  console.log(`* Connected to ${address}:${port}`);
};

exports.onMessageHandler = async (target, context, message, self) => {
  const words = message.replace(/,/g, "").split(" ");
  const subMonths = context.badges.subscriber || 0;

  chat.insert({
    fromId: context["user-id"],
    from: context.username,
    words: words,
    subMonths: subMonths,
    isMod: context.mod,
    isSubscribed: context.subscriber
  });
};

exports.showAllChat = (req, res) => {
  res.status(200).json(chat.data);
};

exports.getAllModChat = (req, res) => {
  res.status(200).json(modChat.data());
};

exports.getAllSubChat = (req, res) => {
  const threshold = req.body.subThreshold || 0;
  subChat.applyWhere(obj => {
    return obj.subMonths >= threshold;
  });
  res.status(200).json(subChat.data());
};

exports.getAllStreamerChat = (req, res) => {
  res.status(200).json(streamerChat.data());
};
