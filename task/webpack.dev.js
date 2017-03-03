var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

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
                    loader: 'html-loader'
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