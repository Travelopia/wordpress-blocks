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
export const name: string = 'travelopia/table-row';

export const settings: BlockConfiguration = {
	apiVersion: 3,
	icon,
	title: __( 'Row', 'tp' ),
	description: __( 'Individual row of the table.', 'tp' ),
	parent: [ 'travelopia/table' ],
	category: 'text',
	keywords: [ __( 'row', 'tp' ) ],
	attributes: {
		isThead: {
			type: 'boolean',
			default: false,
		},
		isTfoot: {
			type: 'boolean',
			default: false,
		},
	},
	providesContext: {
		'travelopia/table-row-is-thead': 'isThead' as never,
		'travelopia/table-row-is-tfoot': 'isTfoot' as never,
	},
	usesContext: [
		'travelopia/table-total-rows',
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
