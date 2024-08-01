/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
	InspectorControls,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
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
 * @param {string}   props.clientId      Client ID.
 * @param {Object}   props.attributes    Attributes.
 * @param {Function} props.setAttributes Set attributes.
 * @param {Object}   props.context       Block context.
 *
 * @return {JSX.Element} JSX Component.
 */
export default function Edit( {
	className,
	clientId,
	attributes,
	setAttributes,
	context,
}: BlockEditProps<any> ): JSX.Element {
	// Get block props.
	const blockProps = useBlockProps( {
		className: classnames( className, 'travelopia-table__column', {
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

	// Get the row and column index.
	const { row, column } = useSelect(
		( select: any ) => {
			// Calculate the row and column index.
			const columnIndex = select( blockEditorStore ).getBlockIndex( clientId );
			const rowClientId =
				select( blockEditorStore ).getBlockRootClientId( clientId );
			const rowIndex = select( blockEditorStore ).getBlockIndex( rowClientId );

			// Return the row and column index.
			return {
				row: rowIndex + 1, // Start index at 1.
				column: columnIndex + 1,
			};
		},
		[ clientId ],
	);

	// Update the row and column index.
	useEffect( () => {
		// Set the row and column index.
		setAttributes( { row, column } );
	}, [ row, column, setAttributes ] );

	// Set the block ID.
	useEffect( () => {
		// Set the block ID.
		setAttributes( { blockId: clientId } );
	}, [ clientId, setAttributes ] );

	// Determine tag.
	let Tag: string = 'td';

	// Check if the row container type is not tbody.
	if ( 'tbody' !== rowContainerType ) {
		Tag = 'th';
	}

	// Return the column block.
	return (
		<>
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
