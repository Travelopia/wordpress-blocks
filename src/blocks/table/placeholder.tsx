/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { BlockIcon } from '@wordpress/block-editor';
import { blockTable as icon } from '@wordpress/icons';
import {
	Button,
	TextControl,
	Placeholder,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import {
	BlockEditProps,
	createBlock,
} from '@wordpress/blocks';
import {
	select,
	dispatch,
} from '@wordpress/data';

/**
 * Internal dependencies.
 */
import { name as rowBlockName } from '../table-row';
import { name as columnBlockName } from '../table-column';
import { name as cellBlockName } from '../table-cell';

/**
 * Edit function.
 *
 * @param {Object} props Edit properties.
 *
 * @return {JSX.Element} JSX Component.
 */
export function TablePlaceholder( props: BlockEditProps<any> ): JSX.Element {
	const { setAttributes, clientId } = props;
	const [ rows, setRows ] = useState( 2 );
	const [ columns, setColumns ] = useState( 2 );

	return (
		<Placeholder
			label={ __( 'Table' ) }
			icon={ <BlockIcon icon={ icon } showColors /> }
			instructions={ __( 'Insert a table for sharing data.' ) }
		>
			<form
				className="travelopia-table__placeholder-form"
				onSubmit={ ( e ) => {
					// Prevent form submission.
					e.preventDefault();

					// Set attributes.
					setAttributes( { rows, columns } );

					// Get current block.
					const currentBlock = select( 'core/block-editor' ).getBlock( clientId );
					if ( ! currentBlock ) {
						return;
					}

					// Create row and column blocks.
					const innerBlocks = [];

					for ( let i: number = 0; i < rows; i++ ) {
						const columnBlocks = [];
						for ( let j: number = 0; j < columns; j++ ) {
							columnBlocks.push(
								createBlock( columnBlockName, {}, [
									createBlock( cellBlockName ),
								] )
							);
						}

						innerBlocks.push(
							createBlock( rowBlockName, {}, columnBlocks )
						);
					}

					// Add newly created row and column blocks to the table.
					dispatch( 'core/block-editor' ).replaceInnerBlocks( clientId, innerBlocks );
				} }
			>
				<TextControl
					type="number"
					label={ __( 'Column count' ) }
					value={ columns }
					onChange={ ( totalColumns: string ) => setColumns( parseInt( totalColumns ) ) }
					min="1"
					className="travelopia-table__placeholder-input"
				/>
				<TextControl
					type="number"
					label={ __( 'Row count' ) }
					value={ rows }
					onChange={ ( totalRows: string ) => setRows( parseInt( totalRows ) ) }
					min="1"
					className="travelopia-table__placeholder-input"
				/>
				<Button
					variant="primary"
					type="submit"
				>
					{ __( 'Create Table' ) }
				</Button>
			</form>
		</Placeholder>
	);
}
