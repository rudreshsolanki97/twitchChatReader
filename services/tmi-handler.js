exports.onConnectionHandler = (address, port) => {
  console.log(`* Connected to ${address}:${port}`);
}

exports.onMessageHandler = async (target, context, message, self) =>  {
  const words = message.replace(/,/g, '').split(' ');
  console.log(words);
}

