const { Telegraf } = require('telegraf')
const Genius = require('genius-lyrics')
const commands = require('./helpers/commands')
const logger = require('./helpers/logger')

const Client = new Genius.Client(process.env.GENIUS)
const bot = new Telegraf(process.env.BOT_TOKEN)
const channelId = process.env.CHANNEL_ID ? process.env.CHANNEL_ID : -1001441677152


bot.telegram.setMyCommands([
      {
        command: 'start',
        description:'Start message (don\'t do dis) '
      },
      {
        command: 'help',
        description: 'Need help?'
      },
      {
        command: commands.lyrics,
        description: 'Find lyrics'
      },
      {
        command: commands.rickroll,
        description: 'Like surprises'
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
    xaria.replyWithHTML(` <b> Error ! 😐🖐️ </b> You typed nothing!😅

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
        xaria.reply(`Nothing found. 💔`)
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

//Reading respect ++ btw don't steal ma code :( 