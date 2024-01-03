/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { BlockConfiguration } from '@wordpress/blocks';
import {
	InnerBlocks,
} from '@wordpress/block-editor';

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
	description: __( 'Section block.', 'tp' ),
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
	edit() {
		// Return block.
		return (
			<p>Hello, World :)</p>
		);
	},
	save() {
		// Return inner block content.
		return <InnerBlocks.Content />;
	},
};
