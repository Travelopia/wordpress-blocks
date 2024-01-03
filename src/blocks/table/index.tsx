/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { BlockConfiguration } from '@wordpress/blocks';
import {
	InnerBlocks,
} from '@wordpress/block-editor';

/**
 * Internal dependencies.
 */
import edit from './edit';

/**
 * Styles.
 */
import './editor.scss';

/**
 * Block data.
 */
export const name: string = 'travelopia/table';

export const settings: BlockConfiguration = {
	apiVersion: 2,
	title: __( 'Table', 'tp' ),
	description: __( 'Create structured content in rows and columns to display information.', 'tp' ),
	category: 'layout',
	keywords: [ __( 'table', 'tp' ) ],
	attributes: {
		anchor: {
			type: 'string',
		},
	},
	supports: {
		anchor: true,
	},
	edit,
	save() {
		return <InnerBlocks.Content />;
	},
};
