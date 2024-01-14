const express = require('express');
const helmet = require('helmet');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const { errors, celebrate } = require('celebrate');

const { PORT = 3000, DB_URL } = process.env;
const mongoose = require('mongoose');

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
});
const { requestLogger, errorLogger } = require('./middlewares/logger');
const middlewareAuth = require('./middlewares/auth');
const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const userController = require('./controllers/users');
const { handleError } = require('./middlewares/errors/handleError');
const NotFoundError = require('./middlewares/errors/NotFoundError');
const { validationRequestSignin, validationRequestSignup } = require('./middlewares/validationRequest');
const cors = require('./middlewares/cors');

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

app.get('/', (req, res) => { res.redirect('/signin'); });

app.post('/signin', celebrate(validationRequestSignin), userController.login);
app.post('/signup', celebrate(validationRequestSignup), userController.createUser);

app.use(middlewareAuth);

app.use('/users', usersRoutes);
app.use('/movies', moviesRoutes);

app.all('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
