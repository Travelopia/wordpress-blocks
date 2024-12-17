/**
 * Import blocks.
 */
import * as table from './table';
import * as image from './image';

/**
 * Add blocks.
 */
const blocks = [
	table,
	image,
];

/**
 * Register blocks.
 */
blocks.forEach( ( { init } ) => init() );

/**
 * Add block toolbar.
 */
import './block-toolbar';
import '../data/index';
