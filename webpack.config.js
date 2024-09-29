const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {

    entry: {
        index: './src/index.js',
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'effet'),
        library: 'effet',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'common',
        },
        minimizer: [
            `...`,
            new CssMinimizerPlugin(), // 添加CSS压缩插件
        ],
    },
    experiments: {
        asyncWebAssembly: true,
        syncWebAssembly: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                }
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, // 处理 CSS 文件
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'effet.css',
        }),
    ],
    mode: 'production',
};
