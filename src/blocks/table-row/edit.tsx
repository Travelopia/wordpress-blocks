/**
 * WordPress dependencies.
 */
import {
	useBlockProps, useInnerBlocksProps,
} from '@wordpress/block-editor';

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
function TableRowEdit( props: BlockEditAttributes ): JSX.Element {
	const { className } = props;
	const blockProps = useBlockProps( {
		className: classnames( className, 'travelopia-table__row' ),
	} );
	const innerBlocksProps = useInnerBlocksProps( {
		...blockProps,
		allowedBlocks: [ 'travelopia/table-column' ],
	} );

	return (
		<tr { ...innerBlocksProps } />
	);
}

export default TableRowEdit;
