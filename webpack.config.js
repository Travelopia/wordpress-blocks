/**
 * External dependencies.
 */
const path = require( 'path' );
const fg = require( 'fast-glob' );
const { exec } = require( 'child_process' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const WebpackNotifierPlugin = require( 'webpack-notifier' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
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
			new RemoveEmptyScriptsPlugin(),
			new MiniCssExtractPlugin( {
				filename: `./dist/editor/[name].css`,
			} ),
			new DependencyExtractionWebpackPlugin( {} ),
			{
				apply: ( compiler ) => {
					/**
					 * After compile, add PHP files to dependencies.
					 * @see <https://github.com/webpack/webpack-dev-server/issues/34#issuecomment-47420992>.
					 */
					compiler.hooks.afterCompile.tap( 'BlocksManifestPlugin', ( compilation ) => {
						// Get PHP files from blocks.
						const phpFiles = fg.sync( path.resolve( __dirname, '/src/editor/blocks/**/*.php' ) );

						// Add PHP files to dependencies.
						if ( Array.isArray( compilation.fileDependencies ) ) {
							phpFiles.map( ( file ) => compilation.fileDependencies.push( file ) );
						} else {
							phpFiles.map( ( file ) => compilation.fileDependencies.add( file ) );
						}
					} );

					// After emit, generate blocks manifest.
					compiler.hooks.afterEmit.tap( 'BlocksManifestPlugin', async () => {
						// Get PHP script to generate blocks manifest.
						const blocksInfoExtractor = path.resolve( __dirname, '.bin/block-manifest-generator.php' );

						// Run PHP script.
						exec( `php ${ blocksInfoExtractor }`, ( error, stdout, stderr ) => {
							// If there is an error.
							if ( error ) {
								// eslint-disable-next-line no-console
								console.error( `[BlocksManifestPlugin] \n ${ error }` );

								// Just return.
								return;
							}

							// If there is an error.
							if ( stderr ) {
								// eslint-disable-next-line no-console
								console.error( `[BlocksManifestPlugin] \n ${ stderr }` );
								// Just return.
								return;
							}

							// eslint-disable-next-line no-console
							console.log( `[BlocksManifestPlugin] \n ${ stdout }` );
						} );
					} );
				},
			},
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
