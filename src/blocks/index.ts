/**
 * WordPress dependencies.
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Import blocks.
 */
import * as table from './table';
import * as tableRow from './table-row';
import * as tableColumn from './table-column';

/**
 * Add blocks.
 */
const blocks = [
	table,
	tableRow,
	tableColumn,
];

/**
 * Register blocks.
 */
blocks.forEach( ( { name, settings } ) => registerBlockType( name, settings ) );
