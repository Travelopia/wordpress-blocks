/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	BlockEditProps,
} from '@wordpress/blocks';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import { name as columnBlockName } from '../table-column';
import { useEffect } from '@wordpress/element';

/**
 * Edit function.
 *
 * @param {Object} props Edit properties.
 *
 * @return {JSX.Element} JSX Component.
 */
function TableRowEdit( props: BlockEditProps<any> ): JSX.Element {
	// Block props.
	const { className, clientId, setAttributes } = props;

	// Inner block props.
	const blockProps = useBlockProps( {
		className: classnames( className, 'travelopia-table__row' ),
	} );
	const innerBlocksProps = useInnerBlocksProps( { ...blockProps }, {
		allowedBlocks: [ columnBlockName ],
		templateLock: false,
	} );

	useEffect( () => {
		setAttributes( { blockId: clientId } );
	}, [clientId] );

	return (
		<tr { ...innerBlocksProps } />
	);
}

export default TableRowEdit;
