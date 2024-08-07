<?php
/**
 * Block: Table - Column.
 *
 * @package travelopia-blocks
 */

namespace Travelopia\Blocks\Table\Column;

use WP_Block;

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
 * @param mixed[]  $attributes The block attributes.
 * @param string   $content    The block default content.
 * @param WP_Block $block      The block object.
 *
 * @return string
 */
function render( array $attributes = [], string $content = '', WP_Block $block = null ): string {
	$border_styles = get_border_styles( $attributes );

	// Get block attributes.
	$column_attributes = get_block_wrapper_attributes(
		[
			'class'   => get_css_classes(
				$attributes,
				[
					'travelopia-table__column',
					! empty( $attributes['isSticky'] ) ? 'travelopia-table__column--sticky' : '',
					$border_styles['css_classes'],
				]
			),
			'style'   => get_css_styles( $attributes ) . $border_styles['inline_styles'],
			'colspan' => $attributes['colSpan'] ?? '',
			'rowspan' => $attributes['rowSpan'] ?? '',
		]
	);

	$html_tag = 'td';
	if ( ! empty( $block->context['travelopia/table-row-container-type'] )
		&& 'tbody' !== $block->context['travelopia/table-row-container-type']
	) {
		$html_tag = 'th';
	}

	return sprintf( '<%1$s %2$s>%3$s</%1$s>', $html_tag, wp_kses_data( $column_attributes ), $content );
}
