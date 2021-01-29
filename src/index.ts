import dotenv from 'dotenv';
import logger from './helpers/logger';
import createServer from './server';
dotenv.config();

const port = process.env.PORT || 5000;

const server = createServer();

server.listen(port, () =>
  logger.info(`
  ################################################
  🔥  Server listening on port: ${port} 🔥
  ################################################
`)
);
