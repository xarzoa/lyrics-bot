const { format, createLogger, transports } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.label({ label: '[log]' }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console()
  ]
});

module.exports = logger
