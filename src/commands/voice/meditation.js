const ytdl = require('ytdl-core');

module.exports = {
  commands: ['meditate', 'meditation'],
  callback(msg, args, text) {
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel)
      return msg.channel.send(
        'You need to be in a voice channel to use that command.'
      );

    // check if bot can join
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return msg.channel.send(
        "I don't have permission to join and/or speak in your voice channel (._.)."
      );
    }

    // play track
    const stream = ytdl('https://www.youtube.com/watch?v=-3i4SBmY204', {
      filter: 'audioonly',
      requestOptions: {
        headers: {
          Cookie:
            'YSC=LNxY9HGZsP8; VISITOR_INFO1_LIVE=HBfznt1wqvw; GPS=1; PREF=tz=Asia.Singapore&f4=4000000',
        },
      },
    });

    voiceChannel
      .join()
      .then((connection) => {
        connection.play(stream, { seek: 168, volume: 15 });

        connection.on('finish', () => {
          voiceChannel.leave();
        });

        // eslint-disable-next-line no-console
        connection.on('error', console.error);
      })
      .catch((e) => console.error(e)); // eslint-disable-line
  },
};
