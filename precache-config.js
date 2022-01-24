var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
    navigateFallback: '/index.html',
    navigateFallbackWhitelist: [],
    stripePrefix: 'dist',
    root: 'dist/',
    plugins:[
        new SWPrecacheWebpackPlugin({
            cacheId: 'ng-pwa',
            filename: '/dist/service-worker.js',
            staticFileGlobs: [
                'dist/estoque/index.html',
                'dist/estoque/**.js',
                'dist/estoque/**.css',
                'dist/estoque/**.html',
                'dist/**.css',
                'dist/**.js',
                'dist/**.html',
            ],

        })
    ],
    stripePrefix: 'dist/estoque/assets',
    mergeStaticsConfig: true
};
