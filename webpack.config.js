const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'effet'),
        library: 'effet',
        publicPath: '/effet/',
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
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/face_mesh.binarypb'),
                    to: path.resolve(__dirname, 'effet'),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/face_mesh_solution_packed_assets.data'),
                    to: path.resolve(__dirname, 'effet'),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/face_mesh_solution_packed_assets_loader.js'),
                    to: path.resolve(__dirname, 'effet'),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/face_mesh_solution_simd_wasm_bin.js'),
                    to: path.resolve(__dirname, 'effet'),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/face_mesh_solution_simd_wasm_bin.wasm'),
                    to: path.resolve(__dirname, 'effet'),
                    noErrorOnMissing: true
                },
            ],
        }),
    ],
    mode: 'development',
};
