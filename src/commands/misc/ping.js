module.exports = {
  commands: 'ping',
  callback(msg, args, text) {
    msg.reply('Pong!');
  },
};
