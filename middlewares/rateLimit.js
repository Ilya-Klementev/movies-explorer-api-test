const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: 'Превышен лимит запросов. Пожалуйста, повторите позже.',
  headers: true,
});

module.exports = limiter;
