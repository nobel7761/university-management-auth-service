import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorlogger, logger } from './shared/logger';
import { Server } from 'http';
import { RedisClient } from './shared/redis';

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await RedisClient.connect();
    await mongoose.connect(config.database_url as string);
    logger.info(`🛢   Database is connected successfully`);

    server = app.listen(config.port, () => {
      logger.info(`Application  listening on port ${config.port}`);
    });
  } catch (err) {
    errorlogger.error('Failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

//!this SIGTERM means signal termination. sometimes server may close for any reason. On the closing time we want a signal when the server was closed. this is why we are using it.
process.on('SIGTERM', () => {
  logger.info('SIGTERM  is received');
  if (server) {
    server.close();
  }
});
