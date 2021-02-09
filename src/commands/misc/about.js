const path = require('path');
const Discord = require('discord.js');

module.exports = {
  commands: ['about'],
  description: `Learn about Aigis and her Creator.`,
  callback(msg, args, text) {
    const embed = new Discord.MessageEmbed()
      .attachFiles([
        path.join(__dirname, '../../assets/avatar.jpg'),
        path.join(__dirname, '../../assets/creatorAvatar.jpg'),
      ])
      .setAuthor(
        'Aigis',
        'attachment://avatar.jpg',
        'https://aigis-discord-bot.herokuapp.com/'
      )
      .setColor('#66fcf1')
      .setDescription('\u200B')
      .setThumbnail('attachment://creatorAvatar.jpg')
      .addFields({
        name: '\nAbout',
        value: `
        Aigis is originally an android from Persona 3.
        Go to [Aigis' website](https://aigis-discord-bot.herokuapp.com/) to see a full list of what I can do.
        \u200B
        Discord bot created by [Raaed Kabir](https://www.raaedkabir.com/).    
        \u200B
        `,
      })
      .setFooter('Made with a lot of coffee.', 'attachment://creatorAvatar.jpg')
      .setTimestamp();

    msg.channel.send(embed);
  },
};
