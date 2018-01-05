var gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    sourceFile = './start.jsx',
    destFolder = './appbuild',
    destFile = './start.js';


//To minify remove comment of uglify() and commnet [devtool & debug mode]

gulp.task('webpack', function () {
    return gulp.src([sourceFile, './app/themes/**/*.scss'])
        .pipe(webpack(
            {
                devtool: "#sourcemap",
                debug: true,
                output: {
                    filename: destFile
                },
                module: {
                    loaders: [
                        {
                            test: /\.scss$/,
                            loader: ExtractTextPlugin.extract(
                            // activate source maps via loader query
                            'css?sourceMap!' +
                            'sass?sourceMap'
                        )},
                        { test: /\.css$/, loader: "style-loader!css-loader" },
                        { test: /\.woff($|\?)/,   loader: 'url-loader' },
                        { test: /\.ttf($|\?)/,   loader: 'url-loader' },
                        { test: /\.eot($|\?)/,   loader: 'url-loader' },
                        { test: /\.svg($|\?)/,    loader: 'url-loader' },
                        { test: /\.png$/, loader: "url-loader?limit=100000" },
                        { test: /\.jpg$/, loader: "file-loader" },
                        { test: /\.gif$/, loader: "file-loader" },
                        { test: /\.jsx$/, loader: 'jsx-loader?harmony'}
                    ]
                },
                plugins: [
                    // extract inline css into separate 'styles.css'
                    new ExtractTextPlugin('./start.css')
                ],
                resolve: {
                    // you can now require('file') instead of require('file.js')
                    extensions: ['', '.js', '.json', '.jsx', '.css', '.scss']
                }
            }))
        //.pipe(uglify())
        .pipe(gulp.dest(destFolder));
});

gulp.task('default', ['webpack']);
