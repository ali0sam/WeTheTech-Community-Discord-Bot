const GuildsDB = require("./schema/Guild.js");
const ChannelDB = require("./schema/Channel")
const AboutDB = require("./schema/About")
const LinkDB = require("./schema/Link")


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

module.exports.about = async function (userId){

  let aboutDB = await AboutDB.findOne({
    user : userId
  })

  if(aboutDB){
    return aboutDB
  }else{
    aboutDB = new AboutDB({
      user : userId
    })
    await aboutDB.save().catch(err => console.log(err))
    return aboutDB
  }
}

module.exports.link = async function (userId){

  let linkDB = await LinkDB.findOne({
    user : userId
  })

  if(linkDB){
    return linkDB
  }else{
    linkDB = new LinkDB({
      user : userId
    })
    await linkDB.save().catch(err => console.log(err))
    return linkDB
  }
}