const path = require('path');
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
    mode: 'development',
};
