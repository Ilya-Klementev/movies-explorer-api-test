const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isEmail(v),
      },
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minLength: [2, 'Минимальная длина поля "Имя"- 2'],
      maxLength: [30, 'Максимальная длина поля "Имя"- 30'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
