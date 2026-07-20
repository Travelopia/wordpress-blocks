<?php
/**
 * Plugin Name: Travelopia Blocks
 * Description: Custom blocks for the Gutenberg Block Editor.
 * Author: Travelopia Team
 * Author URI: https://www.travelopia.com
 * Version: 1.1.3
 * Requires at least: 6.5
 * Requires PHP: 8.1
 *
 * @package travelopia-blocks
 */

namespace Travelopia\Blocks;

require_once __DIR__ . '/inc/namespace.php';

// Kick it off.
add_action( 'plugins_loaded', __NAMESPACE__ . '\\bootstrap' );
