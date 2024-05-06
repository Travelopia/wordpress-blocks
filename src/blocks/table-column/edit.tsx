/**
 * WordPress dependencies.
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
	InspectorControls,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { BlockEditProps } from '@wordpress/blocks';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import Toolbar from './toolbar';
import { name as cellBlockName } from '../table-cell';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Edit function.
 *
 * @param {Object}   props               Edit properties.
 * @param {string}   props.className     Class name.
 * @param {string}   props.clientId      Client ID.
 * @param {Object}   props.attributes    Attributes.
 * @param {Function} props.setAttributes Set attributes.
 * @param {boolean}  props.isSelected    Is block selected.
 * @param {Object}   props.context       Block context.
 *
 * @return {JSX.Element} JSX Component.
 */
function TableColumnEdit( {
	className,
	clientId,
	attributes,
	setAttributes,
	isSelected,
	context,
}: BlockEditProps<any> ): JSX.Element {
	const blockProps = useBlockProps( {
		className: classnames( className, 'travelopia-table__column', {
			'sticky-column': attributes.isSticky,
		} ),
	} );

	const tableId: string = context[ 'travelopia/table-id' ] as string;
	const rowContainerType: string = context[ 'travelopia/table-row-container-type' ] as string;
	const rowContainerId: string = context[ 'travelopia/table-row-container-id' ] as string;

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

			return {
				row: rowIndex + 1, // Start index at 1.
				column: columnIndex + 1,
			};
		},
		[ clientId ],
	);

	// Update the row and column index.
	useEffect( () => {
		setAttributes( { row, column } );
	}, [ row, column, setAttributes ] );

	// Determine tag.
	let Tag: string = 'td';
	if ( 'tbody' !== rowContainerType ) {
		Tag = 'th';
	}

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
			<Toolbar
				isSelected={ isSelected }
				tableRow={ row }
				tableColumn={ column }
				tableId={ tableId }
				rowContainerId={ rowContainerId }
			/>
			<Tag
				{ ...innerBlocksProps }
			/>
		</>
	);
}

export default TableColumnEdit;
