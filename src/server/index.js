import express from 'express';
import pinoLogger, { Logger } from '../config/logger.js';
import routes from '../routes/index.js';

const app = express();
if (process.env.NODE_ENV !== 'test') {
  app.use(pinoLogger);
}

const PORT = process.env.PORT || 3300;

app.use(routes);

app.listen(PORT, () => {
  Logger.info(`App is running on port ${PORT}`);
});

export default app;
