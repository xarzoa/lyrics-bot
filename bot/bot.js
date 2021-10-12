const { Telegraf , Markup } = require('telegraf')
const Genius = require('genius-lyrics')
const commands = require('./helpers/commands')
const logger = require('./helpers/logger')
const config = require('./config')
const web = require('./helpers/web')

const Client = new Genius.Client(config.genius)
const bot = new Telegraf(config.bot)
const channelId = config.channel
const port = config.port
const username = config.username

config.web && username ? web.web(port,username) : logger.info(`No website!`)

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
        command: commands.rickRoll,
        description: commands.rickRollDescription
      },
      {
        command: commands.webPage,
        description: commands.webPageDescription
      }
])

// Available in Feature............................................

// bot.command('helo',xaria =>
//   xaria.reply('Website',Markup.inlineKeyboard([
//     Markup.button.callback('GO','hehe'),Markup.button.callback('GO','haha')
//   ])),
//   bot.action('hehe', xaria =>{
//     xaria.reply('ehe')
//   })
// )


// bot.action('haha', xaria =>{
//   xaria.reply('ehe')
// })

const defaultLogger = () =>{
  let defaultLogger = `${xaria.update.message.from.id} ${xaria.update.message.from.first_name} ${xaria.message.text}`
  logger.info(defaultLogger)
  xaria.telegram.sendMessage(channelId, defaultLogger)
}

bot.start( xaria =>{
  
  defaultLogger()
  
  xaria.replyWithHTML(`Hola! <b><a href='tg://user?id=${xaria.update.message.from.id}'>${xaria.update.message.from.first_name}</a></b> 

I'm ${xaria.botInfo.first_name} a simple<i> Nodejs </i> Lyrics bot.`)
})


bot.help( xaria =>{  
  
  let defaultLogger = `${xaria.update.message.from.id} ${xaria.update.message.from.first_name} ${xaria.message.text}`
  
  xaria.telegram.sendMessage(channelId, defaultLogger)
  logger.info(defaultLogger)
  xaria.replyWithHTML(`I'm <b>${xaria.botInfo.first_name}</b>

A simple lyrics bot made by using <b>Telegraf and GENIUS</b>

Send me song name :) I'll search it on genius and If I got any lyrics I'll send it to u :D

Join <b> @CatBio </b>
`)
})

bot.command(commands.rickRoll, xaria => {
  xaria.replyWithAnimation('https://tenor.com/bEWOf.gif')
  xaria.telegram.sendMessage(channelId,`${xaria.update.message.from.id} ${xaria.update.message.from.first_name} Rickrolled`)
  logger.info(`${xaria.update.message.from.id} ${xaria.update.message.from.first_name} Rickrolled`)
})

bot.command(commands.webPage, xaria => {
  xaria.reply(`${config.web ? config.web: 'No Website'}`)
  xaria.telegram.sendMessage(channelId,`${xaria.update.message.from.id} ${xaria.update.message.from.first_name} ${config.web ? config.web : 'No Website'}`)
  logger.info(`${xaria.update.message.from.id} ${xaria.update.message.from.first_name} ${config.web ? config.web : 'No Website'}`)
})

bot.on('message', async xaria =>{

  if(xaria.message.text){
    if(xaria.message.text.startsWith('/')){
    const cmds = ['help','start', commands.rickRoll , commands.webPage]
    for(let i = 0 ; i < cmds.length ; i++){
      if(xaria.message.text !== `/${cmds[i]}`){
        xaria.reply(`I can't understand what you tryin to say :(`)
        return;
      }
    }
  }

  let defaultLogger = `${xaria.update.message.from.id} ${xaria.update.message.from.first_name} ${xaria.message.text}`
  logger.info(defaultLogger)

  xaria.telegram.sendMessage(channelId , defaultLogger)

  if(!xaria.message.text.startsWith('/')){
    try{
      const searches = await Client.songs.search(xaria.message.text)
      
      // Available in future
      // for(let i = 0 ; i < 5 ; i++ ){
      //   logger.info(JSON.stringify(searches[i].raw.full_title))
      // }

      const firstSong = searches[0];
      const lyrics = await firstSong.lyrics();
      
      const splitLyrics = async index => {
      const longLyrics = [lyrics.substring(0,index),lyrics.substring(index,lyrics.length + 1)]
      await xaria.replyWithHTML(`<b>${firstSong.raw.full_title}</b>

<b><i>${firstSong.raw.primary_artist.name}</i></b>

<code>${ longLyrics[0] } </code>`)


      await xaria.replyWithHTML(`<code>${ longLyrics[1] } </code>`)
      }
      // Logger
      logger.info(`${defaultLogger} ${firstSong.raw.full_title}`)

      xaria.telegram.sendMessage(channelId,`${defaultLogger} ${firstSong.raw.full_title}`)

      if(lyrics.length > 4096){

        if(lyrics.substring(0,4000).endsWith(" ")){
          splitLyrics(4000)
        }else{
          for(let i = 4000 ; i < 4020 ; i++){
            if(lyrics.substring(0,i).endsWith(" ")){
              splitLyrics(i)
              return;
            }
          }
        }

        

      }else{
        xaria.replyWithHTML(`<b>${firstSong.raw.full_title}</b>

<b><i>${firstSong.raw.primary_artist.name}</i></b>

<code>${ lyrics } </code>`);
      }
      
    }catch(err){
      if(err){
        xaria.reply(`${err}`) // if you use err without template literals. bot will return {} without any value
        xaria.telegram.sendMessage(channelId,`${defaultLogger} ${err}`)
        logger.error(`${defaultLogger} ${err}`)
      }
    }
  }
  }else{
    xaria.reply(`I can't understand what you tryin to say :(`)
  }

})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

// Reading respect ++
// btw don't steal ma code! mom ... he/she stole ma code :( 