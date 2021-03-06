import path from 'path';
import type { Client, VoiceChannel } from 'discord.js';

// const express = require('express');
// const cors = require('cors');

// const app = express();
// app.use(cors());

// app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
//   // eslint-disable-next-line no-console
//   console.log(`Listening to port ${process.env.PORT || 3000}.`);
// });

// // SSE
// app.get('/hook', async (req, res) => {
//   // eslint-disable-next-line no-console
//   console.log('Triggered /hooks');
//   res.set({
//     'Cache-Control': 'no-cache',
//     'Content-Type': 'text/event-stream',
//     Connection: 'keep-alive',
//     'Access-Control-Allow-Origin': '*',
//   });
//   res.flushHeaders();

//   // Tell the client to retry every 10 seconds if connectivity is lost
//   res.write('retry: 10000\n\n');

//   while (true) {
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     res.write(`data: ${JSON.stringify(usersInVoice)}\n\n`);
//   }
// });

// let usersInVoice = null;

export default (client: Client): void => {
  client.on('voiceStateUpdate', (oldState, newState) => {
    // return if Aigis
    if (
      oldState.id === '784403906363916288' ||
      newState.id === '784403906363916288'
    )
      return;

    // ! - Desktop Overlay
    // // if joining a channel
    // if (newState.channelID) {
    //   const newGuild = client.guilds.cache.get(newState.guild.id);
    //   const newChannel = newGuild!.channels.cache.get(newState.channelID);
    //   const newUsers = newChannel!.members;

    //   usersInVoice = {};
    //   newUsers.forEach((user) => {
    //     // don't show Aigis
    //     if (user.user.constructor.name === 'ClientUser') return;
    //     usersInVoice[user.user.id] = {
    //       name: user.user.username,
    //       avatar: user.user.displayAvatarURL({ size: 1024, format: 'png' }),
    //     };
    //   });
    // } else if (oldState.channelID) {
    //   const oldGuild = client.guilds.cache.get(oldState.guild.id);
    //   const oldChannel = oldGuild!.channels.cache.get(oldState.channelID);
    //   const oldUsers = oldChannel!.members;

    //   usersInVoice = {};
    //   oldUsers.forEach((user) => {
    //     // don't show Aigis
    //     if (user.user.constructor.name === 'ClientUser') return;
    //     usersInVoice[user.user.id] = {
    //       name: user.user.username,
    //       avatar: user.user.displayAvatarURL({ size: 1024, format: 'png' }),
    //     };
    //   });
    // }

    const newUserChannel = newState.channelID;
    const oldUserChannel = oldState.channelID;
    // console.log(newUserChannel, oldUserChannel);

    if (oldUserChannel === null && newUserChannel !== null) {
      // console.log('New user joined a channel.');
      const channel = client.channels.cache.get(newUserChannel) as VoiceChannel;
      // user joins a new voice channel
      if (
        newState.id === '329257874654101514' || // Le Chi
        newState.id === '353568465480581130' // Baidi
      )
        playEntranceMusic(channel);
    } else if (newUserChannel === null) {
      // User leaves a voice channel
    }
  });

  function playEntranceMusic(channel: VoiceChannel) {
    channel
      .join()
      .then((connection) => {
        console.log('Successfully connected.'); // eslint-disable-line

        connection.play(path.join(__dirname, './assets/JoJo.mp3'), {
          seek: 0,
          volume: 1,
        });

        connection.on('finish', () => {
          console.log('music has finished playing!'); // eslint-disable-line
        });

        // eslint-disable-next-line no-console
        connection.on('error', console.error);

        // disconnect after 18 seconds
        setTimeout(() => {
          channel.leave();
        }, 18000);
      })
      .catch((e) => console.error(e)); // eslint-disable-line
  }
};
