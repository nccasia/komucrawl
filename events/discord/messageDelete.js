require('../../util/extenders.js');

module.exports = {
  async execute(message) {
    // store to database
    try {
      message.deleteDB();
    } catch (err) {
      console.log(err);
    }
  },
};
