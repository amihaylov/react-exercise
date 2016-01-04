// run 'webpack-dev-server --inline'
// --inline for automatic reload
// -p minify the js
// -d create a source map for js

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: __dirname,
	debug: true,
	watch: false,
	devtool: 'inline-source-map',
	entry: './src/main.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['', '.js', '.es6','.scss','.json'],
		modulesDirectories: [
			'node_modules',
			path.resolve(__dirname, './node_modules'),
		],
	},
	module: {
		loaders: [
			{
				test: /(\.scss|\.css)$/,
				loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap')
			},
			{
				test: /\.js$/,
				loaders: ['babel-loader'],
				include: path.join(__dirname, 'src'),
				exclude: /(node_modules|bower_components)/,
			},
		],
	},
	postcss: [autoprefixer],
	plugins: [
		new ExtractTextPlugin('bundle.css',{ allChunks: true })
	],
};
