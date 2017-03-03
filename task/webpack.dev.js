const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlStringReplace = require('html-string-replace-webpack-plugin');

const DallWebpackConfig = require('./webpack.dall');
const helpers = require('./helper');

module.exports = function () {
    return {
        entry: {
            app: [path.resolve(__dirname, '../src/config/polyfills'),path.resolve(__dirname, '../src/main.jit')]
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            publicPath: 'http://localhost:3000/',
            filename: 'index.js'
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [{
                    test: /\.ts$/,
                    loaders: [{
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: path.resolve(__dirname, '../tsconfig.json'),
                        }
                    }, 'angular2-template-loader']
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    exclude: path.resolve(__dirname, '../src/index.html')
                },
                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                    loader: 'file-loader?name=assets/images/[name].[ext]'
                },
                {
                    test: /\.css$/,
                    exclude: path.resolve(__dirname, '../src/app'),
                    loader: 'style-loader!css-loader'
                },
                {
                    test: /\.css$/,
                    include: path.resolve(__dirname, '../src/app'),
                    loader: 'raw-loader'
                }
            ]
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: '.',
                manifest: require('../dist/dall/polyfills-manifest.json')
            }),
            new webpack.DllReferencePlugin({
                context: '.',
                manifest: require('../dist/dall/vendor-manifest.json')
            }),
            new HtmlWebpackPlugin({
                filename: 'dist/index.html',
                template: path.resolve(__dirname, '../src/index.html')
            }),
            new AddAssetHtmlPlugin([{
                    filepath: 'dist/dall/polyfills.dll.js',
                    includeSourcemap: false
                },
                {
                    filepath: 'dist/dall/vendor.dll.js',
                    includeSourcemap: false
                }
            ])
        ],
        devServer: {
            historyApiFallback: true,
            inline: true,
            stats: {
                modules: false,
                cached: false,
                colors: true,
                chunk: false
            },
            port: 3000,
            host: '0.0.0.0'
        }
    };
}