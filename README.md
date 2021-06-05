## Command Syntax

```js
module.exports = {
  commands: ['add', 'addition', 'sum'],  // required
  expectedArgs: '<num1> <num2> ...',     // optional
  description: 'Add numbers',            // optional
  minArgs: 2,                            // optional
  maxArgs: null,                         // optional
  callback(msg, args, text) {            // required
    const sum = args.reduce((a, b) => +a + +b, 0);

    msg.reply(`The sum is ${sum}.`);
  },
  permissions: 'ADMINISTRATOR',          // optional
  requiredRoles: [],                     // optional
};
```

## Snippets

```js
// get user
const user = client.users.cache.get('261833456756064266');
console.log(user);

// get member
const guild = client.guilds.cache.get('437140734311661578');
const member = guild.members.cache.get('261833456756064266');
console.log(member);
```
