const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://dev-6331104.okta.com',
      changeOrigin: true,
    })
  );
};
