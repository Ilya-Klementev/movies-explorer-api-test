const router = require('express').Router();
const { celebrate } = require('celebrate');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const NotFoundError = require('../middlewares/errors/NotFoundError');
const middlewareAuth = require('../middlewares/auth');
const userController = require('../controllers/users');
const constants = require('../utils/constants');
const { validationRequestSignin, validationRequestSignup } = require('../middlewares/validationRequest');

router.get('/', (req, res) => { res.redirect('/signin'); });

router.post('/signin', celebrate(validationRequestSignin), userController.login);
router.post('/signup', celebrate(validationRequestSignup), userController.createUser);

router.use(middlewareAuth);

router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);
router.get('/signout', userController.signout);

router.all('*', (req, res, next) => {
  next(new NotFoundError(constants.errorMessages.pageNotFound));
});

module.exports = router;
