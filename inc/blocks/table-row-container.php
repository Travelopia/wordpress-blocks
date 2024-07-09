<?php
/**
 * Block: Table Row Container
 *
 * @package travelopia-blocks
 */

namespace Travelopia\Blocks\TableRowContainer;

use function Travelopia\Blocks\Helpers\get_block_wrapper_attributes;
use function Travelopia\Blocks\Helpers\get_css_classes;

const BLOCK_NAME = 'travelopia/table-row-container';

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
	$block_attributes = get_block_wrapper_attributes(
		[
			'class' => get_css_classes(
				$block['attrs'],
				[
					'travelopia-table__row-container',
					! empty( $block['attrs']['isSticky'] ) ? 'travelopia-table__row-container--sticky' : '',
				]
			),
		]
	);

	$row_block_content = '';
	foreach ( $block['innerBlocks'] as $row_block ) {
		$row_block_content .= render_block( $row_block );
	}

	$html_tag = 'tbody';
	if ( ! empty( $block['attrs']['type'] ) ) {
		$html_tag = $block['attrs']['type'];
	}

	$row_container_content = sprintf(
		'<%1$s %2$s>%3$s</%1$s>',
		$html_tag,
		wp_kses_data( $block_attributes ),
		$row_block_content
	);

	return $row_container_content;
}
