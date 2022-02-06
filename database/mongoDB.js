const GuildsDB = require("./schema/Guild.js");


module.exports.getGuildDB = async function (guildID) {

  let guildDB = await GuildsDB.findOne({
    _id: guildID
  })

  if (guildDB) {
    return guildDB
  } else {
    guildDB = new GuildsDB({
      _id: guildID
    })
    await guildDB.save().catch(err => console.log(err))
    return guildDB
  }
}
