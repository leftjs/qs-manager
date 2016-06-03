/* eslint-disable global-require */
import _ from 'lodash';

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3030,
};

export default _.extend(config, require(`./${config.env}`).default);