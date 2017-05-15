/**
 * Created by yeanzhi on 17/2/25.
 */
'use strict';
const {
    resolve
} = require('path');
const webpack = require('webpack');
var node_modules = resolve(__dirname, 'node_modules');
var pathToReact = resolve(node_modules, 'react/dist/react.min.js');

module.exports = {
    entry: {
        'neixin-uploader': [
            './src/index.js'
        ]
    },
    output: {
        filename: 'uploader.js',
        sourceMapFilename: '[file].map',
        path: resolve(__dirname, 'dist'),
        publicPath: '/dist',
        library: 'neixin-uploader',
        libraryTarget: 'umd'
    },
    devtool: 'cheap-module-source-map',

    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:[{
                    loader: 'babel-loader',
                    options: {
                        'presets': [
                            // ['es2015', {
                            //     'modules': false
                            // }],
                            'stage-0',
                            'es2015',
                            // 'latest',
                        ],
                        'plugins': [
                          'transform-runtime'
                        ],
                        'env': {},
                        'ignore': [
                            'node_modules/**',
                            'dist'
                        ]
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },
    externals: [
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            },
            'react-dom':{
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom'
            }
        }
    ],
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: JSON.stringify('production')
        //     }
        // }),
    ]
};
