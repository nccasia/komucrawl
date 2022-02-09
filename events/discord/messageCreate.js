require('../../util/extenders.js');
const bwl = require('../../util/bwl.js');

module.exports = {
  async execute(e) {
    const { client: t } = e;
    // store to database
    try {
      const displayname =
        e.member != null || e.member != undefined
          ? e.member.displayName
          : e.author.username;

      if (e.id != null && e.content != '') {
        e.addDB().catch(console.error);
      }
      if (e.author != null) {
        e.author.addDB(displayname).catch(console.error);
      }
      await bwl(e, t).catch(console.error);
    } catch (err) {
      console.log(err);
    }
  },
};
