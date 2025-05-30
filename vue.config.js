const { defineConfig } = require('@vue/cli-service');
const fs = require('fs');

module.exports = defineConfig({
  base: '/website-algecom/',
  transpileDependencies: true,
  devServer: {
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem'),
    },
    port: 8080, // or whatever you like
  }
})
  
