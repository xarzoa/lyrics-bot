import { Bot, InlineKeyboard } from 'grammy';
import songlyrics from 'songlyrics';
import { config } from 'dotenv';
config({ path: './bot/.env' });

const botToken = process.env.BOT_TOKEN || console.error('BOT_TOKEN not set');

const bot = new Bot(botToken);

await bot.api.setMyCommands([
  { command: 'start', description: 'Start the bot' },
  { command: 'help', description: 'Show help text' },
  { command: 'settings', description: 'Open settings' },
]);

console.info(`Bot started!`);

// songlyrics
//   .default('love me like you do')
//   .then((lyrics) => console.log(lyrics))
//   .catch(console.warn);

bot.command('start', (x) => {
  let keyBoard = new InlineKeyboard()
    .url('Developer', 't.me/xarzoa')
    .url('Support', 't.me/helpcathug')
    .row();

  x.reply(
    `Hello! I'm <b>${x.me.first_name}</b>. Send me song name. I'll send lyrics for ya :)`,
    {
      reply_to_message_id: x.msg.message_id,
      parse_mode: 'HTML',
      reply_markup: keyBoard,
    }
  );
});

bot.command('help', (x) => {
  x.reply(
    `Just send me song name. Advanced search features coming sooooon...`,
    {
      reply_to_message_id: x.msg.message_id,
      parse_mode: 'HTML'
    }
  );
});

bot.on('message:text', async (x) => {
  bot.api.setChatAction(x.msg.chat.id, 'typing');
  let term = x.msg.text;
  await songlyrics.default(term).then((song) => {
    const keyBoard = new InlineKeyboard().url(
      `song.source.name`,
      song.source.link
    );
    x.reply(`<code>${song.lyrics}</code>`, {
      reply_to_message_id: x.msg.message_id,
      parse_mode: 'HTML',
      reply_markup: keyBoard,
    });
  }).catch( e => {
    x.reply(`<b>${e}</b>`, {
      reply_to_message_id: x.msg.message_id,
      parse_mode: 'HTML'
    });
  });
});

bot.start();
