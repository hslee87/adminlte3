const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');
var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build' || ENV === 'prod';

var envJson = 'app/env/admin.env.json'
if (!isProd) envJson = 'app/env/admin.env.dev.json'

var config = {
    entry: {
        'bundles/vendor': [
            'angular',
            'angular-cookies',
            '@uirouter/angularjs',
            'ng-file-upload'
        ],
        'bundles/app': [
            './src/app/app.js', envJson
        ]
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.join(__dirname, '/dist/'),
        devtoolLineToLine: true,
        pathinfo: true,
        sourceMapFilename: '[name].js.map'
        // ,publicPath: path.join(__dirname, '/src/main/webapp/')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            loader: 'file-loader?name=bundles/images/[name].[ext]'
        }, {
            test: /\.(svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader?name=bundles/fonts/[name].[ext]'
        }, {
            // HTML LOADER
            // Reference: https://github.com/webpack/raw-loader
            // Allow loading html through js
            test: /\.html$/,
            loader: 'raw-loader'
        }]
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src/app'), 'node_modules'],
        alias: {
            app: path.resolve(__dirname, 'src/app')
        },
        extensions: ['.js', '.json']
    },
    devServer: {
        contentBase: path.join(__dirname, "./src/public/"),
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/public/index.html',
            inject: 'body',
            chunks: ['bundles/vendor', 'bundles/app']
        })
    ]
}

if (isProd) {
    config.plugins.push(
        // Copy assets from the public folder
        // Reference: https://github.com/kevlened/copy-webpack-plugin
        new CopyWebpackPlugin([{
            from: __dirname + '/src/public',
            logLevel: 'warn'
        }]), new UglifyJsPlugin()
    )

}
module.exports = config;