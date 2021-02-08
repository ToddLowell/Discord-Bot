const path = require('path');
const Discord = require('discord.js');

module.exports = {
  commands: ['nou', 'reversecard'],
  description: `Unleash the power of "no u" and win any argument using the ultimate comeback card that nobody can resist.`,
  callback(msg, args, text) {
    const embed = new Discord.MessageEmbed()
      .setColor('#66fcf1')
      .attachFiles(path.join(__dirname, '../../assets/noU.png'))
      .setImage('attachment://noU.png');

    msg.channel.send(embed);
  },
};
