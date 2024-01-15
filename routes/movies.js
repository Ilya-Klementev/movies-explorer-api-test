const router = require('express').Router();
const { celebrate } = require('celebrate');
const moviesController = require('../controllers/movies');
const {
  validationRequestCreateMovie,
  validationRequestDeleteMovie,
} = require('../middlewares/validationRequest');

router.get('/', moviesController.readAllMovies);
router.post(
  '/',
  celebrate(validationRequestCreateMovie),
  moviesController.createMovie,
);

router.delete(
  '/:movieId',
  celebrate(validationRequestDeleteMovie),
  moviesController.deleteMovie,
);

module.exports = router;
