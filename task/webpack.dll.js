const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        polyfills: [path.resolve(__dirname, '../src/config/polyfills.ts')],
        vendor: [path.resolve(__dirname, '../src/config/vendor.ts'), ]
    },
    output: {
        path: path.join(__dirname, '../src/dll/'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [{
                test: /\.ts$/,
                use: [{
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: path.resolve(__dirname, '../tsconfig.json'),
                        }
                    },
                    {
                        loader: 'angular2-template-loader'
                    }
                ],
                exclude: path.resolve(__dirname, '../node_modules'),
            }, {
                test: /\.json$/,
                use: 'json-loader'
            }, {
                test: /\.css$/,
                exclude: path.resolve(__dirname, '../node_modules'),
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.css$/,
                exclude: path.resolve(__dirname, '../node_modules'),
                loader: 'raw-loader'
            }, {
                test: /\.html$/,
                use: 'raw-loader',
                exclude: path.resolve(__dirname, '../node_modules'),
            }, {
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader'
            }, {
                test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
                use: 'file-loader',
                exclude: path.resolve(__dirname, '../node_modules')
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.resolve(__dirname, '../src'), // location of your src
            {} // a map of your routes 
        ),
        new webpack.DllPlugin({
            path: path.join(__dirname, '../src/dll/[name]-manifest.json'),
            name: '[name]_library'
        })
    ]
}