const ytdl = require('ytdl-core');
const _ = require('lodash');

module.exports = {
  commands: ['entrancemusic', 'em'],
  callback(msg, args, text) {
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) return msg.channel.send('You need to be in a voice channel to be cool!');

    // check if bot can join
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return msg.channel.send("I don't have permission to join and speak in your voice channel!");
    }

    playEntranceMusic(voiceChannel);

    function playEntranceMusic(voiceChannel) {
      const entranceMusic = require('../partials/entranceMusic.js');

      voiceChannel
        .join()
        .then((connection) => {
          console.log('Successfully connected.');

          const rando = _.sample(Object.values(entranceMusic));

          const stream = ytdl(rando.origin, { filter: 'audioonly' });

          connection.play(stream, { seek: 0, volume: 1 });

          connection.on('finish', () => {
            console.log('music has finished playing!');
          });

          connection.on('error', console.error);

          // disconnect after 18 seconds
          setTimeout(() => {
            voiceChannel.leave();
          }, 18000);
        })
        .catch((e) => console.error(e));
    }
  },
  permissions: [],
  requiredRoles: [],
};
