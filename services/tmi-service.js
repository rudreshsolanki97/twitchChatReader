const redis = require("redis");
const redisClient = redis.createClient(process.env.REDIS_URL);

exports.onConnectionHandler = (address, port) => {
  console.log(`* Connected to ${address}:${port}`);
}

exports.onMessageHandler = async (target, context, message, self) =>  {
  const words = message.replace(/,/g, "").split(" ");
console.log(`Message recvd. : ${message} Target: ${target} From: ${context.username} Self: ${self}`)
// console.log(context);

  for (let i = 0; i < words.length; i++) {
    await redisClient.zincrbyAsync(target, 1, words[i]);
  }
}
