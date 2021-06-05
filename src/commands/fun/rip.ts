import type { CommandOptions } from '../index';

export default {
  commands: ['rip', 'kmn', 'whatislife'],
  callback(msg) {
    msg.react('😢');
    msg.react('😭');
    msg.react('😟');
  },
} as CommandOptions;
