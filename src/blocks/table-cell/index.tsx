/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { BlockConfiguration, BlockSaveProps } from '@wordpress/blocks';
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
export const name: string = 'travelopia/table-cell';

export const settings: BlockConfiguration = {
	apiVersion: 2,
	icon,
	title: __( 'Cell', 'tp' ),
	description: __( 'Individual cell of the table.', 'tp' ),
	parent: [ 'travelopia/table-column' ],
	category: 'text',
	keywords: [ __( 'cell', 'tp' ) ],
	attributes: {
		content: {
			type: 'string',
			source: 'html',
		},
	},
	supports: {
		html: true,
		className: false,
	},
	edit,
	save( { attributes }: BlockSaveProps<any> ) {
		return (
			<RichText.Content value={ attributes.content } />
		);
	},
};
