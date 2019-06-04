var path = require('path');
var hwp = require('html-webpack-plugin');

module.exports = (env, options) => {
    return {
        entry: "./src/index.jsx",
        output: {
            path: path.join(__dirname, './dist'),
            filename: '[name].build.js'
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader", // creates style nodes from JS strings
                        "css-loader", // translates CSS into CommonJS
                        "sass-loader" // compiles Sass to CSS, using Node Sass by default
                    ]
                },
                {
                    test: /\.(jsx)$/,
                    exclude: /node_modules/,
                    use: options.mode === 'production' ? ["webpack-strip-block", "babel-loader"] : ["babel-loader"]
                }
            ]
        },
        plugins: [
            new hwp({template: path.join(__dirname, './src/index.html')})
        ],
        devtool: "source-map",
        resolve: {
            extensions: ['.js', '.jsx'],
        }
    }
};
