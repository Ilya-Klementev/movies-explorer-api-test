const { Joi } = require('celebrate');
const { regEx } = require('../utils/regEx');

const validationRequestSignin = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const validationRequestSignup = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
};

const validationRequestCreateMovie = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().length(4),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regEx),
    trailerLink: Joi.string().required().pattern(regEx),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(regEx),
    movieId: Joi.number().required(),
  }),
};

const validationRequestDeleteMovie = {
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
};

module.exports = {
  validationRequestSignin,
  validationRequestSignup,
  validationRequestCreateMovie,
  validationRequestDeleteMovie,
};
