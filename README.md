![LyricsBot](https://divrk.pages.dev/img/lyricsbot.png)

## Telegram LyricsBot written in nodejs

### Features

- Based on Genius API ( World's biggest lyrics site )
- Simple and Fast 
- Simple deployment
- Fully customisable (If you know code editing)

### ToDo

- [x] Database support
- [x] Automatic Commands
- [x] Logging system on Telegram channel
- [ ] Web page with user stats
- [ ] Blacklist
- [ ] Youtube and Spotify(Song url)
- [ ] Error loggin system
- [ ] Random welcome message
- [ ] Search results


### Deploy on heroku 🤷🏻 ( Everyone's choice )

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/divrk/LyricsBot)

### Run locally

- Fork this repo and rename ```./bot/sample.env``` file to ```.env``` and fill ```BOT_TOKEN``` , ```GENIUS``` , ```CHANNEL_ID``` , ```URL``` , ```USERNAME``` , ```DETAKEY```(for database)  and skip  first step.
- Y you tryin to deploy by ya own . Just deploy it on *heroku* 

#### Without docker

**Clone this repo**

```
git clone https://github.com/divrk/LyricsBot
```

**Goto main directory**

```
cd LyricsBot
```

**Install modules**

```
npm i
```
**Run bot.js**

```
node bot/bot.js
```
#### With docker

**Clone this repo**

```
git clone https://github.com/divrk/LyricsBot
```

**Goto main directory**

```
cd LyricsBot
```
**Create docker container**

```
sudo docker build . -t lyricsbot
```

**Run container**

```
sudo docker run lyricsbot
```
### Thanks

- [Telegraf](https://telegraf.js.org)
- Me and ma brain (Crying noob)
- [Deta.sh](https://deta.sh)
- [genius-lyrics(module)](https://www.npmjs.com/package/genius-lyrics)
- [Rick Astley ( to be part of my bot )](https://youtu.be/dQw4w9WgXcQ)
- You ( for ur star )


<a href="https://www.buymeacoffee.com/d4rk"><img height="40px" src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=d4rk&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"></a>



Discord bot under development. Btw coffee will help it to release it soon😑🤷
