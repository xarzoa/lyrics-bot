const logger = require('./helpers/logger')

const config = {
  bot: process.env.BOT_TOKEN ? process.env.BOT_TOKEN : logger.error(`BOT_TOKEN undefined!`),
  genius: process.env.GENIUS ? process.env.GENIUS : logger.error(`GENIUS TOKEN undefined!`) ,
  channel: process.env.CHANNEL_ID ? process.env.CHANNEL_ID : logger.error(`CHANNEL_ID undefined`)
}

if (process.env.CHANNEL_ID === undefined){
  logger.error('CHANNEL_ID is undefined! Exiting now')
  process.exit(1)
}else if(process.env.GENIUS === undefined){
  logger.error('GENIUS Token is undefined! Exiting now')
  process.exit(1)
}else if(process.env.BOT_TOKEN === undefined){
  logger.error('BOT_TOKEN Value is undefined! Exiting now')
  process.exit(1)
}

module.exports = config