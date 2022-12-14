const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// load secrets and config information
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.(png|webp|ico)$/,
                use: [{
                    loader: 'file-loader',
                    options: { name: '[name].[ext]' }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
            favicon: './src/client/img/favicon.ico'
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new webpack.DefinePlugin({
            'process.env.GEONAMES_USERNAME': JSON.stringify(process.env.GEONAMES_USERNAME),
            'process.env.WEATHERBIT_KEY': JSON.stringify(process.env.WEATHERBIT_API_KEY),
            'process.env.PIXABAY_KEY': JSON.stringify(process.env.PIXABAY_API_KEY),
            'process.env.ROADGOAT_KEY': JSON.stringify(process.env.ROADGOAT_API_KEY),
            'process.env.ROADGOAT_SECRET_KEY': JSON.stringify(process.env.ROADGOAT_SECRET_KEY),
            'process.env.PORT': JSON.stringify(process.env.PORT)
        })
    ]
}