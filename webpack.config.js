const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (_env, argv) {

	const isProduction = argv.mode === 'production';
	const isDevelopment = !isProduction;

	return {
		mode: isProduction ? 'production' : 'development',

		entry: {
			index: './index.js',
		},
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'dist'),
			clean: true,
		},

		plugins: [
			new HtmlWebpackPlugin({
				template: './index.html',
				favicon: './src/utility/img/icon/favicon.png',
				inject: true,
				chunks: ['index'],
				filename: 'index.html'
			}),
		],

		devtool: isDevelopment && 'inline-source-map',
		devServer: {
			open: true,
			static: './dist',
			port: 8080,
		},

		module: {
			rules: [
				{
					test: /\.(s[ac]ss|css)$/i,
					use: [
						'style-loader',
						'css-loader',
						{
							loader: 'sass-loader',
							options: {
								// prefer 'dart-sass'
								implementation: require.resolve("sass"),
							}
						}
					]
				},
				{
					test: /\.(png|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.(glsl|vs|fs|vert|frag)$/,
					exclude: /node_modules/,
					use: [
						'raw-loader',
						'glslify-loader'
					]
				},
				{
					test: /\.svg$/,
					use: ['@svgr/webpack'],
				},
				{
					test: /\.(jsx|js)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
					}
				},
			],
		},
	}
};