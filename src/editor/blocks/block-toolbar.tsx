/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { BlockConfiguration, BlockEditProps } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies.
 */
import Toolbar from './table-column/toolbar';

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
			'travelopia/table-row-container-id',
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
		const tableRowContainerId = context[ 'travelopia/table-row-container-id' ] as string;

		if (
			! tableRow ||
			! tableColumn ||
			! tableId ||
			tableColumn < 1 ||
			tableRow < 1
		) {
			return <BlockEdit { ...props } />;
		}

		return (
			<>
				<Toolbar
					isSelected={ isSelected }
					tableRow={ tableRow }
					tableColumn={ tableColumn }
					tableId={ tableId }
					rowContainerId={ tableRowContainerId }
				/>
				<BlockEdit { ...props } />
			</>
		);
	};
} );
