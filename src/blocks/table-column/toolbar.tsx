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
	arrowRight,
	tableColumnAfter,
	tableColumnBefore,
	tableColumnDelete,
	tableRowAfter,
	tableRowBefore,
	tableRowDelete,
	table,
} from '@wordpress/icons';
import {
	useState,
	useEffect,
} from '@wordpress/element';

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

	const [ maximumColumnsInCurrentRow, setMaximumColumnsInCurrentRow ] = useState( 0 );

	/**
	 * Set maximum columns in current row.
	 */
	useEffect( (): void => {
		// Get table block.
		const tableBlock = getBlock( tableId );

		// Check if we have a block.
		if ( ! tableBlock ) {
			setMaximumColumnsInCurrentRow( 0 );
			return;
		}

		// Traverse rows.
		tableBlock.innerBlocks.some( ( rowBlock, index ): boolean => {
			// Get current row.
			if ( rowBlock.name !== rowBlockName || index + 1 !== tableRow || ! rowBlock.innerBlocks.length ) {
				return false;
			}

			// Set maximum columns in current row.
			setMaximumColumnsInCurrentRow( rowBlock.innerBlocks.length );

			// Short-circuit loop.
			return true;
		} );
	}, [ tableRow, tableColumn, getBlock, tableId ] );

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
	const onMergeColumnLeft = (): void => {
		// Get table block.
		const tableBlock = getBlock( tableId );

		// Check if the table block exists.
		if ( ! tableBlock ) {
			return;
		}

		// Traverse rows.
		tableBlock.innerBlocks.some( ( rowBlock, index ): boolean => {
			// Get current row.
			if ( rowBlock.name !== rowBlockName || index + 1 !== tableRow || ! rowBlock.innerBlocks.length ) {
				return false;
			}

			// Prepare variables.
			let columnToMergeInto: BlockInstance | undefined;
			let columnToMergeFrom: BlockInstance | undefined;

			// Traverse columns in current row.
			rowBlock.innerBlocks.some( ( columnBlock, columnIndex ): boolean => {
				// Get column to merge from and into.
				if ( columnIndex + 1 === tableColumn - 1 ) {
					columnToMergeInto = columnBlock;
				} else if ( columnIndex + 1 === tableColumn ) {
					columnToMergeFrom = columnBlock;
				}

				// Short circuit if we found them.
				if ( columnToMergeInto && columnToMergeFrom ) {
					return true;
				}

				// We haven't found them, loop some more.
				return false;
			} );

			// Check if we have a "to" and "from" column.
			if ( ! columnToMergeFrom || ! columnToMergeInto ) {
				return false;
			}

			// Merge columns.
			mergeColumns( columnToMergeFrom, columnToMergeInto );

			// Short-circuit loop.
			return true;
		} );
	};

	/**
	 * Merge column right.
	 */
	const onMergeColumnRight = (): void => {
		// Get table block.
		const tableBlock = getBlock( tableId );

		// Check if the table block exists.
		if ( ! tableBlock ) {
			return;
		}

		// Traverse rows.
		tableBlock.innerBlocks.some( ( rowBlock, index ): boolean => {
			// Get current row.
			if ( rowBlock.name !== rowBlockName || index + 1 !== tableRow || ! rowBlock.innerBlocks.length ) {
				return false;
			}

			// Prepare variables.
			let columnToMergeInto: BlockInstance | undefined;
			let columnToMergeFrom: BlockInstance | undefined;

			// Traverse columns in current row.
			rowBlock.innerBlocks.some( ( columnBlock, columnIndex ): boolean => {
				// Get column to merge from and into.
				if ( columnIndex + 1 === tableColumn ) {
					columnToMergeInto = columnBlock;
				} else if ( columnIndex + 1 === tableColumn + 1 ) {
					columnToMergeFrom = columnBlock;
				}

				// Short circuit if we found them.
				if ( columnToMergeInto && columnToMergeFrom ) {
					return true;
				}

				// We haven't found them, loop some more.
				return false;
			} );

			// Check if we have a "to" and "from" column.
			if ( ! columnToMergeFrom || ! columnToMergeInto ) {
				return false;
			}

			// Merge columns.
			mergeColumns( columnToMergeFrom, columnToMergeInto );

			// Short-circuit loop.
			return true;
		} );
	};

	/**
	 * Merge columns.
	 *
	 * @param {Object} fromColumn From column block instance.
	 * @param {Object} toColumn   To column block instance.
	 */
	const mergeColumns = ( fromColumn: BlockInstance, toColumn: BlockInstance ): void => {
		// Get colspans.
		const mergeIntoAttributes = getBlockAttributes( toColumn.clientId );
		const mergeFromAttributes = getBlockAttributes( fromColumn.clientId );
		const mergeIntoColspan: number = parseInt( mergeIntoAttributes?.colSpan ?? 1 );
		const mergeFromColspan: number = parseInt( mergeFromAttributes?.colSpan ?? 1 );

		// Update colspan.
		updateBlockAttributes( toColumn.clientId, { colSpan: mergeIntoColspan + mergeFromColspan } );

		// If it is the current column, move children to previous column and delete current column.
		moveBlocksToPosition(
			fromColumn.innerBlocks.map( ( block ) => block.clientId ),
			fromColumn.clientId,
			toColumn.clientId
		);

		// Remove block that is being merged from.
		removeBlock( fromColumn.clientId );
	};

	/**
	 * Table controls.
	 */
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
		{
			icon: arrowRight,
			title: __( 'Merge column right', 'tp' ),
			isDisabled: tableColumn === maximumColumnsInCurrentRow,
			onClick: onMergeColumnRight,
		},
	] as DropdownOption[];

	/**
	 * Return block controls.
	 */
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