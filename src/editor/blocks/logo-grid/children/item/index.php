<?php
/**
 * Block: Logo Grid - Item.
 *
 * @package travelopia-blocks
 */

namespace Travelopia\Blocks\LogoGrid\Item;

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
 *
 * @return string
 */
function render( array $attributes = [] ): string {
	// Resolve the image ID.
	$image_id = ! empty( $attributes['imageId'] ) ? absint( $attributes['imageId'] ) : 0;

	// Render a responsive image from the attachment when we have one.
	if ( 0 !== $image_id ) {
		$image = wp_get_attachment_image(
			$image_id,
			'medium',
			false,
			[
				'class'   => 'travelopia-logo-grid__img',
				'loading' => 'lazy',
			]
		);

		// Bail if the attachment no longer exists.
		if ( empty( $image ) ) {
			return '';
		}

		// Return the figure markup.
		return sprintf( '<figure class="travelopia-logo-grid__logo">%s</figure>', $image );
	}

	// Fall back to a plain URL when no attachment ID is stored.
	$image_url = ! empty( $attributes['imageUrl'] ) && is_string( $attributes['imageUrl'] ) ? $attributes['imageUrl'] : '';

	// Nothing to render.
	if ( empty( $image_url ) ) {
		return '';
	}

	// Alt text.
	$image_alt = ! empty( $attributes['imageAlt'] ) && is_string( $attributes['imageAlt'] ) ? $attributes['imageAlt'] : '';

	// Return the figure markup.
	return sprintf(
		'<figure class="travelopia-logo-grid__logo"><img class="travelopia-logo-grid__img" src="%1$s" alt="%2$s" loading="lazy" /></figure>',
		esc_url( $image_url ),
		esc_attr( $image_alt )
	);
}
