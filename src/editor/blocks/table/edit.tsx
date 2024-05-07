/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	BlockEditProps,
	createBlock,
} from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import {
	PanelBody,
	ToggleControl,
} from '@wordpress/components';
import {
	select,
	dispatch,
} from '@wordpress/data';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import { TablePlaceholder } from './placeholder';
import { name as rowContainerBlockName } from '../table-row-container';
import { name as rowBlockName } from '../table-row';
import { name as columnBlockName } from '../table-column';
import { name as cellBlockName } from '../table-cell';

/**
 * Create and insert a row container.
 *
 * @param {string} type          Row container type.
 * @param {string} tableClientId The table block's client ID.
 */
export const createAndInsertRowContainer = ( type: string = 'tbody', tableClientId: string = '' ): void => {
	// Get table block.
	const tableBlock = select( 'core/block-editor' ).getBlock( tableClientId );
	if ( ! tableBlock ) {
		return;
	}

	// Create row container.
	const rowContainerBlock = createBlock( rowContainerBlockName, { type } );

	// Determine number of rows to create.
	let totalRows = tableBlock.attributes.rows;
	if ( 'tbody' !== type ) {
		totalRows = 1;
	}

	// Add rows and columns to it.
	for ( let i: number = 0; i < totalRows; i++ ) {
		const columnBlocks = [];
		for ( let j: number = 0; j < tableBlock.attributes.columns; j++ ) {
			columnBlocks.push(
				createBlock( columnBlockName, {}, [
					createBlock( cellBlockName ),
				] )
			);
		}

		rowContainerBlock.innerBlocks.push(
			createBlock( rowBlockName, {}, columnBlocks )
		);
	}

	// Add newly created row and column blocks to the table.
	if ( 'tbody' === type ) {
		dispatch( 'core/block-editor' ).replaceInnerBlocks( tableClientId, [ rowContainerBlock ] );
	} else {
		const position = 'thead' === type ? 0 : tableBlock.innerBlocks.length;
		dispatch( 'core/block-editor' ).insertBlock( rowContainerBlock, position, tableClientId );
	}
};

/**
 * Delete row container child block.
 *
 * @param {string} type          Row container type.
 * @param {string} tableClientId The table block's client ID.
 */
export const deleteRowContainer = ( type: string = 'thead', tableClientId: string = '' ): void => {
	// Get table block.
	const tableBlock = select( 'core/block-editor' ).getBlock( tableClientId );
	if ( ! tableBlock || ! tableBlock.innerBlocks.length ) {
		return;
	}

	// Find the child block and delete it.
	tableBlock.innerBlocks.forEach( ( innerBlock ) => {
		if ( innerBlock.attributes?.type === type ) {
			dispatch( 'core/block-editor' ).removeBlock( innerBlock.clientId );
		}
	} );
};

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
		allowedBlocks: [ rowContainerBlockName ],
		renderAppender: undefined,
	} );

	// Set blockId attribute.
	useEffect( () => {
		setAttributes( { blockId: clientId } );
	}, [ clientId, setAttributes ] );

	/**
	 * Handle THEAD change.
	 *
	 * @param {boolean} hasThead Has THEAD.
	 */
	const handleTheadChange = ( hasThead: boolean ): void => {
		if ( hasThead ) {
			createAndInsertRowContainer( 'thead', clientId );
		} else {
			deleteRowContainer( 'thead', clientId );
		}
		setAttributes( { hasThead } );
	};

	/**
	 * Handle TFOOT change.
	 *
	 * @param {boolean} hasTfoot Has TFOOT.
	 */
	const handleTfootChange = ( hasTfoot: boolean ): void => {
		if ( hasTfoot ) {
			createAndInsertRowContainer( 'tfoot', clientId );
		} else {
			deleteRowContainer( 'tfoot', clientId );
		}
		setAttributes( { hasTfoot } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Table Options', 'tp' ) }>
					<ToggleControl
						label={ __( 'Has THEAD', 'tp' ) }
						checked={ attributes.hasThead }
						onChange={ handleTheadChange }
						help={ __( 'Does this table have a header?', 'tp' ) }
					/>
					<ToggleControl
						label={ __( 'Has TFOOT', 'tp' ) }
						checked={ attributes.hasTfoot }
						onChange={ handleTfootChange }
						help={ __( 'Does this table have a footer?', 'tp' ) }
					/>
				</PanelBody>
			</InspectorControls>
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
		</>
	);
}

export default TableEdit;