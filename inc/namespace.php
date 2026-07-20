<?php
/**
 * Namespace functions.
 *
 * @package travelopia-blocks
 */

namespace Travelopia\Blocks;

/**
 * Bootstrap plugin.
 *
 * @return void
 */
function bootstrap(): void {
	add_action( 'init', __NAMESPACE__ . '\\register_block_assets', 9 );
	add_action( 'init', __NAMESPACE__ . '\\register_blocks' );
}

/**
 * Register block assets.
 *
 * Registers the shared editor bundle and each block's front-end styles as
 * handles. WordPress core enqueues them from the `editorScript`, `editorStyle`
 * and `viewStyle` fields in every `block.json`, so no manual enqueue is needed
 * and front-end styles load only on pages where the block is present.
 *
 * @return void
 */
function register_block_assets(): void {
	// Get editor bundle asset details (shared by every block).
	$editor_assets = [];
	$editor_file   = __DIR__ . '/../dist/editor/blocks.asset.php';

	if ( file_exists( $editor_file ) ) {
		$editor_assets = require $editor_file;
	}

	if ( ! isset( $editor_assets['dependencies'] ) ) {
		$editor_assets['dependencies'] = [];
	}

	if ( ! isset( $editor_assets['version'] ) ) {
		$editor_assets['version'] = '1';
	}

	// Register the editor script (referenced as `editorScript` in block.json).
	wp_register_script(
		'travelopia-blocks',
		plugin_dir_url( __DIR__ ) . 'dist/editor/blocks.js',
		$editor_assets['dependencies'],
		$editor_assets['version'],
		false
	);

	// Register the editor style (referenced as `editorStyle` in block.json).
	wp_register_style(
		'travelopia-blocks',
		plugin_dir_url( __DIR__ ) . 'dist/editor/blocks.css',
		[],
		$editor_assets['version']
	);

	// Get table front-end style asset details.
	$table_assets = [];
	$table_file   = __DIR__ . '/../dist/front-end/table/index.asset.php';

	if ( file_exists( $table_file ) ) {
		$table_assets = require $table_file;
	}

	if ( ! isset( $table_assets['dependencies'] ) ) {
		$table_assets['dependencies'] = [];
	}

	if ( ! isset( $table_assets['version'] ) ) {
		$table_assets['version'] = '1';
	}

	// Register the table front-end style (referenced as `viewStyle` in block.json).
	wp_register_style(
		'travelopia-table',
		plugin_dir_url( __DIR__ ) . 'dist/front-end/table/index.css',
		$table_assets['dependencies'],
		$table_assets['version']
	);
}

/**
 * Register all blocks.
 *
 * @return void
 */
function register_blocks(): void {
	// Include helper functions.
	require_once __DIR__ . '/blocks/helpers.php';

	// Path to blocks file.
	$blocks_path = dirname( __DIR__ ) . '/dist/blocks.php';

	// Get blocks from file, if it exists.
	if ( ! file_exists( $blocks_path ) ) {
		// Block file does not exist, bail.
		return;
	}

	// Load blocks.
	$blocks = require $blocks_path;

	// Check if we have blocks.
	if ( empty( $blocks ) || ! is_array( $blocks ) ) {
		return;
	}

	// Register blocks.
	foreach ( $blocks as $path => $namespace ) {
		// Include and bootstrap blocks.
		$block_path = dirname( __DIR__ ) . '/' . $path;

		// Check if block file exists.
		if ( ! file_exists( $block_path ) ) {
			continue;
		}

		// Require block.
		require_once $block_path;

		// Get callable function name.
		$_function = $namespace . '\\bootstrap';

		// Execute the function if it exists.
		if ( function_exists( $_function ) ) {
			$_function();
		}
	}
}
