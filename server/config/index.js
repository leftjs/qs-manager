/* eslint-disable global-require */
import _ from 'lodash';

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3030,
};

var domain = `http://localhost:${config.port}`
if (config.env == "production") {
	domain = "http://qs-admin.lefttjs.com"
}

export default _.extend(config, {
	domain
},require(`./${config.env}`).default);
