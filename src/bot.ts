import * as dotenv from 'dotenv';
import Discord from 'discord.js';
import voiceStatusUpdate from './voiceStatusUpdate.js';
import loadCommands from './commands/loadCommands.js';

dotenv.config();
const client = new Discord.Client();

voiceStatusUpdate(client);

client.on('ready', () => {
  // eslint-disable-next-line no-console
  console.log(`Logged in as ${client.user!.tag}!`);

  // load commands with command handler
  loadCommands(client);
});

client.login(
  process.env.NODE_ENV === 'development'
    ? process.env.TOKEN_DEVELOPMENT
    : process.env.TOKEN
);
