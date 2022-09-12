const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');

// load secrets and config information
const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
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
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|webp)$/,
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
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new WorkboxPlugin.GenerateSW(),
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