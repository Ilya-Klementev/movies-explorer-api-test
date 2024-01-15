const express = require('express');
const helmet = require('helmet');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { PORT = 3000, DB_URL } = process.env;
const mongoose = require('mongoose');

const app = express();
const limiter = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleError } = require('./middlewares/errors/handleError');
const cors = require('./middlewares/cors');
const appRouter = require('./routes/index');

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(limiter);
app.use(cors);

mongoose.connect(DB_URL || 'mongodb://127.0.0.1:27017/bitfilmsdb')
  .then(() => {
    console.log('mongoDB connected');
  });

app.use(requestLogger);

app.use(appRouter);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
