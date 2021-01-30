require('dotenv').config();
const _ = require('lodash');

const Discord = require('discord.js');
const client = new Discord.Client();

require('./voiceStatusUpdate.js')(client);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // load commands with command handler
  require('./commands/loadCommands.js')(client);
});

client.login(process.env.NODE_ENV === 'development' ? process.env.TOKEN_DEVELOPMENT : process.env.TOKEN);
