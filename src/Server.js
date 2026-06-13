const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
    '/data',
    createProxyMiddleware({
        target: 'https://jwt-cdk-1.onrender.com',
        changeOrigin: true,
        pathRewrite: {
            '^/data': '',
        },
    })
);

app.listen(5000, () => {
    console.log('Proxy server running on port 5000');
});