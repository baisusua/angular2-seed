const helpers = require('./helpers');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        'polyfills': './src/polyfills.browser.ts',
        'main': './src/main.browser.ts'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [helpers.root('src'), helpers.root('node_modules')],
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: [{
                    loader: '@angularclass/hmr-loader',
                    options: {
                        pretty: true,
                        prod: false
                    }
                },
                {
                    loader: 'ng-router-loader',
                    options: {
                        loader: 'async-import',
                        genDir: 'compiled',
                        aot: false
                    }
                },
                {
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: 'tsconfig.json'
                    }
                },
                {
                    loader: 'angular2-template-loader'
                }
            ],
            exclude: [/\.(spec|e2e)\.ts$/]
        }, {
            test: /\.json$/,
            use: 'json-loader'
        }, {
            test: /\.css$/,
            use: ['to-string-loader', 'css-loader'],
            exclude: [helpers.root('src', 'assets')]
        }, {
            test: /\.scss$/,
            use: ['to-string-loader', 'css-loader', 'sass-loader'],
            exclude: [helpers.root('src', 'assets')]
        }, {
            test: /\.html$/,
            use: 'raw-loader',
            exclude: [helpers.root('src/index.html')]
        }, {
            test: /\.(jpg|png|gif)$/,
            use: 'file-loader'
        }, {
            test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
            use: 'file-loader'
        }]
    },
    plugins: [],
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
}