module.exports = {
  commands: ['rip', 'kmn', 'whatislife'],
  callback(msg, args, text) {
    msg.react('😢');
    msg.react('😭');
    msg.react('😟');
  },
};
