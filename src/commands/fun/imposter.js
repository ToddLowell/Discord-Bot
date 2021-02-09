module.exports = {
  commands: ['imposter', 'impostor'],
  expectedArgs: '<@role>',
  description: `
  Find out who's the impostor among you.\n
  Tag a role to choose from their or don't to pick from anyone online in this text channel.
  `,
  callback({ channel, content, guild }, args, text) {
    // role argument provided
    if (args.length) {
      let role = null;

      if (args[0] === '@everyone' || args[0] === '@here')
        return channel.send(`You can't use @everyone or @here.`);
      if (args[0].startsWith('<@!'))
        return channel.send(`Tag a role, not a person.`);

      // get role by ID
      if (args[0].startsWith('<@&'))
        role = guild.roles.cache.find((c) => c.id === args[0].slice(3, -1));
      // get role by name
      else role = guild.roles.cache.find((c) => c.name === text);

      // validate
      if (!role) return channel.send(`${args[0]} is not a valid role.`);
      if (!role.members.size)
        return channel.send(`There are no members with the role ${args[0]}.`);

      return channel.send(
        `${role.members.random()} is the ${content.split(' ')[0].slice(1)}!`
      );
    }
    // role argument NOT provided
    else {
      const roleMembersArr = [];
      let memberList = null;

      // check which roles can access the channel
      channel.permissionOverwrites.forEach((rolePermissions) => {
        if (rolePermissions.allow.toArray().includes('VIEW_CHANNEL')) {
          const role = guild.roles.cache.find(
            (c) => c.id === rolePermissions.id
          );

          roleMembersArr.push(role.members);
        }
      });

      // concat roleMembers
      if (roleMembersArr.length > 1)
        memberList = roleMembersArr[0].concat(...roleMembersArr);

      // if channel is public then get all members
      if (!memberList) memberList = guild.members.cache;

      // filter out bots
      memberList = memberList.filter((member) => !member.user.bot);

      return channel.send(
        // hackily send same case-sensitive string in output as was given
        `${memberList.random()} is the ${content.split(' ')[0].slice(1)}!`
      );
    }
  },
};
