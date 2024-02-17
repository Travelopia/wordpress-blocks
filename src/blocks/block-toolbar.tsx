/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { BlockConfiguration, BlockEditProps } from '@wordpress/blocks';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarDropdownMenu } from '@wordpress/components';
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
 * Add context of table row and column to the block.
 */
addFilter(
	'blocks.registerBlockType',
	'travelopia/table-row-column-context',
	( settings: BlockConfiguration ) => {
		const requiredContexts = [ 'travelopia/table-row', 'travelopia/table-column' ];

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
addFilter(
	'editor.BlockEdit',
	'travelopia/table-toolbar',
	( BlockEdit ) => {
		return ( props: BlockEditProps<any> ) => {
			const { context, isSelected } = props;

			if ( ! context ) {
				return <BlockEdit { ...props } />;
			}

			const tableRow = context[ 'travelopia/table-row' ] as number;
			const tableColumn = context[ 'travelopia/table-column' ] as number;

			if ( ! tableRow || ! tableColumn || tableColumn < 1 || tableRow < 1 ) {
				return <BlockEdit { ...props } />;
			}

			const onInsertRowBefore = () => {
				console.log( 'Insert Row Before' );
			};

			const onInsertRowAfter = () => {
				console.log( 'Insert Row After' );
			};

			const onDeleteRow = () => {
				console.log( 'Delete Row' );
			};

			const onInsertColumnBefore = () => {
				console.log( 'Insert Column Before' );
			};

			const onInsertColumnAfter = () => {
				console.log( 'Insert Column After' );
			};

			const onDeleteColumn = () => {
				console.log( 'Delete Column' );
			};

			const tableControls = [
				{
					icon: tableRowBefore,
					title: __( 'Insert row before' ),
					isDisabled: ! isSelected,
					onClick: onInsertRowBefore,
				},
				{
					icon: tableRowAfter,
					title: __( 'Insert row after' ),
					isDisabled: ! isSelected,
					onClick: onInsertRowAfter,
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
	},
);
