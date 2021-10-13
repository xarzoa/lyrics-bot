const logger = require('./helpers/logger')
require('dotenv').config({path:'./bot/.env'})

const BOT_TOKEN = process.env.BOT_TOKEN 
const GENIUS = process.env.GENIUS
const CHANNEL_ID = process.env.CHANNEL_ID
const URL = process.env.URL
const USERNAME = process.env.USERNAME
const DETAKEY = process.env.DETAKEY
const PORT = process.env.PORT

const error = env => {
  logger.info(`${env} is undefiend `)
  process.exit(1)
}

module.exports = {
  bot: BOT_TOKEN ? BOT_TOKEN : error('BOT_TOKEN'),
  genius: GENIUS ? GENIUS : error('GENIUS') ,
  channel: CHANNEL_ID ? CHANNEL_ID : error('CHANNEL_ID'),
  deta: DETAKEY ? DETAKEY : error('DETAKEY'),
  port: PORT ? PORT : error('PORT'),
  web: URL ? URL : error('URL'),
  username: USERNAME ? USERNAME : error('USERNAME')
}

