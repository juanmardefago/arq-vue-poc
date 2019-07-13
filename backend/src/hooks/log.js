// A hook that logs service method before, after and error
// See https://github.com/winstonjs/winston for documentation
// about the logger.
const logger = require('../logger');
const util = require('util');

module.exports = function () {
  return context => {
    logger.info(`${context.type} app.service('${context.path}').${context.method}()`);

    if(typeof context.toJSON === 'function' && logger.level === 'debug') {
      logger.debug('Hook Context', util.inspect(context, {colors: false}));
    }

    if(context.error && !context.result) {
      logger.error(context.error.stack);
    }
  };
};
