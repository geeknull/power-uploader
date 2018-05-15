const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: ['./src/index.js'],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'power-uploader.js',
        library: 'power-uploader',
        libraryTarget: 'umd'
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.worker\.js$/,
                use: {
                    loader: 'worker-loader',
                    options: {inline: true, fallback: false}
                },
            },
            {
                test: /\.js?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            // presets: ['latest'],
                            presets: [
                                ['env', {
                                    option: {
                                        'targets': {
                                            'browsers': ['chrome >= 44','firefox >= 51', 'safari >= 9']
                                        }
                                    }
                                }]
                            ],
                            plugins: ['transform-runtime']
                        }
                    }
                ],
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
};