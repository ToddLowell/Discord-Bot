import fs from 'fs';
import path from 'path';
import type { Client } from 'discord.js';
import type { CommandOptions } from './index';
import commandHandler from './index.js';

export default (client?: Client): CommandOptions[] => {
  const commandsArr: CommandOptions[] = [];

  const readCommands = (dir: string) => {
    const files = fs.readdirSync(path.join(__dirname, dir));

    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));

      if (stat.isDirectory()) {
        readCommands(path.join(dir, file));
      } else if (file !== 'index.js' && file !== 'loadCommands.js') {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const options: { default: CommandOptions } = require(path.join(
          __dirname,
          dir,
          file
        ));
        commandsArr.push(options.default);
      }
    }
  };

  readCommands('.');

  if (client) commandHandler(client, commandsArr);

  return commandsArr;
};
