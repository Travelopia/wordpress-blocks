/**
 * WordPress dependencies.
 */
import {
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { BlockEditProps } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import { TablePlaceholder } from './placeholder';
import { name as rowBlockName } from '../table-row';

/**
 * Edit function.
 *
 * @param {Object} props Edit properties.
 *
 * @return {JSX.Element} JSX Component.
 */
function TableEdit( props: BlockEditProps<any> ): JSX.Element {
	const { className, attributes, clientId, setAttributes } = props;
	const blockProps = useBlockProps( {
		className: classnames( className, 'travelopia-table' ),
	} );
	const innerBlocksProps = useInnerBlocksProps( {}, {
		allowedBlocks: [ rowBlockName ],
	} );

	// Set blockId attribute.
	useEffect( () => {
		setAttributes( { blockId: clientId } );
	}, [ clientId, setAttributes ] );

	return (
		<figure { ...blockProps }>
			{
				/* Placeholder for initial state. */
				( 0 === attributes.rows || 0 === attributes.columns ) &&
					<TablePlaceholder { ...props } />
			}
			{
				( 0 !== attributes.rows || 0 !== attributes.columns ) &&
				<table>
					<tbody { ...innerBlocksProps } />
				</table>
			}
		</figure>
	);
}

export default TableEdit;
