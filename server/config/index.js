/* eslint-disable global-require */
import _ from 'lodash';

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3030,
	appId: "wx926e5c3031482d64",
	secret: "248630d1718eab25774b5414f944d0f8",
	callback: "http://qs-admin.lefttjs.com/users/login/wechat/callback"
};

var domain = `http://localhost:${config.port}`
if (config.env == "production") {
	domain = "http://qs-admin.lefttjs.com"
}

export default _.extend(config, {
	domain
},require(`./${config.env}`).default);
