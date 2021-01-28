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

    const entranceMusic = require('../partials/entranceMusic.js');

    playEntranceMusic(voiceChannel);

    function playEntranceMusic(voiceChannel) {
      voiceChannel
        .join()
        .then((connection) => {
          console.log('Successfully connected.');

          // Create a dispatcher
          const rando = _.sample(Object.values(entranceMusic));

          const dispatcher = connection.play(require('path').join(__dirname, '../', rando.path));

          console.log(require('path').join(__dirname, '../', rando.path));

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

            voiceChannel.leave();
          }, 18000);
        })
        .catch((e) => console.error(e));
    }
  },
  permissions: [],
  requiredRoles: [],
};
