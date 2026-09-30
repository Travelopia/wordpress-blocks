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
	$block_assets = get_asset_data( __DIR__ . '/../dist/editor/blocks.asset.php' );

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
	$assets_data = get_asset_data( __DIR__ . '/../dist/front-end/table/index.asset.php' );

	wp_register_style( 'travelopia-table', plugin_dir_url( __DIR__ ) . 'dist/front-end/table/index.css', $assets_data['dependencies'], $assets_data['version'] );
}

/**
 * Read a generated asset file's dependencies and version.
 *
 * @param string $asset_file Path to the webpack `*.asset.php` file.
 *
 * @return array{dependencies: non-empty-string[], version: string} Asset data, with defaults when the file is missing or malformed.
 */
function get_asset_data( string $asset_file ): array {
	$asset_data = file_exists( $asset_file ) ? require $asset_file : [];

	if ( ! is_array( $asset_data ) ) {
		$asset_data = [];
	}

	$dependencies = isset( $asset_data['dependencies'] ) && is_array( $asset_data['dependencies'] ) ? $asset_data['dependencies'] : [];
	$version      = $asset_data['version'] ?? '1';

	return [
		'dependencies' => array_values(
			array_filter(
				$dependencies,
				function ( $dependency ) {
					return is_string( $dependency ) && '' !== $dependency;
				}
			)
		),
		'version'      => is_scalar( $version ) ? (string) $version : '1',
	];
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
		if ( ! is_string( $namespace ) ) {
			continue;
		}

		$_function = $namespace . '\\bootstrap';

		// Execute the function if it exists.
		if ( function_exists( $_function ) ) {
			$_function();
		}
	}
}
