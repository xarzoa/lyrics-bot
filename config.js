const logger = require('./bot/helpers/logger')

const config = {
  bot: process.env.BOT_TOKEN,
  genius: process.env.GENIUS,
  channelId: process.env.CHANNEL_ID
}

module.exports = config