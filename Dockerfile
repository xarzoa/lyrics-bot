FROM node:14

WORKDIR /src/path/app

COPY package*.json ./

RUN npm install

COPY . .

ARG EnvironmentVariable

EXPOSE 8080

CMD ["node" , "bot/bot.js"]