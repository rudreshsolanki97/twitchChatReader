const redisClient = require("./tmi-handler").redisClient;
require("dotenv").config();

exports.getHighestFreqWord = async (req, res) => {
  const args = [process.env.CHANNEL_NAME, "0", "50", "WITHSCORES"];
  const scores = [];

  const range = await redisClient.zrevrangeAsync(args);
  console.log(range);

  for (let i = 0; i < range.length; i += 2) {
    scores.push({
      key: range[i],
      value: parseInt(range[i + 1])
    });
  }
  console.log(scores);

  // res.json({ word: "ok" });
};
