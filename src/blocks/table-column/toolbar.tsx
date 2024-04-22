/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { BlockInstance, createBlock } from '@wordpress/blocks';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarDropdownMenu } from '@wordpress/components';
import { select, dispatch } from '@wordpress/data';
import { DropdownOption } from '@wordpress/components/build-types/dropdown-menu/types';
import {
	arrowLeft,
	tableColumnAfter,
	tableColumnBefore,
	tableColumnDelete,
	tableRowAfter,
	tableRowBefore,
	tableRowDelete,
	table,
} from '@wordpress/icons';

/**
 * Internal dependencies.
 */
import { name as columnBlockName } from './index';
import { name as rowBlockName } from '../table-row';
import { name as cellBlockName } from '../table-cell';

/**
 * Column block toolbar.
 *
 * @param {Object}  props             Block properties.
 * @param {boolean} props.isSelected  Is block selected.
 * @param {string}  props.tableId     Table block ID.
 * @param {number}  props.tableRow    Table row index.
 * @param {number}  props.tableColumn Table column index.
 *
 * @return {JSX.Element} JSX Component.
 */
export default function Toolbar( {
	isSelected,
	tableId,
	tableRow,
	tableColumn,
}: {
	isSelected: boolean;
	tableId: string;
	tableRow: number;
	tableColumn: number;
} ): JSX.Element {
	const {
		getBlock,
		canInsertBlockType,
		getBlockAttributes,
		// @ts-ignore
		canRemoveBlock,
	} = select( 'core/block-editor' );

	const {
		removeBlock,
		removeBlocks,
		insertBlock,
		updateBlockAttributes,
		// @ts-ignore
		moveBlocksToPosition,
	} = dispatch( 'core/block-editor' );

	/**
	 * Insert row.
	 *
	 * @param {0|-1} insertionIndex Insertion index. -1 for before and 0 for after.
	 */
	const onInsertRow = ( insertionIndex: 0 | -1 = 0 ) => {
		// Get table block.
		const tableBlock = getBlock( tableId );

		// Check if the table block exists.
		if ( ! tableBlock ) {
			return;
		}

		// Check if the row block can be inserted.
		if ( ! canInsertBlockType( rowBlockName, tableId ) ) {
			return;
		}

		// Create column blocks.
		const columnBlocks = [];

		// Loop through the table columns count attribute.
		for ( let i = 0; i < tableBlock.attributes?.columns || 0; i++ ) {
			columnBlocks.push(
				createBlock( columnBlockName, {}, [ createBlock( cellBlockName ) ] ),
			);
		}

		// Create a new row block.
		const newRowBlock = createBlock( rowBlockName, {}, columnBlocks );

		// Insert the new row block.
		insertBlock( newRowBlock, tableRow + insertionIndex, tableId );

		// Update the table block attributes.
		updateBlockAttributes( tableId, {
			rows: tableBlock.attributes?.rows + 1,
		} );
	};

	/**
	 * Delete row.
	 */
	const onDeleteRow = () => {
		// Get table block.
		const tableBlock = getBlock( tableId );

		// Check if the table block exists.
		if ( ! tableBlock ) {
			return;
		}

		// Get current row block.
		const currentRowBlock = tableBlock.innerBlocks[ tableRow - 1 ];

		// Check if the current row block is removable.
		if (
			! currentRowBlock?.clientId ||
			! canRemoveBlock( currentRowBlock.clientId )
		) {
			return;
		}

		// Remove the current row block.
		removeBlock( currentRowBlock.clientId );

		// Update the table block attributes.
		updateBlockAttributes( tableId, {
			rows: tableBlock.attributes?.rows - 1,
		} );
	};

	/**
	 * Insert column.
	 *
	 * @param {0|-1} insertionIndex Insertion index. -1 for before and 0 for after.
	 */
	const onInsertColumn = ( insertionIndex: 0 | -1 = 0 ) => {
		// Get table block.
		const tableBlock = getBlock( tableId );

		// Check if the table block exists.
		if ( ! tableBlock ) {
			return;
		}

		// Loop through the table row blocks and insert a new column block.
		tableBlock.innerBlocks.forEach( ( rowBlock ) => {
			// Check the name of the row block.
			if ( rowBlock.name !== rowBlockName ) {
				return;
			}

			// Check if the column block can be inserted.
			if ( ! canInsertBlockType( columnBlockName, rowBlock.clientId ) ) {
				return;
			}

			// Create a new column block.
			const newColumnBlock = createBlock( columnBlockName, {}, [
				createBlock( cellBlockName ),
			] );

			// Insert the new column block.
			insertBlock( newColumnBlock, tableColumn + insertionIndex, rowBlock.clientId );
		} );

		// Update the table block attributes.
		updateBlockAttributes( tableId, {
			columns: tableBlock.attributes?.columns + 1,
		} );
	};

	/**
	 * Delete column.
	 */
	const onDeleteColumn = () => {
		// Get table block.
		const tableBlock = getBlock( tableId );

		// Check if the table block exists.
		if ( ! tableBlock ) {
			return;
		}

		// Columns to be removed.
		const columnsToRemove: string[] = [];

		// Loop through the table row blocks.
		tableBlock.innerBlocks.forEach( ( rowBlock ) => {
			// Check the name of the row block.
			if ( rowBlock.name !== rowBlockName ) {
				return;
			}

			// Get the current column block.
			const currentColumnBlock = rowBlock.innerBlocks[ tableColumn - 1 ];

			// Check if the current column block is removable.
			if (
				currentColumnBlock?.clientId &&
				canRemoveBlock( currentColumnBlock.clientId )
			) {
				columnsToRemove.push( currentColumnBlock.clientId );
			}
		} );

		// Remove the columns.
		removeBlocks( columnsToRemove );

		// Update the table block attributes.
		updateBlockAttributes( tableId, {
			columns: tableBlock.attributes?.columns - 1,
		} );
	};

	/**
	 * Merge column left.
	 */
	const onMergeColumnLeft = () => {
		// Get table block.
		const tableBlock = getBlock( tableId );

		// Check if the table block exists.
		if ( ! tableBlock ) {
			return;
		}

		// Traverse rows.
		tableBlock.innerBlocks.forEach( ( rowBlock, index ) => {
			// Get current row.
			if ( rowBlock.name !== rowBlockName || index + 1 !== tableRow || ! rowBlock.innerBlocks.length ) {
				return;
			}

			// Prepare variables.
			let columnToMergeInto: BlockInstance | undefined;
			let columnToMergeFrom: BlockInstance | undefined;

			// Traverse columns in current row.
			rowBlock.innerBlocks.forEach( ( columnBlock, columnIndex ) => {
				if ( columnIndex + 1 === tableColumn - 1 ) {
					columnToMergeInto = columnBlock;
				} else if ( columnIndex + 1 === tableColumn ) {
					columnToMergeFrom = columnBlock;
				}
			} );

			if ( ! columnToMergeFrom || ! columnToMergeInto ) {
				return;
			}

			// Get colspans.
			const mergeIntoAttributes = getBlockAttributes( columnToMergeInto.clientId );
			const mergeFromAttributes = getBlockAttributes( columnToMergeFrom.clientId );
			const mergeIntoColspan: number = parseInt( mergeIntoAttributes?.colSpan ?? 1 );
			const mergeFromColspan: number = parseInt( mergeFromAttributes?.colSpan ?? 1 );

			// Update colspan.
			updateBlockAttributes( columnToMergeInto.clientId, { colSpan: mergeIntoColspan + mergeFromColspan } );

			// If it is the current column, move children to previous column and delete current column.
			moveBlocksToPosition(
				columnToMergeFrom.innerBlocks.map( ( block ) => block.clientId ),
				columnToMergeFrom.clientId,
				columnToMergeInto.clientId
			);

			// Remove block that is being merged from.
			removeBlock( columnToMergeFrom.clientId );
		} );
	};

	const tableControls = [
		{
			icon: tableRowBefore,
			title: __( 'Insert row before', 'tp' ),
			isDisabled: ! isSelected,
			onClick: () => onInsertRow( -1 ),
		},
		{
			icon: tableRowAfter,
			title: __( 'Insert row after', 'tp' ),
			isDisabled: ! isSelected,
			onClick: onInsertRow,
		},
		{
			icon: tableRowDelete,
			title: __( 'Delete row', 'tp' ),
			isDisabled: ! isSelected,
			onClick: onDeleteRow,
		},
		{
			icon: tableColumnBefore,
			title: __( 'Insert column before', 'tp' ),
			isDisabled: ! isSelected,
			onClick: () => onInsertColumn( -1 ),
		},
		{
			icon: tableColumnAfter,
			title: __( 'Insert column after', 'tp' ),
			isDisabled: ! isSelected,
			onClick: onInsertColumn,
		},
		{
			icon: tableColumnDelete,
			title: __( 'Delete column', 'tp' ),
			isDisabled: ! isSelected,
			onClick: onDeleteColumn,
		},
		{
			icon: arrowLeft,
			title: __( 'Merge column left', 'tp' ),
			isDisabled: tableColumn < 2,
			onClick: onMergeColumnLeft,
		},
	] as DropdownOption[];

	return (
		<>
			{ /* @ts-ignore - Group is not defined in the prop-type. */ }
			<BlockControls group="other">
				<ToolbarDropdownMenu
					icon={ table }
					label={ __( 'Edit table', 'tp' ) }
					controls={ tableControls }
				/>
			</BlockControls>
		</>
	);
}
