/**
 * WordPress dependencies.
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
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
		className: classnames( className, 'travelopia-table__column' ),
	} );

	const tableId: string = context[ 'travelopia/table-id' ] as string;
	const isThead: boolean = context[ 'travelopia/table-row-is-thead' ] as boolean;
	const isTfoot: boolean = context[ 'travelopia/table-row-is-tfoot' ] as boolean;

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
	if ( isThead || isTfoot ) {
		Tag = 'th';
	}

	return (
		<>
			<Toolbar
				isSelected={ isSelected }
				tableRow={ row }
				tableColumn={ column }
				tableId={ tableId }
			/>
			<Tag
				{ ...innerBlocksProps }
			/>
		</>
	);
}

export default TableColumnEdit;
