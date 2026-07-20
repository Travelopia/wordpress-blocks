<?php
/**
 * Block: Table.
 *
 * @package travelopia-blocks
 */

namespace Travelopia\Blocks\Table;

use function Travelopia\Blocks\Helpers\get_block_wrapper_attributes;
use function Travelopia\Blocks\Helpers\get_css_classes;
use function Travelopia\Blocks\Helpers\get_css_styles;

/**
 * Bootstrap this block.
 *
 * @return void
 */
function bootstrap(): void {
	// Register the block.
	register_block_type_from_metadata(
		__DIR__,
		[
			'render_callback' => __NAMESPACE__ . '\\render',
		]
	);
}

/**
 * Render this block.
 *
 * @param mixed[] $attributes The block attributes.
 * @param string  $content    The block default content.
 *
 * @return string
 */
function render( array $attributes = [], string $content = '' ): string {
	$table_attributes = get_block_wrapper_attributes(
		[
			'class' => get_css_classes( $attributes ),
			'style' => get_css_styles( $attributes ),
		]
	);

	return sprintf(
		'<div class="travelopia-table %1$s"><table %2$s>%3$s</table></div>',
		$attributes['className'] ?? '',
		wp_kses_data( $table_attributes ),
		$content
	);
}
