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
