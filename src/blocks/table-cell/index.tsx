/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';
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
			selector: 'span',
		},
	},
	supports: {
		html: true,
		className: false,
		color: {
			background: true,
			text: true,
		},
	},
	transforms: {
		to: [
			...[ 'core/paragraph', 'core/heading', 'core/list', 'core/image' ].map( ( block ) => ( {
				type: 'block',
				blocks: [ block ],
				transform: ( attributes: string[], innerBlocks: BlockInstance<{ [k: string]: any; }>[] | undefined ) => {
					return createBlock( block, attributes, innerBlocks );
				},
			} ) ) as unknown as TransformBlock<Record<string, any>>[],
		],
	},
	edit,
	save( { attributes }: BlockSaveProps<any> ) {
		const blockProps = useBlockProps.save();
		return (
			<RichText.Content tagName="span" { ...blockProps } value={ attributes.content } />
		);
	},
};
