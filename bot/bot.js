const { Telegraf } = require('telegraf')
const Genius = require('genius-lyrics')
const commands = require('./helpers/commands')
const logger = require('./helpers/logger')
const config = require('./config')
const web = require('./helpers/web')

const Client = new Genius.Client(config.genius)
const bot = new Telegraf(config.bot)
const channelId = config.channel

config.web ? web.web(3000) : logger.info(`No website!`)

bot.telegram.setMyCommands([
      {
        command: 'start',
        description: commands.startDescription
      },
      {
        command: 'help',
        description: commands.helpDescription
      },
      {
        command: commands.lyrics,
        description: commands.lyricsDescription
      },
      {
        command: commands.rickRoll,
        description: commands.rickRollDescription
      },
      {
        command: commands.webPage,
        description: commands.webPageDescription
      }
])


bot.start( xaria =>{
  
  let defaultLogger = `${xaria.update.message.from.id} ${xaria.update.message.from.first_name} ${xaria.message.text}`
  
  xaria.telegram.sendMessage(channelId, defaultLogger)
  
  logger.info(defaultLogger)
  
  xaria.replyWithHTML(`Hola! <b><a href='tg://user?id=${xaria.update.message.from.id}'>${xaria.update.message.from.first_name}</a></b> 

I'm ${xaria.botInfo.first_name} a simple<i> Nodejs </i> Lyrics bot.`)
})


bot.help(xaria =>{  
  
  let defaultLogger = `${xaria.update.message.from.id} ${xaria.update.message.from.first_name} ${xaria.message.text}`
  
  xaria.telegram.sendMessage(channelId, defaultLogger)
  logger.info(defaultLogger)
  xaria.replyWithHTML(`I'm <b>${xaria.botInfo.first_name}</b>

A simple lyrics bot made by using <b>Telegraf and GENIUS</b>

<b><u>Commands </u></b>

<code> /lyrics song name</code> - Find lyrics
<code> /help </code> - Get this msg

Join <b> @CatBio </b>
`)
})


bot.command( commands.lyrics , async xaria => {
  
  let defaultLogger = `${xaria.update.message.from.id} ${xaria.update.message.from.first_name} ${xaria.message.text}`
  
  logger.info(defaultLogger)

  xaria.telegram.sendMessage(channelId , defaultLogger)
  
  const msg = xaria.message.text.split(`/${commands.lyrics}`)
  
  if(msg[1] == ''){
    xaria.replyWithHTML(` <b> Error ! </b> You typed nothing!

Type song name after the command.

Eg - <code> /lyrics Dandelions </code>`)
  }else{
    try{
      const searches = await Client.songs.search(msg[1])
      const firstSong = searches[0];
      const lyrics = await firstSong.lyrics();
      
      // Logger
      logger.info(`${defaultLogger} ${firstSong.raw.full_title}`)

      xaria.telegram.sendMessage(channelId,`${defaultLogger} ${firstSong.raw.full_title}`)
      
      xaria.replyWithHTML(`<b>${firstSong.raw.full_title}</b>

<b><i>${firstSong.raw.primary_artist.name}</i></b>

<code>${lyrics.length > 4096 ? 'This lyrics is too big to handle. I found ' + lyrics.length + ' characters on this lyrics. Telegram only support upto 4096 characters per msg' : lyrics } </code>`);
    }catch(err){
      if(err){
        xaria.reply(`${err}`) // if you use err without template literals. bot will return {} without any value
        xaria.telegram.sendMessage(channelId,`${defaultLogger} ${err}`)
        logger.error(`${defaultLogger} ${err}`)
      }
    }
  }
})


bot.command(commands.rickroll, xaria => {
  xaria.replyWithAnimation('https://tenor.com/bEWOf.gif')
  xaria.telegram.sendMessage(channelId,`${xaria.update.message.from.id} ${xaria.update.message.from.first_name} Rickrolled`)
  logger.info(`${xaria.update.message.from.id} ${xaria.update.message.from.first_name} Rickrolled`)
})

bot.command(commands.webPage, xaria => {
  xaria.reply(`${config.web ? config.web + 'up.railway.app': 'No Website'}`)
  xaria.telegram.sendMessage(channelId,`${xaria.update.message.from.id} ${xaria.update.message.from.first_name} ${config.web ? config.web + 'up.railway.app': 'No Website'}`)
  logger.info(`${xaria.update.message.from.id} ${xaria.update.message.from.first_name} ${config.web ? config.web + '.up.railway.app': 'No Website'}`)
})

bot.on('sticker', xaria => {
  
  xaria.reply(`What are you doing here?

I'm not your girlfriend! This is fuckin bullshit`)
    xaria.telegram.sendMessage(channelId,`${xaria.update.message.from.id} ${xaria.update.message.from.first_name} Sticker`)
  logger.info(`${xaria.update.message.from.id} ${xaria.update.message.from.first_name} Sticker`)
})


bot.on( 'message' , xaria => {
  
  let defaultLogger = `${xaria.update.message.from.id} ${xaria.update.message.from.first_name} ${xaria.message.text}`

  xaria.telegram.sendMessage(channelId, defaultLogger)
  logger.info(defaultLogger)
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

// Reading respect ++ btw don't steal ma code! mom ... he/she robbed my code :( 
