const checkCameraData = require('../../models/checkCameraData');

module.exports = {
  async execute(oldState, newState) {
    try {
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
