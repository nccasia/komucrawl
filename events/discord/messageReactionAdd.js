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
      let channel = message.channel;

      if (!message.guildId) return;

      const fetchMessage = await message.client.channels.fetch(
        message.channelId
      );
      const msg = await fetchMessage.messages.fetch(message.id);
      while (channel.type !== 'GUILD_CATEGORY') {
        channel = await this.client.channels.fetch(channel.parentId);
      }

      const checkCategories = [
        'PROJECTS',
        'PROJECTS-EXT',
        'PRODUCTS',
        'LOREN',
        'HRM&IT',
        'SAODO',
        'MANAGEMENT',
      ];

      let validCategory;
      if (channel.name.slice(0, 4).toUpperCase() === 'PRJ-') {
        validCategory = true;
      } else {
        validCategory = checkCategories.includes(channel.name.toUpperCase());
      }

      if (
        validCategory &&
        message.channelId !== '921339190090797106' &&
        msg.author.id != '922003239887581205'
      ) {
        const userDiscord = await message.client.users.fetch(msg.author.id);
        userDiscord.send(
          `${user.username} react ${emoji.name} on your comment ${message.url}`
        );
      }

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
