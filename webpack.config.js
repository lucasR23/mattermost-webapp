// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/* eslint-disable no-console, no-process-env */

const childProcess = require('child_process');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');


const NPM_TARGET = process.env.npm_lifecycle_event;

const targetIsRun = NPM_TARGET?.startsWith('run');
const targetIsTest = NPM_TARGET === 'test';
const targetIsStats = NPM_TARGET === 'stats';
const targetIsDevServer = NPM_TARGET?.startsWith('dev-server');

const DEV = targetIsRun || targetIsStats || targetIsDevServer;

const STANDARD_EXCLUDE = [
    path.join(__dirname, 'node_modules'),
];

var MYSTATS = {

    // Add asset Information
    assets: false,

    // Sort assets by a field
    assetsSort: '',

    // Add information about cached (not built) modules
    cached: true,

    // Show cached assets (setting this to `false` only shows emitted files)
    cachedAssets: true,

    // Add children information
    children: true,

    // Add chunk information (setting this to `false` allows for a less verbose output)
    chunks: true,

    // Add built modules information to chunk information
    chunkModules: true,

    // Add the origins of chunks and chunk merging info
    chunkOrigins: true,

    // Sort the chunks by a field
    chunksSort: '',

    // `webpack --colors` equivalent
    colors: true,

    // Display the distance from the entry point for each module
    depth: true,

    // Display the entry points with the corresponding bundles
    entrypoints: true,

    // Add errors
    errors: true,

    // Add details to errors (like resolving log)
    errorDetails: true,

    // Exclude modules which match one of the given strings or regular expressions
    exclude: [],

    // Add the hash of the compilation
    hash: true,

    // Add built modules information
    modules: false,

    // Sort the modules by a field
    modulesSort: '!size',

    // Show performance hint when file size exceeds `performance.maxAssetSize`
    performance: true,

    // Show the exports of the modules
    providedExports: true,

    // Add public path information
    publicPath: true,

    // Add information about the reasons why modules are included
    reasons: true,

    // Add the source code of modules
    source: true,

    // Add timing information
    timings: true,

    // Show which exports of a module are used
    usedExports: true,

    // Add webpack version information
    version: true,

    // Add warnings
    warnings: true,

    // Filter warnings to be shown (since webpack 2.4.0),
    // can be a String, Regexp, a function getting the warning and returning a boolean
    // or an Array of a combination of the above. First match wins.
    warningsFilter: '',
};

var config = {
    entry: ['./index.tsx'],
    output: {
        publicPath: '',
        filename: 'tes-int-matter.js',
        library: {
            name: 'tes-int-matter',
            type: 'umd',
        },
        globalObject: 'this',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)?$/,
                exclude: STANDARD_EXCLUDE,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,

                        // Babel configuration is in .babelrc because jest requires it to be there.
                    },
                },
            },
            {
                type: 'javascript/auto',
                test: /\.json$/,
                include: [
                    path.resolve(__dirname, 'i18n'),
                ],
                exclude: [/en\.json$/],
                use: [
                    {
                        loader: 'file-loader?name=i18n/[name].[ext]',
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [

                    // DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: ['sass'],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [

                    // DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.(png|eot|tiff|svg|woff2|woff|ttf|gif|mp3|jpg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'files/[contenthash].[ext]',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {},
                    },
                ],
            },
            {
                test: /\.apng$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'files/[contenthash].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname),
        ],
        alias: {
            'mattermost-redux/test': 'packages/mattermost-redux/test',
            'mattermost-redux': 'packages/mattermost-redux/src',
            reselect: 'packages/reselect/src',
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        fallback: {
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            buffer: require.resolve('buffer/'),
        },
    },
    performance: {
        hints: 'warning',
    },
    target: 'web',
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.DefinePlugin({
            COMMIT_HASH: JSON.stringify(childProcess.execSync('git rev-parse HEAD || echo dev').toString()),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'images/emoji', to: 'emoji'},
                {from: 'images/img_trans.gif', to: 'images'},
                {from: 'images/logo-email.png', to: 'images'},
                {from: 'images/circles.png', to: 'images'},
                {from: 'images/favicon', to: 'images/favicon'},
                {from: 'images/appIcons.png', to: 'images'},
                {from: 'images/warning.png', to: 'images'},
                {from: 'images/logo-email.png', to: 'images'},
                {from: 'images/browser-icons', to: 'images/browser-icons'},
                {from: 'images/cloud', to: 'images'},
                {from: 'images/welcome_illustration_new.png', to: 'images'},
                {from: 'images/logo_email_blue.png', to: 'images'},
                {from: 'images/logo_email_dark.png', to: 'images'},
                {from: 'images/logo_email_gray.png', to: 'images'},
                {from: 'images/forgot_password_illustration.png', to: 'images'},
                {from: 'images/invite_illustration.png', to: 'images'},
                {from: 'images/channel_icon.png', to: 'images'},
                {from: 'images/add_payment_method.png', to: 'images'},
                {from: 'images/add_subscription.png', to: 'images'},
                {from: 'images/c_avatar.png', to: 'images'},
                {from: 'images/c_download.png', to: 'images'},
                {from: 'images/c_socket.png', to: 'images'},
                {from: 'images/admin-onboarding-background.jpg', to: 'images'},
                {from: 'images/payment-method-illustration.png', to: 'images'},
                {from: 'images/cloud-laptop.png', to: 'images'},
                {from: 'images/cloud-laptop-error.png', to: 'images'},
                {from: 'images/cloud-laptop-warning.png', to: 'images'},
                {from: 'images/cloud-upgrade-person-hand-to-face.png', to: 'images'},
            ],
        }),
    ],
};

if (!targetIsStats) {
    config.stats = MYSTATS;
}

if (DEV) {
    // Development mode configuration
    config.mode = 'development';
    config.devtool = 'eval-cheap-module-source-map';
} else {
    // Production mode configuration
    config.mode = 'production';
    config.devtool = 'source-map';
}

const env = {};
if (DEV) {
    env.RUDDER_KEY = JSON.stringify(process.env.RUDDER_KEY || '');
    env.RUDDER_DATAPLANE_URL = JSON.stringify(process.env.RUDDER_DATAPLANE_URL || '');
    if (process.env.MM_LIVE_RELOAD) {
        config.plugins.push(new LiveReloadPlugin());
    }
} else {
    env.NODE_ENV = JSON.stringify('production');
    env.RUDDER_KEY = JSON.stringify(process.env.RUDDER_KEY || '');
    env.RUDDER_DATAPLANE_URL = JSON.stringify(process.env.RUDDER_DATAPLANE_URL || '');
}

config.plugins.push(new webpack.DefinePlugin({
    'process.env': env,
}));

// Test mode configuration
if (targetIsTest) {
    config.entry = ['./root.tsx'];
    config.target = 'node';
    config.externals = [nodeExternals()];
}

if (targetIsDevServer) {
    config = {
        ...config,
        devtool: 'eval-cheap-module-source-map',
        devServer: {
            liveReload: true,
            proxy: [{
                context: () => true,
                bypass(req) {
                    if (req.url.indexOf('/api') === 0 ||
                        req.url.indexOf('/plugins') === 0 ||
                        req.url.indexOf('/static/plugins/') === 0 ||
                        req.url.indexOf('/sockjs-node/') !== -1) {
                        return null; // send through proxy to the server
                    }
                    if (req.url.indexOf('/static/') === 0) {
                        return path; // return the webpacked asset
                    }

                    // redirect (root, team routes, etc)
                    return '/static/root.html';
                },
                logLevel: 'silent',
                target: 'http://localhost:8065',
                xfwd: true,
                ws: true,
            }],
            port: 9005,
            devMiddleware: {
                writeToDisk: false,
            },
        },
        performance: false,
        optimization: {
            ...config.optimization,
            splitChunks: false,
        },
        resolve: {
            ...config.resolve,
            alias: {
                ...config.resolve.alias,
                'react-dom': '@hot-loader/react-dom',
            },
        },
    };
}

// Export PRODUCTION_PERF_DEBUG=1 when running webpack to enable support for the react profiler
// even while generating production code. (Performance testing development code is typically
// not helpful.)
// See https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html and
// https://gist.github.com/bvaughn/25e6233aeb1b4f0cdb8d8366e54a3977
if (process.env.PRODUCTION_PERF_DEBUG) {
    console.log('Enabling production performance debug settings'); //eslint-disable-line no-console
    config.resolve.alias['react-dom'] = 'react-dom/profiling';
    config.resolve.alias['schedule/tracing'] = 'schedule/tracing-profiling';
    config.optimization = {

        // Skip minification to make the profiled data more useful.
        minimize: false,
    };
}

module.exports = config;
