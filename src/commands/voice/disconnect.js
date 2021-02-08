const _ = require('lodash');

module.exports = {
  commands: ['disconnect', 'dc', 'fuckoff', 'leave'],
  callback(msg, args, text) {
    const clientVoice = msg.guild.voice;

    if (clientVoice && clientVoice.channelID) {
      const channelName = clientVoice.guild.channels.cache.get(
        clientVoice.channel.id
      ).name;

      // reply 50% of the time with \fuckoff
      if (msg.content.toLowerCase() === '\\fuckoff' && Math.random() > 0.5) {
        // https://github.com/dysfunc/ascii-emoji
        const asciiEmoji = [
          '(っ▀¯▀)つ',
          'ಠ_ಠ',
          'ლ(｀ー´ლ)',
          'щ（ﾟДﾟщ）',
          't(-_-t)',
          '(° ͜ʖ͡°)╭∩╮',
        ];
        msg.reply(`no u ${_.sample(asciiEmoji)}`);
        clientVoice.channel.leave();
      } else {
        msg.channel.send(`Left '${channelName}' channel.`);
        clientVoice.channel.leave();
      }
    } else {
      msg.channel.send('Not currently in a channel.');
    }
  },
};
