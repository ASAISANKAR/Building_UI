const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

    const target = `${process.env.REACT_APP_DEV_API}`;
    app.use(
    '/data',
        createProxyMiddleware({
            target: target,
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/data': '',
            },
            onProxyReq: function (proxyReq, req, res) {
                console.log(
                    '[PROXY] building-api:',
                    req.method,
                    req.path,
                    '->',
                    proxyReq.path,
                );
            },
            onError: function (err, req, res) {
                console.error('[PROXY ERROR] building-api:', err.message);
            },
        })
    )

}