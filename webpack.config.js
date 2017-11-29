'use strict';

const path = require('path');
const postcssNested = require('postcss-nested');

module.exports = {
    name: 'client',

    context: __dirname,

    entry: ['./client/app.js'],

    output: {
        path: path.join(__dirname, './server/public'),
        publicPath: '/',
        filename: 'js/client.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [postcssNested]
                        }
                    }
                ],
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react', 'es2015', 'es2016', 'es2017']
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
    ],

    devtool: 'eval',

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['client', 'node_modules']
    }
};
