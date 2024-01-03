/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockIcon,
} from '@wordpress/block-editor';
import {
	Button,
	Placeholder,
	TextControl,
} from '@wordpress/components';
import {
	blockTable as icon,
} from '@wordpress/icons';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Edit function.
 *
 * @param {Object} props           Edit properties.
 * @param {string} props.className Class name.
 */
function TableEdit( { className }: BlockEditAttributes ): JSX.Element {
	const blockProps = useBlockProps( {
		className: classnames( className, 'travelopia-table' ),
	} );

	return (
		<figure { ...blockProps }>
			<Placeholder
				label={ __( 'Table' ) }
				icon={ <BlockIcon icon={ icon } showColors /> }
				instructions={ __( 'Insert a table for sharing data.' ) }
			>
				<form
					className="travelopia-table__placeholder-form"
					onSubmit={ () => {} }
				>
					<TextControl
						type="number"
						label={ __( 'Column count' ) }
						value={ 2 }
						onChange={ () => {} }
						min="1"
						className="travelopia-table__placeholder-input"
					/>
					<TextControl
						type="number"
						label={ __( 'Row count' ) }
						value={ 2 }
						onChange={ () => {} }
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
		</figure>
	);
}

export default TableEdit;
