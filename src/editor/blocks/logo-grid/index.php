<?php
/**
 * Block: Logo Grid.
 *
 * @package travelopia-blocks
 */

namespace Travelopia\Blocks\LogoGrid;

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
 * @param string  $content    The block inner content (rendered logo items).
 *
 * @return string
 */
function render( array $attributes = [], string $content = '' ): string {
	// Nothing to render without any logos.
	if ( empty( trim( $content ) ) ) {
		return '';
	}

	// Enqueue front-end styles.
	wp_enqueue_style( 'travelopia-logo-grid' );

	// Build wrapper classes.
	$classes = [ 'travelopia-logo-grid' ];

	// Large modifier.
	if ( isset( $attributes['logoSize'] ) && 'large' === $attributes['logoSize'] ) {
		$classes[] = 'travelopia-logo-grid--large';
	}

	// Custom class name.
	if ( ! empty( $attributes['className'] ) && is_string( $attributes['className'] ) ) {
		$classes[] = $attributes['className'];
	}

	// Alignment of the items grid.
	$align        = ! empty( $attributes['align'] ) && is_string( $attributes['align'] ) ? $attributes['align'] : 'left';
	$item_classes = [
		'travelopia-logo-grid__items',
		'travelopia-logo-grid__items--' . sanitize_html_class( $align ),
	];

	// Optional anchor.
	$anchor = ! empty( $attributes['anchor'] ) && is_string( $attributes['anchor'] )
		? sprintf( ' id="%s"', esc_attr( $attributes['anchor'] ) )
		: '';

	// Optional title.
	$title = '';

	if ( ! empty( $attributes['hasTitle'] ) && ! empty( $attributes['title'] ) && is_string( $attributes['title'] ) ) {
		$title = sprintf(
			'<h2 class="travelopia-logo-grid__title">%s</h2>',
			esc_html( $attributes['title'] )
		);
	}

	// Return the block markup.
	return sprintf(
		'<div class="%1$s"%2$s>%3$s<div class="%4$s">%5$s</div></div>',
		esc_attr( implode( ' ', $classes ) ),
		$anchor,
		$title,
		esc_attr( implode( ' ', $item_classes ) ),
		$content
	);
}
