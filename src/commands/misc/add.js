module.exports = {
  commands: ['add', 'addition', 'sum'],
  expectedArgs: '<num1> <num2> ...',
  description: 'Add numbers',
  minArgs: 2,
  callback(msg, args, text) {
    const sum = args.reduce((a, b) => +a + +b, 0);

    msg.reply(`The sum is ${sum}.`);
  },
  permissions: 'ADMINISTRATOR',
  requiredRoles: [],
};
