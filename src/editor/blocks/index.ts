/**
 * Import blocks.
 */
import * as table from './table';
import * as logoGrid from './logo-grid';

/**
 * Add blocks.
 */
const blocks = [
	table,
	logoGrid,
];

/**
 * Register blocks.
 */
blocks.forEach( ( { init } ) => init() );

