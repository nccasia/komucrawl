module.exports = {
    //IMPORTANT: If you need help with the installation of KOMU, you can join our support server here: https://komu.vn/discord
    prefix: "*",
    // Your discord bot token. https://discord.com/developpers/bots
    token: "",
    // Your ID
    // Your name/tag
    owners: ["KOMU#0139"],
    //The footer of the embeds that the bot will send
    footer: "KOMU ",
    // The id of the support
    supportID: "729774155037278268",
    // The status of your bot
    game: "KOMU ",
    //the color of the embeds
    color: "#3A871F",
    // OPTIONAL: Your top.gg token.
    topgg: "TOPGG_TOKEN",
    // OPTIONAL: The link of your bot's top.gg page.
    topgg_url: "https://top.gg/bot/783708073390112830",
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
    // The categories. Put null to enabled to disable a category
    categories: {
        configuration: { enabled: true, name: "Configuration", desc: "Setup the bot with the configuration commands" },
        utilities: { enabled: true, name: "Utilities", desc: "Some usefull commands", aliases: ["general"] },
        music: { enabled: true, name: "Music", desc: "Listen music with KOMU" },
        komu: {enabled: true, name: "Task", desc: "KOMU task manager" },
        slash: {enabled: true, name: "Poll", desc: "KOMU poll manager" },
        owner: { hide: true, enabled: true, name: "Owner", desc: "Manage your bot with the owner commands" }
    },
    // some usefull links about your bot, if you don't have an information, put null.
    links: {
        support: "https://discord.gg/nrReAmApVJ",
        website: "https://komu.vn",
        invite: "https://discord.com/oauth2/authorize?client_id=783708073390112830&scope=bot&permissions=8",
        commands: "https://komu.vn/commands"
    },
    //Database
    database: {
        // The url of your mongodb database. Check mongodb.org
        MongoURL: "mongodb://localhost:27017/komubot",
        // If you want to cache the database. For big bots
        cached: true,
        delay: 300000 * 4,
        Options: { autoIndex: false }
    },    
}
