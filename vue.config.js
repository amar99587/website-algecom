const { defineConfig } = require('@vue/cli-service');
const fs = require('fs');

module.exports = defineConfig({
  publicPath: '/algecom/', // 👈 VERY IMPORTANT for GitHub Pages
  transpileDependencies: true,
  devServer: {
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem'),
    },
    port: 8080,
  },
});
