var path = require('path');
    
module.exports = {
    devtool: 'source-map',
    entry: './main.js',
    output: {
        path: __dirname,
        filename: './dist/bundle.js'
    },
    module: {
        loaders: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
            presets: ['es2015']
            }
        }
    ]},
    node: {
        fs: "empty"
    }
};