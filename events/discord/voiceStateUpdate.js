const checkCameraData = require('../../models/checkCameraData');
const joinCallData = require('../../models/joinCall');
const voiceChannelData = require('../../models/voiceChannel');

module.exports = {
  async execute(oldState, newState) {
    try {
      let countMember = newState.channel?.members.size
        ? newState.channel.members.size
        : oldState.channel.members.size;
      const allMember = newState.channel?.members
        ? newState.channel?.members
        : oldState.channel.members;

      const addJoinCall = async (channelId, userid, status) => {
        const newjoinCall = new joinCallData({
          channelId,
          userid,
          status,
        });
        await newjoinCall.save();
      };
      const checkDbIsJoinning = async (channelId, userid, status) => {
        let result = false;
        const joindb = await joinCallData.findOne({
          channelId,
          userid,
          status,
        });
        if (joindb) result = true;
        return result;
      };
      const updateJoiningDb = async (channelId, userid, status) => {
        await joinCallData.updateOne(
          { channelId, userid, status: 'joining' },
          {
            status,
            end_time: Date.now(),
          }
        );
      };
      if (countMember === 2 && newState.channelId) {
        const checkJoinMeeting = await voiceChannelData.find({
          status: 'start',
          id: newState.channelId,
        });
        checkJoinMeeting.map(async (item) => {
          await voiceChannelData.updateOne(
            { id: item.id },
            {
              status: 'happening',
            }
          );
        });
      }
      if (countMember < 2 && oldState.channelId) {
        const checkEndMeeting = await voiceChannelData.find({
          status: 'happening',
          id: oldState.channelId,
        });
        checkEndMeeting.map(async (item) => {
          await voiceChannelData.updateOne(
            { id: item.id },
            {
              status: 'finished',
            }
          );
          await oldState.channel.setName(`${item.originalName}`);
        });
      }

      // !newState.channelId => leave room
      // !oldState.channelId => join room
      // one member leave when totals member = 2
      if (countMember === 1 && !newState.channelId) {
        await updateJoiningDb(oldState.channelId, oldState.id, 'finish');
        const userid = oldState.channel.members.map((item) => item.user.id)[0];
        await updateJoiningDb(oldState.channelId, userid, 'finish');
      }
      // one member joinning hence total member = 2
      if (countMember === 2 && !oldState.channelId) {
        const userid = newState.channel.members.map((item) => item.user.id);
        await addJoinCall(newState.channelId, userid[0], 'joining');
        await addJoinCall(newState.channelId, userid[1], 'joining');
      }
      if (countMember === 2 && !newState.channelId) {
        await updateJoiningDb(oldState.channelId, oldState.id, 'finish');
      }
      if (countMember > 2) {
        if (!oldState.channelId) {
          await addJoinCall(newState.channelId, newState.id, 'joining');
        }
        // check leave joinning
        if (!newState.channelId) {
          await updateJoiningDb(oldState.channelId, oldState.id, 'finish');
        }
      }
      if (oldState.selfVideo === false && newState.selfVideo === true) {
        await new checkCameraData({
          userId: newState.id,
          channelId: newState.channelId,
          enableCamera: true,
          createdTimestamp: Date.now(),
        })
          .save()
          .catch(console.error);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
