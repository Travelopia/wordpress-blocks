<?php
/**
 * Block: Table - Row Container.
 *
 * @package travelopia-blocks
 */

namespace Travelopia\Blocks\Table\RowContainer;

use function Travelopia\Blocks\Helpers\get_block_wrapper_attributes;
use function Travelopia\Blocks\Helpers\get_css_classes;

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
	// Get block attributes.
	$block_attributes = get_block_wrapper_attributes(
		[
			'class' => get_css_classes(
				$attributes,
				[
					'travelopia-table__row-container',
					! empty( $attributes['isSticky'] ) ? 'travelopia-table__row-container--sticky' : '',
				]
			),
		]
	);

	$html_tag = 'tbody';
	if ( ! empty( $attributes['type'] ) ) {
		$html_tag = $attributes['type'];
	}

	return sprintf(
		'<%1$s %2$s>%3$s</%1$s>',
		$html_tag,
		wp_kses_data( $block_attributes ),
		$content
	);
}
