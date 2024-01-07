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
import * as tableCell from './table-cell';

/**
 * Add blocks.
 */
const blocks = [
	table,
	tableRow,
	tableColumn,
	tableCell,
];

/**
 * Register blocks.
 */
blocks.forEach( ( { name, settings } ) => registerBlockType( name, settings ) );
