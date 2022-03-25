const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');

const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

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
				favicon: './src/assets/icon/favicon.png',
				inject: true,
				chunks: ['index'],
				filename: 'index.html'
			}),
			new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
			new CompressionPlugin(),
		],

		devtool: isDevelopment && 'inline-source-map',
		devServer: {
			open: true,
			static: './dist',
			port: 8080,
		},

		// reduce bundle size
		// imports are in the path
		// had to configure the orbit controlls plugin as well.
		resolve: {
			alias: {
				// Forward all three imports to our exports file
				three$: path.resolve('./src/webgl/utility/three-exports.js'),
			},
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
					test: /\.(glsl|vs|fs|vert|frag)$/,
					exclude: /node_modules/,
					use: [
						'raw-loader',
						'glslify-loader'
					]
				},
				{
					test: /\.svg$/,
					use: ['react-svg-loader', 'svgo-loader'],
				},
				{
					test: /\.(jsx|js)$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					options: {
						plugins: [
							[
								'import',
								{ libraryName: 'antd', style: true },
								'antd',
							]
						],
					},
				},
				{
					test: /\.obj$/,
					loader: 'url-loader',
				},
				{
					test: /\.(png|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
				},

			],
		},

		optimization: {
			minimizer: [
				"...",
				new ImageMinimizerPlugin({
					minimizer: {
						implementation: ImageMinimizerPlugin.imageminMinify,
						options: {
							// Lossless optimization with custom option
							// Feel free to experiment with options for better result for you
							plugins: [
								["gifsicle", { interlaced: true }],
								["jpegtran", { progressive: true }],
								["optipng", { optimizationLevel: 5 }],
								// Svgo configuration here https://github.com/svg/svgo#configuration
								[
									"svgo",
									{
										plugins: extendDefaultPlugins([
											{
												name: "removeViewBox",
												active: false,
											},
											{
												name: "addAttributesToSVGElement",
												params: {
													attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
												},
											},
										]),
									},
								],
							],
						},
					},
				}),
			],
		},
	}
};