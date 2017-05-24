import path from 'path';

import webpack from 'webpack';

// Webpack plugins
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

export default webpackConfig;

function webpackConfig(options) {
    const isBuild = !!options.build;
    const isDev = !!options.dev;
    const isDevBuild = (isBuild && isDev);
    const isTest = !!options.test;
    const isProd = !!options.prod;
    const exclude = /node_modules/;
    const port = 9000;
    const host = '0.0.0.0';

    const config = {};

    /**
     * Entry
     * Should be an empty object if it's generating a test build
     */
    config.entry = isTest ? {} : {
        app: './src/app.js'
    };

    /**
     * Should be an empty object if it's generating a test build
     */
    config.output = isTest ? {} : {
        path: __dirname + '/dist',
        publicPath: isProd ? '/' : 'http://localhost:' + port + '/',
        filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
        chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
    };

    /**
     * Devtool
     * Type of sourcemap to use per build type
     */
    config.devtool = 'eval-source-map';

    if (isTest) {
        config.devtool = 'inline-source-map';
    }

    if (isProd) {
        config.devtool = 'source-map';
    }

    /**
     * Loaders
     */
    config.module = {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude
        }, {
            test: /\.scss$/,
            loader: isTest ? 'null' : ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['style-loader', 'css-loader', 'postcss-loader'] })
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader',
            exclude
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }]
    };

    config.plugins = plugins();

    /**
     * Dev server configuration
     */
    config.devServer = {
        contentBase: './src/assets',
        stats: 'minimal',
        port: port,
        host: host
    };

    function plugins() {
        const plugins = [
            new ProgressBarPlugin()
        ];

        const notTestPlugins = [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                inject: 'body'
            }),
            new ExtractTextPlugin({ filename: '[name].[hash].css', disable: !isProd, allChunks: true })
        ];

        const prodPlugins = [
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin(),
            new CopyWebpackPlugin([{
                from: __dirname + '/src/assets'
            }])
        ];

        return [...plugins, ...notTestPlugins];
    }

    return config;
}