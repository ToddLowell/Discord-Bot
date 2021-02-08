require('dotenv').config();
const loadCommands = require('../loadCommands.js');

const Discord = require('discord.js');

const prefix =
  process.env.NODE_ENV === 'development' ? process.env.COMMAND_PREFIX_DEVELOPMENT : process.env.COMMAND_PREFIX;

module.exports = {
  commands: ['help', 'h', 'command', 'commands'],
  expectedArgs: '<command>',
  description: "Describe all of Aigis's commands. Or see the details of a specific command.",
  maxArgs: 1,
  callback(msg, args, text) {
    let msgReply = '';

    const commands = loadCommands();

    // if command passed in
    if (args.length) {
      for (const command of commands) {
        if (!command.commands.includes(args[0].toLowerCase())) continue;

        const embed = new Discord.MessageEmbed()
          .setAuthor(
            'Aigis',
            'https://raaedkabir-assets.s3.amazonaws.com/Aigis+Avatar.jpg',
            'https://aigis-discord-bot.herokuapp.com/'
          )
          .setColor('#66fcf1')
          .setTitle(`${prefix}${args[0]} ${command.expectedArgs ? command.expectedArgs : ''}`)
          .setDescription(command.description ? command.description : 'No description available.');

        if (typeof command.commands === 'object') {
          embed.addFields({
            name: '\u200B',
            value: ['**Aliases**', ...command.commands],
          });
        }

        return msg.channel.send(embed);
      }

      return msg.channel.send(`${prefix}${args[0]} is not a valid command.`);
    } else {
      for (const command of commands) {
        // check permissions
        let permissions = command.permissions;

        // can be [] or '' if no permissions
        if (permissions && permissions.length) {
          let hasPermission = true;

          if (typeof permissions === 'string') {
            permissions = [permissions];
          }

          for (const permission of permissions) {
            if (!msg.member.hasPermission(permission)) {
              hasPermission = false;
              break;
            }
          }

          // skip loop if user doesn't have permission to command
          if (!hasPermission) continue;
        }

        // format string reply
        const mainCommand = typeof command.commands === 'string' ? command.commands : command.commands[0];
        // don't include help command
        if (mainCommand === 'help') continue;

        msgReply += `${prefix}${mainCommand}\n`;
      }

      const embed = new Discord.MessageEmbed()
        .setAuthor(
          'Aigis',
          'https://raaedkabir-assets.s3.amazonaws.com/Aigis+Avatar.jpg',
          'https://aigis-discord-bot.herokuapp.com/'
        )
        .setColor('#66fcf1')
        .setTitle('List of Supported Commands')
        // .setURL('https://aigis-discord-bot.herokuapp.com/')
        .setDescription(`Type \`${prefix}help <command>\` to see more details on that specific command.`)
        .addFields({
          name: '\u200B',
          value: msgReply,
        });
      // .setFooter('Made with a lot of coffee.')
      // .setTimestamp();

      return msg.channel.send(embed);
    }
  },
  permissions: [],
  requiredRoles: [],
};
