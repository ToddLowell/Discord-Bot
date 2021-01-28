require('dotenv').config();

const path = require('path');
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();

const _ = require('lodash');

const express = require('express');
const cors = require('cors');

let usersInVoice = null;

const app = express();
app.use(cors());

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening to port ${process.env.PORT || 5000}.`);
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

  const commandHandler = require(`./commands/index.js`);

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file));
      } else if (file !== 'index.js') {
        const options = require(path.join(__dirname, dir, file));
        // console.log(options);

        commandHandler(client, options);
      }
    }
  };

  readCommands('commands');
});

client.login(process.env.TOKEN);
