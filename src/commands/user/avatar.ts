import Discord from 'discord.js';
import type { CommandOptions } from '../index';

export default {
  commands: 'avatar',
  expectedArgs: '@someone',
  description: "Get a User's Avatar",
  minArgs: 0,
  maxArgs: 1,
  callback(msg) {
    if (msg.mentions.everyone)
      return msg.channel.send(`You can't use @everyone or @here.`);

    if (msg.mentions.roles.size)
      return msg.channel.send(`Tag a person, not a role.`);

    const member = msg.mentions.users.first() || msg.author;
    const avatar = member.displayAvatarURL({
      format: 'png',
      dynamic: true,
      size: 4096,
    });

    const embed = new Discord.MessageEmbed()
      .setTitle(`${member.username}'s avatar`)
      .setImage(avatar)
      .setColor('#66fcf1')
      .setTimestamp();

    msg.channel.send(embed);
  },
} as CommandOptions;
