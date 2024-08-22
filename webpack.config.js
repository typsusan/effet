const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: 'index.js',
        chunkFilename: '[name].[contenthash].js', // 使用 contenthash 避免命名冲突
        path: path.resolve(__dirname, 'effet'),
        library: 'effet',
        libraryTarget: 'var',
        globalObject: 'this',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'common',
        },
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
                test: /\.css$/, // 处理 CSS 文件
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ],
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/resources'),
                    to: path.resolve(__dirname, 'effet/src/resources')
                }
            ],
        }),
    ],
    mode: 'development',
};
