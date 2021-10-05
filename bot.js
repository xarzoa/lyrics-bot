const { Telegraf } = require('telegraf')
const Genius = require('genius-lyrics')
const commands = require('./helpers/commands')
const logger = require('./helpers/logger')

// Envs
const Client = new Genius.Client(process.env.GENIUS)
const bot = new Telegraf(process.env.BOT_TOKEN)

// Bot on start
bot.start( xaria =>{ logger.info(`${xaria.update.message.from.id} ${xaria.update.message.from.first_name}  ${xaria.message.text}`)
  xaria.replyWithHTML(`Hola! <b><a href='tg://user?id=${xaria.update.message.from.id}'>${xaria.update.message.from.first_name}</a></b> 

I'm ${xaria.botInfo.first_name} a simple<i> Nodejs </i> Lyrics bot.`)})

// Help command handler
bot.help(xaria =>{  
  logger.info(`${xaria.update.message.from.id} ${xaria.update.message.from.first_name}  ${xaria.message.text}`)
  xaria.replyWithHTML(`I'm <b>${xaria.botInfo.first_name}</b>

A simple lyrics bot made by using <b>Telegraf and GENIUS</b>

<b><u>Commands </u></b>

<code> /lyrics song name</code> - Find lyrics
<code> /help </code> - Get this msg

Join <b> @CatBio </b>
`)})

bot.command( commands.lyrics , async xaria => {
  // logger
  logger.info(`${xaria.update.message.from.id} ${xaria.update.message.from.first_name}  ${xaria.message.text}`)
  
  // Search
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
      logger.info(`${xaria.update.message.from.id} ${xaria.update.message.from.first_name}  ${firstSong.raw.full_title}}`)
      
      xaria.replyWithHTML(`<b>${firstSong.raw.full_title}</b>

<b><i>${firstSong.raw.primary_artist.name}</i></b>

<code>${lyrics.length > 4096 ? 'This lyrics is too big to handle. I found ' + lyrics.length + ' characters on this lyrics. Telegram only support upto 4096 characters per msg' : lyrics } </code>`);
    }catch(err){
      if(err){
        xaria.reply(`Nothing found. 💔`)
        logger.error(`${xaria.update.message.from.id} ${xaria.update.message.from.first_name} ${err}`)
      }
    }
  }
})

// On sticker handler
bot.on('sticker', xaria => {
  xaria.reply(`What are you doing here?

I'm not your girlfriend! This is fuckin bullshit`)
  logger.info(`${xaria.update.message.from.id} ${xaria.update.message.from.first_name} Sticker`)
})

// On msg logger
bot.on( 'message' , xaria => {
  logger.info(`${xaria.update.message.from.id} ${xaria.update.message.from.first_name}  ${xaria.message.text}`)
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))