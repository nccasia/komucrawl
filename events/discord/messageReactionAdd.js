const bwlReactData = require('../../models/bwlReactData');
const mentionedData = require('../../models/mentionedData');

module.exports = {
  async execute(messageReaction, user) {
    try {
      const { message, emoji } = messageReaction;
      const chid = message.channel.id;
      const messageId = message.id;
      const guildId = message.guildId;
      const createdTimestamp = message.createdTimestamp;

      const resolveMention = message.mentions.users.find(
        (current) => current.id === user.id
      );

      if (resolveMention) {
        await mentionedData.updateOne(
          {
            messageId: messageId,
            mentionUserId: user.id,
            reactionTimestamp: null,
          },
          {
            confirm: true,
            reactionTimestamp: Date.now(),
          }
        );
      }

      const data = await bwlReactData
        .findOne({
          authorId: user.id,
          messageId: messageId,
          guildId: guildId,
          channelId: chid,
        })
        .catch(console.error);
      if (data != null) {
        await data.updateOne({ count: data.count + 1 }).catch(console.error);
        return;
      }

      await new bwlReactData({
        channelId: chid,
        guildId: guildId,
        messageId: messageId,
        authorId: user.id,
        emoji: emoji.name,
        count: 1,
        createdTimestamp: createdTimestamp,
      })
        .save()
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  },
};
