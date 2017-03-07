const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function () {
    return {
        entry: {
            polyfills: path.resolve(__dirname, '../src/config/polyfills'),
            vendor: path.resolve(__dirname, '../src/config/vendor.ts'),
            app: path.resolve(__dirname, '../src/main.jit')
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            publicPath: 'http://localhost:3000/',
            filename: '[name].js'
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
                            configFileName: 'tsconfig.json',
                        }
                    }, '@angularclass/hmr-loader', 'angular2-template-loader']
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
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('dev'),
                'process.env.API_URL': JSON.stringify('xxx--开发API地址--xxx')
            }),
            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                path.resolve(__dirname, '../src'), // location of your src
                {} // a map of your routes 
            ),
            new CopyWebpackPlugin([{
                from: path.resolve(__dirname, '../src/assets/static/'),
                to: './assets/static/',
            }]),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['app', 'vendor', 'polyfills']
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(__dirname, '../src/index.html'),
                inject: true
            })
        ],
        devServer: {
            historyApiFallback: true,
            inline: true,
            port: 3000,
            host: '0.0.0.0'
        }
    };
}