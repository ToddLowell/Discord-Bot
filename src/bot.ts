require('dotenv').config();
import { Client, Message, VoiceChannel } from 'discord.js';

const client: Client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user!.tag}!`);
});

client.on('message', (msg: Message) => {
  if (msg.content[0] !== '\\') return;
  msg.content = msg.content.toLowerCase().substring(1);

  console.log(msg.content);

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

    (channel as VoiceChannel)
      .join()
      .then((connection) => {
        console.log('Successfully connected.');

        // Create a dispatcher
        console.log(require('path').join(__dirname, './Rocky Music Video-Eye Of The Tiger.mp3'));
        const dispatcher = connection.play(
          require('path').join(__dirname, './Rocky Music Video-Eye Of The Tiger.mp3')
        );

        dispatcher.on('start', () => {
          console.log('audio.mp3 is now playing!');
        });

        dispatcher.on('finish', () => {
          console.log('music has finished playing!');
        });

        dispatcher.on('error', console.error);

        // disconnect after 10 seconds
        setTimeout(() => {
          (channel as VoiceChannel).leave();

          dispatcher.destroy();
        }, 15000);
      })
      .catch((e) => console.error(e));
  }
});

client.login(process.env.TOKEN);
