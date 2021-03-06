import * as dotenv from 'dotenv';
import type { Client, Message, PermissionResolvable } from 'discord.js';

dotenv.config();

export interface CommandOptions {
  commands: string | string[];
  expectedArgs?: string;
  description?: string;
  minArgs?: number;
  maxArgs?: number | null;
  callback: (msg: Message, args: string[], text: string) => void;
  permissions?: string | string[];
  permissionError?: "You don't have permission to run this command.";
  requiredRoles?: string[];
}

const prefix =
  process.env.NODE_ENV === 'development'
    ? process.env.COMMAND_PREFIX_DEVELOPMENT
    : process.env.COMMAND_PREFIX;

export default (client: Client, commandsArr: CommandOptions[]): void => {
  const commandOptions = commandsArr.map((commandOption) => {
    let { commands, permissions = [] } = commandOption;
    const {
      expectedArgs = '',
      minArgs = 0,
      maxArgs = null,
      permissionError = "You don't have permission to run this command.",
      requiredRoles = [],
      callback,
    } = commandOption;

    // commands should be an array of strings
    if (typeof commands === 'string') {
      commands = [commands];
    }

    console.log(`Registered Command: ${commands[0]}`); // eslint-disable-line

    // change permissions to array if present
    if (permissions.length) {
      if (typeof permissions === 'string') {
        permissions = [permissions];
      }

      validatePermissions(permissions);
    }

    return {
      commands,
      permissions,
      expectedArgs,
      minArgs,
      maxArgs,
      permissionError,
      requiredRoles,
      callback,
    };
  });

  // listen to messages
  client.on('message', (msg) => {
    let command = null;
    const { member, author, content, guild } = msg;

    if (
      // author of message is a bot
      author.bot ||
      // message is in a DM
      !guild ||
      // message doesn't start with prefix
      !content.startsWith(`${prefix}`)
    )
      return;
    else command = content.slice(1);

    for (const commandOption of commandOptions) {
      const {
        commands,
        permissions,
        expectedArgs,
        minArgs,
        maxArgs,
        permissionError,
        requiredRoles,
        callback,
      } = commandOption;

      for (const alias of commands) {
        if (command.toLowerCase().split(' ')[0] === `${alias.toLowerCase()}`) {
          // check user permissions
          for (const permission of permissions) {
            if (!member!.hasPermission(permission as PermissionResolvable)) {
              msg.reply(permissionError);
              return;
            }
          }

          // check user roles
          for (const requiredRole of requiredRoles) {
            const role = guild.roles.cache.find(
              (role) => role.name === requiredRole
            );

            // if role does not exist or member does not have the role
            if (!role || !member!.roles.cache.has(role.id)) {
              msg.reply(
                `You don't have the '${requiredRole}' role required for this command.`
              );
              return;
            }
          }

          // split args on space
          const args = command.split(/[ ]+/);
          args.shift();

          // check number of args
          if (
            args.length < minArgs ||
            (maxArgs !== null && args.length > maxArgs)
          ) {
            msg.reply(`Wrong Syntax! Use ${prefix}${alias} ${expectedArgs}`);
            return;
          }

          // handle command
          callback(msg, args, args.join(' '));

          return;
        }
      }
    }
  });
};

// validate permissions
function validatePermissions(permissions: string[]) {
  const validPermissions = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ];

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown permission: ${permission}`);
    }
  }
}
