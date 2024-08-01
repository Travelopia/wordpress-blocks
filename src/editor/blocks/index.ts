/**
 * Import blocks.
 */
import * as table from './table';

/**
 * Add blocks.
 */
const blocks = [
	table,
];

/**
 * Register blocks.
 */
blocks.forEach( ( { init } ) => init() );

/**
 * Add block toolbar.
 */
import './block-toolbar';
