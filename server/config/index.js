/* eslint-disable global-require */
import _ from 'lodash';

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3030,
	appId: "wx926e5c3031482d64",
	secret: "248630d1718eab25774b5414f944d0f8",
	domain: `http://localhost:${process.env.PORT || 3030}`,
	db_user: "qs-admin",
	db_pass: "qs-admin-pass"
};

if (config.env == "production") {
	config.domain = "http://qs-admin-api.lefttjs.com"
}

config['sale_callback'] = `${config.domain}/sale/activate/callback`

export default _.extend(config, require(`./${config.env}`).default);
