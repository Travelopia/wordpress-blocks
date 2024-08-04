<?php
/**
 * Block: Table - Row.
 *
 * @package travelopia-blocks
 */

namespace Travelopia\Blocks\Table\Row;

use function Travelopia\Blocks\Helpers\get_block_wrapper_attributes;
use function Travelopia\Blocks\Helpers\get_css_classes;
use function Travelopia\Blocks\Helpers\get_css_styles;
use function Travelopia\Blocks\Helpers\get_border_styles;

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
	$border_styles = get_border_styles( $attributes );

	// Get block attributes.
	$row_attributes = get_block_wrapper_attributes(
		[
			'class' => get_css_classes(
				$attributes ?? [],
				[
					'travelopia-table__row ',
					$border_styles['css_classes'],
				]
			),
			'style' => get_css_styles( $attributes ?? [] ) . $border_styles['inline_styles'],
		]
	);

	return sprintf(
		'<tr %1$s>%2$s</tr>',
		wp_kses_data( $row_attributes ),
		$content
	);
}
