const GuildsDB = require("./schema/Guild.js");
const ChannelDB = require("./schema/Channel")


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

module.exports.channel = async function (event) {

  let channelDB = await ChannelDB.findOne({
    event: event
  })

  if(channelDB){
    return channelDB
  }else{
    channelDB = new ChannelDB({
      event: event
    })
    await channelDB.save().catch(err => console.log(err))
    return channelDB
  }
}