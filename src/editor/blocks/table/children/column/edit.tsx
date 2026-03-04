/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	BlockControls,
	BlockVerticalAlignmentToolbar,
} from '@wordpress/block-editor';
import { BlockEditProps } from '@wordpress/blocks';
import { PanelBody, ToggleControl } from '@wordpress/components';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import { name as cellBlockName } from '../cell';

/**
 * Edit function.
 *
 * @param {Object}   props               Edit properties.
 * @param {string}   props.className     Class name.
 * @param {Object}   props.attributes    Attributes.
 * @param {Function} props.setAttributes Set attributes.
 * @param {Object}   props.context       Block context.
 *
 * @return {JSX.Element} JSX Component.
 */
export default function Edit( {
	className,
	attributes,
	setAttributes,
	context,
}: BlockEditProps<any> ): JSX.Element {
	// Get block props.
	const blockProps = useBlockProps( {
		className: classnames( className, 'travelopia-table__column', `travelopia-table__column--align-${ attributes.verticalAlign }`, {
			'travelopia-table__column--sticky': attributes.isSticky,
		} ),
	} );

	// Get context.
	const rowContainerType: string = context[ 'travelopia/table-row-container-type' ] as string;

	// Get inner blocks props.
	const innerBlocksProps = useInnerBlocksProps(
		{
			...blockProps,
			colSpan: attributes.colSpan,
			rowSpan: attributes.rowSpan,
		},
		{
			template: [ [ cellBlockName ] ],
			templateLock: false,
		},
	);

	// Determine tag.
	let Tag: string = 'td';

	// Check if the row container type is not tbody.
	if ( 'tbody' !== rowContainerType ) {
		Tag = 'th';
	}

	// Return the column block.
	return (
		<>
			{ /* @ts-ignore - Group is not defined in the prop-type. */ }
			<BlockControls group="block">
				<BlockVerticalAlignmentToolbar
					onChange={ ( verticalAlign: string|undefined ) => setAttributes( { verticalAlign } ) }
					value={ attributes.verticalAlign }
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Column Options', 'tp' ) }>
					<ToggleControl
						label={ __( 'Is Sticky', 'tp' ) }
						checked={ attributes.isSticky }
						onChange={ ( isSticky: boolean ) => setAttributes( { isSticky } ) }
						help={ __( 'Is this column sticky?', 'tp' ) }
					/>
				</PanelBody>
			</InspectorControls>
			<Tag
				{ ...innerBlocksProps }
			/>
		</>
	);
}
