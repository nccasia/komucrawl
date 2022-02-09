const mongoose = require('mongoose');
const { Prefix, Color, defaultLanguage } = require('../config.js');
const channeldb = new mongoose.Schema({
  serverID: { type: String, required: true },
  prefix: { type: String, required: true, default: Prefix },
  lang: {
    type: String,
    required: false,
    default: defaultLanguage.toLowerCase(),
  },
  premium: { type: String, required: false, default: null },
  premiumUserID: { type: String, required: false, default: null },
  chatbot: { type: String, required: false, default: null },
  ignored_channel: { type: String, required: false, default: null },
  admin_role: { type: String, required: false, default: null },
  goodPremium: { type: String, required: false, default: null },
  requestChannel: { type: String, required: false, default: null },
  requestMessage: { type: String, required: false, default: null },
  defaultVolume: { type: String, required: false, default: 60 },
  vc: { type: String, required: false, default: null },
  clearing: { type: String, required: false, default: null },
  auto_shuffle: { type: String, required: false, default: null },
  games_enabled: { type: Boolean, required: false, default: null },
  util_enabled: { type: Boolean, required: false, default: true },
  autorole: { type: String, required: false, default: null },
  autorole_bot: { type: String, required: false, default: null },
  dj_role: { type: String, required: false, default: null },
  count: { type: String, required: false, default: null },
  autopost: { type: String, required: false, default: null },
  suggestions: { type: String, required: false, default: null },
  color: { type: String, required: false, default: Color },
  backlist: { type: String, required: false, default: false },
  autonick: { type: String, required: false, default: null },
  autonick_bot: { type: String, required: false, default: null },
  autoplay: { type: String, required: false, default: null },
  song: { type: String, required: false, default: null },
  h24: { type: String, required: false, default: null },
  announce: { type: String, required: false, default: true },

  plugins: {
    type: Object,
    default: {
      welcome: {
        status: false,
        message: null,
        channel: null,
        image: false,
      },
      goodbye: {
        status: false,
        message: null,
        channel: null,
        image: false,
      },
      autoping: {
        status: false,
        message: null,
        channel: null,
        image: false,
      },
    },
  },
  protections: {
    type: Object,
    default: {
      anti_maj: {
        status: false,
        message: null,
        channel: null,
        image: false,
      },
      anti_spam: {
        status: false,
        message: null,
        channel: null,
        image: false,
      },
      anti_mentions: {
        status: false,
        message: null,
        channel: null,
        image: false,
      },
      anti_dc: {
        status: false,
        message: null,
        channel: null,
        image: false,
      },
      anti_pub: null,
      antiraid_logs: null,
    },
  },
});

module.exports = mongoose.model('komu_guilddata', channeldb);
