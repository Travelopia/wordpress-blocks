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
 * Edit function.
 *
 * @param {Object}   props               Edit properties.
 * @param {string}   props.className     Class name.
 * @param {string}   props.clientId      Client ID.
 * @param {Function} props.setAttributes Set attributes.
 *
 * @return {JSX.Element} JSX Component.
 */
function TableColumnEdit( {
	className,
	clientId,
	setAttributes,
}: BlockEditProps<any> ): JSX.Element {
	const blockProps = useBlockProps( {
		className: classnames( className, 'travelopia-table__column' ),
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ ...blockProps },
		{
			template: [ [ 'travelopia/table-cell' ] ],
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

	return <td { ...innerBlocksProps } />;
}

export default TableColumnEdit;
