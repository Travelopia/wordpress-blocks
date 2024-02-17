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
	apiVersion: 2,
	icon,
	title: __( 'Row', 'tp' ),
	description: __( 'Individual row of the table.', 'tp' ),
	parent: [ 'travelopia/table' ],
	category: 'text',
	keywords: [ __( 'row', 'tp' ) ],
	attributes: {},
	supports: {
		html: true,
	},
	edit,
	save() {
		return <tr><InnerBlocks.Content /></tr>;
	},
};
