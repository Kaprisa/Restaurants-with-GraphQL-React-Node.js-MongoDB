const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
	source: path.join(__dirname, 'client'),
	output: path.join(__dirname, 'dist')
}

const webpackConfig = {
	entry: {
		app: [
			PATHS.source + '/index.js'
		]
	},
	output: {
		path: PATHS.output,
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				enforce: 'pre',
				use: 'eslint-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(sass|css)$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(gif|png|jpg|jpeg|svg)$/,
				exclude: /node_modules/,
				use: 'url-loader?limit=10000&name=images/[name]-[hash].[ext]'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: PATHS.source + '/index.html',
			filename: 'index.html',
			path: PATHS.output
		}),
		new webpack.NamedModulesPlugin(),
	]
}

module.exports = webpackConfig