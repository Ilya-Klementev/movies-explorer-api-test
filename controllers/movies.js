const movieModel = require('../models/movies');
const NotFoundError = require('../middlewares/errors/NotFoundError');
const CastError = require('../middlewares/errors/CastError');
const ValidationError = require('../middlewares/errors/ValidationError');
const ForbiddenError = require('../middlewares/errors/ForbiddenError');
const constants = require('../utils/constants');

function readAllMovies(req, res, next) {
  return movieModel.find()
    .then((movies) => res.status(200).send(movies))
    .catch(next);
}

async function createMovie(req, res, next) {
  try {
    const movieData = req.body;
    movieData.owner = req.user._id;
    const movie = await movieModel.create(movieData);
    return res.status(201).send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError(constants.errorMessages.validationError));
    }
    return next(err);
  }
}

async function deleteMovie(req, res, next) {
  try {
    const movie = await movieModel.findById(req.params.movieId);

    if (!movie) {
      return next(new NotFoundError(constants.errorMessages.movieNotFound));
    }

    if (req.user._id !== movie.owner.toString()) {
      return next(new ForbiddenError(constants.errorMessages.notMovieOwner));
    }

    await movieModel.deleteOne(movie);

    return res.status(200).send({ message: constants.successMessages.movieDeleted });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new CastError(constants.errorMessages.invalidMovieDeletion));
    }
    return next(err);
  }
}

module.exports = {
  readAllMovies,
  createMovie,
  deleteMovie,
};
