import express from 'express';
import pino from 'pino-http';
import pinoPretty from 'pino-pretty';
import routes from '../routes/index.js';

const app = express();
app.use(
  pino(
    pinoPretty({
      translateTime: `UTC:yyyy-mm-dd'T'HH:MM:ss.l`,
      colorize: true,
      singleLine: true,
    })
  )
);

const PORT = 3000;

app.use(routes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
