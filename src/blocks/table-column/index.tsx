/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { BlockConfiguration } from '@wordpress/blocks';
import {
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	blockTable as icon,
} from '@wordpress/icons';

/**
 * Internal dependencies.
 */
import edit from './edit';

/**
 * Block data.
 */
export const name: string = 'travelopia/table-column';

export const settings: BlockConfiguration = {
	apiVersion: 3,
	icon,
	title: __( 'Column', 'tp' ),
	description: __( 'Individual column of the table.', 'tp' ),
	parent: [ 'travelopia/table-row' ],
	category: 'text',
	keywords: [ __( 'column', 'tp' ) ],
	attributes: {
		row: {
			type: 'number',
		},
		column: {
			type: 'number',
		},
		colSpan: {
			type: 'number',
		},
		rowSpan: {
			type: 'number',
		},
		isSticky: {
			type: 'boolean',
		}
	},
	providesContext: {
		'travelopia/table-row': 'row' as never,
		'travelopia/table-column': 'column' as never,
	},
	usesContext: [
		'travelopia/table-row-container-type',
		'travelopia/table-row-container-id',
	],
	supports: {
		html: true,
		color: {
			text: true,
			background: true,
		},
	},
	edit,
	save() {
		return <InnerBlocks.Content />;
	},
};
