const withFonts = require("next-fonts");

module.exports = withFonts({
  webpack(config, options) {
    return config;
  },

  env: {
    API: process.env.API,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_MANAGEMENT_API_ENDPOINT: process.env.AUTH0_MANAGEMENT_API_ENDPOINT,
    AUTH0_MANAGEMENT_API_TOKEN: process.env.AUTH0_MANAGEMENT_API_TOKEN,
  },
});
