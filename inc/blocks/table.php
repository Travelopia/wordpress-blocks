<?php
/**
 * Block: Table.
 *
 * @package travelopia-blocks
 */

namespace Travelopia\Blocks\Table;

use function Travelopia\Blocks\Helpers\get_css_classes;
use function Travelopia\Blocks\Helpers\get_css_styles;

const BLOCK_NAME = 'travelopia/table';

/**
 * Bootstrap this block.
 *
 * @return void
 */
function bootstrap(): void {
	// Register this block only on the front-end.
	add_action( 'template_redirect', __NAMESPACE__ . '\\register' );
}

/**
 * Register block on the front-end.
 *
 * @return void
 */
function register(): void {
	// Fire hooks.
	add_filter( 'pre_render_block', __NAMESPACE__ . '\\render', 10, 2 );
}

/**
 * Render this block.
 *
 * @see https://github.com/WordPress/WordPress/blob/master/wp-includes/blocks/calendar.php#L15
 *
 * @param string|null $content Original content.
 * @param mixed[]     $block   Parsed block.
 *
 * @return null|string
 */
function render( ?string $content = null, array $block = [] ): null|string {
	// Check for block.
	if ( BLOCK_NAME !== $block['blockName'] || empty( $block['attrs'] ) || empty( $block['innerBlocks'] ) || ! is_array( $block['innerBlocks'] ) ) {
		return $content;
	}

	// Enqueue table block styles.
	wp_enqueue_style( 'travelopia-table' );

	$table_attributes = get_block_wrapper_attributes(
		[
			'class' => get_css_classes( $block['attrs'] ),
			'style' => get_css_styles( $block['attrs'] ),
		]
	);

	$row_containers_content = '';
	foreach ( $block['innerBlocks'] as $row_container_block ) {
		$row_containers_content .= render_block( $row_container_block );
	}

	$table_content = sprintf(
		'<div class="travelopia-table"><table %1$s>%2$s</table></div>',
		$table_attributes,
		$row_containers_content
	);
	return $table_content;
}
