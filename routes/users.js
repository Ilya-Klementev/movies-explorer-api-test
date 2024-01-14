const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userController = require('../controllers/users');

router.get('/me', userController.readMe);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }),
  userController.patchProfile,
);

module.exports = router;
