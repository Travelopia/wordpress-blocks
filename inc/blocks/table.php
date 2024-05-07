<?php
/**
 * Block: Table.
 *
 * @package travelopia-blocks
 */

namespace Travelopia\Blocks\Table;

const TABLE_BLOCK_NAME               = 'travelopia/table';
const TABLE_ROW_CONTAINER_BLOCK_NAME = 'travelopia/table-row-container';
const TABLE_ROW_BLOCK_NAME           = 'travelopia/table-row';
const TABLE_COLUMN_BLOCK_NAME        = 'travelopia/table-column';
const TABLE_CELL_BLOCK_NAME          = 'travelopia/table-cell';

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
 * @param string|null $content Original content.
 * @param mixed[]     $block   Parsed block.
 *
 * @return null|string
 */
function render( ?string $content = null, array $block = [] ): null|string {
	// Check for block.
	if ( TABLE_BLOCK_NAME !== $block['blockName'] || empty( $block['attrs'] ) || empty( $block['innerBlocks'] ) || ! is_array( $block['innerBlocks'] ) ) {
		return $content;
	}

	wp_enqueue_style( 'travelopia-table' );

	ob_start();

	?>
	<div class="travelopia-table">
		<table 
		<?php
		echo get_block_wrapper_attributes( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			[
				'class' => get_css_classes( $block['attrs'] ),
				'style' => get_css_styles( $block['attrs'] ),
			]
		);
		?>
		>

		<?php foreach ( $block['innerBlocks'] as $row_container_block ) : ?>
			<?php if ( TABLE_ROW_CONTAINER_BLOCK_NAME === $row_container_block['blockName'] && ! empty( $row_container_block['attrs'] ) && ! empty( $row_container_block['innerBlocks'] ) && is_array( $row_container_block['innerBlocks'] ) ) : ?>
				<!-- Row container -->
				<?php
				$block_attributes = get_block_wrapper_attributes(
					[
						'class' => get_css_classes(
							$row_container_block['attrs'],
							[
								'travelopia-table__row-container',
								! empty( $row_container_block['attrs']['isSticky'] ) ? 'travelopia-table__row-container--sticky' : '',
							]
						),
					]
				);
				?>
				<?php if ( empty( $row_container_block['attrs']['type'] ) ) : ?>
					<tbody <?php echo $block_attributes; // phpcs:ignore ?>>
				<?php elseif ( 'thead' === $row_container_block['attrs']['type'] ) : ?>
					<thead <?php echo $block_attributes; // phpcs:ignore ?>>
				<?php elseif ( 'tfoot' === $row_container_block['attrs']['type'] ) : ?>
					<tfoot <?php echo $block_attributes; // phpcs:ignore ?>>
				<?php else : ?>
					<tbody <?php echo $block_attributes; // phpcs:ignore ?>>
				<?php endif; ?>

					<?php foreach ( $row_container_block['innerBlocks'] as $row_block ) : ?>
						<!-- Row -->
						<?php if ( TABLE_ROW_BLOCK_NAME === $row_block['blockName'] && ! empty( $row_block['innerBlocks'] ) && is_array( $row_block['innerBlocks'] ) ) : ?>
							<tr
							<?php
							echo get_block_wrapper_attributes( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
								[
									'class' => get_css_classes( $row_block['attrs'] ?? [], [ 'travelopia-table__row ' ] ),
									'style' => get_css_styles( $row_block['attrs'] ?? [] ),
								]
							);
							?>
							>
								<?php foreach ( $row_block['innerBlocks'] as $column_block ) : ?>
									<!-- Column -->
									<?php if ( TABLE_COLUMN_BLOCK_NAME === $column_block['blockName'] && ! empty( $column_block['attrs'] ) && ! empty( $column_block['innerBlocks'] ) && is_array( $column_block['innerBlocks'] ) ) : ?>
										<?php if ( empty( $row_container_block['attrs']['type'] ) ) : ?>
											<td
											<?php
											echo get_block_wrapper_attributes( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
												[
													'class'   => get_css_classes(
														$column_block['attrs'],
														[
															'travelopia-table__column',
															! empty( $column_block['attrs']['isSticky'] ) ? 'travelopia-table__column--sticky' : '',
														]
													),
													'style'   => get_css_styles( $column_block['attrs'] ),
													'colspan' => $column_block['attrs']['colSpan'] ?? '',
													'rowspan' => $column_block['attrs']['rowSpan'] ?? '',
												]
											);
											?>
											>
										<?php else : ?>
											<th>
										<?php endif; ?>

											<?php foreach ( $column_block['innerBlocks'] as $cell_block ) : ?>
												<?php if ( TABLE_CELL_BLOCK_NAME === $cell_block['blockName'] && ! empty( $cell_block['innerHTML'] ) ) : ?>
													<?php echo $cell_block['innerHTML']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
												<?php else : ?>
													<?php echo render_block( $cell_block ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
												<?php endif; ?>
											<?php endforeach; ?>

										<?php if ( empty( $row_container_block['attrs']['type'] ) ) : ?>
											</td>
										<?php else : ?>
											</th>
										<?php endif; ?>
									<?php endif; ?>
								<?php endforeach; ?>
							</tr>
						<?php endif; ?>
					<?php endforeach; ?>
				
				<?php if ( empty( $row_container_block['attrs']['type'] ) ) : ?>
					</tbody>
				<?php elseif ( 'thead' === $row_container_block['attrs']['type'] ) : ?>
					</thead>
				<?php elseif ( 'tfoot' === $row_container_block['attrs']['type'] ) : ?>
					</tfoot>
				<?php else : ?>
					</tbody>
				<?php endif; ?>
			<?php endif; ?>
		<?php endforeach; ?>

		</table>
	</div>

	<?php

	$block_content = ob_get_clean();

	if ( empty( $block_content ) ) {
		return $content;
	}

	return $block_content;
}

/**
 * Build an array with CSS classes and inline styles defining the colors
 * which will be applied to the table markup in the front-end.
 *
 * @param mixed[] $attributes Table block attributes.
 *
 * @return array{ css_classes: string[], inline_styles: string } Colors CSS classes and inline styles.
 */
function build_css_colors( $attributes ): array {
	$colors = [
		'css_classes'   => [],
		'inline_styles' => '',
	];

	if ( ! is_array( $attributes ) ) {
		return $colors;
	}

	// Text color.
	$has_named_text_color  = array_key_exists( 'textColor', $attributes );
	$has_picked_text_color = array_key_exists( 'customTextColor', $attributes );
	$has_custom_text_color = isset( $attributes['style']['color']['text'] );

	// If has text color.
	if ( $has_custom_text_color || $has_picked_text_color || $has_named_text_color ) {
		// Add has-text-color class.
		$colors['css_classes'][] = 'has-text-color';
	}

	if ( $has_named_text_color ) {
		// Add the color class.
		$colors['css_classes'][] = sprintf( 'has-%s-color', $attributes['textColor'] );
	} elseif ( $has_picked_text_color ) {
		// Add the picked color inline style.
		$colors['inline_styles'] .= sprintf( 'color: %s;', $attributes['customTextColor'] );
	} elseif ( $has_custom_text_color ) {
		// Add the custom color inline style.
		$colors['inline_styles'] .= sprintf( 'color: %s;', $attributes['style']['color']['text'] );
	}

	// Background color.
	$has_named_background_color  = array_key_exists( 'backgroundColor', $attributes );
	$has_picked_background_color = array_key_exists( 'customBackgroundColor', $attributes );
	$has_custom_background_color = isset( $attributes['style']['color']['background'] );

	// If has background color.
	if ( $has_custom_background_color || $has_picked_background_color || $has_named_background_color ) {
		// Add has-background class.
		$colors['css_classes'][] = 'has-background';
	}

	if ( $has_named_background_color ) {
		// Add the background-color class.
		$colors['css_classes'][] = sprintf( 'has-%s-background-color', $attributes['backgroundColor'] );
	} elseif ( $has_picked_background_color ) {
		// Add the picked background-color inline style.
		$colors['inline_styles'] .= sprintf( 'background-color: %s;', $attributes['customBackgroundColor'] );
	} elseif ( $has_custom_background_color ) {
		// Add the custom background-color inline style.
		$colors['inline_styles'] .= sprintf( 'background-color: %s;', $attributes['style']['color']['background'] );
	}

	return $colors;
}

/**
 * Returns the align class.
 *
 * @param mixed[] $attributes The block attributes.
 *
 * @return string Returns the align class.
 */
function get_align_class( $attributes ): string {
	if ( ! is_array( $attributes ) ) {
		return '';
	}

	$align_classes = [
		'left'   => 'alignleft',
		'center' => 'aligncenter',
		'right'  => 'alignright',
	];

	if ( ! array_key_exists( 'align', $attributes ) || ! array_key_exists( $attributes['align'], $align_classes ) ) {
		return '';
	}

	return $align_classes[ $attributes['align'] ];
}

/**
 * Return classes for the table block.
 *
 * @param mixed[]  $attributes The block attributes.
 * @param string[] $additional_classes Additional classes to add to the block.
 *
 * @return string Returns the classes for the block.
 */
function get_css_classes( $attributes, $additional_classes = [] ) {
	if ( ! is_array( $attributes ) ) {
		return '';
	}

	$colors      = build_css_colors( $attributes );
	$align_class = get_align_class( $attributes );

	$classes = array_merge(
		$colors['css_classes'],
		$align_class ? [ $align_class ] : [],
		$additional_classes,
	);

	$classes = array_filter(
		$classes,
		function( $class ) {
			return ! empty( $class );
		}
	);
	return implode( ' ', $classes );
}

/**
 * Get styles.
 *
 * @param mixed[] $attributes The block attributes.
 *
 * @return string Returns the styles for the block.
 */
function get_css_styles( $attributes ) {
	if ( ! is_array( $attributes ) ) {
		return '';
	}

	$colors       = build_css_colors( $attributes );
	$block_styles = isset( $attributes['styles'] ) ? $attributes['styles'] : '';
	return $block_styles . $colors['inline_styles'];
}

