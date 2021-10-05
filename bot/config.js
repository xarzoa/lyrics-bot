const logger = require('./helpers/logger')

const config = {
  bot: process.env.BOT_TOKEN ? process.env.BOT_TOKEN : logger.error(`BOT_TOKEN undefined!`),
  genius: process.env.GENIUS ? process.env.GENIUS : logger.error(`GENIUS TOKEN undefined!`) ,
  channel: process.env.CHANNEL_ID ? process.env.CHANNEL_ID : logger.error(`CHANNEL_ID undefined`)
}

if ( process.env.BOT_TOKEN && process.env.GENIUS && process.env.CHANNEL_ID === undefined){
  logger.error('Some Environmental variables are empty! Exiting now..')
  process.exit(1)
}

module.exports = config