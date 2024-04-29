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
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_block_editor_assets' );
}

/**
 * Enqueue Editor Assets.
 */
function enqueue_block_editor_assets(): void {
	// Get block asset details.
	$block_assets = [];
	$asset_file   = __DIR__ . '/../dist/blocks/blocks.asset.php';

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
		plugin_dir_url( __DIR__ ) . 'dist/blocks/blocks.js',
		$block_assets['dependencies'],
		$block_assets['version'],
		false
	);

	// Enqueue Block CSS.
	wp_enqueue_style(
		'travelopia-blocks',
		plugin_dir_url( __DIR__ ) . 'dist/blocks/blocks.css',
		[],
		$block_assets['version']
	);
}
