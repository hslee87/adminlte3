const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');
var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build' || ENV === 'prod';

var config = {
 entry: {
    'bundles/crmapp': [
        './src/app/app.js',
        './src/app/env/app.env.js' 
    ],
    'bundles/vendor': [
        'angular',
        'angular-cookies',
        'ng-file-upload',
        '@uirouter/angularjs'
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
 module:{
  rules:[
   {
    test: /\.css$/,
    use: ['style-loader','css-loader']
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
   },{
    // HTML LOADER
    // Reference: https://github.com/webpack/raw-loader
    // Allow loading html through js
    test: /\.html$/,
    loader: 'raw-loader'
   }
  ]
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
        chunks: ['bundles/vendor', 'bundles/crmapp'],
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
    }])
    ,new UglifyJsPlugin()
  )

}
module.exports = config;