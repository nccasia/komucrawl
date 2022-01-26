module.exports = {
  //IMPORTANT: If you need help with the installation of KOMU, you can join our support server here: https://komu.vn/discord
  prefix: "*",
  // Your discord bot token. https://discord.com/developpers/bots
  token: "",
  // Your ID
  // Your name/tag
  owners: ["KOMU#0139"],
  //the default bot language. fr or en
  defaultLanguage: "en",
  // If dev mod is enabled
  devMode: false,
  // The server where you test the commands
  devServer: "782661233622515772",
  // If you want to log every command,event etc. Usefull for debuging
  logAll: false,
  // If you want to test your configuration before starting the bot
  checkConfig: null,
  //The number of shards. Leave blank for auto
  shards: 1,
  //Database
  database: {
      // The url of your mongodb database. Check mongodb.org
      MongoURL: "mongodb://localhost:27017/komubot",
      // If you want to cache the database. For big bots
      cached: true,
      delay: 300000 * 4,
      Options: { autoIndex: false }
  }
}
