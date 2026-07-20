/**
 * External dependencies.
 */
const path = require( 'path' );
const fg = require( 'fast-glob' );
const { exec } = require( 'child_process' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

/**
 * WordPress dependencies.
 *
 * The default `@wordpress/scripts` webpack config gives us the shared toolchain
 * (Babel/TypeScript, Sass, PostCSS, Terser, browserslist target, source maps).
 * We only override the entry points, output layout and plugins so the build
 * keeps emitting the exact `dist/` structure this plugin ships.
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

/**
 * Generate the blocks manifest (`dist/blocks.php`) after each build.
 *
 * Maps every block's `index.php` to its PHP namespace so `inc/namespace.php`
 * can bootstrap each block. Kept from the original build.
 */
const blocksManifestPlugin = {
	apply: ( compiler ) => {
		// Add block PHP files as dependencies so watch mode picks up changes.
		compiler.hooks.afterCompile.tap( 'BlocksManifestPlugin', ( compilation ) => {
			const phpFiles = fg.sync( path.resolve( __dirname, 'src/editor/blocks/**/*.php' ) );

			phpFiles.forEach( ( file ) => {
				if ( Array.isArray( compilation.fileDependencies ) ) {
					compilation.fileDependencies.push( file );
				} else {
					compilation.fileDependencies.add( file );
				}
			} );
		} );

		// After emit, (re)generate the blocks manifest.
		compiler.hooks.afterEmit.tap( 'BlocksManifestPlugin', () => {
			const blocksInfoExtractor = path.resolve( __dirname, '.bin/block-manifest-generator.php' );

			exec( `php ${ blocksInfoExtractor }`, ( error, stdout, stderr ) => {
				if ( error ) {
					// eslint-disable-next-line no-console
					console.error( `[BlocksManifestPlugin]\n${ error }` );
					return;
				}

				if ( stderr ) {
					// eslint-disable-next-line no-console
					console.error( `[BlocksManifestPlugin]\n${ stderr }` );
					return;
				}

				// eslint-disable-next-line no-console
				console.log( `[BlocksManifestPlugin]\n${ stdout }` );
			} );
		} );
	},
};

// Editor bundle: registers all blocks and their editor + shared styles.
const editorConfig = {
	...defaultConfig,
	entry: {
		blocks: './src/editor/blocks/index.ts',
	},
	output: {
		...defaultConfig.output,
		path: __dirname,
		filename: './dist/editor/[name].js',
		publicPath: '/',
	},
	plugins: [
		new RemoveEmptyScriptsPlugin(),
		new MiniCssExtractPlugin( {
			filename: './dist/editor/[name].css',
		} ),
		new DependencyExtractionWebpackPlugin(),
		blocksManifestPlugin,
	],
};

// Front-end styles: one entry per block, emitted under dist/front-end/<block>/.
const frontEndConfig = {
	...defaultConfig,
	entry: {
		table: './src/front-end/table/index.ts',
	},
	output: {
		...defaultConfig.output,
		path: __dirname,
		filename: './dist/front-end/[name]/index.js',
		publicPath: '/',
	},
	plugins: [
		new RemoveEmptyScriptsPlugin(),
		new MiniCssExtractPlugin( {
			filename: './dist/front-end/[name]/index.css',
		} ),
		new DependencyExtractionWebpackPlugin(),
	],
};

// Return combined config.
module.exports = [ editorConfig, frontEndConfig ];
