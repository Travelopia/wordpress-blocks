<?php
/**
 * Block: Table - Cell.
 *
 * @package travelopia-blocks
 */

namespace Travelopia\Blocks\Table\Cell;

/**
 * Bootstrap this block.
 *
 * @return void
 */
function bootstrap(): void {
	// Register the block.
	register_block_type_from_metadata( __DIR__ );
}
