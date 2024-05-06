/**
 * Quark Expeditions Webpack Config.
 */

// External dependencies.
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const WebpackNotifierPlugin = require( 'webpack-notifier' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

// Config.
module.exports = ( env ) => {
	// Build configuration.
	const buildConfig = {
		entry: {
			blocks: `./src/editor/blocks/index.ts`,
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								url: false,
							},
						},
						{
							loader: 'postcss-loader',
						},
						{
							loader: 'sass-loader',
							options: {
								sassOptions: {
									outputStyle: 'compressed',
								},
							},
						},
					],
				},
			],
		},
		resolve: {
			extensions: [ '*', '.js', '.ts', '.tsx' ],
		},
		output: {
			path: __dirname,
			filename: `./dist/editor/[name].js`,
			publicPath: '/',
		},
		optimization: {
			removeEmptyChunks: true,
			minimize: true,
			minimizer: [ new TerserPlugin( {
				parallel: true,
				terserOptions: {
					format: {
						comments: false,
					},
				},
				extractComments: false,
			} ) ],
		},
		plugins: [
			new MiniCssExtractPlugin( {
				filename: `./dist/editor/[name].css`,
			} ),
			new DependencyExtractionWebpackPlugin( {} ),
		],
		performance: {
			hints: false,
		},
	};

	// Development environment.
	if ( 'development' in env ) {
		buildConfig.plugins.push( new WebpackNotifierPlugin( {
			title: 'Build',
			alwaysNotify: true,
		} ) );
		buildConfig.devtool = 'source-map';
	}

	// Front-end styles.
	const styleConfig = {
		...buildConfig,
		entry: {
			table: `./src/front-end/table/index.ts`,
		},
		output: {
			...buildConfig.output,
			filename: `./dist/front-end/[name]/index.js`,
		},
		plugins: [
			new MiniCssExtractPlugin( {
				filename: `./dist/front-end/[name]/index.css`,
			} ),
			new DependencyExtractionWebpackPlugin( {} ),
		],
	};

	// Return combined config.
	return [ buildConfig, styleConfig ];
};
