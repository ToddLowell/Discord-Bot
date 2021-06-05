import type { CommandOptions } from '../index';

export default {
  commands: 'ping',
  callback(msg) {
    msg.reply('Pong!');
  },
} as CommandOptions;
