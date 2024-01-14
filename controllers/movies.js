const movieModel = require('../models/movies');
const NotFoundError = require('../middlewares/errors/NotFoundError');
const CastError = require('../middlewares/errors/CastError');
const ValidationError = require('../middlewares/errors/ValidationError');
const ForbiddenError = require('../middlewares/errors/ForbiddenError');

function readAllMovies(req, res, next) {
  return movieModel.find()
    .then((movies) => res.status(200).send(movies))
    .catch(next);
}

function createMovie(req, res, next) {
  const movieData = req.body;
  movieData.owner = req.user._id;

  return movieModel.create(movieData)
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные при создании фильма'));
      }
      return next(err);
    });
}

function deleteMovie(req, res, next) {
  movieModel.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Фильм не найден'));
      }

      if (req.user._id !== movie.owner.toString()) {
        return next(new ForbiddenError('Вы не владелец фильма'));
      }

      return movieModel.deleteOne(movie)
        .then(() => {
          res.status(200).send({ message: `Фильм ${movie.nameRU} успешно удален` });
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new CastError('Переданы некорректные данные для удаления фильма'));
          }
          return next(err);
        });
    })
    .catch(next);
}

module.exports = {
  readAllMovies,
  createMovie,
  deleteMovie,
};
