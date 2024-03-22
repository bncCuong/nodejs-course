/** @format */

const dev = {
  host: process.env.DEV_APP_HOST || "localhost",
  port: process.env.DEV_APP_PORT || 3000,
  name: process.env.DEV_APP_NAME || "nodejs",
};

const prod = {
  host: process.env.PROD_APP_HOST || "localhost",
  port: process.env.PROD_APP_PORT || 3000,
  name: process.env.PROD_APP_NAME || "nodejs-prod",
};

const config = { dev, prod };
const env = process.env.NODE_ENV || "dev";

module.exports = config[env];
