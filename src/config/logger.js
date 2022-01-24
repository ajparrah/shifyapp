import pino from 'pino-http';
import pinoPretty from 'pino-pretty';

const pinoLogger = pino(
  pinoPretty({
    translateTime: `UTC:yyyy-mm-dd'T'HH:MM:ss.l`,
    colorize: true,
    singleLine: true,
  })
);

export class Logger {
  static error(options) {
    if (process.env.NODE_ENV === 'test') return;

    const { msg, details } = options;
    if (msg && details) {
      pinoLogger.logger.error(details, msg);
      return;
    }

    if (msg) {
      pinoLogger.logger.error(msg);
      return;
    }

    if (details) {
      pinoLogger.logger.error(details);
      return;
    }
  }

  static info(msg) {
    if (process.env.NODE_ENV === 'test') return;
    pinoLogger.logger.info(msg);
  }
}
export default pinoLogger;
