const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const ngcWebpack = require('ngc-webpack');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = function () {
    return {
        entry: {
            polyfills: path.resolve(__dirname, '../src/config/polyfills'),
            vendor: path.resolve(__dirname, '../src/config/vendor.ts'),
            app: path.resolve(__dirname, '../src/main.jit')
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            publicPath: './',
            filename: '[name].[chunkhash:8].js'
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [{
                test: /\.ts$/,
                loaders: [{
                    loader: 'ng-router-loader',
                    options: {
                        loader: 'async-import',
                        genDir: path.resolve(__dirname, '../src/compiled'),
                        aot: false
                    }
                }, {
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: 'tsconfig.json'
                    }
                }, {
                    loader: 'angular2-template-loader'
                }],
                exclude: path.resolve(__dirname, '../src/index.html')
            }, {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: path.resolve(__dirname, '../src/index.html')
            }, {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/images/[name].[hash:8].[ext]'
            }, {
                test: /\.css$/,
                exclude: path.resolve(__dirname, '../src/app'),
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }, {
                test: /\.css$/,
                include: path.resolve(__dirname, '../src/app'),
                loader: 'raw-loader'
            }]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('prod'),
                'process.env.API_URL': JSON.stringify('xxx--生产API地址--xxx')
            }),
            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                path.resolve(__dirname, '../src'), // location of your src
                {} // a map of your routes 
            ),
            new WebpackMd5Hash(),
            new CopyWebpackPlugin([{
                from: path.resolve(__dirname, '../src/assets/static/'),
                to: './assets/static/',
            }]),
            new CheckerPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['app', 'vendor', 'polyfills']
            }),
            new ExtractTextPlugin('vender.[contenthash:8].css'),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(__dirname, '../src/index.html')
            })
        ]
    };
}