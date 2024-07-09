<?php
/**
 * Block: Table Row
 *
 * @package travelopia-blocks
 */

namespace Travelopia\Blocks\TableRow;

use function Travelopia\Blocks\Helpers\get_block_wrapper_attributes;
use function Travelopia\Blocks\Helpers\get_border_styles;
use function Travelopia\Blocks\Helpers\get_css_classes;
use function Travelopia\Blocks\Helpers\get_css_styles;

const BLOCK_NAME = 'travelopia/table-row';

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
		empty( $block['innerBlocks'] ) ||
		! is_array( $block['innerBlocks'] )
	) {
		return $content;
	}

	$border_styles = get_border_styles( $block['attrs'] );

	// Get block attributes.
	$row_attributes = get_block_wrapper_attributes(
		[
			'class' => get_css_classes(
				$block['attrs'] ?? [],
				[
					'travelopia-table__row ',
					$border_styles['css_classes'],
				]
			),
			'style' => get_css_styles( $block['attrs'] ?? [] ) . $border_styles['inline_styles'],
		]
	);

	$columns_content = '';
	foreach ( $block['innerBlocks'] as $column_block ) {
		$columns_content .= render_block( $column_block );
	}

	$row_content = sprintf(
		'<tr %1$s>%2$s</tr>',
		wp_kses_data( $row_attributes ),
		$columns_content
	);
	return $row_content;
}
