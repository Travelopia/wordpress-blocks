<?php
/**
 * Helper functions.
 *
 * @package travelopia-blocks
 */

namespace Travelopia\Blocks\Helpers;

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
 * Return the align CSS class.
 *
 * @param mixed[] $attributes The block attributes.
 *
 * @return string Returns the align class.
 */
function get_align_class( array $attributes = [] ): string {
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
function get_css_classes( array $attributes = [], $additional_classes = [] ): string {
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
function get_css_styles( array $attributes = [] ): string {
	if ( ! is_array( $attributes ) ) {
		return '';
	}

	$colors       = build_css_colors( $attributes );
	$block_styles = isset( $attributes['styles'] ) ? $attributes['styles'] : '';
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
	if ( ! is_array( $attributes ) ) {
		return [
			'css_classes'   => '',
			'inline_styles' => '',
		];
	}

	$border_block_styles = [];

	// Border width.
	if ( isset( $attributes['style']['border']['width'] ) ) {
		$border_width = $attributes['style']['border']['width'];

		if ( is_numeric( $border_width ) ) {
			$border_width .= 'px';
		}

		$border_block_styles['width'] = $border_width;
	}

	// Border color.
	$preset_border_color          = array_key_exists( 'borderColor', $attributes ) ? "var:preset|color|{$attributes['borderColor']}" : null;
	$custom_border_color          = isset( $attributes['style']['border']['color'] ) ? $attributes['style']['border']['color'] : null;
	$border_block_styles['color'] = $preset_border_color ? $preset_border_color : $custom_border_color;

	// Generates the border styles for individual border sides.
	foreach ( array( 'top', 'right', 'bottom', 'left' ) as $side ) {
		$border                       = isset( $attributes['style']['border'][ $side ] ) ? $attributes['style']['border'][ $side ] : null;
		$border_side_values           = array(
			'width' => isset( $border['width'] ) ? $border['width'] : null,
			'color' => isset( $border['color'] ) ? $border['color'] : null,
			'style' => isset( $border['style'] ) ? $border['style'] : null,
		);
		$border_block_styles[ $side ] = $border_side_values;
	}

	// Collect classes and styles.
	$styles        = wp_style_engine_get_styles( array( 'border' => $border_block_styles ) );
	$classes       = ! empty( $styles['classnames'] ) ? $styles['classnames'] : '';
	$inline_styles = ! empty( $styles['css'] ) ? $styles['css'] : '';

	return [
		'css_classes'   => $classes,
		'inline_styles' => $inline_styles,
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
	if ( ! is_array( $attributes ) ) {
		return '';
	}

	$normalized_attributes = [];
	foreach ( $attributes as $key => $value ) {
		$normalized_attributes[] = $key . '="' . esc_attr( $value ) . '"';
	}

	return implode( ' ', $normalized_attributes );
}
