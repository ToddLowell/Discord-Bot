const path = require('path');
const fs = require('fs');

module.exports = (client) => {
  const commandHandler = require(`./index.js`);

  const commandsArr = [];

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file));
      } else if (file !== 'index.js' && file !== 'loadCommands.js') {
        const options = require(path.join(__dirname, dir, file));
        commandsArr.push(options);

        if (client) commandHandler(client, options);
      }
    }
  };

  readCommands('.');

  return commandsArr;
};
