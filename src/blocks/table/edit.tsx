/**
 * WordPress dependencies.
 */
import {
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

/**
 * Internal dependencies.
 */
import { TablePlaceholder } from './placeholder';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Edit function.
 *
 * @param {Object} props Edit properties.
 *
 * @return {JSX.Element} JSX Component.
 */
function TableEdit( props: BlockEditAttributes ): JSX.Element {
	const { className, attributes } = props;
	const blockProps = useBlockProps( {
		className: classnames( className, 'travelopia-table' ),
	} );
	const innerBlocksProps = useInnerBlocksProps( {}, {
		allowedBlocks: [ 'travelopia/table-row' ],
	} );

	return (
		<figure { ...blockProps }>
			{
				/* Placeholder for initial state. */
				( 0 === attributes.rows || 0 === attributes.columns ) &&
					<TablePlaceholder { ...props } />
			}
			{
				( 0 !== attributes.rows || 0 !== attributes.columns ) &&
				<table { ...innerBlocksProps } />
			}
		</figure>
	);
}

export default TableEdit;
