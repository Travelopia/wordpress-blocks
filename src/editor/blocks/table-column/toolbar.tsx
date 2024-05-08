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
	arrowUp,
	arrowDown,
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
	useMemo,
} from '@wordpress/element';

/**
 * Internal dependencies.
 */
import { name as columnBlockName } from './index';
import { name as rowBlockName } from '../table-row';
import { name as cellBlockName } from '../table-cell';
import { name as rowContainerBlockName } from '../table-row-container';

/**
 * Column block toolbar.
 *
 * @param {Object}  props                Block properties.
 * @param {boolean} props.isSelected     Is block selected.
 * @param {string}  props.tableId        Table block ID.
 * @param {number}  props.tableRow       Table row index.
 * @param {number}  props.tableColumn    Table column index.
 * @param {string}  props.rowContainerId Table row container ID.
 *
 * @return {JSX.Element} JSX Component.
 */
export default function Toolbar( {
	isSelected,
	tableId,
	tableRow,
	tableColumn,
	rowContainerId,
	rowId,
	columnId,
}: {
	isSelected: boolean;
	tableId: string;
	tableRow: number;
	tableColumn: number;
	rowContainerId: string;
	rowId: string;
	columnId: string;
} ): JSX.Element {
	const {
		getBlock,
		canInsertBlockType,
		getBlockAttributes,
		// @ts-ignore
		canRemoveBlock,
		getAdjacentBlockClientId,
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

	const rowContainerBlock = useMemo( () => getBlock( rowContainerId ), [ rowContainerId, getBlock ] );

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
		if ( ! canInsertBlockType( rowBlockName, rowContainerId ) ) {
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
		insertBlock( newRowBlock, tableRow + insertionIndex, rowContainerId );

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

		if ( ! rowContainerBlock ) {
			return;
		}

		// Get current row block.
		const currentRowBlock = rowContainerBlock.innerBlocks[ tableRow - 1 ];

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

		if ( ! rowContainerBlock ) {
			return;
		}

		// Loop through the table row blocks and insert a new column block.
		tableBlock.innerBlocks.forEach( ( currentRowContainerBlock ) => {
			// Check the name of the row container block.
			if ( currentRowContainerBlock.name !== rowContainerBlockName ) {
				return;
			}

			// Loop through the row container blocks.
			currentRowContainerBlock.innerBlocks.forEach( ( rowBlock ) => {
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
		tableBlock.innerBlocks.forEach( ( currentRowContainerBlock ) => {
			// Check the name of the row container block.
			if ( currentRowContainerBlock.name !== rowContainerBlockName ) {
				return;
			}

			// Loop through the row container blocks.
			currentRowContainerBlock.innerBlocks.forEach( ( rowBlock ) => {
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

		console.log('initiated on ', rowId, columnId);
		const currentBlock = getBlock( columnId );
		if ( ! currentBlock ) {
			console.log('No current block');
			return;
		}

		const previousBlockClientId = getAdjacentBlockClientId( columnId, -1 );
		if ( ! previousBlockClientId ) {
			console.log('No previous exists');
			return;
		}

		const previousBlock = getBlock( previousBlockClientId );
		if ( ! previousBlock ) {
			console.log('No previous block');
			return;
		}

		// Merge columns.
		mergeColumnsHorizontally( currentBlock, previousBlock );
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

		console.log('initiated on ', rowId, columnId);
		const currentBlock = getBlock( columnId );
		if ( ! currentBlock ) {
			console.log('No current block');
			return;
		}
		const nextBlockClientId = getAdjacentBlockClientId( columnId, 1 );
		if ( ! nextBlockClientId ) {
			console.log('No next exists');
			return;
		}

		const nextBlock = getBlock( nextBlockClientId );
		if ( ! nextBlock ) {
			console.log('No next block');
			return;
		}

		// Merge columns.
		mergeColumnsHorizontally( nextBlock, currentBlock );
	};

	/**
	 * Merge column up.
	 */
	const onMergeColumnUp = (): void => {
		// Get table block.
		const tableBlock = getBlock( tableId );

		// Check if the table block exists.
		if ( ! tableBlock ) {
			return;
		}

		// Prepare variables.
		let columnToMergeInto: BlockInstance | undefined;
		let columnToMergeFrom: BlockInstance | undefined;

		// Traverse rows.
		tableBlock.innerBlocks.some( ( currentRowContainerBlock ) => {
			if ( currentRowContainerBlock.name !== rowContainerBlockName ) {
				return false;
			}

			// Avoid merging thead/tfoot row with tbody row.
			const currentRowContainerBlockAttributes = getBlockAttributes( currentRowContainerBlock.clientId );
			if ( currentRowContainerBlockAttributes?.type !== rowContainerBlock?.attributes?.type ) {
				return false;
			}

			return currentRowContainerBlock.innerBlocks.some( ( rowBlock, rowIndex ): boolean => {
				// Get current row.
				const rowNumber: number = rowIndex + 1;
				if ( rowBlock.name !== rowBlockName || ( rowNumber !== tableRow && rowNumber !== tableRow - 1 ) || ! rowBlock.innerBlocks.length ) {
					return false;
				}

				// Traverse columns in current row.
				rowBlock.innerBlocks.some( ( columnBlock, columnIndex ): boolean => {
					// Get column to merge from and into.
					const columnNumber: number = columnIndex + 1;
					if ( columnNumber === tableColumn && rowNumber === tableRow ) {
						columnToMergeFrom = columnBlock;
					} else if ( columnNumber === tableColumn && rowNumber === tableRow - 1 ) {
						columnToMergeInto = columnBlock;
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
				mergeColumnsVertically( columnToMergeFrom, columnToMergeInto );

				// Short-circuit loop.
				return true;
			} );
		} );
	};

	/**
	 * Merge column down.
	 */
	const onMergeColumnDown = (): void => {
		// Get table block.
		const tableBlock = getBlock( tableId );

		// Check if the table block exists.
		if ( ! tableBlock ) {
			return;
		}

		// Prepare variables.
		let columnToMergeInto: BlockInstance | undefined;
		let columnToMergeFrom: BlockInstance | undefined;

		// Traverse rows.
		tableBlock.innerBlocks.some( ( currentRowContainerBlock ) => {
			if ( currentRowContainerBlock.name !== rowContainerBlockName ) {
				return false;
			}

			// Avoid merging thead/tfoot row with tbody row.
			const currentRowContainerBlockAttributes = getBlockAttributes( currentRowContainerBlock.clientId );
			if ( currentRowContainerBlockAttributes?.type !== rowContainerBlock?.attributes?.type ) {
				return false;
			}

			return currentRowContainerBlock.innerBlocks.some( ( rowBlock, rowIndex ): boolean => {
				// Get current row.
				const rowNumber: number = rowIndex + 1;
				if ( rowBlock.name !== rowBlockName || ( rowNumber !== tableRow && rowNumber !== tableRow + 1 ) || ! rowBlock.innerBlocks.length ) {
					return false;
				}

				// Traverse columns in current row.
				rowBlock.innerBlocks.some( ( columnBlock, columnIndex ): boolean => {
					// Get column to merge from and into.
					const columnNumber: number = columnIndex + 1;
					if ( columnNumber === tableColumn && rowNumber === tableRow ) {
						columnToMergeInto = columnBlock;
					} else if ( columnNumber === tableColumn && rowNumber === tableRow + 1 ) {
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
				mergeColumnsVertically( columnToMergeFrom, columnToMergeInto );

				// Short-circuit loop.
				return true;
			} );
		} );
	};

	/**
	 * Merge columns horizontally.
	 *
	 * @param {Object} fromColumn From column block instance.
	 * @param {Object} toColumn   To column block instance.
	 */
	const mergeColumnsHorizontally = ( fromColumn: BlockInstance, toColumn: BlockInstance ): void => {
		// Get colspans.
		const mergeIntoAttributes = getBlockAttributes( toColumn.clientId );
		const mergeFromAttributes = getBlockAttributes( fromColumn.clientId );

		// Get rowspans.
		const mergeIntoRowspan: number = parseInt( mergeIntoAttributes?.rowSpan ?? 1 );
		const mergeFromRowspan: number = parseInt( mergeFromAttributes?.rowSpan ?? 1 );

		// Invalid merge.
		if ( mergeIntoRowspan !== mergeFromRowspan ) {
			return;
		}

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
	 * Merge columns vertically.
	 *
	 * @param {Object} fromColumn From column block instance.
	 * @param {Object} toColumn   To column block instance.
	 */
	const mergeColumnsVertically = ( fromColumn: BlockInstance, toColumn: BlockInstance ): void => {
		// Get rowspans.
		const mergeIntoAttributes = getBlockAttributes( toColumn.clientId );
		const mergeFromAttributes = getBlockAttributes( fromColumn.clientId );

		// Get colspans.
		const mergeIntoColspan: number = parseInt( mergeIntoAttributes?.colSpan ?? 1 );
		const mergeFromColspan: number = parseInt( mergeFromAttributes?.colSpan ?? 1 );

		// Invalid merge.
		if ( mergeIntoColspan !== mergeFromColspan ) {
			return;
		}

		const mergeIntoRowspan: number = parseInt( mergeIntoAttributes?.rowSpan ?? 1 );
		const mergeFromRowspan: number = parseInt( mergeFromAttributes?.rowSpan ?? 1 );

		// Update rowspan.
		updateBlockAttributes( toColumn.clientId, { rowSpan: mergeIntoRowspan + mergeFromRowspan } );

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
			isDisabled: ( ! isSelected || rowContainerBlock?.attributes?.type === 'tfoot' || rowContainerBlock?.attributes?.type === 'thead' ),
			onClick: () => onInsertRow( -1 ),
		},
		{
			icon: tableRowAfter,
			title: __( 'Insert row after', 'tp' ),
			isDisabled: ( ! isSelected || rowContainerBlock?.attributes?.type === 'tfoot' || rowContainerBlock?.attributes?.type === 'thead' ),
			onClick: onInsertRow,
		},
		{
			icon: tableRowDelete,
			title: __( 'Delete row', 'tp' ),
			isDisabled: ( ! isSelected || rowContainerBlock?.attributes?.type === 'tfoot' || rowContainerBlock?.attributes?.type === 'thead' ),
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
		{
			icon: arrowUp,
			title: __( 'Merge column up', 'tp' ),
			isDisabled: ( tableRow < 2 || rowContainerBlock?.attributes?.type === 'tfoot' || rowContainerBlock?.attributes?.type === 'thead' ),
			onClick: onMergeColumnUp,
		},
		{
			icon: arrowDown,
			title: __( 'Merge column down', 'tp' ),
			isDisabled: ( rowContainerBlock?.attributes?.type === 'tfoot' || rowContainerBlock?.attributes?.type === 'thead' ),
			onClick: onMergeColumnDown,
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
