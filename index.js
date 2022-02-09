const fs = require('fs'),
  { getFreeClientID: getFreeClientID, setToken: setToken } = require('play-dl'),
  {
    Client: Client,
    Intents: Intents,
    Collection: Collection,
  } = require('discord.js'),
  client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.DIRECT_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    ],
    partials: ['USER', 'REACTION', 'MESSAGE', 'CHANNEL'],
  }),
  util = require('util'),
  { Player } = require('discord-player'),
  readdir = util.promisify(fs.readdir),
  mongoose = require('mongoose');

client.config = require('./config.js');
client.footer = client.config.footer;
client.owners = [''];
client.commands = new Collection();
client.player = new Player(client, client.config.player);
getFreeClientID().then((e) => {
  setToken({ soundcloud: { client_id: e } });
});
mongoose
  .connect(client.config.database.MongoURL, client.config.database.options)
  .then(() => {
    console.log('[MongoDB]: Ready');
  })
  .catch((e) => {
    console.log('[MongoDB]: Error\n' + e);
  });

const init = async () => {
  const files = await readdir('./events/discord');
  console.log(`[Events] ${files.length} events loaded.`);
  files.forEach((file) => {
    const name = file.split('.')[0];
    const module = require(`./events/discord/${file}`);
    client.on(name, (...event) => module.execute(...event, client));
    delete require.cache[require.resolve(`./events/discord/${file}`)];
  });
};

init();
client.login(client.config.token).catch((e) => {
  console.log(
    '[Discord login]: Please provide a valid discord bot token\n' + e
  );
});
