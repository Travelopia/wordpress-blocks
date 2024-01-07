/**
 * WordPress dependencies.
 */
import {
	useBlockProps,
	useInnerBlocksProps,
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
function TableColumnEdit( props: BlockEditAttributes ): JSX.Element {
	const { className } = props;
	const blockProps = useBlockProps( {
		className: classnames( className, 'travelopia-table__column' ),
	} );
	const innerBlocksProps = useInnerBlocksProps( {
		...blockProps,
		allowedBlocks: [ 'core/paragraph' ],
	} );

	return (
		<td { ...innerBlocksProps } />
	);
}

export default TableColumnEdit;
