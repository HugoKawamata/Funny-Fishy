module.exports = {
    entry: "./static/js/index.js",
    output: {
        path: __dirname,
        filename: "./static/js/bundle.js"
    },
    module: {
        loaders: [
            { 
                test: /\.js?$/, 
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['react-html-attrs', 'transform-class-properties']
                }
            }
        ]
    }
};
