// webpack.config.js

const path = require('path');

module.exports = {
  // ... autres configurations
  resolve: {
    fallback: {
      "https": require.resolve("https-browserify"),
      "http": require.resolve("stream-http") // Ajout pour les autres modules liés si nécessaire
    }
  },
  // ... autres configurations
};
