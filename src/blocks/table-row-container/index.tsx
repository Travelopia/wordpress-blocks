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
export const name: string = 'travelopia/table-row-container';

export const settings: BlockConfiguration = {
	apiVersion: 3,
	icon,
	title: __( 'Row Container', 'tp' ),
	description: __( 'A container for a row (THEAD, TBODY, TFOOT).', 'tp' ),
	parent: [ 'travelopia/table' ],
	category: 'text',
	keywords: [
		__( 'thead', 'tp' ),
		__( 'tbody', 'tp' ),
		__( 'tfoot', 'tp' ),
	],
	attributes: {
		type: {
			type: 'string',
			default: 'tbody',
		},
		isSticky: {
			type: 'boolean',
			default: false,
		},
		blockId: {
			type: 'string',
		},
	},
	providesContext: {
		'travelopia/table-row-container-type': 'type' as never,
		'travelopia/table-row-container-sticky': 'isSticky' as never,
		'travelopia/table-row-container-id': 'blockId' as never,
	},
	supports: {
		html: false,
	},
	edit,
	save() {
		return <InnerBlocks.Content />;
	},
};
