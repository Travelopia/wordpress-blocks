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
	add_action( 'enqueue_block_assets', __NAMESPACE__ . '\\enqueue_block_editor_assets' );
	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\register_front_end_styles' );
	add_action( 'init', __NAMESPACE__ . '\\register_blocks' );
}

/**
 * Enqueue Editor Assets.
 */
function enqueue_block_editor_assets(): void {
	if ( ! is_admin() ) {
		return;
	}

	// Get block asset details.
	$block_assets = [];
	$asset_file   = __DIR__ . '/../dist/editor/blocks.asset.php';

	if ( file_exists( $asset_file ) ) {
		$block_assets = require $asset_file;
	}

	if ( ! isset( $block_assets['dependencies'] ) ) {
		$block_assets['dependencies'] = [];
	}

	if ( ! isset( $block_assets['version'] ) ) {
		$block_assets['version'] = '1';
	}

	// Enqueue Block JavaScript.
	wp_enqueue_script(
		'travelopia-blocks',
		plugin_dir_url( __DIR__ ) . 'dist/editor/blocks.js',
		$block_assets['dependencies'],
		$block_assets['version'],
		false
	);

	// Enqueue Block CSS.
	wp_enqueue_style(
		'travelopia-blocks',
		plugin_dir_url( __DIR__ ) . 'dist/editor/blocks.css',
		[],
		$block_assets['version']
	);
}

/**
 * Register front-end styles.
 *
 * @return void
 */
function register_front_end_styles(): void {
	// Get assets file.
	$assets_file = __DIR__ . '/../dist/front-end/table/index.asset.php';
	if ( file_exists( $assets_file ) ) {
		$assets_data = include_once $assets_file;
	} else {
		$assets_data = [
			'version'      => 1,
			'dependencies' => [],
		];
	}

	wp_register_style( 'travelopia-table', plugin_dir_url( __DIR__ ) . 'dist/front-end/table/index.css', $assets_data['dependencies'] ?? [], $assets_data['version'] ?? '1' );
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
