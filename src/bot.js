require('dotenv').config();
const _ = require('lodash');

const Discord = require('discord.js');
const client = new Discord.Client();
const loadCommands = require('./commands/loadCommands.js');

const express = require('express');
const cors = require('cors');

let usersInVoice = null;

const app = express();
app.use(cors());

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log(`Listening to port ${process.env.PORT || 3000}.`);
});

// SSE
app.get('/hook', async (req, res) => {
  console.log('Triggered /hooks');
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
  });
  res.flushHeaders();

  // Tell the client to retry every 10 seconds if connectivity is lost
  res.write('retry: 10000\n\n');

  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    res.write(`data: ${JSON.stringify(usersInVoice)}\n\n`);
  }
});

require('./voiceStatusUpdate.js')(client);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  loadCommands(client);
});

client.login(process.env.NODE_ENV === 'development' ? process.env.TOKEN_DEVELOPMENT : process.env.TOKEN_PRODUCTION);
