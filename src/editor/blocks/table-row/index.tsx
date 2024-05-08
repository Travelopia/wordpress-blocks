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
	parent: [ 'travelopia/table-row-container' ],
	category: 'text',
	keywords: [ __( 'row', 'tp' ) ],
	attributes: {
		blockId: {
			type: 'string',
		}
	},
	providesContext: {
		'travelopia/table-row-id': 'blockId' as never,
	},
	usesContext: [
		'travelopia/table-row-container-type',
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
