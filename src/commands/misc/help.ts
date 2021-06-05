import path from 'path';
import * as dotenv from 'dotenv';
import Discord, { PermissionResolvable } from 'discord.js';
import loadCommands from '../loadCommands.js';
import type { CommandOptions } from '../index';

dotenv.config();

const prefix =
  process.env.NODE_ENV === 'development'
    ? process.env.COMMAND_PREFIX_DEVELOPMENT
    : process.env.COMMAND_PREFIX;

export default {
  commands: ['help', 'h', 'command', 'commands'],
  expectedArgs: '<command>',
  description:
    "Describe all of Aigis's commands. Or see the details of a specific command.",
  maxArgs: 1,
  callback(msg, args) {
    let msgReply = '';

    const commands = loadCommands();

    // if command passed in
    if (args.length) {
      for (const command of commands) {
        if (!command.commands.includes(args[0].toLowerCase())) continue;

        const embed = new Discord.MessageEmbed()
          .attachFiles([path.join(__dirname, '../../assets/avatar.jpg')])
          .setAuthor(
            'Aigis',
            'attachment://avatar.jpg',
            'https://aigis-discord-bot.herokuapp.com/'
          )
          .setColor('#66fcf1')
          .setTitle(
            `${prefix}${args[0]} ${
              command.expectedArgs ? command.expectedArgs : ''
            }`
          )
          .setDescription(
            command.description
              ? command.description
              : 'No description available.'
          );

        if (
          typeof command.commands === 'object' &&
          command.commands.length !== 1
        ) {
          embed.addFields({
            name: 'Aliases',
            value: [...command.commands],
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
            if (
              !msg.member!.hasPermission(permission as PermissionResolvable)
            ) {
              hasPermission = false;
              break;
            }
          }

          // skip loop if user doesn't have permission to command
          if (!hasPermission) continue;
        }

        // format string reply
        const mainCommand =
          typeof command.commands === 'string'
            ? command.commands
            : command.commands[0];
        // don't include help command
        if (mainCommand === 'help') continue;

        msgReply += `${prefix}${mainCommand}\n`;
      }

      const embed = new Discord.MessageEmbed()
        .attachFiles([path.join(__dirname, '../../assets/avatar.jpg')])
        .setAuthor(
          'Aigis',
          'attachment://avatar.jpg',
          'https://aigis-discord-bot.herokuapp.com/'
        )
        .setColor('#66fcf1')
        .setTitle('List of Supported Commands')
        .setDescription(
          `Type \`${prefix}help <command>\` to see more details on that specific command.`
        )
        .addFields({
          name: '\u200B',
          value: msgReply,
        });

      return msg.channel.send(embed);
    }
  },
} as CommandOptions;
