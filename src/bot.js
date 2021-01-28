require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const _ = require('lodash');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.listen(3000, () => {
  console.log('Listening to port 3000.');
});

let usersInVoice = null;

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

const entranceMusic = require('./partials/entranceMusic.js');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  if (msg.content[0] !== '\\') return;
  msg.content = msg.content.toLowerCase().substring(1);

  console.log(msg.content);

  if (msg.content === 'rip') {
    msg.react('😢');
    msg.react('😭');
    msg.react('😟');
  }

  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }

  if (msg.content.includes('what do you think of le chi') || msg.content.includes('<@!329257874654101514>')) {
    msg.channel.send('He a dum dum');
  }

  if (msg.content === 'entrancemusic' || msg.content === 'em') {
    const channel = client.channels.cache.get('437140734311661582');
    if (!channel) return console.error('The channel does not exist!');
    playEntranceMusic(channel);
  }
});

client.on('voiceStateUpdate', (oldState, newState) => {
  // return if Aigist
  if (oldState.id === '784403906363916288' || newState.id === '784403906363916288') return;

  // if joining a channel
  if (newState.channelID) {
    const newGuild = client.guilds.cache.get(newState.guild.id);
    const newChannel = newGuild.channels.cache.get(newState.channelID);
    const newUsers = newChannel.members;

    usersInVoice = {};
    newUsers.forEach((user) => {
      // don't show Aigis
      if (user.user.constructor.name === 'ClientUser') return;
      usersInVoice[user.user.id] = {
        name: user.user.username,
        avatar: user.user.displayAvatarURL({ size: 1024, format: 'png' }),
      };
    });
  } else if (oldState.channelID) {
    const oldGuild = client.guilds.cache.get(oldState.guild.id);
    const oldChannel = oldGuild.channels.cache.get(oldState.channelID);
    const oldUsers = oldChannel.members;

    usersInVoice = {};
    oldUsers.forEach((user) => {
      // don't show Aigis
      if (user.user.constructor.name === 'ClientUser') return;
      usersInVoice[user.user.id] = {
        name: user.user.username,
        avatar: user.user.displayAvatarURL({ size: 1024, format: 'png' }),
      };
    });
  }

  const newUserChannel = newState.channelID;
  const oldUserChannel = oldState.channelID;
  console.log(newUserChannel, oldUserChannel);

  if (oldUserChannel === null && newUserChannel !== null) {
    console.log('New user joined a channel.');
    const channel = client.channels.cache.get(newUserChannel);
    // user joins a new voice channel
    // if (newState.id === '329257874654101514')
    console.log(newState);
    playEntranceMusic(channel);
  } else if (newUserChannel === null) {
    // User leaves a voice channel
  }
});

client.login(process.env.TOKEN);

function playEntranceMusic(channel) {
  channel
    .join()
    .then((connection) => {
      console.log('Successfully connected.');

      // Create a dispatcher
      const rando = _.sample(Object.values(entranceMusic));

      const dispatcher = connection.play(require('path').join(__dirname, rando.path));

      dispatcher.on('start', () => {
        console.log('audio.mp3 is now playing!');
      });

      dispatcher.on('finish', () => {
        console.log('music has finished playing!');
      });

      dispatcher.on('error', console.error);

      // disconnect after 18 seconds
      setTimeout(() => {
        dispatcher.destroy();

        channel.leave();
      }, 18000);
    })
    .catch((e) => console.error(e));
}
