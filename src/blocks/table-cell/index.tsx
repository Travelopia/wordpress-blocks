/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { BlockConfiguration, BlockInstance, BlockSaveProps, createBlock, TransformBlock } from '@wordpress/blocks';
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
	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'core/heading' ],
				transform: ( attributes: string[], innerBlocks: BlockInstance<{ [k: string]: any; }>[] | undefined ) => {
					return createBlock(
						'core/heading', { ...attributes, level: '3' }, innerBlocks
					);
				},
			} as unknown as TransformBlock<any>,
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( attributes: string[], innerBlocks: BlockInstance<{ [k: string]: any; }>[] | undefined ) => {
					return createBlock( 'core/paragraph', attributes, innerBlocks );
				},
			} as unknown as TransformBlock<any>,
			{
				type: 'block',
				blocks: [ 'core/list' ],
				transform: ( attributes: string[], innerBlocks: BlockInstance<{ [k: string]: any; }>[] | undefined ) => {
					return createBlock(
						'core/list',
						{},
						[
							createBlock( 'core/list-item', attributes, innerBlocks ),
						]
					);
				},
			} as unknown as TransformBlock<any>,
		],
	},
	edit,
	save( { attributes }: BlockSaveProps<any> ) {
		return (
			<RichText.Content value={ attributes.content } />
		);
	},
};
