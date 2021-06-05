import path from 'path';
import type { VoiceChannel, User } from 'discord.js';
import type { CommandOptions } from '../index';

export default {
  commands: ['entrancemusic', 'em'],
  callback(msg) {
    const voiceChannel = msg.member!.voice.channel;
    if (!voiceChannel)
      return msg.channel.send('You need to be in a voice channel to be cool!');

    // check if bot can join
    const permissions = voiceChannel.permissionsFor(msg.client.user as User);
    if (!permissions!.has('CONNECT') || !permissions!.has('SPEAK')) {
      return msg.channel.send(
        "I don't have permission to join and speak in your voice channel!"
      );
    }

    playEntranceMusic(voiceChannel);

    function playEntranceMusic(voiceChannel: VoiceChannel) {
      voiceChannel
        .join()
        .then((connection) => {
          connection.play(path.join(__dirname, '../../assets/JoJo.mp3'), {
            seek: 0,
            volume: 1,
          });

          connection.on('finish', () => {
            // console.log('music has finished playing!');
          });

          // eslint-disable-next-line no-console
          connection.on('error', console.error);

          // disconnect after 18 seconds
          setTimeout(() => {
            voiceChannel.leave();
          }, 18000);
        })
        .catch((e) => console.error(e)); // eslint-disable-line
    }
  },
} as CommandOptions;
