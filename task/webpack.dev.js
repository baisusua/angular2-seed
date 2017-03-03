const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const DallWebpackConfig = require('./webpack.dall');
const helpers = require('./helper');

module.exports = function () {
    return {
        entry: {
            polyfills: path.resolve(__dirname, '../src/config/polyfills'),
            vendor: path.resolve(__dirname, '../src/config/vendor'),
            app: path.resolve(__dirname, '../src/main.jit')
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            publicPath: 'http://localhost:3000/',
            filename: '[name].js',
            chunkFilename: '[id].chunk.js'
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
                    loader: 'file-loader?name=assets/images/[name].[hash].[ext]'
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
                context: __dirname,
                manifest: require('../dall/polyfills-manifest.json')
            }, {
                context: __dirname,
                manifest: require('../dall/vendor-manifest.json')
            }),
            new CopyWebpackPlugin([{
                    from: path.resolve(__dirname, '../src/assets'),
                    to: 'assets'
                },
                {
                    from: path.resolve(__dirname, '../dall'),
                    to: 'dall'
                }
            ]),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                path.resolve(__dirname, './src'), // location of your src
                {} // a map of your routes 
            ),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['app', 'vendor', 'polyfills']
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(__dirname, '../src/index.html')
            })
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