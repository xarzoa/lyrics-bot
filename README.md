## Telegram LyricsBot written in nodejs

### Features

- Powerful logging on channel and console
- Based on Genius API ( World's biggest lyrics site )
- Simple and Fast 
- Simple deployment
- Fully customisable (If you know code editing)
- You don't need to add commands manually


### Deploy on railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2Fdivrk%2FLyricsBot&envs=BOT_TOKEN%2CGENIUS%2CCHANNEL_ID&BOT_TOKENDesc=Telegram+bot+token+%28%40Botfather%29&GENIUSDesc=Genius+client+secret+%28+https%3A%2F%2Fgenius.com+%29&CHANNEL_IDDesc=Logging+channel+Id&referralCode=d4rk)

### Run locally

- Clone repo and create ```.env``` file and add ```BOT_TOKEN``` , ```GENIUS``` , ```CHANNEL_ID``` and skip  first step.
- Y you trin to deploy by ya own . Just deploy it on railway🚞

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
node bot.js
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

- Telegraf
- Me
- My brain ( Bruh )
- Replit
- Rick Astley ( to be part of my bot )
- You ( for your star )