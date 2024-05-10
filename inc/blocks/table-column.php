<?php
/**
 * Block: Table Column
 *
 * @package travelopia-blocks
 */

namespace Travelopia\Blocks\TableColumn;

use function Travelopia\Blocks\Helpers\get_css_classes;
use function Travelopia\Blocks\Helpers\get_css_styles;

const BLOCK_NAME = 'travelopia/table-column';

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
	if (
		empty( $block ) ||
		! is_array( $block ) ||
		empty( $block['blockName'] ) ||
		BLOCK_NAME !== $block['blockName'] ||
		empty( $block['attrs'] ) ||
		empty( $block['innerBlocks'] ) ||
		! is_array( $block['innerBlocks'] )
	) {
		return $content;
	}

	// Get block attributes.
	$column_attributes = get_block_wrapper_attributes(
		[
			'class'   => get_css_classes(
				$block['attrs'],
				[
					'travelopia-table__column',
					! empty( $block['attrs']['isSticky'] ) ? 'travelopia-table__column--sticky' : '',
				]
			),
			'style'   => get_css_styles( $block['attrs'] ),
			'colspan' => $block['attrs']['colSpan'] ?? '',
			'rowspan' => $block['attrs']['rowSpan'] ?? '',
		]
	);

	$html_tag = 'td';
	if ( ! empty( $block['attrs']['type'] ) ) {
		$html_tag = 'th';
	}

	$cells_content = '';
	foreach ( $block['innerBlocks'] as $cell_block ) {
		$cells_content .= render_block( $cell_block );
	}

	$column_content = sprintf( '<%1$s %2$s>%3$s</%1$s>', $html_tag, wp_kses_data( $column_attributes ), $cells_content );
	return $column_content;
}
