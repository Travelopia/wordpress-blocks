/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	BlockConfiguration,
	BlockEditProps,
	createBlock,
} from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarDropdownMenu } from '@wordpress/components';
import { select, dispatch } from '@wordpress/data';
import {
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
import { name as rowBlockName } from './table-row';
import { name as columnBlockName } from './table-column';
import { name as cellBlockName } from './table-cell';

/**
 * Add context of table row and column to the block.
 */
addFilter(
	'blocks.registerBlockType',
	'travelopia/table-row-column-context',
	( settings: BlockConfiguration ) => {
		const requiredContexts = [
			'travelopia/table-row',
			'travelopia/table-column',
			'travelopia/table-id',
		];

		if ( settings.usesContext && Array.isArray( settings.usesContext ) ) {
			requiredContexts.forEach( ( context ) => {
				if ( ! settings.usesContext?.includes( context ) ) {
					settings.usesContext?.push( context );
				}
			} );
		}

		return settings;
	},
);

/**
 * Add toolbar to the table block.
 */
addFilter( 'editor.BlockEdit', 'travelopia/table-toolbar', ( BlockEdit ) => {
	return ( props: BlockEditProps<any> ) => {
		const { context, isSelected } = props;

		if ( ! context ) {
			return <BlockEdit { ...props } />;
		}

		const tableRow = context[ 'travelopia/table-row' ] as number;
		const tableColumn = context[ 'travelopia/table-column' ] as number;
		const tableId = context[ 'travelopia/table-id' ] as string;

		if (
			! tableRow ||
			! tableColumn ||
			! tableId ||
			tableColumn < 1 ||
			tableRow < 1
		) {
			return <BlockEdit { ...props } />;
		}

		// @ts-ignore - canRemoveBlock is not defined in the type.
		const { getBlock, canRemoveBlock, canInsertBlockType } =
			select( 'core/block-editor' );
		const { removeBlock, removeBlocks, insertBlock, updateBlockAttributes } =
			dispatch( 'core/block-editor' );

		/**
		 * Insert row.
		 *
		 * @param {0|-1} insertionIndex Insertion index. -1 for before and 0 for after.
		 */
		const onInsertRow = ( insertionIndex: 0 | -1 ) => {
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
		 * Insert column before.
		 */
		const onInsertColumnBefore = () => {
			console.log( 'Insert Column Before' );
		};

		/**
		 * Insert column after.
		 */
		const onInsertColumnAfter = () => {
			console.log( 'Insert Column After' );
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
		};

		const tableControls = [
			{
				icon: tableRowBefore,
				title: __( 'Insert row before' ),
				isDisabled: ! isSelected,
				onClick: () => onInsertRow( -1 ),
			},
			{
				icon: tableRowAfter,
				title: __( 'Insert row after' ),
				isDisabled: ! isSelected,
				onClick: () => onInsertRow( 0 ),
			},
			{
				icon: tableRowDelete,
				title: __( 'Delete row' ),
				isDisabled: ! isSelected,
				onClick: onDeleteRow,
			},
			{
				icon: tableColumnBefore,
				title: __( 'Insert column before' ),
				isDisabled: ! isSelected,
				onClick: onInsertColumnBefore,
			},
			{
				icon: tableColumnAfter,
				title: __( 'Insert column after' ),
				isDisabled: ! isSelected,
				onClick: onInsertColumnAfter,
			},
			{
				icon: tableColumnDelete,
				title: __( 'Delete column' ),
				isDisabled: ! isSelected,
				onClick: onDeleteColumn,
			},
		];

		return (
			<>
				{ /* @ts-ignore - Group is not defined in the type. */ }
				<BlockControls group="other">
					<ToolbarDropdownMenu
						icon={ table }
						label={ __( 'Edit table' ) }
						controls={ tableControls }
					/>
				</BlockControls>
				<BlockEdit { ...props } />
			</>
		);
	};
} );
