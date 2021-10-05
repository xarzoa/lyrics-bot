const logger = require('./helpers/logger')

const config = {
  bot: process.env.BOT_TOKEN,
  genius: process.env.GENIUS,
  channel: process.env.CHANNEL_ID
}

module.exports = config