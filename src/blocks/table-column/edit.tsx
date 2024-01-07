/**
 * WordPress dependencies.
 */
import {
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { BlockEditProps } from '@wordpress/blocks';

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
function TableColumnEdit( props: BlockEditProps<any> ): JSX.Element {
	const { className } = props;
	const blockProps = useBlockProps( {
		className: classnames( className, 'travelopia-table__column' ),
	} );
	const innerBlocksProps = useInnerBlocksProps( { ...blockProps }, {
		template: [ [ 'travelopia/table-cell' ] ],
		templateLock: false,
	} );

	return (
		<td { ...innerBlocksProps } />
	);
}

export default TableColumnEdit;
