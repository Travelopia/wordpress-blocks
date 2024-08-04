/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { BlockConfiguration, BlockEditProps } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies.
 */
import Toolbar from './toolbar';

/**
 * Add context of table row and column to the block.
 */
addFilter(
	'blocks.registerBlockType',
	'travelopia/table-row-column-context',
	( settings: BlockConfiguration ) => {
		// Contexts required for the block.
		const requiredContexts = [
			'travelopia/table-row',
			'travelopia/table-column',
			'travelopia/table-id',
			'travelopia/table-row-container-id',
			'travelopia/table-column-id',
		];

		// Add context to the block.
		if ( settings.usesContext && Array.isArray( settings.usesContext ) ) {
			requiredContexts.forEach( ( context ) => {
				// Check if the context is already added.
				if ( ! settings.usesContext?.includes( context ) ) {
					settings.usesContext?.push( context );
				}
			} );
		}

		// Add context to the block.
		return settings;
	},
);

/**
 * Add toolbar to the table block.
 */
addFilter( 'editor.BlockEdit', 'travelopia/table-toolbar', ( BlockEdit ) => {
	// Return the block edit component.
	return ( props: BlockEditProps<any> ) => {
		// Get the block context and isSelected prop.
		const { context, isSelected } = props;

		// Check if the block has context.
		if ( ! context ) {
			// Return the block edit component.
			return <BlockEdit { ...props } />;
		}

		// Get the table row and column from the block context.
		const tableRow = context[ 'travelopia/table-row' ] as number;
		const tableColumn = context[ 'travelopia/table-column' ] as number;
		const tableId = context[ 'travelopia/table-id' ] as string;
		const tableRowContainerId = context[ 'travelopia/table-row-container-id' ] as string;
		const tableColumnId = context[ 'travelopia/table-column-id' ] as string;

		// Check if the table row and column are valid.
		if (
			! tableRow ||
			! tableColumn ||
			! tableId ||
			tableColumn < 1 ||
			tableRow < 1
		) {
			// Return the block edit component.
			return <BlockEdit { ...props } />;
		}

		// Return the block edit component with toolbar.
		return (
			<>
				<Toolbar
					isSelected={ isSelected }
					tableRow={ tableRow }
					tableColumn={ tableColumn }
					tableId={ tableId }
					rowContainerId={ tableRowContainerId }
					columnId={ tableColumnId }
				/>
				<BlockEdit { ...props } />
			</>
		);
	};
} );
