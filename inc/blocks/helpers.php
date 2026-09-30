<?php
/**
 * Helper functions.
 *
 * @package travelopia-blocks
 */

namespace Travelopia\Blocks\Helpers;

/**
 * Read a nested scalar attribute as a string.
 *
 * @param mixed[] $attributes Block attributes.
 * @param string  ...$keys    Keys to walk, outermost first.
 *
 * @return string|null The value, or null when it is missing or not scalar.
 */
function get_attribute_string( array $attributes, string ...$keys ): ?string {
	$value = $attributes;

	foreach ( $keys as $key ) {
		if ( ! is_array( $value ) || ! isset( $value[ $key ] ) ) {
			return null;
		}

		$value = $value[ $key ];
	}

	return is_scalar( $value ) ? (string) $value : null;
}

/**
 * Read a nested array attribute.
 *
 * @param mixed[] $attributes Block attributes.
 * @param string  ...$keys    Keys to walk, outermost first.
 *
 * @return mixed[] The value, or an empty array when it is missing or not an array.
 */
function get_attribute_array( array $attributes, string ...$keys ): array {
	$value = $attributes;

	foreach ( $keys as $key ) {
		if ( ! is_array( $value ) || ! isset( $value[ $key ] ) ) {
			return [];
		}

		$value = $value[ $key ];
	}

	return is_array( $value ) ? $value : [];
}

/**
 * Build an array with CSS classes and inline styles defining the colors
 * which will be applied to the table markup in the front-end.
 *
 * @param mixed[] $attributes Table block attributes.
 *
 * @return array{ css_classes: string[], inline_styles: string } Colors CSS classes and inline styles.
 */
function build_css_colors( array $attributes = [] ): array {
	$colors = [
		'css_classes'   => [],
		'inline_styles' => '',
	];

	// Text color.
	$has_named_text_color  = array_key_exists( 'textColor', $attributes );
	$has_picked_text_color = array_key_exists( 'customTextColor', $attributes );
	$custom_text_color     = get_attribute_string( $attributes, 'style', 'color', 'text' );

	// If has text color.
	if ( null !== $custom_text_color || $has_picked_text_color || $has_named_text_color ) {
		// Add has-text-color class.
		$colors['css_classes'][] = 'has-text-color';
	}

	if ( $has_named_text_color ) {
		// Add the color class.
		$colors['css_classes'][] = sprintf( 'has-%s-color', get_attribute_string( $attributes, 'textColor' ) ?? '' );
	} elseif ( $has_picked_text_color ) {
		// Add the picked color inline style.
		$colors['inline_styles'] .= sprintf( 'color: %s;', get_attribute_string( $attributes, 'customTextColor' ) ?? '' );
	} elseif ( null !== $custom_text_color ) {
		// Add the custom color inline style.
		$colors['inline_styles'] .= sprintf( 'color: %s;', $custom_text_color );
	}

	// Background color.
	$has_named_background_color  = array_key_exists( 'backgroundColor', $attributes );
	$has_picked_background_color = array_key_exists( 'customBackgroundColor', $attributes );
	$custom_background_color     = get_attribute_string( $attributes, 'style', 'color', 'background' );

	// If has background color.
	if ( null !== $custom_background_color || $has_picked_background_color || $has_named_background_color ) {
		// Add has-background class.
		$colors['css_classes'][] = 'has-background';
	}

	if ( $has_named_background_color ) {
		// Add the background-color class.
		$colors['css_classes'][] = sprintf( 'has-%s-background-color', get_attribute_string( $attributes, 'backgroundColor' ) ?? '' );
	} elseif ( $has_picked_background_color ) {
		// Add the picked background-color inline style.
		$colors['inline_styles'] .= sprintf( 'background-color: %s;', get_attribute_string( $attributes, 'customBackgroundColor' ) ?? '' );
	} elseif ( null !== $custom_background_color ) {
		// Add the custom background-color inline style.
		$colors['inline_styles'] .= sprintf( 'background-color: %s;', $custom_background_color );
	}

	return $colors;
}

/**
 * Return the align CSS class.
 *
 * @param mixed[] $attributes The block attributes.
 *
 * @return string Returns the align class.
 */
function get_align_class( array $attributes = [] ): string {
	$align_classes = [
		'left'   => 'alignleft',
		'center' => 'aligncenter',
		'right'  => 'alignright',
	];

	$align = get_attribute_string( $attributes, 'align' );

	if ( null === $align || ! array_key_exists( $align, $align_classes ) ) {
		return '';
	}

	return $align_classes[ $align ];
}

/**
 * Return classes for the table block.
 *
 * @param mixed[]  $attributes The block attributes.
 * @param string[] $additional_classes Additional classes to add to the block.
 *
 * @return string Returns the classes for the block.
 */
function get_css_classes( array $attributes = [], array $additional_classes = [] ): string {
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
function get_css_styles( array $attributes = [] ): string {
	$colors       = build_css_colors( $attributes );
	$block_styles = get_attribute_string( $attributes, 'styles' ) ?? '';
	return $block_styles . $colors['inline_styles'];
}

/**
 * Get border styles.
 *
 * @param mixed[] $attributes The block attributes.
 *
 * @return array{css_classes: string, inline_styles: string} Returns the border styles for the block.
 */
function get_border_styles( array $attributes = [] ): array {
	$border_block_styles = [];

	// Border width.
	$border_width = get_attribute_string( $attributes, 'style', 'border', 'width' );

	if ( null !== $border_width ) {
		if ( is_numeric( $border_width ) ) {
			$border_width .= 'px';
		}

		$border_block_styles['width'] = $border_width;
	}

	// Border color.
	$preset_border_color          = array_key_exists( 'borderColor', $attributes ) ? 'var:preset|color|' . ( get_attribute_string( $attributes, 'borderColor' ) ?? '' ) : null;
	$custom_border_color          = get_attribute_string( $attributes, 'style', 'border', 'color' );
	$border_block_styles['color'] = $preset_border_color ? $preset_border_color : $custom_border_color;

	// Generates the border styles for individual border sides.
	foreach ( array( 'top', 'right', 'bottom', 'left' ) as $side ) {
		$border                       = get_attribute_array( $attributes, 'style', 'border', $side );
		$border_side_values           = array(
			'width' => get_attribute_string( $border, 'width' ),
			'color' => get_attribute_string( $border, 'color' ),
			'style' => get_attribute_string( $border, 'style' ),
		);
		$border_block_styles[ $side ] = $border_side_values;
	}

	// Collect classes and styles.
	$styles = wp_style_engine_get_styles( array( 'border' => $border_block_styles ) );

	$classes       = $styles['classnames'] ?? '';
	$inline_styles = $styles['css'] ?? '';

	return [
		'css_classes'   => is_string( $classes ) ? $classes : '',
		'inline_styles' => is_string( $inline_styles ) ? $inline_styles : '',
	];
}

/**
 * Get block wrapper attributes.
 *
 * @param mixed[] $attributes The block attributes.
 *
 * @return string
 */
function get_block_wrapper_attributes( array $attributes = [] ): string {
	$normalized_attributes = [];
	foreach ( $attributes as $key => $value ) {

		// Skip empty and non-scalar values.
		if ( empty( $value ) || ! is_scalar( $value ) ) {
			continue;
		}

		$normalized_attributes[] = $key . '="' . esc_attr( (string) $value ) . '"';
	}

	return implode( ' ', $normalized_attributes );
}
