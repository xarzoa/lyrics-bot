## Telegram LyricsBot written in nodejs

### Features

- Powerful logging on channel and console
- Based on Genius API ( World's biggest lyrics site )
- Simple and Fast 
- Simple deployment
- Fully customisable (If you know code editing)
- You don't need to add commands manually
- Beautiful (Bullshit, it sus) webpage with stats(stats coming soon...)

### Deploy on railway (recommended)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2Fdivrk%2FLyricsBot&envs=BOT_TOKEN%2CGENIUS%2CCHANNEL_ID%2CURL%2CUSERNAME%2CPORT&optionalEnvs=URL%2CUSERNAME&BOT_TOKENDesc=Telegram+bot+token+%28%40BotFather%29&GENIUSDesc=Genius+client+secret+%2C+ID+idk+%F0%9F%A4%B7+%28+https%3A%2F%2Fgenius.com%29&CHANNEL_IDDesc=Log+channel+ID&URLDesc=railway+app+url+or+ip+address+of+your+vps+or+your+added+custom+domain.+%23+Optional+%28If+you+need+website.+Fill+this+%29&USERNAMEDesc=Username+of+your+bot,+if+you+need+website+you+must+fill+this+too&PORTDesc=Don%27t+change+this&PORTDefault=3000&referralCode=d4rk)

### Run locally

- Fork this repo and rename ```./bot/sample.env``` file to ```.env``` and fill ```BOT_TOKEN``` , ```GENIUS``` , ```CHANNEL_ID``` , ```PORT```*don't change this* , ```URL``` , ```USERNAME```  and skip  first step.
- Y you tryin to deploy by ya own . Just deploy it on railway 🚞

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

- Telegraf
- Me
- My brain ( Bruh )
- Replit
- Rick Astley ( to be part of my bot )
- You ( for your star )


<a href="https://www.buymeacoffee.com/d4rk"><img height="40px" src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=d4rk&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"></a>



**[Discord bot](https://github.com/divrk/DiscordLyricsBot)[discontinued until 2023]**
