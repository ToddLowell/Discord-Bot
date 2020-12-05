require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const _ = require('lodash');

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

  if (
    msg.content.includes('what do you think of le chi') ||
    msg.content.includes('<@!329257874654101514>')
  ) {
    msg.channel.send('He a dum dum');
  }

  if (msg.content === 'entrancemusic') {
    const channel = client.channels.cache.get('437140734311661582');
    if (!channel) return console.error('The channel does not exist!');

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
});

client.login(process.env.TOKEN);
