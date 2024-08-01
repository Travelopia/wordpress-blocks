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
} from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { createAndInsertRowContainer } from './edit';

/**
 * Edit function.
 *
 * @param {Object} props Edit properties.
 *
 * @return {JSX.Element} JSX Component.
 */
export function TablePlaceholder( props: BlockEditProps<any> ): JSX.Element {
	// Destructure properties.
	const { setAttributes, clientId } = props;
	const [ rows, setRows ] = useState( 2 );
	const [ columns, setColumns ] = useState( 2 );

	// Return placeholder.
	return (
		<Placeholder
			label={ __( 'Table', 'tp' ) }
			icon={ <BlockIcon icon={ icon } showColors /> }
			instructions={ __( 'Insert a table for sharing data.', 'tp' ) }
		>
			<form
				className="travelopia-table__placeholder-form"
				onSubmit={ ( e ) => {
					// Prevent form submission.
					e.preventDefault();

					// Set attributes.
					setAttributes( { rows, columns } );

					// Create and insert row container.
					createAndInsertRowContainer( 'tbody', clientId );
				} }
			>
				<TextControl
					type="number"
					label={ __( 'Column count', 'tp' ) }
					value={ columns }
					onChange={ ( totalColumns: string ) => setColumns( parseInt( totalColumns ) ) }
					min="1"
					className="travelopia-table__placeholder-input"
				/>
				<TextControl
					type="number"
					label={ __( 'Row count', 'tp' ) }
					value={ rows }
					onChange={ ( totalRows: string ) => setRows( parseInt( totalRows ) ) }
					min="1"
					className="travelopia-table__placeholder-input"
				/>
				<Button
					variant="primary"
					type="submit"
				>
					{ __( 'Create Table', 'tp' ) }
				</Button>
			</form>
		</Placeholder>
	);
}
