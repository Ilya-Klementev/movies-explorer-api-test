const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const moviesController = require('../controllers/movies');
const { regEx } = require('../utils/regEx');

router.get('/', moviesController.readAllMovies);

router.post(
  '/',
  celebrate({
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
  }),
  moviesController.createMovie,
);

router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex().required(),
    }),
  }),
  moviesController.deleteMovie,
);

module.exports = router;
