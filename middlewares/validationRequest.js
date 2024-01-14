const { Joi } = require('celebrate');

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

module.exports = { validationRequestSignin, validationRequestSignup };
