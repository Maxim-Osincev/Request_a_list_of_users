const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.jsx',
    module: {
        rules: [
            {
                test: /.jsx$/,
                use: ["babel-loader"]
            },
            {
                test: /.s?css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    output : { 
        clean : true,
        filename : "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),

        new webpack.ProgressPlugin()
    ],
    devServer: {
        port: 8080,
    }
}