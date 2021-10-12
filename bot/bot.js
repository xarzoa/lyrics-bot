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

const defaultLogger = log => {
  // oh lol console logging looklike shit
  const logTemplate = `${log.update.message.from.id}  [${log.update.message.from.first_name}](tg://user?id=${log.update.message.from.id})  ${log.message.text}`
  logger.info(logTemplate)
  log.telegram.sendMessage(channelId, logTemplate,{parse_mode: 'markdown'})
}


bot.start( xaria =>{
  defaultLogger(xaria)
  xaria.replyWithHTML(`Hola! <b><a href='tg://user?id=${xaria.update.message.from.id}'>${xaria.update.message.from.first_name}</a></b> 

I'm ${xaria.botInfo.first_name} a simple<i> Nodejs </i> Lyrics bot.`)
})


bot.help( xaria =>{
  defaultLogger(xaria)
  xaria.replyWithHTML(`I'm <b>${xaria.botInfo.first_name}</b>

A simple lyrics bot made by using <b>Telegraf and GENIUS</b>

Send me song name :) I'll search it on genius and If I got any lyrics I'll send it to u :D

Join <b> @CatBio </b>
`)
})


bot.command(commands.rickRoll, xaria => {
  defaultLogger(xaria)
  xaria.replyWithAnimation('https://tenor.com/bEWOf.gif')
})


bot.command(commands.webPage, xaria => {
  defaultLogger(xaria)
  xaria.reply(`${config.web ? config.web: 'No Website'}`)
})

bot.on('message', async xaria =>{
  defaultLogger(xaria)
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