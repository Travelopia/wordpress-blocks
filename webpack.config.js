/* eslint-disable import/no-extraneous-dependencies */
/**
 * WordPress Blocks Webpack Config.
 */

// External dependencies.
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const WebpackNotifierPlugin = require( 'webpack-notifier' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const WebpackWatchedGlobEntries = require( 'webpack-watched-glob-entries-plugin' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const path = require( 'path' );

// Config.
module.exports = ( env ) => {
	// Build configuration.
	const buildConfig = {
		entry: {
			blocks: `./src/blocks/index.ts`,
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
			filename: `./dist/blocks/[name].js`,
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
				filename: `./dist/blocks/[name].css`,
			} ),
			new DependencyExtractionWebpackPlugin( {} ),
		],
		performance: {
			hints: false,
		},
	};

	const componentsConfig = {
		...buildConfig,
		entry: WebpackWatchedGlobEntries.getEntries(
			[
				path.resolve( __dirname, './src/components/**/index.ts' ),
				path.resolve( __dirname, './src/components/**/style.scss' ),
			]
		),
		output: {
			...buildConfig.output,
			filename: `./dist/components/[name].js`,
		},
		plugins: [
			new RemoveEmptyScriptsPlugin(),
			new MiniCssExtractPlugin( {
				filename: `./dist/components/[name].css`,
			} ),
			new WebpackWatchedGlobEntries(),
		],
	};

	// Development environment.
	if ( 'development' in env ) {
		buildConfig.plugins.push( new WebpackNotifierPlugin( {
			title: 'Build',
			alwaysNotify: true,
		} ) );
		componentsConfig.plugins.push( new WebpackNotifierPlugin( {
			title: 'Build',
			alwaysNotify: true,
		} ) );
		buildConfig.devtool = 'source-map';
		componentsConfig.devtool = 'source-map';
	}

	// Return combined config.
	return [ buildConfig, componentsConfig ];
};
