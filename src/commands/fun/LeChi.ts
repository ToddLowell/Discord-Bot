import type { CommandOptions } from '../index';

export default {
  commands: ['lechi', 'graheeth'],
  callback(msg) {
    msg.channel.send('He a dum dum');
  },
} as CommandOptions;
