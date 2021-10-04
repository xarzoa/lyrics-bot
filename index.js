const { Telegraf } = require('telegraf')
const Genius = require('genius-lyrics')
const commands = require('./helpers/commands')
const logger = require('./helpers/logger')

const Client = new Genius.Client(process.env.GENIUS)
const bot = new Telegraf(process.env.BOT_TOKEN)



bot.start( xaria =>{ logger.info(`${xaria.update.message.from.id} ${xaria.update.message.from.first_name}  ${xaria.message.text}`)
  xaria.replyWithHTML(`Hi! <b> <a href='tg://user?id=${xaria.update.message.from.id}'>${xaria.update.message.from.first_name}</a> </b> 

I'm ${xaria.botInfo.first_name} a simple<i> Nodejs </i> Lyrics bot.`)})

bot.help(xaria =>{  
  logger.info(`${xaria.update.message.from.id} ${xaria.update.message.from.first_name}  ${xaria.message.text}`)
  xaria.replyWithHTML(`I'm <b>${xaria.botInfo.first_name}</b>

A simple lyrics bot made by using <b> Nodejs, Telegraf, GENIUS</b>

<b><u>Commands </u></b>

<code> /lyrics song name</code> - Find lyrics
<code> /help </code> - Get this msg

Join <b> @CatBio </b>
`)})

bot.command( commands.lyrics , async xaria => {
  logger.info(`${xaria.update.message.from.id} ${xaria.update.message.from.first_name}  ${xaria.message.text}`)
  const msg = xaria.message.text.split(`/${commands.lyrics}`)
  if(msg[1] == ''){
    xaria.replyWithHTML(` <b> Error ! 😐🖐️ </b> You typed nothing!😅

Type song name after the command.

Eg - <code> /lyrics Dandelions </code>`)
  }
  else{
    try{
      const searches = await Client.songs.search(msg[1])
      const firstSong = searches[0];
      const lyrics = await firstSong.lyrics();
      xaria.replyWithHTML(`<b>${firstSong.raw.full_title}</b>
<b>by ${firstSong.raw.primary_artist.name} </b>

<code>${lyrics} </code>`);
      logger.info(`${xaria.update.message.from.id} ${xaria.update.message.from.first_name}  ${firstSong.raw.full_title}}`)
    }catch(err){
      if(err){
        xaria.reply(`Nothing found. 💔`)
        logger.error('Error' + err)
      }
    }
  }
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))