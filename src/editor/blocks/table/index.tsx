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
 * Styles.
 */
import './editor.scss';

/**
 * Frontend styles.
 */
import '../../../front-end/table/index.scss';

/**
 * Block data.
 */
export const name: string = 'travelopia/table';

export const settings: BlockConfiguration = {
	apiVersion: 3,
	icon,
	title: __( 'Table', 'tp' ),
	description: __( 'Create structured content in rows and columns to display information.', 'tp' ),
	category: 'text',
	keywords: [ __( 'table', 'tp' ) ],
	attributes: {
		anchor: {
			type: 'string',
		},
		rows: {
			type: 'number',
			default: 0,
		},
		columns: {
			type: 'number',
			default: 0,
		},
		blockId: {
			type: 'string',
		},
		hasThead: {
			type: 'boolean',
			default: false,
		},
		hasTfoot: {
			type: 'boolean',
			default: false,
		},
	},
	providesContext: {
		'travelopia/table-id': 'blockId' as never,
		'travelopia/table-total-rows': 'rows' as never,
		'travelopia/table-total-columns': 'columns' as never,
		'travelopia/table-has-thead': 'hasThead' as never,
		'travelopia/table-has-tfoot': 'hasTfoot' as never,
	},
	supports: {
		anchor: true,
	},
	edit,
	save() {
		return <InnerBlocks.Content />;
	},
};
