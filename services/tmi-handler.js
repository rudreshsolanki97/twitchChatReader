require("dotenv").config();
const redis = require("redis");
require("bluebird").promisifyAll(redis);
const redisClient = redis.createClient(process.env.REDIS_URL);


exports.onConnectionHandler = (address, port) => {
  console.log(`* Connected to ${address}:${port}`);
}

exports.onMessageHandler = async (target, context, message, self) =>  {
  const words = message.replace(/,/g, '').split(' ');
  console.log(words);
  
  for (let i = 0; i < words.length; i++) {
    await redisClient.zincrbyAsync(target, 1, words[i]);
  }
}


exports.getHighestFreqWord = async (req, res) => {
  const args = [process.env.CHANNEL_NAME, "0", "50", "WITHSCORES"];
  const scores = [];

  const range =  redisClient.zrangebyscore(args);
  console.log(range);
  ;
  
  for (let i = 0; i < range.length; i += 2) {
    scores.push({
      key: range[i],
      value: parseInt(range[i + 1])
    });
  }
  console.log(scores);

  // res.json({ word: "ok" });
};
