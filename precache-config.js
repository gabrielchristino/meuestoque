var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
    navigateFallback: '/index.html',
    navigateFallbackWhitelist: [],
    stripePrefix: 'dist/estoque',
    root: 'dist/estoque/',
    plugins:[
        new SWPrecacheWebpackPlugin({
            cacheId: 'ng-pwa',
            filename: '/dist/service-worker.js',
            staticFileGlobs: [
                'dist/estoque/index.html',
                'dist/estoque/**.js',
                'dist/estoque/**.css',
                'dist/**.css',
                'dist/estoque/**.html',
                'dist/ngsw-worker.js'
            ],

        })
    ],
    stripePrefix: 'dist/estoque/assets',
    mergeStaticsConfig: true
};
