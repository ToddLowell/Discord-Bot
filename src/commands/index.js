require('dotenv').config();

const prefix =
  process.env.NODE_ENV === 'development'
    ? process.env.COMMAND_PREFIX_DEVELOPMENT
    : process.env.COMMAND_PREFIX_PRODUCTION;

module.exports = (client, commandOptions) => {
  let {
    commands,
    expectedArgs = '',
    minArgs = 0,
    maxArgs = null,
    permissions = [],
    permissionError = "You don't have permission to run this command.",
    requiredRoles = [],
    callback,
  } = commandOptions;

  // commands should be an array of strings
  if (typeof commands === 'string') {
    commands = [commands];
  }

  console.log(`Registered Command: ${commands[0]}`);

  // change permissions to array if present
  if (permissions.length) {
    if (typeof permissions === 'string') {
      permissions = [permissions];
    }

    validatePermissions(permissions);
  }

  // listen to messages
  client.on('message', (msg) => {
    const { member, content, guild } = msg;

    for (const alias of commands) {
      if (content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {
        // check user permissions
        for (const permission of permissions) {
          if (!member.hasPermission(permission)) {
            msg.reply(permissionError);
            return;
          }
        }

        // check user roles
        for (const requiredRole of requiredRoles) {
          const role = guild.roles.cache.find((role) => role.name === requiredRole);

          // if role does not exist or member does not have the role
          if (!role || !member.roles.cache.has(role.id)) {
            msg.reply(`You don't have the '${requiredRole}' role required for this command.`);
            return;
          }
        }

        // split args on space
        const args = content.split(/[ ]+/);
        args.shift();

        // check number of args
        if (args.length < minArgs || (maxArgs !== null && args.length > maxArgs)) {
          msg.reply(`Wrong Syntax! Use ${prefix}${alias} ${expectedArgs}`);
          return;
        }

        // handle command
        callback(msg, args, args.join(' '));

        return;
      }
    }
  });
};

// validate permissions
function validatePermissions(permissions) {
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
