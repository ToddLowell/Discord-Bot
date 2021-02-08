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

## Website

### Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
