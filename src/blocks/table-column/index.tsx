/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { BlockConfiguration, BlockSaveProps } from '@wordpress/blocks';
import {
	InnerBlocks,
	useBlockProps,
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
	apiVersion: 2,
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
		isHead: {
			type: 'boolean',
			default: false,
		},
	},
	providesContext: {
		'travelopia/table-row': 'row' as never,
		'travelopia/table-column': 'column' as never,
	},
	supports: {
		html: true,
		color: {
			text: true,
			background: true,
		},
	},
	edit,
	save( { attributes } : BlockSaveProps<any> ) {
		const blockProps = useBlockProps.save();

		if ( attributes?.isHead ) {
			return <th { ...blockProps }><InnerBlocks.Content /></th>;
		}

		return <td { ...blockProps }><InnerBlocks.Content /></td>;
	},
};
