var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const glob = require('glob');


var config = {
    entry: {
        vendor: ['react', 'react-dom'],
        app: './src/js/app.js'
    },
    output: {
        path: __dirname + '/dist/',
        filename: '[name].js'
    },
    module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0', 'react']
            }
          },
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader") 
          },
          {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('css?sourceMap!less?sourceMap')
          }
        ],
        preLoaders:[{
            test: /\.js$/, 
            loader: "eslint-loader", 
            exclude: /node_modules/
        }],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new ExtractTextPlugin("style.css")
    ],
    eslint: {
        configFile: './.eslintrc'
    }
};
/**
 * find entries
 */
var files = glob.sync('./src/js/*/index.js');
var newEntries = files.reduce(function(memo, file) {
    var name = /.*\/(.*?)\/index\.js/.exec(file)[1];
    memo[name] = entry(name);
    return memo;
}, {});
config.entry = Object.assign({}, config.entry, newEntries);
/**
 * [entry description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function entry(name) {
    return './src/js/' + name + '/index.js';
}
module.exports = config;