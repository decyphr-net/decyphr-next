const withFonts = require("next-fonts");

module.exports = withFonts({
  webpack(config, options) {
    return config;
  },

  env: {
    API: process.env.API,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  },
});
