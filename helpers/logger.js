const { format, createLogger, transports } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.label({ label: '[my-label]' }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message} ${xaria.update.message.from.id} ${xaria.update.message.from.first_name}  ${xaria.message.text}`)
  ),
  transports: [
    new transports.Console()
  ]
});

module.exports = logger
