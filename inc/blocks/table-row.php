<?php
/**
 * Block: Table Row
 *
 * @package travelopia-blocks
 */

namespace Travelopia\Blocks\TableRow;

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

	// Get block attributes.
	$row_attributes = get_block_wrapper_attributes(
		[
			'class' => get_css_classes( $block['attrs'] ?? [], [ 'travelopia-table__row ' ] ),
			'style' => get_css_styles( $block['attrs'] ?? [] ),
		]
	);

	ob_start();
	?>

	<tr <?php echo wp_kses_data( $row_attributes ); ?>>
		<?php
		foreach ( $block['innerBlocks'] as $column_block ) {
			echo render_block( $column_block ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		?>
	</tr>

	<?php
	$row_content = ob_get_clean();
	if ( empty( $row_content ) ) {
		return null;
	}
	return $row_content;
}